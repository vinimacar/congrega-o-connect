/**
 * Script para adicionar as Congregações ao banco de dados
 * Cidades: Ituiutaba, Santa Vitória, Capinópolis, Ipiaçu, Gurinhatã e Cachoeira Dourada
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

async function addCongregacoes() {
  console.log('🔄 Iniciando inserção das Congregações...\n');

  for (const congregacao of congregacoes) {
    console.log(`Adicionando: ${congregacao.name} (${congregacao.city})...`);

    const { data, error } = await supabase
      .from('congregations')
      .insert({
        name: congregacao.name,
        city: congregacao.city,
        state: congregacao.state,
        address: congregacao.address,
        responsible: congregacao.responsible,
        status: congregacao.status,
      })
      .select();

    if (error) {
      console.error(`  ❌ Erro ao adicionar ${congregacao.name}:`, error.message);
    } else {
      console.log(`  ✅ ${congregacao.name} adicionada com sucesso!`);
    }
  }

  console.log('\n✨ Processo concluído!');
  console.log('💡 Você pode editar os dados das congregações através da interface do sistema.');
  console.log('\n📋 Próximos passos sugeridos:');
  console.log('   1. Atualize os endereços completos de cada congregação');
  console.log('   2. Defina os responsáveis (anciões) de cada congregação');
  console.log('   3. Configure os horários de cultos e reuniões');
  console.log('   4. Adicione capacidade e telefone de contato');
}

addCongregacoes().catch(console.error);
