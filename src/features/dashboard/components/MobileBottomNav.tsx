"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Library, Award, Bell } from "lucide-react";

const NAV_ITEMS = [
	{ href: "/dashboard", label: "Inicio", icon: Home },
	{ href: "/dashboard/mis-cursos", label: "Cursos", icon: BookOpen },
	{ href: "/dashboard/catalogo", label: "Catálogo", icon: Library },
	{ href: "/dashboard/mis-certificados", label: "Logros", icon: Award },
	{ href: "/dashboard/notificaciones", label: "Alertas", icon: Bell },
];

export function MobileBottomNav() {
	const pathname = usePathname();

	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border lg:hidden pb-[env(safe-area-inset-bottom)]">
			<nav className="flex justify-around items-stretch h-18 px-1">
				{NAV_ITEMS.map(({ href, label, icon: Icon }) => {
					const isActive = pathname === href;
					return (
						<Link
							key={href}
							href={href}
							className="flex flex-col items-center justify-center flex-1 gap-1.5 relative outline-none group">

							{/* Top-rail active indicator — same language as DashboardSidebar */}
							{isActive && (
								<span className="absolute top-0 left-3 right-3 h-0.5 bg-ring rounded-b-full" />
							)}

							<Icon
								className={[
									"w-5 h-5 transition-all duration-200",
									isActive
										? "text-ring scale-110"
										: "text-muted-foreground group-hover:text-foreground",
								].join(" ")}
							/>

							<span
								className={[
									"text-[10px] font-bold tracking-wide transition-colors leading-none",
									isActive ? "text-ring" : "text-muted-foreground group-hover:text-foreground",
								].join(" ")}>
								{label}
							</span>
						</Link>
					);
				})}
			</nav>
		</div>
	);
}
