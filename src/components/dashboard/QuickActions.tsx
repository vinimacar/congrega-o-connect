import { Plus, Calendar, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  { icon: Calendar, label: "Novo Evento", variant: "default" as const },
  { icon: Users, label: "Add Membro", variant: "secondary" as const },
  { icon: FileText, label: "Relatório", variant: "secondary" as const },
  { icon: Plus, label: "Nova Coleta", variant: "secondary" as const },
];

export function QuickActions() {
  return (
    <div className="rounded-xl bg-card p-6 shadow-card animate-slide-up">
      <h3 className="mb-4 text-lg font-semibold text-card-foreground">Ações Rápidas</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            className="h-auto flex-col gap-2 py-4"
          >
            <action.icon className="h-5 w-5" />
            <span className="text-xs">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
