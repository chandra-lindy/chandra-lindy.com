import Link from "next/link";
import Image from "next/image";
import { Post } from "../lib/posts";

interface PostCardProps {
  post: Post;
  priority?: boolean;
  theme?: "light" | "dark";
}

export default function PostCard({ post, priority, theme = "dark" }: PostCardProps) {
  const imageUrl = post.image;
  const excerpt =
    post.description.length > 100
      ? post.description.substring(0, 100) + "..."
      : post.description;
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const themeClasses = {
    light: {
      container: "bg-gray-100",
      title: "text-gray-900",
      excerpt: "text-gray-700",
      date: "text-gray-500",
      hover: "hover:shadow-lg"
    },
    dark: {
      container: "bg-gray-800",
      title: "text-white",
      excerpt: "text-gray-300",
      date: "text-gray-400",
      hover: "hover:bg-gray-700"
    }
  };

  const styles = themeClasses[theme];

  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <div className={`${styles.container} p-4 rounded-lg shadow-md transition ${styles.hover}`}>
        {imageUrl && (
        <div className="relative w-full h-48 mb-4">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover rounded"
            priority={priority}
          />
        </div>
        )}
        <h3 className={`text-xl font-semibold mb-2 ${styles.title}`}>{post.title}</h3>
        <p className={`text-sm mb-2 ${styles.excerpt}`}>{excerpt}</p>
        <p className={`text-xs ${styles.date}`}>{formattedDate}</p>
      </div>
    </Link>
  );
}
