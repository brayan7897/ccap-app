"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
	Search,
	Sun,
	Moon,
	LogIn,
	Menu,
	X,
	ChevronRight,
	Bell,
	LayoutDashboard,
	UserIcon,
	LogOut,
} from "lucide-react";
import { SearchModal } from "@/components/ui/SearchModal";
import { useUiStore } from "@/store/ui-store";
import { Logo } from "@/components/ui/Logo";
import { useUser, useLogout } from "@/features/auth/hooks/useAuth";
import { UserMenu } from "@/features/auth/components/UserMenu";
import { NotificationBell } from "@/components/layout/NotificationBell";
import { HeaderUserAvatar } from "@/components/layout/HeaderUserAvatar";

const NAV_LINKS = [
	{ href: "/courses", label: "Cursos" },
	{ href: "/certificates", label: "Certificados" },
	{ href: "/about", label: "Nosotros" },
];

export function Navbar() {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const { darkMode, toggleDarkMode } = useUiStore();
	const { data: user } = useUser();
	const logout = useLogout();

	const fullName = user
		? user.full_name || `${user.first_name} ${user.last_name}`
		: "";

	const closeMobileMenu = () => setIsMobileMenuOpen(false);

	// Keyboard shortcut: Ctrl+K / Cmd+K
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

	// Track scroll for shadow
	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Close mobile menu on desktop resize
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Prevent body scroll when mobile menu is open
	useEffect(() => {
		document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
		return () => { document.body.style.overflow = ""; };
	}, [isMobileMenuOpen]);

	return (
		<>
			<header
				className={`sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-all duration-300 ${
					scrolled
						? "bg-background/90 border-border shadow-sm shadow-black/5"
						: "bg-background/80 border-transparent"
				}`}>
				{/* ── Main bar ── */}
				<div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">

					{/* ── Left: Logo + Desktop Nav ── */}
					<div className="flex items-center gap-4 xl:gap-8">
						<Link
							href="/"
							className="relative shrink-0 h-8 w-28 lg:h-9 lg:w-32"
							onClick={closeMobileMenu}>
							<Logo className="w-full h-full text-foreground hover:opacity-90 transition-opacity" />
						</Link>

						{/* Desktop navigation */}
						<nav className="hidden lg:flex items-center gap-1">
							{NAV_LINKS.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/80 rounded-xl transition-all duration-200">
									{link.label}
								</Link>
							))}
						</nav>
					</div>

					{/* ── Right: Actions ── */}
					<div className="flex items-center gap-1.5 lg:gap-2">

						{/* Search: pill on ≥md, icon on mobile */}
						<button
							onClick={() => setIsSearchOpen(true)}
							className="hidden md:inline-flex items-center justify-between text-sm font-medium bg-transparent border border-border hover:border-primary/40 hover:bg-secondary/50 rounded-xl transition-all shadow-sm px-3 py-2 w-40 lg:w-52 xl:w-64 text-muted-foreground">
							<div className="flex items-center gap-2 overflow-hidden">
								<Search className="w-4 h-4 shrink-0" />
								<span className="truncate">Buscar cursos...</span>
							</div>
							<kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-background border border-border shadow-sm shrink-0 ml-2">
								⌘K
							</kbd>
						</button>

						<button
							onClick={() => setIsSearchOpen(true)}
							className="md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
							<Search className="w-5 h-5" />
						</button>

						{/* Divider (desktop only) */}
						<div className="hidden lg:block w-px h-5 bg-border mx-1" />

						{/* NotificationBell — desktop only; mobile lives inside the menu panel */}
						{user && (
							<div className="hidden lg:block">
								<NotificationBell />
							</div>
						)}

						{/* Dark mode — always visible */}
						<button
							onClick={toggleDarkMode}
							aria-label={darkMode ? "Modo claro" : "Modo oscuro"}
							className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors border border-transparent hover:border-border">
							{darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
						</button>

						{/* UserMenu dropdown — desktop (≥lg) only */}
						<div className="hidden lg:block">
							{user ? (
								<UserMenu />
							) : (
								<div className="flex items-center gap-2">
									<Link
										href="/login"
										className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-foreground bg-background border border-border hover:bg-accent rounded-xl transition-all shadow-sm">
										<LogIn className="w-4 h-4" />
										Ingresar
									</Link>
									<Link
										href="/register"
										className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-md shadow-primary/25">
										Registrarse
									</Link>
								</div>
							)}
						</div>

						{/* Mobile: Hamburger / Close */}
						<button
							onClick={() => setIsMobileMenuOpen((v) => !v)}
							aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
							className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors border border-transparent hover:border-border">
							{isMobileMenuOpen ? (
								<X className="w-6 h-6" />
							) : (
								<Menu className="w-6 h-6" />
							)}
						</button>
					</div>
				</div>

				{/* ── Mobile menu panel ── */}
				{isMobileMenuOpen && (
					<div className="lg:hidden border-t border-border bg-background/98 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
						<div className="container mx-auto px-4 py-3 flex flex-col gap-1">

							{/* User card (logged in) */}
							{user && (
								<div className="flex items-center gap-3 px-3 py-3 mb-1 rounded-xl bg-muted/40">
									<HeaderUserAvatar
										avatarUrl={user.avatar_url}
										firstName={user.first_name}
										lastName={user.last_name}
										size={40}
									/>
									<div className="min-w-0">
										<p className="text-sm font-bold text-foreground truncate">{fullName}</p>
										<p className="text-xs text-muted-foreground truncate">{user.email}</p>
									</div>
								</div>
							)}

							{/* Nav links */}
							{NAV_LINKS.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									onClick={closeMobileMenu}
									className="flex items-center justify-between px-3 py-3 text-sm font-semibold text-foreground hover:bg-muted/50 rounded-xl transition-colors">
									{link.label}
									<ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
								</Link>
							))}

							{/* Separator */}
							<div className="my-1 border-t border-border" />

							{/* Logged-in: account actions as flat links */}
							{user ? (
								<>
									<Link
										href="/dashboard/notificaciones"
										onClick={closeMobileMenu}
										className="flex items-center justify-between px-3 py-3 text-sm font-semibold text-foreground hover:bg-muted/50 rounded-xl transition-colors">
										<span className="flex items-center gap-2.5">
											<Bell className="w-4 h-4 text-muted-foreground" />
											Notificaciones
										</span>
										<ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
									</Link>
									<Link
										href="/dashboard"
										onClick={closeMobileMenu}
										className="flex items-center justify-between px-3 py-3 text-sm font-semibold text-foreground hover:bg-muted/50 rounded-xl transition-colors">
										<span className="flex items-center gap-2.5">
											<LayoutDashboard className="w-4 h-4 text-muted-foreground" />
											Mi panel
										</span>
										<ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
									</Link>
									<Link
										href="/dashboard/perfil"
										onClick={closeMobileMenu}
										className="flex items-center justify-between px-3 py-3 text-sm font-semibold text-foreground hover:bg-muted/50 rounded-xl transition-colors">
										<span className="flex items-center gap-2.5">
											<UserIcon className="w-4 h-4 text-muted-foreground" />
											Mi perfil
										</span>
										<ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
									</Link>
									<button
										onClick={() => { void logout(); closeMobileMenu(); }}
										className="flex items-center gap-2.5 px-3 py-3 w-full text-sm font-semibold text-destructive hover:bg-destructive/10 rounded-xl transition-colors text-left mt-1">
										<LogOut className="w-4 h-4 shrink-0" />
										Cerrar sesión
									</button>
								</>
							) : (
								/* Guest: auth buttons */
								<div className="flex flex-col gap-2 pt-1 pb-2">
									<Link
										href="/register"
										onClick={closeMobileMenu}
										className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-md shadow-primary/25">
										Registrarse
									</Link>
									<Link
										href="/login"
										onClick={closeMobileMenu}
										className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-foreground border border-border bg-background hover:bg-accent rounded-xl transition-colors">
										<LogIn className="w-4 h-4" />
										Ingresar
									</Link>
								</div>
							)}

							{/* Bottom padding */}
							<div className="h-2" />
						</div>
					</div>
				)}
			</header>

			<SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
		</>
	);
}
