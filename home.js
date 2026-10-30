// typewriter
const words = ['next.', 'smarter.', 'faster.', 'bigger.'];
const el = document.getElementById('type');
let w = 0, c = 0, del = false;
(function tick() {
  const word = words[w];
  el.textContent = word.slice(0, c);
  if (!del && c === word.length) { del = true; return setTimeout(tick, 1600); }
  if (del && c === 0) { del = false; w = (w + 1) % words.length; }
  c += del ? -1 : 1;
  setTimeout(tick, del ? 50 : 100);
})();

// 3D tilt on hero logo
const art = document.getElementById('tilt'), card = art.querySelector('.logo-card');
art.addEventListener('mousemove', e => {
  const r = art.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
  card.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
});
art.addEventListener('mouseleave', () => card.style.transform = '');

// rising-line canvas background (the "arrow up" motif)
const cv = document.getElementById('bg'), ctx = cv.getContext('2d');
let W, H, lines = [];
function size() {
  W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight;
  lines = Array.from({ length: Math.round(W / 55) }, () => ({
    x: Math.random() * W, y: Math.random() * H, len: 40 + Math.random() * 90, v: .4 + Math.random() * 1.1
  }));
}
size(); addEventListener('resize', size);
(function draw() {
  ctx.clearRect(0, 0, W, H);
  for (const l of lines) {
    const g = ctx.createLinearGradient(l.x, l.y, l.x + l.len * .4, l.y - l.len);
    g.addColorStop(0, 'rgba(10,92,255,0)'); g.addColorStop(1, 'rgba(10,92,255,.5)');
    ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(l.x, l.y); ctx.lineTo(l.x + l.len * .4, l.y - l.len); ctx.stroke();
    l.x += l.v * .4; l.y -= l.v;
    if (l.y + l.len < 0 || l.x > W) { l.y = H + 20; l.x = Math.random() * W; }
  }
  requestAnimationFrame(draw);
})();
