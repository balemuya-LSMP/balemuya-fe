import {loginResponse, UserResponse } from '@/store/types';
import React, { createContext, useContext, useState } from 'react';

// Define context types
interface AuthContextType {
  user: UserResponse | null;
  login: (userData: loginResponse) => void; 
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null); 

  const login = (loginData: loginResponse) => { 
    setUser(loginData.user); 
    localStorage.setItem('user', JSON.stringify(loginData.user)); 
    localStorage.setItem('access', loginData.access); 
    localStorage.setItem('refresh', loginData.refresh); // Optionally store refresh token as well
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
