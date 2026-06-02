document.addEventListener("DOMContentLoaded", () => {
  // 1. Initial Entrance Animations (Staggered Fade Up)
  gsap.from(".fade-up", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out"
  });
  // 2. Continuous 3D Floating Animations for Clay Icons
  // Main Top Icon & Mission Icon
  gsap.to(".floating", {
    y: "-=12",
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  // Feature Icons with staggered delays for organic feel
  gsap.to(".floating-delay-1", {
    y: "-=10",
    duration: 2.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0
  });
  gsap.to(".floating-delay-2", {
    y: "-=10",
    duration: 2.4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.3
  });
  gsap.to(".floating-delay-3", {
    y: "-=10",
    duration: 2.3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.6
  });
  // Form Submit Interaction Prevention for Demo
  const form = document.querySelector(".waitlist-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector(".btn-dark");
    const originalText = btn.innerText;
    btn.innerText = "Joined!";
    btn.style.backgroundColor = "#22c55e"; // Success green
    setTimeout(() => {
      btn.innerText = originalText;
      btn.style.backgroundColor = "var(--clay-dark-bg)";
      form.reset();
    }, 2000);
  });
});