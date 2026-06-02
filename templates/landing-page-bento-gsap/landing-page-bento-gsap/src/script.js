document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  // 1. Initial Entrance Animation
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
    // Cards pop in
    .from(
      ".stack-card",
      {
        scale: 0.8,
        opacity: 0,
        rotation: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.5)"
      },
      "-=0.6"
    )
    .from(
      ".gsap-bento",
      {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      },
      "-=0.4"
    );
  // 2. Scroll-Driven Card Spread Animation
  // As user scrolls, the cards fan out and slide
  const cardTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom center",
      scrub: 1
    }
  });
  cardTl
    .to(
      ".card-top",
      {
        x: 60,
        y: -30,
        rotation: 15,
        ease: "none"
      },
      0
    )
    .to(
      ".card-middle",
      {
        x: -20,
        y: 10,
        rotation: -10,
        ease: "none"
      },
      0
    )
    .to(
      ".card-bottom",
      {
        x: -80,
        y: 40,
        rotation: -25,
        ease: "none"
      },
      0
    );
  // 3. Continuous Organic Floating for Pills
  gsap.utils.toArray(".float-anim").forEach((el, i) => {
    gsap.to(el, {
      y: "-=10",
      x: "+=5",
      rotation: "+=2",
      duration: 2.5 + i,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });
  gsap.utils.toArray(".float-anim-alt").forEach((el, i) => {
    gsap.to(el, {
      y: "+=10",
      x: "-=5",
      rotation: "-=2",
      duration: 3 + i,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });
  // 4. Subtle Parallax on Bento Grid
  gsap.to(".bento-grid", {
    scrollTrigger: {
      trigger: ".bento-grid",
      start: "top 90%",
      end: "bottom top",
      scrub: 1.5
    },
    y: -50,
    ease: "none"
  });
  // 5. Button Press Interaction
  const buttons = document.querySelectorAll(".dark-btn-round, .card-icon-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("mousedown", () => {
      gsap.to(btn, {
        scale: 0.9,
        duration: 0.1
      });
    });
    btn.addEventListener("mouseup", () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(2)"
      });
    });
  });
});
