import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import Image from "next/image";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  let isFirstImage = true;

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            <p className="text-gray-400">{post.date}</p>
            <p className="text-gray-300 mt-2">{post.description}</p>
          </header>
          <hr className="border-gray-600 my-8" />
          <div className="max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold mb-4 text-white">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-semibold mb-3 text-white">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-medium mb-2 text-white">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-xl font-medium mb-2 text-white">
                    {children}
                  </h4>
                ),
                h5: ({ children }) => (
                  <h5 className="text-lg font-medium mb-2 text-white">
                    {children}
                  </h5>
                ),
                h6: ({ children }) => (
                  <h6 className="text-base font-medium mb-2 text-white">
                    {children}
                  </h6>
                ),
                p: ({ children }) => (
                  <p className="mb-4 text-gray-300 leading-relaxed">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-8 mb-4 text-gray-300 space-y-1">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-8 mb-4 text-gray-300 space-y-1">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li>{children}</li>,
                blockquote: ({ children }) => (
                  <div className="pl-8">
                    <blockquote className="border-l-4 border-gray-500 pl-3 italic text-gray-300 mb-4">
                      {children}
                    </blockquote>
                  </div>
                ),
                a: ({ children, href }) => (
                  <a href={href} className="text-blue-400 hover:text-blue-300 underline decoration-blue-400 hover:decoration-blue-300">
                    {children}
                  </a>
                ),
                img: ({ src, alt }) => {
                  const priority = isFirstImage;
                  isFirstImage = false;
                  return (
                    <Image
                      src={(src as string) || ""}
                      alt={alt || ""}
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg my-4"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={priority}
                    />
                  );
                },
                strong: ({ children }) => (
                  <strong className="font-bold text-white">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-gray-300">{children}</em>
                ),
                u: ({ children }) => (
                  <u className="underline text-gray-300">{children}</u>
                ),
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <div className="my-4">
                      <SyntaxHighlighter
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        style={oneDark as any}
                        language={match[1]}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code
                      className="bg-gray-800 px-1 py-0.5 rounded text-sm font-mono"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}
