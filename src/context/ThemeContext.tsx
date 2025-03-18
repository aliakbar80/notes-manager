import Navbar from "@/components/layout/Navbar";
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";

interface ThemeContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>("light"); // Default theme

  // Initialize theme from localStorage on client side
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  // Update theme in localStorage and set theme to document body
  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Navbar theme={theme} setTheme={setTheme} />
      {children}
    </ThemeContext.Provider>
  );
};