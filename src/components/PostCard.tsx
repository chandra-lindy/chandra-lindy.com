import Link from "next/link";
import Image from "next/image";
import { Post } from "../lib/posts";
import { formatDate } from "../utils/date";
import { THEME_CLASSES, CONTENT_LIMITS } from "../lib/constants";

interface PostCardProps {
  post: Post;
  priority?: boolean;
  theme?: "light" | "dark";
}

export default function PostCard({ post, priority, theme = "dark" }: PostCardProps) {
  const imageUrl = post.image;
  const excerpt =
    post.description.length > CONTENT_LIMITS.postExcerpt
      ? post.description.substring(0, CONTENT_LIMITS.postExcerpt) + "..."
      : post.description;
  const formattedDate = formatDate(post.date);

  const styles = THEME_CLASSES[theme];

  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <div className={`${styles.container} p-4 rounded-lg shadow-md transition ${styles.hover}`}>
        {imageUrl && (
        <div className="relative w-full h-40 mb-4">
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
