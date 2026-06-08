"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Home,
	BookOpen,
	Library,
	Award,
	Bell,
	X,
	ChevronRight,
	PanelLeftClose,
	PanelLeftOpen,
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
	onClose: () => void;
}

export function DashboardSidebar({ isOpen, onToggle, onClose }: Props) {
	const pathname = usePathname();

	return (
		<aside
			className={[
				"hidden lg:flex inset-y-0 left-0 z-50",
				"flex-col shrink-0",
				"bg-sidebar border-r border-sidebar-border",
				"transition-all duration-300 ease-in-out",
				// Desktop logic: translate-x-0 always, shrink width toggle
				isOpen ? "w-64" : "w-[80px]",
			].join(" ")}>

			{/* Sidebar Header (Toggle Menu) */}
			<div className={`h-16 flex items-center border-b border-sidebar-border shrink-0 transition-all duration-300 ${isOpen ? 'px-4' : 'justify-center'}`}>
				<button
					onClick={onToggle}
					aria-label="Contraer/Expandir menú"
					className="p-2 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition-colors flex items-center justify-center"
				>
					{isOpen ? <PanelLeftClose className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
							onClick={() => {
								if (window.innerWidth < 1024) onClose();
							}}
							title={!isOpen ? label : undefined}
							className={[
								"flex items-center justify-between py-3 rounded-xl text-sm font-semibold transition-all group",
								isOpen ? "px-3 gap-3" : "justify-center w-12 mx-auto",
								isActive
									? "bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border shadow-sm"
									: "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground border border-transparent",
							].join(" ")}>
							
							<div className="flex items-center flex-1 justify-start">
								<Icon
									className={[
										"w-5 h-5 shrink-0 transition-transform group-hover:scale-110",
										isActive ? "text-sidebar-ring" : "text-sidebar-foreground/70",
										!isOpen && "mx-auto"
									].join(" ")}
								/>
								<span className={`whitespace-nowrap transition-all duration-300 origin-left ${!isOpen ? 'opacity-0 w-0 scale-0 hidden' : 'opacity-100 ml-3 font-bold'}`}>
									{label}
								</span>
							</div>

							{isActive && isOpen && (
								<ChevronRight className="w-4 h-4 text-sidebar-ring shrink-0 transition-opacity duration-300" />
							)}
						</Link>
					);
				})}
			</nav>

		</aside>
	);
}
