document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Initial Load Animations
  const tl = gsap.timeline();

  // Header drops down
  tl.from(".gsap-fade-down", {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // Hero text and button pop up with a slight bounce
  tl.from(
    ".gsap-pop-up",
    {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "back.out(1.5)"
    },
    "-=0.5"
  );

  // Clay blocks pop in randomly
  tl.from(
    ".clay-block",
    {
      scale: 0,
      opacity: 0,
      rotation: () => gsap.utils.random(-30, 30),
      duration: 1.2,
      stagger: {
        amount: 0.8,
        from: "random"
      },
      ease: "elastic.out(1, 0.5)"
    },
    "-=1"
  );

  // 2. Continuous Ambient Floating Animation (Creates the 3D suspended feel)
  const clayBlocks = gsap.utils.toArray(".clay-block");
  clayBlocks.forEach((block) => {
    // Random organic movement
    gsap.to(block, {
      y: `+=${gsap.utils.random(15, 30)}`,
      x: `+=${gsap.utils.random(-10, 10)}`,
      rotation: `+=${gsap.utils.random(-5, 5)}`,
      duration: gsap.utils.random(3, 5),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: gsap.utils.random(0, 2)
    });
  });

  // 3. Scroll-Driven Parallax Animations
  // When the user scrolls, the floating elements move at different speeds
  clayBlocks.forEach((block) => {
    const speed = block.getAttribute("data-speed");

    gsap.to(block, {
      y: () => -150 * speed,
      rotation: () => gsap.utils.random(-15, 15),
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom top",
        scrub: 1.5 // Smooth scrubbing
      }
    });
  });

  // Hero content fades out on scroll down
  gsap.to(".hero-content", {
    opacity: 0,
    y: -50,
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "300px top",
      scrub: 1
    }
  });

  // 4. Mouse Move Parallax (Interactive)
  // Adds depth as the user moves their mouse around the screen
  document.addEventListener("mousemove", (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

    clayBlocks.forEach((block) => {
      const speed = block.getAttribute("data-speed");
      gsap.to(block, {
        x: xAxis * speed,
        y: yAxis * speed,
        duration: 1,
        ease: "power1.out",
        overwrite: "auto"
      });
    });
  });

  // Interactive Hover for Clay Blocks (Scale up and rotate slightly towards camera)
  clayBlocks.forEach((block) => {
    block.addEventListener("mouseenter", () => {
      gsap.to(block, {
        scale: 1.1,
        duration: 0.4,
        ease: "back.out(2)",
        overwrite: "auto"
      });
    });
    block.addEventListener("mouseleave", () => {
      gsap.to(block, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
  });
});