import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Plus, Heart, Users, Home, Phone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const assistances = [
  { id: 1, name: "Maria Silva", type: "Visita Domiciliar", date: "12/01/2024", responsible: "Diác. Ana", status: "Realizado" },
  { id: 2, name: "João Santos", type: "Apoio Espiritual", date: "15/01/2024", responsible: "Anc. Pedro", status: "Agendado" },
  { id: 3, name: "Ana Costa", type: "Assistência Médica", date: "10/01/2024", responsible: "Diác. Maria", status: "Realizado" },
];

const Darpe = () => {
  return (
    <MainLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground lg:text-3xl">DARPE</h1>
            <p className="mt-1 text-muted-foreground">
              Departamento de Assistência Religiosa, Piedade e Enfermidade
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Assistência
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">45</p>
              <p className="text-sm text-muted-foreground">Assistências este mês</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
              <Home className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">28</p>
              <p className="text-sm text-muted-foreground">Visitas Realizadas</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
              <Users className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Voluntários Ativos</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="assistencias" className="space-y-4">
          <TabsList>
            <TabsTrigger value="assistencias">Assistências</TabsTrigger>
            <TabsTrigger value="visitas">Visitas</TabsTrigger>
            <TabsTrigger value="enfermos">Enfermos</TabsTrigger>
            <TabsTrigger value="voluntarios">Voluntários</TabsTrigger>
          </TabsList>

          <TabsContent value="assistencias">
            <div className="rounded-xl bg-card shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Nome</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Tipo</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Data</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Responsável</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {assistances.map((item) => (
                      <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 font-medium">{item.name}</td>
                        <td className="px-6 py-4 text-muted-foreground">{item.type}</td>
                        <td className="px-6 py-4 text-muted-foreground">{item.date}</td>
                        <td className="px-6 py-4 text-muted-foreground">{item.responsible}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            item.status === "Realizado" 
                              ? "bg-emerald-500/10 text-emerald-600"
                              : "bg-amber-500/10 text-amber-600"
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="sm">Ver detalhes</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="visitas">
            <div className="rounded-xl bg-card p-8 shadow-card text-center">
              <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Visitas Domiciliares</h3>
              <p className="text-muted-foreground">Gerencie as visitas aos membros</p>
            </div>
          </TabsContent>

          <TabsContent value="enfermos">
            <div className="rounded-xl bg-card p-8 shadow-card text-center">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Lista de Enfermos</h3>
              <p className="text-muted-foreground">Acompanhe os membros em tratamento</p>
            </div>
          </TabsContent>

          <TabsContent value="voluntarios">
            <div className="rounded-xl bg-card p-8 shadow-card text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Equipe de Voluntários</h3>
              <p className="text-muted-foreground">Gerencie os voluntários do DARPE</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Darpe;
