'use client';

import { useEffect, useState } from "react";

const useThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return { currentTheme, toggleTheme };
};

export default useThemeToggle;
