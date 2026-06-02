gsap.registerPlugin(ScrollTrigger);

// Initial Reveal Animation
gsap.from(".navbar", { y: -20, opacity: 0, duration: 1, ease: "power3.out" });
gsap.from(".gs-reveal", {
  y: 30,
  opacity: 0,
  duration: 1,
  stagger: 0.15,
  ease: "power3.out",
  delay: 0.2
});

// Floating 3D Icons Animation
gsap.to(".icon-blue", {
  y: -25,
  rotation: 8,
  duration: 3.5,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});
gsap.to(".icon-green", {
  y: 20,
  rotation: -6,
  duration: 4,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  delay: 0.5
});
gsap.to(".icon-white", {
  y: -15,
  rotation: 10,
  duration: 3.2,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  delay: 1
});
gsap.to(".icon-gradient", {
  y: 25,
  rotation: -8,
  duration: 3.8,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  delay: 0.2
});

// Scroll-Driven Animation for Features
gsap.from(".feature-reveal", {
  scrollTrigger: {
    trigger: ".features",
    start: "top 85%" // Triggers when the top of the features section hits 85% of viewport
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power2.out"
});
