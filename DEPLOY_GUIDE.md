# Guia de Deploy - GitHub Pages

## 🚀 Deploy Automático (Recomendado)

O projeto está configurado para deploy automático no GitHub Pages via GitHub Actions.

### Configuração Inicial

1. **Habilitar GitHub Pages**:
   - Vá em `Settings` > `Pages` no seu repositório
   - Em **Source**, selecione `GitHub Actions`
   - Salve as configurações

2. **Push para o repositório**:
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

3. **Aguardar o Deploy**:
   - O GitHub Actions será executado automaticamente
   - Acompanhe em `Actions` tab no repositório
   - Após concluído, o site estará disponível em: `https://vinimacar.github.io/congrega-o-connect/`

## 🔧 Deploy Manual (Alternativo)

Se preferir fazer deploy manual:

```bash
# 1. Build do projeto
npm run build

# 2. Deploy usando gh-pages (instale se necessário)
npm install -g gh-pages
gh-pages -d dist
```

## 📝 Alterações Realizadas

Para compatibilidade com GitHub Pages, foram feitas as seguintes alterações:

1. **vite.config.ts**:
   - Adicionado `base: '/congrega-o-connect/'` para correto carregamento de assets

2. **App.tsx**:
   - Mudado de `BrowserRouter` para `HashRouter`
   - HashRouter usa `#` nas URLs (ex: `/#/musical`) e funciona perfeitamente com GitHub Pages

3. **Arquivos adicionados**:
   - `.github/workflows/deploy.yml` - Workflow de deploy automático
   - `public/.nojekyll` - Desabilita processamento Jekyll
   - `public/404.html` - Página de fallback para rotas

## 🌐 URLs

- **Produção**: https://vinimacar.github.io/congrega-o-connect/
- **Desenvolvimento Local**: http://localhost:8080

## ⚙️ Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build local
npm run preview

# Lint
npm run lint
```

## 🔍 Troubleshooting

### Erro 404 ao acessar rotas diretas

**Solução**: Usamos `HashRouter` que resolve automaticamente. As URLs terão `#` (ex: `/#/musical`)

### Assets não carregam (404)

**Solução**: Certifique-se que o `base` no `vite.config.ts` está correto:
```typescript
base: '/congrega-o-connect/'
```

### Deploy não funciona

1. Verifique se GitHub Pages está habilitado
2. Confirme que a branch `main` existe
3. Verifique os logs em `Actions` tab
4. Certifique-se que as permissões do workflow estão corretas

## 📦 Estrutura de Deploy

```
dist/
├── index.html
├── 404.html
├── .nojekyll
├── assets/
│   ├── index-[hash].css
│   └── index-[hash].js
└── robots.txt
```

## 🔐 Variáveis de Ambiente

Para produção, configure as variáveis de ambiente do Supabase:

1. Crie secrets no GitHub:
   - `Settings` > `Secrets and variables` > `Actions`
   - Adicione: `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`

2. Atualize o workflow para usar os secrets (se necessário)

---

✅ **Status**: Configuração completa! Pronto para deploy no GitHub Pages.
