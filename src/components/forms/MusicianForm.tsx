import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { musicianSchema, MusicianFormData } from "@/lib/schemas";
import { useCreateMusician } from "@/hooks/useMusicians";
import { useCongregations } from "@/hooks/useCongregations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
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
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

const instruments = [
  "Órgão", "Violino", "Viola", "Violoncelo", "Contrabaixo", 
  "Flauta", "Clarinete", "Saxofone", "Trompete", "Trombone", 
  "Trompa", "Tuba", "Acordeão", "Violão", "Bateria"
];

interface MusicianFormProps {
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function MusicianForm({ trigger, onSuccess }: MusicianFormProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  // Buscar congregações do banco
  const { data: congregations = [], isLoading: isLoadingCongregations } = useCongregations();
  
  // Mutation para criar músico
  const createMusician = useCreateMusician();

  const form = useForm<MusicianFormData>({
    resolver: zodResolver(musicianSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      instrument: "",
      congregation: "",
      status: "ativo",
      notes: "",
    },
  });

  const onSubmit = async (data: MusicianFormData) => {
    try {
      // Preparar dados para enviar ao Supabase
      const musicianData = {
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        instrument: data.instrument,
        congregation_id: data.congregation, // ID da congregação selecionada
        status: data.status,
        start_date: data.startDate ? format(data.startDate, 'yyyy-MM-dd') : null,
        notes: data.notes || null,
      };

      // Criar músico no banco
      await createMusician.mutateAsync(musicianData);

      toast({
        title: "Músico cadastrado!",
        description: `${data.name} foi adicionado com sucesso.`,
      });
      
      onSuccess?.();
      form.reset();
      setOpen(false);
    } catch (error) {
      toast({
        title: "Erro ao cadastrar músico",
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
            <Music className="h-4 w-4" />
            Novo Músico
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Music className="h-5 w-5 text-primary" />
            </div>
            Cadastrar Novo Músico
          </DialogTitle>
          <DialogDescription>
            Preencha os dados do músico para cadastrá-lo no sistema.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo *</FormLabel>
                    <FormControl>
                      <Input placeholder="João da Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="joao@email.com" {...field} />
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
                      <Input placeholder="(11) 99999-9999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instrument"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instrumento *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o instrumento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {instruments.map((inst) => (
                          <SelectItem key={inst} value={inst}>
                            {inst}
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
                name="congregation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Congregação *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a congregação" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingCongregations ? (
                          <SelectItem value="loading" disabled>
                            Carregando...
                          </SelectItem>
                        ) : congregations.length === 0 ? (
                          <SelectItem value="empty" disabled>
                            Nenhuma congregação cadastrada
                          </SelectItem>
                        ) : (
                          congregations.map((cong) => (
                            <SelectItem key={cong.id} value={cong.id}>
                              {cong.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="em_formacao">Em Formação</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de Início</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span>Selecione a data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Informações adicionais sobre o músico..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Cadastrar Músico</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
