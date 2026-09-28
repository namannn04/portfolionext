"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { events, experiences, featuredProjects, profile, skills, soloProjects } from "@/content/data";
import { SHAPES, universe } from "@/lib/universe";
import { scrollToHash, useLenis } from "@/components/layout/SmoothScroll";
import { ease } from "./motion";

type Line = { id: number; kind: "input" | "output"; content: React.ReactNode };

const SECTIONS = ["about", "experience", "work", "skills", "events", "contact"] as const;
const FILES: Record<string, string> = {
  "about.txt": "about",
  "experience.log": "experience",
  "projects/": "projects",
  "skills.json": "skills",
  "hackathons.md": "events",
  "contact.sh": "contact",
  "resume.pdf": "resume",
};
const COMMANDS = [
  "help",
  "whoami",
  "experience",
  "projects",
  "skills",
  "hackathons",
  "contact",
  "socials",
  "resume",
  "goto",
  "shape",
  "explode",
  "warp",
  "neofetch",
  "sudo hire naman",
  "ls",
  "cat",
  "date",
  "echo",
  "clear",
  "exit",
];
const SUGGESTIONS = ["help", "neofetch", "shape galaxy", "explode", "warp", "sudo hire naman"];

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
  >
    {children}
  </a>
);

const Dim = ({ children }: { children: React.ReactNode }) => <span className="text-mute">{children}</span>;

function Table({ rows }: { rows: [React.ReactNode, React.ReactNode][] }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-[minmax(8rem,auto)_1fr]">
      {rows.map(([left, right], index) => (
        <div key={index} className="contents">
          <span className="text-accent max-sm:mt-2">{left}</span>
          <span className="text-fg-2">{right}</span>
        </div>
      ))}
    </div>
  );
}

function Neofetch() {
  const logo = [" _   _ ____  ", "| \\ | |  _ \\ ", "|  \\| | | | |", "| |\\  | |_| |", "|_| \\_|____/ "];
  const info: [string, string][] = [
    ["user", `${profile.handle}@portfolio`],
    ["role", profile.role],
    ["location", profile.location],
    ["education", `B.Tech CSE, MSIT '${profile.education.year.slice(2)}`],
    ["stack", "Next.js · TypeScript · Node.js · PostgreSQL"],
    ["shell", "portfolio-sh 2.0"],
    ["renderer", "WebGL · 18k particles · starfield"],
    ["uptime", `${new Date().getFullYear() - 2023}+ years of shipping`],
  ];
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
      <pre className="text-[0.6rem] leading-tight text-accent sm:text-xs">{logo.join("\n")}</pre>
      <div className="space-y-0.5 text-sm">
        {info.map(([key, value]) => (
          <p key={key}>
            <span className="text-accent">{key}</span>
            <Dim>: </Dim>
            <span className="text-fg-2">{value}</span>
          </p>
        ))}
        <p className="flex gap-1 pt-2" aria-hidden="true">
          {["#e9eef5", "#c6f432", "#8fd3ff", "#6a8a24", "#3b4a1d", "#1d2027"].map((color) => (
            <span key={color} className="inline-block h-3 w-6" style={{ background: color }} />
          ))}
        </p>
      </div>
    </div>
  );
}

/**
 * A working shell for the portfolio. Opens with "/" or Ctrl/Cmd+K; commands
 * print content, navigate, and drive the WebGL universe live.
 */
