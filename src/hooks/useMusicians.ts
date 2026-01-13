import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type Musician = Database['public']['Tables']['musicians']['Row'];
type MusicianInsert = Database['public']['Tables']['musicians']['Insert'];
type MusicianUpdate = Database['public']['Tables']['musicians']['Update'];

// Query para listar todos os músicos
export const useMusicians = (congregationId?: string) => {
  return useQuery({
    queryKey: congregationId ? ['musicians', { congregationId }] : ['musicians'],
    queryFn: async () => {
      let query = supabase
        .from('musicians')
        .select('*, congregation:congregations(*)');
      
      if (congregationId) {
        query = query.eq('congregation_id', congregationId);
      }
      
      const { data, error } = await query.order('name');
      
      if (error) throw error;
      return data as (Musician & { congregation: any })[];
    },
  });
};

// Query para buscar um músico específico
export const useMusician = (id: string) => {
  return useQuery({
    queryKey: ['musicians', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('musicians')
        .select('*, congregation:congregations(*)')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Musician & { congregation: any };
    },
    enabled: !!id,
  });
};

// Mutation para criar músico
export const useCreateMusician = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (musician: MusicianInsert) => {
      const { data, error } = await supabase
        .from('musicians')
        .insert(musician)
        .select()
        .single();
      
      if (error) throw error;
      return data as Musician;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['musicians'] });
    },
  });
};

// Mutation para atualizar músico
export const useUpdateMusician = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: MusicianUpdate }) => {
      const { data, error } = await supabase
        .from('musicians')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Musician;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['musicians'] });
      queryClient.invalidateQueries({ queryKey: ['musicians', data.id] });
    },
  });
};

// Mutation para deletar músico
export const useDeleteMusician = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('musicians')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['musicians'] });
    },
  });
};
