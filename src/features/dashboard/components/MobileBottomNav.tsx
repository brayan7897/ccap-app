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
		<div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border lg:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]">
			<nav className="flex justify-around items-center h-[4.5rem] px-2">
				{NAV_ITEMS.map(({ href, label, icon: Icon }) => {
					const isActive = pathname === href;
					return (
						<Link
							key={href}
							href={href}
							className="flex flex-col items-center justify-center flex-1 h-full gap-1 group relative outline-none"
						>
							<div 
								className={`
									relative p-2 rounded-2xl transition-all duration-300
									${isActive ? "bg-accent shadow-sm" : "hover:bg-muted group-focus-visible:ring-2 ring-ring"}
								`}
							>
								{/* Active Indicator dot */}
								{isActive && (
									<span className="absolute -top-1 -right-0.5 flex h-2.5 w-2.5">
									  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ring opacity-40"></span>
									  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ring"></span>
									</span>
								)}
								<Icon 
									className={`
										w-5 h-5 transition-transform duration-300
										${isActive ? "text-ring scale-110" : "text-muted-foreground group-hover:text-foreground"}
									`} 
								/>
							</div>
							<span 
								className={`
									text-[10px] font-bold tracking-wide transition-colors
									${isActive ? "text-ring" : "text-muted-foreground group-hover:text-foreground"}
								`}
							>
								{label}
							</span>
						</Link>
					);
				})}
			</nav>
		</div>
	);
}
