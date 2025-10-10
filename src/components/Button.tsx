import Link from "next/link";
import { ReactNode } from "react";

interface BaseButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

interface ButtonAsButton extends BaseButtonProps {
  as?: "button";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

interface ButtonAsLink extends BaseButtonProps {
  as: "link";
  href: string;
  onClick?: never;
  type?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const buttonVariants = {
  primary: {
    light: "bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-500",
    dark: "bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-500",
  },
  secondary: {
    light: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500",
    dark: "bg-gray-700 text-white hover:bg-gray-600 focus-visible:ring-gray-400",
  },
  outline: {
    light: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500",
    dark: "border border-gray-600 text-gray-300 hover:bg-gray-800 focus-visible:ring-gray-400",
  },
};

const buttonSizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  as = "button",
  ...props
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-lg
    transition-colors duration-200
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${buttonSizes[size]}
  `;

  // For now, we'll default to dark theme since the site primarily uses dark theme
  // This can be extended to accept a theme prop if needed
  const variantClasses = buttonVariants[variant].dark;

  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`.trim();

  if (as === "link") {
    const { href, ...linkProps } = props as ButtonAsLink;
    return (
      <Link href={href} className={combinedClasses} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { onClick, type = "button", ...buttonProps } = props as ButtonAsButton;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
