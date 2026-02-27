export function getProxyUrl(url: string): string {
  return `/api/proxy?url=${encodeURIComponent(url)}`;
}
