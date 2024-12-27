import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { AuthUser } from '../types';

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      set({ 
        user: session?.user ? {
          id: session.user.id,
          email: session.user.email!
        } : null,
        loading: false 
      });

      // Set up auth state change listener
      supabase.auth.onAuthStateChange((_event, session) => {
        set({ 
          user: session?.user ? {
            id: session.user.id,
            email: session.user.email!
          } : null 
        });
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ loading: false });
    }
  },
  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  },
  signUp: async (email, password) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null });
  },
}));