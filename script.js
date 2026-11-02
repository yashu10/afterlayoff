// ---------- shared header / footer ----------
const PAGES = [['index.html', 'Home'], ['about.html', 'About'], ['services.html', 'Services'], ['portfolio.html', 'Portfolio'], ['blog.html', 'Blog'], ['careers.html', 'Careers']];
const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
const active = here === 'project.html' ? 'portfolio.html' : here === 'post.html' ? 'blog.html' : here;



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
    <div><h4>Get in touch</h4><a href="mailto:contact@afterlayoff.in">contact@afterlayoff.in</a><span>Remote — working worldwide</span><span>Mon–Sat, 10am–7pm IST</span></div>
  </div>
  <div class="wrap foot-bottom"><small>© <span id="yr"></span> After Layoff. All rights reserved.</small><small><a href="privacy.html">Privacy</a> · <a href="#">Terms</a></small></div>
</footer>`;
document.getElementById('yr').textContent = new Date().getFullYear();

// ---------- progress + sticky nav ----------
const nav = document.getElementById('nav'), bar = document.getElementById('progress');
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

// ---------- contact form -> emailed to contact@afterlayoff.in via FormSubmit (no server needed) ----------
const MAIL_TO = 'contact@afterlayoff.in';
const form = document.getElementById('form');
if (form) form.addEventListener('submit', async e => {
  e.preventDefault();
  const note = document.getElementById('note'), btn = form.querySelector('button[type=submit]');
  const f = new FormData(form);
  if (f.get('_honey')) return;                       // spam trap: bots fill this hidden field
  note.style.color = ''; note.textContent = 'Sending…'; btn.disabled = true;
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${MAIL_TO}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `New enquiry from ${f.get('name')} — After Layoff website`,
        _template: 'table', _captcha: 'false',
        Name: f.get('name'), Email: f.get('email'), _replyto: f.get('email'),
        Service: f.get('type'), Budget: f.get('budget'), Message: f.get('msg')
      })
    });
    const data = await res.json();
    if (!res.ok || String(data.success) === 'false') throw new Error(data.message || 'failed');
    form.reset();
    note.textContent = '✓ Thank you! Your message has been sent. We will reply within 24 hours.';
  } catch (err) {
    // fallback: open the visitor's email app with the message pre-filled
    const body = `Name: ${f.get('name')}
Email: ${f.get('email')}
Need: ${f.get('type')}
Budget: ${f.get('budget')}

${f.get('msg')}`;
    note.style.color = '#b45309';
    note.textContent = 'Could not send automatically — opening your email app instead.';
    location.href = `mailto:${MAIL_TO}?subject=${encodeURIComponent('New project enquiry — ' + f.get('name'))}&body=${encodeURIComponent(body)}`;
  } finally { btn.disabled = false; }
});
