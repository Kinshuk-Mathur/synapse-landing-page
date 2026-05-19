"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Chrome,
  Cpu,
  FileText,
  GitBranch,
  Instagram,
  ListChecks,
  Lock,
  Mail,
  Palette,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
  Zap
} from "lucide-react";

const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false
});

type IconComponent = React.ComponentType<{ className?: string }>;

function useCanRenderHeroScene(shouldReduceMotion: boolean | null) {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCanRender(false);
      return undefined;
    }

    const query = window.matchMedia("(min-width: 760px) and (pointer: fine)");
    const update = () => setCanRender(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [shouldReduceMotion]);

  return canRender;
}

const showcases = [
  {
    eyebrow: "Dashboard",
    title: "A command center for every study decision.",
    copy:
      "Live focus metrics, goals, pending work, distractions, and SYNAPSE AI stay connected in one obsidian cockpit.",
    image: "/assets/dashboard.png",
    alt: "SYNAPSE dashboard with analytics and AI assistant",
    accent: "sky",
    stats: ["4h 32m focus", "87% score", "24 blocked"]
  },
  {
    eyebrow: "Todo",
    title: "Tasks that stay visible until the work is done.",
    copy:
      "Calendar planning, priorities, day lock, streaks, and quick capture turn a messy study day into a focused sequence.",
    image: "/assets/todo.png",
    alt: "SYNAPSE todo page with calendar and tasks",
    accent: "gold",
    stats: ["5 tasks", "12 day streak", "0% drift"]
  },
  {
    eyebrow: "Goals",
    title: "Monthly ambition with measurable momentum.",
    copy:
      "Track every goal, progress curve, deadline, category, and streak with the same system that guides daily execution.",
    image: "/assets/goals.png",
    alt: "SYNAPSE goals page with monthly goal tracking",
    accent: "pink",
    stats: ["26% complete", "4 goals", "12 day streak"]
  },
  {
    eyebrow: "SYNAPSE AI",
    title: "A study copilot that understands school context.",
    copy:
      "Ask for plans, explain concepts, summarize PDFs, solve doubts, and route prompts through the right AI mode.",
    image: "/assets/synapse-ai-solve.jpeg",
    alt: "SYNAPSE AI solving a math equation step by step",
    accent: "purple",
    stats: ["study plans", "PDF summaries", "doubt solving"]
  }
];

const features: Array<{
  title: string;
  copy: string;
  icon: IconComponent;
}> = [
  {
    title: "AI Study Assistant",
    copy: "Turns questions, chapters, and messy prompts into clear study actions.",
    icon: BrainCircuit
  },
  {
    title: "Smart Todo System",
    copy: "Daily tasks, priorities, lock-in windows, and carryovers for real follow-through.",
    icon: ListChecks
  },
  {
    title: "Monthly Goals Tracking",
    copy: "Progress rings, trend cards, categories, deadlines, and consistency streaks.",
    icon: Target
  },
  {
    title: "FocusLock Extension",
    copy: "Blocks distractions at the browser layer and feeds focus data back into SYNAPSE.",
    icon: ShieldCheck
  },
  {
    title: "Productivity Analytics",
    copy: "Focus time, blocked sites, score trends, and weekly rhythm in one dashboard.",
    icon: BarChart3
  },
  {
    title: "AI PDF Summaries",
    copy: "Compresses long material into study-ready explanations and next steps.",
    icon: FileText
  },
  {
    title: "Multi-AI Routing System",
    copy: "Routes study plans, doubts, summaries, and productivity help to specialized modes.",
    icon: GitBranch
  },
  {
    title: "Theme Personalization",
    copy: "Obsidian glass, neon accents, and adaptive interface states for each mode.",
    icon: Palette
  }
];

const aiPrompts = [
  "Create my study plan",
  "Summarize this PDF",
  "Help me focus",
  "Explain this topic",
  "Solve this doubt"
];

const experiencePanels = [
  {
    label: "Plan",
    title: "Turn scattered intent into a clean day.",
    copy: "SYNAPSE AI captures the plan, breaks it into tasks, assigns priority, and keeps the next step visible.",
    icon: CalendarDays,
    metric: "5 tasks structured"
  },
  {
    label: "Focus",
    title: "Protect the study window.",
    copy: "FocusLock blocks distractions while the dashboard records focus time, score, and interruptions.",
    icon: Lock,
    metric: "24 distractions blocked"
  },
  {
    label: "Learn",
    title: "Ask, solve, summarize, repeat.",
    copy: "The AI layer handles doubts, PDFs, explanations, and revision prompts without leaving the system.",
    icon: Bot,
    metric: "multi-mode AI"
  },
  {
    label: "Progress",
    title: "See momentum compound.",
    copy: "Goals, analytics, streaks, and monthly progress make consistency visible enough to maintain.",
    icon: BarChart3,
    metric: "12 day streak"
  }
];

