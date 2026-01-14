import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Users, Shield, Calendar, Award, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MinistryMemberForm } from "@/components/forms";
import { useMinistryMembers } from "@/hooks/useMinistryMembers";

const Ministerio = () => {
  const [activeTab, setActiveTab] = useState("todos");
  
  // Buscar membros do ministério do banco
  const { data: members = [], isLoading, refetch } = useMinistryMembers();
  
  // Calcular estatísticas
  const anciaos = members.filter(m => m.role === "anciao").length;
  const cooperadores = members.filter(m => m.role === "cooperador").length;
  const diaconos = members.filter(m => m.role === "diacono" || m.role === "diaconisa").length;

  // Filtrar membros com base na aba ativa
  const filteredMembers = activeTab === "todos" 
    ? members
    : activeTab === "anciaos"
    ? members.filter(m => m.role === "anciao")
    : activeTab === "cooperadores"
    ? members.filter(m => m.role === "cooperador")
    : members.filter(m => m.role === "diacono" || m.role === "diaconisa");

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      "anciao": "Ancião",
      "cooperador": "Cooperador",
      "diacono": "Diácono",
      "diaconisa": "Diaconisa"
    };
    return labels[role] || role;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };
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
          <MinistryMemberForm onSuccess={() => refetch()} />
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{isLoading ? "..." : anciaos}</p>
              <p className="text-sm text-muted-foreground">Anciões</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{isLoading ? "..." : cooperadores}</p>
              <p className="text-sm text-muted-foreground">Cooperadores</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
              <Award className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{isLoading ? "..." : diaconos}</p>
              <p className="text-sm text-muted-foreground">Diáconos</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
              <Calendar className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{members.length}</p>
              <p className="text-sm text-muted-foreground">Total de Membros</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="anciaos">Anciões</TabsTrigger>
            <TabsTrigger value="cooperadores">Cooperadores</TabsTrigger>
            <TabsTrigger value="diaconos">Diáconos/as</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="rounded-xl bg-card shadow-card overflow-hidden">
              {isLoading ? (
                <div className="flex items-center justify-center p-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredMembers.length === 0 ? (
                <div className="p-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nenhum membro cadastrado</p>
                </div>
              ) : (
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
                      {filteredMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4 font-medium">{member.name}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                              {getRoleLabel(member.role)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">{member.main_congregation?.name || "-"}</td>
                          <td className="px-6 py-4 text-muted-foreground">{formatDate(member.presentation_ordination_date)}</td>
                          <td className="px-6 py-4">
                            <Button variant="ghost" size="sm">Ver perfil</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Ministerio;
