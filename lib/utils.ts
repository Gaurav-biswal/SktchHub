import { Camera, Color } from "@/types/canvas";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const COLORS = [
  "#DC2626",
  "#b8ad12",
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

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
};

export function colorToCss(color: Color) {
  const r = color.r.toString(16).padStart(2, "0");
  const g = color.g.toString(16).padStart(2, "0");
  const b = color.b.toString(16).padStart(2, "0");

  return `#${r}${g}${b}`;
}