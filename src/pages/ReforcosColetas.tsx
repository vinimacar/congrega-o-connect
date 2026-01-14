import { MainLayout } from "@/components/layout/MainLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { HandCoins, Calendar, Building2, TrendingUp, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReforcoColetaForm } from "@/components/forms";
import { useState } from "react";

interface ReforcoColeta {
  id: number;
  congregacao: string;
  tipoEvento: "culto_oficial" | "rjm";
  data: string;
  horario: string;
  objetivo: string;
  meta: number;
  arrecadado: number;
  status: "agendado" | "em_andamento" | "concluido";
}

const mockReforcos: ReforcoColeta[] = [
  { 
    id: 1, 
    congregacao: "Central", 
    tipoEvento: "culto_oficial",
    data: "2024-01-15", 
    horario: "19:30",
    objetivo: "Obras de Manutenção", 
    meta: 15000, 
    arrecadado: 12500,
    status: "em_andamento"
  },
  { 
    id: 2, 
    congregacao: "Jardim das Flores", 
    tipoEvento: "rjm",
    data: "2024-01-20", 
    horario: "14:00",
    objetivo: "Aquisição de Instrumentos", 
    meta: 8000, 
    arrecadado: 8500,
    status: "concluido"
  },
  { 
    id: 3, 
    congregacao: "Vila Nova", 
    tipoEvento: "culto_oficial",
    data: "2024-02-01", 
    horario: "19:30",
    objetivo: "Reforma do Templo", 
    meta: 25000, 
    arrecadado: 5000,
    status: "em_andamento"
  },
  { 
    id: 4, 
    congregacao: "Bela Vista", 
    tipoEvento: "culto_oficial",
    data: "2024-02-10", 
    horario: "19:30",
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

const eventTypeLabels = {
  culto_oficial: "Culto Oficial",
  rjm: "RJM",
};

export default function ReforcosColetas() {
  const [reforcos, setReforcos] = useState<ReforcoColeta[]>(mockReforcos);
  
  // Garantir apenas uma coleta por congregação (a mais recente)
  const reforcosUnicos = reforcos.reduce((acc, reforco) => {
    const existente = acc.find(r => r.congregacao === reforco.congregacao);
    if (!existente) {
      acc.push(reforco);
    } else {
      // Manter o mais recente ou o que está em andamento
      const dataReforco = new Date(reforco.data);
      const dataExistente = new Date(existente.data);
      if (dataReforco > dataExistente || reforco.status === "em_andamento") {
        const index = acc.indexOf(existente);
        acc[index] = reforco;
      }
    }
    return acc;
  }, [] as ReforcoColeta[]);
  
  const totalMeta = reforcosUnicos.reduce((acc, r) => acc + r.meta, 0);
  const totalArrecadado = reforcosUnicos.reduce((acc, r) => acc + r.arrecadado, 0);
  
  const handleAddReforco = (data: any) => {
    const novoReforco: ReforcoColeta = {
      id: reforcos.length + 1,
      congregacao: data.congregation,
      tipoEvento: data.eventType,
      data: data.date.toISOString().split('T')[0],
      horario: data.time,
      objetivo: data.objective,
      meta: data.goal,
      arrecadado: 0,
      status: "agendado"
    };
    setReforcos([...reforcos, novoReforco]);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reforços de Coletas</h1>
            <p className="text-muted-foreground mt-1">Agendamentos de Cultos Oficiais e RJM com Reforços de Coletas</p>
          </div>
          <ReforcoColetaForm 
            trigger={
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Agendar Reforço
              </Button>
            }
            onSuccess={handleAddReforco}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Congregações"
            value={reforcosUnicos.length}
            icon={Building2}
          />
          <StatsCard
            title="Em Andamento"
            value={reforcosUnicos.filter(r => r.status === "em_andamento").length}
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
            icon={HandCoins}
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
              {reforcosUnicos.map((reforco) => (
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
                        <Badge className={statusColors[reforco.status]}>
                          {statusLabels[reforco.status]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-medium">
                          {eventTypeLabels[reforco.tipoEvento]}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {reforco.congregacao} • {new Date(reforco.data).toLocaleDateString('pt-BR')} às {reforco.horario}
                        </p>
                      </div>
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
              {reforcosUnicos.filter(r => r.status === "em_andamento").map((reforco) => (
                <div
                  key={reforco.id}
                  className="rounded-xl bg-card p-6 shadow-card animate-slide-up"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-card-foreground">
                        {reforco.objetivo}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{eventTypeLabels[reforco.tipoEvento]}</Badge>
                        <p className="text-sm text-muted-foreground">
                          {reforco.congregacao} • {reforco.horario}
                        </p>
                      </div>
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
              {reforcosUnicos.filter(r => r.status === "concluido").map((reforco) => (
                <div
                  key={reforco.id}
                  className="rounded-xl bg-card p-6 shadow-card animate-slide-up"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-card-foreground">
                        {reforco.objetivo}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{eventTypeLabels[reforco.tipoEvento]}</Badge>
                        <p className="text-sm text-muted-foreground">
                          {reforco.congregacao} • {new Date(reforco.data).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
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
              {reforcosUnicos.filter(r => r.status === "agendado").map((reforco) => (
                <div
                  key={reforco.id}
                  className="rounded-xl bg-card p-6 shadow-card animate-slide-up"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-card-foreground">
                        {reforco.objetivo}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{eventTypeLabels[reforco.tipoEvento]}</Badge>
                        <p className="text-sm text-muted-foreground">
                          {reforco.congregacao} • {new Date(reforco.data).toLocaleDateString('pt-BR')} às {reforco.horario}
                        </p>
                      </div>
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
