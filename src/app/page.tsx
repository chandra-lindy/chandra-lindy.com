export default function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black text-white z-10">
      <div className="text-center">
        <h1 className="text-6xl mb-8">Code, Commit, Conquer: My Learning Log</h1>
        <a href="/blog" className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
          Explore My Blog
        </a>
      </div>
    </div>
  );
}
