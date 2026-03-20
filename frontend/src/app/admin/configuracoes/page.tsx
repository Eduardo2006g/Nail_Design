"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Check, X, Plus, Trash2 } from "lucide-react";

type Service = {
  id: string;
  title: string;
  duration: string;
  price: string;
};

const initialServices: Service[] = [
  { id: "fibra", title: "Alongamento em Fibra de Vidro", duration: "2h 30m", price: "250" },
  { id: "manu", title: "Manutenção de Fibra", duration: "1h 45m", price: "150" },
  { id: "banho", title: "Banho de Gel", duration: "1h 15m", price: "120" },
  { id: "esmalte", title: "Esmaltação em Gel", duration: "45m", price: "80" },
];

export default function ConfiguracoesPage() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Service>>({});

  const startEdit = (svc: Service) => {
    setEditingId(svc.id);
    setEditData({ title: svc.title, duration: svc.duration, price: svc.price });
  };

  const saveEdit = (id: string) => {
    setServices((svcs) =>
      svcs.map((s) => (s.id === id ? { ...s, ...editData } : s))
    );
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  const deleteService = (id: string) => {
    setServices((svcs) => svcs.filter((s) => s.id !== id));
  };

  const addService = () => {
    const newId = `new-${Date.now()}`;
    const newSvc: Service = { id: newId, title: "Novo Serviço", duration: "1h", price: "100" };
    setServices((svcs) => [...svcs, newSvc]);
    startEdit(newSvc);
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-serif">Serviços &amp; Preços</h2>
          <p className="text-muted-foreground text-sm mt-1">Gerencie o catálogo de serviços exibidos no site.</p>
        </div>
        <Button className="rounded-full" onClick={addService}>
          <Plus className="h-4 w-4 mr-2" /> Novo Serviço
        </Button>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Catálogo de Serviços</CardTitle>
          <CardDescription>Clique no ícone de edição para modificar nome, duração ou preço.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((svc) =>
              editingId === svc.id ? (
                <div key={svc.id} className="p-4 border-2 border-primary/40 rounded-xl bg-primary/5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="sm:col-span-3 space-y-1">
                      <Label htmlFor={`title-${svc.id}`}>Nome do Serviço</Label>
                      <Input
                        id={`title-${svc.id}`}
                        value={editData.title ?? ""}
                        onChange={(e) => setEditData((d) => ({ ...d, title: e.target.value }))}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`duration-${svc.id}`}>Duração</Label>
                      <Input
                        id={`duration-${svc.id}`}
                        value={editData.duration ?? ""}
                        onChange={(e) => setEditData((d) => ({ ...d, duration: e.target.value }))}
                        placeholder="Ex: 1h 30m"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`price-${svc.id}`}>Preço (R$)</Label>
                      <Input
                        id={`price-${svc.id}`}
                        type="number"
                        value={editData.price ?? ""}
                        onChange={(e) => setEditData((d) => ({ ...d, price: e.target.value }))}
                        placeholder="Ex: 150"
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="ghost" size="sm" onClick={cancelEdit} className="rounded-full">
                      <X className="h-4 w-4 mr-1" /> Cancelar
                    </Button>
                    <Button size="sm" onClick={() => saveEdit(svc.id)} className="rounded-full">
                      <Check className="h-4 w-4 mr-1" /> Salvar
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  key={svc.id}
                  className="flex items-center justify-between p-4 border rounded-xl bg-background hover:border-primary/30 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-foreground">{svc.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">⏱ {svc.duration}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-serif font-bold text-lg text-primary">R$ {svc.price}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => startEdit(svc)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10"
                      onClick={() => deleteService(svc.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
