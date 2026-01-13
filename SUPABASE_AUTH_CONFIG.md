# Configuração de Autenticação do Supabase

## Problema: Erro 401 ao fazer login

Se você está recebendo erro 401 (Unauthorized) ao tentar fazer login, provavelmente a **confirmação de email** está habilitada no Supabase.

## Solução Rápida (Desenvolvimento)

### Desabilitar Confirmação de Email

1. Acesse o painel do Supabase:
   ```
   https://supabase.com/dashboard/project/srzrzjranohroesrxeoq/auth/providers
   ```

2. No menu lateral, clique em **"Email"** (em Providers)

3. Role até a seção **"Email Confirmation"**

4. **Desmarque** a opção **"Enable email confirmations"**

5. Clique em **"Save"**

### Teste o Login

Agora você pode:
1. Criar uma nova conta
2. Fazer login imediatamente (sem confirmar email)

## Solução para Produção

Para produção, você deve **manter a confirmação de email ativada** por segurança. Configure:

### 1. Templates de Email

No Supabase Dashboard:
1. Vá em **Authentication** > **Email Templates**
2. Personalize os templates:
   - **Confirm signup**: Email de confirmação de cadastro
   - **Invite user**: Convite de usuário
   - **Reset password**: Redefinição de senha

### 2. Configure o SMTP (Opcional)

Por padrão, o Supabase usa seu próprio servidor de email, mas tem limites:
- **Desenvolvimento**: Limitado
- **Produção**: Recomenda-se usar seu próprio SMTP

Para configurar SMTP personalizado:
1. Vá em **Settings** > **Project Settings** > **Auth**
2. Role até **SMTP Settings**
3. Configure seu provedor (Gmail, SendGrid, AWS SES, etc.)

### 3. Redirect URLs

Configure as URLs autorizadas:
1. Vá em **Authentication** > **URL Configuration**
2. Adicione suas URLs em **Redirect URLs**:
   ```
   https://vinimacar.github.io/congrega-o-connect/
   http://localhost:8080
   ```

## Troubleshooting

### Erro: "Invalid login credentials"
- ✅ Email ou senha incorretos
- ✅ Verifique se digitou corretamente
- ✅ Tente redefinir a senha

### Erro: "Email not confirmed"
- ✅ Confirme o email antes de fazer login
- ✅ OU desabilite a confirmação de email (ver acima)
- ✅ Reenvie o email de confirmação

### Erro: "User already registered"
- ✅ Este email já tem uma conta
- ✅ Use a aba "Entrar" ao invés de "Criar Conta"
- ✅ OU use "Esqueci minha senha" (quando implementado)

### Usuário criado mas não consegue logar
1. Vá em **Authentication** > **Users** no Supabase
2. Localize o usuário pelo email
3. Verifique se a coluna **"Email Confirmed"** está marcada
4. Se não estiver, clique no usuário e marque manualmente

## Verificar Usuários Criados

Para ver todos os usuários cadastrados:
1. Acesse: https://supabase.com/dashboard/project/srzrzjranohroesrxeoq/auth/users
2. Veja a lista de usuários
3. Você pode:
   - Deletar usuários
   - Confirmar emails manualmente
   - Ver metadados

## Logs de Autenticação

Para debugar problemas:
1. Acesse: https://supabase.com/dashboard/project/srzrzjranohroesrxeoq/logs/explorer
2. Filtre por **auth**
3. Veja os erros detalhados

## Configuração Recomendada para Desenvolvimento

```
✅ Email Confirmation: DESABILITADO
✅ Email Provider: Supabase (padrão)
✅ Auto-confirm users: HABILITADO
❌ Secure email change: DESABILITADO (para facilitar testes)
```

## Configuração Recomendada para Produção

```
✅ Email Confirmation: HABILITADO
✅ Email Provider: SMTP personalizado (recomendado)
✅ Auto-confirm users: DESABILITADO
✅ Secure email change: HABILITADO
✅ Templates de email personalizados
```

## Criar Primeiro Usuário Admin

Para criar o primeiro usuário administrativo:

### Opção 1: Via Interface (Mais fácil)
1. Desabilite a confirmação de email temporariamente
2. Crie a conta pela interface de signup
3. Faça login
4. Reabilite a confirmação de email

### Opção 2: Via SQL (Avançado)
Execute no SQL Editor:
```sql
-- Criar usuário com email já confirmado
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
)
VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@example.com',
  crypt('senha123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  false,
  'authenticated'
);
```

## Status Atual da Aplicação

- ✅ Login com Email/Senha implementado
- ✅ Criação de conta implementada
- ❌ Login com Google (desabilitado - precisa configuração)
- ❌ Recuperação de senha (não implementado ainda)
- ❌ Alteração de senha (não implementado ainda)

## Próximos Passos (Opcional)

1. Implementar "Esqueci minha senha"
2. Implementar alteração de senha
3. Adicionar perfis de usuário
4. Implementar roles (admin, usuário comum)
5. Configurar SMTP para produção
