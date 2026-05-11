"use client";

import { useState } from "react";

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
	const [hasError, setHasError] = useState(false);

	const initials =
		(firstName?.[0]?.toUpperCase() ?? "") +
		(lastName?.[0]?.toUpperCase() ?? "");

	const sizeClass = size === 36 ? "w-9 h-9" : `w-[${size}px] h-[${size}px]`;

	if (avatarUrl && !hasError) {
		return (
			// eslint-disable-next-line @next/next/no-img-element
			<img
				src={avatarUrl}
				alt={`${firstName} ${lastName}`}
				width={size}
				height={size}
				className={`${sizeClass} rounded-full object-cover border-2 border-border shrink-0`}
				onError={() => setHasError(true)}
			/>
		);
	}

	return (
		<span
			className={`${sizeClass} rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-black border-2 border-border select-none shrink-0`}
		>
			{initials}
		</span>
	);
}
