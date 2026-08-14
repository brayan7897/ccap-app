"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { shimmerBlurDataURL } from "@/lib/image-placeholder";
import { cn } from "@/lib/utils";

export interface SmartImageProps
	extends Omit<ImageProps, "src" | "placeholder" | "blurDataURL" | "onLoad" | "onError"> {
	/** Unlike next/image, may be null/undefined/empty — falls back to `fallback` instead of erroring. */
	src: ImageProps["src"] | null | undefined;
	/** Rendered instead of the image when `src` is falsy or the image fails to load. */
	fallback?: React.ReactNode;
	/** Sizing hint for the shimmer SVG's viewBox only — cosmetic, need not match
	 *  the rendered size. Defaults to shimmerBlurDataURL's own default (700x475). */
	placeholderSize?: { w: number; h: number };
}

/**
 * Shared next/image wrapper: shimmer placeholder while loading, smooth
 * fade-in once loaded, optional fallback for missing/broken sources — the
 * one consistent image-loading treatment for the whole app instead of each
 * component hand-rolling its own (or none at all).
 */
export function SmartImage({
	src,
	alt,
	className,
	fallback = null,
	placeholderSize,
	...rest
}: SmartImageProps) {
	const [loaded, setLoaded] = useState(false);
	const [errored, setErrored] = useState(false);

	// Reset on src change — callers like the avatar-URL live preview swap src
	// on every keystroke, and without this the fade/fallback state would
	// carry over from the previous image.
	useEffect(() => {
		setLoaded(false);
		setErrored(false);
	}, [src]);

	if (!src || errored) return <>{fallback}</>;

	return (
		<Image
			src={src}
			alt={alt}
			placeholder="blur"
			blurDataURL={shimmerBlurDataURL(placeholderSize?.w, placeholderSize?.h)}
			onLoad={() => setLoaded(true)}
			onError={() => setErrored(true)}
			className={cn(
				"transition-opacity duration-500 ease-out",
				loaded ? "opacity-100" : "opacity-0",
				className,
			)}
			{...rest}
		/>
	);
}
