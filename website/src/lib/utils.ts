import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function asset(path: string) {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) {
    return path;
  }
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (path.startsWith("/")) {
    return `${prefix}${path}`;
  }
  return `${prefix}/${path}`;
}
