"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { AuthProvider } from "@/contexts/authContext";
import { WebSocketProvider } from "./WebSocketProvider";
import useThemeToggle from "@/hooks/useTheme";
import { lightTheme, darkTheme } from "@/shared/theme";
import { ThemeProvider } from "@mui/material";
import { useEffect } from "react";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentTheme } = useThemeToggle();

  const theme = currentTheme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    
  }, [currentTheme]);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AuthProvider>
          <WebSocketProvider>
            {children}
          </WebSocketProvider>
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  );
}