function MagneticButton({
  href,
  children,
  variant = "primary",
  icon: Icon,
  imageIcon
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  icon?: IconComponent;
  imageIcon?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const moveFrame = useRef<number | null>(null);
  const latestOffset = useRef({ x: 0, y: 0 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.2 });

  useEffect(() => {
    return () => {
      if (moveFrame.current !== null) {
        window.cancelAnimationFrame(moveFrame.current);
      }
    };
  }, []);

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        latestOffset.current = {
          x: (event.clientX - rect.left - rect.width / 2) * 0.16,
          y: (event.clientY - rect.top - rect.height / 2) * 0.18
        };
        if (moveFrame.current !== null) return;
        moveFrame.current = window.requestAnimationFrame(() => {
          x.set(latestOffset.current.x);
          y.set(latestOffset.current.y);
          moveFrame.current = null;
        });
      }}
      onPointerLeave={() => {
        if (moveFrame.current !== null) {
          window.cancelAnimationFrame(moveFrame.current);
          moveFrame.current = null;
        }
        x.set(0);
        y.set(0);
      }}
      className={`magnetic-button ${variant === "primary" ? "magnetic-primary" : "magnetic-secondary"}`}
    >
      <span>{children}</span>
      {imageIcon ? (
        <Image src={imageIcon} alt="" width={24} height={24} className="button-image-icon" />
      ) : null}
      {Icon ? <Icon className="h-4 w-4" /> : null}
    </motion.a>
  );
}

function ProductCard({
  item,
  index
}: {
  item: (typeof showcases)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const tiltFrame = useRef<number | null>(null);
  const latestTilt = useRef({ rx: "0deg", ry: "0deg", mx: "50%", my: "50%" });

  useEffect(() => {
    return () => {
      if (tiltFrame.current !== null) {
        window.cancelAnimationFrame(tiltFrame.current);
      }
    };
  }, []);

  const reset = () => {
    if (tiltFrame.current !== null) {
      window.cancelAnimationFrame(tiltFrame.current);
      tiltFrame.current = null;
    }
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
    ref.current?.style.setProperty("--mx", "50%");
    ref.current?.style.setProperty("--my", "50%");
  };

  return (
    <motion.article
      className={`showcase-card showcase-${item.accent}`}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-18%" }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="showcase-copy">
        <span className="section-kicker">{item.eyebrow}</span>
        <h3>{item.title}</h3>
        <p>{item.copy}</p>
        <div className="showcase-stats">
          {item.stats.map((stat) => (
            <span key={stat}>{stat}</span>
          ))}
        </div>
      </div>

      <div
        ref={ref}
        className="showcase-tilt"
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse") return;
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;
          const px = (event.clientX - rect.left) / rect.width;
          const py = (event.clientY - rect.top) / rect.height;
          latestTilt.current = {
            rx: `${(0.5 - py) * 9}deg`,
            ry: `${(px - 0.5) * 12}deg`,
            mx: `${px * 100}%`,
            my: `${py * 100}%`
          };
          if (tiltFrame.current !== null) return;
          tiltFrame.current = window.requestAnimationFrame(() => {
            ref.current?.style.setProperty("--rx", latestTilt.current.rx);
            ref.current?.style.setProperty("--ry", latestTilt.current.ry);
            ref.current?.style.setProperty("--mx", latestTilt.current.mx);
            ref.current?.style.setProperty("--my", latestTilt.current.my);
            tiltFrame.current = null;
          });
        }}
        onPointerLeave={reset}
      >
        <div className="showcase-screen">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) calc(100vw - 60px), (max-width: 980px) 88vw, 66vw"
            className="object-cover"
          />
        </div>
      </div>
    </motion.article>
  );
}

function FeatureCard({
  title,
  copy,
  icon: Icon,
  index
}: {
  title: string;
  copy: string;
  icon: IconComponent;
  index: number;
}) {
  return (
    <motion.article
      className="feature-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-14%" }}
      transition={{ duration: 0.58, delay: index * 0.035 }}
      whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
    >
      <div className="feature-icon">
        <Icon className="h-5 w-5" />
      </div>
      <h3>{title}</h3>
      <p>{copy}</p>
    </motion.article>
  );
}

