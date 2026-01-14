import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Calendar as CalendarIconOutline } from "lucide-react";
import { cn } from "@/lib/utils";
import { eventSchema, EventFormData } from "@/lib/schemas";
import { useCreateEvent } from "@/hooks/useEvents";
import { useCongregations } from "@/hooks/useCongregations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
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
  FormDescription,
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

const eventTypes = [
  { value: "culto", label: "Culto" },
  { value: "ensaio", label: "Ensaio" },
  { value: "reuniao", label: "Reunião" },
  { value: "cerimonia", label: "Cerimônia" },
  { value: "ebi", label: "EBI" },
  { value: "outro", label: "Outro" },
];

interface EventFormProps {
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function EventForm({ trigger, onSuccess }: EventFormProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  // Buscar congregações do banco
  const { data: congregations = [], isLoading: isLoadingCongregations } = useCongregations();
  
  // Mutation para criar evento
  const createEvent = useCreateEvent();

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      type: undefined,
      time: "",
      congregation: "",
      description: "",
      expectedAttendees: undefined,
      isRecurring: false,
    },
  });

  const onSubmit = async (data: EventFormData) => {
    try {
      // Preparar dados para enviar ao Supabase
      const eventData = {
        title: data.title,
        type: data.type,
        date: format(data.date, 'yyyy-MM-dd'),
        time: data.time,
        congregation_id: data.congregation,
        description: data.description || null,
        expected_attendees: data.expectedAttendees || null,
        is_recurring: data.isRecurring,
      };

      // Criar evento no banco
      await createEvent.mutateAsync(eventData);

      toast({
        title: "Evento agendado!",
        description: `${data.title} foi criado para ${format(data.date, "dd/MM/yyyy")}.`,
      });
      
      onSuccess?.();
      form.reset();
      setOpen(false);
    } catch (error) {
      toast({
        title: "Erro ao agendar evento",
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
            <CalendarIconOutline className="h-4 w-4" />
            Novo Evento
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <CalendarIconOutline className="h-5 w-5 text-primary" />
            </div>
            Agendar Novo Evento
          </DialogTitle>
          <DialogDescription>
            Preencha os dados do evento para agendá-lo.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Título do Evento *</FormLabel>
                    <FormControl>
                      <Input placeholder="Culto Dominical" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Evento *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
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
                    <FormLabel>Local/Congregação *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o local" />
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
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data *</FormLabel>
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
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário *</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expectedAttendees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Participantes Esperados</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isRecurring"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Evento Recorrente</FormLabel>
                      <FormDescription>
                        Marque se este evento se repete semanalmente.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detalhes adicionais sobre o evento..."
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
              <Button type="submit">Agendar Evento</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
