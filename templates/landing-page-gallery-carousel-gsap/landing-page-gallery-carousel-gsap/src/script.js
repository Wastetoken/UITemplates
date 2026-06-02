document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Initial Entrance Animation
  const tl = gsap.timeline();

  // Pop in the avatar cards randomly
  tl.from(".avatar-card", {
    scale: 0,
    opacity: 0,
    rotation: () => gsap.utils.random(-20, 20),
    duration: 0.8,
    stagger: {
      amount: 0.8,
      from: "random"
    },
    ease: "back.out(1.5)"
  })
    // Fade up the text content
    .from(
      ".gsap-reveal",
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      },
      "-=0.6"
    );

  // 2. Continuous Organic Floating
  // Gives the cards that suspended, chunky clay feel
  gsap.utils.toArray(".avatar-card").forEach((card, i) => {
    gsap.to(card, {
      y: `+=${gsap.utils.random(-15, 15)}`,
      x: `+=${gsap.utils.random(-5, 5)}`,
      rotation: `+=${gsap.utils.random(-3, 3)}`,
      duration: gsap.utils.random(2.5, 4.5),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: gsap.utils.random(0, 2)
    });
  });

  // 3. 3D Hover Interaction
  const cards = document.querySelectorAll(".avatar-card.interactive");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -15;
      const rotateY = ((x - centerX) / centerX) * 15;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1.1,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto"
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
  });

  // 4. Scroll-Driven Parallax
  // Cards spread outwards and move slightly up as you scroll down
  gsap.utils.toArray(".avatar-card").forEach((card) => {
    const speed = gsap.utils.random(0.5, 1.5);
    const xOffset =
      card.getBoundingClientRect().left > window.innerWidth / 2 ? 50 : -50;

    gsap.to(card, {
      y: -100 * speed,
      x: `+=${xOffset * speed}`,
      rotation: gsap.utils.random(-15, 15),
      ease: "none",
      scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });
  });
});
