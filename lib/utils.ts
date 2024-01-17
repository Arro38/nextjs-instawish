import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeAgo = (timestamp: number): string => {
  const currentDate = new Date();
  const createdAtDate = new Date(timestamp * 1000);
  const timeDiff = Math.abs(currentDate.getTime() - createdAtDate.getTime());
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  if (daysDiff > 0) {
    return `${daysDiff} days ago`;
  }
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  if (hoursDiff > 0) {
    return `${hoursDiff} hours ago`;
  }
  const minutesDiff = Math.floor(timeDiff / (1000 * 60));
  if (minutesDiff > 0) {
    return `${minutesDiff} minutes ago`;
  }
  const secondsDiff = Math.floor(timeDiff / 1000);
  return `${secondsDiff} seconds ago`;
};
