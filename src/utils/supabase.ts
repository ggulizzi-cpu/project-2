import { createClient } from '@supabase/supabase-js';

// For demo purposes, we'll use mock authentication
const mockAuth = {
  user: null,
  async signIn() { return { error: null }; },
  async signUp() { return { error: null }; },
  async signOut() { return { error: null }; },
  onAuthStateChange() {
    return {
      data: {
        subscription: {
          unsubscribe: () => {}
        }
      }
    };
  },
  async getSession() {
    return { data: { session: null } };
  }
};

export const supabase = {
  auth: mockAuth
};