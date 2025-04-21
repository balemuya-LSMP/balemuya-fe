/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLogoutUserMutation } from '@/store/api/auth.api';
import { loginResponse, UserData } from '@/store/types';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: UserData | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (loginData: loginResponse) => void;
  logout: () => Promise<void>;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [logoutUser] = useLogoutUserMutation();

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedAccess = localStorage.getItem('accessToken');
        const storedRefresh = localStorage.getItem('refreshToken');

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        if (storedAccess) {
          setAccessToken(storedAccess);
        }
        if (storedRefresh) {
          setRefreshToken(storedRefresh);
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  const login = (loginData: loginResponse) => {
    try {
      const { user } = loginData;
      const { access, refresh, ...userInfo } = user;
  
      setUser(userInfo as any); 
      setAccessToken(access);
      setRefreshToken(refresh);
  
      localStorage.setItem('user', JSON.stringify(userInfo));
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
  
      document.cookie = `accessToken=${access}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
      document.cookie = `user=${JSON.stringify(userInfo)}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  

  const logout = async () => {
    try {
      if (accessToken) {
        await logoutUser(accessToken).unwrap();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);

      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      accessToken,
      refreshToken,
      login,
      logout,
      isInitialized
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};