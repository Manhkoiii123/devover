'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { useCurrentUser, AUTH_QUERY_KEYS } from '@common/api/endpoints';
import { useQueryClient } from '@tanstack/react-query';
import type { AuthUser } from '@common/types/auth/auth.type';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: AuthUser | null | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  refetch: () => void;
  invalidateUser: () => void;
  clearUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();
  const [hasToken, setHasToken] = useState<boolean>(false);

  useEffect(() => {
    const checkToken = () => {
      const token = Cookies.get('accessToken');
      const tokenExists = !!token;

      if (hasToken && !tokenExists) {
        queryClient.setQueryData(AUTH_QUERY_KEYS.currentUser, null);
        queryClient.removeQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });
      }

      setHasToken(tokenExists);
    };

    checkToken();

    const interval = setInterval(checkToken, 500);
    return () => clearInterval(interval);
  }, [hasToken, queryClient]);

  const {
    data: user,
    isLoading,
    refetch,
  } = useCurrentUser({
    enabled: hasToken,
  });

  const invalidateUser = () => {
    queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });
  };

  const clearUser = () => {
    queryClient.setQueryData(AUTH_QUERY_KEYS.currentUser, null);
    queryClient.removeQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });
    setHasToken(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        refetch,
        invalidateUser,
        clearUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