export default function Terminal() {
  const router = useRouter();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  // The hero already hints at "/", so the launcher waits until you scroll on.
  const [launcher, setLauncher] = useState(false);
  const [value, setValue] = useState("");
  const [lines, setLines] = useState<Line[]>([]);
  const history = useRef<string[]>([]);
  const cursor = useRef(-1);
  const nextId = useRef(0);
  const input = useRef<HTMLInputElement>(null);
  const scroller = useRef<HTMLDivElement>(null);

  const print = useCallback((content: React.ReactNode, kind: Line["kind"] = "output") => {
    setLines((current) => [...current, { id: nextId.current++, kind, content }]);
  }, []);

  const greet = useCallback(() => {
    setLines([]);
    print(
      <div className="space-y-1">
        <p className="text-fg">
          Welcome to <span className="text-accent">naman.sh</span>. You found the secret terminal.
        </p>
        <p>
          <Dim>Type</Dim> <span className="text-accent">help</span>{" "}
          <Dim>to see what it can do. The universe behind you listens.</Dim>
        </p>
      </div>,
    );
  }, [print]);

  useEffect(() => {
    const update = () => setLauncher(window.scrollY > window.innerHeight * 0.6 || window.location.pathname !== "/");
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Global shortcuts.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.closest("input, textarea, [contenteditable='true']");
      if ((event.key === "k" || event.key === "K") && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      } else if (event.key === "/" && !typing) {
        event.preventDefault();
        setOpen(true);
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      lenis?.stop();
      if (lines.length === 0) greet();
      const id = window.setTimeout(() => input.current?.focus(), 60);
      return () => window.clearTimeout(id);
    }
    lenis?.start();
  }, [open, lenis, greet, lines.length]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const close = () => setOpen(false);

  const goto = (section: string) => {
    close();
    if (!document.getElementById(section)) {
      router.push(`/#${section}`);
      return;
    }
    window.setTimeout(() => scrollToHash(lenis, `#${section}`), 250);
  };

  const run = (raw: string) => {
    const command = raw.trim();
    print(
      <p>
        <span className="text-accent">➜</span> <span className="text-sky-300">~</span> {command}
      </p>,
      "input",
    );
    if (!command) return;
    history.current = [command, ...history.current.slice(0, 49)];
    cursor.current = -1;

    const [name, ...args] = command.split(/\s+/);
    const arg = args.join(" ").toLowerCase();

    switch (name.toLowerCase()) {
      case "help":
        print(
          <Table
            rows={[
              ["whoami", "Who is Naman, in two lines"],
              ["experience", "Where I've worked and led"],
              ["projects", "Things I've shipped, with links"],
              ["skills", "The stack I reach for"],
              ["hackathons", "Events I've helped run"],
              ["contact", "Email me (copies the address)"],
              ["socials · resume", "Links, and the CV page"],
              ["goto <section>", `Fly to ${SECTIONS.join(", ")}`],
              ["shape <name>", `Reshape the universe: ${SHAPES.join(", ")}, or auto`],
              ["explode · warp", "Blow the particles apart · fly through the stars"],
              ["neofetch", "System info, the important kind"],
              ["sudo hire naman", "You know you want to"],
              ["ls · cat · echo · date", "The classics"],
              ["clear · exit", "Tidy up · close (or press Esc)"],
            ]}
          />,
        );
        break;
      case "whoami":
      case "about":
        print(
          <div className="space-y-2">
            <p className="text-fg">
              {profile.name} — {profile.role}, {profile.location}.
            </p>
            <p className="text-fg-2">{profile.intro}</p>
            <p>
              <Dim>more:</Dim> <span className="text-accent">goto about</span>
            </p>
          </div>,
        );
        break;
      case "experience":
      case "exp":
        print(<Table rows={experiences.map((item) => [item.period, `${item.title} · ${item.company}`])} />);
        break;
      case "projects":
      case "work":
        print(
          <Table
            rows={[...featuredProjects, ...soloProjects].map((project) => [
              project.title,
              project.href ? <A href={project.href}>{project.description}</A> : project.description,
            ])}
          />,
        );
        break;
      case "skills":
      case "stack":
        print(<Table rows={skills.map((group) => [group.label, group.items.join(", ")])} />);
        break;
      case "hackathons":
      case "events":
        print(
          <Table rows={events.map((event) => [event.title, `${event.role} · ${event.date} · ${event.location}`])} />,
        );
        break;
      case "contact":
      case "email":
        navigator.clipboard?.writeText(profile.email).catch(() => undefined);
        print(
          <p className="text-fg-2">
            <A href={`mailto:${profile.email}`}>{profile.email}</A> <Dim>— copied to your clipboard.</Dim>
          </p>,
        );
        break;
      case "socials":
        print(
          <Table
            rows={profile.socials.map((social) => [
              social.label,
              <A key={social.href} href={social.href}>
                {social.href.replace("https://", "")}
              </A>,
            ])}
          />,
        );
        break;
      case "resume":
        print(<Dim>Opening resume…</Dim>);
        close();
        router.push("/resume");
        break;
      case "goto":
      case "cd": {
        const section = SECTIONS.find((item) => item.startsWith(arg.replace(/\/$/, "")));
        if (arg === "~" || arg === "" || arg === "top") {
          close();
          window.setTimeout(() => lenis?.scrollTo(0, { duration: 1.6 }), 250);
        } else if (section) {
          print(<Dim>Flying to {section}…</Dim>);
          goto(section);
        } else
          print(
            <span className="text-red-300">
              No such section: {arg}. Try: {SECTIONS.join(", ")}
            </span>,
          );
        break;
      }
      case "shape": {
        if (arg === "auto" || arg === "reset") {
          universe.shape = null;
          print(<Dim>Released. The universe follows your scroll again.</Dim>);
          break;
        }
        const index = SHAPES.findIndex((shape) => shape === arg);
        if (index === -1) {
          print(<span className="text-red-300">Unknown shape. Try: {SHAPES.join(", ")}, auto</span>);
          break;
        }
        universe.shape = index;
        print(
          <p className="text-fg-2">
            Reshaping into <span className="text-accent">{SHAPES[index]}</span>.{" "}
            <Dim>Close the terminal to watch; `shape auto` to release.</Dim>
          </p>,
        );
        break;
      }
      case "explode":
      case "boom":
        universe.explodeAt = performance.now();
        print(<p className="text-accent">💥 Kaboom. They&apos;ll find their way back.</p>);
        break;
      case "warp":
      case "hyperspace":
        universe.warp = 6;
        print(<p className="text-sky-300">Punching it. Stars incoming.</p>);
        break;
      case "neofetch":
        print(<Neofetch />);
        break;
      case "sudo":
        if (/^hire\s+naman/.test(arg)) {
          universe.celebrateAt = performance.now();
          universe.warp = 4;
          print(
            <div className="space-y-1">
              <p className="text-accent">[sudo] password for recruiter: ••••••••</p>
              <p className="text-fg">✔ Permission granted. Excellent decision.</p>
              <p className="text-fg-2">
                Next step: <A href={`mailto:${profile.email}?subject=Let's%20work%20together`}>send the offer letter</A>{" "}
                <Dim>or type `contact`.</Dim>
              </p>
            </div>,
          );
        } else {
          print(
            <span className="text-red-300">
              {profile.handle} is not in the sudoers file. This incident will be reported. 👀
            </span>,
          );
        }
        break;
      case "hire":
        print(<Dim>Permission denied. Did you mean `sudo hire naman`?</Dim>);
        break;
      case "ls":
        print(
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            {Object.keys(FILES).map((file) => (
              <span key={file} className={file.endsWith("/") ? "text-sky-300" : "text-fg-2"}>
                {file}
              </span>
            ))}
          </p>,
        );
        break;
      case "cat": {
        const file = FILES[arg];
        if (!file) print(<span className="text-red-300">cat: {arg || "?"}: No such file. Try `ls`.</span>);
        else if (file === "resume") run("resume");
        else run(file === "events" ? "hackathons" : file === "about" ? "whoami" : file);
        break;
      }
      case "date":
        print(<span className="text-fg-2">{new Date().toString()}</span>);
        break;
      case "echo":
        print(<span className="text-fg-2">{args.join(" ")}</span>);
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
      case "quit":
        close();
        break;
      default:
        print(
          <span className="text-red-300">
            command not found: {name}. <Dim>Type `help`.</Dim>
          </span>,
        );
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      run(value);
      setValue("");
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      cursor.current = Math.min(cursor.current + 1, history.current.length - 1);
      setValue(history.current[cursor.current] ?? value);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      cursor.current = Math.max(cursor.current - 1, -1);
      setValue(cursor.current === -1 ? "" : history.current[cursor.current]);
    } else if (event.key === "Tab") {
      event.preventDefault();
      const match = COMMANDS.find((command) => command.startsWith(value.toLowerCase()) && value);
      if (match) setValue(match);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-cursor="Hack"
        aria-label="Open terminal"
        tabIndex={launcher ? 0 : -1}
        aria-hidden={!launcher}
        style={{
          opacity: launcher ? 1 : 0,
          translate: launcher ? "0 0" : "0 12px",
          pointerEvents: launcher ? "auto" : "none",
        }}
        className="group fixed bottom-4 left-4 z-40 flex items-center gap-2 transition-[opacity,translate,border-color,color] duration-500 rounded-full border border-line/80 bg-ink/80 py-2 pr-3 pl-2.5 font-mono text-xs text-fg-2 backdrop-blur-md hover:border-accent hover:text-fg md:bottom-6 md:left-6"
      >
        <span className="grid size-6 place-items-center rounded-full bg-accent text-[0.65rem] font-bold text-accent-ink">
          &gt;_
        </span>
        <span className="hidden sm:inline">Terminal</span>
        <kbd className="hidden rounded border border-line px-1.5 py-0.5 text-[0.62rem] text-mute md:inline">/</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[85] flex items-end justify-center bg-ink/50 p-3 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onPointerDown={(event) => event.target === event.currentTarget && close()}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Portfolio terminal"
              initial={{ y: 40, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease }}
              className="flex h-[min(34rem,80svh)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-line bg-[oklch(0.13_0.008_265/0.94)] font-mono text-sm shadow-[0_40px_120px_-20px_rgb(0_0_0/0.8),0_0_0_1px_rgb(198_244_50/0.06)]"
              onClick={() => input.current?.focus()}
            >
              <div className="flex items-center justify-between border-b border-line/70 px-4 py-3">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="size-3 rounded-full bg-[#ff5f57]" />
                  <span className="size-3 rounded-full bg-[#febc2e]" />
                  <span className="size-3 rounded-full bg-[#28c840]" />
                </div>
                <p className="text-xs text-mute">{profile.handle}@portfolio: ~</p>
                <button
                  type="button"
                  onClick={close}
                  className="text-xs text-mute hover:text-fg"
                  aria-label="Close terminal"
                >
                  esc
                </button>
              </div>

              <div
                ref={scroller}
                data-lenis-prevent
                className="flex-1 space-y-3 overflow-y-auto px-4 py-4 leading-relaxed text-fg"
              >
                {lines.map((line) => (
                  <div key={line.id} className={line.kind === "input" ? "text-fg" : ""}>
                    {line.content}
                  </div>
                ))}
                <label className="flex items-center gap-2">
                  <span className="text-accent">➜</span>
                  <span className="text-sky-300">~</span>
                  <input
                    ref={input}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onKeyDown={onKeyDown}
                    aria-label="Terminal command"
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    enterKeyHint="send"
                    className="terminal-input flex-1 bg-transparent text-fg caret-accent"
                  />
                </label>
              </div>

              <div className="flex gap-2 overflow-x-auto border-t border-line/70 px-4 py-3 [scrollbar-width:none]">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      run(suggestion);
                    }}
                    className="shrink-0 rounded-full border border-line px-3 py-1 text-xs text-fg-2 transition-colors hover:border-accent hover:text-fg"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
