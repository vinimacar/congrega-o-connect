import { z } from "zod";

export const musicianSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100, "Nome muito longo"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos").max(15, "Telefone inválido").optional().or(z.literal("")),
  instrument: z.string().min(1, "Selecione um instrumento"),
  congregation: z.string().min(1, "Selecione uma congregação"),
  status: z.enum(["ativo", "em_formacao", "inativo"], {
    required_error: "Selecione o status",
  }),
  startDate: z.date().optional(),
  notes: z.string().max(500, "Observações muito longas").optional(),
});

export const congregationSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100, "Nome muito longo"),
  address: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres").max(200, "Endereço muito longo"),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres").max(100, "Cidade muito longa"),
  state: z.string().length(2, "Use a sigla do estado (ex: SP)"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos").max(15, "Telefone inválido").optional().or(z.literal("")),
  responsible: z.string().min(3, "Nome do responsável deve ter pelo menos 3 caracteres").max(100, "Nome muito longo"),
  capacity: z.coerce.number().min(1, "Capacidade deve ser maior que 0").max(10000, "Capacidade muito alta").optional(),
  status: z.enum(["ativa", "em_construcao", "inativa"], {
    required_error: "Selecione o status",
  }),
  // Horários de Cultos
  cultoDomingoManha: z.string().optional().or(z.literal("")),
  cultoDomingoNoite: z.string().optional().or(z.literal("")),
  cultoQuarta: z.string().optional().or(z.literal("")),
  // Reuniões
  reuniaoJovensDia: z.string().optional().or(z.literal("")),
  reuniaoJovensHorario: z.string().optional().or(z.literal("")),
  reuniaoMenoresDia: z.string().optional().or(z.literal("")),
  reuniaoMenoresHorario: z.string().optional().or(z.literal("")),
});

export const eventSchema = z.object({
  title: z.string().min(3, "Título deve ter pelo menos 3 caracteres").max(100, "Título muito longo"),
  type: z.enum(["culto", "ensaio", "reuniao", "cerimonia", "ebi", "outro"], {
    required_error: "Selecione o tipo de evento",
  }),
  date: z.date({
    required_error: "Selecione uma data",
  }),
  time: z.string().min(1, "Informe o horário"),
  congregation: z.string().min(1, "Selecione uma congregação"),
  description: z.string().max(500, "Descrição muito longa").optional(),
  expectedAttendees: z.coerce.number().min(1, "Número deve ser maior que 0").optional(),
  isRecurring: z.boolean().default(false),
});

export const ministryMemberSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100, "Nome muito longo"),
  role: z.enum(["anciao", "cooperador", "diacono", "diaconisa"], {
    required_error: "Selecione o cargo",
  }),
  presentationOrdinationDate: z.date({
    required_error: "Selecione a data de apresentação/ordenação",
  }),
  presentedOrdainedBy: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100, "Nome muito longo"),
  mainCongregation: z.string().min(1, "Selecione a congregação principal"),
  servedCongregations: z.array(z.string()).optional(), // Array de IDs de congregações (apenas para anciões e diáconos)
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos").max(15, "Telefone inválido").optional().or(z.literal("")),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  notes: z.string().max(500, "Observações muito longas").optional(),
});

export type MusicianFormData = z.infer<typeof musicianSchema>;
export type CongregationFormData = z.infer<typeof congregationSchema>;
export type EventFormData = z.infer<typeof eventSchema>;
export type MinistryMemberFormData = z.infer<typeof ministryMemberSchema>;
