import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Search, Music, Users, Calendar, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MusicianForm } from "@/components/forms";
import { useMusicians } from "@/hooks/useMusicians";

const Musical = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Buscar músicos do banco
  const { data: musicians = [], isLoading, refetch } = useMusicians();
  
  // Calcular estatísticas
  const activeMusicians = musicians.filter(m => m.status === "ativo").length;
  const trainingMusicians = musicians.filter(m => m.status === "em_formacao").length;

  // Filtrar músicos com base no termo de busca
  const filteredMusicians = musicians.filter(musician => 
    musician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    musician.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
    musician.congregation?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      "ativo": "Ativo",
      "em_formacao": "Em Formação",
      "inativo": "Inativo"
    };
    return labels[status] || status;
  };
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
          <MusicianForm onSuccess={() => refetch()} />
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Music className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{isLoading ? "..." : activeMusicians}</p>
              <p className="text-sm text-muted-foreground">Músicos Ativos</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{isLoading ? "..." : trainingMusicians}</p>
              <p className="text-sm text-muted-foreground">Em Formação</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
              <Calendar className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{musicians.length}</p>
              <p className="text-sm text-muted-foreground">Total de Músicos</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Buscar músico..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl bg-card shadow-card overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredMusicians.length === 0 ? (
            <div className="p-12 text-center">
              <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchTerm ? "Nenhum músico encontrado" : "Nenhum músico cadastrado"}
              </p>
            </div>
          ) : (
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
                  {filteredMusicians.map((musician) => (
                    <tr key={musician.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-medium">{musician.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{musician.instrument}</td>
                      <td className="px-6 py-4 text-muted-foreground">{musician.congregation?.name || "-"}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          musician.status === "ativo" 
                            ? "bg-emerald-500/10 text-emerald-600" 
                            : musician.status === "em_formacao"
                            ? "bg-amber-500/10 text-amber-600"
                            : "bg-gray-500/10 text-gray-600"
                        }`}>
                          {getStatusLabel(musician.status)}
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
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Musical;
