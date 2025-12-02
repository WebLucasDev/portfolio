"use client";

import { motion, useMotionValue, useSpring, PanInfo, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronLeft, ChevronRight, GripHorizontal, X, Check, Terminal, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

interface ProjectReadme {
  about: string;
  features: string[];
  installation: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  github: string;
  demo: string;
  image: string;
  technologies: string[];
  readme: ProjectReadme;
}

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
            x: `${10 + i * 20}%`,
            y: `${10 + (i % 3) * 30}%`,
            scale: 0.5 + (i % 3) * 0.3,
          }}
          animate={{
            y: [`${10 + (i % 3) * 30}%`, `${15 + (i % 3) * 30}%`, `${10 + (i % 3) * 30}%`],
            opacity: [0.2, 0.4, 0.2],
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

interface ProjectCardProps {
  project: Project;
  index: number;
  activeIndex: number;
  totalProjects: number;
  viewCodeText: string;
  liveDemoText: string;
  onCardClick: (project: Project) => void;
}

function ProjectCard({ project, index, activeIndex, totalProjects, viewCodeText, liveDemoText, onCardClick }: ProjectCardProps) {
  const offset = index - activeIndex;
  const absOffset = Math.abs(offset);
  const isActive = offset === 0;

  const zIndex = totalProjects - absOffset;
  const scale = 1 - absOffset * 0.15;
  const translateX = offset * 60;
  const translateZ = -absOffset * 150;
  const rotateY = offset * -15;
  const opacity = 1 - absOffset * 0.3;

  const handleClick = (e: React.MouseEvent) => {
    if (isActive) {
      e.stopPropagation();
      onCardClick(project);
    }
  };

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      animate={{
        x: `calc(-50% + ${translateX}%)`,
        y: "-50%",
        z: translateZ,
        scale: Math.max(scale, 0.6),
        rotateY: rotateY,
        opacity: Math.max(opacity, 0.3),
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{
        zIndex,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      <motion.div
        onClick={handleClick}
        className={`group relative w-[260px] overflow-hidden rounded-2xl border bg-background/80 backdrop-blur-sm transition-colors sm:w-[320px] md:w-[380px] ${
          isActive ? "cursor-pointer border-accent/50 shadow-lg shadow-accent/10" : "border-border/50"
        }`}
        whileHover={isActive ? { scale: 1.02, y: -5 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="relative aspect-video w-full overflow-hidden bg-accent/5">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent"
              animate={isActive ? {
                scale: [1, 1.1, 1],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Github className="h-8 w-8" />
            </motion.div>
          </div>
          {isActive && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
          )}
        </div>

        <div className="p-4 sm:p-5">
          <h3 className="mb-2 text-base font-bold sm:text-lg">{project.title}</h3>
          <p className="mb-4 line-clamp-2 text-xs text-muted sm:text-sm">{project.description}</p>

          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border/50 bg-background px-2 py-0.5 text-[10px] font-medium sm:text-xs"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-medium text-white sm:text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {viewCodeText}
            </motion.a>
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium sm:text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {liveDemoText}
              </motion.a>
            )}
          </div>
        </div>

        {isActive && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(0,0,255,0)",
                "0 0 30px 2px rgba(0,0,255,0.1)",
                "0 0 0 0 rgba(0,0,255,0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
  activeIndex: number;
  totalProjects: number;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  featuresText: string;
  installationText: string;
  closeText: string;
  viewCodeText: string;
}

function ProjectModal({ project, onClose, featuresText, installationText, closeText, viewCodeText }: ProjectModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden"
        style={{ perspective: 1200 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-accent/30 bg-background/95 shadow-2xl shadow-accent/20 backdrop-blur-xl"
          initial={{ 
            opacity: 0, 
            scale: 0.8, 
            rotateX: 25,
            rotateY: -15,
            z: -200
          }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotateX: 0,
            rotateY: 0,
            z: 0
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.8, 
            rotateX: -25,
            rotateY: 15,
            z: -200
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25,
            mass: 0.8
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-3xl"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(0,0,255,0)",
                "0 0 60px 4px rgba(0,0,255,0.15)",
                "0 0 0 0 rgba(0,0,255,0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="relative border-b border-border/50 bg-accent/5 p-4 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent"
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <FileText className="h-6 w-6" />
                </motion.div>
                <div>
                  <motion.h2 
                    className="text-xl font-bold sm:text-2xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {project.title}
                  </motion.h2>
                  <motion.p
                    className="text-sm text-muted"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    README.md
                  </motion.p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/50 text-muted transition-colors hover:border-accent hover:text-accent"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                aria-label={closeText}
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            <motion.div
              className="mt-4 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {project.technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="leading-relaxed text-muted">{project.readme.about}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/10 text-accent">
                    <Check className="h-4 w-4" />
                  </span>
                  {featuresText}
                </h3>
                <ul className="space-y-2">
                  {project.readme.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/10 text-accent">
                    <Terminal className="h-4 w-4" />
                  </span>
                  {installationText}
                </h3>
                <div className="overflow-hidden rounded-xl border border-border bg-black/90 p-4">
                  <code className="text-sm text-green-400">
                    <span className="text-muted">$</span> {project.readme.installation}
                  </code>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="border-t border-border/50 bg-accent/5 p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-medium text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="h-4 w-4" />
                {viewCodeText}
              </motion.a>
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="h-4 w-4" />
                  Demo
                </motion.a>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function CarouselControls({ onPrev, onNext, activeIndex, totalProjects }: CarouselControlsProps) {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <motion.button
        onClick={onPrev}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/50 text-muted backdrop-blur-sm transition-colors hover:border-accent hover:text-accent sm:h-12 sm:w-12"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Previous project"
      >
        <ChevronLeft className="h-5 w-5" />
      </motion.button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalProjects }).map((_, i) => (
          <motion.div
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === activeIndex ? "w-6 bg-accent" : "w-2 bg-border"
            }`}
            animate={i === activeIndex ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      <motion.button
        onClick={onNext}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/50 text-muted backdrop-blur-sm transition-colors hover:border-accent hover:text-accent sm:h-12 sm:w-12"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Next project"
      >
        <ChevronRight className="h-5 w-5" />
      </motion.button>
    </div>
  );
}

export function ProjectsSection() {
  const t = useTranslations("projects");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = t.raw("items") as Project[];
  const dragX = useMotionValue(0);
  const dragXSpring = useSpring(dragX, { stiffness: 300, damping: 30 });

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 50;
    if (info.offset.x > threshold) {
      handlePrev();
    } else if (info.offset.x < -threshold) {
      handleNext();
    }
    dragX.set(0);
  };

  const handleCardClick = (project: Project) => {
    if (!isDragging) {
      setSelectedProject(project);
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  return (
    <section className="relative min-h-screen overflow-hidden px-4 pb-20 pt-24 sm:px-6 sm:pt-32">
      <FloatingParticles />

      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-1/4 top-1/4 h-48 w-48 rounded-full bg-accent/10 blur-3xl sm:h-64 sm:w-64" />
        <div className="absolute bottom-1/4 right-1/4 h-32 w-32 rounded-full bg-accent/5 blur-3xl sm:h-48 sm:w-48" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-6xl"
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
          <h1 className="mb-3 text-3xl font-bold tracking-tight sm:mb-4 sm:text-4xl md:text-5xl">
            {t("subtitle")}
          </h1>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative mx-auto h-[380px] w-full max-w-4xl sm:h-[450px] md:h-[500px]"
          style={{ perspective: 1200, perspectiveOrigin: "center center" }}
        >
          <motion.div
            className="relative h-full w-full cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            style={{ x: dragXSpring }}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                activeIndex={activeIndex}
                totalProjects={projects.length}
                viewCodeText={t("viewCode")}
                liveDemoText={t("liveDemo")}
                onCardClick={handleCardClick}
              />
            ))}
          </motion.div>

          <motion.div
            className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 text-xs text-muted sm:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <GripHorizontal className="h-4 w-4" />
            {t("dragHint")}
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <CarouselControls
            onPrev={handlePrev}
            onNext={handleNext}
            activeIndex={activeIndex}
            totalProjects={projects.length}
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12 flex justify-center sm:mt-16"
        >
          <motion.a
            href="https://github.com/WebLucasDev"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full border border-border bg-background/50 px-5 py-2.5 text-sm font-medium backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Github className="h-4 w-4" />
            <span>github.com/WebLucasDev</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-50 transition-opacity group-hover:opacity-100" />
          </motion.a>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={handleCloseModal}
            featuresText={t("features")}
            installationText={t("installation")}
            closeText={t("close")}
            viewCodeText={t("viewCode")}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
