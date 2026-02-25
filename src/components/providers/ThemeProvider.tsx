"use client";

import { useEffect } from "react";
import { useUiStore } from "@/store/ui-store";

/**
 * Syncs the Zustand darkMode state with the <html> class on first render.
 * Must be rendered inside the root layout so it runs before any page content.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const darkMode = useUiStore((s) => s.darkMode);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", darkMode);
	}, [darkMode]);

	return <>{children}</>;
}
