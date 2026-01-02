import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Users, Shield, Calendar, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MinistryMemberForm } from "@/components/forms";

const ministers = [
  { id: 1, name: "Ancião João Silva", role: "Ancião", congregation: "Sede Central", since: "2010" },
  { id: 2, name: "Coop. Pedro Santos", role: "Cooperador", congregation: "Sede Central", since: "2015" },
  { id: 3, name: "Diác. Maria Costa", role: "Diaconisa", congregation: "Congregação Norte", since: "2018" },
  { id: 4, name: "Ancião Carlos Oliveira", role: "Ancião", congregation: "Congregação Sul", since: "2012" },
];

const Ministerio = () => {
  return (
    <MainLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground lg:text-3xl">Ministério</h1>
            <p className="mt-1 text-muted-foreground">
              Gestão do corpo ministerial
            </p>
          </div>
          <MinistryMemberForm />
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-muted-foreground">Anciões</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">15</p>
              <p className="text-sm text-muted-foreground">Cooperadores</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
              <Award className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Diáconos</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
              <Calendar className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">4</p>
              <p className="text-sm text-muted-foreground">Reuniões/mês</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="todos" className="space-y-4">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="anciaos">Anciões</TabsTrigger>
            <TabsTrigger value="cooperadores">Cooperadores</TabsTrigger>
            <TabsTrigger value="diaconos">Diáconos/as</TabsTrigger>
          </TabsList>

          <TabsContent value="todos">
            <div className="rounded-xl bg-card shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Nome</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Cargo</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Congregação</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Desde</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {ministers.map((minister) => (
                      <tr key={minister.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 font-medium">{minister.name}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            {minister.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{minister.congregation}</td>
                        <td className="px-6 py-4 text-muted-foreground">{minister.since}</td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="sm">Ver perfil</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="anciaos">
            <div className="rounded-xl bg-card p-8 shadow-card text-center">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Lista de Anciões</h3>
              <p className="text-muted-foreground">Visualize apenas os anciões</p>
            </div>
          </TabsContent>

          <TabsContent value="cooperadores">
            <div className="rounded-xl bg-card p-8 shadow-card text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Lista de Cooperadores</h3>
              <p className="text-muted-foreground">Visualize apenas os cooperadores</p>
            </div>
          </TabsContent>

          <TabsContent value="diaconos">
            <div className="rounded-xl bg-card p-8 shadow-card text-center">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Lista de Diáconos/as</h3>
              <p className="text-muted-foreground">Visualize apenas os diáconos e diaconisas</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Ministerio;
