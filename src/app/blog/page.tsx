import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">My Blog</h1>
        <div className="space-y-4">
          {posts.map((post) => (
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
