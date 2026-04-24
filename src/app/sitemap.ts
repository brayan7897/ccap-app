import type { MetadataRoute } from "next";

const BASE_URL = "https://www.ccapglobal.com";

/**
 * Generates /sitemap.xml dynamically via Next.js App Router.
 *
 * Static routes are defined inline.
 * Dynamic course routes are fetched from the API at build time.
 * If the API is unreachable (e.g. during a static export), the sitemap
 * is generated with only the static routes.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// ─── Static pages ──────────────────────────────────────────────────────────
	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1.0,
		},
		{
			url: `${BASE_URL}/catalog`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.9,
		},
		{
			url: `${BASE_URL}/courses`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.9,
		},
		{
			url: `${BASE_URL}/certificates`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${BASE_URL}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.6,
		},
	];

	// ─── Dynamic course pages ──────────────────────────────────────────────────
	let courseRoutes: MetadataRoute.Sitemap = [];

	try {
		const apiBase =
			process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

		const response = await fetch(`${apiBase}/api/v1/courses?limit=500`, {
			// Revalidate once a day during ISR
			next: { revalidate: 86400 },
		});

		if (response.ok) {
			const data = await response.json();
			// Support both paginated { items: [] } and flat [] responses
			const courses: Array<{ slug: string; updated_at?: string }> =
				Array.isArray(data) ? data : (data.items ?? []);

			courseRoutes = courses
				.filter((c) => Boolean(c.slug))
				.map((course) => ({
					url: `${BASE_URL}/courses/${course.slug}`,
					lastModified: course.updated_at
						? new Date(course.updated_at)
						: new Date(),
					changeFrequency: "weekly" as const,
					priority: 0.8,
				}));
		}
	} catch {
		// API not available at build time — sitemap will only include static routes
		console.warn("[sitemap] Could not fetch courses from API — skipping dynamic routes");
	}

	return [...staticRoutes, ...courseRoutes];
}
