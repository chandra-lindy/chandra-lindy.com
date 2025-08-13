"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="fixed bottom-0 w-full bg-black bg-opacity-90 text-gray-400 py-4 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-xs">
          <div className="mb-2 md:mb-0">
            © {currentYear} Chandra Lindy
          </div>
          <div className="flex space-x-4">
            <Link 
              href="https://linkedin.com/in/chandra-lindy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              LinkedIn
            </Link>
            <Link 
              href="https://x.com/ChandraLindy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              X
            </Link>
            <Link 
              href="https://github.com/chandra-lindy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
