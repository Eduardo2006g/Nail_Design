import Link from "next/link";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <span className="font-serif text-2xl font-bold text-primary">NailSpa</span>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Especialistas em alongamentos de alto padrão e técnicas modernas de nail art. Beleza e sofisticação em cada detalhe.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Navegação</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/#servicos" className="hover:text-primary transition-colors">Serviços</Link></li>
              <li><Link href="/#portfolio" className="hover:text-primary transition-colors">Portfólio</Link></li>
              <li><Link href="/book" className="hover:text-primary transition-colors">Agendamento</Link></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Redes Sociais</h3>
            <Link
              href="https://www.instagram.com/lahass.nails/"
              target="_blank"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="h-4 w-4" />
              @lahass.nails
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} NailSpa Design. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
