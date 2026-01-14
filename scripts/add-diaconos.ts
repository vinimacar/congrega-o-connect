/**
 * Script para adicionar os Diáconos ao banco de dados
 * Lista fornecida: Orlando Oliveira Costa, João Neves da Silva, 
 * José Donizete Pereira, Edmilson Aprígio de Freitas, 
 * Sílvio Marques e Bruno Borges Carvalho
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

const diaconos = [
  {
    name: 'Orlando Oliveira Costa',
    role: 'diacono',
  },
  {
    name: 'João Neves da Silva',
    role: 'diacono',
  },
  {
    name: 'José Donizete Pereira',
    role: 'diacono',
  },
  {
    name: 'Edmilson Aprígio de Freitas',
    role: 'diacono',
  },
  {
    name: 'Sílvio Marques',
    role: 'diacono',
  },
  {
    name: 'Bruno Borges Carvalho',
    role: 'diacono',
  },
];

async function addDiaconos() {
  console.log('🔄 Iniciando inserção dos Diáconos...\n');

  // Primeiro, buscar a congregação principal
  const { data: congregations, error: congError } = await supabase
    .from('congregations')
    .select('id, name')
    .limit(1);

  if (congError) {
    console.error('❌ Erro ao buscar congregações:', congError.message);
    process.exit(1);
  }

  if (!congregations || congregations.length === 0) {
    console.error('❌ Nenhuma congregação encontrada no banco de dados.');
    console.log('💡 Crie uma congregação primeiro antes de adicionar os diáconos.');
    process.exit(1);
  }

  const mainCongregationId = congregations[0].id;
  console.log(`✅ Usando congregação: ${congregations[0].name} (ID: ${mainCongregationId})\n`);

  // Data padrão para apresentação/ordenação (pode ser ajustada depois)
  const defaultDate = new Date('2020-01-01').toISOString();

  for (const diacono of diaconos) {
    console.log(`Adicionando: ${diacono.name}...`);

    const { data, error } = await supabase
      .from('ministry_members')
      .insert({
        name: diacono.name,
        role: diacono.role,
        main_congregation_id: mainCongregationId,
        presentation_ordination_date: defaultDate,
        presented_ordained_by: 'A definir',
      })
      .select();

    if (error) {
      console.error(`  ❌ Erro ao adicionar ${diacono.name}:`, error.message);
    } else {
      console.log(`  ✅ ${diacono.name} adicionado com sucesso!`);
    }
  }

  console.log('\n✨ Processo concluído!');
  console.log('💡 Você pode editar os dados individuais dos diáconos através da interface do sistema.');
}

addDiaconos().catch(console.error);
