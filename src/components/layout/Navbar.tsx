"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
	const pathname = usePathname();
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
				<div className="container mx-auto px-4 lg:px-6 h-[4.5rem] lg:h-20 flex items-center justify-between">

					<div className="flex items-center">
						<Link
							href="/"
							className="relative shrink-0 h-12 sm:h-14 md:h-16 lg:h-[72px] w-auto flex items-center"
							onClick={closeMobileMenu}>
							<Logo className="h-full hover:opacity-90 transition-opacity" />
						</Link>
					</div>

					{/* ── Center: Desktop Nav ── */}
					<nav className="hidden lg:flex flex-1 items-center justify-center gap-1 xl:gap-4 2xl:gap-8 px-2">
						{[
							{ href: "/", label: "Inicio" },
							...NAV_LINKS
						].map((link) => {
							const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
							return (
								<Link
									key={link.href}
									href={link.href}
									className={`relative px-2 py-2 text-[13px] font-bold uppercase tracking-wide transition-colors ${
										isActive
											? "text-secondary dark:text-secondary"
											: "text-primary dark:text-foreground/90 hover:text-secondary dark:hover:text-secondary"
									}`}>
									{link.label}
									{/* Active Indicator Line */}
									{isActive && (
										<span className="absolute left-0 bottom-0 w-full h-[3px] bg-secondary rounded-t-sm" />
									)}
								</Link>
							);
						})}
					</nav>

					{/* ── Right: Actions ── */}
					<div className="flex items-center gap-2 lg:gap-4 relative z-10">

						{/* Search: pill on ≥2xl, icon on mobile & lg & xl */}
						<button
							onClick={() => setIsSearchOpen(true)}
							className="hidden 2xl:inline-flex items-center justify-between text-sm font-medium bg-transparent border border-border hover:border-primary/40 hover:bg-secondary/50 rounded-full transition-all shadow-sm px-4 py-2 w-56 text-muted-foreground">
							<div className="flex items-center gap-2 overflow-hidden">
								<Search className="w-4 h-4 shrink-0" />
								<span className="truncate">Buscar...</span>
							</div>
						</button>

						<button
							onClick={() => setIsSearchOpen(true)}
							className="2xl:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
							<Search className="w-5 h-5" />
						</button>

						{/* Divider (desktop only) */}
						<div className="hidden lg:block w-px h-6 bg-border mx-1" />

						{/* NotificationBell — desktop only */}
						{user && (
							<div className="hidden lg:block">
								<NotificationBell />
							</div>
						)}

						{/* Dark mode — always visible */}
						<button
							onClick={toggleDarkMode}
							aria-label={darkMode ? "Modo claro" : "Modo oscuro"}
							className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors border border-transparent hover:border-border">
							{darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
						</button>

						{/* UserMenu / Auth actions */}
						<div className="hidden lg:flex items-center gap-3 xl:gap-4">
							{user ? (
								<UserMenu />
							) : (
								<>
									<Link
										href="/login"
										className="inline-flex items-center px-5 py-2 text-sm font-bold text-foreground bg-background border border-border hover:bg-accent rounded-full transition-all shadow-sm">
										Ingresar
									</Link>
									
									{/* WhatsApp Button */}
									<a
										href="https://wa.me/51999999999"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="WhatsApp"
										className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow-sm hover:shadow-md transition-all text-primary dark:text-foreground hover:text-[#25D366] dark:hover:text-[#25D366]">
										<svg 
											xmlns="http://www.w3.org/2000/svg" 
											viewBox="0 0 24 24" 
											fill="currentColor" 
											className="w-[22px] h-[22px]"
										>
											<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
										</svg>
									</a>

									{/* Register Button */}
									<Link
										href="/register"
										className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text- bg-secondary hover:bg-secondary/90 rounded-full transition-all shadow-md">
										<UserIcon className="w-4 h-4" />
										Regístrate
									</Link>
								</>
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

							{/* WhatsApp Mobile */}
							<a
								href="https://wa.me/51999999999"
								target="_blank"
								rel="noopener noreferrer"
								onClick={closeMobileMenu}
								className="flex items-center gap-3 px-3 py-3 my-1 text-sm font-semibold text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366]/20 rounded-xl transition-colors">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
									<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
								</svg>
								Escríbenos por WhatsApp
							</a>

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
										className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-bold text-foreground bg-secondary hover:bg-secondary/90 rounded-xl transition-all shadow-md shadow-secondary/25">
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
