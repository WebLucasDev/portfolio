"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.add("light");
      setIsDark(false);
    }
  }, []);

  if (!mounted) {
    return (
      <button
        className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-transparent"
        aria-label="Alternar tema"
      >
        <div className="h-4 w-4" />
      </button>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-transparent transition-colors hover:bg-muted/20"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-foreground" />
        ) : (
          <Sun className="h-4 w-4 text-foreground" />
        )}
      </motion.div>
    </motion.button>
  );
}
