import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { coursesService } from "@/features/courses/services/courses.service";
import { CourseDetailsView } from "@/features/courses/components/CourseDetailsView";
import type { CourseDetail } from "@/types";

interface Props {
	params: Promise<{ slug: string }>;
}

async function getCourse(slug: string): Promise<CourseDetail | null> {
	try {
		const course = await coursesService.getBySlug(slug);
		return course.status === "published" ? course : null;
	} catch {
		return null;
	}
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const course = await getCourse(slug);

	if (!course) {
		return { title: "Curso no encontrado" };
	}

	const title = course.title;
	const description = course.short_description ?? course.description ?? undefined;
	const url = `https://ccapglobal.com/courses/${slug}`;
	const image = course.thumbnail_url ?? undefined;

	return {
		title,
		description,
		alternates: { canonical: url },
		openGraph: {
			type: "website",
			url,
			title,
			description,
			images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: image ? [image] : undefined,
		},
	};
}

export default async function CourseDetailsPage({ params }: Props) {
	const { slug } = await params;
	const course = await getCourse(slug);

	if (!course) {
		notFound();
	}

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Course",
		name: course.title,
		description: course.short_description ?? course.description ?? undefined,
		provider: {
			"@type": "Organization",
			name: "CCAP Global",
			sameAs: "https://ccapglobal.com",
		},
		...(course.instructor && {
			instructor: {
				"@type": "Person",
				name: `${course.instructor.first_name} ${course.instructor.last_name}`,
			},
		}),
		offers: {
			"@type": "Offer",
			price: course.course_type === "PAID" ? (course.price ?? 0) : 0,
			priceCurrency: "PEN",
			category: course.course_type === "PAID" ? "Paid" : "Free",
			availability: "https://schema.org/InStock",
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<CourseDetailsView course={course} slug={slug} />
		</>
	);
}
