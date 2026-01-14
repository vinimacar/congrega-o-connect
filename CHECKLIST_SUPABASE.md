# ✅ Checklist: Configuração do Supabase

Siga este checklist para configurar o banco de dados corretamente.

## □ Passo 1: Criar Conta no Supabase
- [ ] Acesse https://supabase.com
- [ ] Crie uma conta gratuita (se ainda não tiver)
- [ ] Faça login

## □ Passo 2: Criar Projeto
- [ ] Clique em "New Project"
- [ ] Escolha um nome (ex: ccb-gestao)
- [ ] Defina uma senha forte para o banco
- [ ] Escolha a região mais próxima (Brazil - South America)
- [ ] Aguarde a criação do projeto (1-2 minutos)

## □ Passo 3: Obter Credenciais
- [ ] No dashboard do projeto, vá em **Settings** → **API**
- [ ] Copie a **Project URL** (ex: https://xxx.supabase.co)
- [ ] Copie a **anon public key** (chave longa que começa com "eyJ...")

## □ Passo 4: Configurar Variáveis de Ambiente
- [ ] Na raiz do projeto, crie o arquivo `.env`
- [ ] Adicione as credenciais:
  ```env
  VITE_SUPABASE_URL=https://seu-projeto.supabase.co
  VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
  ```
- [ ] Salve o arquivo

## □ Passo 5: Executar Script de Setup
- [ ] Abra o terminal na pasta do projeto
- [ ] Execute: `npm run db:setup`
- [ ] O script irá exibir o SQL necessário

## □ Passo 6: Criar Tabelas no Supabase
- [ ] No Supabase, vá em **SQL Editor** (menu lateral)
- [ ] Clique em **New Query**
- [ ] Cole TODO o SQL gerado pelo script
- [ ] Clique em **Run** (ou Ctrl+Enter)
- [ ] Aguarde a execução (deve mostrar "Success")

## □ Passo 7: Verificar Tabelas Criadas
- [ ] No Supabase, vá em **Table Editor**
- [ ] Verifique se as 4 tabelas foram criadas:
  - [ ] congregations
  - [ ] ministry_members
  - [ ] musicians
  - [ ] events

## □ Passo 8: Testar o Sistema
- [ ] No terminal, execute: `npm run dev`
- [ ] Abra http://localhost:8080
- [ ] Faça login (se necessário)
- [ ] Vá em **Congregações**
- [ ] Tente adicionar uma nova congregação
- [ ] Verifique no Supabase se o registro apareceu

## ✅ Concluído!

Se todas as etapas foram marcadas, seu sistema está pronto para uso!

## 🆘 Problemas?

### Erro ao executar SQL
- Verifique se copiou TODO o SQL
- Execute em partes se necessário
- Alguns avisos sobre "already exists" são normais

### Erro "relation does not exist"
- As tabelas não foram criadas
- Volte ao Passo 6 e execute o SQL novamente

### Erro de conexão
- Verifique se o `.env` está configurado corretamente
- Confirme se a URL e a chave estão corretas
- Reinicie o servidor de desenvolvimento

### Não consigo adicionar dados
- Verifique se as políticas RLS foram criadas
- Certifique-se de que executou TODO o SQL do schema

---

**Precisa de ajuda?** Consulte [DATABASE_SETUP.md](./DATABASE_SETUP.md) para detalhes completos.
