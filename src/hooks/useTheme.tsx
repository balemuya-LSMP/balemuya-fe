"use client";
import { createContext, useState, useContext, useEffect } from "react";

type ThemeContextType = {
  currentTheme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<string>("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("themeMode") ?? "light";
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("themeMode", currentTheme);
    }
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeToggle = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeToggle must be used within a ThemeProvider");
  return context;
};
