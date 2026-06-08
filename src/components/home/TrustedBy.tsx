import { Agreements } from "./Agreements";

export function TrustedBy() {
	return (
		<section className="py-12 relative w-full bg-transparent overflow-hidden">
			<div className="container mx-auto px-4 lg:px-8 max-w-7xl">
				
				<div className="flex flex-col items-center text-center mb-10 space-y-4">
					<h2 className="relative text-2xl md:text-3xl font-extrabold text-foreground tracking-tight uppercase pb-4">
						Convenios y Asociaciones
						<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-secondary rounded-full"></span>
					</h2>
				</div>

				<Agreements />
			</div>
		</section>
	);
}
