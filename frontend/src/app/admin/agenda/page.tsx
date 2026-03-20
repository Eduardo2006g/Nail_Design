"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const allAppointments: Record<number, { id: number; client: string; service: string; time: string; status: string; value: string }[]> = {
  0: [
    { id: 1, client: "Amanda Rodrigues", service: "Alongamento Fibra", time: "09:00", status: "confirmed", value: "R$ 250" },
    { id: 2, client: "Beatriz Mello", service: "Manutenção", time: "13:00", status: "pending", value: "R$ 150" },
  ],
  1: [
    { id: 3, client: "Carla Souza", service: "Esmaltação em Gel", time: "10:30", status: "confirmed", value: "R$ 80" },
  ],
  2: [],
  3: [
    { id: 4, client: "Daniela Lima", service: "Banho de Gel", time: "14:00", status: "pending", value: "R$ 120" },
    { id: 5, client: "Eva Martins", service: "Esmaltação em Gel", time: "16:30", status: "confirmed", value: "R$ 80" },
  ],
  4: [
    { id: 6, client: "Fernanda Costa", service: "Alongamento Fibra", time: "09:00", status: "confirmed", value: "R$ 250" },
  ],
  5: [],
};

export default function AgendaPage() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [statuses, setStatuses] = useState<Record<number, string>>(
    Object.fromEntries(
      Object.values(allAppointments).flat().map((a) => [a.id, a.status])
    )
  );

  const appointments = allAppointments[selectedDay] ?? [];

  const confirm = (id: number) => setStatuses((s) => ({ ...s, [id]: "confirmed" }));
  const cancel = (id: number) => setStatuses((s) => ({ ...s, [id]: "cancelled" }));

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-serif">Agenda</h2>
          <p className="text-muted-foreground text-sm mt-1">Gerencie seus compromissos semanais.</p>
        </div>
        <Button className="rounded-full">+ Novo Agendamento</Button>
      </div>

      {/* Week Selector */}
      <div className="flex items-center gap-2 mb-4">
        <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex gap-2 overflow-x-auto">
          {DAYS.map((day, i) => {
            const count = (allAppointments[i] ?? []).length;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(i)}
                className={`flex-none flex flex-col items-center justify-center w-16 h-20 rounded-2xl border-2 transition-all ${
                  selectedDay === i
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/50 bg-card"
                }`}
              >
                <span className="text-xs uppercase font-medium opacity-80">{day}</span>
                <span className="text-lg font-bold mt-1">{i + 14}</span>
                {count > 0 && (
                  <span className={`text-xs mt-1 ${selectedDay === i ? "opacity-80" : "text-primary"}`}>
                    {count} apt.
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Appointments for Selected Day */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>
            {DAYS[selectedDay]}, {selectedDay + 14} de Março
          </CardTitle>
          <CardDescription>
            {appointments.length === 0
              ? "Nenhum agendamento para este dia."
              : `${appointments.length} agendamento(s)`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {appointments.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-4xl mb-3">🗓️</p>
              <p>Dia livre! Aproveite.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((apt) => {
                const status = statuses[apt.id];
                return (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between p-4 border rounded-xl bg-background"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {apt.time}
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none">{apt.client}</p>
                        <p className="text-sm text-muted-foreground mt-1">{apt.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-medium text-sm">{apt.value}</div>
                      {status === "pending" ? (
                        <div className="flex gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 text-destructive border-destructive hover:bg-destructive/10"
                            onClick={() => cancel(apt.id)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 text-primary border-primary hover:bg-primary/10"
                            onClick={() => confirm(apt.id)}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : status === "confirmed" ? (
                        <span className="bg-green-500/10 text-green-600 border border-green-500/20 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Confirmado
                        </span>
                      ) : (
                        <span className="bg-destructive/10 text-destructive border border-destructive/20 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                          <XCircle className="h-3 w-3" /> Cancelado
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
