import Link from 'next/link';

export default function Hero() {
  return (
    <div className="flex items-center justify-center bg-black text-white h-screen px-8">
      <div className="text-center">
        <h1 className="text-6xl mb-8">Code, Commit, Conquer: My Learning Log</h1>
        <Link href="/blog" className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
          Explore My Blog
        </Link>
      </div>
    </div>
  );
}
