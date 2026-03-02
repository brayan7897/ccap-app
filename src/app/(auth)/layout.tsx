import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { LogoLight, LogoDark } from "@/assets/images";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative flex min-h-screen items-center justify-center bg-background p-4 sm:p-6 overflow-hidden">
			{/* Animated background orbs */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute -top-32 -left-32 h-96 w-96 animate-[float_20s_ease-in-out_infinite] rounded-full bg-primary-04 blur-[100px]" />
				<div className="absolute top-1/2 -right-24 h-80 w-80 animate-[float_25s_ease-in-out_infinite_reverse] rounded-full bg-gold-04 blur-[100px]" />
				<div className="absolute -bottom-20 left-1/3 h-72 w-72 animate-[float_18s_ease-in-out_infinite_2s] rounded-full bg-primary-03 blur-[80px]" />
			</div>

			{/* Back button */}
			<Link
				href="/"
				className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
				<ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
				Volver al inicio
			</Link>

			{/* Center card */}
			<div className="relative z-10 w-full max-w-md">
				{/* Logo */}
				<div className="flex justify-center mb-8">
					<Link href="/" className="relative h-10 w-28">
						<Image
							src={LogoLight}
							alt="CCAP"
							fill
							className="object-contain dark:hidden"
							priority
						/>
						<Image
							src={LogoDark}
							alt="CCAP"
							fill
							className="object-contain hidden dark:block"
							priority
						/>
					</Link>
				</div>

				{/* Form card */}
				<div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-8 shadow-xl shadow-black/5 dark:shadow-black/20">
					{children}
				</div>

				{/* Footer */}
				<p className="mt-6 text-center text-xs text-muted-foreground">
					© {new Date().getFullYear()} CCAP. Todos los derechos reservados.
				</p>
			</div>
		</div>
	);
}
