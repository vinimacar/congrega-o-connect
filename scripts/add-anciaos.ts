/**
 * Script para adicionar os Anciões ao banco de dados
 * Lista fornecida: Silvano Silva Domingues, Idelson Parreira de Oliveira, 
 * João Batista dos Santos, João Pereira de Oliveira Neto, 
 * André Alves Barcelos, Vinícius Machado de Carvalho e Félix Pereira Pinto
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

const anciaos = [
  {
    name: 'Silvano Silva Domingues',
    role: 'anciao',
  },
  {
    name: 'Idelson Parreira de Oliveira',
    role: 'anciao',
  },
  {
    name: 'João Batista dos Santos',
    role: 'anciao',
  },
  {
    name: 'João Pereira de Oliveira Neto',
    role: 'anciao',
  },
  {
    name: 'André Alves Barcelos',
    role: 'anciao',
  },
  {
    name: 'Vinícius Machado de Carvalho',
    role: 'anciao',
  },
  {
    name: 'Félix Pereira Pinto',
    role: 'anciao',
  },
];

async function addAnciaos() {
  console.log('🔄 Iniciando inserção dos Anciões...\n');

  // Primeiro, buscar a congregação principal (assumindo que existe uma "Sede Central" ou similar)
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
    console.log('💡 Crie uma congregação primeiro antes de adicionar os anciões.');
    process.exit(1);
  }

  const mainCongregationId = congregations[0].id;
  console.log(`✅ Usando congregação: ${congregations[0].name} (ID: ${mainCongregationId})\n`);

  // Data padrão para apresentação/ordenação (pode ser ajustada depois)
  const defaultDate = new Date('2020-01-01').toISOString();

  for (const anciao of anciaos) {
    console.log(`Adicionando: ${anciao.name}...`);

    const { data, error } = await supabase
      .from('ministry_members')
      .insert({
        name: anciao.name,
        role: anciao.role,
        main_congregation_id: mainCongregationId,
        presentation_ordination_date: defaultDate,
        presented_ordained_by: 'A definir',
      })
      .select();

    if (error) {
      console.error(`  ❌ Erro ao adicionar ${anciao.name}:`, error.message);
    } else {
      console.log(`  ✅ ${anciao.name} adicionado com sucesso!`);
    }
  }

  console.log('\n✨ Processo concluído!');
  console.log('💡 Você pode editar os dados individuais dos anciões através da interface do sistema.');
}

addAnciaos().catch(console.error);
