"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-accent/20"
          initial={{
            x: `${15 + i * 15}%`,
            y: `${20 + (i % 3) * 25}%`,
            scale: 0.5 + (i % 3) * 0.3,
          }}
          animate={{
            y: [`${20 + (i % 3) * 25}%`, `${25 + (i % 3) * 25}%`, `${20 + (i % 3) * 25}%`],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowCursor(false), 1500);
      }
    }, 80);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="text-accent">
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="ml-0.5 inline-block h-[1em] w-[3px] translate-y-0.5 bg-accent"
        />
      )}
    </span>
  );
}

function ProfileImage() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
    >
      <motion.div
        className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-accent/40 via-accent/20 to-accent/40 blur-xl sm:-inset-4 sm:rounded-3xl"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <motion.div
        className="relative h-48 w-40 overflow-hidden rounded-2xl border-2 border-accent/30 sm:h-56 sm:w-48 md:h-64 md:w-56 sm:rounded-3xl"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Image
          src="/lucas.jpg"
          alt="Lucas Venancio"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
      <motion.div
        className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-accent text-white sm:h-12 sm:w-12"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 400 }}
      >
        <motion.span
          className="text-base sm:text-lg"
          animate={{
            rotate: [0, 14, -8, 14, -4, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut" as const,
          }}
          style={{ transformOrigin: "70% 70%" }}
        >
          👋
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent sm:h-12 sm:w-12"
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-accent/10"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.5, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}

export function HeroSection() {
  const t = useTranslations("home");
  const tSocial = useTranslations("social");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 800 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const backgroundX = useTransform(mouseX, [0, windowSize.width], [-20, 20]);
  const backgroundY = useTransform(mouseY, [0, windowSize.height], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20 sm:px-6 sm:pt-24">
      <FloatingParticles />
      
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{ x: backgroundX, y: backgroundY }}
      >
        <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-accent/10 blur-3xl sm:h-64 sm:w-64" />
        <div className="absolute bottom-1/4 right-1/4 h-24 w-24 rounded-full bg-accent/5 blur-3xl sm:h-48 sm:w-48" />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-3xl px-2 text-center sm:px-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-10 flex items-center justify-center">
          <ProfileImage />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mb-4 text-2xl font-bold tracking-tight sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl"
        >
          {t("greeting")}{" "}
          <span className="relative inline-block">
            <TypewriterText text={t("name")} />
            <motion.span
              className="absolute -bottom-2 left-0 h-1 rounded-full bg-gradient-to-r from-accent to-accent/50"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" as const }}
            />
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mb-8 max-w-xl px-2 text-base text-muted sm:mb-10 sm:px-0 sm:text-lg md:text-xl"
        >
          <motion.strong
            className="text-foreground"
            initial={{ backgroundSize: "0% 2px" }}
            animate={{ backgroundSize: "100% 2px" }}
            transition={{ delay: 1.5, duration: 0.8 }}
            style={{
              backgroundImage: "linear-gradient(to right, var(--accent), var(--accent))",
              backgroundPosition: "0 100%",
              backgroundRepeat: "no-repeat",
            }}
          >
            {t("role")}
          </motion.strong>{" "}
          {t("description")}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mb-8 flex flex-col items-center justify-center gap-3 px-2 sm:mb-14 sm:flex-row sm:gap-4 sm:px-0"
        >
          <Link href="/projects" className="w-full sm:w-auto">
            <motion.button
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white sm:w-auto sm:px-7 sm:py-3.5"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative">{t("viewProjects")}</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <motion.button
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-border bg-transparent px-5 py-2.5 text-sm font-medium sm:w-auto sm:px-7 sm:py-3.5"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="absolute inset-0 bg-accent/5"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative">{t("contactMe")}</span>
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4 pb-12 sm:gap-5 sm:pb-8"
        >
          <MagneticButton href="https://github.com/WebLucasDev">
            <Github className="h-5 w-5" aria-label={tSocial("github")} />
          </MagneticButton>
          <MagneticButton href="https://www.linkedin.com/in/lucasvenancio-dev/">
            <Linkedin className="h-5 w-5" aria-label={tSocial("linkedin")} />
          </MagneticButton>
          <MagneticButton href="https://www.instagram.com/luca1_venancio/">
            <Instagram className="h-5 w-5" aria-label={tSocial("instagram")} />
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
