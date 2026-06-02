document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Initial Entrance Animation Timeline
  const tl = gsap.timeline();

  tl.from(".gsap-nav", {
    y: -30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  })
    .from(
      ".gsap-hero",
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      },
      "-=0.4"
    )
    .from(
      ".gsap-right",
      {
        x: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      },
      "-=0.8"
    )
    .from(
      ".green-bar",
      {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.8,
        ease: "back.out(1.5)"
      },
      "-=0.6"
    )
    .from(
      ".chart-line path",
      {
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
        duration: 1.5,
        ease: "power2.inOut"
      },
      "-=1"
    )
    .from(
      ".chart-avatar",
      {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(2)"
      },
      "-=0.8"
    )
    .from(
      ".floating-element",
      {
        scale: 0,
        opacity: 0,
        rotation: () => gsap.utils.random(-20, 20),
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.5)"
      },
      "-=0.5"
    );

  // 2. Continuous Organic Floating Animations
  // Adds to the 3D clay feeling by keeping the scene "alive"

  gsap.to(".float-subtle", {
    y: "-=8",
    rotation: "+=1",
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".float-heavy", {
    y: "-=15",
    rotation: "-=3",
    duration: 3.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".float-delay-1", {
    y: "-=10",
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.5
  });

  gsap.to(".float-delay-2", {
    y: "-=10",
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 1
  });

  // 3. Simple Interactive Hover for Buttons
  const buttons = document.querySelectorAll(".btn-primary, .download-card");
  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, { y: -4, duration: 0.3, ease: "power2.out" });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { y: 0, duration: 0.3, ease: "power2.out" });
    });
  });

  // 4. Scroll Parallax (Slight movement on scroll)
  gsap.to(".purple-blob", {
    y: 30,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1
    }
  });

  gsap.to(".chart-line", {
    y: 10,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 2
    }
  });
});
