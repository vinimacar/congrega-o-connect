import { Calendar, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "culto" | "reuniao" | "ensaio" | "ebi";
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Culto de Domingo",
    date: "2024-01-14",
    time: "19:00",
    location: "Sede Central",
    type: "culto"
  },
  {
    id: "2",
    title: "Ensaio Regional",
    date: "2024-01-15",
    time: "20:00",
    location: "Congregação Norte",
    type: "ensaio"
  },
  {
    id: "3",
    title: "Reunião de Jovens e Menores",
    date: "2024-01-17",
    time: "19:30",
    location: "Sede Central",
    type: "ebi"
  },
  {
    id: "4",
    title: "Reunião Ministerial",
    date: "2024-01-18",
    time: "19:00",
    location: "Administração",
    type: "reuniao"
  }
];

const typeColors = {
  culto: "bg-primary/10 text-primary border-primary/20",
  reuniao: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  ensaio: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  ebi: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
};

const typeLabels = {
  culto: "Culto",
  reuniao: "Reunião",
  ensaio: "Ensaio",
  ebi: "EBI"
};

export function EventsList() {
  return (
    <div className="rounded-xl bg-card p-6 shadow-card animate-slide-up">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-card-foreground">Próximos Eventos</h3>
        <button className="text-sm font-medium text-primary hover:underline">
          Ver todos
        </button>
      </div>
      
      <div className="space-y-4">
        {mockEvents.map((event) => (
          <div 
            key={event.id}
            className="group flex items-start gap-4 rounded-lg border border-border p-4 transition-all duration-200 hover:border-primary/30 hover:bg-muted/50"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-card-foreground group-hover:text-primary transition-colors">
                  {event.title}
                </h4>
                <span className={cn(
                  "rounded-full border px-2 py-0.5 text-xs font-medium",
                  typeColors[event.type]
                )}>
                  {typeLabels[event.type]}
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {event.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
