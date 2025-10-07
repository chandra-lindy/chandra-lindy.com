---
title: Next.js Static Blog
date: "2025-10-02"
description: "A step-by-step guide to building a static blog with Next.js, using dynamic routes, gray-matter, and react-markdown. The perfect first project to get your feet wet with Next.js."
---

![nextjs-static-blog-main-image.png](/images/blog/nextjs-static-blog/nextjs-static-blog-main-image.png)

In this post, I will walk you through the process of building a static blog using Next.js' dynamic routes, `gray-matter`, and `react-markdown` packages.

By the end of this project you will have gained:

- Hands-on experience using Next.js' Link component, Image component, and dynamic routes.
- Hands-on experience using `gray-matter` and `react-markdown` packages.
- Hands-on experience using git for version control.
- A personal blog website you can iterate over to incrementally improve upon, all at no cost. How great is that!!

**Prerequisites:**

- Basic knowledge of HTML, CSS, and JavaScript
- Familiarity with React.js
- Basic understanding of Next.js
- Next.js installed

Next.js has amazing [documentation ](https://nextjs.org/docs) and [tutorials](https://nextjs.org/learn?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=home) that is worth spending some time on.

If you don't already have a Next.js development environment set up, you can follow my [Starting a Next.js Project](/blog/starting-a-nextjs-project) post to get started.

Ready!? Let's do this!

**Reminder:**

Before we start developing don't forget to take full advantage of what `Git` has to offer!

```bash
# create a new branch
git checkout -b feature/blog
```

And, since we already know which packages we will be using to develop this feature...

```bash
npm install gray-matter react-markdown
```

And, at the end of any major changes that you're happy with to commit the changes

```bash
git add .
git commit -m "installed react-markdown and gray-matter"
```

## The big picture

I find it helpful to begin with the end in mind. So let's talk a bit about what we're trying to achieve here.

For our simple static blog, I'd like to be able to write my blog posts in an markdown file, for example `my-first-post.md`, and place it in a designated folder, say `src/content/posts`, and have the system automatically publish a list of all posts to the URL `https://my-domain.com/blog`, and display each post to the URL `https://my-domain.com/blog/my-first-post`.

Let's break this down into smaller tasks:

1. create a folder where we will store our markdown files
2. develop a helper function to curate a list of all post within this folder
3. develop a helper function to pick individual posts
4. create a page that shows a list of all available post
5. create a page to display individual post
6. take the list of posts and generate a static web page for each post
7. create a route to point to each individual post

This list of tasks looks daunting, but Next.js has many builtin features that does the heavy lifting on many web development tasks which makes things much easier for us.

As previously mentioned, we will leverage Next.js' static site generation (SSG) feature and a couple of packages to make this process simple and straight forward.

Let's start crossing off the tasks off our list, shall we? To get a quick win, lets start with the easiest one; creating directories.

## Directory Structure

First on the list is a place to hold our markdown files to be rendered as a blog post

```bash
# the -p flag create intermediate directories as needed
mkdir -p content/posts
```

We can safely cross off **task #1**. /cheer

While we're at it, let's create a directory to hold our helper functions too!

```bash
mkdir lib
```

There's nothing like a tidy workspace!

```bash
project
├── src
│   ├── app
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── content
│   │   └── posts
│   └── lib
...
```

_Don't forget to commit changes as we go_

## Helper Functions

Here we know exactly what we need. We need a way to retrieve a list of all posts and a way to retrieve specific post. And, the posts needs to be the form of an object to be used as input to Next.js (well, technically React.js) functions to be rendered into an html file and ultimately displayed as a webpage.

If you know a programming language, then you can see that this is very doable, but parsing through the markdown file and creating the object doesn't sound very fun at all! /cringe

`gray-matter` to the rescue! It parses the front matter of a markdown file and returns an object containing the data in the front matter. The front matter is the metadata at the top of the markdown file.

We just need to make sure we include the front matter in the markdown file. Here's a simple example:

```md
---
title: My First Post
date: 2023-01-01
description: This is my first post
---

# My First Post

This is my first post.
```

`gray-matter` will parse the front matter and return an object containing the data in the front matter.

Reading through the code will make it clear how it works.

Here's a simple example of my helper functions in TypeScript:

```ts
// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// define the path to the posts directory we created earlier
const postsDirectory = path.join(process.cwd(), "src/content/posts");

// define the shape of the post object
export interface Post {
  slug: string; // the filename of the markdown file (e.g. my-first-post)
  title: string;
  date: string;
  description: string;
  content: string;
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents); // gray-matter parses the front matter of the markdown file

      return {
        slug, // this will be used by Next.js to generate the URL
        title: matterResult.data.title, // we access the data by using the key
        date: matterResult.data.date,
        description: matterResult.data.description,
        content: matterResult.content,
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      description: matterResult.data.description,
      content: matterResult.content,
    };
  } catch {
    return null;
  }
}
```

We can now safely cross **#2 and #3 off our list**!

_Don't forget to commit changes as we go_

## Next.js Dynamic Routes

Next.js dynamic routes allow us to create pages that are generated at build time based on the data in your data source. This is perfect for creating a blog where each post is a separate page.

Since Next.js app router uses the directory structure as the URL structure of your site, the "dynamic" part of dynamic routes is achieved by using square brackets `[]` in the directory name. Think of it as a placeholder for the dynamic part of the URL. Like a variable in a programming language.

We begin by creating the directories for our blog.

```bash
# create the blog directory
mkdir src/app/blog

# create the dynamic route directory
mkdir src/app/blog/[slug] # remember slug from our Post interface?
```

With our new directories, we've allowed Next.js to generate the following URL structure:

- `https://domain.com/blog`
- `https://domain.com/blog/post-title`

Next, we need to create the page files where we define the components to render those pages.

```bash
# create the static pages
touch src/app/blog/page.tsx

# create the dynamic route page
touch src/app/blog/[slug]/page.tsx
```

Here, `src/app/blog/page.tsx` will render a list of all blog posts.

And, `src/app/blog/[slug]/page.tsx` will render the content of a single blog post.

Now our directory structure looks something like the following:

```bash
project
├── src
│   ├── app
│   │   ├── blog
│   │   │   ├── [slug]
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── content
│   │   └── posts
│   └── lib
│       └── posts.ts
```

## Rendering Blog Page

Now we have everything we need to complete the rest of our tasks, starting with **#4 on our list**

```tsx
// src/app/blog/page.tsx
import Link from "next/link";
// we put our helper function to use
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts = getAllPosts(); // to construct the list of posts

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">My Blog</h1>
        <div className="space-y-4">
          {posts.map((post) => (
            // we define how we want to display the list of posts
            <div key={post.slug} className="border border-gray-700 p-4 rounded">
              <h2 className="text-2xl">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-400 hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-400">{post.date}</p>
              <p>{post.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

And just like that, we've completed **#4 on our list**!

## Rendering Individual Posts

Our blog page lists a link to individual post via `href={'/blog/${post.slug}'}` prop of the `Link` component. But, this does not yet exist.

How do we achieve this? We have post objects with data presented in markdown format, but React doesn't render markdown. It renders html. Parsing the markdown and converting them into html elements is doable, but tedious!

Enters `react-markdown`! it is a markdown parser and renderer for React. It parses the markdown and converts them into html elements.

We use the `react-markdown` component and pass in an object via the `components` prop that maps markdown elements to its corresponding `html` elements along with any TailwindCSS styling we choose.

Here is also where we supply Next.js with the list of slugs so that it knows to generate a static page per post at build time by defining the `generateStaticParams` function returning the list of objects mapping `slug` to the string we want the URL path to be, in our case the title of the blog post.

Reading the code will make it clear how it works.

Here's an example taken from my blog site:

```tsx
// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getPostBySlug, getAllPosts } from "@/lib/posts";

/**
 * Here we define the list of slugs so Next.js knows to generate static
 * pages for each post at build time
 */
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  /**
   * For dynamic routes, how do we know which post to render?
   *
   * Next.js passes the params object containing the matched route
   * parameters which is the slug in our case, and since we're using
   * the App router it is passed in as a Promise
   */
  const { slug } = await params;

  // we use the helper function to get the Post object
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            <p className="text-gray-400">{post.date}</p>
            <p className="text-gray-300 mt-2">{post.description}</p>
          </header>
          <hr className="border-gray-600 my-8" />
          <div className="max-w-none">
            {/* We use ReactMarkdown to render the content */}
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold mb-4 text-white">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-semibold mb-3 text-white">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-medium mb-2 text-white">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-xl font-medium mb-2 text-white">
                    {children}
                  </h4>
                ),
                h5: ({ children }) => (
                  <h5 className="text-lg font-medium mb-2 text-white">
                    {children}
                  </h5>
                ),
                h6: ({ children }) => (
                  <h6 className="text-base font-medium mb-2 text-white">
                    {children}
                  </h6>
                ),
                p: ({ children }) => (
                  <p className="mb-4 text-gray-300 leading-relaxed">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-12 mb-4 text-gray-300 space-y-1">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-12 mb-4 text-gray-300 space-y-1">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li>{children}</li>,
                blockquote: ({ children }) => (
                  <div className="pl-8">
                    <blockquote className="border-l-4 border-gray-500 pl-3 italic text-gray-300 mb-4">
                      {children}
                    </blockquote>
                  </div>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-white">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-gray-300">{children}</em>
                ),
                u: ({ children }) => (
                  <u className="underline text-gray-300">{children}</u>
                ),
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <div className="my-4 pl-8">
                      <SyntaxHighlighter
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        style={oneDark as any}
                        language={match[1]}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code
                      className="bg-gray-800 px-1 py-0.5 rounded text-sm font-mono"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}
