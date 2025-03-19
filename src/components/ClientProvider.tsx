"use client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { AuthProvider } from "@/contexts/authContext";
import { WebSocketProvider } from "./WebSocketProvider";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "@/shared/theme";
import { ThemeProvider, useThemeToggle } from "@/hooks/useTheme"; // Import custom theme provider

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider> {/* Custom Theme Provider */}
      <InnerProvider>{children}</InnerProvider>
    </ThemeProvider>
  );
}

function InnerProvider({ children }: { children: React.ReactNode }) {
  const { currentTheme } = useThemeToggle();
  const theme = currentTheme === "light" ? lightTheme : darkTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <AuthProvider>
          <WebSocketProvider>
            {children}
          </WebSocketProvider>
        </AuthProvider>
      </Provider>
    </MuiThemeProvider>
  );
}
