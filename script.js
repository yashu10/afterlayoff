// ---------- shared header / footer ----------
const PAGES = [['index.html', 'Home'], ['about.html', 'About'], ['services.html', 'Services'], ['portfolio.html', 'Portfolio'], ['blog.html', 'Blog'], ['careers.html', 'Careers']];
const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
const active = here === 'project.html' ? 'portfolio.html' : here === 'post.html' ? 'blog.html' : here;

document.getElementById('site-header').outerHTML = `
<div class="progress" id="progress"></div>
<header class="nav" id="nav">
  <a href="index.html" class="brand" aria-label="After Layoff home">
    <span class="mark" style="--s:.09"></span>
    <span class="brand-text">After <b>Layoff</b></span>
  </a>
  <nav class="links" id="links">
    ${PAGES.map(([h, t]) => `<a href="${h}" class="${h === active ? 'on' : ''}">${t}</a>`).join('')}
    <a href="contact.html" class="btn small">Contact us</a>
  </nav>
  <button class="burger" id="burger" aria-label="Menu"><span></span><span></span></button>
</header>`;

document.getElementById('site-footer').outerHTML = `
<section class="cta-band">
  <div class="wrap">
    <h2>Ready to build what's next?</h2>
    <p>Tell us about your idea — we'll reply within 24 hours with honest feedback.</p>
    <a href="contact.html" class="btn light">Start a project →</a>
  </div>
</section>
<footer class="footer">
  <div class="wrap foot-grid">
    <div>
      <div class="fbrand"><span class="mark" style="--s:.08"></span> <b>After Layoff</b></div>
      <p>We Build What's Next.<br>An IT company by engineers who turned a setback into a launchpad.</p>
    </div>
    <div><h4>Company</h4><a href="about.html">About us</a><a href="portfolio.html">Portfolio</a><a href="blog.html">Blog</a><a href="careers.html">Careers</a><a href="contact.html">Contact</a></div>
    <div><h4>Services</h4><a href="services.html#web">Web Development</a><a href="services.html#mobile">Mobile Apps</a><a href="services.html#ai">AI &amp; Automation</a><a href="services.html#cloud">Cloud &amp; DevOps</a><a href="services.html#design">UI / UX Design</a><a href="services.html#social">Social Media</a><a href="services.html#graphics">Graphics &amp; Branding</a></div>
    <div><h4>Get in touch</h4><a href="mailto:hello@afterlayoff.com">hello@afterlayoff.com</a><span>Remote — working worldwide</span><span>Mon–Sat, 10am–7pm IST</span></div>
  </div>
  <div class="wrap foot-bottom"><small>© <span id="yr"></span> After Layoff. All rights reserved.</small><small><a href="privacy.html">Privacy</a> · <a href="#">Terms</a></small></div>
</footer>`;
document.getElementById('yr').textContent = new Date().getFullYear();

// ---------- progress + sticky nav ----------
const nav = document.getElementById('nav'), bar = document.getElementById('progress');
// reveal the header only once web fonts are ready, so it never flashes a fallback font
const showNav = () => nav.classList.add('ready');
Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1500))]).then(showNav);
function onScroll() {
  nav.classList.toggle('scrolled', scrollY > 30);
  bar.style.width = (scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight) * 100) + '%';
}
addEventListener('scroll', onScroll, { passive: true }); onScroll();

const links = document.getElementById('links');
document.getElementById('burger').onclick = () => links.classList.toggle('open');

// ---------- reveal on scroll + count-up ----------
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  e.target.querySelectorAll('[data-count]').forEach(n => {
    const to = +n.dataset.count, suf = n.dataset.suffix || '', t0 = performance.now();
    (function step(t) {
      const p = Math.min((t - t0) / 1400, 1);
      n.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  });
  io.unobserve(e.target);
}), { threshold: .12 });
window.observeReveal = (root = document) => root.querySelectorAll('.reveal:not(.in)').forEach(n => io.observe(n));
observeReveal();

// ---------- shared project card (portfolio + home) ----------
window.projectCard = p => `
  <a class="pcard reveal" href="project.html?p=${p.slug}">
    <div class="pimg" style="background:${p.grad}">${p.img ? `<img src="${p.img}" alt="${p.title}" loading="lazy">` : `<span>${p.icon}</span>`}<em>${p.cat}${p.real ? '' : ' · Concept'}</em></div>
    <div class="pbody"><h3>${p.title}</h3><p>${p.tag}</p><span class="link">View case study →</span></div>
  </a>`;

// ---------- contact form -> opens email client (no backend yet) ----------
const form = document.getElementById('form');
if (form) form.addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(form);
  const body = `Name: ${f.get('name')}\nEmail: ${f.get('email')}\nNeed: ${f.get('type')}\nBudget: ${f.get('budget')}\n\n${f.get('msg')}`;
  location.href = `mailto:hello@afterlayoff.com?subject=${encodeURIComponent('New project enquiry — ' + f.get('name'))}&body=${encodeURIComponent(body)}`;
  document.getElementById('note').textContent = 'Opening your email app…';
});
