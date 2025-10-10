import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/content/posts");
const imagesDirectory = path.join(process.cwd(), "public/images/blog");

// Enhanced Post interface with better type safety
export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  image?: string;
  tags?: string[];
  published?: boolean;
  readingTime?: number;
}

// Frontmatter type for better type checking when parsing markdown
export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  tags?: string[];
  published?: boolean;
  image?: string;
}

// Utility type for post without content (for listing pages)
export type PostSummary = Omit<Post, 'content'>;

// Utility type for posts with reading time
export type PostWithReadingTime = Post & {
  readingTime: number;
};

// Utility type for sorted posts
export type PostsByDate = Post[];

// Calculate reading time based on content length
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return Math.max(1, readingTime); // Minimum 1 minute
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName): Post | null => {
      try {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);

        // Type-safe frontmatter parsing
        const frontmatter = matterResult.data as PostFrontmatter;

        // Skip unpublished posts
        if (frontmatter.published === false) {
          return null;
        }

        // Detect main image dynamically
        let image: string | undefined;
        const postImageDir = path.join(imagesDirectory, slug);
        if (fs.existsSync(postImageDir)) {
          const imageFile = fs.readdirSync(postImageDir).find(file => file.startsWith(`${slug}-main-image.`));
          if (imageFile) {
            image = `/images/blog/${slug}/${imageFile}`;
          }
        }

        const readingTime = calculateReadingTime(matterResult.content);

        return {
          slug,
          title: frontmatter.title,
          date: frontmatter.date,
          description: frontmatter.description,
          tags: frontmatter.tags,
          content: matterResult.content,
          image,
          published: frontmatter.published ?? true,
          readingTime,
        };
      } catch (error) {
        console.warn(`Error parsing post ${fileName}:`, error);
        return null;
      }
    })
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (a.date > b.date ? -1 : 1)); // Sort by date descending

  return allPostsData;
}

export function getPostsBySlugs(slugs: string[]): Post[] {
  const allPosts = getAllPosts();
  const postsMap = new Map(allPosts.map(post => [post.slug, post]));
  return slugs.map(slug => postsMap.get(slug)).filter((post): post is Post => post !== undefined);
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    // Type-safe frontmatter parsing
    const frontmatter = matterResult.data as PostFrontmatter;

    // Check if post is published
    if (frontmatter.published === false) {
      return null;
    }

    // Detect main image dynamically
    let image: string | undefined;
    const postImageDir = path.join(imagesDirectory, slug);
    if (fs.existsSync(postImageDir)) {
      const imageFile = fs.readdirSync(postImageDir).find(file => file.startsWith(`${slug}-main-image.`));
      if (imageFile) {
        image = `/images/blog/${slug}/${imageFile}`;
      }
    }

    const readingTime = calculateReadingTime(matterResult.content);

    return {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      description: frontmatter.description,
      tags: frontmatter.tags,
      content: matterResult.content,
      image,
      published: frontmatter.published ?? true,
      readingTime,
    };
  } catch (error) {
    console.warn(`Error loading post ${slug}:`, error);
    return null;
  }
}
