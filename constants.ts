import { Project, Skill, MasteryItem, Service, ProcessStep, Article, Experiment } from './types';

export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#work' },
  { name: 'Lab', href: '#lab' },
  { name: 'Stack', href: '#services' },
  { name: 'Résumé', href: '#cv' },
  { name: 'Contact', href: '#contact' },
];

export const EXPERIMENTS_DATA: Experiment[] = [
  {
    id: 'e1',
    title: 'Jot: Cloud Notes',
    type: 'Live Beta',
    description: 'A distraction-free markdown note-taking app with biometric sync. Features local-first architecture for offline capability and end-to-end encryption.',
    date: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop',
    tech: ['React', 'IndexedDB', 'PWA']
  },
  {
    id: 'e2',
    title: 'Civitas: News Intelligence',
    type: 'Active Build',
    description: 'A sophisticated news synthesis platform built for information clarity. Aggregates global feeds using semantic clustering to identify narrative shifts and detect media bias in real-time.',
    date: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1504711432869-efd597cdd04d?q=80&w=800&auto=format&fit=crop',
    tech: ['Next.js', 'Tremor', 'LangChain', 'Edge Functions']
  },
  {
    id: 'e3',
    title: 'Pallet: Visual Engine',
    type: 'Public Beta',
    description: 'A high-performance visual discovery engine featuring a virtualized masonry grid for infinite media consumption. Implements collaborative mood boarding and semantic image analysis for aesthetic matching.',
    date: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    tech: ['Next.js', 'TanStack Virtual', 'Supabase', 'OpenAI Vision']
  },
  {
    id: 'e4',
    title: 'Desk: Support OS',
    type: 'SaaS Beta',
    description: 'Real-time customer support ticketing dashboard. Features automated SLA tracking, AI-powered response suggestions, and collision detection to prevent duplicate replies.',
    date: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1556740758-90de2929e5a1?q=80&w=800&auto=format&fit=crop',
    tech: ['React', 'Socket.io', 'Postgres']
  }
];

export const PROJECT_DATA: Project[] = [
  {
    id: 'p1',
    title: 'Eddix: Agile PM Ecosystem',
    subtitle: 'Project Management',
    description: 'A high-velocity project management ecosystem for agile teams. Features real-time WebSocket collaboration, drag-and-drop kanban boards, and automated sprint velocity tracking.',
    techStack: ['Next.js', 'Supabase', 'dnd-kit', 'Tailwind'],
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop', // Dashboard / UI
    link: 'https://pmeddix.netlify.app',
    status: 'Live'
  },
  {
    id: 'p2',
    title: 'LockedIn: Flow State Tools',
    subtitle: 'Productivity Suite',
    description: 'Minimalist productivity suite designed to induce flow states. Combines granular focus timers, ambient spatial audio, and distraction blocking into a unified PWA experience.',
    techStack: ['React', 'TypeScript', 'Framer Motion', 'Service Workers'],
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop', // Coding / Laptop / Focus
    link: 'https://eddy-mfon.github.io/LockedIn/',
    status: 'Live'
  },
  {
    id: 'p3',
    title: 'Nexus: Tech Commerce Frontend',
    subtitle: 'E-commerce Store',
    description: 'Next-generation headless commerce platform frontend. Features 3D product visualization, sub-second page transitions, and AI-driven personalization for high-end retail brands.',
    techStack: ['Next.js 14', 'Three.js', 'Stripe', 'Redis'],
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop', // Fashion / Ecommerce
    link: 'https://eddy-mfon.github.io/Nexus/',
    status: 'Live'
  },
  {
    id: 'p4',
    title: 'LynqBank: Integrated Banking App',
    subtitle: 'Full-Stack Application',
    description: 'A comprehensive digital banking solution features real-time transaction categorization, biometric security integration, and seamless peer-to-peer transfers wrapped in a fluid, gesture-driven interface.',
    techStack: ['React', 'TypeScript', 'Redux Toolkit', 'Framer Motion'],
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop', 
    link: 'https://lynqbanklp.netlify.app/',
    status: 'Live'
  },
  {
    id: 'p5',
    title: 'Eddy Templar',
    subtitle: 'High-End E-commerce',
    description: 'A minimalist digital flagship store defined by brutalist aesthetics and fluid user interactions. Features a custom cart implementation, smooth scroll physics, and optimized asset delivery for a seamless shopping experience.',
    techStack: ['React', 'GSAP', 'Shopify API', 'Tailwind'],
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop', // Fashion coat/luxury
    link: 'https://eddytemplarm.netlify.app/',
    status: 'Live'
  },
  {
    id: 'p6',
    title: 'Venue: Event System',
    subtitle: 'Booking Platform',
    description: 'A comprehensive event management system allowing users to discover, book, and manage events. Features interactive seat mapping, QR ticket generation, and integrated payment gateways.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Redis'],
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
    link: 'https://venuee.netlify.app/',
    status: 'Live'
  }
];

