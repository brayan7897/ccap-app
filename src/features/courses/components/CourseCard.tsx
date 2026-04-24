import {
	CourseCard as SharedCourseCard,
	type CourseCardProps,
} from "@/components/courses/CourseCard";
import type { Course } from "@/types";

/** Maps a full Course domain object → the presentational props of the shared CourseCard */
function toCardProps(course: Course): CourseCardProps {
	const totalLessons = course.modules?.reduce(
		(sum, m) => sum + (m.lessons?.length ?? 0),
		0,
	);
	const totalSeconds =
		course.total_duration_seconds ??
		course.modules?.reduce(
			(sum, m) =>
				sum +
				(m.lessons?.reduce((s, l) => s + (l.duration_minutes ?? 0) * 60, 0) ??
					0),
			0,
		);
	const hours = totalSeconds ? Math.round(totalSeconds / 3600) : undefined;

	return {
		id: course.id,
		slug: course.slug,
		title: course.title,
		short_description: course.short_description,
		thumbnail_url: course.thumbnail_url,
		course_level: course.course_level,
		instructor_name: course.instructor
			? `${course.instructor.first_name} ${course.instructor.last_name}`
			: undefined,
		category_name: course.category?.name ?? undefined,
		tags: course.tags,
		total_lessons: course.total_lessons ?? totalLessons,
		total_duration: hours ? `${hours} horas` : undefined,
		enrolled_count: course.enrolled_count,
	};
}

export function CourseCard({ course }: { course: Course }) {
	return <SharedCourseCard {...toCardProps(course)} />;
}
