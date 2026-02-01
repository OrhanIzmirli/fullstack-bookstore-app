// Tema uygulama fonksiyonu
function applyTheme(theme, btn) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    btn.setAttribute('aria-pressed', 'true');
  } else {
    document.documentElement.removeAttribute('data-theme');
    btn.setAttribute('aria-pressed', 'false');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // ✅ Firebase yapılandırması
  const firebaseConfig = {
    apiKey: "AIzaSyAlmzmtJTprvoam8XN-OhazoRkOaIDMsgA",
    authDomain: "kitaplikproje.firebaseapp.com",
    projectId: "kitaplikproje",
    storageBucket: "kitaplikproje.appspot.com",
    messagingSenderId: "933048937675",
    appId: "1:933048937675:web:93bba4b08d30cda26cbf4e"
  };
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();

  // Tema düğmesi
  const toggleBtn = document.querySelector('.darkmode-toggle');
  if (toggleBtn) {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme, toggleBtn);
    toggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const next = isDark ? 'light' : 'dark';
      applyTheme(next, toggleBtn);
      localStorage.setItem('theme', next);
    });
  }

  // Şifre güç göstergesi
  const pwdInput = document.getElementById('password');
  const strengthBar = document.querySelector('.strength-bar');
  const strengthTxt = document.getElementById('strength-text');
  if (pwdInput && strengthBar && strengthTxt) {
    pwdInput.addEventListener('input', () => {
      const score = window.zxcvbn ? zxcvbn(pwdInput.value).score : Math.min(4, Math.floor(pwdInput.value.length / 4));
      const pct = (score / 4) * 100;
      strengthBar.style.width = pct + '%';
      strengthBar.classList.remove('strength-weak', 'strength-medium', 'strength-strong');
      if (score <= 1) {
        strengthBar.classList.add('strength-weak');
        strengthTxt.textContent = 'Weak';
      } else if (score <= 3) {
        strengthBar.classList.add('strength-medium');
        strengthTxt.textContent = 'Medium';
      } else {
        strengthBar.classList.add('strength-strong');
        strengthTxt.textContent = 'Strong';
      }
    });
  }

  // Şifre göster/gizle
  function setupToggle(sel, id) {
    const btn = document.querySelector(sel);
    const inp = document.getElementById(id);
    if (btn && inp) {
      btn.addEventListener('click', () => {
        const isPwd = inp.getAttribute('type') === 'password';
        inp.setAttribute('type', isPwd ? 'text' : 'password');
        btn.textContent = isPwd ? '🙈' : '👁️';
      });
    }
  }
  setupToggle('.toggle-password', 'password');
  setupToggle('.toggle-confirm-password', 'confirmPassword');

  // Şifre eşleşme kontrolü
  const confirmInput = document.getElementById('confirmPassword');
  if (pwdInput && confirmInput) {
    const checkMatch = () => {
      confirmInput.setCustomValidity(
        confirmInput.value && confirmInput.value !== pwdInput.value
          ? "Passwords do not match"
          : ""
      );
    };
    pwdInput.addEventListener('input', checkMatch);
    confirmInput.addEventListener('input', checkMatch);
  }

  // Kullanım şartları popup
  const termsLink = document.getElementById('terms-link');
  const termsPopup = document.getElementById('terms-popup');
  const termsClose = document.getElementById('terms-close');
  if (termsLink && termsPopup && termsClose) {
    termsLink.addEventListener('click', e => {
      e.preventDefault();
      termsPopup.classList.remove('hidden');
    });
    termsClose.addEventListener('click', () => {
      termsPopup.classList.add('hidden');
    });
  }

  // Kayıt formu
  const form = document.getElementById('memberForm');
  const popup = document.getElementById('success-popup');
  const popupClose = document.getElementById('popup-close');
  if (form && popup && popupClose) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const userData = {
        name: document.getElementById('name').value.trim(),
        surname: document.getElementById('surname').value.trim(),
        username: document.getElementById('username').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value.trim(),
        dob: document.getElementById('dob').value,
        phoneCountry: document.getElementById('phone-country').value,
        phone: document.getElementById('phone').value.trim()
      };

      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });

        const result = await res.json();
        if (res.ok) {
          popup.classList.remove('hidden');
        } else {
          alert(result.message || "Signup failed.");
        }
      } catch (err) {
        alert("Server error, signup failed.");
        console.error(err);
      }
    });

    popupClose.addEventListener('click', () => {
      popup.classList.add('hidden');
      form.reset();
    });
  }

  // ✅ Google ile Giriş
  const googleBtn = document.querySelector(".social-btn.google");
  if (googleBtn) {
    googleBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
        const result = await auth.signInWithPopup(provider);
        const user = result.user;

       await db.collection("users").doc(uid).set({
  name,
  surname,
  email,
  password,
  username,
  phone,
  dob,
  role: "user",
  createdAt: new Date()
});
        localStorage.setItem("currentUser", user.email);
        window.location.href = "shop.html";
      } catch (err) {
        console.error("Google sign-in error:", err.message);
        alert("Google login failed.");
      }
    });
  }

  // ✅ Facebook ile Giriş
  const facebookBtn = document.querySelector(".social-btn.facebook");
  if (facebookBtn) {
    facebookBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const provider = new firebase.auth.FacebookAuthProvider();
      try {
        const result = await auth.signInWithPopup(provider);
        const user = result.user;

        await db.collection("users").doc(user.uid).set({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          registeredAt: new Date()
        });

        localStorage.setItem("currentUser", user.email);
        window.location.href = "shop.html";
      } catch (err) {
        console.error("Facebook sign-in error:", err.message);
        alert("Facebook login failed.");
      }
    });
  }
});
