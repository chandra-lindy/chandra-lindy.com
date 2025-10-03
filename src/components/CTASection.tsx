export default function CTASection() {
  return (
    <div className="bg-black h-screen flex items-center px-8 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Let&apos;s Connect!</h2>
        <p className="text-lg mb-8">
          I&apos;m all ears; whether you&apos;re a seasoned dev dropping wisdom,
          a fellow newbie with questions, or just saying hi (or plotting a
          collab?). Hit me up on X or LinkedIn to chat code, share feedback, or
          team up on something cool.
        </p>
        <div className="flex justify-center space-x-8">
          <a
            href="https://x.com/ChandraLindy"
            className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 mr-2"
              fill="currentColor"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Follow
          </a>
          <a
            href="https://linkedin.com/in/chandra-lindy"
            className="flex items-center px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 mr-2"
              fill="currentColor"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Connect
          </a>
        </div>
      </div>
    </div>
  );
}
