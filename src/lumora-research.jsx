import { useState, useEffect, useRef, useCallback } from "react";

const SITE_DATA = {
  name: "Lumora Research",
  tagline: "When AI meets people who can't afford bad design",
  subtagline: "I research how children, patients, older adults, and at-risk learners actually experience AI — then help teams build what works for them.",
  intro: "I'm a Human-Computer Interaction researcher with dual PhDs and 15+ peer-reviewed publications in CHI, CSCW, and IUI. My work sits at a specific intersection: AI systems designed for populations where getting it wrong has real consequences — children learning math, patients navigating health decisions, older adults managing chronic care, students on the verge of dropping out.",
  fellowship: "Research Fellow, Childhood and AI Lab — investigating how AI math tools calibrate difficulty for K–5 learners.",
  evidencePoints: [
    { number: "785+", label: "participants in my largest study", detail: "SEM analysis identifying Course Relevance to Career Goals as the #1 dropout predictor (β = –0.523)" },
    { number: "88.6%", label: "task success rate", detail: "Blind and visually impaired users composing messages with a screenless wearable — no prior training" },
    { number: "20+", label: "interviews with older adults & caregivers", detail: "Shaping AI voice assistant design for collaborative health management" },
    { number: "15", label: "AI math tools inventoried", detail: "Systematic evaluation of how K–5 tools calibrate to children's abilities" },
  ],
  approach: {
    philosophy: "Most UX research answers 'is it usable?' I start earlier: 'Is the AI calibrated to this person's actual capacity — their literacy, their trust level, their cognitive load, their autonomy?' That question changes every method choice downstream.",
    differentiators: [
      { title: "I design for the gap between AI confidence and human reality", desc: "AI systems often assume a competent, attentive, tech-literate user. My research focuses on what happens when that assumption breaks — with people who are 8 years old, or 80, or blind, or about to drop out." },
      { title: "I bring academic rigor to product timelines", desc: "Structural equation modeling, validated survey instruments, longitudinal tracking — but scoped to ship. My WGU retention study went from design to executive presentation in one quarter." },
      { title: "I move between healthcare, education, and accessibility", desc: "The calibration problem is the same across domains: how much should AI assist, when should it step back, and who decides? I've published on this in clinical, educational, and assistive technology contexts." },
    ],
    methods: [
      { name: "Discovery", items: "Contextual inquiry, participatory design, stakeholder alignment, competitive analysis" },
      { name: "Measurement", items: "SEM, Kano analysis, validated surveys, behavioral analytics, A/B testing" },
      { name: "Evaluation", items: "Wizard of Oz, usability studies, heuristic evaluations, in-situ testing" },
      { name: "Synthesis", items: "Research-to-action frameworks, personas, journey maps, design recommendations" },
    ],
  },
  selectedWork: [
    {
      title: "AI Voice Assistants for Older Adults' Health Management",
      context: "NSF-funded · Indiana University · Published at CHI & CSCW",
      domain: "Healthcare AI",
      image: "/images/older-adult.jpg",
      problem: "Older adults managing chronic conditions often forget, misunderstand, or feel overwhelmed by health information from physician visits. AI assistants could help — but existing designs assumed tech-literate, independent users.",
      what_i_did: "Led end-to-end research on 'Scribe,' an AI tool capturing patient-physician conversations. Conducted 20+ interviews, Wizard of Oz studies, participatory design workshops, and in-situ evaluations — always with older adults and their caregivers in the room, not as afterthoughts.",
      key_finding: "Older adults wanted AI that supported collaboration with caregivers, not autonomy from them. This directly contradicted the prevailing design assumption. The finding reshaped the entire platform architecture.",
      methods: ["Interviews", "Wizard of Oz", "Participatory Design", "Focus Groups", "Usability Testing"],
      impact: "Findings shaped a collaborative health management platform now in usability testing. Published at CHI and CSCW.",
    },
    {
      title: "Predicting Student Dropout at Scale",
      context: "Western Governors University · Informed institutional strategy",
      domain: "EdTech",
      image: "/images/withdrawal-consideration.png",
      problem: "WGU needed to know which students were most at risk of dropping out — and more importantly, what levers they could actually pull to intervene.",
      what_i_did: "Designed and ran a 785+ participant mixed-methods study using structural equation modeling. Built a validated survey instrument from scratch. Identified Course Relevance to Career Goals as the single strongest predictor of dropout intention.",
      key_finding: "Course Relevance to Career Goals had a standardized effect of β = –0.523 on dropout intention — nearly twice the effect of the next predictor. This gave leadership a clear, actionable priority: redesign the courses students find least relevant first.",
      methods: ["SEM", "Survey Design", "Statistical Modeling", "Longitudinal Analysis"],
      impact: "Directly prioritized which courses to redesign first. Presented findings to institutional leadership.",
    },
    {
      title: "Radiologist Interface Design for Automated Breast Ultrasound",
      context: "iSono Health · FDA-track medical device",
      domain: "Healthcare",
      image: "/images/createreport.png",
      problem: "An automated breast ultrasound system needed clinical interfaces that radiologists would actually trust and use — with regulatory requirements (IEC 62366-1) adding complexity to every design decision.",
      what_i_did: "Sole designer on the project. Created radiologist worklists, annotation tools, comparison interfaces, report builders, and a patient portal. Conducted competitive analysis across 6 existing systems and developed usability protocols aligned with human factors standards.",
      key_finding: "Radiologists needed annotation comparison as a first-class feature, not a modal afterthought — their diagnostic confidence depended on seeing historical context alongside current findings.",
      methods: ["Heuristic Evaluation", "Competitive Analysis", "Prototyping", "Human Factors Engineering"],
      impact: "Annotation tool and report builder shipped for clinical evaluation on an FDA-track device.",
    },
    {
      title: "TextFlow: Screenless Messaging for Blind Users",
      context: "NSF-funded · Indiana University · Published at IUI",
      domain: "Accessibility",
      image: "/images/textflow.jpg",
      problem: "Blind and visually impaired (BVI) users couldn't easily compose text messages while mobile — existing solutions required screen interaction that assumed sight.",
      what_i_did: "Created a context-aware auditory messaging system using a finger-worn device. No screen required. Conducted contextual inquiries with 30 BVI participants to understand messaging needs in real environments.",
      key_finding: "Context-awareness was the key enabler: by inferring situation (walking, in a meeting, at home), the system could adapt message composition to the user's available attention — achieving 88.6% task success with no prior training.",
      methods: ["Contextual Inquiry", "Wearable Prototyping", "Accessibility Testing"],
      impact: "88.6% task success rate. Published at IUI. Opened new research directions in screenless mobile interaction.",
    },
  ],
  services: [
    {
      id: "edtech",
      title: "Educational Technology Research",
      hook: "I helped WGU identify the single strongest predictor of student dropout across 785+ learners. I can help you understand what's actually driving outcomes in your product.",
      offerings: [
        "AI tool evaluations — how your product calibrates to different learners",
        "Retention & engagement research with validated instruments",
        "Child safety and trust calibration studies",
        "Competitive analysis across learning platforms",
        "Survey design and structural equation modeling",
      ],
    },
    {
      id: "healthcare",
      title: "Healthcare UX & Patient Safety",
      hook: "I've designed clinical interfaces for an FDA-track medical device and published research on AI-assisted health management. I bring both human factors rigor and regulatory awareness.",
      offerings: [
        "Medical device interface design (IEC 62366-1 aligned)",
        "Clinical workflow research and usability testing",
        "Patient portal and caregiver experience design",
        "AI trust calibration for vulnerable patient populations",
        "Accessibility evaluations and inclusive design",
      ],
    },
    {
      id: "accessibility",
      title: "Accessible & Inclusive Design Research",
      hook: "My TextFlow system achieved 88.6% task success with blind users — no training required. I research how technology can meet people where they are, not where designers assume they are.",
      offerings: [
        "Accessibility audits and WCAG compliance evaluation",
        "Inclusive design research with underserved populations",
        "Assistive technology prototyping and testing",
        "Screen reader and alternative input usability studies",
        "Universal design strategy and recommendations",
      ],
    },
  ],
  publications: {
    venues: "CHI, CSCW, IUI",
    note: "15+ peer-reviewed papers in top-tier HCI venues. My research consistently returns to one question: how should AI systems calibrate their assistance to preserve human autonomy?",
    link: "https://scholar.google.com/citations?user=CKEYI7IAAAAJ&hl=en",
    selected: [
      {
        theme: "AI–Human Collaboration & Calibration",
        papers: [
          { authors: "Karimi, P., Martin-Hammond, A.", year: 2025, title: "Designing Intelligent Voice Assistants for Older Adults' Collaborative Care: Exploring Supportive and Non-Supportive Interactions.", venue: "CSCW", acceptance: "25%" },
          { authors: "Karimi, P., Martin-Hammond, A.", year: 2025, title: "Finding the Right Balance: User Control and Automation in AI Tools for Supporting Older Adults' Health Information Tasks.", venue: "CHI Extended Abstracts", acceptance: "32%" },
          { authors: "Karimi, P., Rezwana, J., Siddiqui, S., Maher, M. L., Dehbozorgi, N.", year: 2020, title: "Creative Sketching Partner: An Analysis of Human-AI Co-Creativity.", venue: "IUI", acceptance: "23%" },
        ],
      },
      {
        theme: "Education Technology & Equity",
        papers: [
          { authors: "Beaux, H., Karimi, P., Pop, O., Clark, R.", year: 2024, title: "Guiding Empowerment Model: Liberating Neurodiversity in Online Higher Education.", venue: "IEEE FIE", acceptance: null },
        ],
      },
      {
        theme: "Accessible & Inclusive Technology",
        papers: [
          { authors: "Karimi, P., Plebani, E., Martin-Hammond, A., Bolchini, D.", year: 2022, title: "TextFlow: Toward Supporting Screen-free Manipulation of Situation-Relevant Smart Messages.", venue: "ACM TiiS", acceptance: "IF 3.4" },
          { authors: "Karimi, P., Plebani, E., Bolchini, D.", year: 2021, title: "TextFlow: Screenless Access to Non-Visual Smart Messaging.", venue: "IUI", acceptance: "26%" },
        ],
      },
    ],
  },
  degrees: [
    { label: "Ph.D., Human-Computer Interaction", org: "Indiana University Indianapolis, 2024" },
    { label: "Ph.D., Computing and Information Systems", org: "UNC Charlotte, 2019" },
    { label: "M.Sc., Telecommunication Engineering", org: "Politecnico di Milano, 2015" },
    { label: "B.Sc., Electrical and Electronic Engineering", org: "Shiraz University, 2010" },
  ],
  certificates: [
    { label: "Patient Safety Specialization", org: "Johns Hopkins University (Coursera)" },
    { label: "Human Factors & Usability Engineering", org: "Arizona State University" },
  ],
  experience: [
    { role: "Senior Program Experience Researcher", org: "Western Governors University", period: "2024 – Present", desc: "Leading large-scale retention research, AI satisfaction studies, and course redesign initiatives." },
    { role: "Research Fellow", org: "Childhood and AI Lab", period: "2026 – Present", desc: "Investigating how AI math tools calibrate difficulty for K–5 learners." },
    { role: "UX Design Researcher", org: "iSono Health", period: "2025 – 2026", desc: "Sole designer on FDA-track automated breast ultrasound clinical interfaces." },
  ],
  contact: {
    email: "pekarimi67@gmail.com",
    linkedin: "https://www.linkedin.com/in/pegah-karimi-9194b4126",
    scholar: "https://scholar.google.com/citations?user=CKEYI7IAAAAJ&hl=en",
  },
  portfolioUrl: "https://pegahkarimi.vercel.app",
};

