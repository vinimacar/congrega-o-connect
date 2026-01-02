import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { EventForm } from "@/components/forms";

const events = [
  {
    id: 1,
    title: "Culto Dominical",
    date: "2024-01-14",
    time: "19:00",
    location: "Sede Central",
    type: "culto",
    attendees: 450,
    status: "confirmado"
  },
  {
    id: 2,
    title: "Ensaio Regional",
    date: "2024-01-15",
    time: "20:00",
    location: "Congregação Norte",
    type: "ensaio",
    attendees: 65,
    status: "confirmado"
  },
  {
    id: 3,
    title: "Reunião de Jovens",
    date: "2024-01-17",
    time: "19:30",
    location: "Sede Central",
    type: "reuniao",
    attendees: 120,
    status: "pendente"
  },
  {
    id: 4,
    title: "Santa Ceia",
    date: "2024-01-21",
    time: "19:00",
    location: "Todas Congregações",
    type: "cerimonia",
    attendees: 1200,
    status: "confirmado"
  },
  {
    id: 5,
    title: "Batismo",
    date: "2024-01-28",
    time: "15:00",
    location: "Sede Central",
    type: "cerimonia",
    attendees: 35,
    status: "pendente"
  },
];

const typeColors: Record<string, string> = {
  culto: "bg-primary/10 text-primary border-primary/20",
  ensaio: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  reuniao: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  cerimonia: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

const typeLabels: Record<string, string> = {
  culto: "Culto",
  ensaio: "Ensaio",
  reuniao: "Reunião",
  cerimonia: "Cerimônia",
};

const Agendamentos = () => {
  const [view, setView] = useState<"list" | "calendar">("list");

  return (
    <MainLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground lg:text-3xl">Agendamentos</h1>
            <p className="mt-1 text-muted-foreground">
              Gerencie eventos e agendamentos da congregação
            </p>
          </div>
          <div className="flex gap-2">
            <div className="flex rounded-lg bg-muted p-1">
              <Button 
                variant={view === "list" ? "secondary" : "ghost"} 
                size="sm"
                onClick={() => setView("list")}
              >
                Lista
              </Button>
              <Button 
                variant={view === "calendar" ? "secondary" : "ghost"} 
                size="sm"
                onClick={() => setView("calendar")}
              >
                Calendário
              </Button>
            </div>
            <EventForm />
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">28</p>
              <p className="text-sm text-muted-foreground">Este mês</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
              <Clock className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-sm text-muted-foreground">Esta semana</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
              <MapPin className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Locais</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
              <Users className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">1.8k</p>
              <p className="text-sm text-muted-foreground">Participantes</p>
            </div>
          </div>
        </div>

        {/* Events List */}
        {view === "list" && (
          <div className="space-y-4">
            {events.map((event) => (
              <div 
                key={event.id}
                className="rounded-xl bg-card p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-card-foreground">{event.title}</h3>
                    <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${typeColors[event.type]}`}>
                      {typeLabels[event.type]}
                    </span>
                    {event.status === "pendente" && (
                      <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600">
                        Pendente
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(event.date).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {event.attendees} pessoas
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Editar</Button>
                  <Button variant="secondary" size="sm">Ver detalhes</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Calendar View Placeholder */}
        {view === "calendar" && (
          <div className="rounded-xl bg-card p-8 shadow-card text-center">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Visualização de Calendário</h3>
            <p className="text-muted-foreground">
              Em breve: visualização completa do calendário com todos os eventos
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Agendamentos;
