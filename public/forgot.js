document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const btn = document.querySelector('.darkmode-toggle');
  const applyTheme = theme => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      btn.setAttribute('aria-pressed','true');
    } else {
      document.documentElement.removeAttribute('data-theme');
      btn.setAttribute('aria-pressed','false');
    }
  };
  const saved = localStorage.getItem('theme') || 'light';
  applyTheme(saved);
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  // Form + Reset logic
  const form = document.getElementById('forgotForm');
  const email = document.getElementById('email');
  const emailErr = document.getElementById('emailError');
  const popup = document.getElementById('successPopup');
  const closeBtn = document.getElementById('closePopup');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    emailErr.textContent = '';

    const emailVal = email.value.trim();
    if (!emailVal || !email.validity.valid) {
      emailErr.textContent = 'Please enter a valid email';
      return;
    }

    try {
      const response = await fetch('/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailVal })
      });

      const result = await response.json();

      if (response.ok) {
        popup.classList.remove('hidden');
        popup.querySelector('p').textContent = `Your new temporary password: ${result.message}`;
      } else {
        emailErr.textContent = result.message || 'Something went wrong.';
      }
    } catch (error) {
      emailErr.textContent = 'Server error. Please try again later.';
      console.error(error);
    }
  });

  closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
    form.reset();
  });

  popup.addEventListener('click', e => {
    if (e.target === popup) popup.classList.add('hidden');
  });
});
