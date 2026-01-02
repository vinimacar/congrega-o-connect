import { MainLayout } from "@/components/layout/MainLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Megaphone, Users, MapPin, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const mockCampanhas = [
  { 
    id: 1, 
    nome: "Campanha Centro", 
    local: "Centro da Cidade",
    data: "2024-01-20",
    participantes: 25,
    visitasRealizadas: 150,
    status: "concluido"
  },
  { 
    id: 2, 
    nome: "Evangelização Vila Nova", 
    local: "Bairro Vila Nova",
    data: "2024-01-27",
    participantes: 18,
    visitasRealizadas: 0,
    status: "agendado"
  },
  { 
    id: 3, 
    nome: "Campanha Jardim das Flores", 
    local: "Jardim das Flores",
    data: "2024-02-03",
    participantes: 30,
    visitasRealizadas: 0,
    status: "agendado"
  },
];

const mockEquipes = [
  { id: 1, nome: "Equipe A", lider: "João Silva", membros: 8 },
  { id: 2, nome: "Equipe B", lider: "Maria Santos", membros: 6 },
  { id: 3, nome: "Equipe C", lider: "Pedro Costa", membros: 7 },
  { id: 4, nome: "Equipe D", lider: "Ana Oliveira", membros: 9 },
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

export default function Evangelizacao() {
  const totalParticipantes = mockCampanhas.reduce((acc, c) => acc + c.participantes, 0);
  const totalVisitas = mockCampanhas.reduce((acc, c) => acc + c.visitasRealizadas, 0);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Evangelização</h1>
          <p className="text-muted-foreground mt-1">Gerencie campanhas e equipes de evangelização</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Campanhas"
            value={mockCampanhas.length}
            icon={Megaphone}
          />
          <StatsCard
            title="Equipes Ativas"
            value={mockEquipes.length}
            icon={Users}
          />
          <StatsCard
            title="Total Participantes"
            value={totalParticipantes}
            icon={Users}
          />
          <StatsCard
            title="Visitas Realizadas"
            value={totalVisitas}
            icon={MapPin}
          />
        </div>

        <Tabs defaultValue="campanhas" className="w-full">
          <TabsList>
            <TabsTrigger value="campanhas">Campanhas</TabsTrigger>
            <TabsTrigger value="equipes">Equipes</TabsTrigger>
            <TabsTrigger value="calendario">Calendário</TabsTrigger>
          </TabsList>

          <TabsContent value="campanhas" className="mt-4">
            <div className="grid gap-4">
              {mockCampanhas.map((campanha) => (
                <div
                  key={campanha.id}
                  className="rounded-xl bg-card p-6 shadow-card animate-slide-up"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-card-foreground">
                          {campanha.nome}
                        </h3>
                        <Badge className={statusColors[campanha.status as keyof typeof statusColors]}>
                          {statusLabels[campanha.status as keyof typeof statusLabels]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {campanha.local}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(campanha.data).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        {campanha.participantes}
                      </p>
                      <p className="text-sm text-muted-foreground">participantes</p>
                    </div>
                  </div>
                  
                  {campanha.status === "concluido" && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">{campanha.visitasRealizadas}</span> visitas realizadas
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="equipes" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {mockEquipes.map((equipe) => (
                <div
                  key={equipe.id}
                  className="rounded-xl bg-card p-6 shadow-card animate-slide-up"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-card-foreground">
                        {equipe.nome}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Líder: {equipe.lider}
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{equipe.membros}</span> membros
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendario" className="mt-4">
            <div className="rounded-xl bg-card p-6 shadow-card">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                Próximas Campanhas
              </h3>
              <div className="space-y-4">
                {mockCampanhas
                  .filter(c => c.status === "agendado")
                  .map((campanha) => (
                    <div
                      key={campanha.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/50"
                    >
                      <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <span className="text-xs font-medium">
                          {new Date(campanha.data).toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase()}
                        </span>
                        <span className="text-lg font-bold">
                          {new Date(campanha.data).getDate()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-card-foreground">{campanha.nome}</h4>
                        <p className="text-sm text-muted-foreground">{campanha.local}</p>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800">
                        {campanha.participantes} participantes
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
