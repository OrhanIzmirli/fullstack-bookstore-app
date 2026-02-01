// ✅ Ödeme başarılıysa siparişi kaydet ve sepeti boşalt
if (window.location.search.includes("success=true")) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

  const newOrders = cartItems.map(item => ({
    ...item,
    date: new Date().toISOString()
  }));

  localStorage.setItem("orders", JSON.stringify([...existingOrders, ...newOrders]));
  localStorage.removeItem("cart");

  alert("🟢 Payment completed successfully! Your order has been placed.");
  window.history.replaceState({}, document.title, "shop.html");
}

// shop.js
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const profileBtn = document.getElementById("profileBtn");

  if (user && (user.username || user.name)) {
    profileBtn.textContent = user.username || user.name;
  } else {
    profileBtn.textContent = "Guest";
  }

  // ✅ Logout butonu
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "login.html";
    });
  }

  // ✅ Dark mode toggle
  const darkToggle = document.querySelector(".darkmode-toggle");
  if (darkToggle) {
    darkToggle.addEventListener("click", function () {
      const html = document.documentElement;
      const isDark = html.getAttribute("data-theme") === "dark";
      html.setAttribute("data-theme", isDark ? "light" : "dark");
      this.setAttribute("aria-pressed", !isDark);
    });
  }

  // ✅ Admin linkini göster
  const role = localStorage.getItem("role");
  if (role === "admin") {
    const adminLinkWrapper = document.getElementById("adminLinkWrapper");
    if (adminLinkWrapper) {
      adminLinkWrapper.style.display = "inline-block";
    }
  }

  // ✅ Checkout Stripe link
  const checkoutBtn = document.getElementById("checkout");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      window.location.href = "https://buy.stripe.com/test_9B67sEf5T1awgSb2JG4gg00";
    });
  }
});


  // Elements
  const grid            = document.getElementById('productGrid');
  const loader          = document.getElementById('loader');
  const cartBtn         = document.getElementById('cartBtn');
  const wishlistBtn     = document.getElementById('wishlistBtn');
  const cartSidebar     = document.getElementById('cartSidebar');
  const wishlistSidebar = document.getElementById('wishlistSidebar');
  const closeCart       = document.getElementById('closeCart');
  const closeWishlist   = document.getElementById('closeWishlist');
  const cartCount       = document.getElementById('cartCount');
  const wishlistCount   = document.getElementById('wishlistCount');
  const cartItems       = document.getElementById('cartItems');
  const wishlistItems   = document.getElementById('wishlistItems');
  const cartTotal       = document.getElementById('cartTotal');
  const checkoutBtn     = document.getElementById('checkoutBtn');
  const clearWishlistBtn= document.getElementById('clearWishlist');
  const searchInput     = document.getElementById('searchInput');
  const sortSelect      = document.getElementById('sortSelect');

  const modalOverlay    = document.getElementById('modalOverlay');
  const closeModal      = document.getElementById('closeModal');
  const modalTitle      = document.getElementById('modalTitle');
  const modalDesc       = document.getElementById('modalDesc');
  const modalSubjects   = document.getElementById('modalSubjects');
  const modalDate       = document.getElementById('modalDate');
  const reviewsContainer= document.getElementById('reviewsContainer');
  const submitReviewBtn = document.getElementById('submitReview');
  const reviewText      = document.getElementById('reviewText');
  const starInputs      = document.querySelectorAll('.star-input label');

  // State
  let cart       = JSON.parse(localStorage.getItem('cart')||'[]');
  let wishlist   = JSON.parse(localStorage.getItem('wishlist')||'[]');
  let allBooks   = [];
  let offset     = 0, limit = 24, totalWorks = Infinity, loading = false;
  let currentWorkKey = null;

  // Cart toggle
  cartBtn.addEventListener('click', () => cartSidebar.classList.toggle('open'));
  closeCart.addEventListener('click', () => cartSidebar.classList.remove('open'));
 checkoutBtn.addEventListener("click", () => {
  if (!cart.length) return alert("Your cart is empty!");
  fetch("/api/payment/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ items: cart })
  })
    .then(res => res.json())
    .then(data => {
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("⚠️ Failed to start payment.");
      }
    })
    .catch(err => {
      console.error("Checkout error:", err);
      alert("⚠️ Error during checkout.");
    });
});

  // Wishlist toggle
  wishlistBtn.addEventListener('click', () => wishlistSidebar.classList.toggle('open'));
  closeWishlist.addEventListener('click', () => wishlistSidebar.classList.remove('open'));
  clearWishlistBtn.addEventListener('click', () => {
    wishlist = [];
    saveWishlist(); renderWishlist();
  });

  // Search & sort
  searchInput.addEventListener('input', renderGrid);
  sortSelect.addEventListener('change', renderGrid);

  // Infinite scroll
  window.addEventListener('scroll', () => {
    if (loading || allBooks.length >= totalWorks) return;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      loadPage();
    }
  });

  // Initial load
  loadPage();

  function loadPage(){
    loading = true;
    loader.style.display = 'block';
    fetch(`https://openlibrary.org/subjects/fiction.json?limit=${limit}&offset=${offset}`)
      .then(res => { if (!res.ok) throw new Error(res.status); return res.json(); })
      .then(data => {
        totalWorks = data.work_count;
        offset += limit;
        data.works.forEach(w => {
          allBooks.push({
            id: w.key,
            title: w.title,
            authors: w.authors.map(a=>a.name).join(', '),
            img: w.cover_id
              ? `https://covers.openlibrary.org/b/id/${w.cover_id}-L.jpg`
              : 'images/placeholder.png',
            price: parseFloat((Math.random()*20+5).toFixed(2))
          });
        });
        renderGrid();
      })
      .catch(console.error)
      .finally(() => {
        loading = false;
        loader.style.display = 'none';
      });
  }

  function renderGrid(){
    const term = searchInput.value.trim().toLowerCase();
    let list = allBooks.filter(b =>
      b.title.toLowerCase().includes(term) ||
      b.authors.toLowerCase().includes(term)
    );
    switch (sortSelect.value) {
      case 'title-asc':  list.sort((a,b)=>a.title.localeCompare(b.title)); break;
      case 'title-desc': list.sort((a,b)=>b.title.localeCompare(a.title)); break;
      case 'price-asc':  list.sort((a,b)=>a.price-b.price); break;
      case 'price-desc': list.sort((a,b)=>b.price-a.price); break;
    }

    grid.innerHTML = '';
    list.forEach(book => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${book.img}" alt="${book.title}">
        <div class="product-info">
          <div class="title">${book.title}</div>
          <div class="author">${book.authors}</div>
          <div class="price">$${book.price.toFixed(2)}</div>
          <div class="card-buttons">
            <button class="wish-btn">🤍</button>
            <button class="add-btn">Add to Cart</button>
          </div>
        </div>
      `;
      grid.append(card);

      // Cart button
      card.querySelector('.add-btn').addEventListener('click', e => {
        e.stopPropagation();
        addToCart(book);
      });

      // Wishlist button
      const wb = card.querySelector('.wish-btn');
      wb.textContent = wishlist.find(i=>i.id===book.id) ? '❤️' : '🤍';
      wb.addEventListener('click', e => {
        e.stopPropagation();
        toggleWishlist(book);
        wb.textContent = wishlist.find(i=>i.id===book.id) ? '❤️' : '🤍';
      });

      // Detail modal
      card.addEventListener('click', () => showDetail(book.id));
    });

    renderCart();
    renderWishlist();
  }

  // Cart functions
  function addToCart(book){
    const ex = cart.find(i=>i.id===book.id);
    if (ex) ex.qty++; else cart.push({...book,qty:1});
    saveCart(); renderCart();
  }
  function removeFromCart(id){
    cart = cart.filter(i=>i.id!==id);
    saveCart(); renderCart();
  }
  function renderCart(){
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(it => {
      total += it.price * it.qty;
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <img src="${it.img}" alt="${it.title}">
        <div class="details">
          <div class="name">${it.title}</div>
          <div class="qty">x${it.qty} • $${(it.price*it.qty).toFixed(2)}</div>
        </div>
        <button class="remove-btn">×</button>
      `;
      li.querySelector('.remove-btn').onclick = () => removeFromCart(it.id);
      cartItems.append(li);
    });
    cartCount.textContent = cart.reduce((s,i)=>s+i.qty,0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
  }
  function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Wishlist functions
  function toggleWishlist(book){
    if (wishlist.find(i=>i.id===book.id)) {
      wishlist = wishlist.filter(i=>i.id!==book.id);
    } else {
      wishlist.push(book);
    }
    saveWishlist(); renderWishlist();
  }
  function renderWishlist(){
    wishlistItems.innerHTML = '';
    wishlist.forEach(it => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <img src="${it.img}" alt="${it.title}">
        <div class="details">
          <div class="name">${it.title}</div>
        </div>
        <button class="remove-btn">×</button>
      `;
      li.querySelector('.remove-btn').onclick = () => {
        toggleWishlist(it);
        renderGrid();
      };
      wishlistItems.append(li);
    });
    wishlistCount.textContent = wishlist.length;
  }
  function saveWishlist(){
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }

  // Detail & Reviews modal
  closeModal.addEventListener('click', () => modalOverlay.style.display = 'none');

  function showDetail(workKey){
    currentWorkKey = workKey;
    reviewText.value = '';
    starInputs.forEach(l => l.classList.remove('checked'));
    document.querySelectorAll('input[name="rating"]').forEach(i => i.checked = false);
    loadReviews(workKey);

    fetch(`https://openlibrary.org${workKey}.json`)
      .then(res => res.json())
      .then(data => {
        modalTitle.textContent    = data.title || 'No title';
        modalDesc.textContent     = (data.description?.value || data.description || 'No description.');
        modalSubjects.textContent = (data.subjects || []).join(', ') || 'N/A';
        modalDate.textContent     = data.first_publish_date || 'N/A';
        modalOverlay.style.display = 'flex';
      })
      .catch(() => alert('Could not load book details.'));
  }

  // Reviews
  submitReviewBtn.addEventListener('click', () => {
    const rating = +[...document.querySelectorAll('input[name="rating"]')]
      .find(i => i.checked)?.value || 0;
    const text = reviewText.value.trim();
    if (!rating || !text) return alert('Select a rating and enter a comment.');
    const reviews = JSON.parse(localStorage.getItem(currentWorkKey) || '[]');
    reviews.push({ rating, text, date: new Date().toISOString() });
    localStorage.setItem(currentWorkKey, JSON.stringify(reviews));
    document.querySelectorAll('input[name="rating"]')
      .forEach(i => i.checked = false);
    starInputs.forEach(l => l.classList.remove('checked'));
    loadReviews(currentWorkKey);
  });

  function loadReviews(workKey){
    reviewsContainer.innerHTML = '';
    const reviews = JSON.parse(localStorage.getItem(workKey) || '[]');
    if (!reviews.length) {
      reviewsContainer.innerHTML = '<li>No reviews yet.</li>';
      return;
    }
    reviews.forEach(r => {
      const li = document.createElement('li');
      const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
      li.innerHTML = `
        <div class="review-header">
          <span class="stars">${stars}</span>
          <small>${new Date(r.date).toLocaleDateString()}</small>
        </div>
        <div class="review-text">${r.text}</div>
      `;
      reviewsContainer.append(li);
    });
  }

  // Star rating click
  starInputs.forEach(label => {
    label.addEventListener('click', () => {
      const val = +label.dataset.value;
      starInputs.forEach(l => {
        const v = +l.dataset.value;
        l.classList.toggle('checked', v <= val);
        l.querySelector('input').checked = (v === val);
      });
    });
  });
