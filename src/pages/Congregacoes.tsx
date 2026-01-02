import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Plus, Church, MapPin, Users, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";

const congregations = [
  { 
    id: 1, 
    name: "Sede Central", 
    address: "Rua Principal, 123", 
    city: "São Paulo - SP",
    members: 450, 
    phone: "(11) 1234-5678",
    responsible: "Ancião João"
  },
  { 
    id: 2, 
    name: "Congregação Norte", 
    address: "Av. Norte, 456", 
    city: "São Paulo - SP",
    members: 180, 
    phone: "(11) 2345-6789",
    responsible: "Ancião Pedro"
  },
  { 
    id: 3, 
    name: "Congregação Sul", 
    address: "Rua do Sul, 789", 
    city: "São Paulo - SP",
    members: 220, 
    phone: "(11) 3456-7890",
    responsible: "Ancião Carlos"
  },
  { 
    id: 4, 
    name: "Congregação Leste", 
    address: "Av. Leste, 321", 
    city: "São Paulo - SP",
    members: 165, 
    phone: "(11) 4567-8901",
    responsible: "Ancião José"
  },
];

const Congregacoes = () => {
  return (
    <MainLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground lg:text-3xl">Congregações</h1>
            <p className="mt-1 text-muted-foreground">
              Gestão das congregações e casas de oração
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Congregação
          </Button>
        </div>

        {/* Search */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input placeholder="Buscar congregação..." className="max-w-md" />
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {congregations.map((congregation) => (
            <div 
              key={congregation.id} 
              className="rounded-xl bg-card p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Church className="h-6 w-6 text-primary" />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Ativa
                </span>
              </div>

              <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                {congregation.name}
              </h3>

              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{congregation.address}, {congregation.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{congregation.members} membros</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{congregation.phone}</span>
                </div>
              </div>

              <div className="pt-4 border-t flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{congregation.responsible}</span>
                <Button variant="ghost" size="sm">Ver detalhes</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Congregacoes;