export default function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const logoShellRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const canRenderHeroScene = useCanRenderHeroScene(shouldReduceMotion);
  const [isHeroSceneActive, setIsHeroSceneActive] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroLift = useTransform(scrollYProgress, [0, 0.18], [0, -130]);
  const heroFade = useTransform(scrollYProgress, [0, 0.16], [1, 0.18]);

  useEffect(() => {
    if (!canRenderHeroScene) {
      setIsHeroSceneActive(false);
      return undefined;
    }

    const node = heroSectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroSceneActive(entry.isIntersecting),
      { rootMargin: "260px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [canRenderHeroScene]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.68,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              once: true
            }
          }
        );
      });
    }, rootRef);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 450);

    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const query = window.matchMedia("(min-width: 760px) and (pointer: fine)");
    if (!query.matches) return;

    let frame = 0;
    let latestX = 0;
    let latestY = 0;

    const handleMove = (event: PointerEvent) => {
      latestX = event.clientX / window.innerWidth - 0.5;
      latestY = event.clientY / window.innerHeight - 0.5;

      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (!logoShellRef.current) return;
        logoShellRef.current.style.setProperty("--hero-rx", `${latestY * -8}deg`);
        logoShellRef.current.style.setProperty("--hero-ry", `${latestX * 10}deg`);
        logoShellRef.current.style.setProperty("--hero-tx", `${latestX * 12}px`);
        logoShellRef.current.style.setProperty("--hero-ty", `${latestY * 10}px`);
      });
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [shouldReduceMotion]);

  return (
    <div ref={rootRef} className="min-h-screen overflow-hidden bg-obsidian text-pearl">
      <div className="site-noise" />
      <div className="ambient-field" />

      <header className="nav-shell">
        <a className="nav-brand" href="#hero" aria-label="SYNAPSE home">
          <Image
            src="/assets/synapse-wordmark-dark.jpeg"
            alt="SYNAPSE"
            width={206}
            height={80}
            priority
          />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#showcase">Product</a>
          <a href="#features">Features</a>
          <a href="#ai">AI</a>
          <a href="#experience">Experience</a>
        </nav>
        <a className="nav-cta" href="/coming-soon">
          Launch
          <ArrowRight className="h-4 w-4" />
        </a>
      </header>

      <main>
        <section ref={heroSectionRef} id="hero" className="hero-section">
          <div className="hero-grid" />
          <div className="hero-scene" aria-hidden="true">
            {canRenderHeroScene && isHeroSceneActive ? <HeroScene /> : null}
          </div>

          <motion.div style={{ y: heroLift, opacity: heroFade }} className="hero-content">
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="h-4 w-4 text-gold" />
              AI-powered student operating system
            </motion.div>

            <div ref={logoShellRef} className="hero-logo-shell">
              <div className="hero-logo-aura" />
              <Image
                src="/assets/synapse-icon-cropped.png"
                alt="SYNAPSE logo"
                fill
                sizes="(max-width: 768px) 58vw, 280px"
                priority
                className="hero-logo-image"
              />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              The Future of Student Productivity
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              AI-powered focus, planning, goals, and intelligent learning - all in one system.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <MagneticButton href="/coming-soon" icon={ArrowRight}>
                Get Started
              </MagneticButton>
              <MagneticButton href="#ai" imageIcon="/assets/ai-logo-ring.png" variant="secondary">
                Explore SYNAPSE AI
              </MagneticButton>
            </motion.div>
          </motion.div>

        </section>

        <section id="showcase" className="section-wrap product-showcase">
          <div className="section-heading gsap-reveal">
            <span className="section-kicker">Product Showcase</span>
            <h2>Every workspace floats in the same SYNAPSE ecosystem.</h2>
            <p>
              Real dashboard screens become layered, glassy command surfaces with depth, parallax,
              and neon lighting.
            </p>
          </div>

          <div className="showcase-stack">
            {showcases.map((item, index) => (
              <ProductCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </section>

        <section id="features" className="section-wrap features-section">
          <div className="section-heading gsap-reveal">
            <span className="section-kicker">System Modules</span>
            <h2>Built like a student OS, not a scattered app folder.</h2>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </section>

        <section id="ai" className="section-wrap ai-section">
          <div className="ai-shell">
            <div className="ai-visual gsap-reveal">
              <div className="ai-core" aria-hidden="true">
                <Cpu className="h-12 w-12" />
                <span />
                <span />
                <span />
              </div>
              <div className="prompt-cloud">
                {aiPrompts.map((prompt, index) => (
                  <motion.div
                    key={prompt}
                    className="prompt-chip"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.58 }}
                  >
                    {prompt}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="ai-copy gsap-reveal">
              <span className="section-kicker">SYNAPSE AI</span>
              <h2>Ask like a student. Get answers like a system.</h2>
              <p>
                The AI layer stays close to your actual work: plans, doubts, PDFs, concepts, and
                focus decisions. It feels less like a chatbot and more like the intelligence layer
                of your desk.
              </p>
              <div className="ai-chat-card">
                <div className="chat-bubble user">Create my study plan for this week.</div>
                <div className="chat-bubble assistant">
                  <Image src="/assets/ai-logo-ring.png" alt="" width={28} height={28} className="chat-ai-logo" />
                  I will balance revision, mocks, focus sessions, and weak topics.
                </div>
                <div className="typing-row">
                  <span />
                  <span />
                  <span />
                  <p>Drafting your next study plan</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrap extension-section">
          <div className="section-heading gsap-reveal">
            <span className="section-kicker">FocusLock Extension</span>
            <h2>Distraction blocking that feels native to the OS.</h2>
            <p>
              The Chrome extension becomes a clean focus perimeter: block noise, preserve flow, and
              send performance signals back to the dashboard.
            </p>
          </div>

          <div className="browser-stage gsap-reveal">
            <div className="browser-mockup">
              <div className="browser-top">
                <span />
                <span />
                <span />
                <div className="browser-address">
                  <Chrome className="h-4 w-4" />
                  focuslock.synapse/system
                </div>
              </div>
              <div className="browser-body">
                <div className="blocked-panel">
                  <Lock className="h-8 w-8 text-gold" />
                  <h3>Focus session active</h3>
                  <p>Distracting sites are paused until the lock expires.</p>
                  <div className="focus-timer">
                    <Timer className="h-4 w-4" />
                    42:18 remaining
                  </div>
                </div>
                <div className="site-list">
                  {["YouTube", "Instagram", "Reddit", "Twitter"].map((site, index) => (
                    <motion.div
                      key={site}
                      className="site-row"
                      initial={{ opacity: 0, x: 34 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08, duration: 0.52 }}
                    >
                      <span>{site}</span>
                      <div>
                        <i style={{ width: `${82 - index * 15}%` }} />
                      </div>
                      <CheckCircle2 className="h-5 w-5 text-lime-300" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="experience-section">
          <div className="experience-intro">
            <span className="section-kicker">Experience</span>
            <h2>Cinematic workflow, built for repetition.</h2>
            <p>
              The landing page moves the way SYNAPSE should feel: focused, immersive, and alive
              without getting in the way of the work.
            </p>
          </div>

          <div className="experience-track">
            {experiencePanels.map((panel, index) => {
              const Icon = panel.icon;
              return (
                <article key={panel.title} className="experience-panel">
                  <span className="panel-index">0{index + 1}</span>
                  <div className="panel-icon">
                    <Icon className="h-8 w-8" />
                  </div>
                  <p className="section-kicker">{panel.label}</p>
                  <h3>{panel.title}</h3>
                  <p>{panel.copy}</p>
                  <strong>{panel.metric}</strong>
                </article>
              );
            })}
          </div>
        </section>

        <section id="final" className="final-cta">
          <div className="final-light" />
          <div className="final-card gsap-reveal">
            <Image
              src="/assets/synapse-icon-transparent.png"
              alt="SYNAPSE icon"
              width={118}
              height={98}
              loading="eager"
              className="final-logo"
            />
            <span className="section-kicker">SYNAPSE</span>
            <h2>Build Your Future With SYNAPSE</h2>
            <p>
              A futuristic AI operating system for students who want focus, clarity, and measurable
              progress in one premium workspace.
            </p>
            <MagneticButton href="/coming-soon" icon={Zap}>
              Launch SYNAPSE
            </MagneticButton>
          </div>
        </section>
      </main>

      <footer className="landing-footer" aria-label="SYNAPSE footer">
        <div className="footer-brand-block">
          <a className="footer-logo-lockup" href="#hero" aria-label="SYNAPSE home">
            <Image
              src="/assets/synapse-icon-transparent.png"
              alt=""
              width={58}
              height={48}
              className="footer-logo-mark"
            />
            <span>SYNAPSE</span>
          </a>
          <p>AI student operating system for focus, planning, goals, and intelligent learning.</p>
          <div className="footer-legal">
            <span>Copyright 2026</span>
            <a href="mailto:aisynapse08@gmail.com">Contact</a>
            <a href="/coming-soon">Launch</a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Follow Us</h3>
          <div className="footer-socials">
            <a
              href="https://www.instagram.com/synapse.27"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow SYNAPSE on Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
          <a className="footer-text-link" href="https://www.instagram.com/synapse.27" target="_blank" rel="noreferrer">
            @synapse.27
          </a>
        </div>

        <div className="footer-column">
          <h3>Support Us</h3>
          <a className="footer-text-link" href="mailto:aisynapse08@gmail.com">
            <Mail className="h-4 w-4" />
            aisynapse08@gmail.com
          </a>
        </div>

        <div className="footer-column footer-links-column">
          <h3>Resources & Links</h3>
          <div className="footer-links-grid">
            <a href="#showcase">Product</a>
            <a href="#features">Features</a>
            <a href="#ai">SYNAPSE AI</a>
            <a href="#experience">Experience</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
