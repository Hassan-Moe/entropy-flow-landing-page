import React from "react";
import Link from "next/link";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonBaseProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps {
  as?: "button";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

interface ButtonAsLink extends ButtonBaseProps {
  as: "link";
  href: string;
  target?: string;
  rel?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-3.5 text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#1fb8d9] text-[#0f1014] border border-[#1fb8d9] hover:bg-[#1fb8d9]/90 hover:shadow-[0_0_20px_rgba(31,184,217,0.4)]",
  secondary:
    "bg-transparent text-[#1fb8d9] border border-[#1fb8d9] hover:bg-[#1fb8d9]/10 hover:shadow-[0_0_20px_rgba(31,184,217,0.3)]",
  outline:
    "bg-transparent text-[#ececec] border border-[#ececec]/30 hover:border-[#ececec] hover:bg-[#ececec]/5",
  ghost:
    "bg-transparent text-[#ececec] border-transparent hover:bg-[#ececec]/5",
};

export default function Button(props: ButtonProps) {
  const {
    size = "md",
    variant = "secondary",
    children,
    className = "",
  } = props;

  const baseClasses =
    "inline-flex items-center cursor-pointer justify-center rounded-sm font-medium transition-all duration-300 hover:scale-[1.01] active:scale-[0.96] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
  const sizeClass = sizeClasses[size];
  const variantClass = variantClasses[variant];
  const combinedClasses = `${baseClasses} ${sizeClass} ${variantClass} ${className}`;

  if (props.as === "link") {
    return (
      <Link
        href={props.href}
        target={props.target}
        rel={props.rel}
        className={combinedClasses}
        style={{ fontFamily: "var(--font-red-hat-display), sans-serif" }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={combinedClasses}
      style={{ fontFamily: "var(--font-red-hat-display), sans-serif" }}
    >
      {children}
    </button>
  );
}
