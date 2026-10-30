// Portfolio data.
// real:true  -> real work (images hosted on yashu10.github.io/yashpatel)
// real:false -> concept case study (clearly labelled on the site)
const IMG = 'https://yashu10.github.io/yashpatel/assets/img/';
const PROJECTS = [
  {
    real: true, slug: 'prage', title: 'PRAGE — EV Bike Rental App', cat: 'Mobile App', icon: '🛵', img: IMG + 'prage.webp', grad: 'linear-gradient(135deg,#0a2a7a,#0a5cff)',
    tag: 'A mobile app for renting electric bikes — from finding a hub to payment and ride tracking.',
    meta: [['Type', 'UX case study · Mobile app'], ['Role', 'UI/UX Designer'], ['Platform', 'iOS / Android'], ['Tools', 'Figma']],
    challenge: 'Renting an electric bike should feel as simple as unlocking a phone. In practice, riders face unclear availability, repeated paperwork and uncertainty about battery, range and charges.',
    solution: 'PRAGE brings everything into one app: find the nearest hub, see vehicle details and rental plans, verify identity once, pay, start and end the trip with photo checks, and get support when needed.',
    process: [['Problem & solution statement', 'Defined who the product is for and what has to be solved first.'], ['Competitive analysis', 'Studied ride-hailing apps and local rental services to find gaps.'], ['Empathy map & persona', 'Turned research into a clear picture of the rider.'], ['SWOT, mind map & card sorting', 'Organised features the way riders think.'], ['User flow', 'Mapped the journey from onboarding to refund and rating.']],
    decisions: [['Hub-first discovery', 'The home screen is a map with nearest hubs, distance and a Navigate action.'], ['Transparent vehicle details', 'Battery, range, speed and rental plans are shown up front, with extra charges stated clearly.'], ['Step-by-step verification', 'Aadhaar, OTP, licence and selfie are split into four short steps with a progress indicator.']],
    outcome: 'A complete mobile experience covering onboarding, verification, hub discovery, booking, payment, trips, feedback, support and profile — backed by research and a clear user flow.',
    next: 'Usability-test the verification and trip start/end flows with real riders.'
  },
  {
    real: true, slug: 'atoma', title: 'Atoma — Home Beauty & Salon App', cat: 'Mobile App', icon: '💅', img: IMG + 'atoma.webp', grad: 'linear-gradient(135deg,#1e3a8a,#00a3ff)',
    tag: 'At-home beauty and salon booking with an AI assistant and a simple booking flow.',
    meta: [['Type', 'UX case study · Mobile app'], ['Role', 'UI/UX Designer'], ['Platform', 'iOS'], ['Tools', 'Figma']],
    challenge: 'Booking beauty services at home usually means calls, messages and guesswork: what is included, how long it takes, what it costs, and which service fits your skin or hair.',
    solution: 'Atoma lets people browse services and products, read clear service details, get guidance from an AI assistant, and book a visit in a few taps.',
    process: [['User personas', 'Defined the main customers and what they expect.'], ['Workflow', 'Mapped the flow from splash and home to cart, booking and confirmation.'], ['Wireframes', 'Explored layouts for home, service detail, booking and AI chat.'], ['High-fidelity UI & design system', 'Built a navy and white visual system in SF Pro with reusable components.']],
    decisions: [['AI beauty assistant', 'A chat concierge gives personalised suggestions so people do not have to guess.'], ['Detail pages that answer questions', 'Duration, rating, price and description sit on the service page with a strong Book action.'], ['One simple booking flow', 'Cart, date and time, address and payment follow each other without detours.']],
    outcome: 'A complete booking app covering discovery, service details, an AI assistant, cart and booking, with a documented design system for consistency.',
    next: 'Test the AI suggestions with real customers; add reminders and rebooking.'
  },
  {
    real: true, slug: 'okomall', title: 'OKOMALL — Salon Discovery & Booking', cat: 'Web App', icon: '💇', img: IMG + 'okomall.webp', grad: 'linear-gradient(135deg,#0ea5e9,#22d3ee)',
    tag: 'A responsive platform to find salons, compare services and book in four steps.',
    meta: [['Type', 'UX case study · Web app'], ['Role', 'UI/UX Designer'], ['Platform', 'Responsive web'], ['Tools', 'Figma']],
    challenge: 'Booking a salon still means calls, DMs and guesswork. Prices are unclear, availability is unknown and there is no single place to track appointments.',
    solution: 'OKOMALL lets people discover salons near them, compare services and prices, choose a professional and a time slot, and send a booking request — all in four steps.',
    process: [['Customer', 'Wants to find a nearby salon quickly, see honest prices and ratings, and book without calling.'], ['Salon owner', 'Wants more bookings, a clear list of requests and a way to promote free slots.'], ['Design goals', 'Fewer steps to book, trust through ratings, and the same experience on desktop and mobile.']],
    decisions: [['Search leads the home page', 'Service, area and time sit in the hero so the main task is first.'], ['Free today near you', 'Salons with open slots today come first, turning urgency into a booking.'], ['Four-step booking with a live summary', 'A progress bar and summary card keep choices and cost always visible.']],
    outcome: 'Home, search, salon pages, offers, help, a four-step booking flow and account screens — each in desktop and mobile, built on one design system.',
    next: 'Usability-test booking, design the salon-owner dashboard, add payment and reminders.'
  },
  {
    real: true, slug: 'teamsync', title: 'TeamSync — Project Management', cat: 'Dashboard', icon: '📋', img: IMG + 'teamsync.webp', grad: 'linear-gradient(135deg,#6366f1,#0a5cff)',
    tag: 'One workspace for tasks, projects, team chat, files and calendar.',
    meta: [['Type', 'UX case study · Web dashboard'], ['Role', 'UI/UX Designer'], ['Platform', 'Web app (desktop)'], ['Tools', 'Figma']],
    challenge: 'Task lists live in one app, chat in another, files in a third and deadlines in a calendar nobody checks. Managers cannot see progress at a glance.',
    solution: 'TeamSync brings projects, tasks, team chat, files and a shared calendar into one dashboard, so a team member opens it once and knows what matters today.',
    process: [['Team member', 'Needs to know what is due today and where to talk to teammates.'], ['Project manager', 'Needs overall progress, workload spread and project health.'], ['Design goals', 'Reduce tool switching, make status instantly readable, keep dense data calm.']],
    decisions: [['Summary first', 'Four headline numbers make the state of the day clear in two seconds.'], ['Visual progress', 'Progress bars, a task ring and a gauge replace long tables.'], ['Colour-coded Kanban', 'To Do, In-Progress and Completed each have their own colour.']],
    outcome: 'A consistent desktop workspace covering the dashboard, task board, calendar and profile menu, built on a reusable component set.',
    next: 'Usability-test with real teams, add dark mode and design Projects, Files and Planning screens.'
  },
  {
    real: true, slug: 'warehouse-asset-management', title: 'Warehouse Asset Management', cat: 'Mobile App', icon: '📦', img: IMG + 'basf-warehouse.webp', grad: 'linear-gradient(135deg,#0891b2,#0a2a7a)',
    tag: 'A mobile app to add, scan, verify and back up warehouse assets.',
    meta: [['Type', 'UX case study · Mobile app'], ['Role', 'UI/UX Designer'], ['Platform', 'Mobile app'], ['Tools', 'Figma']],
    challenge: 'In a large warehouse, assets are logged on paper or spreadsheets. Locations are inconsistent, checks take long, and mismatches are found too late.',
    solution: 'The team adds assets by scanning, assigns each to a clear location (tower, floor, section), verifies them in bulk, and exports and backs up records from a phone on the floor.',
    process: [['Warehouse operator', 'Adds and verifies assets while walking the floor, often with one hand.'], ['Supervisor / admin', 'Manages users, locations and backups and needs records to match reality.'], ['Design goals', 'Scan first, type last; few fields per screen; large tap targets and clear status colours.']],
    decisions: [['One dashboard, five jobs', 'Large tiles for All Assets, Notifications, Location, Users and Backup — no menus to learn.'], ['Scan-first entry', 'Scanning an EPC tag fills asset identity; manual entry stays available.'], ['Bulk verification', 'Detected tags appear in one list with filters (All, New, Valid, Missing).']],
    outcome: 'Onboarding, login, dashboard, user, asset, verification, location and backup flows in one consistent mobile system.',
    next: 'Test bulk scanning with operators on a real floor, add offline support and a tablet layout.'
  },
  {
    real: true, slug: 'smart-hoist-system', title: 'Smart Hoist System', cat: 'IoT', icon: '🏗️', img: IMG + 'smart-hoist.webp', grad: 'linear-gradient(135deg,#111827,#334155)',
    tag: 'A dark-theme app for monitoring construction hoists in real time.',
    meta: [['Type', 'UX case study · Mobile app'], ['Role', 'UI/UX Designer'], ['Platform', 'Mobile app (dark theme)'], ['Tools', 'Figma']],
    challenge: 'Engineers need load, speed, power and fault status at once, but data sits in separate panels and reports, and alerts can be missed.',
    solution: 'Live parameters, a hoist map, severity-ranked alerts and scheduled reports in one mobile app, so an engineer can see problems and act from anywhere on site.',
    process: [['Systems engineer', 'Monitors hoists remotely and needs trustworthy live numbers at a glance.'], ['Site / safety supervisor', 'Needs to know which hoist has a problem and how severe it is.'], ['Design goals', 'Critical info first, severity by colour and label, dense data readable on a phone.']],
    decisions: [['Status at the top', 'Active alert counts and key live values are visible without scrolling.'], ['Triage before action', 'Alerts are filtered by Active, Acknowledged and Resolved with a plain-language message.'], ['Clustered hoist map', 'Hoists are grouped on a map; one tap opens a hoist’s live dashboard.']],
    outcome: 'Login, dashboard, live hoist map, alerts, reports with scheduling and a profile screen in one consistent dark interface.',
    next: 'Test alert triage with site engineers; add push notifications and a control-room tablet view.'
  },
  {
    real: true, slug: 'innerpeace', title: 'InnerPeace — Wellness App', cat: 'Mobile App', icon: '🧘', img: IMG + 'innerpeace.webp', grad: 'linear-gradient(135deg,#7c3aed,#38bdf8)',
    tag: 'A calm mental wellness app with mood check-ins and guided sessions.',
    meta: [['Type', 'UX case study · Mobile app'], ['Role', 'UI/UX Designer'], ['Platform', 'iOS'], ['Tools', 'Figma']],
    challenge: 'Stress is easy to feel and hard to understand. Many wellness apps start with a blank screen or a long list of content — overwhelming for someone already tired.',
    solution: 'A short, gentle onboarding learns goals and feelings, builds a personal plan, then offers daily mood check-ins, guided sessions and a progress view in a calm interface.',
    process: [['Needs', 'A simple way to name how they feel, short guided sessions and proof that habits work.'], ['Frustrations', 'Apps that feel clinical or crowded, too many choices, no sense of progress.'], ['Design goals', 'Gentle onboarding, one action per screen, calm colour and visible progress.']],
    decisions: [['Six gentle steps to a personal plan', 'Goals, topics and short statements make reflection quick, ending in a reward.'], ['Emoji mood check-in', 'Large tiles with a label — no typing needed.'], ['A session with one cue', 'A single breathing cue, a timer and one pause button.']],
    outcome: 'Onboarding, home, mood check-in, explore, guided sessions and progress in one soft, consistent mobile system.',
    next: 'Interview real users, test onboarding length, add reminders and a profile screen.'
  },
  {
    real: true, slug: 'darshan-dye-chem', title: 'Darshan Dye-Chem Website', cat: 'Website', icon: '🎨', img: IMG + 'darshan-dye-chem.webp', grad: 'linear-gradient(135deg,#78350f,#f59e0b)',
    tag: 'A live website for an Ahmedabad dye manufacturer — shade cards, dye tools and quotes.',
    meta: [['Type', 'Website design (live)'], ['Role', 'UI/UX Designer'], ['Platform', 'Desktop and mobile web'], ['Tools', 'Figma']],
    challenge: 'Dye buyers want proof before they ask for a quote: what the company makes, which shades exist, how reliable supply is and how to get a sample.',
    solution: 'A dark, confident look with warm amber actions. Visitors see product families, an online shade explorer, downloadable shade cards and free dye tools, with Get a Quote always within reach.',
    decisions: [['Trust first', 'The home page leads with why buyers choose the company: consistent shades, factory-direct, export-ready.'], ['See the shades before you ask', 'Shade explorer with filters and fastness ratings, plus PDF downloads.'], ['Tools that help buyers decide', 'A dye calculator and finder bring useful visitors to the quote form.']],
    outcome: 'A complete four-page website (Home, About, Products, Contact) with a mobile layout and a small design system — live at darshandyechem.com.',
    links: [['Visit live website', 'https://darshandyechem.com']]
  },
  {
    real: true, slug: 'web-design', title: 'Web Design Collection', cat: 'Website', icon: '🖥️', img: IMG + 'web-design.webp', grad: 'linear-gradient(135deg,#0f172a,#0a5cff)',
    tag: 'Corporate, real estate and e-commerce websites and landing pages.',
    meta: [['Type', 'Web design'], ['Role', 'UI/UX Designer'], ['Platform', 'Desktop and mobile web'], ['Tools', 'Figma']],
    decisions: [['Industrial machinery website', 'A five-page corporate site (Home, Products, About, Blog, Contact) for a filling and capping machinery maker. Navy and red palette, product-led layout and a clear Get in Touch block.'], ['Real estate website', 'A premium apartment developer home page (client work). Warm copper and dark brown tones, hero search panel, stats, amenities, plans, testimonials and map.'], ['Landing pages', 'Skincare, e-commerce and education pages, each with a clear hero, focused sections and strong calls to action.']],
    outcome: 'Responsive layouts with clear hierarchy, strong calls to action and consistent visual systems for each industry.'
  },
  {
    real: true, slug: 'branding-and-print', title: 'Branding & Print', cat: 'Branding', icon: '✒️', img: IMG + 'branding.webp', grad: 'linear-gradient(135deg,#1e3a8a,#10b981)',
    tag: 'Logos, stationery, brochures and brand kits for engineering and cold-chain brands.',
    meta: [['Type', 'Brand identity & print'], ['Role', 'Designer'], ['Deliverables', 'Logo, stationery, brochure, website'], ['Tools', 'Figma · Illustrator · CorelDRAW']],
    decisions: [['Projexel Engineering', 'A complete brand kit for an EPC and industrial services company: logo system, mockups on safety vests, signage and uniforms, letterhead, company profile and website.'], ['EcoTherm Cooling Solutions', 'Logo, letterhead and a 16-page product brochure for cold rooms and freezing chambers — navy and green for technology and sustainability.']],
    outcome: 'Consistent identities across logo, stationery, print and web, designed to work on documents, signs, uniforms and screens.'
  },
  {
    real: true, slug: 'social-media-design', title: 'Social Media Design', cat: 'Social Media', icon: '📲', img: IMG + 'social-media.webp', grad: 'linear-gradient(135deg,#db2777,#f59e0b)',
    tag: 'Posts, carousels and campaign creatives for 10+ brands.',
    meta: [['Type', 'Social media design'], ['Role', 'Designer'], ['Formats', 'Square, portrait and story'], ['Tools', 'Figma · Photoshop · Canva']],
    decisions: [['Brands served', 'Healthcare (Dental Care), technology, real estate, art, food & beverage, education and more — a consistent look per brand.'], ['Knowledge-sharing posts', 'Clear, educational carousels that make complex topics easy to scan.'], ['Festival & occasion posts', 'Greetings and campaign creatives in portrait format, ready to schedule.']],
    outcome: 'A consistent, eye-catching look for each brand across every campaign.'
  },

  // ---- concept case studies (development) ----
  {
    real: false, slug: 'fintrack', title: 'FinTrack', cat: 'Web App', icon: '📊', grad: 'linear-gradient(135deg,#0a2a7a,#0a5cff)',
    tag: 'A real-time finance & billing dashboard for small teams.',
    meta: [['Type', 'Concept · SaaS web app'], ['Timeline', '10–12 weeks'], ['Team', '2 engineers · 1 designer'], ['Stack', 'Next.js · Node.js · PostgreSQL · Stripe · AWS']],
    challenge: 'Small businesses juggle bank exports, invoices and spreadsheets. Numbers go stale, reports take hours, and nobody trusts the totals.',
    solution: 'An event-driven architecture that syncs transactions in near real time, with role-based access, automated invoice reminders and one-click PDF/CSV reports.',
    decisions: [['Live cash-flow charts', 'Revenue and cash position update as transactions arrive.'], ['Recurring invoices', 'Payment links and automatic reminders.'], ['Role-based access', 'Owner, accountant and viewer roles with a full audit log.']],
    outcome: 'Target: reports in seconds, a single source of truth for finances, and a platform built to scale to thousands of tenants.'
  },
  {
    real: false, slug: 'supportbot', title: 'SupportBot AI', cat: 'AI', icon: '🤖', grad: 'linear-gradient(135deg,#111827,#475569)',
    tag: 'An AI assistant that answers customers from your own docs.',
    meta: [['Type', 'Concept · AI assistant'], ['Timeline', '6–10 weeks'], ['Team', '2 engineers'], ['Stack', 'Python · LLM APIs · Vector DB · FastAPI · React']],
    challenge: 'Support teams answer the same 20 questions all day; response times slip and agents burn out.',
    solution: 'Index help-centre articles and past tickets, ground every answer in sources, add guardrails, and escalate to a human with full context when confidence is low.',
    decisions: [['Grounded answers', 'Replies cite your documents.'], ['Smart hand-off', 'Humans take over with the full conversation.'], ['Insights', 'Analytics on unanswered questions show content gaps.']],
    outcome: 'Target: resolve repetitive tickets automatically, offer 24/7 first response and let agents focus on complex cases.'
  },
  {
    real: false, slug: 'opsflow', title: 'OpsFlow', cat: 'AI', icon: '⚙️', grad: 'linear-gradient(135deg,#0891b2,#0a2a7a)',
    tag: 'AI-assisted workflow automation for operations teams.',
    meta: [['Type', 'Concept · Automation platform'], ['Timeline', '4–8 weeks'], ['Team', '1–2 engineers'], ['Stack', 'React · Node.js · PostgreSQL · LLM APIs · Slack / Sheets APIs']],
    challenge: 'Operations teams lose hours on manual approvals, copy-pasting between tools and chasing status updates.',
    solution: 'A configurable workflow engine with forms, approval chains and integrations, plus AI that reads documents, drafts replies and flags exceptions for a human.',
    decisions: [['Drag-and-drop workflows', 'Approval chains built without code.'], ['AI document handling', 'Invoices and forms are read and filled automatically, with human review.'], ['Integrations', 'Slack, email and Google Sheets notifications and weekly auto-reports.']],
    outcome: 'Target: less manual follow-up, clear ownership of every request and faster approvals.'
  },
  {
    real: false, slug: 'pipelinex', title: 'PipelineX — CI/CD Setup', cat: 'Cloud', icon: '🔁', grad: 'linear-gradient(135deg,#0f172a,#0a5cff)',
    tag: 'Automated build, test and deploy pipelines with monitoring.',
    meta: [['Type', 'Concept · DevOps'], ['Timeline', '2–4 weeks'], ['Team', '1 DevOps engineer'], ['Stack', 'GitHub Actions · Docker · AWS · Terraform · Grafana']],
    challenge: 'Releases are manual, slow and risky. A single missed step can take the site down, and nobody knows what is running in production.',
    solution: 'Every commit is built and tested automatically; approved changes deploy via containers with rollback, while dashboards and alerts watch the live system.',
    decisions: [['Automated tests on every push', 'Broken code never reaches production.'], ['One-click rollback', 'Blue-green deploys make a bad release a 1-minute fix.'], ['Monitoring & alerts', 'Logs, uptime and error alerts go to Slack or email.']],
    outcome: 'Target: faster, safer releases, less downtime and a team that deploys without fear.'
  },
  {
    real: false, slug: 'cloudshift', title: 'CloudShift', cat: 'Cloud', icon: '☁️', grad: 'linear-gradient(135deg,#1e3a8a,#00a3ff)',
    tag: 'Zero-drama migration to the cloud with CI/CD.',
    meta: [['Type', 'Concept · Cloud migration'], ['Timeline', '4–10 weeks'], ['Team', '1–2 DevOps engineers'], ['Stack', 'AWS · Docker · Kubernetes · Terraform · GitHub Actions']],
    challenge: 'Ageing servers, manual deployments and surprise downtime make every release stressful — and expensive.',
    solution: 'Containerise, automate with infrastructure-as-code, add CI/CD, monitoring and alerts, then right-size resources to control cost.',
    decisions: [['Infrastructure as code', 'Reproducible environments with Terraform.'], ['CI/CD', 'Automated tests and blue-green deploys for near-zero downtime.'], ['Cost review', 'Right-sizing and budgets to keep bills predictable.']],
    outcome: 'Target: repeatable one-click deployments, fewer outages and lower, more predictable cloud bills.'
  }
];
