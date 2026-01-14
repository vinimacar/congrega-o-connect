# 🗄️ Configuração do Banco de Dados Supabase

Este guia mostra como criar automaticamente as tabelas para Congregações e Ministério no Supabase.

## 📋 Pré-requisitos

1. Conta no Supabase (gratuita): https://supabase.com
2. Projeto criado no Supabase
3. Arquivo `.env` configurado com as credenciais

## 🚀 Método 1: Automático (Recomendado)

### Passo 1: Configure as variáveis de ambiente

Crie ou edite o arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

### Passo 2: Execute o script de configuração

```bash
npm run db:setup
```

O script irá:
- ✅ Testar a conexão com o Supabase
- 📄 Exibir o SQL necessário
- 📋 Fornecer instruções detalhadas

## 🔧 Método 2: Manual via Supabase Dashboard

### Passo 1: Acesse o SQL Editor

1. Vá para [Supabase Dashboard](https://app.supabase.com)
2. Selecione seu projeto
3. Clique em **"SQL Editor"** no menu lateral
4. Clique em **"New Query"**

### Passo 2: Execute o Schema

1. Abra o arquivo `supabase/schema.sql` deste projeto
2. Copie todo o conteúdo
3. Cole no SQL Editor do Supabase
4. Clique em **"Run"** ou pressione `Ctrl+Enter`

## 📊 Tabelas Criadas

Após executar o schema, as seguintes tabelas estarão disponíveis:

### 1. **congregations** (Congregações)
```sql
- id (UUID)
- name (varchar)
- address (varchar)
- city (varchar)
- state (char)
- phone (varchar)
- responsible (varchar)
- capacity (integer)
- status (varchar)
- culto_domingo_manha (varchar)
- culto_domingo_noite (varchar)
- culto_quarta (varchar)
- reuniao_jovens_dia (varchar)
- reuniao_jovens_horario (varchar)
- reuniao_menores_dia (varchar)
- reuniao_menores_horario (varchar)
- created_at, updated_at (timestamp)
```

### 2. **ministry_members** (Membros do Ministério)
```sql
- id (UUID)
- name (varchar)
- role (varchar) - 'anciao', 'cooperador', 'diacono', 'diaconisa'
- presentation_ordination_date (date)
- presented_ordained_by (varchar)
- main_congregation_id (UUID) - FK para congregations
- served_congregations (jsonb) - Array de IDs
- phone (varchar)
- email (varchar)
- notes (text)
- created_at, updated_at (timestamp)
```

### 3. **musicians** (Músicos)
```sql
- id (UUID)
- name (varchar)
- email (varchar)
- phone (varchar)
- instrument (varchar)
- congregation_id (UUID) - FK para congregations
- status (varchar)
- start_date (date)
- notes (text)
- created_at, updated_at (timestamp)
```

### 4. **events** (Eventos)
```sql
- id (UUID)
- title (varchar)
- type (varchar)
- date (date)
- time (varchar)
- congregation_id (UUID) - FK para congregations
- description (text)
- expected_attendees (integer)
- is_recurring (boolean)
- created_at, updated_at (timestamp)
```

## 🔒 Segurança (RLS)

O schema inclui:

- ✅ Row Level Security (RLS) habilitado em todas as tabelas
- ✅ Políticas de acesso configuradas (permitir CRUD para usuários autenticados e anônimos)
- ✅ Triggers para atualização automática de `updated_at`
- ✅ Índices para otimização de queries

## 🔄 Atualizações Automáticas

Cada tabela tem um trigger que atualiza automaticamente o campo `updated_at` sempre que um registro é modificado.

## 🧪 Testar a Conexão

Após criar as tabelas, você pode testar se tudo está funcionando:

1. Execute o projeto: `npm run dev`
2. Navegue até a página de Congregações
3. Tente adicionar uma nova congregação
4. Verifique no Supabase Dashboard → Table Editor se o registro foi criado

## ⚠️ Solução de Problemas

### Erro: "relation already exists"
Algumas tabelas já existem. Isso é normal se você já executou o schema antes.

### Erro: "permission denied"
Verifique se as políticas RLS estão configuradas corretamente no Supabase Dashboard.

### Erro: "invalid credentials"
Verifique se as variáveis de ambiente no `.env` estão corretas.

## 📚 Recursos Adicionais

- [Documentação do Supabase](https://supabase.com/docs)
- [SQL Editor Guide](https://supabase.com/docs/guides/database/overview)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## 🆘 Precisa de Ajuda?

Se encontrar problemas:
1. Verifique os logs do console
2. Consulte a documentação do Supabase
3. Abra uma issue no repositório

---

**Última atualização:** Janeiro 2026