```

In this example I also use `react-syntax-highlighter` to beautifully display code snippets you see on this post.

And, just like that, we can cross off **#4 through #7 off our task list**!

Talk about standing on the shoulders of giants!! 🔥

Gotta love the open-source community! ❤️

## Testing

Let's check the fruits of our labor!

Add a sample blog post for testing purposes

```bash
touch welcome-to-my-blog.md
```

Paste the following into the newly created markdown file:

````markdown
---
title: Welcome to My Blog
date: "2024-01-01"
description: "An introduction to my personal blog."
---

Hello, world! This is my first blog post.

## What to Expect

I will be posting about:

- Thoughts on technology
- Personal projects
- Life updates

## Exmaple of numbered list

1. First
2. Second
3. Third

## Example of quoted text

> Pen is mightier than the sword.

### Example of code block

```javascript
console.log("Hello, World!");
```

```python
print("Hello, World!")
```

## Example of bold and italic

**Bold**

_Italic_

Stay tuned for more!
````

Then, if you haven't already, start the development server and access the site from a browser

```bash
npm run dev


   ▲ Next.js 15.4.6 (Turbopack)
   - Local:        http://localhost:3000 # cmd/cntl click
   - Network:      http://192.168.1.40:3000

 ✓ Starting...
 ✓ Ready in 1640ms
```

I hope you've been committing incremental changes, but if you haven't, it's ok. You should do it now, and push to your remote branch

```bash
git add .
git commit -m "Simple blog feature"
git push origin feature/blog
```

## Note on Deployment

Next.js plays really well with Vercel. If you have it setup to deploy upon push, Vercel will automatically test build the changes you've made on the branch and deploy it in parallel to your main branch as a test deploy to make sure everything is working well before merging into main.

Vercel made deploying a Next.js project so easy that all you need to do is follow the instructions on the screen and you're set. This blog is published on Vercel, and it took no time to setup continuous deployment by linking it to my github repository. I highly recommend it!

## What's next?

Well, now you have a functioning blog. Time to write, publish, share! At the same time, incrementally improve the appearance and add features. Add the ability to include images to your posts, or whatever else you can think of! Isn't this great!? You can make this your own and share it with the world; literally.

Because we used such a simplistic solution, I'm sure there will be a plethora of problems that will arise as we continue to use it, but that means we get to solve the problems as we encounter them, instead of implementing something overly complicated trying to solve problems that do not yet exist.

And when the need for a more sophisticated solution does arise, you know what that means? We get to start a new project! 😃

See you next time and happy writing, building, and sharing! 👋