/* ── Logo ── */
let _logoId = 0;
function DawnArcLogo({ size = 32 }) {
  const [uid] = useState(() => `la${++_logoId}`);
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}_ag`} x1="2" y1="24" x2="30" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1B4332" />
          <stop offset="50%" stopColor="#2D6A4F" />
          <stop offset="100%" stopColor="#52B788" />
        </linearGradient>
        <linearGradient id={`${uid}_rg`} x1="16" y1="0" x2="16" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#74C69D" />
          <stop offset="100%" stopColor="#2D6A4F" />
        </linearGradient>
      </defs>
      <path d="M2 25 Q16 -3 30 25" stroke={`url(#${uid}_ag)`} strokeWidth="3" strokeLinecap="round" fill="none"/>
      <line x1="16" y1="7" x2="16" y2="0" stroke={`url(#${uid}_rg)`} strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="7" y1="11" x2="3" y2="5" stroke={`url(#${uid}_rg)`} strokeWidth="1.8" strokeLinecap="round" opacity="0.8"/>
      <line x1="25" y1="11" x2="29" y2="5" stroke={`url(#${uid}_rg)`} strokeWidth="1.8" strokeLinecap="round" opacity="0.8"/>
      <line x1="10" y1="17" x2="4" y2="14" stroke={`url(#${uid}_rg)`} strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/>
      <line x1="22" y1="17" x2="28" y2="14" stroke={`url(#${uid}_rg)`} strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/>
      <circle cx="16" cy="10" r="2.2" fill="#52B788" opacity="0.18"/>
    </svg>
  );
}

/* ── Page transition with focus management ── */
function PageTransition({ children, pageKey }) {
  const [show, setShow] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setShow(false);
    const t = requestAnimationFrame(() => requestAnimationFrame(() => setShow(true)));
    // Focus management for accessibility
    const focusTimer = setTimeout(() => {
      const heading = containerRef.current?.querySelector("h1");
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
    }, 100);
    return () => { cancelAnimationFrame(t); clearTimeout(focusTimer); };
  }, [pageKey]);

  return <div ref={containerRef} className={`page-transition ${show ? "visible" : ""}`}>{children}</div>;
}

