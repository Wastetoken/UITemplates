document.addEventListener("DOMContentLoaded", () => {
  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // 1. Initial Entrance Animations
  const tl = gsap.timeline();

  // Center Tiles pop in
  tl.from(".tile", {
    y: 80,
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    stagger: {
      amount: 0.8,
      from: "center",
      grid: "auto"
    },
    ease: "back.out(1.5)"
  })
    // Left Column slide in
    .from(
      ".gsap-fade-left",
      {
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      },
      "-=1.2"
    )
    // Right Column slide in
    .from(
      ".gsap-fade-right",
      {
        x: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      },
      "-=1.2"
    );

  // 2. Interactive 3D Hover on Tiles
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) => {
    tile.addEventListener("mouseenter", () => {
      gsap.to(tile, {
        scale: 1.08,
        z: 20,
        zIndex: 10,
        duration: 0.4,
        ease: "back.out(2)",
        boxShadow:
          "20px 20px 40px rgba(0,0,0,0.15), -15px -15px 30px rgba(255,255,255,0.9)"
      });
    });

    tile.addEventListener("mouseleave", () => {
      gsap.to(tile, {
        scale: 1,
        z: 0,
        zIndex: 1,
        duration: 0.4,
        ease: "power2.out",
        boxShadow:
          "15px 15px 30px rgba(0,0,0,0.08), -10px -10px 20px rgba(255,255,255,0.9)"
      });
    });
  });

  // 3. Scroll-Driven Parallax for Columns
  // Moves the staggered columns slightly up/down as you scroll
  gsap.to(".col-0", {
    y: -40,
    ease: "none",
    scrollTrigger: {
      trigger: ".grid-container",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.to(".col-1", {
    y: 30,
    ease: "none",
    scrollTrigger: {
      trigger: ".grid-container",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.to(".col-2", {
    y: -20,
    ease: "none",
    scrollTrigger: {
      trigger: ".grid-container",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.to(".col-3", {
    y: 50,
    ease: "none",
    scrollTrigger: {
      trigger: ".grid-container",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  // Floating animation for subtle continuous movement
  gsap.to(".grid-container", {
    y: "-=10",
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
});