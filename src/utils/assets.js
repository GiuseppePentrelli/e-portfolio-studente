const BASE = import.meta.env.BASE_URL

export function assetUrl(path) {
  if (!path) return path
  return BASE + path.replace(/^\//, '')
}
