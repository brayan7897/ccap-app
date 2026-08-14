"use client";

import { useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";

interface HeaderUserAvatarProps {
	avatarUrl: string | null | undefined;
	firstName: string;
	lastName: string;
	/** Size in px — defaults to 36 (w-9 h-9) */
	size?: number;
}

/**
 * Shared avatar component used by both the landing Navbar and the Dashboard
 * header. Falls back to initials on load errors or missing URLs, ensuring a
 * consistent appearance across contexts.
 */
export function HeaderUserAvatar({
	avatarUrl,
	firstName,
	lastName,
	size = 36,
}: HeaderUserAvatarProps) {
	const initials =
		(firstName?.[0]?.toUpperCase() ?? "") +
		(lastName?.[0]?.toUpperCase() ?? "");

	const sizeClass = size === 36 ? "w-9 h-9" : `w-[${size}px] h-[${size}px]`;

	return (
		<SmartImage
			// avatarUrl is a free-text field (see perfil/page.tsx) — any host is
			// possible, so this stays unoptimized rather than going through
			// next/image's remotePatterns-gated optimizer.
			unoptimized
			src={avatarUrl}
			alt={`${firstName} ${lastName}`}
			width={size}
			height={size}
			className={`${sizeClass} rounded-full object-cover border-2 border-border shrink-0`}
			fallback={
				<span
					className={`${sizeClass} rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-black border-2 border-border select-none shrink-0`}
				>
					{initials}
				</span>
			}
		/>
	);
}
