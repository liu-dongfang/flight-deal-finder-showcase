import type { SVGProps } from "react";

type IconName =
  | "alert"
  | "arrow-right"
  | "bag"
  | "bookmark"
  | "check"
  | "clock"
  | "close"
  | "filter"
  | "meal"
  | "plane"
  | "search"
  | "shield"
  | "sparkles"
  | "trend-down";

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ name, size = 18, strokeWidth = 1.8, ...props }: IconProps) {
  const shared = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth
  };

  switch (name) {
    case "arrow-right":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
          <path d="M5 12h14" {...shared} />
          <path d="m13 5 7 7-7 7" {...shared} />
        </svg>
      );
    case "plane":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
          <path d="m3 12 17-8-4 8 4 8-17-8Z" {...shared} />
          <path d="M7 12h9" {...shared} />
        </svg>
      );
    case "search":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
          <circle cx="11" cy="11" r="6.5" {...shared} />
          <path d="m16 16 4.5 4.5" {...shared} />
        </svg>
      );
    case "sparkles":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
          <path d="m12 2 1.9 5.1L19 9l-5.1 1.9L12 16l-1.9-5.1L5 9l5.1-1.9Z" {...shared} />
          <path d="m19 15 .9 2.1 2.1.9-2.1.9L19 21l-.9-2.1-2.1-.9 2.1-.9Z" {...shared} />
          <path d="m5 15 .7 1.6 1.6.7-1.6.7L5 20l-.7-1.6-1.6-.7 1.6-.7Z" {...shared} />
        </svg>
      );
    case "trend-down":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
          <path d="M4 7h9v9" {...shared} />
          <path d="m4 16 8-8 8 8" {...shared} transform="rotate(180 12 12)" />
        </svg>
      );
    case "filter":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
          <path d="M4 6h16" {...shared} />
          <path d="M7 12h10" {...shared} />
          <path d="M10 18h4" {...shared} />
        </svg>
      );
    case "bag":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
          <rect x="5" y="7" width="14" height="13" rx="2.5" {...shared} />
          <path d="M9 7a3 3 0 0 1 6 0" {...shared} />
        </svg>
      );
    case "meal":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
          <path d="M6 3v8" {...shared} />
          <path d="M10 3v8" {...shared} />
          <path d="M8 11v10" {...shared} />
          <path d="M15 3c2 1 3 3 3 6v12" {...shared} />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
          <circle cx="12" cy="12" r="8" {...shared} />
          <path d="M12 7v6l4 2" {...shared} />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
          <path d="M12 3 5 6v5c0 5 2.8 8.6 7 10 4.2-1.4 7-5 7-10V6Z" {...shared} />
        </svg>
      );
    case "alert":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
          <path d="M12 4 3.5 19h17Z" {...shared} />
          <path d="M12 9v4" {...shared} />
          <path d="M12 16.5h0" {...shared} />
        </svg>
      );
    case "bookmark":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
          <path d="M7 4h10v16l-5-3-5 3Z" {...shared} />
        </svg>
      );
    case "close":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
          <path d="m6 6 12 12" {...shared} />
          <path d="M18 6 6 18" {...shared} />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
          <path d="m5 12 4.2 4.2L19 7.5" {...shared} />
        </svg>
      );
    default:
      return null;
  }
}
