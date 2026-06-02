document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  // 1. Initial Entrance
  const tl = gsap.timeline();
  tl.from(".gsap-fade", {
    y: -20,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  })
    .from(
      ".gsap-hero",
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      },
      "-=0.4"
    )
    .from(
      ".float-icon",
      {
        scale: 0,
        opacity: 0,
        rotation: () => gsap.utils.random(-30, 30),
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.5)"
      },
      "-=0.6"
    );
  // 2. Scroll Reveal for Cards
  gsap.from(".gsap-card", {
    y: 80,
    opacity: 0,
    scale: 0.9,
    rotation: () => gsap.utils.random(-2, 2),
    duration: 1,
    stagger: 0.15,
    ease: "back.out(1.2)",
    scrollTrigger: {
      trigger: ".bento-grid",
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });
  // 3. Continuous Organic Floating for Icons
  // Gives the heavy clay elements a suspended, soft feel
  gsap.utils.toArray(".float-anim").forEach((el, i) => {
    gsap.to(el, {
      y: "-=12",
      x: "+=5",
      rotation: "+=4",
      duration: 2.5 + i * 0.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.1
    });
  });
  gsap.utils.toArray(".float-anim-alt").forEach((el, i) => {
    gsap.to(el, {
      y: "+=12",
      x: "-=5",
      rotation: "-=4",
      duration: 2.8 + i * 0.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.15
    });
  });
  // 4. Subtle scroll parallax on the floating icons
  gsap.utils.toArray(".float-icon").forEach((icon) => {
    gsap.to(icon, {
      y: () => -50 * Math.random(),
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });
  });
  // 5. Card interaction styling (click press effect)
  const clayCards = document.querySelectorAll(".clay-card");
  clayCards.forEach((card) => {
    card.addEventListener("mousedown", () => {
      gsap.to(card, {
        scale: 0.96,
        duration: 0.1
      });
    });
    card.addEventListener("mouseup", () => {
      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: "back.out(2)"
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3
      });
    });
  });
});
