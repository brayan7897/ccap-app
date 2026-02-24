"use client";

import Link from "next/link";
import { Moon, Sun, Menu, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/ui-store";

export function Navbar() {
  const { darkMode, toggleDarkMode, toggleSidebar } = useUiStore();

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-card px-4">
      {/* Sidebar toggle (visible on all screens) */}
      <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle sidebar">
        <Menu className="h-5 w-5" />
      </Button>

      {/* Brand */}
      <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
        <BookOpen className="h-5 w-5" />
        <span className="hidden sm:inline">CCAP</span>
      </Link>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Dark mode toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleDarkMode}
        aria-label={darkMode ? "Activar modo claro" : "Activar modo oscuro"}
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    </header>
  );
}
