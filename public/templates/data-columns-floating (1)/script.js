document.addEventListener("DOMContentLoaded", () => {
  // Main container drop-in
  gsap.from(".container", {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // Header elements fade in
  gsap.from(".header", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    delay: 0.3,
    ease: "power2.out"
  });

  // Left panel slides in slightly
  gsap.from(".left-panel", {
    x: -30,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: "power3.out"
  });

  // Tags stagger pop-in
  gsap.from(".tag", {
    scale: 0.8,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    delay: 0.9,
    ease: "back.out(1.5)"
  });

  // Right dark panel slides in and begins floating to emphasize 3D chunkiness
  gsap.from(".right-panel", {
    x: 60,
    y: 20,
    opacity: 0,
    duration: 1.2,
    delay: 0.6,
    ease: "power3.out",
    onComplete: () => {
      // Continuous subtle floating animation for the 3D matte card
      gsap.to(".right-panel", {
        y: "-=12",
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  });
});