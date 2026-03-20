import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, MoreVertical, XCircle } from "lucide-react";

const appointments = [
  { id: 1, client: "Amanda Rodrigues", service: "Alongamento Fibra", time: "09:00", status: "confirmed", value: "R$ 250" },
  { id: 2, client: "Beatriz Mello", service: "Manutenção", time: "13:00", status: "pending", value: "R$ 150" },
  { id: 3, client: "Carla Souza", service: "Esmaltação em Gel", time: "16:00", status: "confirmed", value: "R$ 80" },
];

export default function AdminPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight font-serif">Olá, Nail Designer ✨</h2>
        <div className="flex items-center space-x-2">
          <Button>Nova Reserva Viela</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos Hoje</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 pendente de aprovação</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento do Dia</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 480,00</div>
            <p className="text-xs text-muted-foreground">+20% em relação a ontem</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7 mt-8">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Agenda do Dia</CardTitle>
            <CardDescription>
              Você tem 3 compromissos agendados para hoje.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-4 border rounded-xl bg-background">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {apt.time.split(":")[0]}h
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{apt.client}</p>
                      <p className="text-sm text-muted-foreground mt-1">{apt.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="font-medium">{apt.value}</div>
                    {apt.status === "pending" ? (
                      <div className="flex gap-2">
                        <Button size="icon" variant="outline" className="h-8 w-8 text-destructive border-destructive hover:bg-destructive/10"><XCircle className="h-4 w-4" /></Button>
                        <Button size="icon" variant="outline" className="h-8 w-8 text-primary border-primary hover:bg-primary/10"><CheckCircle2 className="h-4 w-4" /></Button>
                      </div>
                    ) : (
                      <div className="bg-green-500/10 text-green-600 border border-green-500/20 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Confirmado
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendar View Placeholder Component */}
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Resumo Semanal</CardTitle>
            <CardDescription>Dias mais movimentados da semana</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, i) => (
                <div key={day} className="flex items-center text-sm">
                  <span className="w-8 font-medium">{day}</span>
                  <div className="flex-1 bg-muted rounded-full ml-4 h-2 overflow-hidden">
                    <div className="bg-primary h-full" style={{ width: `${Math.random() * 80 + 20}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Simple Icon Helpers to avoid cluttering imports if missing
function CalendarIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}
function DollarSignIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}
