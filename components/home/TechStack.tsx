"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

const technologies = [
  { name: "Java", color: "#ED8B00" },
  { name: "Spring Boot", color: "#6DB33F" },
  { name: "PostgreSQL", color: "#4169E1" },
  { name: "Docker", color: "#2496ED" },
  { name: "REST APIs", color: "#0000FF" },
  { name: "Git", color: "#F05032" },
  { name: "Maven", color: "#C71A36" },
  { name: "JUnit", color: "#25A162" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

function TechBadge({ name, color, index }: { name: string; color: string; index: number }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        scale: 1.08,
        y: -4,
        transition: { type: "spring", stiffness: 400, damping: 17 },
      }}
      className="group relative"
    >
      <motion.div
        className="absolute -inset-0.5 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-70"
        style={{ backgroundColor: color }}
      />
      <motion.span
        className="relative flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-2 text-xs font-medium transition-all duration-300 group-hover:border-transparent sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
        whileHover={{
          boxShadow: `0 0 20px ${color}30`,
        }}
      >
        <motion.span
          className="h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2"
          style={{ backgroundColor: color }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
        {name}
      </motion.span>
    </motion.div>
  );
}

export function TechStack() {
  const t = useTranslations("home");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative border-t border-border py-12 sm:py-20">
      <motion.div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </motion.div>

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10"
        >
          <motion.span
            className="mb-3 inline-block text-xs font-medium uppercase tracking-widest text-accent sm:mb-4 sm:text-sm"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.2em" } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tech Stack
          </motion.span>
          <motion.p
            className="text-xs text-muted sm:text-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t("techSection")}
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {technologies.map((tech, index) => (
            <TechBadge key={tech.name} name={tech.name} color={tech.color} index={index} />
          ))}
        </motion.div>

        <motion.div
          className="mt-8 flex items-center justify-center gap-4 text-muted/40 sm:mt-12 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
          <motion.span
            className="text-xs uppercase tracking-widest"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {t("alwaysLearning")}
          </motion.span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
        </motion.div>
      </div>
    </section>
  );
}
