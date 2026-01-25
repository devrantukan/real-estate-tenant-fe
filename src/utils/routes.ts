/**
 * Ensures path starts with /
 * @param path - The route path
 * @returns The path starting with /
 */
export const getRoute = (path: string): string => {
  return path.startsWith("/") ? path : `/${path}`;
};

/**
 * Checks if a URL is external
 * @param url - The URL to check
 * @returns boolean indicating if URL is external
 */
export const isExternalUrl = (url: string): boolean => {
  return (
    url.startsWith("http") ||
    url.startsWith("//") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:")
  );
};
