import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Plus, List, CheckSquare, Clock, Users } from "lucide-react";

const lists = [
  { 
    id: 1, 
    name: "Escala de Porteiros", 
    items: 24, 
    lastUpdate: "Há 2 dias",
    type: "Escala"
  },
  { 
    id: 2, 
    name: "Lista de Batismo", 
    items: 15, 
    lastUpdate: "Há 1 semana",
    type: "Cerimônia"
  },
  { 
    id: 3, 
    name: "Escala de Organistas", 
    items: 8, 
    lastUpdate: "Há 3 dias",
    type: "Escala"
  },
  { 
    id: 4, 
    name: "Voluntários - Santa Ceia", 
    items: 32, 
    lastUpdate: "Ontem",
    type: "Voluntários"
  },
  { 
    id: 5, 
    name: "Escala de Limpeza", 
    items: 16, 
    lastUpdate: "Há 5 dias",
    type: "Escala"
  },
  { 
    id: 6, 
    name: "Lista de Atendimento", 
    items: 12, 
    lastUpdate: "Hoje",
    type: "Atendimento"
  },
];

const Listas = () => {
  return (
    <MainLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground lg:text-3xl">Listas</h1>
            <p className="mt-1 text-muted-foreground">
              Escalas, listas de voluntários e controles diversos
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Lista
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <List className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">18</p>
              <p className="text-sm text-muted-foreground">Listas Ativas</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">245</p>
              <p className="text-sm text-muted-foreground">Pessoas Escaladas</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
              <CheckSquare className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Atualizadas Hoje</p>
            </div>
          </div>
        </div>

        {/* Lists Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lists.map((list) => (
            <div 
              key={list.id} 
              className="rounded-xl bg-card p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <List className="h-5 w-5 text-primary" />
                </div>
                <span className="inline-flex rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                  {list.type}
                </span>
              </div>

              <h3 className="font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                {list.name}
              </h3>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {list.items} itens
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {list.lastUpdate}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t">
                <Button variant="ghost" size="sm" className="w-full">
                  Abrir Lista
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Listas;
