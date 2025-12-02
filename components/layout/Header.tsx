"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

interface NavItem {
  labelKey: "home" | "about" | "projects" | "contact";
  href: string;
}

const navItems: NavItem[] = [
  { labelKey: "home", href: "/" },
  { labelKey: "about", href: "/about" },
  { labelKey: "projects", href: "/projects" },
  { labelKey: "contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const t = useTranslations("navigation");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="group" onClick={closeMobileMenu}>
            <motion.span
              className="text-xl font-bold tracking-tight"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Lucas<span className="text-accent">.</span>
            </motion.span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={t(item.labelKey)}
                isActive={pathname === item.href}
              />
            ))}
            <div className="ml-4 flex items-center gap-2 border-l border-border pl-4">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <ThemeToggle />
            <motion.button
              onClick={toggleMobileMenu}
              className="flex h-10 w-10 items-center justify-center rounded-md text-foreground"
              whileTap={{ scale: 0.95 }}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 border-b border-border bg-background/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col p-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <MobileNavLink
                    href={item.href}
                    label={t(item.labelKey)}
                    isActive={pathname === item.href}
                    onClick={closeMobileMenu}
                  />
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
}

function NavLink({ href, label, isActive }: NavLinkProps) {
  return (
    <Link href={href} className="relative px-4 py-2">
      <span
        className={clsx(
          "relative z-10 text-sm font-medium transition-colors duration-200",
          isActive ? "text-accent" : "text-muted hover:text-foreground"
        )}
      >
        {label}
      </span>
      {isActive && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute inset-0 rounded-md bg-accent/10"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      <motion.div
        className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-accent"
        whileHover={{ width: "60%" }}
        transition={{ duration: 0.2 }}
      />
    </Link>
  );
}

interface MobileNavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function MobileNavLink({ href, label, isActive, onClick }: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors",
        isActive
          ? "bg-accent/10 text-accent"
          : "text-muted hover:bg-accent/5 hover:text-foreground"
      )}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="mobile-indicator"
          className="ml-auto h-2 w-2 rounded-full bg-accent"
        />
      )}
    </Link>
  );
}
