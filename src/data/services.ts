// Services. Each service gets its own page (/services/<slug>/) with FAQs and structured data.

import type { Faq } from "./posts";

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: string;
  headline: string;
  answer: string; // answer-first definition (AEO / generative engines)
  intro: string;
  features: string[];
  tags: string[];
  deliverables: string[];
  process: [string, string][];
  faqs: Faq[];
  projects: string[]; // related project slugs
  posts: string[]; // related blog slugs
  keywords: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    short: "Fast, SEO-ready websites and web apps built with modern frameworks.",
    icon: "🌐",
    headline: "Web development for startups and growing businesses",
    answer:
      "Web development is the design, building and maintenance of websites and web applications. After Layoff builds fast, secure, SEO-ready business websites, e-commerce stores and SaaS web apps using React, Next.js, Node.js and PostgreSQL.",
    intro:
      "From a five-page company website to a multi-tenant SaaS dashboard, we build web products that load fast, rank well and are easy for your team to manage. Every project starts with a clear scope and a fixed or capped estimate.",
    features: ["Business & corporate websites", "SaaS products and dashboards", "E-commerce and payments", "CMS & headless builds", "API and backend development", "Performance, accessibility & SEO optimisation"],
    tags: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL"],
    deliverables: ["Responsive design for all devices", "Technical SEO and structured data", "Analytics and tracking setup", "Source code and documentation handed over to you"],
    process: [["Discover", "Goals, users, content and technical needs."], ["Design", "Wireframes and UI approved before any code."], ["Build", "Weekly demos, clean code and tests."], ["Launch & grow", "Deployment, monitoring and ongoing improvements."]],
    faqs: [
      { q: "How long does it take to build a website?", a: "A brochure website takes about 2–4 weeks, an e-commerce store 4–8 weeks and a web app or SaaS MVP 8–12 weeks, depending on scope." },
      { q: "Which technologies do you use for web development?", a: "We mainly use React and Next.js for the front end, Node.js and Python for backends and PostgreSQL for data, hosted on AWS, Vercel or similar platforms." },
      { q: "Will my website be SEO-friendly?", a: "Yes. We build with server-rendered or statically generated pages, fast load times, clean semantic HTML, metadata and structured data from day one." },
      { q: "Do I own the website code?", a: "Yes. All source code, designs and IP are transferred to you on final payment." },
    ],
    projects: ["darshan-dye-chem", "web-design", "teamsync"],
    posts: ["website-cost-india"],
    keywords: ["web development company India", "website development Ahmedabad", "Next.js development", "SaaS development"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    short: "iOS & Android apps from a single codebase — smooth and store-ready.",
    icon: "📱",
    headline: "Mobile app development for iOS and Android",
    answer:
      "Mobile app development is building apps for phones and tablets. After Layoff creates cross-platform iOS and Android apps with Flutter and React Native, from design to App Store and Play Store launch and ongoing maintenance.",
    intro:
      "We design and build mobile apps that feel native, work offline when needed and are ready for the app stores. One codebase means faster delivery and lower cost without compromising quality.",
    features: ["Cross-platform apps (Flutter, React Native)", "Offline-first and real-time sync", "Push notifications", "Payments and in-app purchases", "App Store / Play Store launch", "Maintenance and updates"],
    tags: ["Flutter", "React Native", "Firebase"],
    deliverables: ["UI/UX design for mobile", "iOS and Android builds", "Store listing support", "Analytics and crash reporting"],
    process: [["Discover", "Users, flows and platform needs."], ["Design", "Mobile UI/UX and prototype."], ["Build", "Iterative builds you can test on your phone."], ["Launch", "Store submission and post-launch support."]],
    faqs: [
      { q: "How much does it cost to build a mobile app?", a: "Cost depends on features and platforms. A focused MVP typically takes 10–14 weeks; we share a fixed or capped estimate after a free discovery call." },
      { q: "Do you build for both iOS and Android?", a: "Yes. Using Flutter or React Native we deliver both from a single codebase." },
      { q: "Can you publish the app on the App Store and Play Store?", a: "Yes. We prepare the builds, listings and screenshots and guide the submission process." },
    ],
    projects: ["prage", "atoma", "innerpeace"],
    posts: [],
    keywords: ["mobile app development company India", "Flutter app development", "iOS Android app development"],
  },
  {
    slug: "ai-automation",
    title: "AI & Automation",
    short: "Chatbots, LLM integrations and workflows that save hours.",
    icon: "🤖",
    headline: "AI, LLM and automation solutions for business",
    answer:
      "AI and automation services apply large language models and workflow automation to real business tasks. After Layoff builds AI chatbots, RAG knowledge assistants, AI agents, document processing and workflow automation using Python, LLM APIs and vector databases.",
    intro:
      "We focus on practical AI: one clear process, a measurable result and a human in the loop. From a support chatbot grounded in your documents to agents that complete multi-step tasks, we build, evaluate and secure AI features so they are reliable in production.",
    features: ["Custom chatbots and assistants", "LLM and RAG integrations", "AI agents and tool use", "Document processing and data extraction", "Workflow automation (n8n, Zapier, custom)", "WhatsApp and website AI agents", "AI strategy workshops", "AI safety, privacy and guardrails"],
    tags: ["Python", "LLM APIs", "Vector DBs", "FastAPI", "n8n / Zapier"],
    deliverables: ["Evaluated prototype in 2–4 weeks", "Guardrails and human hand-off", "Usage and cost monitoring", "Documentation and team training"],
    process: [["Pick the use case", "One repetitive process with a clear metric."], ["Prototype", "Small pilot with your real data."], ["Evaluate", "Test set of real questions; measure accuracy."], ["Deploy & improve", "Monitoring, guardrails and weekly review."]],
    faqs: [
      { q: "What AI services does After Layoff offer?", a: "We build AI chatbots, RAG knowledge assistants, AI agents, document-processing pipelines and workflow automation, and run AI strategy workshops." },
      { q: "How long does it take to build an AI chatbot?", a: "A simple FAQ bot can be live in 1–2 weeks; a custom, integrated assistant usually takes 6–10 weeks." },
      { q: "Is my company data safe when using LLMs?", a: "We design for privacy: least-privilege access, no training on your data under business terms, optional self-hosted models and full audit logs." },
      { q: "Should we use RAG or fine-tuning?", a: "Start with RAG when the model needs your information; consider fine-tuning only when you need a consistent style or specialised behaviour." },
    ],
    projects: ["supportbot", "opsflow"],
    posts: ["llms-for-business-what-works", "ai-agents-explained", "rag-vs-fine-tuning", "build-ai-chatbot-for-business", "safe-ai-privacy-for-companies", "ai-for-small-business"],
    keywords: ["AI development company India", "LLM integration services", "AI chatbot development", "AI agents for business", "RAG development"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    short: "Migrations, CI/CD and infrastructure that stays up and stays lean.",
    icon: "☁️",
    headline: "Cloud migration and DevOps services",
    answer:
      "Cloud and DevOps services move applications to the cloud and automate how software is built, tested and deployed. After Layoff offers cloud migration, CI/CD pipelines, infrastructure as code, monitoring, security hardening and cost optimisation on AWS, Azure and GCP.",
    intro:
      "Reliable infrastructure should be boring. We containerise, automate and monitor your systems so releases are safe, downtime is rare and cloud bills stay predictable.",
    features: ["Cloud migration", "CI/CD pipelines", "Infrastructure as code", "Monitoring and alerting", "Security hardening", "Cost optimisation", "Docker and Kubernetes setup", "Backups and disaster recovery", "Server, hosting and domain setup", "24/7 uptime monitoring and support"],
    tags: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Grafana"],
    deliverables: ["Automated build-test-deploy pipeline", "Reproducible environments in code", "Dashboards and alerts", "Runbooks and rollback plan"],
    process: [["Assess", "Review current infrastructure and risks."], ["Automate", "CI/CD and infrastructure as code."], ["Migrate", "Blue-green or phased cutover."], ["Operate", "Monitoring, cost review and support."]],
    faqs: [
      { q: "What is CI/CD?", a: "CI/CD automatically builds and tests every code change and deploys it when tests pass, replacing manual uploads and reducing risk." },
      { q: "Can you reduce our cloud bill?", a: "Usually yes. We right-size resources, remove waste, set budgets and alerts, and use managed services where they make financial sense." },
      { q: "Which cloud providers do you work with?", a: "AWS, Microsoft Azure and Google Cloud, plus simpler hosting such as Vercel, Hostinger and DigitalOcean for smaller projects." },
    ],
    projects: ["cloudshift", "pipelinex"],
    posts: ["what-is-devops-for-startups"],
    keywords: ["DevOps services India", "cloud migration services", "CI/CD setup", "AWS consulting"],
  },
  {
    slug: "ui-ux-design",
    title: "UI / UX Design",
    short: "Interfaces people love — research-led, tested and built to convert.",
    icon: "🎨",
    headline: "UI/UX design for web and mobile products",
    answer:
      "UI/UX design shapes how a digital product looks and works. After Layoff provides user research, user flows, wireframes, high-fidelity UI, design systems, prototypes and developer handoff in Figma for web, mobile and SaaS products.",
    intro:
      "Our designers start with the problem — who is using this, what are they trying to do and what gets in their way — then design clear flows, calm interfaces and consistent systems that developers can build faster.",
    features: ["User research and journeys", "Wireframes and prototypes", "Design systems", "Brand and visual identity", "Usability testing", "Design-to-code handoff"],
    tags: ["Figma", "Design Systems", "Prototyping", "Lottie"],
    deliverables: ["User flows and wireframes", "High-fidelity screens (desktop and mobile)", "Reusable component library", "Developer-ready specs and assets"],
    process: [["Understand", "Problem, users and goals."], ["Structure", "User flows and information architecture."], ["Design", "Wireframes, UI and design system."], ["Refine", "Test, improve and hand off to developers."]],
    faqs: [
      { q: "What is the difference between UI and UX?", a: "UX is how a product works and feels to use (flows, structure, usability); UI is how it looks (layout, colour, typography, components)." },
      { q: "Do you design in Figma?", a: "Yes. We deliver Figma files with components, a design system and developer handoff." },
      { q: "Can you redesign an existing app or website?", a: "Yes. We audit the current experience, find friction points and redesign flows and screens while keeping what already works." },
    ],
    projects: ["prage", "atoma", "teamsync", "smart-hoist-system", "warehouse-asset-management"],
    posts: ["ux-design-process"],
    keywords: ["UI UX design agency India", "app design Ahmedabad", "Figma design services", "SaaS dashboard design"],
  },
  {
    slug: "social-media-design",
    title: "Social Media Design & Management",
    short: "Posts, carousels and campaign creatives that build your brand.",
    icon: "📲",
    headline: "Social media design and content creatives",
    answer:
      "Social media design creates the posts, carousels, stories and campaign graphics a brand publishes online. After Layoff designs consistent, scroll-stopping creatives for Instagram, Facebook, LinkedIn and more, including monthly content calendars and ad creatives.",
    intro:
      "A consistent look builds trust. We have designed posts and campaign creatives for 10+ brands across healthcare, technology, real estate, art, food & beverage and education.",
    features: ["Posts, carousels and stories", "Monthly content calendars", "Festival and campaign creatives", "Reel and video cover designs", "Ad creatives for Meta and Google", "Page setup and profile branding"],
    tags: ["Figma", "Photoshop", "Canva", "Adobe Express"],
    deliverables: ["Brand-consistent templates", "Ready-to-publish creatives in all formats", "Monthly content calendar", "Editable source files"],
    process: [["Brief", "Brand, audience and goals."], ["Plan", "Content calendar and templates."], ["Design", "Creatives for each format."], ["Review", "Feedback, revisions and delivery."]],
    faqs: [
      { q: "Which social platforms do you design for?", a: "Instagram, Facebook, LinkedIn, X and YouTube, in square, portrait and story formats." },
      { q: "Do you provide a monthly content plan?", a: "Yes. We can deliver a monthly content calendar with ready-to-publish creatives." },
      { q: "Can I get the editable files?", a: "Yes. Source files are shared so your team can edit templates later." },
    ],
    projects: ["social-media-design"],
    posts: ["social-media-for-small-business"],
    keywords: ["social media design agency", "social media creatives India", "Instagram post design", "content calendar design"],
  },
  {
    slug: "graphic-design-branding",
    title: "Graphic Design & Branding",
    short: "Logos, brand kits, brochures and print — sharp everywhere.",
    icon: "✒️",
    headline: "Logo design, branding and print design",
    answer:
      "Graphic design and branding create a business's visual identity: logo, colours, typography, stationery and print. After Layoff designs logos, complete brand kits, letterheads, brochures, company profiles, packaging and presentations.",
    intro:
      "A logo is the start, not the finish. We build identities that work on screens, documents, signage and uniforms, so every touchpoint looks like it belongs to the same trusted company.",
    features: ["Logo and brand identity", "Stationery and letterheads", "Brochures and company profiles", "Packaging and label design", "Banners, flyers and posters", "Presentation and pitch decks"],
    tags: ["Illustrator", "Photoshop", "CorelDRAW", "Figma"],
    deliverables: ["Logo in all versions and file formats", "Colour and typography guidelines", "Print-ready files", "Brand application mockups"],
    process: [["Discover", "Business, audience and competitors."], ["Concepts", "Logo and identity directions."], ["Refine", "Chosen direction polished and extended."], ["Deliver", "Brand kit and print-ready files."]],
    faqs: [
      { q: "What is included in a brand identity?", a: "A logo system, colour palette, typography, stationery, brochure or company profile, and social and website styling." },
      { q: "Do you provide print-ready files?", a: "Yes. We deliver print-ready files with the correct bleed and colour profiles, plus editable source files." },
      { q: "Can you design brochures and company profiles?", a: "Yes. For example, we have designed a 16-page product brochure and complete brand kits for engineering and cold-chain companies." },
    ],
    projects: ["branding-and-print", "web-design"],
    posts: ["logo-and-brand-identity"],
    keywords: ["logo design India", "branding agency Ahmedabad", "brochure design", "brand identity design"],
  },
  {
    slug: "tech-consulting",
    title: "Tech Talent & Consulting",
    short: "Embed our engineers or get a clear technology roadmap.",
    icon: "🧑‍💻",
    headline: "Technology consulting and dedicated developers",
    answer:
      "Tech consulting and talent services give companies senior engineering help without a full-time hire. After Layoff offers dedicated developers, staff augmentation, architecture and code reviews, technical due diligence, MVP planning and CTO-as-a-service.",
    intro:
      "Need extra hands for a project or a second opinion on your architecture? Our engineers can join your team, review your code or help you plan an MVP and a realistic technical roadmap.",
    features: ["Dedicated developers", "Staff augmentation", "Code and architecture reviews", "Technical due diligence", "CTO-as-a-service", "MVP planning"],
    tags: ["Monthly retainers", "Fixed-scope projects", "Time & material"],
    deliverables: ["Clear scope and engagement model", "Regular reports and demos", "Documentation and knowledge transfer", "Flexible scaling of the team"],
    process: [["Scope", "Understand needs and constraints."], ["Match", "Right engineers and engagement model."], ["Embed", "Work as an extension of your team."], ["Review", "Regular demos, reports and adjustments."]],
    faqs: [
      { q: "What engagement models do you offer?", a: "Fixed scope for well-defined projects, time & material for evolving work, and a dedicated monthly team for long-term products." },
      { q: "Can we hire your developers on a monthly basis?", a: "Yes. Dedicated developers are available on monthly retainers with flexible scaling." },
      { q: "Do you offer CTO-as-a-service?", a: "Yes. We provide fractional technical leadership: architecture decisions, hiring support, roadmaps and vendor reviews." },
    ],
    projects: ["supportbot", "cloudshift"],
    posts: ["laid-off-start-it-company"],
    keywords: ["staff augmentation India", "dedicated developers", "CTO as a service", "software consulting"],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
