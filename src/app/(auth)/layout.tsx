"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Footer } from "@/components/layout/Footer";
import { useAuthStore } from "@/store/auth-store";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const token = useAuthStore((s) => s.token);

	// Client-side guard: if already authenticated, go directly to dashboard.
	// The Edge middleware handles this for full page loads; this covers
	// cases where the user navigates here via client-side routing.
	useEffect(() => {
		if (token) {
			router.replace("/dashboard");
		}
	}, [token, router]);

	// Don't render the auth form while redirecting — avoids flash of login page
	if (token) return null;

	return (
		<div className="flex flex-col bg-background text-foreground selection:bg-primary/20">
			
			{/* Simple Header */}
			<header className="sticky top-0 z-50 w-full h-16 md:h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-border/40 backdrop-blur-xl bg-background/80">
				<Link href="/" className="inline-flex hover:opacity-90 transition-opacity">
					<Logo className="h-7 md:h-8 w-auto" />
				</Link>
				<Link
					href="/"
					className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-secondary transition-colors group px-4 py-2 rounded-full hover:bg-secondary/10">
					<ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
					Volver al inicio
				</Link>
			</header>

			{/* Main Content (min-h-[100vh] ensures Footer is pushed below the fold) */}
			<main className="relative flex flex-col items-center justify-center min-h-[100vh] p-4 sm:p-6 overflow-hidden">
				{/* Animated background orbs */}
				<div className="pointer-events-none absolute inset-0 overflow-hidden">
					<div className="absolute -top-32 -left-32 h-96 w-96 animate-[float_20s_ease-in-out_infinite] rounded-full bg-primary-04 blur-[100px]" />
					<div className="absolute top-1/2 -right-24 h-80 w-80 animate-[float_25s_ease-in-out_infinite_reverse] rounded-full bg-gold-04 blur-[100px]" />
					<div className="absolute -bottom-20 left-1/3 h-72 w-72 animate-[float_18s_ease-in-out_infinite_2s] rounded-full bg-primary-03 blur-[80px]" />
				</div>

				{/* Center card */}
				<div className="relative z-10 w-full max-w-lg flex flex-col animate-fade-in-up py-12">
					{/* Centered Logo */}
					<div className="flex justify-center mb-8 animate-fade-in-up delay-200">
						<Logo className="h-12 md:h-14 w-auto" />
					</div>

					{/* Form card */}
					<div className="rounded-3xl border border-border/50 bg-card/90 backdrop-blur-md p-8 sm:p-10 shadow-2xl shadow-black/5 dark:shadow-black/20 animate-scale-in delay-300">
						{children}
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
