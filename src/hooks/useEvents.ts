import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type Event = Database['public']['Tables']['events']['Row'];
type EventInsert = Database['public']['Tables']['events']['Insert'];
type EventUpdate = Database['public']['Tables']['events']['Update'];
type Congregation = Database['public']['Tables']['congregations']['Row'];

// Query para listar todos os eventos
export const useEvents = (congregationId?: string) => {
  return useQuery({
    queryKey: congregationId ? ['events', { congregationId }] : ['events'],
    queryFn: async () => {
      let query = supabase
        .from('events')
        .select('*, congregation:congregations(*)');
      
      if (congregationId) {
        query = query.eq('congregation_id', congregationId);
      }
      
      const { data, error } = await query.order('date', { ascending: false });
      
      if (error) throw error;
      return data as (Event & { congregation: Congregation })[];
    },
  });
};

// Query para buscar um evento específico
export const useEvent = (id: string) => {
  return useQuery({
    queryKey: ['events', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*, congregation:congregations(*)')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Event & { congregation: Congregation };
    },
    enabled: !!id,
  });
};

// Mutation para criar evento
export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (event: EventInsert) => {
      const { data, error } = await supabase
        .from('events')
        // @ts-expect-error - Supabase generated types issue
        .insert([event])
        .select()
        .single();
      
      if (error) throw error;
      return data as Event;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

// Mutation para atualizar evento
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: EventUpdate }) => {
      const { data, error } = await supabase
        .from('events')
        // @ts-expect-error - Supabase generated types issue
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Event;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['events', data.id] });
    },
  });
};

// Mutation para deletar evento
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};
