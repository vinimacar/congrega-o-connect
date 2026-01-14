import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type Congregation = Database['public']['Tables']['congregations']['Row'];
type CongregationInsert = Database['public']['Tables']['congregations']['Insert'];
type CongregationUpdate = Database['public']['Tables']['congregations']['Update'];

// Query para listar todas as congregações
export const useCongregations = () => {
  return useQuery({
    queryKey: ['congregations'],
    enabled: isSupabaseConfigured,
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase não configurado');
      const { data, error } = await supabase
        .from('congregations')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Congregation[];
    },
  });
};

// Query para buscar uma congregação específica
export const useCongregation = (id: string) => {
  return useQuery({
    queryKey: ['congregations', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('congregations')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Congregation;
    },
    enabled: !!id,
  });
};

// Mutation para criar congregação
export const useCreateCongregation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (congregation: CongregationInsert) => {
      const { data, error } = await supabase
        .from('congregations')
        // @ts-expect-error - Supabase generated types issue
        .insert([congregation])
        .select()
        .single();
      
      if (error) throw error;
      return data as Congregation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['congregations'] });
    },
  });
};

// Mutation para atualizar congregação
export const useUpdateCongregation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: CongregationUpdate }) => {
      const { data, error } = await supabase
        .from('congregations')
        // @ts-expect-error - Supabase generated types issue
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Congregation;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['congregations'] });
      queryClient.invalidateQueries({ queryKey: ['congregations', data.id] });
    },
  });
};

// Mutation para deletar congregação
export const useDeleteCongregation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('congregations')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['congregations'] });
    },
  });
};
