document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Initial Entrance Animation
  const tl = gsap.timeline();

  tl.from(".gsap-fade", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out"
  }).from(
    ".gallery-card",
    {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "back.out(1.2)"
    },
    "-=0.4"
  );

  // 2. Continuous Floating Animation for the Center Card (Enhances 3D feel)
  gsap.to(".floating-element", {
    y: "-=15",
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 1 // Start after entrance animation
  });

  // 3. Scroll-Driven Spreading Animation
  // As the user scrolls down, the side cards push outwards
  gsap.to(".card-left", {
    x: -280, // Push further left
    rotation: -8,
    scale: 0.95,
    scrollTrigger: {
      trigger: ".gallery-wrapper",
      start: "top 70%",
      end: "bottom 30%",
      scrub: 1
    }
  });

  gsap.to(".card-right", {
    x: 280, // Push further right
    rotation: 8,
    scale: 0.95,
    scrollTrigger: {
      trigger: ".gallery-wrapper",
      start: "top 70%",
      end: "bottom 30%",
      scrub: 1
    }
  });

  // Subtle parallax on the center card during scroll
  gsap.to(".card-center", {
    y: 40,
    scrollTrigger: {
      trigger: ".gallery-wrapper",
      start: "top 70%",
      end: "bottom 30%",
      scrub: 1
    }
  });
});