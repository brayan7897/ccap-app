"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Sun, Moon, LogOut, UserCircle } from "lucide-react";
import { useUser, useLogout } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/store/auth-store";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { MobileBottomNav } from "@/features/dashboard/components/MobileBottomNav";
import { useUiStore } from "@/store/ui-store";
import { Logo } from "@/components/ui/Logo";
import { NotificationBell } from "@/components/layout/NotificationBell";
import { HeaderUserAvatar } from "@/components/layout/HeaderUserAvatar";
import { SearchModal } from "@/components/ui/SearchModal";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: user, isLoading } = useUser();
	const router = useRouter();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const { darkMode, toggleDarkMode } = useUiStore();
	const logout = useLogout();

	// Keyboard shortcut: Ctrl+K / Cmd+K — same as the public Navbar
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "k") {
				e.preventDefault();
				setIsSearchOpen(true);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	const fullName = user?.full_name || `${user?.first_name} ${user?.last_name}`;

	const token = useAuthStore((s) => s.token);

	// Safety-net: if the token is cleared while the user is on the dashboard
	// (e.g. 401 from api.ts clears both localStorage and the cookie),
	// redirect to /login. We only redirect on genuine auth failure (no token),
	// NOT on network errors (API down) which would cause a redirect loop.
	useEffect(() => {
		if (!isLoading && !token) {
			router.replace("/login");
		}
	}, [token, isLoading, router]);

	// Middleware guarantees a cookie exists, so this is a very brief fetch.
	// Show a slim top-bar loader instead of a full-page spinner.
	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center bg-background">
				<div className="w-8 h-8 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
			</div>
		);
	}

	// Token expired after page load — middleware already redirecting
	if (!user) return null;

	return (
		<div className="min-h-screen bg-background flex justify-center">
			<div className="flex h-screen w-full max-w-[1600px] bg-background relative overflow-hidden">
				{/* Sidebar — desktop/tablet only; mobile uses the bottom nav */}
				<DashboardSidebar
					isOpen={sidebarOpen}
					onToggle={() => setSidebarOpen(!sidebarOpen)}
				/>

				{/* Main area */}
				<div className="flex flex-1 flex-col min-w-0 overflow-hidden relative z-10">
					{/* ── Top header ── */}
					<header className="relative z-20 flex items-center justify-between h-16 px-3 sm:px-4 lg:px-6 border-b border-border bg-background/90 backdrop-blur-xl shrink-0">
						{/* Logo */}
						<div className="flex items-center h-full">
							<Link href="/dashboard" className="flex items-center gap-2">
								<Logo className="h-8 sm:h-10 w-auto text-foreground hover:text-primary transition-colors min-w-[100px]" />
							</Link>
						</div>

						{/* Spacer */}
						<div className="flex-1" />

						{/* Header actions */}
						<div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
							{/* Search */}
							<button
								onClick={() => setIsSearchOpen(true)}
								className="hidden md:inline-flex items-center justify-between text-sm font-medium bg-transparent border border-border hover:border-ring/40 hover:bg-secondary/50 rounded-full transition-all shadow-sm px-4 py-2 w-48 lg:w-56 text-muted-foreground">
								<div className="flex items-center gap-2 overflow-hidden">
									<Search className="w-4 h-4 shrink-0" />
									<span className="truncate">Buscar...</span>
								</div>
							</button>
							<button
								onClick={() => setIsSearchOpen(true)}
								aria-label="Buscar"
								className="md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
								<Search className="w-5 h-5" />
							</button>

							{/* Divider */}
							<div className="hidden sm:block w-px h-5 bg-border mx-0.5" />

							{/* Notification bell */}
							<NotificationBell />

							{/* Divider */}
							<div className="hidden sm:block w-px h-5 bg-border mx-0.5" />

							{/* Dark mode toggle */}
							<button
								onClick={toggleDarkMode}
								aria-label={darkMode ? "Modo claro" : "Modo oscuro"}
								className="p-2 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors border border-transparent hover:border-border">
								{darkMode ? (
									<Sun className="w-5 h-5" />
								) : (
									<Moon className="w-5 h-5" />
								)}
							</button>

							{/* User avatar dropdown */}
							{user && (
								<DropdownMenu>
									<DropdownMenuTrigger className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-secondary transition-colors border border-transparent hover:border-border focus:outline-none">
										<HeaderUserAvatar
											avatarUrl={user.avatar_url}
											firstName={user.first_name}
											lastName={user.last_name}
										/>
										<span className="hidden lg:block text-sm font-semibold text-foreground max-w-[8rem] truncate">
											{user.first_name}
										</span>
									</DropdownMenuTrigger>

									<DropdownMenuContent
										align="end"
										className="w-64 p-2 rounded-2xl">
										<DropdownMenuLabel className="font-normal px-2 py-1.5 flex flex-col">
											<p className="font-bold text-foreground truncate">
												{fullName}
											</p>
											<p className="text-xs text-muted-foreground truncate">
												{user?.email}
											</p>
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<Link href="/dashboard/perfil">
											<DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5">
												<UserCircle className="mr-2 w-4 h-4 text-muted-foreground" />
												<span className="font-medium">Mi Perfil</span>
											</DropdownMenuItem>
										</Link>
										<DropdownMenuItem
											onClick={() => void logout()}
											className="cursor-pointer rounded-xl px-3 py-2.5 text-destructive focus:bg-destructive/10 focus:text-destructive">
											<LogOut className="mr-2 w-4 h-4" />
											<span className="font-medium">Cerrar sesión</span>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							)}
						</div>
					</header>

					{/* Page content — overflow-x-hidden prevents content wider than
					    the viewport from creating a horizontal scrollbar (overflow-y:auto
					    would otherwise implicitly set overflow-x to auto too) */}
					<main className="flex-1 overflow-y-auto overflow-x-hidden pb-18 lg:pb-0">
						<div className="w-full max-w-[1400px] mx-auto min-h-full pb-8 lg:pb-0">
							{children}
						</div>
					</main>
				</div>
				
				{/* Mobile Bottom Navigation */}
				<MobileBottomNav />
			</div>

			<SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
		</div>
	);
}
