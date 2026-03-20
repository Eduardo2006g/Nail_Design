import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, Sparkles, CalendarHeart } from "lucide-react";

const services = [
  {
    title: "Alongamento em Fibra de Vidro",
    description: "Técnica de excelência que proporciona naturalidade, resistência e durabilidade incomparáveis.",
    time: "2h 30m",
    price: "R$ 250",
  },
  {
    title: "Manutenção de Fibra",
    description: "Renovação do alongamento, tratamento das cutículas e esmaltação em gel perfeita.",
    time: "1h 45m",
    price: "R$ 150",
  },
  {
    title: "Banho de Gel",
    description: "Cobertura protetora de gel sobre as unhas naturais, ideal para quem busca força e crescimento.",
    time: "1h 15m",
    price: "R$ 120",
  },
  {
    title: "Esmaltação em Gel",
    description: "Cores intensas e brilho espelhado que duram até 21 dias sem lascar.",
    time: "45m",
    price: "R$ 80",
  },
];

const portfolio = [
  "/images/unha1.jpeg",
  "/images/unha2.jpeg",
  "/images/unha3.png",
  "/images/unha4.png",
  "/images/unha5.png",
  "/images/unha1.jpeg"
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-secondary">
        <div className="container mx-auto px-4 md:px-8 pt-24 pb-32 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8 z-10">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Sparkles className="mr-2 h-4 w-4" />
              Design & Sofisticação
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-tight">
              A arte de ter <br />
              <span className="text-primary italic">unhas impecáveis</span>
            </h1>
            <p className="max-w-[600px] text-lg text-muted-foreground leading-relaxed">
              Descubra um novo nível de cuidado e beleza. Especialistas em alongamentos
              de alto padrão e técnicas modernas para realçar a sua essência.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="rounded-full text-base h-14 px-8" asChild>
                <Link href="/book">Agende seu Horário</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full text-base h-14 px-8" asChild>
                <Link href="#portfolio">Ver Portfólio</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 relative w-full max-w-lg aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl z-10">
            <Image
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80"
              alt="Lahass Nails"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl z-0" />
          <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-accent blur-3xl z-0" />
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="w-full py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="font-serif text-4xl font-bold text-foreground">Nossos Serviços</h2>
            <p className="text-lg text-muted-foreground">
              Técnicas avançadas e produtos de altíssima qualidade para garantir um resultado elegante e duradouro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors shadow-sm bg-card">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                    <span className="text-xl font-bold text-primary font-serif">{service.price}</span>
                  </div>
                  <p className="text-muted-foreground mb-8 flex-1">
                    {service.description}
                  </p>
                  <div className="flex items-center text-sm font-medium text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4 text-primary" />
                    Tempo estimado: {service.time}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="w-full py-24 bg-card/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl space-y-4">
              <h2 className="font-serif text-4xl font-bold text-foreground">Portfólio</h2>
              <p className="text-lg text-muted-foreground">
                Um vislumbre das nossas criações. Cada detalhe é pensado para destacar a sua personalidade.
              </p>
            </div>
            <Button variant="link" className="text-primary p-0 h-auto font-medium text-base" asChild>
              <Link href="https://www.instagram.com/lahass.nails/" target="_blank">
                Siga no Instagram →
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {portfolio.map((img, i) => (
              <div key={i} className="relative aspect-square w-full overflow-hidden rounded-2xl group cursor-pointer bg-muted">
                <Image
                  src={img}
                  alt={`Portfolio image ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Booking */}
      <section className="w-full py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
            <CalendarHeart className="h-16 w-16 opacity-80" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
              Pronta para renovar a sua autoestima?
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              Nossa agenda está aberta. Reserve seu momento de cuidado com facilidade e rapidez através do nosso sistema online.
            </p>
            <Button size="lg" variant="secondary" className="rounded-full text-base h-16 px-10 mt-4 text-primary font-semibold shadow-xl hover:scale-105 transition-transform" asChild>
              <Link href="/book">Iniciar Agendamento</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
