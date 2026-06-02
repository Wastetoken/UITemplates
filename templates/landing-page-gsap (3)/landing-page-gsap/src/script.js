document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  // 1. Initial Hero Load
  const heroTl = gsap.timeline();
  heroTl
    .from("nav", {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .from(
      ".hero-content > *",
      {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      },
      "-=0.5"
    )
    .from(
      ".main-img-card",
      {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.2)"
      },
      "-=0.6"
    )
    .from(
      ".stat-card, .brand-badge",
      {
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: "back.out(1.5)"
      },
      "-=0.4"
    );
  // 2. Floating Animations for clay elements to emphasize 3D
  gsap.to(".float-anim-1", {
    y: "-=12",
    rotation: "-2deg",
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  gsap.to(".float-anim-2", {
    y: "-=8",
    rotation: "2deg",
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.5
  });
  // 3. Infinite Marquee
  gsap.to(".marquee-track", {
    xPercent: -50,
    ease: "none",
    duration: 20,
    repeat: -1
  });
  // 4. Scroll Reveal: About Section
  gsap.from(".about-top > *", {
    scrollTrigger: {
      trigger: ".about",
      start: "top 75%"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
  });
  // Reveal Bento Box
  gsap.from(".about-bento", {
    scrollTrigger: {
      trigger: ".about-bento",
      start: "top 80%"
    },
    y: 50,
    scale: 0.95,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  });
  // Parallax inside Bento Box
  gsap.from(".about-img-bento", {
    scrollTrigger: {
      trigger: ".about-bento",
      start: "top 80%",
      scrub: 1
    },
    y: 60,
    ease: "none"
  });
  // 5. Scroll Reveal: Process Cards (Staggered pop in)
  gsap.from(".process-header > *", {
    scrollTrigger: {
      trigger: ".process",
      start: "top 75%"
    },
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8
  });
  const pCards = gsap.utils.toArray(".pcard");
  pCards.forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      scale: 0.5,
      opacity: 0,
      rotation: gsap.utils.random(-15, 15),
      duration: 0.8,
      ease: "back.out(1.5)"
    });
  });
});
