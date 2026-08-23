// TONY STACKS — interactions
document.addEventListener('DOMContentLoaded', () => {
  // year
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  // mobile nav
  const burger = document.querySelector('.burger');
  const links = document.querySelector('.nav-links');
  if (burger && links) burger.addEventListener('click', () => links.classList.toggle('open'));

  // reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.rv').forEach(el => io.observe(el));

  // animated counters
  const cio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      cio.unobserve(e.target);
      const el = e.target, target = parseFloat(el.dataset.count), dec = (el.dataset.dec | 0);
      const suffix = el.dataset.suffix || '', t0 = performance.now(), dur = 1600;
      const tick = t => {
        const p = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(dec) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

  // card tilt
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', ev => {
      const r = card.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - .5, y = (ev.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 6}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  // smooth anchor offset for sticky nav
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', ev => {
      const id = a.getAttribute('href').slice(1);
      const el = id && document.getElementById(id);
      if (el) { ev.preventDefault(); window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: 'smooth' }); }
    });
  });
});
