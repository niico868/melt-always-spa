export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          action_label: string | null
          created_at: string
          dismissed: boolean
          id: string
          kind: string
          message: string
        }
        Insert: {
          action_label?: string | null
          created_at?: string
          dismissed?: boolean
          id?: string
          kind?: string
          message: string
        }
        Update: {
          action_label?: string | null
          created_at?: string
          dismissed?: boolean
          id?: string
          kind?: string
          message?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          created_at: string
          customer_id: string | null
          employee_id: string | null
          id: string
          scheduled_at: string
          service_id: string | null
          status: string
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          employee_id?: string | null
          id?: string
          scheduled_at: string
          service_id?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          employee_id?: string | null
          id?: string
          scheduled_at?: string
          service_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      consultations: {
        Row: {
          client_name: string
          created_at: string
          customer_id: string | null
          id: string
          service_id: string | null
          service_name: string | null
          status: string
          submitted_at: string
        }
        Insert: {
          client_name: string
          created_at?: string
          customer_id?: string | null
          id?: string
          service_id?: string | null
          service_name?: string | null
          status?: string
          submitted_at?: string
        }
        Update: {
          client_name?: string
          created_at?: string
          customer_id?: string | null
          id?: string
          service_id?: string | null
          service_name?: string | null
          status?: string
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultations_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultations_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_notes: {
        Row: {
          author_id: string | null
          body: string
          created_at: string
          customer_id: string
          id: string
          pinned: boolean
        }
        Insert: {
          author_id?: string | null
          body: string
          created_at?: string
          customer_id: string
          id?: string
          pinned?: boolean
        }
        Update: {
          author_id?: string | null
          body?: string
          created_at?: string
          customer_id?: string
          id?: string
          pinned?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "customer_notes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_treatments: {
        Row: {
          after_photo_url: string | null
          appointment_id: string | null
          before_photo_url: string | null
          created_at: string
          customer_id: string
          employee_id: string | null
          employee_name: string | null
          id: string
          outcome_notes: string | null
          performed_at: string
          price: number | null
          service_id: string | null
          service_name: string
          session_number: number | null
        }
        Insert: {
          after_photo_url?: string | null
          appointment_id?: string | null
          before_photo_url?: string | null
          created_at?: string
          customer_id: string
          employee_id?: string | null
          employee_name?: string | null
          id?: string
          outcome_notes?: string | null
          performed_at?: string
          price?: number | null
          service_id?: string | null
          service_name: string
          session_number?: number | null
        }
        Update: {
          after_photo_url?: string | null
          appointment_id?: string | null
          before_photo_url?: string | null
          created_at?: string
          customer_id?: string
          employee_id?: string | null
          employee_name?: string | null
          id?: string
          outcome_notes?: string | null
          performed_at?: string
          price?: number | null
          service_id?: string | null
          service_name?: string
          session_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_treatments_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_treatments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_treatments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_treatments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          full_name: string
          id: string
          marketing_opt_in: boolean | null
          notes: string | null
          phone: string | null
          preferred_contact: string | null
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          full_name: string
          id?: string
          marketing_opt_in?: boolean | null
          notes?: string | null
          phone?: string | null
          preferred_contact?: string | null
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          full_name?: string
          id?: string
          marketing_opt_in?: boolean | null
          notes?: string | null
          phone?: string | null
          preferred_contact?: string | null
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      employees: {
        Row: {
          avatar_tone: string
          created_at: string
          full_name: string
          id: string
          role: string
          slots_total: number
        }
        Insert: {
          avatar_tone?: string
          created_at?: string
          full_name: string
          id?: string
          role?: string
          slots_total?: number
        }
        Update: {
          avatar_tone?: string
          created_at?: string
          full_name?: string
          id?: string
          role?: string
          slots_total?: number
        }
        Relationships: []
      }
      products: {
        Row: {
          created_at: string
          id: string
          low_stock_threshold: number
          name: string
          price: number
          sku: string | null
          stock: number
        }
        Insert: {
          created_at?: string
          id?: string
          low_stock_threshold?: number
          name: string
          price?: number
          sku?: string | null
          stock?: number
        }
        Update: {
          created_at?: string
          id?: string
          low_stock_threshold?: number
          name?: string
          price?: number
          sku?: string | null
          stock?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          role: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          role?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string
        }
        Relationships: []
      }
      sales: {
        Row: {
          amount: number
          created_at: string
          customer_id: string | null
          description: string
          id: string
          product_id: string | null
          service_id: string | null
          sold_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          customer_id?: string | null
          description: string
          id?: string
          product_id?: string | null
          service_id?: string | null
          sold_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          customer_id?: string | null
          description?: string
          id?: string
          product_id?: string | null
          service_id?: string | null
          sold_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          base_price: number
          created_at: string
          fill_color: string
          id: string
          name: string
        }
        Insert: {
          base_price?: number
          created_at?: string
          fill_color?: string
          id?: string
          name: string
        }
        Update: {
          base_price?: number
          created_at?: string
          fill_color?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      public_submit_consultation: {
        Args: {
          p_areas?: string
          p_concern?: string
          p_email: string
          p_full_name: string
          p_location?: string
          p_notes?: string
          p_phone: string
          p_preferred_date?: string
          p_preferred_time?: string
          p_suggested_package?: string
        }
        Returns: string
      }
      upsert_customer_by_contact: {
        Args: {
          p_email?: string
          p_full_name: string
          p_notes?: string
          p_phone?: string
        }
        Returns: string
      }
    }
    Enums: {
      app_role: "admin" | "staff" | "manager" | "receptionist"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff", "manager", "receptionist"],
    },
  },
} as const
