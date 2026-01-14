/**
 * Script para criar as tabelas automaticamente no Supabase
 * Executa o schema.sql no banco de dados
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Carregar variáveis de ambiente
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Erro: Variáveis de ambiente não configuradas!');
  console.error('Configure VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no arquivo .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  try {
    console.log('🚀 Iniciando configuração do banco de dados...\n');

    // Ler o arquivo schema.sql
    const schemaPath = join(process.cwd(), 'supabase', 'schema.sql');
    console.log(`📄 Lendo schema de: ${schemaPath}`);
    
    const schema = readFileSync(schemaPath, 'utf-8');
    
    // Dividir o schema em comandos individuais
    const commands = schema
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

    console.log(`📝 Encontrados ${commands.length} comandos SQL para executar\n`);

    // Executar cada comando
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < commands.length; i++) {
      const command = commands[i] + ';';
      
      // Extrair o tipo de comando para melhor logging
      const commandType = command.match(/^(CREATE|ALTER|DROP|INSERT|UPDATE|DELETE)/i)?.[0] || 'SQL';
      const tableName = command.match(/TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:public\.)?(\w+)/i)?.[1] || '';
      const policyName = command.match(/POLICY\s+"([^"]+)"/)?.[1] || '';
      
      let description = `${commandType}`;
      if (tableName) description += ` TABLE ${tableName}`;
      if (policyName) description += ` POLICY "${policyName}"`;
      
      console.log(`⏳ [${i + 1}/${commands.length}] Executando: ${description}`);

      const { error } = await supabase.rpc('exec_sql', { sql: command });

      if (error) {
        // Alguns erros são esperados (ex: extensão já existe)
        if (error.message?.includes('already exists') || 
            error.message?.includes('já existe')) {
          console.log(`⚠️  Aviso: ${error.message}`);
        } else {
          console.error(`❌ Erro: ${error.message || error}`);
          errorCount++;
        }
      } else {
        successCount++;
        console.log(`✅ Sucesso\n`);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 Resumo da execução:');
    console.log(`✅ Comandos bem-sucedidos: ${successCount}`);
    console.log(`❌ Comandos com erro: ${errorCount}`);
    console.log('='.repeat(60) + '\n');

    if (errorCount === 0) {
      console.log('🎉 Banco de dados configurado com sucesso!');
      console.log('\n📋 Tabelas criadas:');
      console.log('   • congregations (Congregações)');
      console.log('   • ministry_members (Membros do Ministério)');
      console.log('   • musicians (Músicos)');
      console.log('   • events (Eventos)');
      console.log('\n✨ Você já pode usar o sistema!');
    } else {
      console.log('⚠️  Configuração concluída com alguns avisos.');
      console.log('Verifique os erros acima e execute manualmente se necessário.');
    }

  } catch (error) {
    console.error('\n❌ Erro fatal ao configurar banco de dados:', error);
    process.exit(1);
  }
}

// Executar apenas se chamado diretamente
setupDatabase();

