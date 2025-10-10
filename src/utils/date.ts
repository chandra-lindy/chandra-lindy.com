/**
 * Date formatting utilities
 */

/**
 * Formats a date string into a human-readable format
 * @param dateString - ISO date string
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  try {
    // Append T12:00:00 to avoid timezone shift issues with date-only strings
    const date = new Date(dateString + 'T12:00:00');
    return date.toLocaleDateString("en-US", options);
  } catch (error) {
    console.warn(`Invalid date string: ${dateString}`, error);
    return dateString; // Return original string if parsing fails
  }
}

/**
 * Formats a date for relative time display (e.g., "2 days ago")
 * @param dateString - ISO date string
 * @returns Relative time string
 */
export function formatRelativeTime(dateString: string): string {
  try {
    // Append T12:00:00 to avoid timezone shift issues
    const date = new Date(dateString + 'T12:00:00');
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else {
      return formatDate(dateString, { year: "numeric", month: "short" });
    }
  } catch (error) {
    console.warn(`Invalid date string for relative time: ${dateString}`, error);
    return dateString;
  }
}
