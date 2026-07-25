import { publicService } from "@/services/public.service";
import { TeachersCarousel } from "./TeachersCarousel";

export async function Teachers() {
	const teachers = await publicService.getFeaturedProfessors();
	return <TeachersCarousel teachers={teachers} />;
}
