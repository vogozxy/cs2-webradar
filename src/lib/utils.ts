import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const fetcher = async <JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> => {
  const res = await fetch(input, init);
  return res.json();
};

export const safeDecodeURIComponent = (str: string): string => {
  try {
    return decodeURIComponent(str);
  } catch (error) {
    console.error("Failed to decode URI component:", str, error);
    return "-";
  }
};
