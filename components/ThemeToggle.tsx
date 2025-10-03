import React, { createContext, useState, useEffect } from "react";
import { Theme } from "../types";

export const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | null>(null);

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT); // ✅ Default LIGHT

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };

  // (Optional) If you’re storing theme in localStorage for persistence:
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme.toLowerCase());
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* your app components */}
    </ThemeContext.Provider>
  );
};

export default App;
