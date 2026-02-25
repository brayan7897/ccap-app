import { Shield, Users, Award, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const BENEFITS = [
  {
    title: "Comunidad Activa",
    description: "Conecta con más de 10,000 estudiantes y profesionales de tu sector.",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Certificados Oficiales",
    description: "Obtén validación de tus habilidades para destacar en tu carrera.",
    icon: Award,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "Acceso Ilimitado",
    description: "Aprende a tu propio ritmo, desde cualquier dispositivo, 24/7.",
    icon: Zap,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    title: "Soporte Premium",
    description: "Resolución de dudas rápida y mentorías exclusivas.",
    icon: Shield,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  }
];

export function SocialBenefits() {
  return (
    <section className="mt-12 space-y-6">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold tracking-tight">Potencia tu futuro</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Descubre por qué miles confían en nuestra plataforma
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {BENEFITS.map((benefit, idx) => (
          <Card key={idx} className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:shadow-sm transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <div className={`p-3 rounded-full ${benefit.bgColor}`}>
                <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
              </div>
              <div>
                <h3 className="font-semibold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
