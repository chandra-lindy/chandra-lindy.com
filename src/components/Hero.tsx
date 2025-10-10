import Link from "next/link";
import { SPACING } from "../lib/constants";

export default function Hero() {
  return (
    <div className={`flex items-center justify-center bg-black text-white min-h-screen ${SPACING.section.combined}`}>
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8 leading-relaxed">
          Code, Commit, Conquer:<br />
          My Learning Journey
        </h1>
        <Link
          href="/blog"
          className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
        >
          Explore My Blog
        </Link>
      </div>
    </div>
  );
}
