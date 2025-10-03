import Link from "next/link";
import Image from "next/image";
import { Post } from "../lib/posts";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
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

  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
        {imageUrl && (
        <div className="relative w-full h-48 mb-4">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover rounded"
          />
        </div>
        )}
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-gray-700 text-sm mb-2">{excerpt}</p>
        <p className="text-gray-500 text-xs">{formattedDate}</p>
      </div>
    </Link>
  );
}
