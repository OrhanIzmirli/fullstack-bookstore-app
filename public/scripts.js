

// Tema 
function applyTheme(theme, toggleBtn) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      toggleBtn.setAttribute('aria-pressed', 'true');
    } else {
      document.documentElement.removeAttribute('data-theme');
      toggleBtn.setAttribute('aria-pressed', 'false');
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    // --- Dark Mode Toggle ---
    const darkToggle = document.querySelector('.darkmode-toggle');
    if (darkToggle) {
      
      const saved = localStorage.getItem('theme') || 'light';
      applyTheme(saved, darkToggle);
  
      darkToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const next  = isDark ? 'light' : 'dark';
        applyTheme(next, darkToggle);
        localStorage.setItem('theme', next);
      });
    }
  
    // --- Kitap Detay Modal'ı ---
    const modal    = document.getElementById('bookModal');
    const titleEl  = document.getElementById('modalTitle');
    const descEl   = document.getElementById('modalDesc');
    const closeBtn = modal ? modal.querySelector('.modal-close') : null;
  
    if (modal && titleEl && descEl && closeBtn) {
      
      document.querySelectorAll('.book-row img').forEach(img => {
        img.addEventListener('click', () => {
          titleEl.textContent = img.dataset.title;
          descEl.textContent  = img.dataset.desc;
          modal.style.display = 'flex';
        });
      });
  
      
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
  
      
      modal.addEventListener('click', e => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    }
  });
  
  