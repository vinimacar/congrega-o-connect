import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Users, CalendarIcon } from "lucide-react";
import { ministryMemberSchema, MinistryMemberFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
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
import { useToast } from "@/hooks/use-toast";

const congregations = [
  { id: "1", name: "Sede Central" },
  { id: "2", name: "Congregação Norte" },
  { id: "3", name: "Congregação Sul" },
  { id: "4", name: "Congregação Leste" },
  { id: "5", name: "Congregação Oeste" },
];

const roles = [
  { value: "anciao", label: "Ancião" },
  { value: "cooperador", label: "Cooperador" },
  { value: "diacono", label: "Diácono" },
  { value: "diaconisa", label: "Diaconisa" },
];

interface MinistryMemberFormProps {
  trigger?: React.ReactNode;
  onSuccess?: (data: MinistryMemberFormData) => void;
}

export function MinistryMemberForm({ trigger, onSuccess }: MinistryMemberFormProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<MinistryMemberFormData>({
    resolver: zodResolver(ministryMemberSchema),
    defaultValues: {
      name: "",
      role: undefined,
      presentationOrdinationDate: undefined,
      presentedOrdainedBy: "",
      mainCongregation: "",
      servedCongregations: [],
      phone: "",
      email: "",
      notes: "",
    },
  });

  const watchedRole = form.watch("role");
  const showServedCongregations = watchedRole === "anciao" || watchedRole === "diacono";

  const onSubmit = (data: MinistryMemberFormData) => {
    console.log("Ministry member data:", data);
    const roleLabel = roles.find(r => r.value === data.role)?.label;
    toast({
      title: "Membro cadastrado!",
      description: `${roleLabel} ${data.name} foi adicionado com sucesso.`,
    });
    onSuccess?.(data);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            <Users className="h-4 w-4" />
            Novo Membro
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            Cadastrar Membro do Ministério
          </DialogTitle>
          <DialogDescription>
            Preencha os dados do membro do corpo ministerial.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ministério *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o cargo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
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
                name="presentationOrdinationDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de Apresentação/Ordenação *</FormLabel>
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
                          locale={ptBR}
                          disabled={(date) => date > new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="presentedOrdainedBy"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Apresentado/Ordenado Por *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome de quem apresentou/ordenou" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mainCongregation"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Congregação Principal *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a congregação" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {congregations.map((cong) => (
                          <SelectItem key={cong.id} value={cong.id}>
                            {cong.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {showServedCongregations && (
                <FormField
                  control={form.control}
                  name="servedCongregations"
                  render={() => (
                    <FormItem className="sm:col-span-2">
                      <div className="mb-4">
                        <FormLabel>Igrejas que Atendem</FormLabel>
                        <FormDescription>
                          Selecione as congregações onde este {watchedRole === "anciao" ? "ancião" : "diácono"} atua
                        </FormDescription>
                      </div>
                      <div className="space-y-2">
                        {congregations.map((cong) => (
                          <FormField
                            key={cong.id}
                            control={form.control}
                            name="servedCongregations"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={cong.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(cong.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), cong.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== cong.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {cong.name}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

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
                name="notes"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Informações adicionais..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  form.reset();
                }}
              >
                Cancelar
              </Button>
              <Button type="submit">Cadastrar Membro</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
