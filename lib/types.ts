import { User } from '@supabase/supabase-js';

export type SupabaseUser = User;

export type ApiError = {
  message: string;
  status?: number;
  details?: unknown;
};

export interface AuthError {
  message: string;
  status?: number;
}