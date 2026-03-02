import { MainHero } from "@/components/home/MainHero";
import { HomeCourses } from "@/components/home/HomeCourses";
import { HomeCertificates } from "@/components/home/HomeCertificates";
import { HomeAbout } from "@/components/home/HomeAbout";
import { MainBackground } from "@/components/home/MainBackground";
import { TrustedBy } from "@/components/home/TrustedBy";
import { EducationalPillars } from "@/components/home/EducationalPillars";
import { MotivationAndSpecialties } from "@/components/home/MotivationAndSpecialties";
import { PlatformStats } from "@/components/home/PlatformStats";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
	return (
		<div className="flex flex-col min-h-screen relative selection:bg-primary/20">
			<MainBackground />
			<MainHero />
			{/*<TrustedBy />*/}
			<PlatformStats />
			<HomeCourses />
			<EducationalPillars />
			<MotivationAndSpecialties />
			<Testimonials />
			<HomeCertificates />
			<HomeAbout />
		</div>
	);
}
