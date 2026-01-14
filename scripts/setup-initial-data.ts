/**
 * Script completo para configuração inicial do sistema
 * Adiciona: Congregações, Anciões e Diáconos
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variáveis de ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY não configuradas');
  console.log('Configure as variáveis no arquivo .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Dados das congregações
const congregacoes = [
  {
    name: 'Congregação Ituiutaba',
    city: 'Ituiutaba',
    state: 'MG',
    address: 'A definir',
    responsible: 'A definir',
    status: 'ativa',
  },
  {
    name: 'Congregação Santa Vitória',
    city: 'Santa Vitória',
    state: 'MG',
    address: 'A definir',
    responsible: 'A definir',
    status: 'ativa',
  },
  {
    name: 'Congregação Capinópolis',
    city: 'Capinópolis',
    state: 'MG',
    address: 'A definir',
    responsible: 'A definir',
    status: 'ativa',
  },
  {
    name: 'Congregação Ipiaçu',
    city: 'Ipiaçu',
    state: 'MG',
    address: 'A definir',
    responsible: 'A definir',
    status: 'ativa',
  },
  {
    name: 'Congregação Gurinhatã',
    city: 'Gurinhatã',
    state: 'MG',
    address: 'A definir',
    responsible: 'A definir',
    status: 'ativa',
  },
  {
    name: 'Congregação Cachoeira Dourada',
    city: 'Cachoeira Dourada',
    state: 'MG',
    address: 'A definir',
    responsible: 'A definir',
    status: 'ativa',
  },
];

// Dados dos anciões
const anciaos = [
  'Silvano Silva Domingues',
  'Idelson Parreira de Oliveira',
  'João Batista dos Santos',
  'João Pereira de Oliveira Neto',
  'André Alves Barcelos',
  'Vinícius Machado de Carvalho',
  'Félix Pereira Pinto',
];

// Dados dos diáconos
const diaconos = [
  'Orlando Oliveira Costa',
  'João Neves da Silva',
  'José Donizete Pereira',
  'Edmilson Aprígio de Freitas',
  'Sílvio Marques',
  'Bruno Borges Carvalho',
];

async function setupInitialData() {
  console.log('🚀 Iniciando configuração inicial do sistema...\n');

  // Passo 1: Adicionar Congregações
  console.log('📍 PASSO 1: Adicionando Congregações\n');
  const congregationIds: string[] = [];
  
  for (const congregacao of congregacoes) {
    console.log(`  Adicionando: ${congregacao.name}...`);
    
    const { data, error } = await supabase
      .from('congregations')
      .insert(congregacao)
      .select();

    if (error) {
      console.error(`    ❌ Erro: ${error.message}`);
    } else if (data && data.length > 0) {
      congregationIds.push(data[0].id);
      console.log(`    ✅ Adicionada com sucesso!`);
    }
  }

  console.log(`\n  ✨ ${congregationIds.length} congregações adicionadas!\n`);

  if (congregationIds.length === 0) {
    console.error('❌ Nenhuma congregação foi adicionada. Abortando...');
    process.exit(1);
  }

  const mainCongregationId = congregationIds[0];
  const defaultDate = new Date('2020-01-01').toISOString();

  // Passo 2: Adicionar Anciões
  console.log('👔 PASSO 2: Adicionando Anciões\n');
  
  for (const anciao of anciaos) {
    console.log(`  Adicionando: ${anciao}...`);
    
    const { error } = await supabase
      .from('ministry_members')
      .insert({
        name: anciao,
        role: 'anciao',
        main_congregation_id: mainCongregationId,
        presentation_ordination_date: defaultDate,
        presented_ordained_by: 'A definir',
      });

    if (error) {
      console.error(`    ❌ Erro: ${error.message}`);
    } else {
      console.log(`    ✅ Adicionado com sucesso!`);
    }
  }

  console.log(`\n  ✨ ${anciaos.length} anciões adicionados!\n`);

  // Passo 3: Adicionar Diáconos
  console.log('🤝 PASSO 3: Adicionando Diáconos\n');
  
  for (const diacono of diaconos) {
    console.log(`  Adicionando: ${diacono}...`);
    
    const { error } = await supabase
      .from('ministry_members')
      .insert({
        name: diacono,
        role: 'diacono',
        main_congregation_id: mainCongregationId,
        presentation_ordination_date: defaultDate,
        presented_ordained_by: 'A definir',
      });

    if (error) {
      console.error(`    ❌ Erro: ${error.message}`);
    } else {
      console.log(`    ✅ Adicionado com sucesso!`);
    }
  }

  console.log(`\n  ✨ ${diaconos.length} diáconos adicionados!\n`);

  // Resumo final
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ CONFIGURAÇÃO INICIAL CONCLUÍDA COM SUCESSO!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`\n📊 Resumo:`);
  console.log(`   • ${congregacoes.length} congregações adicionadas`);
  console.log(`   • ${anciaos.length} anciões adicionados`);
  console.log(`   • ${diaconos.length} diáconos adicionados`);
  console.log(`   • Total: ${congregacoes.length + anciaos.length + diaconos.length} registros\n`);
  
  console.log('📋 Próximos passos sugeridos:');
  console.log('   1. Acesse o sistema e complete os dados das congregações');
  console.log('   2. Atualize informações dos anciões e diáconos');
  console.log('   3. Defina os responsáveis de cada congregação');
  console.log('   4. Configure horários de cultos e reuniões');
  console.log('   5. Adicione músicos e membros da EBI\n');
}

setupInitialData().catch(console.error);