export const SKILLS_DATA: Skill[] = [
  { 
    category: 'Frontend & UI', 
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Figma'] 
  },
  { 
    category: 'Backend & Data', 
    items: ['Node.js', 'Python', 'SQL', 'RESTful APIs'] 
  },
  { 
    category: 'Architecture & Tooling', 
    items: ['Vercel', 'Netlify', 'Git', 'CI/CD Pipelines'] 
  },
  { 
    category: 'Emerging Tech', 
    items: ['AI Integration', 'WebGL', 'Three.js'] 
  },
];

export const MASTERY_DATA: MasteryItem[] = [
  {
    id: 'm1',
    title: 'VS Code',
    description: 'My primary IDE. Configured for maximum velocity with custom snippets, debugger integration, and AI copilots.'
  },
  {
    id: 'm2',
    title: 'Chrome DevTools',
    description: 'Beyond console.log. Deep profiling, memory leak detection, network waterfall analysis, and animation debugging.'
  },
  {
    id: 'm3',
    title: 'Git & GitHub',
    description: 'The time machine. Mastery of interactive rebase, cherry-picking, and managing complex branching strategies and CI/CD.'
  },
  {
    id: 'm4',
    title: 'Python & SQL',
    description: 'Data manipulation and backend logic. Building robust APIs and optimizing database queries for performance.'
  },
  {
    id: 'm5',
    title: 'HTML5 & Semantic Markup',
    description: 'The skeleton. Semantic markup, accessibility (ARIA) best practices, and modern SEO structures.'
  },
  {
    id: 'm6',
    title: 'CSS3 & Tailwind',
    description: 'The skin. Advanced layouts with Grid/Flexbox, custom properties, and buttery smooth animations.'
  },
  {
    id: 'm7',
    title: 'JavaScript (ES6+)',
    description: 'The muscle. Async/Await, closures, prototypes, and deep performance optimization without frameworks.'
  },
  {
    id: 'm8',
    title: 'React & Next.js',
    description: 'The engine. Deep knowledge of the reconciliation process, hooks, context, and server components.'
  },
  {
    id: 'm9',
    title: 'Performance & Core Web Vitals',
    description: 'Speed as a feature. Mastery of bundle optimization, critical path rendering, and sub-second TTI for high-fidelity apps.'
  },
  {
    id: 'm10',
    title: 'TypeScript',
    description: 'The shield. Enforcing type safety to catch errors at compile time and enable powerful IDE refactoring tools.'
  }
];

export const SERVICES_DATA: Service[] = [
  {
    id: 's1',
    title: 'Frontend Architecture',
    description: 'Building the skeleton. I plan and construct scalable React applications that are easy to maintain and extend.',
    icon: 'layout'
  },
  {
    id: 's2',
    title: 'Creative Development',
    description: 'Adding the magic. I implement smooth animations, micro-interactions, and 3D elements that delight users.',
    icon: 'zap'
  },
  {
    id: 's3',
    title: 'Component Libraries',
    description: 'Organizing the chaos. I create pixel-perfect, accessible component systems based on atomic design principles.',
    icon: 'layers'
  },
  {
    id: 's4',
    title: 'Performance Tuning',
    description: 'Speed is a feature. I optimize bundles, images, and rendering cycles to ensure sub-second load times.',
    icon: 'box'
  }
];

export const PROCESS_DATA: ProcessStep[] = [
  {
    id: 'step1',
    number: '01',
    title: 'Research',
    description: 'I dig deep into the problem. Understanding the user flow and technical constraints is the first line of code.'
  },
  {
    id: 'step2',
    number: '02',
    title: 'Prototype',
    description: 'Quick iterations in code. I test interactions and layouts early to validate ideas before committing to the final build.'
  },
  {
    id: 'step3',
    number: '03',
    title: 'Build',
    description: 'Clean, semantic, and type-safe code. I build components that are reusable and robust against edge cases.'
  },
  {
    id: 'step4',
    number: '04',
    title: 'Polish',
    description: 'The devil is in the details. Smoothing out transitions, adding keyboard support, and ensuring mobile responsiveness.'
  }
];