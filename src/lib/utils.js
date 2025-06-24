import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const matchesSelectedSport = (item, selectedSport) => {
  if (!item) return false;
  if (selectedSport === "both") return true;
  return selectedSport === item.home?.sportKey || selectedSport === item.away?.sportKey;
};
