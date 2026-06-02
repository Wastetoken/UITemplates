document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);
  // Initial Stagger Reveal on Load (Scroll Driven setup)
  gsap.from(".bento-item", {
    scrollTrigger: {
      trigger: ".bento-container",
      start: "top 85%", // Triggers when the top of the container hits 85% down the viewport
      toggleActions: "play none none none"
    },
    y: 80,
    opacity: 0,
    duration: 1.2,
    stagger: 0.08,
    ease: "power4.out"
  });
  // Parallax effect on the images within cards as user scrolls
  gsap.utils.toArray(".woman-card img, .cube-card img").forEach((img) => {
    gsap.to(img, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: img.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });
  // Interactive Button Magnetic Effect
  const btnPrimary = document.querySelector(".btn-primary");
  btnPrimary.addEventListener("mousemove", (e) => {
    const rect = btnPrimary.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btnPrimary, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: "power2.out"
    });
  });
  btnPrimary.addEventListener("mouseleave", () => {
    gsap.to(btnPrimary, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  });
});
