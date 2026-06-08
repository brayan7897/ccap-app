"use client";

import { useEffect, useState, ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		const raf = requestAnimationFrame(() => {
			setIsMounted(true);
		});
		return () => cancelAnimationFrame(raf);
	}, []);

	return (
		<div
			className={`transition-all duration-500 ease-out will-change-[opacity,transform] ${
				isMounted
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-3"
			}`}
		>
			{children}
		</div>
	);
}
