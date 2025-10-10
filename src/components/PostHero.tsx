import Image from "next/image";
import { Post } from "../lib/posts";
import { formatDate } from "../utils/date";

interface PostHeroProps {
  post: Post;
}

export default function PostHero({ post }: PostHeroProps) {
  const imageUrl = post.image;
  const formattedDate = formatDate(post.date);

  return (
    <div className="h-[calc(100vh-4rem)] bg-black text-white mb-0">
      <div className="max-w-7xl mx-auto h-full flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 relative flex items-center justify-center p-8">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.title}
              width={600}
              height={400}
              className="w-full h-auto max-h-full object-contain rounded-lg"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center rounded-lg">
              <span className="text-gray-400 text-lg">No image available</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 mb-6 leading-relaxed">
              {post.description}
            </p>
            <p className="text-sm lg:text-base text-gray-400 font-medium">
              {formattedDate}
              {post.readingTime && (
                <span className="ml-4">• {post.readingTime} min read</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
