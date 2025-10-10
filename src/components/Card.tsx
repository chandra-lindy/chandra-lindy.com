import { ReactNode } from "react";

interface CardProps {
  title: string;
  content: string | ReactNode;
  theme?: "light" | "dark";
  className?: string;
}

export default function Card({
  title,
  content,
  theme = "light",
  className = ""
}: CardProps) {
  const themeClasses = {
    light: {
      container: "bg-white",
      title: "text-gray-900",
      content: "text-gray-700",
    },
    dark: {
      container: "bg-gray-800",
      title: "text-white",
      content: "text-gray-300",
    },
  };

  const styles = themeClasses[theme];

  return (
    <div className={`${styles.container} p-6 rounded-lg shadow-md ${className}`}>
      <h3 className={`text-2xl font-semibold mb-4 ${styles.title}`}>{title}</h3>
      <div className={styles.content}>
        {typeof content === "string" ? <p>{content}</p> : content}
      </div>
    </div>
  );
}
