"use client";

import { motion, useInView } from "framer-motion";
import { 
  Mail, 
  MessageCircle, 
  Github, 
  Linkedin, 
  MapPin, 
  Send,
  Sparkles,
  CheckCircle,
  Briefcase,
  Instagram
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

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
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-accent/20"
          initial={{
            x: `${15 + i * 18}%`,
            y: `${20 + (i % 3) * 25}%`,
            scale: 0.5 + (i % 3) * 0.3,
          }}
          animate={{
            y: [`${20 + (i % 3) * 25}%`, `${25 + (i % 3) * 25}%`, `${20 + (i % 3) * 25}%`],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  href: string;
  color: string;
  delay?: number;
}

function ContactCard({ icon, title, description, action, href, color, delay = 0 }: ContactCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" as const }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background/50 p-6 backdrop-blur-sm transition-colors hover:border-accent/50"
    >
      <motion.div
        className="absolute -inset-px rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
        style={{ background: `linear-gradient(135deg, ${color}10, transparent)` }}
      />
      
      <div className="relative">
        <motion.div
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${color}15` }}
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ color }}>{icon}</div>
        </motion.div>

        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="mb-4 text-sm text-muted">{description}</p>

        <div className="flex items-center gap-2 text-sm font-medium" style={{ color }}>
          {action}
          <motion.span
            className="inline-block"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: [
            `0 0 0 0 ${color}00`,
            `0 0 20px 2px ${color}20`,
            `0 0 0 0 ${color}00`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, delay: delay * 2 }}
      />
    </motion.a>
  );
}

interface SocialButtonProps {
  icon: React.ReactNode;
  href: string;
  label: string;
  delay?: number;
}

function SocialButton({ icon, href, label, delay = 0 }: SocialButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.95 }}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/50 text-muted backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
      aria-label={label}
    >
      {icon}
    </motion.a>
  );
}

interface InfoBadgeProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  delay?: number;
}

function InfoBadge({ icon, title, value, delay = 0 }: InfoBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/30 px-4 py-3 backdrop-blur-sm"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted">{title}</p>
        <p className="text-xs font-medium">{value}</p>
      </div>
    </motion.div>
  );
}

function ContactForm() {
  const t = useTranslations("contact.form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          {t("name")}
        </label>
        <motion.input
          type="text"
          id="name"
          name="name"
          placeholder={t("namePlaceholder")}
          required
          whileFocus={{ scale: 1.01 }}
          className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm backdrop-blur-sm transition-colors placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          {t("email")}
        </label>
        <motion.input
          type="email"
          id="email"
          name="email"
          placeholder={t("emailPlaceholder")}
          required
          whileFocus={{ scale: 1.01 }}
          className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm backdrop-blur-sm transition-colors placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          {t("message")}
        </label>
        <motion.textarea
          id="message"
          name="message"
          rows={4}
          placeholder={t("messagePlaceholder")}
          required
          whileFocus={{ scale: 1.01 }}
          className="w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-3 text-sm backdrop-blur-sm transition-colors placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting || isSuccess}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-accent px-6 py-3 text-sm font-medium text-white disabled:opacity-70"
      >
        {isSuccess ? (
          <>
            <CheckCircle className="h-4 w-4" />
            {t("success")}
          </>
        ) : isSubmitting ? (
          <>
            <motion.div
              className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            {t("sending")}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {t("send")}
          </>
        )}

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.5 }}
        />
      </motion.button>
    </motion.form>
  );
}

export function ContactSection() {
  const t = useTranslations("contact");
  const tSocial = useTranslations("social");

  return (
    <section className="relative min-h-screen px-4 pb-20 pt-24 sm:px-6 sm:pt-32">
      <FloatingParticles />

      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-1/4 top-1/4 h-48 w-48 rounded-full bg-accent/10 blur-3xl sm:h-64 sm:w-64" />
        <div className="absolute bottom-1/4 right-1/4 h-32 w-32 rounded-full bg-accent/5 blur-3xl sm:h-48 sm:w-48" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-12 text-center sm:mb-16">
          <motion.span
            className="mb-3 inline-block text-xs font-medium uppercase tracking-widest text-accent sm:mb-4 sm:text-sm"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("title")}
          </motion.span>
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t("subtitle")}
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-muted sm:text-base">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div variants={itemVariants}>
            <ContactCard
              icon={<MessageCircle className="h-6 w-6" />}
              title={t("whatsapp.title")}
              description={t("whatsapp.description")}
              action={t("whatsapp.action")}
              href="https://wa.me/5534997790054"
              color="#25D366"
              delay={0.2}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <div className="rounded-2xl border border-border bg-background/50 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
                {t("social.title")}
              </h3>
              <div className="flex gap-3">
                <SocialButton
                  icon={<Github className="h-5 w-5" />}
                  href="https://github.com/WebLucasDev"
                  label={tSocial("github")}
                  delay={0.3}
                />
                <SocialButton
                  icon={<Linkedin className="h-5 w-5" />}
                  href="https://www.linkedin.com/in/lucasvenancio-dev/"
                  label={tSocial("linkedin")}
                  delay={0.4}
                />
                <SocialButton
                  icon={<Instagram className="h-5 w-5" />}
                  href="https://www.instagram.com/luca1_venancio/"
                  label={tSocial("instagram")}
                  delay={0.5}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <InfoBadge
                icon={<MapPin className="h-5 w-5" />}
                title={t("location.title")}
                value={t("location.city")}
                delay={0.5}
              />

              <InfoBadge
                icon={<Briefcase className="h-5 w-5" />}
                title={t("freelancer.title")}
                value={t("freelancer.status")}
                delay={0.6}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mx-auto mt-6 max-w-2xl rounded-2xl border border-border bg-background/50 p-6 backdrop-blur-sm"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-5 w-5" />
            </motion.div>
            <h2 className="text-lg font-semibold">{t("form.title")}</h2>
          </div>
          <ContactForm />
        </motion.div>
      </motion.div>
    </section>
  );
}
