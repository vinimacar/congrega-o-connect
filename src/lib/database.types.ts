export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      congregations: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          address: string
          city: string
          state: string
          phone: string | null
          responsible: string
          capacity: number | null
          status: 'ativa' | 'em_construcao' | 'inativa'
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          address: string
          city: string
          state: string
          phone?: string | null
          responsible: string
          capacity?: number | null
          status: 'ativa' | 'em_construcao' | 'inativa'
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          address?: string
          city?: string
          state?: string
          phone?: string | null
          responsible?: string
          capacity?: number | null
          status?: 'ativa' | 'em_construcao' | 'inativa'
        }
      }
      musicians: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          email: string | null
          phone: string | null
          instrument: string
          congregation_id: string
          status: 'ativo' | 'em_formacao' | 'inativo'
          start_date: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          email?: string | null
          phone?: string | null
          instrument: string
          congregation_id: string
          status: 'ativo' | 'em_formacao' | 'inativo'
          start_date?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          email?: string | null
          phone?: string | null
          instrument?: string
          congregation_id?: string
          status?: 'ativo' | 'em_formacao' | 'inativo'
          start_date?: string | null
          notes?: string | null
        }
      }
      ministry_members: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          role: 'anciao' | 'cooperador' | 'diacono' | 'diaconisa'
          congregation_id: string
          phone: string | null
          email: string | null
          start_year: number
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          role: 'anciao' | 'cooperador' | 'diacono' | 'diaconisa'
          congregation_id: string
          phone?: string | null
          email?: string | null
          start_year: number
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          role?: 'anciao' | 'cooperador' | 'diacono' | 'diaconisa'
          congregation_id?: string
          phone?: string | null
          email?: string | null
          start_year?: number
          notes?: string | null
        }
      }
      events: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          type: 'culto' | 'ensaio' | 'reuniao' | 'cerimonia' | 'ebi' | 'outro'
          date: string
          time: string
          congregation_id: string
          description: string | null
          expected_attendees: number | null
          is_recurring: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          type: 'culto' | 'ensaio' | 'reuniao' | 'cerimonia' | 'ebi' | 'outro'
          date: string
          time: string
          congregation_id: string
          description?: string | null
          expected_attendees?: number | null
          is_recurring?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          type?: 'culto' | 'ensaio' | 'reuniao' | 'cerimonia' | 'ebi' | 'outro'
          date?: string
          time?: string
          congregation_id?: string
          description?: string | null
          expected_attendees?: number | null
          is_recurring?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
