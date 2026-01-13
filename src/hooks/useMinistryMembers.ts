import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type MinistryMember = Database['public']['Tables']['ministry_members']['Row'];
type MinistryMemberInsert = Database['public']['Tables']['ministry_members']['Insert'];
type MinistryMemberUpdate = Database['public']['Tables']['ministry_members']['Update'];
type Congregation = Database['public']['Tables']['congregations']['Row'];

// Query para listar todos os membros do ministério
export const useMinistryMembers = (congregationId?: string) => {
  return useQuery({
    queryKey: congregationId ? ['ministry_members', { congregationId }] : ['ministry_members'],
    queryFn: async () => {
      let query = supabase
        .from('ministry_members')
        .select('*, main_congregation:congregations!main_congregation_id(*)');
      
      if (congregationId) {
        query = query.eq('main_congregation_id', congregationId);
      }
      
      const { data, error } = await query.order('name');
      
      if (error) throw error;
      return data as (MinistryMember & { main_congregation: Congregation })[];
    },
  });
};

// Query para buscar um membro específico
export const useMinistryMember = (id: string) => {
  return useQuery({
    queryKey: ['ministry_members', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ministry_members')
        .select('*, main_congregation:congregations!main_congregation_id(*)')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as MinistryMember & { main_congregation: Congregation };
    },
    enabled: !!id,
  });
};

// Mutation para criar membro
export const useCreateMinistryMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (member: MinistryMemberInsert) => {
      const { data, error } = await supabase
        .from('ministry_members')
        // @ts-expect-error - Supabase generated types issue
        .insert([member])
        .select()
        .single();
      
      if (error) throw error;
      return data as MinistryMember;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ministry_members'] });
    },
  });
};

// Mutation para atualizar membro
export const useUpdateMinistryMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: MinistryMemberUpdate }) => {
      const { data, error } = await supabase
        .from('ministry_members')
        // @ts-expect-error - Supabase generated types issue
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as MinistryMember;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['ministry_members'] });
      queryClient.invalidateQueries({ queryKey: ['ministry_members', data.id] });
    },
  });
};

// Mutation para deletar membro
export const useDeleteMinistryMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('ministry_members')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ministry_members'] });
    },
  });
};
