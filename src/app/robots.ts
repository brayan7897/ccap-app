import type { MetadataRoute } from "next";

/**
 * Generates /robots.txt dynamically via Next.js App Router.
 * Instructs crawlers which routes to index and where the sitemap lives.
 */
export default function robots(): MetadataRoute.Robots {
	const baseUrl = "https://www.ccapglobal.com";

	return {
		rules: [
			{
				// Allow all crawlers to index public content
				userAgent: "*",
				allow: ["/"],
				disallow: [
					"/dashboard/",   // Private user dashboard
					"/api/",         // API routes — not for indexing
					"/_next/",       // Next.js internals
				],
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
		host: baseUrl,
	};
}