/* ── Smooth accordion with measured height ── */
function useAccordion() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const bodyRefs = useRef({});

  const toggle = useCallback((index) => {
    setExpandedIndex(prev => prev === index ? null : index);
  }, []);

  const getBodyStyle = useCallback((index) => {
    if (expandedIndex === index) {
      const el = bodyRefs.current[index];
      const height = el ? el.scrollHeight : 1200;
      return { maxHeight: `${height}px`, opacity: 1 };
    }
    return { maxHeight: 0, opacity: 0 };
  }, [expandedIndex]);

  const setBodyRef = useCallback((index, el) => {
    bodyRefs.current[index] = el;
  }, []);

  return { expandedIndex, toggle, getBodyStyle, setBodyRef };
}

/* ── Sidebar ── */
function Sidebar({ currentPage, onNavigate }) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "approach", label: "How I Work" },
    { id: "work", label: "Selected Work" },
    { id: "services", label: "Services" },
    { id: "publications", label: "Publications" },
    { id: "credentials", label: "Credentials" },
  ];
  return (
    <aside className="sidebar" role="navigation" aria-label="Main navigation">
      <div className="sidebar-top">
        <button className="sidebar-brand" onClick={() => onNavigate("home")} aria-label="Go to homepage" style={{cursor:"pointer",border:"none",background:"none",padding:0}}>
          <DawnArcLogo size={34} />
          <div className="sidebar-name"><span className="brand-bold">Lumora</span> <span className="brand-light">Research</span></div>
        </button>
        <div className="sidebar-headshot">
          <div className="headshot-img-wrap">
            <img src="/images/headshot.jpg" alt="Pegah Karimi" className="headshot-img" />
          </div>
          <div className="sidebar-person-name">Pegah Karimi, Ph.D.</div>
        </div>
        <nav className="sidebar-nav" aria-label="Site sections">
          {navItems.map(({ id, label }) => (
            <button key={id} onClick={() => onNavigate(id)} className={`sidebar-link ${currentPage === id ? "active" : ""}`} aria-current={currentPage === id ? "page" : undefined}>
              <span className="sidebar-link-indicator" aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>
      </div>
      <div className="sidebar-bottom">
        <a href={SITE_DATA.portfolioUrl} target="_blank" rel="noopener noreferrer" className="sidebar-portfolio-link">View Portfolio &rarr;</a>
        <a href="/files/PKarimi_CV.pdf" target="_blank" rel="noopener noreferrer" className="sidebar-cv-link">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          View CV
        </a>
        <div className="sidebar-contact-row">
          <a href={`mailto:${SITE_DATA.contact.email}`} className="sidebar-icon-link" title="Email" aria-label="Send email"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13L2 4"/></svg></a>
          <a href={SITE_DATA.contact.linkedin} target="_blank" rel="noopener noreferrer" className="sidebar-icon-link" title="LinkedIn" aria-label="LinkedIn profile"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
          <a href={SITE_DATA.contact.scholar} target="_blank" rel="noopener noreferrer" className="sidebar-icon-link" title="Google Scholar" aria-label="Google Scholar profile"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12L12 2l10 10"/><path d="M12 22V12"/><circle cx="12" cy="18" r="4"/></svg></a>
        </div>
      </div>
    </aside>
  );
}

/* ── Mobile Nav with outside-click handling ── */
function MobileNav({ currentPage, onNavigate }) {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const navItems = [
    { id: "home", label: "Home" },{ id: "approach", label: "How I Work" },{ id: "work", label: "Selected Work" },{ id: "services", label: "Services" },{ id: "publications", label: "Publications" },{ id: "credentials", label: "Credentials" },
  ];

  // Close menu on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [open]);

  // Close menu on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <div className="mobile-nav" ref={navRef}>
      <div className="mobile-nav-bar">
        <button className="mobile-brand" onClick={() => { onNavigate("home"); setOpen(false); }} style={{cursor:"pointer",border:"none",background:"none",padding:0}} aria-label="Go to homepage">
          <DawnArcLogo size={24} /><span><span className="brand-bold">Lumora</span> <span className="brand-light">Research</span></span>
        </button>
        <button className="mobile-menu-btn" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></> : <><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></>}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="mobile-dropdown" role="navigation" aria-label="Mobile navigation">
          {navItems.map(({ id, label }) => (
            <button key={id} onClick={() => { onNavigate(id); setOpen(false); }} className={`mobile-link ${currentPage === id ? "mobile-link-active" : ""}`} aria-current={currentPage === id ? "page" : undefined}>{label}</button>
          ))}
          <a href={SITE_DATA.portfolioUrl} target="_blank" rel="noopener noreferrer" className="mobile-link portfolio">View Portfolio &rarr;</a>
        </nav>
      )}
    </div>
  );
}

/* ── Back to Home ── */
function BackToHome({ onNavigate }) {
  return (
    <button className="back-home" onClick={() => onNavigate("home")} aria-label="Back to homepage">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      <span>Home</span>
    </button>
  );
}

/* ── Contact Footer (reusable across pages) ── */
function ContactFooter({ variant = "default" }) {
  const messages = {
    default: "Interested in collaborating? I'd welcome a conversation.",
    services: "Have a project where the research needs to be rigorous and the users are complex?",
    work: "Want to discuss how this kind of research could help your team?",
    publications: "Interested in my research or potential collaboration?",
    credentials: "Looking for a researcher with this background?",
  };
  return (
    <section className="content-section contact-section-wrap contact-footer">
      <div className="contact-footer-inner">
        <p className="contact-footer-text">{messages[variant]}</p>
        <a href={`mailto:${SITE_DATA.contact.email}`} className="contact-cta">
          <span>Get in touch</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </section>
  );
}

