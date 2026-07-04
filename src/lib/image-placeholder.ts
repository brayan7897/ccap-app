/** Shimmer SVG used as a `blurDataURL` for remote images (thumbnails, avatars)
 * that Next.js can't generate a blur placeholder for automatically since
 * they aren't static imports. */
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#e5e7eb" offset="20%" />
      <stop stop-color="#f3f4f6" offset="50%" />
      <stop stop-color="#e5e7eb" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#e5e7eb" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite" />
</svg>`;

const toBase64 = (str: string) =>
	typeof window === "undefined"
		? Buffer.from(str).toString("base64")
		: window.btoa(str);

/** blurDataURL for `next/image` on remote/dynamic sources (no static import available). */
export const shimmerBlurDataURL = (w = 700, h = 475) =>
	`data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
