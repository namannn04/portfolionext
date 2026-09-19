"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Box,
  Compass,
  Download,
  Github,
  Hammer,
  Linkedin,
  Mail,
  MapPin,
  Mouse,
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const checkpoints = [
  { id: "spawn", label: "Spawn" },
  { id: "base", label: "Player base" },
  { id: "workshop", label: "Workshop" },
  { id: "builds", label: "Build gallery" },
  { id: "portals", label: "Portals" },
] as const;

const skills = ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "AWS"];

function Tree({ className = "" }: { className?: string }) {
  return (
    <div className={`journey-tree ${className}`} aria-hidden="true">
      <div className="journey-tree__leaves" />
      <div className="journey-tree__trunk" />
    </div>
  );
}

function Cloud({ className = "" }: { className?: string }) {
  return <div className={`journey-cloud ${className}`} aria-hidden="true" />;
}

function Player({ moving }: { moving: boolean }) {
  return (
    <div className={`journey-player-wrap ${moving ? "is-moving" : ""}`} aria-hidden="true">
      <div className="journey-name-tag">namannn04</div>
      <div className="journey-player">
        <div className="journey-player__head">
          <span className="journey-player__hair" />
          <span className="journey-player__eye journey-player__eye--left" />
          <span className="journey-player__eye journey-player__eye--right" />
        </div>
        <div className="journey-player__body" />
        <div className="journey-player__arm journey-player__arm--left" />
        <div className="journey-player__arm journey-player__arm--right" />
        <div className="journey-player__leg journey-player__leg--left" />
        <div className="journey-player__leg journey-player__leg--right" />
      </div>
      <div className="journey-player__shadow" />
    </div>
  );
}

function SceneLabel({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="journey-scene-label">
      <span>{eyebrow}</span>
      <strong>{title}</strong>
    </div>
  );
}

