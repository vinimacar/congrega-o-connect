# 🚀 Guia de Deploy - GitHub Pages

Este guia mostra como fazer o deploy do **Congregação Connect** no GitHub Pages.

## ✅ Pré-requisitos

O projeto já está configurado com:
- ✅ GitHub Actions workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml))
- ✅ Base path configurada no Vite (`/congrega-o-connect/`)
- ✅ HashRouter configurado no React Router
- ✅ Página 404 com redirecionamento

## 📋 Passo a Passo

### 1. Configurar Secrets do GitHub

Antes de fazer o deploy, configure as variáveis de ambiente do Supabase:

1. Acesse: `https://github.com/vinimacar/congrega-o-connect/settings/secrets/actions`
2. Clique em **"New repository secret"**
3. Adicione os seguintes secrets:

   - **Nome:** `VITE_SUPABASE_URL`
     - **Valor:** Sua URL do Supabase (ex: `https://xxxxx.supabase.co`)
   
   - **Nome:** `VITE_SUPABASE_ANON_KEY`
     - **Valor:** Sua chave anônima do Supabase

> 💡 **Como obter estas informações:**
> - Acesse: https://supabase.com/dashboard/project/_/settings/api
> - Copie: **Project URL** → `VITE_SUPABASE_URL`
> - Copie: **Project API keys** → `anon` → `VITE_SUPABASE_ANON_KEY`

### 2. Habilitar GitHub Pages

1. Acesse: `https://github.com/vinimacar/congrega-o-connect/settings/pages`
2. Em **"Source"**, selecione: **GitHub Actions**
3. Clique em **"Save"**

### 3. Fazer Push para o GitHub

```bash
# Adicionar alterações
git add .

# Criar commit
git commit -m "feat: configuração inicial com congregações, anciões e diáconos"

# Enviar para o GitHub
git push origin main
```

### 4. Acompanhar o Deploy

1. Acesse: `https://github.com/vinimacar/congrega-o-connect/actions`
2. Aguarde o workflow **"Deploy to GitHub Pages"** finalizar
3. O deploy leva aproximadamente 2-5 minutos

### 5. Acessar o Site

Após o deploy concluir, acesse:
```
https://vinimacar.github.io/congrega-o-connect/
```

## 🔄 Deploys Automáticos

O deploy é **automático**! Sempre que você fizer push para a branch `main`:
- ✅ O GitHub Actions roda automaticamente
- ✅ Faz build do projeto
- ✅ Publica no GitHub Pages

## 🛠️ Comandos Úteis

### Deploy Manual (via workflow_dispatch)
1. Acesse: `https://github.com/vinimacar/congrega-o-connect/actions`
2. Selecione o workflow **"Deploy to GitHub Pages"**
3. Clique em **"Run workflow"**

### Build Local (para testar)
```bash
# Build de produção
npm run build

# Preview do build
npm run preview
```

### Executar Scripts de Dados
```bash
# Adicionar todos os dados iniciais
npx tsx scripts/setup-initial-data.ts

# Ou individualmente
npx tsx scripts/add-congregacoes.ts
npx tsx scripts/add-anciaos.ts
npx tsx scripts/add-diaconos.ts
```

## 🔒 Segurança

### ⚠️ IMPORTANTE - Políticas RLS do Supabase

Antes de usar em produção, configure as políticas RLS (Row Level Security):

1. Acesse: https://supabase.com/dashboard/project/_/auth/policies
2. Configure políticas para cada tabela (`congregations`, `ministry_members`, etc.)
3. Veja: [`SUPABASE_AUTH_RLS.md`](SUPABASE_AUTH_RLS.md) para instruções detalhadas

### Secrets
- ✅ Nunca commite `.env` com secrets
- ✅ Use GitHub Secrets para variáveis sensíveis
- ✅ A `ANON_KEY` do Supabase é segura para uso público

## 🐛 Troubleshooting

### Página 404 ao acessar rotas diretamente
- ✅ Já configurado! O arquivo `404.html` redireciona automaticamente

### Build falha no GitHub Actions
- Verifique se os secrets `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` estão configurados
- Veja os logs em: `https://github.com/vinimacar/congrega-o-connect/actions`

### Site não carrega dados
- Verifique se as variáveis de ambiente estão corretas
- Teste a conexão com Supabase localmente primeiro
- Verifique se as tabelas existem no banco de dados

### Erro de CORS
- Configure as URLs permitidas no Supabase:
  - Vá em: Settings > API > URL Configuration
  - Adicione: `https://vinimacar.github.io`

## 📚 Documentação Adicional

- [Vite Build Config](https://vitejs.dev/config/build-options.html)
- [GitHub Pages](https://docs.github.com/en/pages)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Supabase Auth](https://supabase.com/docs/guides/auth)

## 🎯 Próximos Passos

Após o deploy:
1. ✅ Teste o sistema em produção
2. ✅ Configure autenticação do Supabase
3. ✅ Execute scripts de dados iniciais
4. ✅ Configure políticas RLS
5. ✅ Adicione domínio personalizado (opcional)

---

**URL do Projeto:** https://vinimacar.github.io/congrega-o-connect/

**Repositório:** https://github.com/vinimacar/congrega-o-connect
