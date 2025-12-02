"use client";

import { motion, useInView } from "framer-motion";
import { GraduationCap, Award, BookOpen, Briefcase, Download, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRef } from "react";

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
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-accent/20"
          initial={{
            x: `${20 + i * 20}%`,
            y: `${15 + (i % 2) * 30}%`,
            scale: 0.5 + (i % 3) * 0.3,
          }}
          animate={{
            y: [`${15 + (i % 2) * 30}%`, `${20 + (i % 2) * 30}%`, `${15 + (i % 2) * 30}%`],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}

function ProfileCard() {
  const t = useTranslations("about");

  return (
    <motion.div
      variants={itemVariants}
      className="relative flex flex-col items-center gap-5 rounded-2xl border border-border bg-background/50 p-4 backdrop-blur-sm sm:flex-row sm:items-start sm:gap-8 sm:p-8"
    >
      <motion.div
        className="relative shrink-0"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-accent/30 via-accent/10 to-accent/30 blur-lg sm:-inset-3"
          animate={{
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="relative h-32 w-28 overflow-hidden rounded-xl border-2 border-accent/20 sm:h-40 sm:w-36">
          <Image
            src="/lucas.jpg"
            alt="Lucas Venancio"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
        <motion.div
          className="mb-2 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 sm:mb-3 sm:px-3"
          animate={{
            boxShadow: ["0 0 0 0 rgba(0,0,255,0)", "0 0 0 4px rgba(0,0,255,0.1)", "0 0 0 0 rgba(0,0,255,0)"],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent sm:h-2 sm:w-2" />
          <span className="text-[10px] font-medium text-accent sm:text-xs">{t("experience.years")} {t("experience.description")}</span>
        </motion.div>

        <h2 className="mb-2 text-lg font-bold sm:text-2xl">Lucas Venancio</h2>
        <p className="mb-4 max-w-md text-xs text-muted sm:text-base">
          <strong className="text-foreground">{t("intro")}</strong> {t("introDescription")}
        </p>

        <div className="flex flex-wrap justify-center gap-2 sm:justify-start sm:gap-3">
          <motion.a
            href="/cv-lucas-venancio.pdf"
            download
            className="group flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-white sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            {t("downloadCV")}
          </motion.a>
          <Link href="/contact">
            <motion.button
              className="group flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {t("contactMe")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

function SectionCard({ icon, title, children, delay = 0 }: SectionCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" as const }}
      className="group relative rounded-2xl border border-border bg-background/50 p-6 backdrop-blur-sm transition-colors hover:border-accent/30"
    >
      <motion.div
        className="absolute -inset-px rounded-2xl bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 transition-opacity group-hover:opacity-100"
      />
      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
            {icon}
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        {children}
      </div>
    </motion.div>
  );
}

interface EducationItemProps {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

function EducationItem({ degree, institution, period, description }: EducationItemProps) {
  return (
    <motion.div
      className="relative border-l-2 border-accent/30 pl-4"
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-accent" />
      <h4 className="font-medium">{degree}</h4>
      <p className="text-sm text-accent">{institution}</p>
      <p className="mb-2 text-xs text-muted">{period}</p>
      <p className="text-sm text-muted">{description}</p>
    </motion.div>
  );
}

interface CertificationItemProps {
  name: string;
  issuer: string;
  year: string;
  index: number;
}

function CertificationItem({ name, issuer, year, index }: CertificationItemProps) {
  return (
    <motion.div
      className="group/item flex items-start gap-3 rounded-lg border border-border/50 bg-background/30 p-3 transition-colors hover:border-accent/30"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 4 }}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Award className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-medium leading-tight">{name}</h4>
        <p className="text-xs text-muted">
          {issuer} • {year}
        </p>
      </div>
    </motion.div>
  );
}

interface CourseItemProps {
  name: string;
  platform: string;
  hours: string;
  index: number;
}

function CourseItem({ name, platform, hours, index }: CourseItemProps) {
  return (
    <motion.div
      className="flex items-center justify-between gap-4 rounded-lg border border-border/50 bg-background/30 p-3 transition-colors hover:border-accent/30"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 4 }}
    >
      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-medium leading-tight">{name}</h4>
        <p className="text-xs text-muted">{platform}</p>
      </div>
      <span className="shrink-0 rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
        {hours}
      </span>
    </motion.div>
  );
}

export function AboutSection() {
  const t = useTranslations("about");

  const educationItems = t.raw("education.items") as EducationItemProps[];
  const certificationItems = t.raw("certifications.items") as Array<{
    name: string;
    issuer: string;
    year: string;
  }>;
  const courseItems = t.raw("courses.items") as Array<{
    name: string;
    platform: string;
    hours: string;
  }>;

  return (
    <section className="relative min-h-screen px-4 pb-20 pt-24 sm:px-6 sm:pt-32">
      <FloatingParticles />

      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-1/4 top-1/4 h-48 w-48 rounded-full bg-accent/10 blur-3xl sm:h-64 sm:w-64" />
        <div className="absolute bottom-1/4 right-1/4 h-32 w-32 rounded-full bg-accent/5 blur-3xl sm:h-48 sm:w-48" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8 text-center sm:mb-12">
          <motion.span
            className="mb-3 inline-block text-xs font-medium uppercase tracking-widest text-accent sm:mb-4 sm:text-sm"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("title")}
          </motion.span>
          <h1 className="mb-3 text-3xl font-bold tracking-tight sm:mb-4 sm:text-4xl md:text-5xl">
            {t("subtitle")}
          </h1>
        </motion.div>

        <ProfileCard />

        <div className="mt-8 grid gap-6 sm:mt-12 md:grid-cols-2">
          <SectionCard
            icon={<GraduationCap className="h-5 w-5" />}
            title={t("education.title")}
            delay={0.1}
          >
            <div className="space-y-4">
              {educationItems.map((item, index) => (
                <EducationItem
                  key={index}
                  degree={item.degree}
                  institution={item.institution}
                  period={item.period}
                  description={item.description}
                />
              ))}
            </div>
          </SectionCard>

          <SectionCard
            icon={<Award className="h-5 w-5" />}
            title={t("certifications.title")}
            delay={0.2}
          >
            <div className="space-y-3">
              {certificationItems.map((item, index) => (
                <CertificationItem
                  key={index}
                  name={item.name}
                  issuer={item.issuer}
                  year={item.year}
                  index={index}
                />
              ))}
            </div>
          </SectionCard>

          <SectionCard
            icon={<BookOpen className="h-5 w-5" />}
            title={t("courses.title")}
            delay={0.3}
          >
            <div className="space-y-3">
              {courseItems.map((item, index) => (
                <CourseItem
                  key={index}
                  name={item.name}
                  platform={item.platform}
                  hours={item.hours}
                  index={index}
                />
              ))}
            </div>
          </SectionCard>

          <SectionCard
            icon={<Briefcase className="h-5 w-5" />}
            title={t("experience.title")}
            delay={0.4}
          >
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <motion.div
                className="mb-4 text-5xl font-bold text-accent"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
              >
                {t("experience.years")}
              </motion.div>
              <p className="text-sm text-muted">{t("experience.description")}</p>
              <motion.div
                className="mt-4 flex gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {["Java", "Spring", "REST", "SQL"].map((tech, index) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>
          </SectionCard>
        </div>
      </motion.div>
    </section>
  );
}
