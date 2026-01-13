# Configuração do Supabase

Este projeto usa Supabase como banco de dados e autenticação.

## Configuração Inicial

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma nova conta ou faça login
3. Crie um novo projeto
4. Anote as credenciais do projeto:
   - `Project URL` (SUPABASE_URL)
   - `anon/public key` (SUPABASE_ANON_KEY)

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
VITE_SUPABASE_URL=sua-url-do-projeto
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
```

### 3. Executar o Schema SQL

1. No painel do Supabase, vá em **SQL Editor**
2. Copie o conteúdo do arquivo `supabase/schema.sql`
3. Cole no editor e execute
4. Verifique se todas as tabelas foram criadas com sucesso

### 4. Configurar Autenticação

No painel do Supabase:

1. Vá em **Authentication** > **Settings**
2. Configure os provedores de autenticação desejados:
   - Email/Password (já habilitado por padrão)
   - Google OAuth (opcional)

Para Google OAuth:
1. Habilite o provedor Google
2. Configure as credenciais OAuth do Google Cloud Console
3. Adicione a URL de callback: `https://seu-projeto.supabase.co/auth/v1/callback`

## Estrutura do Banco de Dados

### Tabelas

- **congregations**: Congregações da igreja
- **musicians**: Músicos cadastrados
- **ministry_members**: Membros do ministério (anciãos, cooperadores, etc.)
- **events**: Eventos e cultos agendados

### Relacionamentos

- `musicians.congregation_id` → `congregations.id`
- `ministry_members.congregation_id` → `congregations.id`
- `events.congregation_id` → `congregations.id`

### Segurança (RLS)

Todas as tabelas possuem Row Level Security (RLS) habilitado. As políticas padrão permitem:
- Leitura, inserção, atualização e exclusão para usuários autenticados
- Sem acesso para usuários não autenticados

**Importante**: Ajuste as políticas de segurança conforme as necessidades do seu projeto.

## Uso no Código

### Hooks Disponíveis

#### Congregações
```typescript
import { useCongregations, useCreateCongregation } from '@/hooks/useCongregations';

// Listar congregações
const { data: congregations, isLoading } = useCongregations();

// Criar congregação
const createCongregation = useCreateCongregation();
createCongregation.mutate({
  name: "Nome da Congregação",
  address: "Endereço",
  // ... outros campos
});
```

#### Músicos
```typescript
import { useMusicians, useCreateMusician } from '@/hooks/useMusicians';

// Listar músicos (opcionalmente filtrar por congregação)
const { data: musicians } = useMusicians(congregationId);

// Criar músico
const createMusician = useCreateMusician();
createMusician.mutate({
  name: "Nome do Músico",
  instrument: "Órgão",
  // ... outros campos
});
```

#### Membros do Ministério
```typescript
import { useMinistryMembers, useCreateMinistryMember } from '@/hooks/useMinistryMembers';

// Listar membros
const { data: members } = useMinistryMembers();

// Criar membro
const createMember = useCreateMinistryMember();
```

#### Eventos
```typescript
import { useEvents, useCreateEvent } from '@/hooks/useEvents';

// Listar eventos
const { data: events } = useEvents();

// Criar evento
const createEvent = useCreateEvent();
```

### Autenticação

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, signIn, signOut, loading } = useAuth();

  // Verificar se está autenticado
  if (loading) return <div>Carregando...</div>;
  
  if (!user) {
    // Fazer login
    await signIn('email@exemplo.com', 'senha');
  }
  
  // Fazer logout
  await signOut();
}
```

## Próximos Passos

1. ✅ Instalar dependências do Supabase
2. ✅ Configurar cliente Supabase
3. ✅ Criar tipos TypeScript
4. ✅ Criar hooks personalizados
5. ✅ Atualizar AuthContext
6. ✅ Criar schema SQL
7. ⏳ Atualizar formulários para usar os hooks
8. ⏳ Adicionar tratamento de erros
9. ⏳ Adicionar loading states
10. ⏳ Testar integração completa

## Recursos Úteis

- [Documentação do Supabase](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [TanStack Query](https://tanstack.com/query/latest)
