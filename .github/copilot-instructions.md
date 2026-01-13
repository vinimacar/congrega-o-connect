# AI Coding Agent Instructions - Congregação Connect

## Project Overview
Church management system (CCB Gestão) built with React + TypeScript, focused on managing congregations, musicians, ministry members, events, and church activities. Built with Lovable.dev platform.

## Tech Stack & Build System
- **Runtime**: Bun (lock file: `bun.lockb`, but npm commands work)
- **Dev**: `npm run dev` (Vite server on port 8080)
- **Build**: `npm run build` (production) or `npm run build:dev` (development mode)
- **Lint**: `npm run lint` (ESLint with flat config, TypeScript rules relaxed)

## Architecture & Structure

### Routing & Layout (Client-Side Only)
- React Router v6 with `BrowserRouter` in [src/App.tsx](../src/App.tsx)
- All pages wrapped in `MainLayout` which provides sidebar navigation
- Route structure:
  - `/` → Dashboard (Index)
  - `/musical`, `/darpe`, `/ebi`, `/reforcos-coletas`, `/evangelizacao` → Ministry modules
  - `/congregacoes`, `/ministerio`, `/listas`, `/agendamentos` → Management pages
  - `/relatorios` → Reports
  - `*` → 404 (NotFound)

### Component Organization
- **Pages** ([src/pages/](../src/pages/)): Route components, use MainLayout wrapper
- **Forms** ([src/components/forms/](../src/components/forms/)): Dialog-based forms with react-hook-form + zod validation
- **Layout** ([src/components/layout/](../src/components/layout/)): `MainLayout` + `AppSidebar` (responsive with mobile menu)
- **UI** ([src/components/ui/](../src/components/ui/)): shadcn/ui components (DO NOT edit directly, regenerate via CLI)
- **Dashboard** ([src/components/dashboard/](../src/components/dashboard/)): Dashboard-specific widgets

### State Management Pattern
- **TanStack Query**: QueryClient configured in [src/App.tsx](../src/App.tsx) but **NOT currently used** (no useQuery/useMutation calls found)
- **Forms**: Local state with react-hook-form
- **UI State**: Component-level useState (e.g., sidebar open/closed, dialog visibility)
- Future API integration should use TanStack Query hooks

## Form Patterns (Critical)

### Standard Form Architecture
All forms follow this exact pattern (see [src/components/forms/MusicianForm.tsx](src/components/forms/MusicianForm.tsx)):

```tsx
// 1. Schema from lib/schemas.ts with zod
import { musicianSchema, MusicianFormData } from "@/lib/schemas";

// 2. Dialog wrapper with trigger prop
interface FormProps {
  trigger?: React.ReactNode;
  onSuccess?: (data: FormData) => void;
}

export function SomeForm({ trigger, onSuccess }: FormProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  // 3. react-hook-form with zodResolver
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { /* ... */ }
  });

  // 4. Submit handler
  const onSubmit = (data: FormData) => {
    console.log(data); // Placeholder (no backend yet)
    toast({ title: "Sucesso", description: "..." });
    setOpen(false);
    form.reset();
    onSuccess?.(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>...</Button>}
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* FormField components */}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
```

**Key Rules**:
- All schemas in [src/lib/schemas.ts](src/lib/schemas.ts) with Portuguese error messages
- Forms are dialogs (not full pages)
- Empty optional fields use `.optional().or(z.literal(""))` pattern
- Use `useToast()` for user feedback
- No API calls yet - just console.log and toast notifications

### Validation Schema Pattern
```typescript
// In lib/schemas.ts
export const schema = z.object({
  required: z.string().min(3, "Mensagem em português"),
  optional: z.string().optional().or(z.literal("")),
  enum: z.enum(["opcao1", "opcao2"], { required_error: "Selecione..." }),
  date: z.date({ required_error: "..." }),
  number: z.coerce.number().min(1, "...").optional(),
});

export type FormData = z.infer<typeof schema>;
```

## Styling & Theming

### Color System (Custom Variables)
Defined in [src/index.css](src/index.css):
- **Primary**: Blue gradient (`--primary: 217 91% 50%`)
- **Sidebar**: Dark gradient (`--sidebar-background: 215 25% 12%`)
- **Custom gradients**: `--gradient-primary`, `--gradient-sidebar` (use via CSS classes)

### Tailwind Usage
- Path alias: `@/` → `src/` (configured in [vite.config.ts](vite.config.ts) and [tsconfig.json](tsconfig.json))
- Utilities: `cn()` from [src/lib/utils.ts](src/lib/utils.ts) for conditional classes
- Custom classes: `gradient-sidebar`, `gradient-primary`, `shadow-glow` (defined in CSS)

### Icon System
- **lucide-react** for all icons
- Common icons: `Church`, `Users`, `Music`, `Calendar`, `Building2`, etc.
- Icon usage: `<Icon className="h-5 w-5" />` (size via Tailwind classes)

## Data Mocking Patterns

### Hardcoded Data Lists
Forms use static arrays for dropdowns (see forms for examples):
```tsx
const instruments = ["Órgão", "Violino", "Viola", ...];
const congregations = ["Sede Central", "Congregação Norte", ...];
```

When backend is added:
1. Move to API calls with TanStack Query
2. Replace with `useQuery` hooks
3. Keep loading/error states in Select components

## Navigation & Responsive Behavior

### Sidebar Pattern
- Desktop: Fixed left sidebar (always visible, `lg:ml-64` on main)
- Mobile: Overlay sidebar with hamburger menu (absolute positioning, backdrop blur)
- State: Local `useState` in AppSidebar (not global)
- Active route: Uses `useLocation()` from react-router-dom

### Page Layout
```tsx
<MainLayout>
  <div className="space-y-8">
    <div className="pt-12 lg:pt-0"> {/* Mobile padding for fixed header */}
      <h1>Page Title</h1>
    </div>
    {/* Content */}
  </div>
</MainLayout>
```

## Portuguese UI Language
- All user-facing text in Portuguese (Brazil)
- Error messages, form labels, toasts: PT-BR
- Date formatting: `date-fns` with `ptBR` locale
- Example: `format(date, "PPP", { locale: ptBR })`

## TypeScript Configuration
**Relaxed Settings** (team preference - do not enforce strict types):
- `noImplicitAny: false`
- `noUnusedParameters: false`
- `noUnusedLocals: false`
- `strictNullChecks: false`
- ESLint: `@typescript-eslint/no-unused-vars: "off"`

## Common Pitfalls
1. **Don't modify UI components directly** - they're from shadcn/ui (regenerate if needed)
2. **No backend yet** - forms just log data and show toasts
3. **Use Bun lockfile** but npm commands are standard
4. **Mobile-first responsive** - test sidebar behavior on mobile
5. **Import paths** - always use `@/` alias, never relative imports across directories

## Future Integration Points
- Backend API (TanStack Query already configured)
- Authentication (no auth system yet)
- Database (schemas ready, no persistence)
- File uploads (no storage configured)
