// Mock authentication for MVP
// This will be replaced with Supabase authentication

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'employee' | 'client';
  avatar?: string;
}

export interface AuthContext {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Mock user data for development
export const MOCK_USERS = {
  admin: {
    id: '1',
    email: 'admin@agostini.com',
    name: 'Administrador',
    role: 'admin' as const,
    avatar: '👨‍💼',
  },
  employee: {
    id: '2',
    email: 'funcionario@agostini.com',
    name: 'João Silva',
    role: 'employee' as const,
    avatar: '👨‍🔧',
  },
  client: {
    id: '3',
    email: 'cliente@airbnb.com',
    name: 'Maria Santos',
    role: 'client' as const,
    avatar: '👩‍💼',
  },
};

// Get current user from localStorage (mock)
export const getCurrentUser = (): AuthUser | null => {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem('currentUser');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
};

// Set current user to localStorage (mock)
export const setCurrentUser = (user: AuthUser): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('currentUser', JSON.stringify(user));
};

// Logout (mock)
export const logout = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('currentUser');
};