/* ════════════════════ PAGE: HOME ════════════════════ */
function HomePage({ onNavigate }) {
  return (
    <>
      <div className="hero-inline">
        <h1 className="hero-tagline">{SITE_DATA.tagline}</h1>
        <p className="hero-sub">{SITE_DATA.subtagline}</p>
        <span className="hero-accent-line" aria-hidden="true" />
      </div>

      <section className="content-section">
        <p className="intro-text">{SITE_DATA.intro}</p>
        <div className="fellowship-badge">
          <span className="fellowship-dot" aria-hidden="true" />
          <p className="fellowship-text">{SITE_DATA.fellowship}</p>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Research by the Numbers</h2>
        <div className="evidence-grid">
          {SITE_DATA.evidencePoints.map((e, i) => (
            <div key={i} className="evidence-card">
              <div className="evidence-number">{e.number}</div>
              <div className="evidence-label">{e.label}</div>
              <div className="evidence-detail">{e.detail}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Domains</h2>
        <div className="domain-strip" role="list">
          {["Children & AI Safety", "Healthcare AI", "Older Adult Technology", "Student Retention", "Accessibility", "Medical Devices", "Human Factors"].map((d, i) => (
            <span key={i} className="domain-tag" role="listitem">{d}</span>
          ))}
        </div>
      </section>

      <section className="content-section explore-section">
        <h2 className="section-title">Explore</h2>
        <div className="explore-grid">
          {[
            { id: "approach", label: "How I Work", desc: "What makes my research different" },
            { id: "work", label: "Selected Work", desc: "Four projects, real outcomes" },
            { id: "services", label: "Services", desc: "EdTech, Healthcare & Accessibility" },
            { id: "publications", label: "Publications", desc: "CHI, CSCW, IUI & more" },
          ].map(item => (
            <button key={item.id} className="explore-card" onClick={() => onNavigate(item.id)}>
              <div className="explore-card-label">{item.label}</div>
              <div className="explore-card-desc">{item.desc}</div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="explore-arrow" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          ))}
        </div>
      </section>

      <section className="content-section contact-section-wrap">
        <h2 className="section-title">Get in Touch</h2>
        <p className="contact-text">I take on consulting engagements in educational technology research, healthcare UX, and accessible design — particularly where AI systems interact with vulnerable or underserved populations. If you're building something where the stakes are high and the users are complex, I'd welcome a conversation.</p>
        <a href={`mailto:${SITE_DATA.contact.email}`} className="contact-cta">
          <span>{SITE_DATA.contact.email}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </section>
    </>
  );
}

/* ════════════════════ PAGE: HOW I WORK ════════════════════ */
function ApproachPage({ onNavigate }) {
  return (
    <>
      <BackToHome onNavigate={onNavigate} />
      <div className="page-header">
        <h1 className="page-title">How I Work</h1>
        <p className="page-subtitle">What makes my research different</p>
      </div>

      <section className="content-section">
        <p className="approach-philosophy">{SITE_DATA.approach.philosophy}</p>
      </section>

      <section className="content-section">
        <h2 className="section-title">What I Bring</h2>
        <div className="diff-list">
          {SITE_DATA.approach.differentiators.map((d, i) => (
            <div key={i} className="diff-card">
              <h3 className="diff-title">{d.title}</h3>
              <p className="diff-desc">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Methods Toolkit</h2>
        <div className="methods-compact">
          {SITE_DATA.approach.methods.map((m, i) => (
            <div key={i} className="method-row">
              <span className="method-name">{m.name}</span>
              <span className="method-items">{m.items}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section quote-section-inner">
        <blockquote className="research-quote">
          <div className="quote-mark" aria-hidden="true">&ldquo;</div>
          <p className="quote-text">Older adults wanted AI that supported collaboration with caregivers, not autonomy from them. That single finding — from 20 interviews — reshaped an entire platform's architecture.</p>
          <footer className="quote-attr">— From my CHI/CSCW research on AI-assisted health management</footer>
        </blockquote>
      </section>

      <ContactFooter variant="default" />
    </>
  );
}

/* ════════════════════ PAGE: SELECTED WORK ════════════════════ */
function WorkPage({ onNavigate }) {
  const { expandedIndex, toggle, getBodyStyle, setBodyRef } = useAccordion();

  return (
    <>
      <BackToHome onNavigate={onNavigate} />
      <div className="page-header">
        <h1 className="page-title">Selected Work</h1>
        <p className="page-subtitle">Four projects across healthcare, education, and accessibility — each involving people where the design stakes are highest.</p>
      </div>
      <section className="content-section">
        <div className="work-list">
          {SITE_DATA.selectedWork.map((w, i) => (
            <div key={i} className={`work-item ${expandedIndex === i ? "work-expanded" : ""}`}>
              {/* FIX: Only the header triggers expand/collapse */}
              <button
                className="work-item-header"
                onClick={() => toggle(i)}
                aria-expanded={expandedIndex === i}
                aria-controls={`work-body-${i}`}
              >
                <span className="work-domain-chip">{w.domain}</span>
                <div className="work-item-meta">
                  <h3 className="work-item-title">{w.title}</h3>
                  <span className="work-item-context">{w.context}</span>
                </div>
                <div className={`work-chevron ${expandedIndex === i ? "open" : ""}`} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </button>
              <div
                className="work-item-body"
                id={`work-body-${i}`}
                ref={(el) => setBodyRef(i, el)}
                style={getBodyStyle(i)}
                role="region"
                aria-labelledby={`work-title-${i}`}
              >
                <div className="work-body-inner">
                  <div className={`work-image-wrap ${w.image.includes("withdrawal") ? "work-image-wide" : ""}`}>
                    <img src={w.image} alt={w.title} className="work-image" loading="lazy" />
                  </div>

                  <div className="work-detail-row">
                    <div className="work-detail-label">The Problem</div>
                    <p className="work-detail-text">{w.problem}</p>
                  </div>
                  <div className="work-detail-row">
                    <div className="work-detail-label">What I Did</div>
                    <p className="work-detail-text">{w.what_i_did}</p>
                  </div>
                  <div className="work-detail-row work-finding-row">
                    <div className="work-detail-label">Key Finding</div>
                    <p className="work-detail-text work-finding-text">{w.key_finding}</p>
                  </div>

                  <div className="work-methods" role="list" aria-label="Methods used">{w.methods.map((m, j) => (<span key={j} className="work-method-tag" role="listitem">{m}</span>))}</div>

                  <div className="work-outcome">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}} aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>{w.impact}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContactFooter variant="work" />
    </>
  );
}

/* ════════════════════ PAGE: SERVICES ════════════════════ */
function ServicesPage({ onNavigate }) {
  return (
    <>
      <BackToHome onNavigate={onNavigate} />
      <div className="page-header">
        <h1 className="page-title">Services</h1>
        <p className="page-subtitle">Consulting engagements grounded in published research and real outcomes</p>
      </div>
      {SITE_DATA.services.map((s) => (
        <section key={s.id} className="content-section">
          <h2 className="section-title">{s.title}</h2>
          <p className="service-hook">{s.hook}</p>
          <div className="service-offerings">
            {s.offerings.map((o, i) => (
              <div key={i} className="offering-row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="offering-check" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                <span>{o}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
      <ContactFooter variant="services" />
    </>
  );
}

/* ════════════════════ PAGE: PUBLICATIONS ════════════════════ */
function PublicationsPage({ onNavigate }) {
  return (
    <>
      <BackToHome onNavigate={onNavigate} />
      <div className="page-header">
        <h1 className="page-title">Publications</h1>
        <p className="page-subtitle">Peer-reviewed research</p>
      </div>
      <section className="content-section">
        <div className="pub-card">
          <div className="pub-venues-row">
            {SITE_DATA.publications.venues.split(", ").map((v, i) => (<span key={i} className="pub-venue-chip">{v}</span>))}
          </div>
          <p className="pub-note">{SITE_DATA.publications.note}</p>
          <a href={SITE_DATA.publications.link} target="_blank" rel="noopener noreferrer" className="text-link">
            View full list on Google Scholar
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft:6,verticalAlign:'middle'}} aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </a>
        </div>
      </section>
      {SITE_DATA.publications.selected.map((group, gi) => (
        <section key={gi} className="content-section">
          <h3 className="pub-theme-title">{group.theme}</h3>
          <div className="pub-papers-list">
            {group.papers.map((p, pi) => (
              <div key={pi} className="pub-paper">
                <div className="pub-paper-title">{p.title}</div>
                <div className="pub-paper-meta">
                  <span className="pub-paper-authors">{p.authors}</span>
                  <span className="pub-paper-year">{p.year}</span>
                </div>
                <div className="pub-paper-venue-row">
                  <span className="pub-paper-venue">{p.venue}</span>
                  {p.acceptance && <span className="pub-paper-acceptance">{p.acceptance}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
      <ContactFooter variant="publications" />
    </>
  );
}

/* ════════════════════ PAGE: CREDENTIALS ════════════════════ */
function CredentialsPage({ onNavigate }) {
  return (
    <>
      <BackToHome onNavigate={onNavigate} />
      <div className="page-header">
        <h1 className="page-title">Credentials</h1>
        <p className="page-subtitle">Education, experience & certifications</p>
      </div>

      {/* NEW: Professional Experience section */}
      <section className="content-section">
        <div className="credentials-group">
          <div className="credentials-group-label">Recent Experience</div>
          <div className="credentials-list">
            {SITE_DATA.experience.map((e, i) => (
              <div key={i} className="credential-row experience-row">
                <div className="experience-header">
                  <span className="credential-label">{e.role}</span>
                  <span className="experience-period">{e.period}</span>
                </div>
                <span className="credential-org">{e.org}</span>
                <span className="experience-desc">{e.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="credentials-group">
          <div className="credentials-group-label">Education</div>
          <div className="credentials-list">
            {SITE_DATA.degrees.map((c, i) => (<div key={i} className="credential-row"><span className="credential-label">{c.label}</span><span className="credential-org">{c.org}</span></div>))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="credentials-group">
          <div className="credentials-group-label">Certifications</div>
          <div className="credentials-list">
            {SITE_DATA.certificates.map((c, i) => (<div key={i} className="credential-row"><span className="credential-label">{c.label}</span><span className="credential-org">{c.org}</span></div>))}
          </div>
        </div>
      </section>

      <section className="content-section contact-section-wrap">
        <div className="cv-download-block" style={{marginTop:0,paddingTop:0,borderTop:'none'}}>
          <div className="cv-download-inner">
            <div className="cv-download-text">
              <div className="cv-download-title">Full CV</div>
              <div className="cv-download-desc">Detailed experience, publications, and research history</div>
            </div>
            <a href="/files/PKarimi_CV.pdf" target="_blank" rel="noopener noreferrer" className="cv-download-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              View PDF
            </a>
          </div>
        </div>
      </section>

      <ContactFooter variant="credentials" />
    </>
  );
}

/* ════════ STYLES ════════ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Source+Sans+3:wght@300;400;500;600&display=swap');

:root{
  --font-display:'Cormorant Garamond',Georgia,serif;
  --font-body:'Source Sans 3','Source Sans Pro',system-ui,sans-serif;
  --sidebar-w:260px;

  --c-bg:#FAFAF7;
  --c-surface:#FFFFFF;
  --c-warm-bg:#F5F3EE;
  --c-border:rgba(180,170,155,.2);

  --c-accent:#1B4332;
  --c-accent-mid:#2D6A4F;
  --c-accent-light:rgba(45,106,79,.12);
  --c-accent-lighter:rgba(45,106,79,.06);
  --c-accent-bright:#52B788;
  --c-accent-hl:rgba(45,106,79,.25);

  --c-text:#2C2C2C;
  --c-text-secondary:#555;
  --c-text-tertiary:#888;
}

*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:var(--font-body);color:var(--c-text);background:var(--c-bg);line-height:1.65;font-size:18px;-webkit-font-smoothing:antialiased}

/* FOCUS STYLES FOR ACCESSIBILITY */
*:focus-visible{outline:2px solid var(--c-accent-mid);outline-offset:2px;border-radius:4px}
h1:focus{outline:none}

.site-layout{display:flex;min-height:100vh;background:radial-gradient(ellipse 80% 50% at 75% 8%,rgba(27,67,50,.04) 0%,transparent 70%),radial-gradient(ellipse 60% 40% at 15% 85%,rgba(180,160,130,.04) 0%,transparent 70%),var(--c-bg)}

/* PAGE TRANSITION */
.page-transition{opacity:0;transform:translateY(12px);transition:opacity .4s cubic-bezier(.16,1,.3,1),transform .4s cubic-bezier(.16,1,.3,1)}
.page-transition.visible{opacity:1;transform:translateY(0)}

/* SIDEBAR */
.sidebar{width:var(--sidebar-w);position:fixed;top:0;left:0;bottom:0;background:var(--c-surface);border-right:1px solid var(--c-border);display:flex;flex-direction:column;justify-content:space-between;padding:36px 28px 32px;z-index:100}
.sidebar-brand{display:flex;align-items:center;gap:10px;margin-bottom:36px}
.sidebar-name{font-family:var(--font-display);font-size:20px;color:var(--c-accent);line-height:1.2;letter-spacing:-.01em}
.brand-bold{font-weight:700;letter-spacing:.01em}
.brand-light{font-weight:400;color:var(--c-accent-mid);letter-spacing:.02em}
.sidebar-headshot{display:flex;flex-direction:column;align-items:center;margin-bottom:28px}
.headshot-img-wrap{width:100px;height:100px;border-radius:50%;overflow:hidden;border:2.5px solid var(--c-accent-light);margin-bottom:12px;transition:border-color .3s,transform .3s;box-shadow:0 2px 12px rgba(27,67,50,.08)}
.headshot-img-wrap:hover{border-color:var(--c-accent-mid);transform:scale(1.03)}
.headshot-img{width:100%;height:100%;object-fit:cover;object-position:center 30%}
.sidebar-person-name{font-size:14.5px;font-weight:500;color:var(--c-text);text-align:center}
.sidebar-nav{display:flex;flex-direction:column;gap:1px}
.sidebar-link{background:none;border:none;cursor:pointer;font-family:var(--font-body);font-size:15px;font-weight:400;color:var(--c-text-secondary);text-align:left;padding:8px 12px;border-radius:6px;transition:all .25s cubic-bezier(.4,0,.2,1);display:flex;align-items:center;gap:10px}
.sidebar-link-indicator{width:4px;height:4px;border-radius:50%;background:transparent;transition:all .3s cubic-bezier(.4,0,.2,1);flex-shrink:0}
.sidebar-link:hover{background:var(--c-accent-lighter);color:var(--c-accent-mid)}
.sidebar-link:hover .sidebar-link-indicator{background:var(--c-accent-mid);opacity:.4}
.sidebar-link.active{background:var(--c-accent-light);color:var(--c-accent);font-weight:600}
.sidebar-link.active .sidebar-link-indicator{background:var(--c-accent-bright);width:6px;height:6px;opacity:1;box-shadow:0 0 6px rgba(82,183,136,.4)}
.sidebar-bottom{display:flex;flex-direction:column;gap:16px}
.sidebar-portfolio-link{font-size:14.5px;font-weight:500;color:var(--c-accent-mid);text-decoration:none;padding:10px 12px;border:1px solid var(--c-accent-light);border-radius:6px;text-align:center;transition:all .25s}
.sidebar-portfolio-link:hover{background:var(--c-accent);color:white;border-color:var(--c-accent)}
.sidebar-cv-link{font-size:14px;font-weight:500;color:var(--c-text-secondary);text-decoration:none;padding:8px 12px;border-radius:6px;text-align:center;transition:all .25s;display:flex;align-items:center;justify-content:center;gap:8px;border:1px solid var(--c-border)}
.sidebar-cv-link:hover{background:var(--c-warm-bg);color:var(--c-accent-mid);border-color:var(--c-accent-light)}
.sidebar-contact-row{display:flex;gap:12px;padding:0 12px}
.sidebar-icon-link{color:var(--c-text-tertiary);transition:all .25s;padding:4px;border-radius:4px}
.sidebar-icon-link:hover{color:var(--c-accent-mid);background:var(--c-accent-lighter)}

/* MOBILE */
.mobile-nav{display:none;position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(255,255,255,.92);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--c-border)}
.mobile-nav-bar{display:flex;align-items:center;justify-content:space-between;padding:12px 20px}
.mobile-brand{display:flex;align-items:center;gap:8px;font-family:var(--font-display);font-size:18px;color:var(--c-accent)}
.mobile-menu-btn{background:none;border:none;cursor:pointer;color:var(--c-text);padding:4px}
.mobile-dropdown{display:flex;flex-direction:column;padding:8px 20px 16px;gap:2px;animation:slideDown .25s ease-out}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
.mobile-link{background:none;border:none;cursor:pointer;font-family:var(--font-body);font-size:15px;color:var(--c-text-secondary);text-align:left;padding:10px 0;text-decoration:none;min-height:44px;display:flex;align-items:center}
.mobile-link-active{color:var(--c-accent);font-weight:600}
.mobile-link.portfolio{color:var(--c-accent-mid);font-weight:500;margin-top:8px;padding-top:12px;border-top:1px solid var(--c-border)}

/* MAIN */
.main-content{margin-left:var(--sidebar-w);flex:1;padding:80px 6vw 100px}

/* HERO */
.hero-inline{margin-bottom:56px;padding-bottom:48px;border-bottom:1px solid var(--c-border)}
.hero-tagline{font-family:var(--font-display);font-size:clamp(34px,5vw,54px);font-weight:600;line-height:1.18;letter-spacing:-.02em;color:var(--c-text)}
.hero-sub{font-size:18.5px;color:var(--c-text-secondary);line-height:1.7;margin-top:20px;max-width:680px}
.hero-accent-line{display:block;width:56px;height:3px;background:linear-gradient(90deg,var(--c-accent-bright),var(--c-accent-mid),transparent);margin-top:28px;border-radius:2px}

/* PAGE HEADERS */
.back-home{display:none;align-items:center;gap:6px;background:none;border:none;cursor:pointer;font-family:var(--font-body);font-size:14.5px;font-weight:500;color:var(--c-accent-mid);padding:6px 12px 6px 8px;border-radius:6px;margin-bottom:20px;transition:all .25s}
.back-home:hover{background:var(--c-accent-lighter);color:var(--c-accent)}
.back-home svg{transition:transform .25s}
.back-home:hover svg{transform:translateX(-3px)}
.page-header{margin-bottom:48px;padding-bottom:40px;border-bottom:1px solid var(--c-border)}
.page-title{font-family:var(--font-display);font-size:clamp(36px,5vw,52px);font-weight:700;color:var(--c-accent);letter-spacing:-.02em;line-height:1.15}
.page-subtitle{font-size:17px;color:var(--c-text-tertiary);margin-top:8px;letter-spacing:.02em;line-height:1.6;max-width:640px}

/* SECTIONS */
.content-section{margin-bottom:48px;padding-bottom:40px;border-bottom:1px solid var(--c-border)}
.content-section:last-child{border-bottom:none}
.section-title{font-family:var(--font-display);font-size:34px;font-weight:700;color:var(--c-accent);margin-bottom:28px;letter-spacing:-.01em;display:flex;align-items:center;gap:14px}
.section-title::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,var(--c-accent-light),transparent);max-width:120px}

/* INTRO / FELLOWSHIP */
.intro-text{font-size:18.5px;color:var(--c-text-secondary);line-height:1.8;margin-bottom:24px}
.fellowship-badge{display:flex;align-items:center;gap:12px;padding:16px 20px;background:linear-gradient(135deg,var(--c-accent-lighter) 0%,rgba(216,243,220,.5) 100%);border-radius:10px;border-left:3px solid var(--c-accent-mid)}
.fellowship-dot{width:8px;height:8px;border-radius:50%;background:var(--c-accent-bright);flex-shrink:0;animation:pulse 2.5s ease-in-out 3}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
.fellowship-text{font-size:17px;font-style:italic;color:var(--c-accent-mid);line-height:1.65;margin:0}

/* EVIDENCE GRID */
.evidence-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.evidence-card{padding:24px;border-radius:12px;background:var(--c-surface);border:1px solid var(--c-border);transition:all .3s cubic-bezier(.4,0,.2,1)}
.evidence-card:hover{border-color:var(--c-accent-light);box-shadow:0 4px 20px rgba(27,67,50,.06);transform:translateY(-2px)}
.evidence-number{font-family:var(--font-display);font-size:42px;font-weight:700;color:var(--c-accent);line-height:1;margin-bottom:6px;letter-spacing:-.02em}
.evidence-label{font-size:15px;font-weight:600;color:var(--c-text);margin-bottom:8px;line-height:1.3}
.evidence-detail{font-size:14px;color:var(--c-text-tertiary);line-height:1.55}

/* DOMAIN STRIP — no hover interaction (not clickable) */
.domain-strip{display:flex;flex-wrap:wrap;gap:10px}
.domain-tag{font-size:15px;color:var(--c-accent-mid);background:var(--c-accent-lighter);padding:8px 20px;border-radius:24px;line-height:1.4;font-weight:500;border:1px solid var(--c-accent-light)}

/* EXPLORE GRID */
.explore-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.explore-card{background:var(--c-surface);border:1px solid var(--c-border);border-radius:10px;padding:20px 22px;text-align:left;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1);position:relative;display:flex;flex-direction:column;gap:4px;font-family:inherit}
.explore-card:hover{border-color:var(--c-accent-light);box-shadow:0 4px 20px rgba(27,67,50,.06);transform:translateY(-2px)}
.explore-card-label{font-family:var(--font-display);font-size:20px;font-weight:600;color:var(--c-accent)}
.explore-card-desc{font-size:15px;color:var(--c-text-tertiary);line-height:1.4}
.explore-arrow{position:absolute;top:20px;right:20px;color:var(--c-text-tertiary);transition:all .25s}
.explore-card:hover .explore-arrow{color:var(--c-accent-mid);transform:translateX(3px)}

/* APPROACH / DIFFERENTIATORS */
.approach-philosophy{font-size:18px;color:var(--c-text-secondary);line-height:1.8;font-style:italic;padding:24px 28px;background:var(--c-warm-bg);border-radius:10px;border-left:3px solid var(--c-accent-mid)}
.diff-list{display:flex;flex-direction:column;gap:20px}
.diff-card{padding:24px 28px;border-radius:12px;background:var(--c-surface);border:1px solid var(--c-border);transition:all .3s}
.diff-card:hover{border-color:var(--c-accent-light);box-shadow:0 4px 20px rgba(27,67,50,.06)}
.diff-title{font-family:var(--font-display);font-size:21px;font-weight:600;color:var(--c-accent);margin-bottom:10px;line-height:1.35}
.diff-desc{font-size:16px;color:var(--c-text-secondary);line-height:1.7}

/* METHODS COMPACT */
.methods-compact{display:flex;flex-direction:column;gap:0}
.method-row{display:flex;align-items:baseline;gap:16px;padding:16px 0;border-bottom:1px solid var(--c-border)}
.method-row:last-child{border-bottom:none}
.method-name{font-family:var(--font-display);font-size:18px;font-weight:600;color:var(--c-accent);min-width:120px;flex-shrink:0}
.method-items{font-size:15px;color:var(--c-text-secondary);line-height:1.55}

/* SERVICES */
.service-hook{font-size:17px;color:var(--c-text-secondary);line-height:1.8;margin-bottom:24px;padding:20px 24px;background:var(--c-warm-bg);border-radius:10px;border-left:3px solid var(--c-accent-bright)}
.service-offerings{display:flex;flex-direction:column;gap:12px}
.offering-row{display:flex;align-items:flex-start;gap:12px;font-size:16px;color:var(--c-text);line-height:1.5}
.offering-check{color:var(--c-accent-bright);flex-shrink:0;margin-top:3px}
.service-cta-block{text-align:center;padding:40px 0}
.service-cta-text{font-family:var(--font-display);font-size:24px;font-weight:500;color:var(--c-text);margin-bottom:24px;line-height:1.4}

/* WORK — FIXED: header is now a button, body is non-interactive */
.work-list{display:flex;flex-direction:column;gap:12px}
.work-item{border:1px solid var(--c-border);border-radius:10px;background:var(--c-surface);overflow:hidden;transition:all .3s cubic-bezier(.4,0,.2,1)}
.work-item:hover{border-color:var(--c-accent-light);box-shadow:0 4px 16px rgba(27,67,50,.05)}
.work-item-header{display:flex;align-items:center;gap:16px;padding:20px 24px;width:100%;border:none;background:none;cursor:pointer;text-align:left;font-family:inherit;min-height:56px}
.work-item-header:hover{background:var(--c-accent-lighter)}
.work-domain-chip{font-size:11.5px;font-weight:600;color:var(--c-accent-mid);background:var(--c-accent-lighter);padding:4px 12px;border-radius:20px;flex-shrink:0;text-transform:uppercase;letter-spacing:.06em;min-width:130px;text-align:center}
.work-item-meta{flex:1;min-width:0}
.work-item-title{font-family:var(--font-display);font-size:18px;font-weight:600;color:var(--c-text);line-height:1.3}
.work-item-context{font-size:14px;color:var(--c-text-tertiary);margin-top:2px;display:block}
.work-chevron{flex-shrink:0;color:var(--c-text-tertiary);transition:transform .3s}
.work-chevron.open{transform:rotate(180deg)}
.work-item-body{overflow:hidden;transition:max-height .45s cubic-bezier(.4,0,.2,1),opacity .35s ease}
.work-body-inner{padding:0 24px 24px}
.work-expanded{border-color:var(--c-accent-hl)}
.work-image-wrap{margin-bottom:16px;border-radius:8px;overflow:hidden;border:1px solid var(--c-border);background:var(--c-warm-bg);max-width:720px}
.work-image-wrap.work-image-wide{max-width:820px;padding:12px}
.work-image{width:100%;height:auto;display:block;transition:transform .4s cubic-bezier(.4,0,.2,1)}
.work-image:hover{transform:scale(1.02)}
.work-detail-row{margin-bottom:16px}
.work-detail-label{font-family:var(--font-body);font-size:12.5px;font-weight:600;color:var(--c-text-tertiary);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px}
.work-detail-text{font-size:15px;color:var(--c-text-secondary);line-height:1.65;margin:0}
.work-finding-row{padding:16px 20px;background:linear-gradient(135deg,var(--c-accent-lighter) 0%,rgba(216,243,220,.4) 100%);border-radius:8px;border-left:3px solid var(--c-accent-bright)}
.work-finding-row .work-detail-label{color:var(--c-accent-mid)}
.work-finding-text{color:var(--c-accent)!important;font-weight:500}
.work-methods{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
.work-method-tag{font-size:11.5px;color:var(--c-accent-mid);background:var(--c-accent-lighter);padding:4px 12px;border-radius:20px;font-weight:500}
.work-outcome{display:flex;align-items:flex-start;gap:8px;font-size:14.5px;font-weight:500;color:var(--c-accent-mid);line-height:1.5}

/* PUBLICATIONS */
.pub-card{padding:24px 28px;background:var(--c-surface);border:1px solid var(--c-border);border-radius:12px}
.pub-venues-row{display:flex;gap:8px;margin-bottom:16px}
.pub-venue-chip{display:inline-flex;align-items:center;padding:5px 14px;background:linear-gradient(135deg,var(--c-accent) 0%,var(--c-accent-mid) 100%);color:white;font-size:13.5px;font-weight:600;border-radius:20px;letter-spacing:.04em}
.pub-note{font-size:16px;color:var(--c-text-secondary);line-height:1.7;margin-bottom:16px}
.pub-theme-title{font-family:var(--font-display);font-size:20px;font-weight:600;color:var(--c-accent);margin-bottom:16px}
.pub-papers-list{display:flex;flex-direction:column;gap:16px}
.pub-paper{padding:16px 20px;background:var(--c-surface);border:1px solid var(--c-border);border-radius:10px;transition:border-color .25s}
.pub-paper:hover{border-color:var(--c-accent-light)}
.pub-paper-title{font-size:15.5px;font-weight:500;color:var(--c-text);line-height:1.55;margin-bottom:8px}
.pub-paper-meta{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.pub-paper-authors{font-size:14px;color:var(--c-text-tertiary);line-height:1.4}
.pub-paper-year{font-size:13.5px;font-weight:600;color:var(--c-accent-mid);background:var(--c-accent-lighter);padding:2px 8px;border-radius:10px;flex-shrink:0}
.pub-paper-venue-row{display:flex;align-items:center;gap:8px}
.pub-paper-venue{font-size:13.5px;font-weight:600;color:var(--c-accent);letter-spacing:.03em}
.pub-paper-acceptance{font-size:12.5px;color:var(--c-text-tertiary);font-style:italic}
.text-link{font-size:15.5px;font-weight:500;color:var(--c-accent-mid);text-decoration:none;transition:all .25s;display:inline-flex;align-items:center}
.text-link:hover{color:var(--c-accent);transform:translateX(2px)}

/* CREDENTIALS */
.credentials-group-label{font-family:var(--font-body);font-size:12.5px;font-weight:600;color:var(--c-text-tertiary);text-transform:uppercase;letter-spacing:.1em;margin-bottom:12px}
.credentials-list{display:flex;flex-direction:column}
.credential-row{display:flex;flex-direction:column;padding:14px 0;border-bottom:1px solid var(--c-border);transition:padding-left .25s}
.credential-row:hover{padding-left:6px}
.credential-row:last-child{border-bottom:none}
.credential-label{font-size:16px;font-weight:500;color:var(--c-text);line-height:1.4}
.credential-org{font-size:14.5px;color:var(--c-text-tertiary);margin-top:2px}

/* Experience additions */
.experience-row{gap:4px}
.experience-header{display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap}
.experience-period{font-size:13.5px;font-weight:500;color:var(--c-accent-mid);white-space:nowrap}
.experience-desc{font-size:14px;color:var(--c-text-secondary);line-height:1.55;margin-top:4px}

/* CV DOWNLOAD */
.cv-download-block{margin-top:36px;padding-top:28px;border-top:1px solid var(--c-border)}
.cv-download-inner{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;background:var(--c-surface);border:1px solid var(--c-border);border-radius:12px;transition:all .3s}
.cv-download-inner:hover{border-color:var(--c-accent-light);box-shadow:0 4px 16px rgba(27,67,50,.05)}
.cv-download-title{font-family:var(--font-display);font-size:20px;font-weight:600;color:var(--c-accent);margin-bottom:2px}
.cv-download-desc{font-size:14.5px;color:var(--c-text-tertiary)}
.cv-download-btn{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-body);font-size:15px;font-weight:500;color:white;background:linear-gradient(135deg,var(--c-accent) 0%,var(--c-accent-mid) 100%);text-decoration:none;padding:10px 22px;border-radius:8px;transition:all .3s cubic-bezier(.4,0,.2,1);flex-shrink:0}
.cv-download-btn:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(27,67,50,.2)}

/* QUOTE */
.quote-section-inner{border-bottom:none!important}
.research-quote{position:relative;padding:36px 40px;background:linear-gradient(135deg,var(--c-accent) 0%,#224B3A 100%);border-radius:14px;color:white;overflow:hidden}
.research-quote::before{content:'';position:absolute;top:-30px;right:-30px;width:120px;height:120px;border-radius:50%;background:rgba(82,183,136,.08)}
.research-quote::after{content:'';position:absolute;bottom:-20px;left:-20px;width:80px;height:80px;border-radius:50%;background:rgba(82,183,136,.06)}
.quote-mark{font-family:var(--font-display);font-size:56px;font-weight:700;line-height:1;color:var(--c-accent-bright);opacity:.15;position:absolute;top:16px;left:24px;pointer-events:none}
.quote-text{font-family:var(--font-display);font-size:23px;font-weight:500;font-style:italic;line-height:1.5;color:rgba(255,255,255,.95);position:relative;z-index:1;margin:0;padding-top:40px}
.quote-attr{font-family:var(--font-body);font-size:13.5px;color:rgba(255,255,255,.45);margin-top:16px;letter-spacing:.04em;position:relative;z-index:1}

/* CONTACT */
.contact-section-wrap{border-bottom:none!important}
.contact-text{font-size:16px;color:var(--c-text-secondary);line-height:1.78;margin-bottom:28px}
.contact-cta{display:inline-flex;align-items:center;gap:12px;font-size:17px;font-weight:500;color:white;background:linear-gradient(135deg,var(--c-accent) 0%,var(--c-accent-mid) 100%);text-decoration:none;padding:16px 32px;border-radius:8px;transition:all .3s cubic-bezier(.4,0,.2,1)}
.contact-cta:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(27,67,50,.22)}
.contact-cta svg{transition:transform .25s}
.contact-cta:hover svg{transform:translateX(4px)}

/* Contact footer (reusable) */
.contact-footer{margin-top:8px}
.contact-footer-inner{text-align:center;padding:32px 0 8px}
.contact-footer-text{font-family:var(--font-display);font-size:22px;font-weight:500;color:var(--c-text);margin-bottom:20px;line-height:1.4}

/* RESPONSIVE */
@media(max-width:860px){
  .sidebar{display:none}
  .mobile-nav{display:block}
  .back-home{display:inline-flex}
  .main-content{margin-left:0;padding:80px 24px 60px;max-width:100%}
  .evidence-grid{grid-template-columns:1fr}
  .explore-grid{grid-template-columns:1fr 1fr}
  .diff-list{gap:14px}
  .diff-card{padding:20px}
  .work-item-header{padding:16px 18px;min-height:56px}
  .work-expanded .work-body-inner{padding:0 18px 20px}
  .research-quote{padding:24px 24px}
  .quote-text{font-size:18.5px}
  .method-row{flex-direction:column;gap:4px}
  .method-name{min-width:auto}
  .mobile-link{padding:12px 0;min-height:44px}
  .mobile-menu-btn{min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center}
  .cv-download-inner{flex-direction:column;gap:16px;text-align:center}
  .experience-header{flex-direction:column;gap:2px}
}
@media(max-width:500px){
  .explore-grid{grid-template-columns:1fr}
  .evidence-grid{grid-template-columns:1fr}
  .main-content{padding:72px 18px 48px}
  .research-quote{padding:20px 18px}
  .quote-text{font-size:17px;line-height:1.65}
  .diff-card{padding:16px}
  .work-item-header{padding:14px 16px}
  .work-expanded .work-body-inner{padding:0 16px 18px}
  .work-image{max-height:180px;object-fit:cover}
  .work-image-wide .work-image{max-height:220px;object-fit:contain}
}
@media(hover:none) and (pointer:coarse){
  .diff-card:hover{transform:none;box-shadow:none}
  .explore-card:hover{transform:none;box-shadow:none}
  .work-item:hover{border-color:var(--c-border)}
  .work-expanded:hover,.work-expanded{border-color:var(--c-accent-hl)}
  .sidebar-link:hover{background:none}
  .contact-cta:active{transform:scale(0.98)}
}
`;

/* ── App Root ── */
export default function LumoraResearch() {
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "approach": return <ApproachPage onNavigate={navigate} />;
      case "work": return <WorkPage onNavigate={navigate} />;
      case "services": return <ServicesPage onNavigate={navigate} />;
      case "publications": return <PublicationsPage onNavigate={navigate} />;
      case "credentials": return <CredentialsPage onNavigate={navigate} />;
      default: return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="site-layout">
        <Sidebar currentPage={currentPage} onNavigate={navigate} />
        <MobileNav currentPage={currentPage} onNavigate={navigate} />
        <main className="main-content">
          <PageTransition pageKey={currentPage}>
            {renderPage()}
          </PageTransition>
        </main>
      </div>
    </>
  );
}
