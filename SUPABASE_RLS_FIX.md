# Correção das Políticas RLS do Supabase

## Problema
Erro 401 (Unauthorized) ao acessar a aplicação porque as políticas RLS (Row Level Security) estão configuradas apenas para usuários autenticados, mas a aplicação não tem sistema de login implementado.

## Solução
Atualizar as políticas RLS para permitir acesso público (anônimo) temporariamente.

## Como Aplicar

### 1. Acesse o SQL Editor do Supabase
Vá para: https://supabase.com/dashboard/project/SEU_PROJECT_ID/sql

### 2. Execute o Script de Remoção

Copie e execute este comando para remover as políticas antigas:

```sql
-- Remover políticas antigas
DROP POLICY IF EXISTS "Permitir leitura de congregações para usuários autenticados" ON public.congregations;
DROP POLICY IF EXISTS "Permitir inserção de congregações para usuários autenticados" ON public.congregations;
DROP POLICY IF EXISTS "Permitir atualização de congregações para usuários autenticados" ON public.congregations;
DROP POLICY IF EXISTS "Permitir exclusão de congregações para usuários autenticados" ON public.congregations;

DROP POLICY IF EXISTS "Permitir leitura de músicos para usuários autenticados" ON public.musicians;
DROP POLICY IF EXISTS "Permitir inserção de músicos para usuários autenticados" ON public.musicians;
DROP POLICY IF EXISTS "Permitir atualização de músicos para usuários autenticados" ON public.musicians;
DROP POLICY IF EXISTS "Permitir exclusão de músicos para usuários autenticados" ON public.musicians;

DROP POLICY IF EXISTS "Permitir leitura de membros do ministério para usuários autenticados" ON public.ministry_members;
DROP POLICY IF EXISTS "Permitir inserção de membros do ministério para usuários autenticados" ON public.ministry_members;
DROP POLICY IF EXISTS "Permitir atualização de membros do ministério para usuários autenticados" ON public.ministry_members;
DROP POLICY IF EXISTS "Permitir exclusão de membros do ministério para usuários autenticados" ON public.ministry_members;

DROP POLICY IF EXISTS "Permitir leitura de eventos para usuários autenticados" ON public.events;
DROP POLICY IF EXISTS "Permitir inserção de eventos para usuários autenticados" ON public.events;
DROP POLICY IF EXISTS "Permitir atualização de eventos para usuários autenticados" ON public.events;
DROP POLICY IF EXISTS "Permitir exclusão de eventos para usuários autenticados" ON public.events;
```

### 3. Execute o Script de Criação

Depois, execute este para criar as novas políticas com acesso público:

```sql
-- Congregations - Acesso público
CREATE POLICY "Permitir leitura de congregações para todos"
    ON public.congregations FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Permitir inserção de congregações para todos"
    ON public.congregations FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Permitir atualização de congregações para todos"
    ON public.congregations FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Permitir exclusão de congregações para todos"
    ON public.congregations FOR DELETE TO anon, authenticated USING (true);

-- Musicians - Acesso público
CREATE POLICY "Permitir leitura de músicos para todos"
    ON public.musicians FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Permitir inserção de músicos para todos"
    ON public.musicians FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Permitir atualização de músicos para todos"
    ON public.musicians FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Permitir exclusão de músicos para todos"
    ON public.musicians FOR DELETE TO anon, authenticated USING (true);

-- Ministry Members - Acesso público
CREATE POLICY "Permitir leitura de membros do ministério para todos"
    ON public.ministry_members FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Permitir inserção de membros do ministério para todos"
    ON public.ministry_members FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Permitir atualização de membros do ministério para todos"
    ON public.ministry_members FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Permitir exclusão de membros do ministério para todos"
    ON public.ministry_members FOR DELETE TO anon, authenticated USING (true);

-- Events - Acesso público
CREATE POLICY "Permitir leitura de eventos para todos"
    ON public.events FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Permitir inserção de eventos para todos"
    ON public.events FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Permitir atualização de eventos para todos"
    ON public.events FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Permitir exclusão de eventos para todos"
    ON public.events FOR DELETE TO anon, authenticated USING (true);
```

### 4. Verifique
Após executar ambos os scripts:
1. Recarregue a aplicação
2. O erro 401 deve desaparecer
3. A aplicação deve funcionar normalmente

## ⚠️ Segurança

**IMPORTANTE:** Esta configuração permite acesso público (anônimo) a todos os dados. Isso é adequado para:
- Desenvolvimento inicial
- Aplicações internas sem dados sensíveis
- Protótipos

Para produção com dados sensíveis, você deve:
1. Implementar autenticação (usando Supabase Auth)
2. Atualizar as políticas RLS para restringir acesso baseado em usuário/role
3. Considerar políticas mais granulares por tabela

## Próximos Passos

Após a aplicação funcionar, considere implementar:
- Sistema de autenticação (Supabase Auth)
- Controle de acesso baseado em roles (admin, usuário, etc.)
- Políticas RLS específicas por congregação
