const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);

const nav = document.getElementById('nav');
ScrollTrigger.create({
  start: 60, end: 99999,
  onUpdate: (self) => nav.classList.toggle('is-scrolled', self.scroll() > 60),
});

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length <= 1) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    lenis.scrollTo(el, { offset: -60 });
  });
});

gsap.fromTo('.hero__brand span',
  { y: 140, opacity: 0 },
  { y: 0, opacity: 1, duration: 1.1, stagger: 0.045, ease: 'power3.out', delay: 0.15 }
);
gsap.fromTo('.hero__meta',
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 1, delay: 0.95, ease: 'power2.out' }
);

gsap.utils.toArray('.block').forEach((block) => {
  const targets = block.querySelectorAll(
    '.eyebrow, .block__title, .block__sub, .what__grid > *, .tiles .tile, .steps > li, .cards .card, .contact__email, .contact__note'
  );
  gsap.from(targets, {
    y: 50,
    opacity: 0,
    duration: 0.9,
    stagger: 0.08,
    ease: 'power2.out',
    scrollTrigger: { trigger: block, start: 'top 80%' },
  });
});

gsap.to('.hero__inner', {
  y: -80,
  opacity: 0.4,
  ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
});
