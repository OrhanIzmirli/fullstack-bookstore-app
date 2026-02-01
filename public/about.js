document.addEventListener('DOMContentLoaded', () => {
  // Dark/light toggle
  const btn = document.querySelector('.darkmode-toggle');
  if (btn) {
    const applyTheme = theme => {
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        document.documentElement.removeAttribute('data-theme');
        btn.setAttribute('aria-pressed', 'false');
      }
    };
    const saved = localStorage.getItem('theme') || 'light';
    applyTheme(saved);
    btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark'
        ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  // Testimonials slider
  const slides = document.querySelector('.slides');
  const items  = Array.from(document.querySelectorAll('.testimonial-item'));
  const prev   = document.querySelector('.prev');
  const next   = document.querySelector('.next');
  let idx = 0;
  const total = items.length;

  // initialize widths
  slides.style.width = `${total * 100}%`;
  items.forEach(item => item.style.flex = `0 0 ${100/total}%`);

  const update = () => {
    slides.style.transform = `translateX(-${(100/total) * idx}%)`;
  };

  if (prev && next) {
    prev.addEventListener('click', () => {
      idx = idx > 0 ? idx - 1 : total - 1;
      update();
    });
    next.addEventListener('click', () => {
      idx = idx < total - 1 ? idx + 1 : 0;
      update();
    });
    update();
  }
});
