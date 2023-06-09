export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      option: {
        Row: {
          details: string | null
          id: string
          name: string
          options: string[]
          storeid: string
          type: string | null
        }
        Insert: {
          details?: string | null
          id?: string
          name: string
          options: string[]
          storeid: string
          type?: string | null
        }
        Update: {
          details?: string | null
          id?: string
          name?: string
          options?: string[]
          storeid?: string
          type?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

