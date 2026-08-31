import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

type User = { id: string; name: string; email: string };

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Simulates network latency so loading states look real during dev.
const fakeDelay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (name: string, email: string, _password: string) => {
    setIsLoading(true);
    await fakeDelay();
    // TODO: replace with a real backend call (Supabase auth.signUp, etc.)
    setUser({ id: 'local-user', name, email });
    setIsLoading(false);
  };

  const logIn = async (email: string, _password: string) => {
    setIsLoading(true);
    await fakeDelay();
    // TODO: replace with a real backend call (Supabase auth.signInWithPassword, etc.)
    setUser({ id: 'local-user', name: email.split('@')[0], email });
    setIsLoading(false);
  };

  const logOut = () => setUser(null);

  const value = useMemo(() => ({ user, isLoading, signUp, logIn, logOut }), [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
