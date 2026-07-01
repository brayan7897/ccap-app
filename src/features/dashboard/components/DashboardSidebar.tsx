"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Home,
	BookOpen,
	Library,
	Award,
	Bell,
	ChevronRight,
	PanelLeftClose,
	Menu,
} from "lucide-react";

const NAV_ITEMS = [
	{ href: "/dashboard", label: "Inicio", icon: Home },
	{ href: "/dashboard/mis-cursos", label: "Mis Cursos", icon: BookOpen },
	{ href: "/dashboard/catalogo", label: "Catálogo", icon: Library },
	{
		href: "/dashboard/mis-certificados",
		label: "Mis Certificados",
		icon: Award,
	},
	{ href: "/dashboard/notificaciones", label: "Notificaciones", icon: Bell },
] as const;

interface Props {
	isOpen: boolean;
	onToggle: () => void;
}

export function DashboardSidebar({ isOpen, onToggle }: Props) {
	const pathname = usePathname();

	return (
		<aside
			className={[
				"hidden lg:flex flex-col shrink-0",
				"bg-sidebar border-r border-sidebar-border",
				"transition-all duration-300 ease-in-out",
				isOpen ? "w-64" : "w-20",
			].join(" ")}>

			{/* Header — collapse toggle */}
			<div
				className={`h-16 flex items-center border-b border-sidebar-border shrink-0 transition-all duration-300 ${isOpen ? "px-4" : "justify-center"}`}>
				<button
					onClick={onToggle}
					aria-label="Contraer/Expandir menú"
					className="p-2 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition-colors flex items-center justify-center">
					{isOpen ? (
						<PanelLeftClose className="w-6 h-6" />
					) : (
						<Menu className="w-6 h-6" />
					)}
				</button>
			</div>

			{/* Navigation */}
			<nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto overflow-x-hidden">
				{NAV_ITEMS.map(({ href, label, icon: Icon }) => {
					const isActive = pathname === href;
					return (
						<Link
							key={href}
							href={href}
							title={!isOpen ? label : undefined}
							className={[
								"relative flex items-center justify-between py-3 rounded-xl text-sm font-semibold transition-all group",
								isOpen ? "px-3 gap-3" : "justify-center w-12 mx-auto",
								isActive
									? "bg-sidebar-accent/60 text-sidebar-accent-foreground"
									: "text-sidebar-foreground/70 hover:bg-sidebar-accent/40 hover:text-sidebar-accent-foreground",
							].join(" ")}>

							{/* Current-location rail — same language as LessonNavSidebar */}
							{isActive && (
								<span className="absolute left-0 top-2 bottom-2 w-1 bg-sidebar-ring rounded-r-md" />
							)}

							<div className="flex items-center flex-1 justify-start">
								<Icon
									className={[
										"w-5 h-5 shrink-0 transition-transform group-hover:scale-110",
										isActive ? "text-sidebar-ring" : "text-sidebar-foreground/60",
										!isOpen && "mx-auto",
									].join(" ")}
								/>
								<span
									className={`whitespace-nowrap transition-all duration-300 ${!isOpen ? "opacity-0 w-0 scale-0 hidden" : "opacity-100 ml-3 font-bold"}`}>
									{label}
								</span>
							</div>

							{isActive && isOpen && (
								<ChevronRight className="w-3.5 h-3.5 text-sidebar-ring/70 shrink-0" />
							)}
						</Link>
					);
				})}
			</nav>
		</aside>
	);
}
