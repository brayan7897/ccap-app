import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function MarketingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20">
			<Navbar />
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	);
}
