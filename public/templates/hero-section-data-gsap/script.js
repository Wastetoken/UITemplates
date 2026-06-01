document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  // 1. Initial Entrance Animations
  const tl = gsap.timeline();
  tl.from(".gsap-nav", {
    y: -30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  }).from(
    ".gsap-left",
    {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    },
    "-=0.4"
  );
  // Setup SVG lines for drawing animation
  const paths = document.querySelectorAll(".line-path");
  paths.forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    });
  });
  // Draw lines outward from center
  tl.to(
    ".line-path",
    {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut",
      stagger: {
        amount: 0.5,
        from: "start"
      }
    },
    "-=0.6"
  )
    // Pop in the nodes
    .from(
      ".node-container",
      {
        scale: 0,
        opacity: 0,
        rotation: () => gsap.utils.random(-15, 15),
        duration: 0.8,
        stagger: {
          amount: 0.8,
          from: "center"
        },
        ease: "back.out(1.5)"
      },
      "-=1.2"
    );
  // 2. Continuous Organic Floating for Nodes
  // Gives the heavy clay elements a feeling of suspension
  gsap.utils.toArray(".clay-float").forEach((el, i) => {
    gsap.to(el, {
      y: "-=8",
      rotation: "1",
      duration: 2.5 + i * 0.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.1
    });
  });
  gsap.utils.toArray(".clay-float-alt").forEach((el, i) => {
    gsap.to(el, {
      y: "+=8",
      rotation: "-1",
      duration: 2.8 + i * 0.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.15
    });
  });
  // Specific animation for workspace feature cards
  gsap.utils.toArray(".float-anim").forEach((el, i) => {
    gsap.to(el, {
      y: "-=5",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });
  gsap.utils.toArray(".float-anim-alt").forEach((el, i) => {
    gsap.to(el, {
      y: "+=5",
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5
    });
  });
  // 3. Scroll-Driven Parallax Effect
  // The whole right column diagram shifts slightly down on scroll to create depth
  gsap.to(".right-col", {
    y: 80,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom top",
      scrub: 1
    }
  });
  // Center node pulse effect
  gsap.to(".n-center .node", {
    scale: 1.02,
    boxShadow:
      "10px 15px 25px rgba(0,0,0,0.2), inset 2px 4px 8px rgba(255,255,255,0.2), inset -2px -4px 8px rgba(0,0,0,0.5)",
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
});