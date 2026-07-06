document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  const revealEls = document.querySelectorAll('[data-animate]');
  if (reduceMotion) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  }

  document.querySelectorAll('.stat-num[data-count-to]').forEach(el => {
    const label = el.textContent;
    const target = parseFloat(el.dataset.countTo);
    if (reduceMotion || Number.isNaN(target)) return;

    const io2 = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        const start = performance.now();
        const duration = 1100;
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased);
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = label;
          }
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    io2.observe(el);
  });
});
