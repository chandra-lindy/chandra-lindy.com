/**
 * Application constants and configuration
 */

// Site configuration
export const SITE_CONFIG = {
  name: "Chandra Lindy",
  url: "https://chandra-lindy.com",
  description: "Chandra Lindy's personal website",
  ogImage: "/og-image.png",
} as const;

// Navigation links
export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
] as const;

// Social media links (for footer/CTA sections)
export const SOCIAL_LINKS = {
  twitter: "https://x.com/ChandraLindy",
  linkedin: "https://linkedin.com/in/chandra-lindy",
  github: "https://github.com/chandra-lindy",
} as const;

// Featured posts (by slug)
export const FEATURED_POSTS = [
  "starting-a-nextjs-project",
  "git-workflow-solo",
  "nextjs-static-blog",
] as const;

// Theme configurations
export const THEME_CLASSES = {
  light: {
    container: "bg-gray-100",
    title: "text-gray-900",
    excerpt: "text-gray-700",
    date: "text-gray-500",
    hover: "hover:shadow-lg",
  },
  dark: {
    container: "bg-gray-800",
    title: "text-white",
    excerpt: "text-gray-300",
    date: "text-gray-400",
    hover: "hover:bg-gray-700",
  },
} as const;

// Content limits
export const CONTENT_LIMITS = {
  postExcerpt: 100,
  featuredPosts: 4,
} as const;

// Date formatting options
export const DATE_OPTIONS = {
  full: {
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
  },
  short: {
    year: "numeric" as const,
    month: "short" as const,
  },
} as const;

// Error messages
export const ERROR_MESSAGES = {
  postNotFound: "Post not found",
  loading: "Loading...",
  genericError: "Something went wrong. Please try again.",
} as const;

// Layout spacing constants
export const SPACING = {
  section: {
    mobile: "pt-16 pb-8 px-8", // Account for fixed nav (h-16)
    desktop: "py-8 px-8", // Normal spacing on larger screens
    combined: "pt-16 md:pt-8 pb-8 px-8", // Responsive combination
  },
} as const;
