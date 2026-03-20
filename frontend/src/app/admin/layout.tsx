import Link from "next/link";
import { CalendarDays, Users, Settings, LogOut, LayoutDashboard, Image as ImageIcon, Package } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      {/* Sidebar Desktop */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-card sm:flex">
        <div className="flex h-16 shrink-0 items-center border-b px-6">
          <Link href="/admin" className="font-serif text-2xl font-bold tracking-tight text-primary">
            NailSpa <span className="text-foreground text-sm font-sans block mt-[-4px]">Admin</span>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col gap-2 p-4 text-sm font-medium">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-lg bg-primary/10 text-primary px-3 py-2 transition-all"
          >
            <LayoutDashboard className="h-4 w-4" />
            Visão Geral
          </Link>
          <Link
            href="/admin/agenda"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
          >
            <CalendarDays className="h-4 w-4" />
            Agenda
          </Link>
          <Link
            href="/admin/clientes"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
          >
            <Users className="h-4 w-4" />
            Clientes
          </Link>
          <Link
            href="/admin/portfolio"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
          >
            <ImageIcon className="h-4 w-4" />
            Portfólio
          </Link>
          <Link
            href="/admin/estoque"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
          >
            <Package className="h-4 w-4" />
            Estoque
          </Link>
          <Link
            href="/admin/configuracoes"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
          >
            <Settings className="h-4 w-4" />
            Serviços & Preços
          </Link>
        </nav>
        <div className="mt-auto p-4 border-t">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-destructive transition-all hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
            Sair do Painel
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex w-full flex-col sm:pl-64">
        {children}
      </main>
    </div>
  );
}
