import { useLogoutUserMutation } from '@/store/api/auth.api';
import { loginResponse, UserResponse } from '@/store/types';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define context types
interface AuthContextType {
  user: UserResponse | null;  // This will store the full user profile info
  login: (loginData: loginResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null); 
  const [logoutUser] = useLogoutUserMutation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (loginData: loginResponse) => { 
    console.log("Login Data:", loginData);

    const { access, refresh} = loginData.user;
    setUser(user); 
    localStorage.setItem('user', JSON.stringify(user));  
    localStorage.setItem('access', access); 
    localStorage.setItem('refresh',refresh); 
  };

  const logout = async() => {
    try {
      const accessToken = localStorage.getItem('access');
      if (accessToken) {
        await logoutUser(accessToken);
      }
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');

      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
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
