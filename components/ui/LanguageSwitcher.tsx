"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { locales, localeNames, localeFlags, type Locale } from "@/i18n/config";
import { setLocaleCookie } from "@/lib/actions";

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const currentLocale = useLocale() as Locale;
  const t = useTranslations("language");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocaleChange = async (locale: Locale) => {
    await setLocaleCookie(locale);
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 items-center gap-2 rounded-md border border-border bg-transparent px-3 transition-colors hover:bg-muted/20"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={t("select")}
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4 text-foreground" />
        <span className="text-sm font-medium">{localeFlags[currentLocale]}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden rounded-lg border border-border bg-background shadow-lg"
          >
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLocaleChange(locale)}
                className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted/20"
              >
                <span className="flex items-center gap-2">
                  <span>{localeFlags[locale]}</span>
                  <span>{localeNames[locale]}</span>
                </span>
                {currentLocale === locale && (
                  <Check className="h-4 w-4 text-accent" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
