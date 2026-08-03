type ClassValue = string | number | null | boolean | undefined;

/** Lightweight class-name joiner so we don't need to pull in `clsx` for one helper. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
