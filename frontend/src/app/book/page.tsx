"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, ChevronRight, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const services = [
  { id: "fibra", title: "Alongamento Fibra", time: "2h 30m", price: "R$ 250" },
  { id: "manu", title: "Manutenção", time: "1h 45m", price: "R$ 150" },
  { id: "banho", title: "Banho de Gel", time: "2h", price: "R$ 120" },
  { id: "esmalte", title: "Esmaltação Gel", time: "45m", price: "R$ 80" },
];

const availableTimes = ["09:00", "10:30", "13:00", "14:30", "16:00", "17:30"];
const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-3xl flex-1 flex flex-col justify-center">
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
          Agendamento Online
        </h1>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span className={step >= 1 ? "text-primary font-medium" : ""}>Serviço</span>
          <ChevronRight className="h-4 w-4" />
          <span className={step >= 2 ? "text-primary font-medium" : ""}>Horário</span>
          <ChevronRight className="h-4 w-4" />
          <span className={step >= 3 ? "text-primary font-medium" : ""}>Dados</span>
          <ChevronRight className="h-4 w-4" />
          <span className={step >= 4 ? "text-primary font-medium" : ""}>Confirmação</span>
        </div>
        <div className="w-full bg-muted h-2 mt-4 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <Card className="border-border/50 shadow-sm relative overflow-hidden">
        {step > 1 && step < 4 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 rounded-full"
            onClick={prevStep}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}

        <CardContent className="p-6 md:p-8">
          {/* STEP 1: SERVICE */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-6">
                <CardTitle className="text-2xl font-serif">Selecione o Serviço</CardTitle>
                <CardDescription>Escolha o procedimento desejado para visualizar a disponibilidade.</CardDescription>
              </div>
              <div className="space-y-3">
                {services.map((svc) => (
                  <label
                    key={svc.id}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedService === svc.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="service"
                        className="sr-only"
                        checked={selectedService === svc.id}
                        onChange={() => setSelectedService(svc.id)}
                      />
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedService === svc.id ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                        {selectedService === svc.id && <CheckCircle2 className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{svc.title}</div>
                        <div className="text-sm text-muted-foreground">{svc.time}</div>
                      </div>
                    </div>
                    <div className="font-serif font-bold text-lg text-primary">{svc.price}</div>
                  </label>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <Button onClick={nextStep} disabled={!selectedService} className="rounded-full px-8">
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: DATE & TIME */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-6">
                <CardTitle className="text-2xl font-serif">Escolha o Horário</CardTitle>
                <CardDescription>Selecione um dia e um horário disponível na agenda.</CardDescription>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3 text-foreground">Dias Disponíveis</h3>
                <div className="flex overflow-x-auto pb-2 gap-2 snap-x">
                  {days.map((day, i) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(i)}
                      className={`flex-none snap-start w-16 h-20 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${selectedDate === i ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground hover:border-primary/50'}`}
                    >
                      <span className="text-xs uppercase font-medium opacity-80">{day}</span>
                      <span className="text-lg font-bold mt-1">{i + 14}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate !== null && (
                <div className="mb-8 animate-in fade-in duration-300">
                  <h3 className="text-sm font-medium mb-3 text-foreground">Horários</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 rounded-xl text-sm font-medium border-2 transition-all ${selectedTime === time ? 'border-primary bg-primary/10 text-primary' : 'border-border text-foreground hover:border-primary/50'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <Button onClick={nextStep} disabled={selectedDate === null || !selectedTime} className="rounded-full px-8">
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: CUSTOMER INFO */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-6">
                <CardTitle className="text-2xl font-serif">Seus Dados</CardTitle>
                <CardDescription>Preencha suas informações para confirmar a reserva.</CardDescription>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" placeholder="Ex: Maria Silva" required className="rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Celular (WhatsApp)</Label>
                  <Input id="phone" type="tel" placeholder="(00) 00000-0000" required className="rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Observações (Opcional)</Label>
                  <Input id="notes" placeholder="Ex: É minha primeira vez colocando fibra" className="rounded-xl h-12" />
                </div>

                <div className="mt-8 flex justify-end">
                  <Button type="submit" className="rounded-full px-8 w-full sm:w-auto mt-4">
                    Confirmar Agendamento
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 4 && (
            <div className="animate-in zoom-in-95 duration-500 text-center py-8">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <CardTitle className="text-3xl font-serif mb-4 text-foreground">Horário Reservado!</CardTitle>
              <CardDescription className="text-lg mb-8 max-w-sm mx-auto">
                Tudo certo! Um lembrete foi enviado para o seu WhatsApp. Estamos ansiosos para te receber.
              </CardDescription>

              <div className="bg-muted p-6 rounded-2xl mb-8 border border-border/50 text-left max-w-sm mx-auto">
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div className="text-muted-foreground">Serviço:</div>
                  <div className="font-medium text-foreground text-right">{services.find(s => s.id === selectedService)?.title}</div>

                  <div className="text-muted-foreground">Data e Hora:</div>
                  <div className="font-medium text-foreground text-right">Dia {selectedDate! + 14} às {selectedTime}</div>

                  <div className="col-span-2 pt-4 border-t border-border mt-2 grid grid-cols-2">
                    <div className="text-muted-foreground">Valor Estimado:</div>
                    <div className="font-serif font-bold text-primary text-right text-lg">{services.find(s => s.id === selectedService)?.price}</div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="rounded-full px-8" asChild>
                <a href="/">Voltar para a Página Inicial</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
