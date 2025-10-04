import { getAllPosts } from "../lib/posts";
import PostCard from "./PostCard";

export default function FeaturedPosts() {
  const posts = getAllPosts().slice(0, 4); // Display up to 4 featured posts

  return (
    <div className="bg-white min-h-screen flex items-center px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
          Featured Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post, index) => (
            <PostCard key={post.slug} post={post} priority={index === 0} />
          ))}
        </div>
      </div>
    </div>
  );
}
