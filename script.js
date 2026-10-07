// ============================================
// EDIT YOUR CONTACT DETAILS HERE (only place)
// email: your email address
// whatsapp: number with country code, digits only (e.g. 919876543210)
// ============================================
const CONFIG = {
  email: "ablegerard.work@gmail.com",
  whatsapp: "919497339947",
  whatsappMessage: "Hi Able, I'd like to discuss a website project."
};

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
 // Contact links
  document.querySelectorAll('[data-contact="email"]').forEach(a => {
    // Uses direct Gmail web compose URL instead of mailto:
    a.href = "https://mail.google.com/mail/?view=cm&fs=1&to=" + CONFIG.email + "&su=" + encodeURIComponent("Website project enquiry");
    
    // Forces it to open in a new tab so they don't lose your portfolio page
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.querySelectorAll('[data-contact="whatsapp"]').forEach(a => {
    a.href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(CONFIG.whatsappMessage);
  });
  document.querySelectorAll('[data-text="email"]').forEach(el => (el.textContent = CONFIG.email));

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Close mobile menu after tapping a link
  const menu = document.getElementById("menu");
  document.querySelectorAll("#menu .nav-link").forEach(link =>
    link.addEventListener("click", () => {
      if (menu.classList.contains("show")) bootstrap.Collapse.getInstance(menu)?.hide();
    })
  );

  // Highlight current section in nav
  const links = [...document.querySelectorAll("#menu .nav-link")];
  const map = new Map(links.map(l => [l.getAttribute("href").slice(1), l]));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && map.has(e.target.id)) {
        links.forEach(l => l.classList.remove("active"));
        map.get(e.target.id).classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });

  // Reveal on scroll
  const rv = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window) {
    const ro = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); }
    }), { threshold: 0.12 });
    rv.forEach(el => ro.observe(el));
  } else rv.forEach(el => el.classList.add("in"));
});
