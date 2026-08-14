"use client";

import { useRef, useState, useEffect } from "react";
import { ShieldCheck, User, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SmartImage } from "@/components/ui/SmartImage";

export interface Teacher {
	name: string;
	specialty: string;
	image: string | null;
}

/** Same scroll/arrow carousel behavior as HomeCourses — kept in sync so every
 * horizontally-scrollable section on the landing feels the same. */
export function TeachersCarousel({ teachers }: { teachers: Teacher[] }) {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	const checkScroll = () => {
		if (scrollContainerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
			setCanScrollLeft(scrollLeft > 1);
			setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
		}
	};

	useEffect(() => {
		checkScroll();
		window.addEventListener("resize", checkScroll);
		return () => window.removeEventListener("resize", checkScroll);
	}, []);

	useEffect(() => {
		if (teachers?.length) {
			setTimeout(checkScroll, 50);
		}
	}, [teachers]);

	const smoothScroll = (element: HTMLElement, targetPosition: number, duration: number) => {
		const startPosition = element.scrollLeft;
		const distance = targetPosition - startPosition;
		let startTime: number | null = null;

		const originalSnap = element.style.scrollSnapType;
		element.style.scrollSnapType = "none";

		const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

		const animation = (currentTime: number) => {
			if (startTime === null) startTime = currentTime;
			const timeElapsed = currentTime - startTime;
			const progress = Math.min(timeElapsed / duration, 1);

			element.scrollLeft = startPosition + distance * easeInOutQuad(progress);

			if (timeElapsed < duration) {
				requestAnimationFrame(animation);
			} else {
				element.scrollLeft = targetPosition;
				element.style.scrollSnapType = originalSnap;
			}
		};

		requestAnimationFrame(animation);
	};

	const scroll = (direction: "left" | "right") => {
		if (scrollContainerRef.current) {
			const container = scrollContainerRef.current;
			const firstCard = container.firstElementChild as HTMLElement;
			if (!firstCard) return;

			const windowWidth = window.innerWidth;
			const gap = windowWidth >= 768 ? 32 : 24;
			const scrollAmount = firstCard.getBoundingClientRect().width + gap;
			const maxScroll = container.scrollWidth - container.clientWidth;
			let targetPosition =
				direction === "left"
					? container.scrollLeft - scrollAmount
					: container.scrollLeft + scrollAmount;
			targetPosition = Math.max(0, Math.min(targetPosition, maxScroll));
			smoothScroll(container, targetPosition, 400);
		}
	};

	return (
		<section className="py-20 relative z-10 bg-transparent border-b border-border/50">
			{/* Header Section */}
			<div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
				<ScrollReveal animation="fade-in-up" duration={700} threshold={0.15}>
					<div className="flex flex-col items-center text-center mb-16 space-y-4">
						<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-semibold text-xs uppercase tracking-wider">
							<ShieldCheck className="w-3.5 h-3.5" />
							<span>Profesionales del Sector</span>
						</div>
						<h2 className="relative text-3xl md:text-4xl font-extrabold text-foreground tracking-tight uppercase pb-4">
							Plana Docente
							<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-secondary rounded-full"></span>
						</h2>
						<p className="text-muted-foreground text-sm md:text-base font-medium max-w-lg mt-2">
							Aprende directamente de expertos que lideran proyectos y aplican estas metodologías en la industria actual.
						</p>
					</div>
				</ScrollReveal>
			</div>

			{/* Carousel / States */}
			<div className="relative w-full max-w-[1500px] mx-auto px-4 md:px-8 lg:px-10 xl:px-12 group/carousel">
				{/* Empty state */}
				{teachers.length === 0 && (
					<div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
						<User className="w-10 h-10 opacity-40" />
						<p className="text-sm">Próximamente presentaremos a nuestra plana docente.</p>
					</div>
				)}

				{/* Carousel with nav buttons */}
				{teachers.length > 0 && (
					<>
						<button
							onClick={() => scroll("left")}
							className={`absolute -left-1 md:left-0 lg:left-2 xl:left-4 top-1/2 -translate-y-1/2 z-20 bg-background/90 hover:bg-background text-foreground border border-border/50 shadow-lg rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
								canScrollLeft
									? "opacity-0 group-hover/carousel:opacity-100 hover:scale-110"
									: "opacity-0 pointer-events-none"
							}`}
							aria-label="Anterior">
							<ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
						</button>

						<button
							onClick={() => scroll("right")}
							className={`absolute -right-1 md:right-0 lg:right-2 xl:right-4 top-1/2 -translate-y-1/2 z-20 bg-background/90 hover:bg-background text-foreground border border-border/50 shadow-lg rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
								canScrollRight
									? "opacity-0 group-hover/carousel:opacity-100 hover:scale-110"
									: "opacity-0 pointer-events-none"
							}`}
							aria-label="Siguiente">
							<ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
						</button>

						<div
							ref={scrollContainerRef}
							onScroll={checkScroll}
							className="flex overflow-x-auto gap-6 md:gap-8 pb-4 pt-2 px-1 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
							{teachers.map((teacher, index) => (
								<ScrollReveal
									key={index}
									animation="fade-in-up"
									duration={800}
									delay={index * 120 + 100}
									threshold={0.1}
									className="snap-start shrink-0 w-[calc(100%-32px)] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-64px)/3)]">
									<div className="group relative flex items-center gap-6 bg-card text-card-foreground border border-border/50 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden h-full">
										{/* Background Decoration */}
										<div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
										<div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-tr-full -translate-x-1/2 translate-y-1/2 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

										{/* Large Image */}
										<div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 rounded-full bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center overflow-hidden border-4 border-card shadow-md group-hover:shadow-lg transition-all duration-500 z-10 relative">
											<SmartImage
												src={teacher.image}
												alt={teacher.name}
												fill
												sizes="128px"
												className="object-cover group-hover:scale-110 transition-transform duration-700"
												fallback={
													<User className="w-12 h-12 text-primary/40 group-hover:text-primary group-hover:scale-110 transition-all duration-500" />
												}
											/>
										</div>

										{/* Text Content */}
										<div className="flex flex-col text-left z-10">
											<h3 className="font-extrabold text-[15px] md:text-[17px] text-foreground leading-none mb-2 group-hover:text-secondary transition-colors duration-300">
												{teacher.name}
											</h3>
											<p className="text-muted-foreground font-medium text-[13px] md:text-[14px] leading-relaxed mb-4">
												{teacher.specialty}
											</p>
											<div className="w-8 h-1 bg-secondary rounded-full group-hover:w-16 transition-all duration-500" />
										</div>
									</div>
								</ScrollReveal>
							))}
						</div>
					</>
				)}
			</div>
		</section>
	);
}
