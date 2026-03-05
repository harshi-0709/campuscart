const API_BASE = "http://localhost:5000/api";

// Load listings on home
async function loadListings(){
  const container = document.getElementById("listings");
  const res = await fetch(`${API_BASE}/listings`);
  const json = await res.json();
  container.innerHTML = json.items.map(l=>`
    <div class='card'>
      <img src='${API_BASE}${l.images?.[0] || ""}' alt='${l.title}' />
      <h3>${l.title}</h3>
      <p>₹${l.price}</p>
      <a href='listing.html?id=${l._id}'>View</a>
    </div>
  `).join('');
}
// Hide sell strip
function closeSell() {
  const strip = document.getElementById("sellStrip");
  if(strip) strip.classList.add("hide");
}

// Logout
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location = "login.html";
}

// Handle login/logout buttons
window.addEventListener("DOMContentLoaded", ()=>{
  const token = localStorage.getItem("token");
  const logoutBtn = document.getElementById("logoutBtn");
  if(logoutBtn){
    if(token){
      logoutBtn.style.display="inline-block";
      logoutBtn.onclick=()=>{localStorage.clear();location.reload();};
    } else logoutBtn.style.display="none";
  }
});
