import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
