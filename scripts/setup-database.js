#!/usr/bin/env node

/**
 * Script para guiar a configuração das tabelas no Supabase
 * Execute com: npm run db:setup
 */

import { readFileSync } from 'fs';
import { join } from 'path';

console.log('\n' + '='.repeat(70));
console.log('🗄️  CONFIGURAÇÃO DO BANCO DE DADOS SUPABASE');
console.log('='.repeat(70));

try {
  // Ler o schema SQL
  const schemaPath = join(process.cwd(), 'supabase', 'schema.sql');
  const schema = readFileSync(schemaPath, 'utf-8');

  console.log('\n📋 INSTRUÇÕES PARA CRIAR AS TABELAS AUTOMATICAMENTE:\n');
  console.log('1️⃣  Acesse: https://app.supabase.com');
  console.log('2️⃣  Selecione seu projeto');
  console.log('3️⃣  Clique em "SQL Editor" no menu lateral');
  console.log('4️⃣  Clique no botão "New Query"');
  console.log('5️⃣  Cole o SQL abaixo');
  console.log('6️⃣  Clique em "Run" (ou pressione Ctrl+Enter)\n');

  console.log('─'.repeat(70));
  console.log('📄 SQL PARA COPIAR E COLAR:');
  console.log('─'.repeat(70) + '\n');
  console.log(schema);
  console.log('\n' + '─'.repeat(70));

  console.log('\n✨ TABELAS QUE SERÃO CRIADAS:\n');
  console.log('   ✓ congregations       - Congregações');
  console.log('   ✓ ministry_members    - Membros do Ministério (Anciãos, Diáconos, etc)');
  console.log('   ✓ musicians           - Músicos');
  console.log('   ✓ events              - Eventos e Agendamentos');

  console.log('\n🔒 RECURSOS INCLUÍDOS:\n');
  console.log('   ✓ Row Level Security (RLS) habilitado');
  console.log('   ✓ Políticas de acesso configuradas');
  console.log('   ✓ Triggers para atualização automática de timestamps');
  console.log('   ✓ Índices para otimização de queries');
  console.log('   ✓ Foreign Keys e relacionamentos');

  console.log('\n📖 Para mais informações, consulte: DATABASE_SETUP.md');
  console.log('\n' + '='.repeat(70) + '\n');

} catch (error) {
  console.error('\n❌ Erro ao ler o schema:', error.message);
  console.error('\nVerifique se o arquivo supabase/schema.sql existe.\n');
  process.exit(1);
}
