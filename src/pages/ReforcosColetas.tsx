import { MainLayout } from "@/components/layout/MainLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { HandCoins, Calendar, Building2, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const mockReforcos = [
  { 
    id: 1, 
    congregacao: "Central", 
    data: "2024-01-15", 
    objetivo: "Obras de Manutenção", 
    meta: 15000, 
    arrecadado: 12500,
    status: "em_andamento"
  },
  { 
    id: 2, 
    congregacao: "Jardim das Flores", 
    data: "2024-01-20", 
    objetivo: "Aquisição de Instrumentos", 
    meta: 8000, 
    arrecadado: 8500,
    status: "concluido"
  },
  { 
    id: 3, 
    congregacao: "Vila Nova", 
    data: "2024-02-01", 
    objetivo: "Reforma do Templo", 
    meta: 25000, 
    arrecadado: 5000,
    status: "em_andamento"
  },
  { 
    id: 4, 
    congregacao: "Bela Vista", 
    data: "2024-02-10", 
    objetivo: "Sistema de Som", 
    meta: 12000, 
    arrecadado: 0,
    status: "agendado"
  },
];

const statusColors = {
  em_andamento: "bg-blue-100 text-blue-800",
  concluido: "bg-emerald-100 text-emerald-800",
  agendado: "bg-amber-100 text-amber-800",
};

const statusLabels = {
  em_andamento: "Em Andamento",
  concluido: "Concluído",
  agendado: "Agendado",
};

export default function ReforcosColetas() {
  const totalMeta = mockReforcos.reduce((acc, r) => acc + r.meta, 0);
  const totalArrecadado = mockReforcos.reduce((acc, r) => acc + r.arrecadado, 0);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reforços de Coletas</h1>
          <p className="text-muted-foreground mt-1">Gerencie campanhas de arrecadação especiais</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total de Campanhas"
            value={mockReforcos.length}
            icon={HandCoins}
          />
          <StatsCard
            title="Em Andamento"
            value={mockReforcos.filter(r => r.status === "em_andamento").length}
            icon={Calendar}
          />
          <StatsCard
            title="Meta Total"
            value={`R$ ${totalMeta.toLocaleString('pt-BR')}`}
            icon={TrendingUp}
          />
          <StatsCard
            title="Total Arrecadado"
            value={`R$ ${totalArrecadado.toLocaleString('pt-BR')}`}
            icon={Building2}
          />
        </div>

        <Tabs defaultValue="todos" className="w-full">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="em_andamento">Em Andamento</TabsTrigger>
            <TabsTrigger value="concluidos">Concluídos</TabsTrigger>
            <TabsTrigger value="agendados">Agendados</TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="mt-4">
            <div className="grid gap-4">
              {mockReforcos.map((reforco) => (
                <div
                  key={reforco.id}
                  className="rounded-xl bg-card p-6 shadow-card animate-slide-up"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-card-foreground">
                          {reforco.objetivo}
                        </h3>
                        <Badge className={statusColors[reforco.status as keyof typeof statusColors]}>
                          {statusLabels[reforco.status as keyof typeof statusLabels]}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {reforco.congregacao} • {new Date(reforco.data).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        R$ {reforco.arrecadado.toLocaleString('pt-BR')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        de R$ {reforco.meta.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div 
                        className="h-2 rounded-full bg-primary transition-all"
                        style={{ width: `${Math.min((reforco.arrecadado / reforco.meta) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground text-right">
                      {Math.round((reforco.arrecadado / reforco.meta) * 100)}% da meta
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="em_andamento" className="mt-4">
            <div className="grid gap-4">
              {mockReforcos.filter(r => r.status === "em_andamento").map((reforco) => (
                <div
                  key={reforco.id}
                  className="rounded-xl bg-card p-6 shadow-card animate-slide-up"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-card-foreground">
                        {reforco.objetivo}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {reforco.congregacao}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        R$ {reforco.arrecadado.toLocaleString('pt-BR')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        de R$ {reforco.meta.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="concluidos" className="mt-4">
            <div className="grid gap-4">
              {mockReforcos.filter(r => r.status === "concluido").map((reforco) => (
                <div
                  key={reforco.id}
                  className="rounded-xl bg-card p-6 shadow-card animate-slide-up"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-card-foreground">
                        {reforco.objetivo}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {reforco.congregacao}
                      </p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800">
                      Meta Atingida
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="agendados" className="mt-4">
            <div className="grid gap-4">
              {mockReforcos.filter(r => r.status === "agendado").map((reforco) => (
                <div
                  key={reforco.id}
                  className="rounded-xl bg-card p-6 shadow-card animate-slide-up"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-card-foreground">
                        {reforco.objetivo}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {reforco.congregacao} • Início: {new Date(reforco.data).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <p className="text-lg font-semibold text-muted-foreground">
                      Meta: R$ {reforco.meta.toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
