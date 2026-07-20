import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const COLORS = [
  "#DC2626",
  "#e7d90f",
  "#ec4e95",
  "#7C3AED",
  "#059669"
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}