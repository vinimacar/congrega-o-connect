import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Church, MapPin, Users, Phone, Edit2, Clock, CalendarDays, Loader2, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CongregationForm } from "@/components/forms";
import { useCongregations, useDeleteCongregation } from "@/hooks/useCongregations";
import type { Database } from "@/lib/database.types";

type Congregation = Database['public']['Tables']['congregations']['Row'];

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const Congregacoes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedCongregation, setSelectedCongregation] = useState<Congregation | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const { data: congregations = [], isLoading, refetch } = useCongregations();
  const deleteCongregation = useDeleteCongregation();
  const { toast } = useToast();

  const formatDia = (dia: string) => {
    const dias: Record<string, string> = {
      domingo: "Domingo",
      segunda: "Segunda",
      terca: "Terça",
      quarta: "Quarta",
      quinta: "Quinta",
      sexta: "Sexta",
      sabado: "Sábado",
    };
    return dias[dia] || dia;
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      await deleteCongregation.mutateAsync(deleteId);
      toast({
        title: "Congregação excluída",
        description: "A congregação foi removida com sucesso.",
      });
      setDeleteId(null);
    } catch (error) {
      toast({
        title: "Erro ao excluir",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    }
  };

  const handleViewDetails = (congregation: Congregation) => {
    setSelectedCongregation(congregation);
    setDetailsOpen(true);
  };

  const filteredCongregations = congregations.filter((cong) =>
    cong.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cong.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

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
          <CongregationForm onSuccess={() => refetch()} />
        </div>

        {/* Search */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input 
            placeholder="Buscar congregação..." 
            className="max-w-md" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Grid */}
        {filteredCongregations.length === 0 ? (
          <div className="text-center py-12">
            <Church className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {searchTerm ? "Nenhuma congregação encontrada." : "Nenhuma congregação cadastrada ainda."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCongregations.map((congregation) => (
              <div 
                key={congregation.id} 
                className="rounded-xl bg-card p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Church className="h-6 w-6 text-primary" />
                  </div>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                    congregation.status === 'ativa' 
                      ? 'bg-emerald-500/10 text-emerald-600' 
                      : congregation.status === 'em_construcao'
                      ? 'bg-yellow-500/10 text-yellow-600'
                      : 'bg-gray-500/10 text-gray-600'
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      congregation.status === 'ativa' 
                        ? 'bg-emerald-500' 
                        : congregation.status === 'em_construcao'
                        ? 'bg-yellow-500'
                        : 'bg-gray-500'
                    }`} />
                    {congregation.status === 'ativa' ? 'Ativa' : 
                     congregation.status === 'em_construcao' ? 'Em Construção' : 'Inativa'}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                  {congregation.name}
                </h3>

                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{congregation.address}, {congregation.city} - {congregation.state}</span>
                  </div>
                  {congregation.capacity && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Capacidade: {congregation.capacity} pessoas</span>
                    </div>
                  )}
                  {congregation.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{congregation.phone}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{congregation.responsible}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewDetails(congregation)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Detalhes
                    </Button>
                    <CongregationForm 
                      trigger={
                        <Button variant="ghost" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      }
                      congregation={congregation}
                      mode="edit"
                      onSuccess={() => refetch()}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Dialog */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir esta congregação? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Details Dialog */}
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Church className="h-5 w-5 text-primary" />
                {selectedCongregation?.name}
              </DialogTitle>
              <DialogDescription>
                Informações completas da congregação
              </DialogDescription>
            </DialogHeader>

            {selectedCongregation && (
              <div className="space-y-6">
                {/* Informações Básicas */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">Informações Básicas</h3>
                  <div className="grid gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Endereço</p>
                        <p className="text-muted-foreground">
                          {selectedCongregation.address}<br />
                          {selectedCongregation.city} - {selectedCongregation.state}
                        </p>
                      </div>
                    </div>
                    
                    {selectedCongregation.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Telefone</p>
                          <p className="text-muted-foreground">{selectedCongregation.phone}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedCongregation.capacity && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Capacidade</p>
                          <p className="text-muted-foreground">{selectedCongregation.capacity} pessoas</p>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <p className="font-medium">Responsável</p>
                      <p className="text-muted-foreground">{selectedCongregation.responsible}</p>
                    </div>
                  </div>
                </div>

                {/* Horários de Cultos */}
                {(selectedCongregation.culto_domingo_manha || selectedCongregation.culto_domingo_noite || selectedCongregation.culto_quarta) && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <h3 className="font-semibold text-sm">Horários de Cultos</h3>
                      </div>
                      <div className="grid gap-2 text-sm">
                        {selectedCongregation.culto_domingo_manha && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Domingo Manhã</span>
                            <span className="font-medium">{selectedCongregation.culto_domingo_manha}</span>
                          </div>
                        )}
                        {selectedCongregation.culto_domingo_noite && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Domingo Noite</span>
                            <span className="font-medium">{selectedCongregation.culto_domingo_noite}</span>
                          </div>
                        )}
                        {selectedCongregation.culto_quarta && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Quarta-feira</span>
                            <span className="font-medium">{selectedCongregation.culto_quarta}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Reuniões */}
                {(selectedCongregation.reuniao_jovens_dia || selectedCongregation.reuniao_menores_dia) && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        <h3 className="font-semibold text-sm">Reuniões</h3>
                      </div>
                      <div className="space-y-3 text-sm">
                        {selectedCongregation.reuniao_jovens_dia && (
                          <div>
                            <p className="font-medium">Reunião de Jovens</p>
                            <p className="text-muted-foreground">
                              {formatDia(selectedCongregation.reuniao_jovens_dia)}
                              {selectedCongregation.reuniao_jovens_horario && ` às ${selectedCongregation.reuniao_jovens_horario}`}
                            </p>
                          </div>
                        )}
                        {selectedCongregation.reuniao_menores_dia && (
                          <div>
                            <p className="font-medium">Reunião de Menores</p>
                            <p className="text-muted-foreground">
                              {formatDia(selectedCongregation.reuniao_menores_dia)}
                              {selectedCongregation.reuniao_menores_horario && ` às ${selectedCongregation.reuniao_menores_horario}`}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Congregacoes;