export default function MinecraftJourney() {
  const rootRef = useRef<HTMLElement>(null);
  const moveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [progress, setProgress] = useState(0);
  const [moving, setMoving] = useState(false);
  const activeIndex = Math.min(checkpoints.length - 1, Math.round(progress * (checkpoints.length - 1)));

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const root = rootRef.current;
      if (!root || window.matchMedia("(max-width: 767px)").matches) return;

      const rect = root.getBoundingClientRect();
      const travel = root.offsetHeight - window.innerHeight;
      const next = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
      setProgress(next);
      setMoving(true);

      if (moveTimer.current) clearTimeout(moveTimer.current);
      moveTimer.current = setTimeout(() => setMoving(false), 140);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      if (moveTimer.current) clearTimeout(moveTimer.current);
    };
  }, []);

  const goToCheckpoint = useCallback((index: number) => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(max-width: 767px)").matches) {
      document.getElementById(checkpoints[index].id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const top = root.offsetTop;
    const travel = root.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * (index / (checkpoints.length - 1)), behavior: "smooth" });
  }, []);

  return (
    <section ref={rootRef} className="journey-root" aria-label="Naman's Minecraft portfolio journey">
      <div className="journey-stage">
        <header className="journey-hud">
          <Link href="/" className="journey-brand" aria-label="Naman Dadhich home">
            <span className="journey-brand__cube" />
            <span>naman.world</span>
          </Link>

          <nav className="journey-map" aria-label="Landing page checkpoints">
            {checkpoints.map((checkpoint, index) => (
              <button
                key={checkpoint.id}
                type="button"
                className={index === activeIndex ? "is-active" : ""}
                onClick={() => goToCheckpoint(index)}
                aria-label={`Travel to ${checkpoint.label}`}
                aria-current={index === activeIndex ? "step" : undefined}
              >
                <span>{index + 1}</span>
                <em>{checkpoint.label}</em>
              </button>
            ))}
          </nav>

          <div className="journey-hud__actions">
            <Link href="/contact" aria-label="Contact Naman"><Mail size={18} /></Link>
            <ThemeToggle />
          </div>
        </header>

        <div
          className="journey-track"
          style={{ transform: `translate3d(-${progress * 80}%, 0, 0)` }}
        >
          <section id="spawn" className="journey-scene journey-scene--spawn">
            <Cloud className="journey-cloud--one" />
            <Cloud className="journey-cloud--two" />
            <div className="journey-sun" aria-hidden="true" />
            <div className="journey-mountains" aria-hidden="true" />
            <Tree className="journey-tree--spawn-a" />
            <Tree className="journey-tree--spawn-b" />

            <div className="journey-copy journey-copy--hero">
              <p className="journey-kicker"><span /> PLAYER 01 · ONLINE</p>
              <h1>Naman<br /><span>Dadhich</span></h1>
              <p className="journey-lead">
                Full-stack developer crafting scalable products, open-source tools,
                and communities that move people forward.
              </p>
              <div className="journey-actions">
                <button type="button" className="journey-button journey-button--primary" onClick={() => goToCheckpoint(1)}>
                  Start journey <ArrowRight size={18} />
                </button>
                <Link href="/resume" className="journey-button journey-button--ghost">
                  <Download size={17} /> Resume
                </Link>
              </div>
              <div className="journey-socials">
                <a href="https://github.com/namannn04" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
                <a href="https://linkedin.com/in/namannn04" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>
              </div>
            </div>

            <div className="journey-starter-house" aria-hidden="true">
              <div className="journey-house__roof" />
              <div className="journey-house__wall">
                <div className="journey-house__window" />
                <div className="journey-house__door" />
                <div className="journey-house__torch" />
              </div>
            </div>

            <div className="journey-scroll-cue">
              <Mouse size={18} /> <span>Scroll to explore</span>
            </div>
          </section>

          <section id="base" className="journey-scene journey-scene--base">
            <SceneLabel eyebrow="Checkpoint 02" title="Player base" />
            <Tree className="journey-tree--base" />
            <div className="journey-base-house" aria-hidden="true">
              <div className="journey-base-house__roof" />
              <div className="journey-base-house__wall">
                <div className="journey-base-house__window" />
                <div className="journey-base-house__door" />
              </div>
            </div>

            <article className="journey-panel journey-panel--about">
              <div className="journey-panel__icon"><BookOpen size={22} /></div>
              <p className="journey-kicker">PLAYER JOURNAL</p>
              <h2>I build useful things—and the teams behind them.</h2>
              <p>
                I’m a full-stack developer focused on Next.js and TypeScript. I’ve
                worked as an SDE, built end-to-end platforms, led developer communities,
                and mentored teams through ambitious projects.
              </p>
              <div className="journey-stats">
                <span><strong>2+</strong> years building</span>
                <span><strong>2027</strong> B.Tech CSE</span>
                <span><MapPin size={15} /><strong>Delhi</strong> India</span>
              </div>
              <div className="journey-panel__links">
                <Link href="/resume">Open journal <ArrowRight size={16} /></Link>
                <Link href="/contact">Send a message</Link>
              </div>
            </article>
          </section>

          <section id="workshop" className="journey-scene journey-scene--workshop">
            <SceneLabel eyebrow="Checkpoint 03" title="Village workshop" />
            <div className="journey-workshop" aria-hidden="true">
              <div className="journey-workshop__roof" />
              <div className="journey-workshop__wall">
                <div className="journey-workshop__window" />
                <div className="journey-workshop__door" />
              </div>
            </div>

            <article className="journey-panel journey-panel--skills">
              <div className="journey-panel__icon"><Hammer size={22} /></div>
              <p className="journey-kicker">CRAFTING LOADOUT</p>
              <h2>Tools I use to ship.</h2>
              <p>Strong foundations, modern frameworks, and a product-first approach.</p>
              <div className="journey-inventory" aria-label="Featured skills">
                {skills.map((skill, index) => (
                  <div key={skill} className="journey-inventory__slot">
                    <Box size={21} />
                    <span>{skill}</span>
                    <small>{index + 1}</small>
                  </div>
                ))}
              </div>
              <button type="button" className="journey-text-button" onClick={() => goToCheckpoint(3)}>
                Continue to my builds <ArrowRight size={16} />
              </button>
            </article>
          </section>

          <section id="builds" className="journey-scene journey-scene--builds">
            <SceneLabel eyebrow="Checkpoint 04" title="Build gallery" />
            <div className="journey-build journey-build--career" aria-hidden="true">
              <div className="journey-build__beacon" />
              <div className="journey-build__tower" />
            </div>
            <div className="journey-build journey-build--spark" aria-hidden="true">
              <div className="journey-build__flag" />
              <div className="journey-build__hall" />
            </div>

            <article className="journey-panel journey-panel--projects">
              <p className="journey-kicker">FEATURED BUILDS</p>
              <h2>Ideas turned into working worlds.</h2>
              <div className="journey-project-list">
                <a href="https://careercompass-xi.vercel.app/" target="_blank" rel="noreferrer">
                  <span className="journey-project-list__number">01</span>
                  <span><strong>CareerCompass</strong><small>AI-powered guidance across 500+ careers</small></span>
                  <ArrowRight size={18} />
                </a>
                <div>
                  <span className="journey-project-list__number">02</span>
                  <span><strong>SPARK</strong><small>A community platform for builders and opportunities</small></span>
                  <span className="journey-project-list__status">BUILDING</span>
                </div>
              </div>
              <Link href="/projects" className="journey-button journey-button--primary">
                Enter project world <ArrowRight size={18} />
              </Link>
            </article>
          </section>

          <section id="portals" className="journey-scene journey-scene--portals">
            <SceneLabel eyebrow="Checkpoint 05" title="Portal crossroads" />
            <div className="journey-copy journey-copy--portal">
              <p className="journey-kicker"><Sparkles size={15} /> CHOOSE YOUR NEXT WORLD</p>
              <h2>The journey starts here.</h2>
              <p>Each portal opens a different part of my story.</p>
            </div>

            <div className="journey-portals">
              <Link href="/projects" className="journey-portal-card journey-portal-card--nether">
                <span className="journey-portal">
                  <i /><i /><i />
                </span>
                <strong>Projects</strong>
                <small>Enter the Nether</small>
              </Link>
              <Link href="/experience" className="journey-portal-card journey-portal-card--end">
                <span className="journey-end-gateway"><i /></span>
                <strong>Experience</strong>
                <small>Enter the End</small>
              </Link>
              <Link href="/contact" className="journey-compass-card">
                <Compass size={34} />
                <span><strong>Send a message</strong><small>Start a new quest together</small></span>
              </Link>
            </div>

            <footer className="journey-footer">Built block by block by Naman Dadhich.</footer>
          </section>
        </div>

        <Player moving={moving} />
        <div className="journey-ground" aria-hidden="true" />
        <div className="journey-progress" aria-hidden="true"><span style={{ width: `${progress * 100}%` }} /></div>
      </div>
    </section>
  );
}
