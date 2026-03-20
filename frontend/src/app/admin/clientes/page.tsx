"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Phone } from "lucide-react";

const clients = [
  { id: 1, name: "Amanda Rodrigues", phone: "(11) 99999-0001", appointments: 8, lastService: "Alongamento Fibra", lastDate: "14/03", totalSpent: "R$ 1.850" },
  { id: 2, name: "Beatriz Mello", phone: "(11) 99999-0002", appointments: 3, lastService: "Manutenção", lastDate: "14/03", totalSpent: "R$ 480" },
  { id: 3, name: "Carla Souza", phone: "(11) 99999-0003", appointments: 12, lastService: "Esmaltação em Gel", lastDate: "15/03", totalSpent: "R$ 1.240" },
  { id: 4, name: "Daniela Lima", phone: "(11) 99999-0004", appointments: 5, lastService: "Banho de Gel", lastDate: "17/03", totalSpent: "R$ 650" },
  { id: 5, name: "Eva Martins", phone: "(11) 99999-0005", appointments: 2, lastService: "Esmaltação em Gel", lastDate: "17/03", totalSpent: "R$ 160" },
  { id: 6, name: "Fernanda Costa", phone: "(11) 99999-0006", appointments: 15, lastService: "Alongamento Fibra", lastDate: "18/03", totalSpent: "R$ 3.200" },
];

export default function ClientesPage() {
  const [search, setSearch] = useState("");

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-serif">Clientes</h2>
          <p className="text-muted-foreground text-sm mt-1">{clients.length} clientes cadastradas.</p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou telefone..."
          className="pl-9 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>
            {filtered.length === 0
              ? "Nenhuma cliente encontrada."
              : `${filtered.length} resultado(s).`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.map((client) => (
              <div
                key={client.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-xl bg-background gap-4 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                    {client.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-none text-foreground">{client.name}</p>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {client.phone}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm pl-14 sm:pl-0">
                  <div className="text-center">
                    <p className="font-bold text-foreground">{client.appointments}</p>
                    <p className="text-xs text-muted-foreground">Visitas</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-foreground">{client.totalSpent}</p>
                    <p className="text-xs text-muted-foreground">Total Gasto</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-foreground text-xs">{client.lastService}</p>
                    <p className="text-xs text-muted-foreground">{client.lastDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
