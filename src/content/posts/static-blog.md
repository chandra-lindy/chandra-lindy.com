---
title: Static Blog
date: "2025-10-02"
description: "A static blog using Next.js."
---

![static-blog-main-image.webp](/images/blog/static-blog/static-blog-main-image.png)

In this post, I will walk you through the process of building a static blog using Next.js' dynamic routes, `gray-matter`, and `react-markdown` packages.

By the end of this project you will have gained:

- hands on experience using Next.js' Link component, Image component, and dynamic routes.
- hands on experience using `gray-matter` and `react-markdown` packages.
- hands on experience using git for version control.
- a personal blog website you can iterate over to incrementaly improve upon, all this at no cost.

**Prerequisites:**

- Basic knowledge of HTML, CSS, and JavaScript
- Familiarity with React.js
- Basic understanding of Next.js
- Next.js installed

Next.js has amazing [documentation ](https://nextjs.org/docs) and [tutorials](https://nextjs.org/learn?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=home) that is worth spending some time on.

If you don't already have a Next.js development environment set up, you can follow my [Starting a Next.js Project](/blog/starting-a-nextjs-project) post to get started.

> Lets get started!

#### Next.js Dynamic Routes

Next.js dynamic routes allow you to create pages that are generated at build time based on the data in your data source. This is perfect for creating a blog where each post is a separate page.

Since Next.js app router uses the directory structure as the URL structure of your site, the "dynamic" part of dynamic routes is achieved by using square brackets `[]` in the directory name. Think of it as a placeholder for the dynamic part of the URL. Like a variable in a programming language.

We begin by creating the directories for our blog.

```bash
# create the blog directory
mkdir src/app/blog

# create the dynamic route directory
mkdir src/app/blog/[slug]
```

With our new directories, we've allowed Next.js to generate the following URL structure:

- `https://domain.com/blog`
- `https://domain.com/blog/post-title`

But, we're not done. We need to create the page files where we define the components to render those pages.

```bash
# create the static pages
touch src/app/blog/page.tsx

# create the dynamic route page
touch src/app/blog/[slug]/page.tsx
```

Here's a simple plan for our static blog:

- `src/app/blog/page.tsx` will render a list of all blog posts.
- `src/app/blog/[slug]/page.tsx` will render the content of a single blog post.

Now our directory structure looks something like the following:

```bash
src
├── app
│   ├── blog
│   │   ├── [slug]
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
```

#### Project Structure

The following is a snap shot of my project structure for this blog as an example:

```bash
├── public
│   └── images
│       └── blog
│           ├── starting-a-nextjs-project
│           │   ├── existing-repository-option.png
│           │   ├── git-status-showing-changes.png
│           │   ├── landing-page.png
│           │   ├── new-repository-link.png
│           │   └── starting-a-nextjs-project-main-image.png
│           └── static-blog
│               └── static-blog-main-image.png
├── src
│   ├── app
│   │   ├── blog
│   │   │   ├── [slug]
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── About.tsx
│   │   ├── Card.tsx
│   │   ├── CTASection.tsx
│   │   ├── FeaturedPosts.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   └── PostCard.tsx
│   ├── content
│   │   └── posts
│   │       ├── starting-a-nextjs-project.md
│   │       └── static-blog.md
│   └── lib
│       └── posts.ts
```
