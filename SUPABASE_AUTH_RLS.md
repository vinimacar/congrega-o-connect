# Atualização das Políticas RLS para Autenticação

## Contexto
Após implementar a autenticação do Supabase, as políticas RLS precisam ser atualizadas para:
- Permitir acesso público apenas para leitura (consultas)
- Exigir autenticação para operações de escrita (INSERT, UPDATE, DELETE)

## Como Aplicar no Supabase

### 1. Acesse o SQL Editor
Vá para: https://supabase.com/dashboard/project/SEU_PROJECT_ID/sql

### 2. Execute o Script de Remoção das Políticas Antigas

```sql
-- Remover todas as políticas antigas
DROP POLICY IF EXISTS "Permitir leitura de congregações para todos" ON public.congregations;
DROP POLICY IF EXISTS "Permitir inserção de congregações para todos" ON public.congregations;
DROP POLICY IF EXISTS "Permitir atualização de congregações para todos" ON public.congregations;
DROP POLICY IF EXISTS "Permitir exclusão de congregações para todos" ON public.congregations;

DROP POLICY IF EXISTS "Permitir leitura de músicos para todos" ON public.musicians;
DROP POLICY IF EXISTS "Permitir inserção de músicos para todos" ON public.musicians;
DROP POLICY IF EXISTS "Permitir atualização de músicos para todos" ON public.musicians;
DROP POLICY IF EXISTS "Permitir exclusão de músicos para todos" ON public.musicians;

DROP POLICY IF EXISTS "Permitir leitura de membros do ministério para todos" ON public.ministry_members;
DROP POLICY IF EXISTS "Permitir inserção de membros do ministério para todos" ON public.ministry_members;
DROP POLICY IF EXISTS "Permitir atualização de membros do ministério para todos" ON public.ministry_members;
DROP POLICY IF EXISTS "Permitir exclusão de membros do ministério para todos" ON public.ministry_members;

DROP POLICY IF EXISTS "Permitir leitura de eventos para todos" ON public.events;
DROP POLICY IF EXISTS "Permitir inserção de eventos para todos" ON public.events;
DROP POLICY IF EXISTS "Permitir atualização de eventos para todos" ON public.events;
DROP POLICY IF EXISTS "Permitir exclusão de eventos para todos" ON public.events;
```

### 3. Crie as Novas Políticas com Autenticação

```sql
-- ====================================
-- CONGREGATIONS
-- ====================================
-- Permitir leitura para todos (incluindo anônimos para visualização pública)
CREATE POLICY "Permitir leitura de congregações"
    ON public.congregations FOR SELECT
    TO anon, authenticated
    USING (true);

-- Permitir escrita apenas para usuários autenticados
CREATE POLICY "Permitir inserção de congregações autenticadas"
    ON public.congregations FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Permitir atualização de congregações autenticadas"
    ON public.congregations FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Permitir exclusão de congregações autenticadas"
    ON public.congregations FOR DELETE
    TO authenticated
    USING (true);

-- ====================================
-- MUSICIANS
-- ====================================
CREATE POLICY "Permitir leitura de músicos"
    ON public.musicians FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Permitir inserção de músicos autenticados"
    ON public.musicians FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Permitir atualização de músicos autenticados"
    ON public.musicians FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Permitir exclusão de músicos autenticados"
    ON public.musicians FOR DELETE
    TO authenticated
    USING (true);

-- ====================================
-- MINISTRY MEMBERS
-- ====================================
CREATE POLICY "Permitir leitura de membros do ministério"
    ON public.ministry_members FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Permitir inserção de membros autenticados"
    ON public.ministry_members FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Permitir atualização de membros autenticados"
    ON public.ministry_members FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Permitir exclusão de membros autenticados"
    ON public.ministry_members FOR DELETE
    TO authenticated
    USING (true);

-- ====================================
-- EVENTS
-- ====================================
CREATE POLICY "Permitir leitura de eventos"
    ON public.events FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Permitir inserção de eventos autenticados"
    ON public.events FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Permitir atualização de eventos autenticados"
    ON public.events FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Permitir exclusão de eventos autenticados"
    ON public.events FOR DELETE
    TO authenticated
    USING (true);
```

## Estrutura de Segurança Implementada

### ✅ Acesso Público (anon)
- **SELECT (Leitura)**: Permitido em todas as tabelas
  - Permite que a página "Reforços de Coletas" funcione sem login
  - Usuários não autenticados podem visualizar dados

### 🔒 Acesso Autenticado (authenticated)
- **INSERT (Criar)**: Apenas usuários autenticados
- **UPDATE (Atualizar)**: Apenas usuários autenticados
- **DELETE (Deletar)**: Apenas usuários autenticados

## Próximos Passos (Opcional - Maior Segurança)

Para um controle de acesso mais granular, você pode:

### 1. Criar Tabela de Usuários com Roles
```sql
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  congregation_id UUID REFERENCES public.congregations,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver seu próprio perfil"
  ON public.user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);
```

### 2. Políticas Baseadas em Roles
```sql
-- Exemplo: Apenas admins podem deletar congregações
CREATE POLICY "Apenas admins podem deletar congregações"
  ON public.congregations FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

### 3. Políticas por Congregação
```sql
-- Usuários só podem editar dados de sua própria congregação
CREATE POLICY "Usuários editam apenas sua congregação"
  ON public.musicians FOR UPDATE
  TO authenticated
  USING (
    congregation_id IN (
      SELECT congregation_id FROM public.user_profiles
      WHERE id = auth.uid()
    )
  );
```

## Teste da Autenticação

### Verificar se RLS está ativo:
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('congregations', 'musicians', 'ministry_members', 'events');
```

### Verificar políticas aplicadas:
```sql
SELECT schemaname, tablename, policyname, roles, cmd 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

## Troubleshooting

### Erro: "new row violates row-level security policy"
- Verifique se o usuário está autenticado
- Confirme que a política WITH CHECK permite a operação

### Erro: 401 Unauthorized em queries
- Verifique se as políticas SELECT permitem acesso anônimo ou autenticado
- Confirme que o token de autenticação está sendo enviado corretamente

### Usuários não conseguem fazer login
- Verifique se o email confirmation está configurado no Supabase
- Confirme que as URLs de redirect estão corretas
- Verifique os logs de autenticação no dashboard do Supabase
