"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	BookOpen,
	LayoutDashboard,
	GraduationCap,
	User,
	Moon,
	Sun,
	ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/ui-store";

const navItems = [
	{ href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
	{ href: "/my-courses", label: "Mis cursos", Icon: GraduationCap },
	{ href: "/catalog", label: "Catálogo", Icon: BookOpen },
	{ href: "/profile", label: "Perfil", Icon: User },
];

export function Sidebar() {
	const pathname = usePathname();
	const { sidebarOpen, toggleSidebar, darkMode, toggleDarkMode } = useUiStore();

	return (
		<aside
			className={cn(
				"flex flex-col border-r border-border bg-sidebar transition-all duration-200",
				sidebarOpen ? "w-56" : "w-14",
			)}>
			{/* Logo row */}
			<div className="flex h-14 items-center justify-between px-3">
				{sidebarOpen && (
					<Link
						href="/"
						className="flex items-center gap-2 text-sidebar-primary font-bold">
						<BookOpen className="h-5 w-5 shrink-0" />
						<span className="text-sm">CCAP</span>
					</Link>
				)}
				<Button
					variant="ghost"
					size="icon"
					onClick={toggleSidebar}
					className="ml-auto text-sidebar-foreground hover:bg-sidebar-accent"
					aria-label="Colapsar sidebar">
					<ChevronLeft
						className={cn(
							"h-4 w-4 transition-transform",
							!sidebarOpen && "rotate-180",
						)}
					/>
				</Button>
			</div>

			{/* Nav links */}
			<nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
				{navItems.map(({ href, label, Icon }) => {
					const active = pathname === href;
					return (
						<Link
							key={href}
							href={href}
							className={cn(
								"flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors",
								active
									? "bg-sidebar-primary text-sidebar-primary-foreground"
									: "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
							)}>
							<Icon className="h-5 w-5 shrink-0" />
							{sidebarOpen && <span>{label}</span>}
						</Link>
					);
				})}
			</nav>

			{/* Footer: dark mode toggle */}
			<div className="border-t border-sidebar-border px-2 py-3">
				<Button
					variant="ghost"
					size="sm"
					onClick={toggleDarkMode}
					className={cn(
						"w-full text-sidebar-foreground hover:bg-sidebar-accent",
						sidebarOpen ? "justify-start gap-3 px-2" : "justify-center px-0",
					)}
					aria-label={darkMode ? "Modo claro" : "Modo oscuro"}>
					{darkMode ? (
						<Sun className="h-5 w-5 shrink-0" />
					) : (
						<Moon className="h-5 w-5 shrink-0" />
					)}
					{sidebarOpen && (
						<span>{darkMode ? "Modo claro" : "Modo oscuro"}</span>
					)}
				</Button>
			</div>
		</aside>
	);
}
