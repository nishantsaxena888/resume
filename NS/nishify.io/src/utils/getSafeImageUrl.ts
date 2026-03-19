export function getSafeImageUrl(value: any, fallback = "/assets/blueberry/img/product/1.jpg") {
  if (!value) return fallback;

  try {
    if (typeof value === "object" && value?.url) return value.url;
    if (typeof value === "string") {
      // direct URL
      if (value.startsWith("http")) return value;
      // JSON string
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed) && parsed[0]?.url) return parsed[0].url;
      if (parsed?.url) return parsed.url;
    }
  } catch {
    return fallback;
  }

  return fallback;
}
