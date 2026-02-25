import Image from 'next/image';

const PARTNERS = [
  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
  { name: 'Intel', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg' }
];

export function TrustedBy() {
  return (
    <section className="w-full bg-white py-12 border-b border-slate-200">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">
          Nuestros egresados trabajan en empresas líderes
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {PARTNERS.map((partner) => (
            <div key={partner.name} className="relative h-8 w-24 md:h-10 md:w-32 transition-transform hover:scale-110">
              <Image 
                src={partner.logo} 
                alt={`${partner.name} logo`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
