// Single source of truth for everything the site displays (desktop + mobile).

// Desktop screen order (must match SCREEN_COMPONENTS in App.jsx).
export const SCREENS = ['Overview', 'Profile', 'Experience', 'Skills', 'Projects', 'Academics', 'Achievements'];

export const links = {
  github: 'https://github.com/KroNicalKODER',
  linkedin: 'https://www.linkedin.com/in/kronikalkodar',
  leetcode: 'https://leetcode.com/KronikalKodar/',
  codechef: 'https://www.codechef.com/users/kronikalkodar',
  email: 'mradul18varshney@gmail.com',
};

// Overview: rotating title. First word is shown big, the rest in red below it.
export const roles = [
  { t1: 'BACKEND', t2: 'Engineer' },
  { t1: 'PLATFORM', t2: 'Builder' },
  { t1: 'AI-AGENT', t2: 'Tooling' },
  { t1: 'FULL-STACK', t2: 'Developer' },
];

export const profileBio = [
  "Software Engineer at NatWest Group, working on the platform team in Java/Spring and Python/FastAPI. I own the backend services I build end to end: design, release management, reviews, and being the person people ping when something breaks.",
  "Outside work I build systems for AI agents. Chopper records an agent's computer work once and replays it with zero AI calls; Cypher lets me drive coding agents on my laptop from my phone. I also ship full-stack and mobile apps.",
  'B.Tech CSE from JIIT Noida (2025). 600+ DSA problems, top 9% on LeetCode, 3★ on CodeChef.',
];

export const experience = [
  {
    slug: 'natwest',
    name: 'NatWest Group',
    current: true,
    role: 'SOFTWARE ENGINEER',
    company: 'NatWest Group · Gurugram',
    period: 'Jun 2025 – Present',
    // Summary under the orbit, left → right (Platform is the core, in the middle).
    highlights: [
      { value: 'FluxNova', label: 'Orchestration', sub: 'Open source · Spring Boot · Kafka' },
      { value: 'Platform', label: 'Platform team', sub: 'Python services · Spring Boot services' },
      { value: 'Power Automate', label: 'Automation', sub: 'FastAPI service · ownership' },
    ],
    // Full log overlay: one flat list.
    points: [
      'Contributing in the platform services: design, release management, PR reviews, and a point of contact for teams building on them.',
      'Python (FastAPI) services on MongoDB, reused across teams. MongoDB schema and index design; co-built and maintain the shared MongoDB wrapper.',
      'Built a shared security library and signing-key service for service-to-service authentication, reused across platform services.',
      'About 5x backend throughput by replacing synchronous auth calls and adding in-server caching and concurrent execution. Verified with JMeter and Locust.',
      'Contributing to FluxNova, the FINOS open-source workflow orchestration engine (Java/Spring), including its bill of materials (BOM).',
      'Designed a contract-based messaging abstraction over Kafka: teams swap message brokers without code changes. Offset management, message peeking and starving-message handling. In production.',
      'Own an enterprise workflow-automation integration service (FastAPI) end to end.',
      'Built an email integration over OAuth 2.0 and webhooks.',
      'Applied Saga orchestration to multi-step workflows; led design discussions on idempotency, race conditions and dual writes.'
    ],
  },
  {
    slug: 'ccbul',
    name: 'CCBUL',
    role: 'WEB DEVELOPMENT INTERN',
    highlights: [
      { value: 'Legal', label: 'Case portal', sub: 'Built for lawyers' },
      { value: 'Social', label: 'Networking app', sub: 'PHP · MySQL · AJAX' },
    ],
    company: 'CCBUL',
    period: 'Apr 2024 – Aug 2024',
    points: [
      'Built a case management portal for lawyers to create and track cases.',
      'Built a social networking web app. PHP, MySQL, JavaScript, AJAX.',
    ],
  },
];

