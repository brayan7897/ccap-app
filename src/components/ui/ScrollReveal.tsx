"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
	children: ReactNode;
	className?: string;
	animation?: "fade-in-up" | "fade-in-right" | "fade-in-left" | "scale-in";
	delay?: number; // in ms
	duration?: number; // in ms
	threshold?: number;
}

export function ScrollReveal({
	children,
	className = "",
	animation = "fade-in-up",
	delay = 0,
	duration = 800,
	threshold = 0.05,
}: ScrollRevealProps) {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target);
				}
			},
			{
				threshold,
				rootMargin: "0px 0px -80px 0px", // Triggers just before entering viewport
			}
		);

		const currentRef = ref.current;
		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, [threshold]);

	const animationClass = isVisible ? `animate-${animation}` : "opacity-0";

	return (
		<div
			ref={ref}
			className={`${animationClass} ${className}`}
			style={{
				animationDelay: `${delay}ms`,
				animationDuration: `${duration}ms`,
				willChange: "transform, opacity",
			}}
		>
			{children}
		</div>
	);
}
