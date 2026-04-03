const API_BASE = "http://localhost:5000/api";

/* ─── AUTH HELPERS ─────────────────────────────── */
function getToken() { return localStorage.getItem("token"); }
function getUser()  { return JSON.parse(localStorage.getItem("user") || "null"); }

function authHeaders() {
  return { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` };
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "landing.html";
}

/* ─── LISTINGS ─────────────────────────────────── */
async function loadListings(params = {}) {
  const container = document.getElementById("listings");
  if (!container) return;

  // Show skeleton loaders
  container.innerHTML = Array(6).fill(`
    <div class="card skeleton">
      <div class="skel-img"></div>
      <div class="skel-line"></div>
      <div class="skel-line short"></div>
    </div>
  `).join('');

  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/listings${query ? "?" + query : ""}`);
    const json = await res.json();

    if (!json.items || json.items.length === 0) {
      container.innerHTML = `<div class="empty-state">
        <p>😔 No listings found</p>
        <a href="create.html" class="btn-pill">Be the first to sell!</a>
      </div>`;
      return;
    }

    container.innerHTML = json.items.map(l => `
      <div class="card" onclick="window.location='listing.html?id=${l._id}'">
        <div class="card-img-wrap">
          <img src="${l.images?.[0] ? API_BASE + l.images[0] : 'https://via.placeholder.com/300x200?text=No+Image'}"
               alt="${l.title}" loading="lazy" />
          <span class="cat-tag">${l.category || 'Other'}</span>
        </div>
        <div class="card-body">
          <h3>${l.title}</h3>
          <p class="price">₹${Number(l.price).toLocaleString('en-IN')}</p>
          <p class="seller">by ${l.seller?.name || 'Unknown'} · ${l.college || ''}</p>
        </div>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = `<div class="empty-state"><p>⚠️ Could not load listings. Is the server running?</p></div>`;
  }
}

/* ─── SINGLE LISTING ───────────────────────────── */
async function loadListing() {
  const id = new URLSearchParams(location.search).get("id");
  if (!id) return;

  try {
    const res = await fetch(`${API_BASE}/listings/${id}`);
    const l = await res.json();

    document.getElementById("listing-title").textContent = l.title;
    document.getElementById("listing-price").textContent = `₹${Number(l.price).toLocaleString('en-IN')}`;
    document.getElementById("listing-desc").textContent = l.description;
    document.getElementById("listing-category").textContent = l.category;
    document.getElementById("listing-seller").textContent = l.seller?.name || "Unknown";
    document.getElementById("listing-college").textContent = l.college || "";

    const gallery = document.getElementById("listing-gallery");
    if (gallery) {
      gallery.innerHTML = l.images?.length
        ? l.images.map(img => `<img src="${API_BASE}${img}" alt="${l.title}" />`).join('')
        : `<img src="https://via.placeholder.com/500x350?text=No+Image" alt="No image" />`;
    }

    const waBtn = document.getElementById("contact-btn");
    if (waBtn && l.seller?.phone) {
      const msg = encodeURIComponent(`Hi! I saw your listing "${l.title}" on Campus Cart for ₹${l.price}. Is it still available?`);
      waBtn.href = `https://wa.me/91${l.seller.phone}?text=${msg}`;
    }
  } catch (err) {
    console.error("Failed to load listing:", err);
  }
}

/* ─── NAV / USER ACTIONS ───────────────────────── */
window.addEventListener("DOMContentLoaded", () => {
  const token = getToken();
  const user = getUser();

  // User actions nav
  const userActions = document.getElementById("userActions");
  if (userActions) {
    if (token && user) {
      userActions.innerHTML = `
        <span class="nav-name">👋 ${user.name.split(' ')[0]}</span>
        <a href="create.html" class="btn-small">+ Sell</a>
        <button onclick="logout()" class="btn-small logout">Logout</button>
      `;
    } else {
      userActions.innerHTML = `
        <a href="login.html" class="btn-small">Login</a>
        <a href="register.html" class="btn-small accent">Register</a>
      `;
    }
  }

  // Sell strip
  const sellStrip = document.getElementById("sellStrip");
  if (sellStrip) {
    sellStrip.style.display = token ? "flex" : "none";
  }
});

/* ─── CLOSE SELL STRIP ─────────────────────────── */
function closeSell() {
  const strip = document.getElementById("sellStrip");
  if (!strip) return;
  strip.style.transition = "all 0.4s ease";
  strip.style.opacity = "0";
  strip.style.height = "0";
  strip.style.padding = "0";
  strip.style.overflow = "hidden";
}
