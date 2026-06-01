document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  // Initial Timeline
  const tl = gsap.timeline();
  // Header fade in
  tl.from(".gsap-fade", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
  });
  // Headline stagger
  tl.from(
    ".gsap-stagger",
    {
      x: -30,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    },
    "-=0.6"
  );
  // Bento Grid Pop-in
  tl.from(
    ".gsap-bento",
    {
      scale: 0.9,
      x: 50,
      opacity: 0,
      duration: 1.2,
      ease: "back.out(1.2)"
    },
    "-=0.8"
  );
  // Black card & man slide up
  tl.from(
    ".black-card",
    {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    },
    "-=0.6"
  );
  tl.from(
    ".man-cutout",
    {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.5)"
    },
    "-=0.4"
  );
  // Background building fade in
  tl.from(
    ".bg-building",
    {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out"
    },
    "-=1.5"
  );
  // --- Continuous "Clay" Floating Animations ---
  // Enhances the 3D matte feel by making elements look suspended
  gsap.utils.toArray(".clay-anim").forEach((el, index) => {
    gsap.to(el, {
      y: "-=6",
      rotation: index % 2 === 0 ? 1 : -1,
      duration: 2.5 + index * 0.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });
  // --- Parallax Scroll Effects ---
  // Building moves up slightly on scroll
  gsap.to(".bg-building", {
    y: -50,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
  // Bento box shifts slightly for 3D depth
  gsap.to(".bento-wrapper", {
    y: -30,
    rotation: 2,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1
    }
  });
});