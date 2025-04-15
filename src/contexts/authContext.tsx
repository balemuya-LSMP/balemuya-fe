import { useLogoutUserMutation } from '@/store/api/auth.api';
import { loginResponse, UserData } from '@/store/types';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: UserData | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (loginData: loginResponse) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [logoutUser] = useLogoutUserMutation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAccess = localStorage.getItem('access');
    const storedRefresh = localStorage.getItem('refresh');

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedAccess) setAccessToken(storedAccess);
    if (storedRefresh) setRefreshToken(storedRefresh);
  }, []);

  const login = (loginData: loginResponse) => {
    const { user } = loginData;
    const {access, refresh } = loginData.user;

    setUser(user);
    setAccessToken(access);
    setRefreshToken(refresh);

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);

    document.cookie = `access=${access}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
    document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
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
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');

      document.cookie = 'access=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

      window.location.href = '/auth/login';
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      accessToken,
      refreshToken,
      login,
      logout
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