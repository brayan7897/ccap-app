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
} from "lucide-react";
import { SearchModal } from "@/components/ui/SearchModal";
import { useUiStore } from "@/store/ui-store";
import { Logo } from "@/components/ui/Logo";
import { useUser } from "@/features/auth/hooks/useAuth";
import { UserMenu } from "@/features/auth/components/UserMenu";
import { NotificationBell } from "@/components/layout/NotificationBell";

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

	// Keyboard shortcut to open search (Ctrl+K or Cmd+K)
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

	// Track scroll for header shadow
	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Close mobile menu on route change (resize)
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<>
			<header
				className={`sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-all duration-300 ${
					scrolled
						? "bg-background/90 border-border shadow-sm shadow-black/5"
						: "bg-background/80 border-transparent"
				}`}>
				<div
					className={`container mx-auto px-4 lg:px-8 flex items-center justify-between transition-all duration-300 ${
						scrolled ? "h-20" : "h-24"
					}`}>
					{/* Left: Logo + Nav */}
					<div className="flex items-center gap-4 xl:gap-8">
						<Link
							href="/"
							className={`relative shrink-0 transition-all duration-400 ease-out ${
								scrolled ? "h-9 w-32" : "h-10 w-36"
							}`}>
							<Logo className="w-full h-full text-foreground hover:opacity-90 transition-opacity" />
						</Link>

						<nav className="hidden lg:flex items-center gap-1">
							{NAV_LINKS.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className={`px-4 py-2 font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/80 rounded-xl transition-all duration-300 ${
										scrolled ? "text-sm lg:text-base" : "text-base lg:text-lg"
									}`}>
									{link.label}
								</Link>
							))}
						</nav>
					</div>

					{/* Right: Search + Actions */}
					<div className="flex items-center gap-3 lg:gap-4">
						{/* Search Trigger */}
						<button
							onClick={() => setIsSearchOpen(true)}
							className={`hidden md:inline-flex items-center justify-between text-base font-medium text-foreground bg-transparent border border-border hover:border-primary/40 hover:bg-secondary/50 rounded-xl transition-all shadow-sm w-40 lg:w-56 xl:w-72 ${
								scrolled ? "px-3 py-2" : "px-4 py-2.5"
							}`}>
							<div className="flex items-center gap-2.5">
								<Search className="w-4 h-4 text-muted-foreground" />
								<span className="opacity-90">Buscar cursos...</span>
							</div>
							<kbd className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono bg-background border border-border text-muted-foreground shadow-sm">
								⌘K
							</kbd>
						</button>

						{/* Mobile search */}
						<button
							onClick={() => setIsSearchOpen(true)}
							className="md:hidden p-2 text-muted-foreground hover:text-foreground rounded-xl hover:bg-secondary transition-colors">
							<Search className="w-5 h-5" />
						</button>

						{/* Divider */}
						<div className="hidden lg:block w-px h-6 bg-border mx-1" />

						{/* Dark mode */}
						<button
							onClick={toggleDarkMode}
							className="p-2.5 text-muted-foreground hover:text-foreground rounded-xl hover:bg-secondary transition-colors border border-transparent hover:border-border">
							{darkMode ? (
								<Sun className="w-5 h-5" />
							) : (
								<Moon className="w-5 h-5" />
							)}
						</button>

						{/* Auth buttons */}
						<div className="hidden sm:flex items-center gap-3">
							{user ? (
								<>
									<NotificationBell />
									<UserMenu />
								</>
							) : (
								<>
									<Link
										href="/login"
										className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-foreground bg-background border border-border hover:bg-accent hover:text-accent-foreground rounded-xl transition-all shadow-sm">
										<LogIn className="w-4 h-4" />
										Ingresar
									</Link>
									<Link
										href="/register"
										className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5">
										Registrarse
									</Link>
								</>
							)}
						</div>

						{/* Mobile hamburger */}
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="lg:hidden p-2 text-muted-foreground hover:text-foreground rounded-xl hover:bg-secondary transition-colors">
							{isMobileMenuOpen ? (
								<X className="w-6 h-6" />
							) : (
								<Menu className="w-6 h-6" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile menu */}
				{isMobileMenuOpen && (
					<div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
						<div className="container mx-auto px-4 py-4 space-y-1">
							{NAV_LINKS.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									onClick={() => setIsMobileMenuOpen(false)}
									className="flex items-center justify-between px-3 py-3 text-sm font-semibold text-foreground hover:bg-muted/50 rounded-lg transition-colors">
									{link.label}
									<ChevronRight className="w-4 h-4 text-muted-foreground" />
								</Link>
							))}
							{/* Notifications link (mobile, logged-in only) */}
							{user && (
								<Link
									href="/dashboard/notificaciones"
									onClick={() => setIsMobileMenuOpen(false)}
									className="flex items-center justify-between px-3 py-3 text-sm font-semibold text-foreground hover:bg-muted/50 rounded-lg transition-colors">
									<span className="flex items-center gap-2">
										<Bell className="w-4 h-4" />
										Notificaciones
									</span>
									<ChevronRight className="w-4 h-4 text-muted-foreground" />
								</Link>
							)}
							<div className="pt-4 border-t border-border mt-4 flex flex-col gap-3">
								{user ? (
									<UserMenu />
								) : (
									<>
										<Link
											href="/register"
											onClick={() => setIsMobileMenuOpen(false)}
											className="w-full inline-flex items-center justify-center px-4 py-3.5 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-md shadow-primary/25">
											Registrarse
										</Link>
										<Link
											href="/login"
											onClick={() => setIsMobileMenuOpen(false)}
											className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold text-foreground border border-border bg-background hover:bg-accent rounded-xl transition-colors shadow-sm">
											<LogIn className="w-4 h-4" />
											Ingresar
										</Link>
									</>
								)}
							</div>
						</div>
					</div>
				)}
			</header>

			<SearchModal
				isOpen={isSearchOpen}
				onClose={() => setIsSearchOpen(false)}
			/>
		</>
	);
}