// Skills planet. logo = filename in components/Skill/images/Stack (null = text badge).
export const skillGroups = [
  {
    id: 'backend',
    label: 'BACKEND',
    items: [
      { name: 'Spring Boot', logo: 'spring' },
      { name: 'FastAPI', logo: 'fastapi' },
      { name: 'Kafka', logo: 'apachekafka' },
      { name: 'MongoDB', logo: 'mongodb' },
      { name: 'Node.js', logo: 'nodedotjs' },
      { name: 'PostgreSQL', logo: 'postgresql' },
      { name: 'Redis', logo: 'redis' },
    ],
  },
  {
    id: 'ai',
    label: 'AI & AGENTS',
    items: [
      { name: 'MCP', logo: 'modelcontextprotocol' },
      { name: 'LangChain', logo: 'langchain' },
      { name: 'Playwright', logo: null, short: 'PW' },
      { name: 'RAG', logo: null, short: 'RAG' },
      { name: 'LangGraph', logo: null, short: 'LG' },
      { name: 'UI Automation', logo: null, short: 'UIA' },
    ],
  },
  {
    id: 'languages',
    label: 'LANGUAGES',
    items: [
      { name: 'Java', logo: 'openjdk' },
      { name: 'Python', logo: 'python' },
      { name: 'TypeScript', logo: 'typescript' },
      { name: 'C++', logo: 'cplusplus' },
      { name: 'Dart', logo: 'dart' },
      { name: 'SQL', logo: 'mysql' },
    ],
  },
  {
    id: 'tools',
    label: 'ALSO KNOWS',
    items: [
      { name: 'Docker', logo: 'docker' },
      { name: 'AWS', logo: null, short: 'AWS' },
      { name: 'Vault', logo: 'vault' },
      { name: 'JWT / JWKS', logo: 'jsonwebtokens' },
      { name: 'JMeter', logo: 'apachejmeter' },
      { name: 'React', logo: 'react' },
      { name: 'Flutter', logo: 'flutter' },
      { name: 'Firebase', logo: 'firebase' },
    ],
  },
];

// Projects. image = /static/ProjectImages/<slug>.svg. link = null when the repo is private.
export const projects = [
  {
    slug: 'chopper',
    title: 'Chopper',
    message: 'AI agents do computer work once; Chopper verifies it and replays it later with zero AI calls.',
    extras: 'Python, FastAPI, MCP, Playwright, Win32 UIA',
    status: 'In development',
    link: null,
  },
  {
    slug: 'cypher',
    title: 'Cypher',
    message: 'Drive coding agents on your laptop from your phone. Vendor-agnostic adapters, git-isolated tasks.',
    extras: 'TypeScript, Node.js, SQLite, Flutter',
    status: 'Early stage',
    link: null,
  },
  {
    slug: 'tagzo',
    title: 'Tagzo',
    message: 'Never go alone. Find someone to tag along for any plan. Async FastAPI backend + Flutter / React Native apps.',
    extras: 'FastAPI, MongoDB, Flutter, React Native, React',
    status: null,
    link: null,
  },
  {
    slug: 'truststamp',
    title: 'TrustStamp',
    message: 'Social platform with blockchain content provenance and a deep-learning image tampering detector.',
    extras: 'MERN, Blockchain, Deep Learning',
    status: null,
    link: 'https://github.com/KroNicalKODER/truststamp2',
  },
  {
    slug: 'parallel-rag',
    title: 'Parallel-RAG',
    message: 'Multi-agent RAG with parallel retrieval and LLM orchestration.',
    extras: 'Python, LLMs, RAG',
    status: null,
    link: 'https://github.com/KroNicalKODER/Parallel-RAG',
  },
  {
    slug: 'multiagent-scraper',
    title: 'Multi-Agent Scraper',
    message: 'LangChain + LangGraph agents that coordinate to scrape and summarise.',
    extras: 'LangChain, LangGraph, Python',
    status: null,
    link: 'https://github.com/KroNicalKODER/Langchain---LangGraph---MultiAgentScraper',
  },
  {
    slug: 'video-rag',
    title: 'Video RAG',
    message: 'Ask questions over video content with retrieval-augmented generation.',
    extras: 'Python, RAG',
    status: null,
    link: 'https://github.com/KroNicalKODER/video-rag',
  },
  {
    slug: '2ndshop',
    title: '2nd Shop',
    message: 'A C2C buying and selling platform with payments.',
    extras: 'MERN, Tailwind CSS, Razorpay',
    status: null,
    link: 'https://github.com/KroNicalKODER/2ndShop',
  },
];

export const academics = [
  { title: 'B.Tech, Computer Science (2025)', subtitle: 'Jaypee Institute of Information Technology, Noida · CGPA 8.4 / 10' },
  { title: 'JEE Mains and Advanced', subtitle: 'Qualified' },
  { title: 'Class 12 (PCM, CBSE)', subtitle: 'Assisi Convent School · 95%' },
  { title: 'Class 10 (CBSE)', subtitle: 'Assisi Convent School · 93%' },
];

export const achievements = [
  { title: '600+ PROBLEMS SOLVED', subtitle: 'LeetCode, GFG and other platforms · 300+ day coding streak' },
  { title: 'TOP 9% ON LEETCODE · 3★ CODECHEF', subtitle: 'Competitive programming', href: links.leetcode },
  { title: 'TECHNICAL WRITING', subtitle: 'Published articles on LLMs, RAG, reinforcement learning and transformers' },
  { title: 'HEAD OF DIGITAL DESIGN', subtitle: 'Parola, the literary hub of JIIT Noida' },
];
