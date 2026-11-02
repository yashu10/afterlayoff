// Blog posts. Add a new object to publish a new article. `body` is simple HTML.
const POSTS = [
  {
    slug: 'llms-for-business-what-works', title: 'LLMs for business in 2026: what actually works (and what is hype)', cat: 'LLM', date: '2026-11-02', read: 6, icon: '🧠', grad: 'linear-gradient(135deg,#0a2a7a,#00a3ff)',
    excerpt: 'Large language models are now a normal part of business software. Here is where they deliver real value today — and where teams still waste money.',
    body: `<p>Two years ago, "add AI" was a pitch. Today it is a baseline expectation. Customers expect smart search, instant answers and less paperwork. But the gap between a flashy demo and a reliable product is still wide. Here is what we see working in the market right now.</p>
<h2>Where LLMs deliver real value</h2>
<ul><li><b>Customer support:</b> answering repeat questions from your own documents, with a human taking over for complex cases.</li><li><b>Knowledge search:</b> asking questions across policies, contracts, manuals and past tickets instead of hunting through folders.</li><li><b>Document work:</b> extracting fields from invoices, forms and emails, summarising long documents, drafting first versions.</li><li><b>Sales &amp; marketing ops:</b> lead qualification, email drafts, product descriptions, social captions — always reviewed by a person.</li><li><b>Developer productivity:</b> code assistants, test generation and faster internal tooling.</li></ul>
<h2>Where teams still struggle</h2>
<ul><li><b>Unreliable accuracy:</b> models can sound confident and still be wrong. Anything high-stakes needs sources, checks and human review.</li><li><b>No clear goal:</b> "let's use AI" without a measurable process to improve ends in an expensive experiment.</li><li><b>Messy data:</b> an AI assistant is only as good as the documents behind it.</li><li><b>Cost surprises:</b> usage-based pricing adds up at scale if nobody designs for it.</li></ul>
<h2>The market direction</h2>
<p>Models keep getting more capable and cheaper to run, and businesses are shifting from chatbots toward <b>agents and workflows</b> that actually complete tasks. At the same time, there is more choice: top hosted models from the big labs, plus open-weight models you can run yourself when privacy or cost demands it. The smart move is to stay <b>model-agnostic</b> — build your product so you can swap models as the market changes.</p>
<h2>How to start</h2>
<ol><li>Pick one repetitive process with a clear metric (time saved, tickets resolved).</li><li>Build a small pilot in 2–4 weeks.</li><li>Measure honestly, fix failures, then expand.</li></ol>
<p>Want help choosing the right use case? See our <a href="services.html#ai">AI &amp; Automation service</a> or <a href="contact.html">talk to us</a>.</p>`
  },
  {
    slug: 'ai-agents-explained', title: 'AI agents explained: what they can (and cannot) do for your business', cat: 'AI', date: '2026-11-01', read: 6, icon: '🤖', grad: 'linear-gradient(135deg,#111827,#0a5cff)',
    excerpt: 'Everyone is talking about AI agents. Here is a plain-English guide: how they differ from chatbots, real use cases and the risks to plan for.',
    body: `<p>A chatbot answers questions. An <b>AI agent</b> takes action: it can read an email, look up an order, update your CRM, draft a reply and ask a human to approve — all in one flow. That is why agents are the biggest shift in business AI right now.</p>
<h2>How an agent works</h2>
<ul><li><b>A language model</b> that understands the goal and plans steps.</li><li><b>Tools</b> it can call: search, databases, email, calendars, internal APIs.</li><li><b>Memory &amp; context</b> from your documents and past interactions.</li><li><b>Guardrails</b>: limits on what it may do and when it must ask a human.</li></ul>
<p>Standards such as the Model Context Protocol (MCP) are making it easier to connect models to tools in a consistent way, which is speeding up adoption.</p>
<h2>Practical use cases</h2>
<ul><li><b>Support agent:</b> resolves routine tickets, escalates the rest with a summary.</li><li><b>Sales assistant:</b> researches a lead, drafts outreach, books meetings.</li><li><b>Operations agent:</b> processes invoices, chases approvals, updates sheets.</li><li><b>Reporting agent:</b> pulls data from several tools and writes the weekly report.</li></ul>
<h2>Risks you must plan for</h2>
<ul><li><b>Wrong actions:</b> start with "suggest, then approve" before allowing full automation.</li><li><b>Prompt injection:</b> malicious text in emails or web pages can try to hijack an agent. Limit its permissions.</li><li><b>Data exposure:</b> give agents the minimum access they need.</li><li><b>Runaway cost:</b> set usage limits and logging.</li></ul>
<h2>Our approach</h2>
<p>Start with one narrow, well-defined workflow, keep a human in the loop, log everything and expand gradually. Reliable agents are built with good engineering, not just good prompts.</p>
<p>Interested in an agent for your business? <a href="contact.html">Let's discuss it</a>.</p>`
  },
  {
    slug: 'rag-vs-fine-tuning', title: 'RAG vs fine-tuning: which one does your business need?', cat: 'LLM', date: '2026-10-31', read: 5, icon: '📚', grad: 'linear-gradient(135deg,#6366f1,#0a5cff)',
    excerpt: 'Two ways to make an LLM know your business. One is usually cheaper, safer and faster. Here is how to choose.',
    body: `<p>A general model knows the internet — not your pricing, policies or customers. There are two main ways to fix that.</p>
<h2>RAG (Retrieval-Augmented Generation)</h2>
<p>The system searches your documents for relevant passages and gives them to the model along with the question. The answer is grounded in your data, and it can cite its sources.</p>
<ul><li><b>Best for:</b> support bots, internal knowledge search, policy and product Q&amp;A.</li><li><b>Pros:</b> easy to update (just change the documents), traceable answers, lower cost, no model training.</li><li><b>Cons:</b> quality depends on how well documents are cleaned, chunked and searched.</li></ul>
<h2>Fine-tuning</h2>
<p>You train a model further on examples so it learns a style, format or specialised task.</p>
<ul><li><b>Best for:</b> consistent tone or output format, classification, domain-specific language, reducing prompt length at scale.</li><li><b>Pros:</b> can improve consistency and cut cost per call for high-volume tasks.</li><li><b>Cons:</b> needs quality training data, takes effort to maintain, and does not keep facts fresh.</li></ul>
<h2>Simple rule of thumb</h2>
<p>If the problem is <b>"the model doesn't know our information"</b>, use RAG. If the problem is <b>"the model doesn't behave the way we need"</b>, consider fine-tuning. Many strong systems use RAG first and add fine-tuning later only if needed.</p>
<h2>Do not skip evaluation</h2>
<p>Whichever you choose, build a test set of real questions and measure accuracy before launch and after every change.</p>
<p>We build and evaluate both. See our <a href="project.html?p=supportbot">SupportBot AI case study</a>.</p>`
  },
  {
    slug: 'build-ai-chatbot-for-business', title: 'How to build an AI chatbot for your business: a step-by-step guide', cat: 'AI', date: '2026-10-30', read: 6, icon: '💬', grad: 'linear-gradient(135deg,#0891b2,#0a2a7a)',
    excerpt: 'From picking the use case to launching on your website and WhatsApp — the practical steps, costs and mistakes to avoid.',
    body: `<p>A well-built AI chatbot can answer customers around the clock and free your team from repetitive questions. A badly built one frustrates people. Here is the process we follow.</p>
<h2>Step 1: Define the job</h2><p>What should the bot do? Answer FAQs, qualify leads, book appointments, track orders? Choose one or two jobs and a success metric, like "resolve 40% of questions without a human".</p>
<h2>Step 2: Collect and clean your knowledge</h2><p>Gather FAQs, product pages, policies and past support answers. Remove outdated and conflicting content — the bot will repeat whatever you feed it.</p>
<h2>Step 3: Choose the approach</h2><ul><li><b>No-code tools:</b> fastest for simple FAQ bots.</li><li><b>Custom RAG bot:</b> best when you need accuracy, branding, integrations and control.</li></ul>
<h2>Step 4: Add guardrails</h2><p>Limit topics, require sources, and add a clear path to a human. Tell users they are talking to an AI.</p>
<h2>Step 5: Connect channels and tools</h2><p>Website widget, WhatsApp, email, CRM, order system or calendar — this is where the bot becomes genuinely useful.</p>
<h2>Step 6: Test, launch, improve</h2><p>Test with real questions, launch to a small group, and review unanswered or wrong replies every week.</p>
<h2>Typical timeline</h2><p>A simple bot can be live in 1–2 weeks; a custom, integrated assistant usually takes 6–10 weeks.</p>
<h2>Common mistakes</h2><ul><li>Launching without testing on real customer questions</li><li>No human hand-off</li><li>Never updating the knowledge base</li><li>Measuring nothing</li></ul>
<p>Need a chatbot built? <a href="contact.html">Tell us your use case</a>.</p>`
  },
  {
    slug: 'safe-ai-privacy-for-companies', title: 'Using AI safely: how to protect company data when using LLMs', cat: 'AI', date: '2026-10-29', read: 5, icon: '🔒', grad: 'linear-gradient(135deg,#1e3a8a,#10b981)',
    excerpt: 'Employees are already pasting company data into AI tools. A practical checklist for privacy, security and compliance.',
    body: `<p>AI tools are useful — and risky when used without rules. Many companies already have "shadow AI": staff pasting customer data or source code into public chatbots. Here is how to get the benefits without the exposure.</p>
<h2>1. Write a simple AI usage policy</h2><p>Define what data may never be shared with AI tools (passwords, personal data, contracts, source code) and which approved tools to use instead.</p>
<h2>2. Choose the right deployment</h2><ul><li><b>Business/enterprise plans</b> with data-protection terms and no training on your data.</li><li><b>Private cloud or self-hosted open-weight models</b> when data must never leave your environment.</li></ul>
<h2>3. Apply least privilege</h2><p>AI assistants and agents should only access the documents and systems they truly need.</p>
<h2>4. Protect against prompt injection</h2><p>Treat text from emails, websites and uploaded files as untrusted. Do not let an agent take sensitive actions based on it without approval.</p>
<h2>5. Log and review</h2><p>Keep audit logs of what the AI accessed and did, and review them regularly.</p>
<h2>6. Mind the regulations</h2><p>Depending on your market, rules like India's DPDP Act, GDPR and emerging AI regulations may apply. Keep records of how data is processed, and be transparent with users.</p>
<h2>7. Keep humans accountable</h2><p>AI can draft and suggest; people should approve anything legal, financial or customer-impacting.</p>
<p>We design AI systems with privacy and security built in. <a href="contact.html">Ask us about a safe AI rollout</a>.</p>`
  },
  {
    slug: 'laid-off-start-it-company', title: 'Laid off? Here is how to turn it into your own IT company', cat: 'Startup', date: '2026-10-28', read: 5, icon: '🚀', grad: 'linear-gradient(135deg,#0a2a7a,#0a5cff)',
    excerpt: 'A layoff hurts — but it can also be the push you needed. A practical, step-by-step plan for starting a services company from scratch.',
    body: `<p>A layoff feels like the floor disappearing. But many great companies started exactly there. If you are a developer, designer or marketer with real skills, you already own the most important asset: the ability to deliver.</p>
<h2>1. Start with the skill you can sell this month</h2><p>Do not wait for a perfect product idea. Pick the services you can already deliver — websites, apps, UI design, social media creatives — and sell those first. Services give you cash flow while you learn what the market wants.</p>
<h2>2. Get the basics in place</h2><ul><li>A name, a domain and a clean logo</li><li>A simple website with services, portfolio and contact</li><li>A professional email on your own domain</li><li>A one-page price list or starter packages</li></ul>
<h2>3. Show proof, even if it is small</h2><p>No clients yet? Use your past work, personal projects and concept case studies. Be honest about what is real and what is a concept — trust is everything.</p>
<h2>4. Find your first 3 clients</h2><p>Tell your network, ask former colleagues, post your work on LinkedIn and Behance, and offer a small starter project. Your first three clients usually come from people who already know you.</p>
<h2>5. Systemise early</h2><p>Use a simple contract, fixed-scope proposals and weekly updates. Clients love clarity, and it protects you from scope creep.</p>
<p><b>The takeaway:</b> a layoff is not the end of your story. Start small, stay consistent and keep shipping.</p>`
  },
  {
    slug: 'website-cost-india', title: 'How much does a business website cost in 2026?', cat: 'Web', date: '2026-10-22', read: 4, icon: '💰', grad: 'linear-gradient(135deg,#0ea5e9,#22d3ee)',
    excerpt: 'Price depends on scope, not magic. Here is what drives the cost of a website and how to budget smartly.',
    body: `<p>"How much for a website?" is the most common question we get — and the honest answer is: it depends. Here is what actually moves the price.</p>
<h2>What affects the cost</h2><ul><li><b>Number of pages</b> — a 5-page company site is very different from a 50-page catalogue.</li><li><b>Custom design vs template</b> — custom UI/UX takes design time but converts better.</li><li><b>Features</b> — payments, logins, booking, dashboards and integrations add engineering work.</li><li><b>Content</b> — copywriting, photography and graphics.</li><li><b>SEO &amp; performance</b> — important, and worth doing right from day one.</li></ul>
<h2>Typical project types</h2><p><b>Brochure website:</b> 2–4 weeks. <b>E-commerce store:</b> 4–8 weeks. <b>Web app / SaaS MVP:</b> 8–12 weeks.</p>
<h2>How to save money without hurting quality</h2><p>Launch with the essential pages first, reuse a design system, and add features in phases. A fixed-scope proposal with clear deliverables keeps everyone aligned.</p>
<p>Want a clear estimate? <a href="contact.html">Tell us about your project</a> and we will reply within 24 hours.</p>`
  },
  {
    slug: 'ux-design-process', title: 'Our UI/UX design process: from research to handoff', cat: 'Design', date: '2026-10-15', read: 5, icon: '🎨', grad: 'linear-gradient(135deg,#6366f1,#0a5cff)',
    excerpt: 'Good design is not decoration. This is the exact process we follow to design apps people understand at first glance.',
    body: `<p>Great interfaces feel obvious — but that simplicity is the result of a structured process.</p>
<h2>1. Understand</h2><p>Who is using this, what are they trying to do, and what gets in their way? We run stakeholder interviews, review competitors and write a clear problem statement.</p>
<h2>2. Structure</h2><p>User flows and information architecture. Card sorting helps us group features the way users think, not the way the org chart does.</p>
<h2>3. Design</h2><p>Wireframes first, then high-fidelity screens in Figma with a reusable design system: colours, typography and components.</p>
<h2>4. Refine</h2><p>Prototype, test with real users, fix what slows people down, then hand off to developers with specs and assets.</p>
<p>See this process in action in our <a href="project.html?p=prage">PRAGE EV bike rental</a> case study.</p>`
  },
  {
    slug: 'social-media-for-small-business', title: '7 social media design tips for small businesses', cat: 'Social Media', date: '2026-10-08', read: 4, icon: '📲', grad: 'linear-gradient(135deg,#db2777,#f59e0b)',
    excerpt: 'You do not need a big budget to look professional online. Seven practical rules for posts that get noticed.',
    body: `<p>Consistency beats occasional brilliance. Here is how to make your social media look professional.</p>
<ul><li><b>Pick a brand palette</b> — 2 main colours and 1 accent. Use them everywhere.</li><li><b>Limit fonts</b> — one for headlines, one for body.</li><li><b>Use templates</b> — a repeatable layout makes your feed instantly recognisable.</li><li><b>One message per post</b> — if it needs a paragraph, make it a carousel.</li><li><b>Keep text readable</b> — large type, strong contrast, safe margins.</li><li><b>Mix content</b> — educational, promotional and festival posts.</li><li><b>Plan monthly</b> — a content calendar saves hours and stress.</li></ul>
<p>Need a done-for-you feed? Our <a href="services.html#social">social media design service</a> covers posts, carousels, stories and campaign creatives.</p>`
  },
  {
    slug: 'logo-and-brand-identity', title: 'Why your business needs more than just a logo', cat: 'Branding', date: '2026-09-30', read: 4, icon: '✒️', grad: 'linear-gradient(135deg,#1e3a8a,#10b981)',
    excerpt: 'A logo is the start, not the finish. What a complete brand identity includes — and why it builds trust.',
    body: `<p>Customers judge you in seconds. A consistent identity tells them you are reliable before you say a word.</p>
<h2>What a brand identity includes</h2><ul><li>Logo system — full, symbol and white versions</li><li>Colour palette and typography</li><li>Stationery — letterhead, cards, invoices</li><li>Company profile or brochure</li><li>Social media and website styling</li></ul>
<h2>Why it matters</h2><p>When your signage, uniforms, documents and website all look like they belong together, buyers trust you more. That is especially true in B2B industries like engineering and manufacturing.</p>
<p>Browse our <a href="project.html?p=branding-and-print">branding &amp; print work</a> for examples.</p>`
  },
  {
    slug: 'what-is-devops-for-startups', title: 'DevOps for startups: what it is and why you need it early', cat: 'DevOps', date: '2026-10-25', read: 5, icon: '🔁', grad: 'linear-gradient(135deg,#0f172a,#0a5cff)',
    excerpt: 'DevOps is not just for big companies. Here is how CI/CD, cloud and monitoring save small teams time and money.',
    body: `<p>DevOps means building, testing and releasing software in an automated, repeatable way. Startups that adopt it early ship faster and sleep better.</p>
<h2>1. CI/CD: stop deploying by hand</h2><p>Every code change is built and tested automatically. If tests pass, it deploys. No more "it worked on my machine" or midnight FTP uploads.</p>
<h2>2. Infrastructure as code</h2><p>Define servers, databases and networks in code (Terraform). You can recreate your whole environment in minutes — and review changes like any other code.</p>
<h2>3. Cloud without the surprise bills</h2><p>Right-size resources, set budgets and alerts, and use managed services where it makes sense. Most startups overspend on cloud by 30% or more.</p>
<h2>4. Monitoring and alerts</h2><p>Know about downtime before your customers do. Logs, metrics and alerts to Slack or email are a small setup with a huge payoff.</p>
<h2>5. Security basics</h2><p>Secrets management, least-privilege access, backups and regular updates protect your business from avoidable disasters.</p>
<p>Need help? See our <a href="services.html#cloud">Cloud &amp; DevOps service</a> or <a href="contact.html">talk to us</a>.</p>`
  },
  {
    slug: 'ai-for-small-business', title: 'Where AI can actually save time in a small business', cat: 'AI', date: '2026-09-22', read: 5, icon: '🤖', grad: 'linear-gradient(135deg,#111827,#475569)',
    excerpt: 'Skip the hype. Four practical places AI and automation pay off quickly for small teams.',
    body: `<p>AI is useful when it removes repetitive work. Start with these four areas:</p>
<h2>1. Customer support</h2><p>A chatbot grounded in your own documents can answer the common questions 24/7 and hand over to a human when needed.</p>
<h2>2. Document handling</h2><p>Extract data from invoices, forms and emails instead of retyping them.</p>
<h2>3. Internal workflows</h2><p>Approvals, reminders and reports that run automatically in Slack, email or Sheets.</p>
<h2>4. Content drafting</h2><p>First drafts of emails, product descriptions and social captions — always reviewed by a human.</p>
<p>Start with one process, measure the time saved, then expand. Curious what is possible for you? <a href="contact.html">Let's talk</a>.</p>`
  }
];
