import { MainHero } from "@/components/home/MainHero";
import { HomeCourses } from "@/components/home/HomeCourses";
import { HomeCertificates } from "@/components/home/HomeCertificates";
import { HomeAbout } from "@/components/home/HomeAbout";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#11141d] selection:bg-blue-500/30">
      <MainHero />
      <HomeCourses />
      <HomeCertificates />
      <HomeAbout />
    </div>
  );
}
