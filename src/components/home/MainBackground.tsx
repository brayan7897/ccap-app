export function MainBackground() {
	return (
		<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
			{/* Gradiente Estático Descendente - Integración Perfecta con TrustedBy */}
			<div className="absolute inset-0 bg-linear-to-b from-background via-background/90 to-muted/30 dark:to-muted/10 transition-colors duration-700" />
			
			{/* Malla SaaS - Cuadrícula vectorial sutil */}
			<div className="absolute inset-0 opacity-[0.25] dark:opacity-[0.10] bg-[radial-gradient(circle,var(--color-border)_1px,transparent_1px)] bg-[length:32px_32px] transition-opacity duration-700" />
		</div>
	);
}
