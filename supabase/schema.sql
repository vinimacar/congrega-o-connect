-- Criação das tabelas do banco de dados CCB Gestão

-- Habilitar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de Congregações
CREATE TABLE IF NOT EXISTS public.congregations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(200) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state CHAR(2) NOT NULL,
    phone VARCHAR(15),
    responsible VARCHAR(100) NOT NULL,
    capacity INTEGER,
    status VARCHAR(20) NOT NULL CHECK (status IN ('ativa', 'em_construcao', 'inativa')),
    -- Horários de Cultos
    culto_domingo_manha VARCHAR(5),
    culto_domingo_noite VARCHAR(5),
    culto_quarta VARCHAR(5),
    -- Reuniões
    reuniao_jovens_dia VARCHAR(20),
    reuniao_jovens_horario VARCHAR(5),
    reuniao_menores_dia VARCHAR(20),
    reuniao_menores_horario VARCHAR(5)
);

-- Tabela de Músicos
CREATE TABLE IF NOT EXISTS public.musicians (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(15),
    instrument VARCHAR(50) NOT NULL,
    congregation_id UUID NOT NULL REFERENCES public.congregations(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('ativo', 'em_formacao', 'inativo')),
    start_date DATE,
    notes TEXT
);

-- Tabela de Membros do Ministério
CREATE TABLE IF NOT EXISTS public.ministry_members (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('anciao', 'cooperador', 'diacono', 'diaconisa')),
    congregation_id UUID NOT NULL REFERENCES public.congregations(id) ON DELETE CASCADE,
    phone VARCHAR(15),
    email VARCHAR(255),
    start_year INTEGER NOT NULL,
    notes TEXT
);

-- Tabela de Eventos
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    title VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('culto', 'ensaio', 'reuniao', 'cerimonia', 'ebi', 'outro')),
    date DATE NOT NULL,
    time VARCHAR(5) NOT NULL,
    congregation_id UUID NOT NULL REFERENCES public.congregations(id) ON DELETE CASCADE,
    description TEXT,
    expected_attendees INTEGER,
    is_recurring BOOLEAN DEFAULT FALSE
);

-- Índices para melhorar performance
CREATE INDEX idx_musicians_congregation ON public.musicians(congregation_id);
CREATE INDEX idx_musicians_status ON public.musicians(status);
CREATE INDEX idx_ministry_members_congregation ON public.ministry_members(congregation_id);
CREATE INDEX idx_ministry_members_role ON public.ministry_members(role);
CREATE INDEX idx_events_congregation ON public.events(congregation_id);
CREATE INDEX idx_events_date ON public.events(date);
CREATE INDEX idx_events_type ON public.events(type);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_congregations_updated_at BEFORE UPDATE ON public.congregations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_musicians_updated_at BEFORE UPDATE ON public.musicians
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ministry_members_updated_at BEFORE UPDATE ON public.ministry_members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE public.congregations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.musicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ministry_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso (ajuste conforme necessário)
-- Por padrão, permitir leitura para usuários autenticados

-- Congregations
-- Permitindo acesso público (anônimo) temporariamente - adicione autenticação depois
CREATE POLICY "Permitir leitura de congregações para todos"
    ON public.congregations FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Permitir inserção de congregações para todos"
    ON public.congregations FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Permitir atualização de congregações para todos"
    ON public.congregations FOR UPDATE
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Permitir exclusão de congregações para todos"
    ON public.congregations FOR DELETE
    TO anon, authenticated
    USING (true);

-- Musicians
CREATE POLICY "Permitir leitura de músicos para todos"
    ON public.musicians FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Permitir inserção de músicos para todos"
    ON public.musicians FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Permitir atualização de músicos para todos"
    ON public.musicians FOR UPDATE
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Permitir exclusão de músicos para todos"
    ON public.musicians FOR DELETE
    TO anon, authenticated
    USING (true);

-- Ministry Members
CREATE POLICY "Permitir leitura de membros do ministério para todos"
    ON public.ministry_members FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Permitir inserção de membros do ministério para todos"
    ON public.ministry_members FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Permitir atualização de membros do ministério para todos"
    ON public.ministry_members FOR UPDATE
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Permitir exclusão de membros do ministério para todos"
    ON public.ministry_members FOR DELETE
    TO anon, authenticated
    USING (true);

-- Events
CREATE POLICY "Permitir leitura de eventos para todos"
    ON public.events FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Permitir inserção de eventos para todos"
    ON public.events FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Permitir atualização de eventos para todos"
    ON public.events FOR UPDATE
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Permitir exclusão de eventos para todos"
    ON public.events FOR DELETE
    TO anon, authenticated
    USING (true);
