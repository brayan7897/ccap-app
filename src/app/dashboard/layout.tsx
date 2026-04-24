"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sun, Moon, LogOut, UserCircle } from "lucide-react";
import { useUser, useLogout } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/store/auth-store";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { useUiStore } from "@/store/ui-store";
import { Logo } from "@/components/ui/Logo";
import { NotificationBell } from "@/components/layout/NotificationBell";
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
	const { darkMode, toggleDarkMode } = useUiStore();
	const logout = useLogout();

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
				{/* Mobile overlay */}
				{sidebarOpen && (
					<div
						className="fixed inset-0 z-40 bg-black/50 lg:hidden"
						onClick={() => setSidebarOpen(false)}
						aria-hidden
					/>
				)}

				{/* Sidebar */}
				<DashboardSidebar
					isOpen={sidebarOpen}
					onToggle={() => setSidebarOpen(!sidebarOpen)}
					onClose={() => setSidebarOpen(false)}
				/>

				{/* Main area */}
				<div className="flex flex-1 flex-col min-w-0 overflow-hidden relative z-10">
					{/* Top header */}
					<header className="flex items-center justify-between h-16 px-4 lg:px-6 border-b border-border bg-background/90 backdrop-blur-sm shrink-0">
						{/* Logo */}
						<div className="flex items-center h-full">
							<Link href="/dashboard" className="flex items-center gap-2">
								<Logo className="h-6 w-auto text-foreground hover:text-primary transition-colors min-w-[100px]" />
							</Link>
						</div>

						{/* Spacer */}
						<div className="flex-1" />

						{/* Header actions */}
						<div className="flex items-center gap-2 lg:gap-4">
							<NotificationBell />
							<button
								onClick={toggleDarkMode}
								aria-label={darkMode ? "Modo claro" : "Modo oscuro"}
								className="p-2 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
								{darkMode ? (
									<Sun className="w-5 h-5" />
								) : (
									<Moon className="w-5 h-5" />
								)}
							</button>

							{user && (
								<DropdownMenu>
									<DropdownMenuTrigger className="focus:outline-none overflow-hidden rounded-full border-2 border-border shadow-sm hover:border-primary/50 transition-colors shrink-0">
										{user?.avatar_url ? (
											// eslint-disable-next-line @next/next/no-img-element
											<img
												src={user?.avatar_url || undefined}
												alt={fullName || ""}
												className="w-9 h-9 object-cover"
											/>
										) : (
											<div className="w-9 h-9 bg-primary text-primary-foreground flex items-center justify-center text-xs font-black select-none">
												{user?.first_name?.[0]?.toUpperCase()}
												{user?.last_name?.[0]?.toUpperCase()}
											</div>
										)}
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
												<UserCircle className="mr-2 w-4 h-4 text-primary" />
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

					{/* Page content */}
					<main className="flex-1 overflow-y-auto">
						<div className="w-full max-w-[1400px] mx-auto min-h-full">
							{children}
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
