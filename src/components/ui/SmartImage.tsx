"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { shimmerBlurDataURL } from "@/lib/image-placeholder";
import { cn } from "@/lib/utils";

// useLayoutEffect warns when it runs during SSR (this component is a client
// component, but Next still renders it once on the server for the initial
// HTML) — fall back to useEffect there since the cache check is meaningless
// server-side anyway (no DOM, nothing can already be "cached").
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

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
	const imgRef = useRef<HTMLImageElement>(null);
	const [loaded, setLoaded] = useState(false);
	const [errored, setErrored] = useState(false);

	// Reset on src change (also handles callers like the avatar-URL live
	// preview, which swap src on every keystroke) — but first check whether
	// the browser already has this exact image decoded (e.g. the same course
	// thumbnail shown moments ago in a card). useLayoutEffect runs before the
	// browser paints, so when it's cached this flips `loaded` to true before
	// anything is drawn — no shimmer, no fade, it just appears. naturalWidth
	// guards against a broken image the browser still marks "complete".
	useIsomorphicLayoutEffect(() => {
		setErrored(false);
		setLoaded(!!(imgRef.current?.complete && imgRef.current.naturalWidth > 0));
	}, [src]);

	if (!src || errored) return <>{fallback}</>;

	return (
		<Image
			ref={imgRef}
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
