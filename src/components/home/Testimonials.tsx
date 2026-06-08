"use client";

import { useRef, useState, useEffect } from "react";
import { MessageSquareQuote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export interface Testimonial {
	quote: string;
	name: string;
	role: string;
	image: string | null;
	rating: number;
}

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
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

	const scroll = (direction: "left" | "right") => {
		if (scrollContainerRef.current) {
			const container = scrollContainerRef.current;
			const firstCard = container.firstElementChild as HTMLElement;
			if (!firstCard) return;

			const w = window.innerWidth;
			const gap = w >= 1024 ? 32 : w >= 768 ? 24 : 16;
			const scrollAmount = firstCard.getBoundingClientRect().width + gap;
			const maxScroll = container.scrollWidth - container.clientWidth;
			let targetPosition =
				direction === "left"
					? container.scrollLeft - scrollAmount
					: container.scrollLeft + scrollAmount;
			targetPosition = Math.max(0, Math.min(targetPosition, maxScroll));
			container.scrollTo({ left: targetPosition, behavior: "smooth" });
		}
	};

	if (!testimonials || testimonials.length === 0) {
		return null;
	}

	return (
		<section className="py-20 relative z-10 bg-muted/10">
			<div className="container mx-auto px-4 lg:px-8 max-w-7xl">
				<ScrollReveal animation="fade-in-up" duration={700} threshold={0.15}>
					<div className="flex flex-col items-center text-center mb-16 space-y-3">
						<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-semibold text-xs uppercase tracking-wider">
							<MessageSquareQuote className="w-3.5 h-3.5" />
							<span>Casos de Éxito</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight uppercase">
							Testimonios de <span className="text-secondary">Clientes</span>
						</h2>
						<p className="text-muted-foreground text-sm md:text-base font-medium max-w-lg">
							Descubre cómo nuestros programas han impulsado la carrera de cientos de profesionales en todo el país.
						</p>
					</div>
				</ScrollReveal>
			</div>

			{/* Carousel */}
			<div className="relative w-full max-w-[1500px] mx-auto px-4 md:px-8 lg:px-10 xl:px-12 group/carousel">
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
					className="flex overflow-x-auto gap-4 md:gap-6 lg:gap-8 pb-12 pt-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
					{testimonials.map((testimonial, index) => (
						<ScrollReveal
							key={index}
							animation="fade-in-up"
							duration={800}
							delay={index * 150 + 100}
							threshold={0.1}
							className="snap-start shrink-0 w-[85%] sm:w-[calc((100%-16px)/2)] md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-64px)/3)]"
						>
							<div className="group flex flex-col md:flex-row gap-4 md:gap-5 bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-secondary/30 transition-all duration-300 h-full relative overflow-hidden">
								
								{/* Left Column: Quote Icon */}
								<div className="shrink-0 pt-1">
									<span className="text-secondary text-5xl md:text-6xl font-serif font-black leading-none drop-shadow-sm group-hover:scale-110 transition-transform duration-300 inline-block">“</span>
								</div>
								
								{/* Right Column: Content */}
								<div className="flex flex-col flex-1">
									<p className="text-foreground/80 font-medium text-[13px] md:text-[14px] leading-relaxed mb-6 grow">
										{testimonial.quote}
									</p>

									{/* Footer: User Info */}
									<div className="flex items-center gap-4">
										<div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center overflow-hidden shrink-0 shadow-sm border border-secondary/20">
											{testimonial.image ? (
												<img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
											) : (
												<span className="font-black text-lg">{testimonial.name.charAt(0)}</span>
											)}
										</div>
										<div className="flex flex-col">
											<span className="font-extrabold text-[14px] md:text-[15px] text-foreground leading-none mb-1 group-hover:text-secondary transition-colors">{testimonial.name}</span>
											{testimonial.role && <span className="text-[12px] md:text-[13px] text-muted-foreground font-medium mb-1.5 leading-none">{testimonial.role}</span>}
											<div className="flex gap-1 mt-1">
												{[...Array(testimonial.rating)].map((_, i) => (
													<Star key={i} className="w-3.5 h-3.5 text-secondary fill-secondary" />
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</ScrollReveal>
					))}
				</div>
			</div>
		</section>
	);
}

