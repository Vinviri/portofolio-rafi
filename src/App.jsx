import { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  Download,
  ExternalLink,
  Award,
  Cloud,
  MapPin,
  Gamepad2,
  Lock,
  ShieldCheck,
  Server,
} from 'lucide-react';

/* ─── Brand SVG icons ─── */

function Github({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function Linkedin({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ─── Data ─── */

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Tech Stack', href: '#tech' },
  { label: 'Projects', href: '#projects' },
  { label: 'Credentials', href: '#credentials' },
];

const EXPERIENCE = [
  {
    role: 'IT Engineer Intern',
    org: 'Badan Siber dan Sandi Negara (BSSN)',
    place: 'Depok, West Java',
    date: 'Nov 2026 – Present',
    points: [
      'Help set up and configure servers for cybersecurity drill tests (exercise environments).',
      'Learn Blue Team (detection and defense) and Red Team (attack simulation) workflows through exercise scenarios.',
      'Study how security incidents are identified, handled, and responded to.',
    ],
  },
  {
    role: 'Independent Study Participant · Capstone Backend Lead',
    org: 'Asah led by Dicoding, in association with Accenture (MSIB)',
    place: 'Jakarta',
    date: 'Aug 2025 – Dec 2025',
    points: [
      'Completed the project-based Front-End & Back-End Web Development with AI track.',
      'Led backend work in a 5-person team building Learnper: designed the Supabase (PostgreSQL) schema and endpoints.',
      "Connected the ML team's model to the React (Vite) frontend.",
    ],
  },
];

const TECH = {
  Security: ['Incident response basics', 'Blue/Red Team concepts', 'Phishing detection', 'Server setup'],
  Backend: ['Node.js', 'Express.js', 'PostgreSQL', 'Supabase', 'REST APIs'],
  Frontend: ['React', 'JavaScript', 'Vite', 'Tailwind CSS'],
  'AI & Data': ['Python', 'scikit-learn', 'Streamlit', 'Azure AI', 'Ollama'],
  'Tools & Cloud': ['Docker', 'Git', 'Postman', 'Apache JMeter', 'AWS (RDS, S3)', 'Godot Engine'],
};

const FEATURED_PROJECTS = [
  {
    title: 'PhishGuard: Hybrid Phishing URL Detector',
    label: 'Cybersecurity Project',
    icon: ShieldCheck,
    desc: 'A locally run phishing URL checker that combines a rule engine with a Random Forest model and explains every result in plain language through a Streamlit app.',
    details: [
      'Rules for IP-address hosts, homograph characters, brand names in subdomains, and hidden redirects',
      'Trained on the PhiUSIIL dataset with a domain-grouped split; evaluated on 47,074 test URLs and live phishing URLs from OpenPhish',
      'Model bias and limitations documented openly in the repository',
      'Privacy first: URLs are never visited, inputs are never stored, and output is defanged',
    ],
    tech: ['Python', 'scikit-learn', 'Streamlit', 'Random Forest', 'pytest'],
    role: 'Personal project',
    link: 'https://github.com/Vinviri/phishguard',
  },
  {
    title: 'Monolithic vs. Microservices Architecture',
    label: 'Undergraduate Thesis',
    icon: Server,
    desc: 'Comparative performance analysis of monolithic and microservices architectures for an online exam REST API, built with Node.js, PostgreSQL, and Docker.',
    details: [
      'The same API built twice: a monolith and microservices (API gateway plus auth, question, exam, and grading services)',
      'Microservices orchestrated with Docker Compose',
      'Load testing with Apache JMeter under multiple load scenarios',
      'Endpoint testing with Postman',
    ],
    tech: ['Node.js', 'PostgreSQL', 'Docker', 'Microservices', 'Apache JMeter'],
    role: 'Sole researcher & developer',
    link: null,
  },
  {
    title: 'NPC Pathfinding System using A* Algorithm in Godot',
    label: 'Scientific Paper / Minor Thesis',
    icon: Gamepad2,
    desc: 'Implemented the A* search algorithm for autonomous NPC navigation. NPCs dynamically find optimal paths around static obstacles on a 2D grid-based map.',
    details: [
      'Built with Godot Engine and GDScript',
      'Grid navigation logic',
      'Handles static obstacle avoidance',
      'Real-time path recalculation for NPC movement',
    ],
    tech: ['Godot', 'GDScript', 'A* Algorithm', '2D Grid', 'Pathfinding'],
    role: 'Sole developer & researcher',
    link: null,
  }
];

const PROJECTS = [
  {
    title: 'Learnper',
    context: 'Capstone Project · Asah by Dicoding',
    desc: 'AI-powered learning platform that helps users understand their learning workflow and interests. I led the backend in a 5-person team: Supabase database and endpoints, plus connecting the ML model to the React frontend.',
    tech: ['React', 'Vite', 'Supabase', 'PostgreSQL', 'Machine Learning'],
    image: './learnper.png',
    actionUrl: '#',
    actionType: 'private',
  },
  {
    title: 'Mina',
    context: 'Personal Project',
    desc: 'Pipeline that turns long-form videos into YouTube Shorts: Whisper transcription, clip selection with a local LLM, 1080×1920 subtitled rendering with FFmpeg, and automated quality checks.',
    tech: ['Python', 'Whisper', 'FFmpeg', 'Ollama'],
    image: null,
    actionUrl: '#',
    actionType: 'private',
  },
  {
    title: 'CityCare App',
    context: null,
    desc: 'A public facility damage reporting application featuring interactive maps to streamline communication between citizens and city government.',
    tech: ['JavaScript', 'Webpack', 'Leaflet.js', 'API'],
    image: './citycare.png',
    actionUrl: 'https://vinviri.github.io/citycareapp/',
    actionType: 'demo',
    actionNote: '(Bypass login or use a dummy account to view the map dashboard)',
  },
  {
    title: 'StoryMap App',
    context: null,
    desc: 'An interactive storytelling platform where users can share and explore user-generated stories pinned to specific geographic coordinates across Indonesia.',
    tech: ['JavaScript', 'Maps API', 'Frontend'],
    image: './storymap.png',
    actionUrl: 'https://vinviri.github.io/STORYMAP-APP/',
    actionType: 'demo',
    actionNote: '(Bypass login to view the map)',
  },
  {
    title: 'Edukasi Sampah',
    context: 'Educational Game',
    desc: 'Interactive web-based educational game designed to help elementary students learn how to categorize waste (Organic, Inorganic, Hazardous) using drag-and-drop mechanics.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Game UI'],
    image: './edukasi-sampah.png',
    actionUrl: '#',
    actionType: 'private',
  },
];

const CREDENTIALS = [
  {
    title: 'Junior Web Programmer',
    sub: 'LSP Universitas Gunadarma · SKKNI competency certification',
    date: 'Jul 2026',
  },
  {
    title: 'Dicoding Indonesia · 10 courses',
    sub: 'Back-End with JavaScript, Gen AI Apps with Microsoft Azure, Cloud & Gen AI on AWS, and more',
    date: '2025 – 2026',
  },
  {
    title: 'Asah by Dicoding Graduate',
    sub: 'Front-End & Back-End Web Development with AI',
    date: 'Dec 2025',
  },
  {
    title: 'ACA Cloud Computing',
    sub: 'Alibaba Cloud / Digital Talent Scholarship',
    date: 'Dec 2024',
  },
];

/* ─── Utilities ─── */

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Section({ id, children, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-600 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'} ${className}`}
    >
      {children}
    </section>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-medium tracking-widest uppercase text-text-muted mb-3">{children}</p>
  );
}

function Badge({ children, className = '' }) {
  return (
    <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-md bg-bg border border-border text-text-secondary ${className}`}>
      {children}
    </span>
  );
}

/* ─── Navbar ─── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-bg/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#home" className="text-base font-semibold text-text tracking-tight">
          RSP<span className="text-accent">.</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-[13px] text-text-secondary hover:text-text transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href="https://github.com/Vinviri"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-text-muted hover:text-text transition-colors"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/rafi-satria-pradana/"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-text-muted hover:text-text transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-200 bg-bg/95 backdrop-blur-md border-b border-border ${
          mobileOpen ? 'max-h-64' : 'max-h-0 border-b-0'
        }`}
      >
        <div className="px-6 py-3 flex flex-col gap-0.5">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-sm text-text-secondary hover:text-text transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

/* ─── Hero ─── */

function HeroGraphic() {
  return (
    <div className="relative w-full max-w-[280px] mx-auto md:ml-auto group">
      {/* Decorative background element */}
      <div className="absolute inset-0 bg-border rounded-2xl rotate-3 transform origin-bottom-right transition-transform duration-500 group-hover:rotate-6" />
      
      {/* Main Image Container */}
      <div className="relative bg-surface border border-border p-2.5 rounded-2xl shadow-sm transition-transform duration-500 group-hover:-translate-y-1">
        <div className="aspect-[4/5] bg-bg rounded-xl overflow-hidden flex flex-col items-center justify-center border border-border dot-grid">
          <img src="./foto-profil.jpg" alt="Rafi Satria" className="w-full h-full object-cover" />
        </div>
      </div>
      
      {/* Floating Badge */}
      <div className="absolute -bottom-5 -left-5 bg-surface border border-border px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2.5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>
        <span className="text-xs font-semibold text-text-secondary">Available for work</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="pt-28 pb-20 md:pt-36 md:pb-28 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_340px] gap-12 md:gap-16 items-start">
        {/* Left — text content */}
        <div>
          <div className="inline-flex items-center gap-2 text-xs text-text-muted mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Available for opportunities
          </div>

          <p className="text-text-secondary text-base mb-2">Hi, I'm</p>

          <h1 className="text-[clamp(2.2rem,5vw,3.2rem)] font-semibold leading-[1.1] tracking-tight text-text mb-6">
            Rafi Satria<br />Pradana
          </h1>

          <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-lg mb-10">
            Informatics graduate &amp; IT Engineer Intern at BSSN,{' '}<br className="hidden sm:block" />
            growing into cybersecurity on top of{' '}<br className="hidden sm:block" />
            a backend and web development foundation.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-text text-bg text-sm font-medium rounded-lg hover:bg-text/85 transition-colors"
            >
              View Projects
              <ArrowRight size={14} />
            </a>
            <a
              href="https://drive.google.com/drive/folders/12ZS0852TIwwcb3lCy-giA_oMTHexzrfE?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-text-secondary text-sm font-medium rounded-lg hover:border-border-hover hover:text-text transition-colors"
            >
              <Download size={14} />
              Resume
            </a>
          </div>
        </div>

        {/* Right — hero graphic */}
        <div className="hidden md:block pt-6">
          <HeroGraphic />
        </div>
      </div>
    </section>
  );
}

/* ─── About ─── */

function About() {
  return (
    <Section id="about" className="py-20 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[200px_1fr] gap-8 md:gap-16">
        <div>
          <SectionLabel>About</SectionLabel>
          <h2 className="text-lg font-semibold text-text">A bit about me</h2>
        </div>

        <div className="space-y-4 text-text-secondary leading-relaxed max-w-xl">
          <p>
            I'm an Informatics graduate from Universitas Gunadarma (GPA 3.89) and currently an IT
            Engineer Intern at BSSN, Indonesia's National Cyber and Crypto Agency. There I help set up
            servers for cybersecurity drill tests while learning how Blue and Red Teams work and how
            security incidents are handled.
          </p>
          <p>
            Before security, most of my time went into backend development with Node.js, PostgreSQL,
            and Docker. My thesis compared monolithic and microservices architectures for an online
            exam REST API, and in the Asah by Dicoding program I led the backend of our capstone
            project, Learnper. PhishGuard, a phishing URL detector built with Python and machine
            learning, is where I bring both sides together.
          </p>
          <p>
            Outside of work, I make video content on YouTube (Rafi Satria and Kolom Main) and built
            Mina, a small AI pipeline that turns my long videos into Shorts.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ─── Experience ─── */

function Experience() {
  return (
    <Section id="experience" className="py-20 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[200px_1fr] gap-8 md:gap-16">
        <div>
          <SectionLabel>Experience</SectionLabel>
          <h2 className="text-lg font-semibold text-text">Where I've worked</h2>
        </div>

        <div className="space-y-10 max-w-2xl">
          {EXPERIENCE.map((e) => (
            <div key={e.org}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                <h3 className="text-base font-semibold text-text leading-snug">{e.role}</h3>
                <span className="text-xs text-text-muted whitespace-nowrap">{e.date}</span>
              </div>
              <p className="text-sm text-text-muted mb-3">
                {e.org} · {e.place}
              </p>
              <ul className="space-y-1.5">
                {e.points.map((pt) => (
                  <li key={pt} className="text-sm text-text-secondary leading-relaxed flex items-start gap-2">
                    <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-text-muted" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Tech Stack ─── */

function TechStack() {
  return (
    <Section id="tech" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>Skills</SectionLabel>
        <h2 className="text-xl font-semibold text-text mb-10">Tech Stack</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10">
          {Object.entries(TECH).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-text mb-3">{category}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="text-sm text-text-secondary">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Projects ─── */

function FeaturedProject({ project }) {
  const p = project;
  const Icon = p.icon || Gamepad2;
  return (
    <div className="border border-border rounded-lg p-6 md:p-8 bg-surface mb-6">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent bg-accent-light px-2.5 py-1 rounded-md">
          <Icon size={12} />
          {p.label}
        </span>
      </div>

      <h3 className="text-lg md:text-xl font-semibold text-text mb-3 leading-snug">
        {p.title}
      </h3>

      <p className="text-sm text-text-secondary leading-relaxed mb-5 max-w-2xl">
        {p.desc}
      </p>

      <ul className="mb-6 space-y-1.5">
        {p.details.map((d) => (
          <li key={d} className="text-sm text-text-secondary flex items-start gap-2">
            <span className="text-text-muted mt-1.5 shrink-0 w-1 h-1 rounded-full bg-text-muted" />
            {d}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {p.tech.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-text-muted">{p.role}</p>
        {p.link && (
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border text-text-secondary text-sm font-medium rounded-lg hover:border-border-hover hover:text-text transition-colors"
          >
            View GitHub
            <Github size={14} />
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="group border border-border rounded-lg overflow-hidden bg-surface hover:border-border-hover transition-colors flex flex-col">
      {/* Image */}
      {project.image ? (
        <div className="w-full aspect-video overflow-hidden border-b border-border">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div className="w-full aspect-video bg-bg border-b border-border flex items-center justify-center dot-grid">
          <span className="text-sm text-text-muted">No preview</span>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <h3 className="text-base font-semibold text-text leading-snug">
            {project.title}
          </h3>
          {project.context && (
            <span className="text-xs text-text-muted">{project.context}</span>
          )}
        </div>

        <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-grow">{project.desc}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        <div className="mt-auto">
          {project.actionType === 'demo' ? (
            <a
              href={project.actionUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-surface text-sm font-medium rounded-lg hover:bg-accent-hover transition-colors"
            >
              View Demo
              <ExternalLink size={14} />
            </a>
          ) : project.actionType === 'private' ? (
            <span
              className="inline-flex items-center gap-2 px-4 py-2 border border-border text-text-muted text-sm font-medium rounded-lg bg-bg/50 cursor-not-allowed"
            >
              Private Repository
              <Lock size={14} />
            </span>
          ) : (
            <a
              href={project.actionUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-border text-text-secondary text-sm font-medium rounded-lg hover:border-border-hover hover:text-text transition-colors"
            >
              View GitHub
              <Github size={14} />
            </a>
          )}
          {project.actionNote && (
            <p className="text-[11px] text-text-muted mt-2">
              {project.actionNote}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <Section id="projects" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>Work</SectionLabel>
        <h2 className="text-xl font-semibold text-text mb-10">Projects</h2>

        {FEATURED_PROJECTS.map((p) => (
          <FeaturedProject key={p.title} project={p} />
        ))}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Credentials ─── */

function Credentials() {
  return (
    <Section id="credentials" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>Credentials</SectionLabel>
        <h2 className="text-xl font-semibold text-text mb-10">Certifications</h2>

        <div className="space-y-0 border border-border rounded-lg bg-surface overflow-hidden divide-y divide-border">
          {CREDENTIALS.map((c) => (
            <div key={c.title} className="px-5 py-4 md:px-6 md:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-medium text-text">{c.title}</h3>
                <p className="text-sm text-text-muted">{c.sub}</p>
              </div>
              <span className="text-xs text-text-muted whitespace-nowrap">{c.date}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Footer ─── */

function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6 mt-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-text-muted">
          © {new Date().getFullYear()} Rafi Satria Pradana
        </span>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/Vinviri"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 text-text-muted hover:text-text transition-colors"
            aria-label="GitHub"
          >
            <Github size={14} />
          </a>
          <a
            href="https://www.linkedin.com/in/rafi-satria-pradana/"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 text-text-muted hover:text-text transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── App ─── */

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <TechStack />
        <Projects />
        <Credentials />
      </main>
      <Footer />
    </div>
  );
}
