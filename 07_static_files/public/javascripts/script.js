// Theme toggle
const htmlEl = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const themeBtnMobile = document.getElementById("themeBtnMobile");
const themeFab = document.getElementById("themeFab");

function toggleTheme() {
  htmlEl.classList.toggle("light");
  localStorage.setItem(
    "theme",
    htmlEl.classList.contains("light") ? "light" : "dark"
  );
  themeFab.textContent = htmlEl.classList.contains("light") ? "☾" : "☀︎";
}

// Init theme from storage
(function () {
  const saved = localStorage.getItem("theme");
  if (saved === "light") htmlEl.classList.add("light");
  themeFab.textContent = htmlEl.classList.contains("light") ? "☾" : "☀︎";
})();

themeBtn?.addEventListener("click", toggleTheme);
themeBtnMobile?.addEventListener("click", toggleTheme);
themeFab.addEventListener("click", toggleTheme);

// Mobile menu
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
menuToggle.addEventListener("click", () => mobileMenu.classList.toggle("open"));

// Scroll to top
document
  .getElementById("scrollTop")
  .addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Modal logic
const modal = document.getElementById("modal");
const openModalBtns = [
  document.getElementById("openModalBtn"),
  document.getElementById("openModalBtnMobile"),
].filter(Boolean);
const closeModalEls = [
  document.getElementById("closeModal"),
  document.getElementById("closeModal2"),
];

openModalBtns.forEach((btn) =>
  btn.addEventListener("click", () => modal.classList.remove("hidden"))
);
closeModalEls.forEach((btn) =>
  btn.addEventListener("click", () => modal.classList.add("hidden"))
);
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

// Toast
const toast = document.getElementById("toast");
const toastBtn = document.getElementById("toastBtn");
let toastTimer = null;
toastBtn.addEventListener("click", () => {
  toast.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add("hidden"), 2200);
});

// Demo form
const form = document.getElementById("demoForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  if (!email) {
    return;
  }
  toast.textContent = `Thanks! We'll notify ${email}`;
  toast.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add("hidden");
    toast.textContent = "Hello! This is a quick toast. 🎉";
  }, 2400);
  form.reset();
});
