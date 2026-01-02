import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Plus, Search, Music, Users, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";

const musicians = [
  { id: 1, name: "João Silva", instrument: "Órgão", congregation: "Sede Central", status: "Ativo" },
  { id: 2, name: "Maria Santos", instrument: "Violino", congregation: "Congregação Norte", status: "Ativo" },
  { id: 3, name: "Pedro Costa", instrument: "Clarinete", congregation: "Sede Central", status: "Ativo" },
  { id: 4, name: "Ana Oliveira", instrument: "Flauta", congregation: "Congregação Sul", status: "Ativo" },
  { id: 5, name: "Lucas Ferreira", instrument: "Saxofone", congregation: "Congregação Leste", status: "Em formação" },
];

const Musical = () => {
  return (
    <MainLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground lg:text-3xl">Musical</h1>
            <p className="mt-1 text-muted-foreground">
              Gestão de músicos e ensaios
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Músico
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Music className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">156</p>
              <p className="text-sm text-muted-foreground">Músicos Ativos</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">24</p>
              <p className="text-sm text-muted-foreground">Em Formação</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
              <Calendar className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-muted-foreground">Ensaios este mês</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar músico..." className="pl-10" />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl bg-card shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Nome</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Instrumento</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Congregação</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {musicians.map((musician) => (
                  <tr key={musician.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium">{musician.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{musician.instrument}</td>
                    <td className="px-6 py-4 text-muted-foreground">{musician.congregation}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        musician.status === "Ativo" 
                          ? "bg-emerald-500/10 text-emerald-600" 
                          : "bg-amber-500/10 text-amber-600"
                      }`}>
                        {musician.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm">Editar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Musical;
