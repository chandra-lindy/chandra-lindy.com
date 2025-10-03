import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/content/posts");
const imagesDirectory = path.join(process.cwd(), "public/images/blog");

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  image?: string;
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);

      // Detect main image dynamically
      let image: string | undefined;
      const postImageDir = path.join(imagesDirectory, slug);
      if (fs.existsSync(postImageDir)) {
        const imageFiles = fs.readdirSync(postImageDir)
          .filter(file => file.startsWith(`${slug}-main-image.`))
          .sort((a, b) => {
            // Prefer .webp for size, else alphabetical
            if (a.endsWith('.webp')) return -1;
            if (b.endsWith('.webp')) return 1;
            return a.localeCompare(b);
          });
        if (imageFiles.length > 0) {
          image = `/images/blog/${slug}/${imageFiles[0]}`;
        }
      }

      return {
        slug,
        title: matterResult.data.title,
        date: matterResult.data.date,
        description: matterResult.data.description,
        content: matterResult.content,
        image,
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    // Detect main image dynamically
    let image: string | undefined;
    const postImageDir = path.join(imagesDirectory, slug);
    if (fs.existsSync(postImageDir)) {
      const imageFiles = fs.readdirSync(postImageDir)
        .filter(file => file.startsWith(`${slug}-main-image.`))
        .sort((a, b) => {
          // Prefer .webp for size, else alphabetical
          if (a.endsWith('.webp')) return -1;
          if (b.endsWith('.webp')) return 1;
          return a.localeCompare(b);
        });
      if (imageFiles.length > 0) {
        image = `/images/blog/${slug}/${imageFiles[0]}`;
      }
    }

    return {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      description: matterResult.data.description,
      content: matterResult.content,
      image,
    };
  } catch {
    return null;
  }
}
