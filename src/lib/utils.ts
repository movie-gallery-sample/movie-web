import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const range = (start: number, end: number) => {
  const length = end - start + 1;

  // Create an array of certain length and set the its elements from start value to end value
  return Array.from({ length }, (_, index) => index + start);
};
