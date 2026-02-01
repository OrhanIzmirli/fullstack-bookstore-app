document.addEventListener("DOMContentLoaded", () => {
  // ✅ Firebase Config ve Başlatma
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

  // 🔁 Tema
  const dmBtn = document.querySelector('.darkmode-toggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme, dmBtn);
  dmBtn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next, dmBtn);
    localStorage.setItem('theme', next);
  });

  function applyTheme(theme, btn) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      document.documentElement.removeAttribute('data-theme');
      btn.setAttribute('aria-pressed', 'false');
    }
  }

  // 🔁 Şifre göster/gizle
  const pwInput = document.getElementById('password');
  const pwToggle = document.querySelector('.pw-toggle');
  pwToggle.addEventListener('click', () => {
    const isPwd = pwInput.type === 'password';
    pwInput.type = isPwd ? 'text' : 'password';
    pwToggle.textContent = isPwd ? '🙈' : '👁️';
  });

  // 🔁 Form login (manuel giriş)
  const form = document.getElementById("loginForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const result = await res.json();

      if (res.ok) {
        alert("Login successful!");
        localStorage.setItem("currentUser", result.user?.email || result.email);
        const user = result.user;
        localStorage.setItem("email", user.email || "");
        localStorage.setItem("name", user.name || "");
        localStorage.setItem("role", user.role || "user");

        window.location.href = "shop.html";
      } else {
        document.getElementById("userError").textContent = "";
        document.getElementById("passError").textContent = "";
        if (result.message.toLowerCase().includes("email")) {
          document.getElementById("userError").textContent = result.message;
        } else {
          document.getElementById("passError").textContent = result.message;
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred.");
    }
  });

  // ✅ Google Login
  document.querySelector(".social-btn.google").addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        db.collection("users").doc(user.uid).set({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          createdAt: new Date()
        });
        localStorage.setItem("currentUser", user.email);

        localStorage.setItem("role", "user");

        window.location.href = "shop.html";
      })
      .catch(console.error);
  });

  // ✅ Facebook Login
  document.querySelector(".social-btn.facebook").addEventListener("click", () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        db.collection("users").doc(user.uid).set({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          createdAt: new Date()
        });
        localStorage.setItem("currentUser", user.email);

        localStorage.setItem("role", "user");

        window.location.href = "shop.html";
      })
      .catch(console.error);
  });
});
