import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Home, Clock } from "lucide-react";
import { congregationSchema, CongregationFormData } from "@/lib/schemas";
import { useCreateCongregation, useUpdateCongregation } from "@/hooks/useCongregations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface Congregation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone?: string;
  responsible: string;
  capacity?: number;
  status: string;
  culto_domingo_manha?: string;
  culto_domingo_noite?: string;
  culto_quarta?: string;
  reuniao_jovens_dia?: string;
  reuniao_jovens_horario?: string;
  reuniao_menores_dia?: string;
  reuniao_menores_horario?: string;
}

interface CongregationFormProps {
  trigger?: React.ReactNode;
  congregation?: Congregation;
  mode?: 'create' | 'edit';
  onSuccess?: () => void;
}

const diasSemana = [
  { value: "domingo", label: "Domingo" },
  { value: "segunda", label: "Segunda-feira" },
  { value: "terca", label: "Terça-feira" },
  { value: "quarta", label: "Quarta-feira" },
  { value: "quinta", label: "Quinta-feira" },
  { value: "sexta", label: "Sexta-feira" },
  { value: "sabado", label: "Sábado" },
];

export function CongregationForm({ trigger, congregation, mode = 'create', onSuccess }: CongregationFormProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const createCongregation = useCreateCongregation();
  const updateCongregation = useUpdateCongregation();

  const form = useForm<CongregationFormData>({
    resolver: zodResolver(congregationSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      phone: "",
      responsible: "",
      capacity: undefined,
      status: "ativa",
      cultoDomingoManha: "",
      cultoDomingoNoite: "",
      cultoQuarta: "",
      reuniaoJovensDia: "",
      reuniaoJovensHorario: "",
      reuniaoMenoresDia: "",
      reuniaoMenoresHorario: "",
    },
  });

  useEffect(() => {
    if (congregation && mode === 'edit') {
      const validStatus = ["ativa", "em_construcao", "inativa"].includes(congregation.status) 
        ? congregation.status as "ativa" | "em_construcao" | "inativa"
        : "ativa";
      
      form.reset({
        name: congregation.name || "",
        address: congregation.address || "",
        city: congregation.city || "",
        state: congregation.state || "",
        phone: congregation.phone || "",
        responsible: congregation.responsible || "",
        capacity: congregation.capacity,
        status: validStatus,
        cultoDomingoManha: congregation.culto_domingo_manha || "",
        cultoDomingoNoite: congregation.culto_domingo_noite || "",
        cultoQuarta: congregation.culto_quarta || "",
        reuniaoJovensDia: congregation.reuniao_jovens_dia || "",
        reuniaoJovensHorario: congregation.reuniao_jovens_horario || "",
        reuniaoMenoresDia: congregation.reuniao_menores_dia || "",
        reuniaoMenoresHorario: congregation.reuniao_menores_horario || "",
      });
    }
  }, [congregation, mode, form]);

  const onSubmit = async (data: CongregationFormData) => {
    try {
      const congregationData = {
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state.toUpperCase(),
        phone: data.phone || null,
        responsible: data.responsible,
        capacity: data.capacity || null,
        status: data.status,
        culto_domingo_manha: data.cultoDomingoManha || null,
        culto_domingo_noite: data.cultoDomingoNoite || null,
        culto_quarta: data.cultoQuarta || null,
        reuniao_jovens_dia: data.reuniaoJovensDia || null,
        reuniao_jovens_horario: data.reuniaoJovensHorario || null,
        reuniao_menores_dia: data.reuniaoMenoresDia || null,
        reuniao_menores_horario: data.reuniaoMenoresHorario || null,
      };

      if (mode === 'edit' && congregation) {
        await updateCongregation.mutateAsync({
          id: congregation.id,
          updates: congregationData,
        });
        toast({
          title: "Congregação atualizada!",
          description: `${data.name} foi atualizada com sucesso.`,
        });
      } else {
        await createCongregation.mutateAsync(congregationData);
        toast({
          title: "Congregação cadastrada!",
          description: `${data.name} foi adicionada com sucesso.`,
        });
      }

      onSuccess?.();
      form.reset();
      setOpen(false);
    } catch (error) {
      toast({
        title: "Erro ao salvar congregação",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            <Home className="h-4 w-4" />
            Nova Congregação
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Home className="h-5 w-5 text-primary" />
            </div>
            {mode === 'edit' ? 'Editar Congregação' : 'Cadastrar Nova Congregação'}
          </DialogTitle>
          <DialogDescription>
            Preencha os dados da congregação ou casa de oração.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Informações Básicas */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Informações Básicas</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Nome da Congregação *</FormLabel>
                      <FormControl>
                        <Input placeholder="Congregação Centro" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Endereço *</FormLabel>
                      <FormControl>
                        <Input placeholder="Rua Principal, 123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade *</FormLabel>
                      <FormControl>
                        <Input placeholder="São Paulo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado (UF) *</FormLabel>
                      <FormControl>
                        <Input placeholder="SP" maxLength={2} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="(11) 1234-5678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacidade (pessoas)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="200" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="responsible"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Responsável *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ancião João da Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ativa">Ativa</SelectItem>
                          <SelectItem value="em_construcao">Em Construção</SelectItem>
                          <SelectItem value="inativa">Inativa</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Horários de Cultos */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">Horários de Cultos</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="cultoDomingoManha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domingo Manhã</FormLabel>
                      <FormControl>
                        <Input type="time" placeholder="09:30" {...field} />
                      </FormControl>
                      <FormDescription className="text-xs">Ex: 09:30</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cultoDomingoNoite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domingo Noite</FormLabel>
                      <FormControl>
                        <Input type="time" placeholder="19:00" {...field} />
                      </FormControl>
                      <FormDescription className="text-xs">Ex: 19:00</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cultoQuarta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quarta-feira</FormLabel>
                      <FormControl>
                        <Input type="time" placeholder="20:00" {...field} />
                      </FormControl>
                      <FormDescription className="text-xs">Ex: 20:00</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Reuniões */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Reuniões</h3>
              
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Reunião de Jovens</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="reuniaoJovensDia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dia da Semana</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o dia" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {diasSemana.map((dia) => (
                              <SelectItem key={dia.value} value={dia.value}>
                                {dia.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reuniaoJovensHorario"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horário</FormLabel>
                        <FormControl>
                          <Input type="time" placeholder="20:00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Reunião de Menores</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="reuniaoMenoresDia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dia da Semana</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o dia" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {diasSemana.map((dia) => (
                              <SelectItem key={dia.value} value={dia.value}>
                                {dia.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reuniaoMenoresHorario"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horário</FormLabel>
                        <FormControl>
                          <Input type="time" placeholder="19:00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={createCongregation.isPending || updateCongregation.isPending}
              >
                {createCongregation.isPending || updateCongregation.isPending 
                  ? "Salvando..." 
                  : mode === 'edit' ? "Atualizar" : "Cadastrar"
                }
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
