import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#11141d] text-white selection:bg-blue-500/30">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
