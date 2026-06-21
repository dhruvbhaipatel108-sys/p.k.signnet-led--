const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".reveal").forEach((element) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  observer.observe(element);
});

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    lightboxImage.src = button.dataset.lightbox;
    lightboxImage.alt = button.querySelector("img")?.alt || "Gallery preview";
    lightbox.classList.add("open");
  });
});

document.querySelector("[data-close-lightbox]")?.addEventListener("click", () => {
  lightbox.classList.remove("open");
});

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.classList.remove("open");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    lightbox?.classList.remove("open");
  }
});

const contactForm = document.querySelector("#contactForm");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#contactStatus").textContent = "Thank you. Your lighting enquiry has been prepared for the P.K. Signnate LED team.";
  contactForm.reset();
});

const loginForm = document.querySelector("#loginForm");
const loginPanel = document.querySelector("#loginPanel");
const logoutPanel = document.querySelector("#logoutPanel");
const logoutButton = document.querySelector("#logoutButton");

const updateAuthPanel = () => {
  const savedUser = localStorage.getItem("pkSignnateUser");
  if (!loginPanel || !logoutPanel) {
    return;
  }

  loginPanel.hidden = Boolean(savedUser);
  logoutPanel.hidden = !savedUser;
  loginPanel.classList.toggle("visible", !savedUser);
  logoutPanel.classList.toggle("visible", Boolean(savedUser));

  const logoutMessage = document.querySelector("#logoutMessage");
  if (logoutMessage && savedUser) {
    logoutMessage.textContent = `${savedUser}, you can logout from this same page.`;
  }
};

updateAuthPanel();

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const userName = String(formData.get("username") || "").trim();
  localStorage.setItem("pkSignnateUser", userName || "Customer");
  document.querySelector("#loginStatus").textContent = "Login successful. Welcome to P.K. Signnate LED.";
  loginForm.reset();
  updateAuthPanel();
});

logoutButton?.addEventListener("click", () => {
  localStorage.removeItem("pkSignnateUser");
  updateAuthPanel();
  const loginStatus = document.querySelector("#loginStatus");
  if (loginStatus) {
    loginStatus.textContent = "You have successfully logged out.";
  }
});
