"use client"
import { ThemeProvider } from "@/context/ThemeContext";

function MainLayout({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

export default MainLayout;
