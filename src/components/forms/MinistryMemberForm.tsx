import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Users } from "lucide-react";
import { ministryMemberSchema, MinistryMemberFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { useToast } from "@/hooks/use-toast";

const congregations = [
  "Sede Central", "Congregação Norte", "Congregação Sul", 
  "Congregação Leste", "Congregação Oeste"
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
      congregation: "",
      phone: "",
      email: "",
      startYear: new Date().getFullYear(),
      notes: "",
    },
  });

  const onSubmit = (data: MinistryMemberFormData) => {
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
                    <FormLabel>Cargo *</FormLabel>
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
                        {congregations.map((cong) => (
                          <SelectItem key={cong} value={cong}>
                            {cong}
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
                name="startYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ano de Início *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="2020" 
                        min={1900}
                        max={new Date().getFullYear()}
                        {...field} 
                      />
                    </FormControl>
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
                      placeholder="Informações adicionais..."
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
              <Button type="submit">Cadastrar Membro</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
