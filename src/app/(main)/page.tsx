import { MainHero } from "@/components/home/MainHero";
import { HomeCourses } from "@/components/home/HomeCourses";
import { HomeCertificates } from "@/components/home/HomeCertificates";
import { HomeAbout } from "@/components/home/HomeAbout";
import { MainBackground } from "@/components/home/MainBackground";
import { TrustedBy } from "@/components/home/TrustedBy";
import { PaymentMethods } from "@/components/home/PaymentMethods";

export default function HomePage() {
	return (
		<div className="flex flex-col min-h-screen relative selection:bg-primary/20">
			<MainBackground />
			<MainHero />
			<HomeCourses />
			<HomeAbout />
			<TrustedBy />
			<HomeCertificates />
			<PaymentMethods />	
		</div>
	);
}
