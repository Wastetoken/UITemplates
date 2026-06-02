document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Entrance Animations
  const tl = gsap.timeline();

  tl.from(".fade-up", {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out"
  })
    .from(
      ".line-vertical, .line-angled-1, .line-angled-2",
      {
        scaleY: 0,
        scaleX: 0,
        transformOrigin: "center",
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.5"
    )
    .from(
      ".node",
      {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: "back.out(2)"
      },
      "-=0.4"
    );

  // 2. Continuous Floating Animations for 3D Clay Elements
  gsap.utils.toArray(".floating").forEach((el, index) => {
    gsap.to(el, {
      y: "-=12",
      duration: 2 + index * 0.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.1
    });
  });

  gsap.utils.toArray(".floating-slow").forEach((el, index) => {
    gsap.to(el, {
      y: "-=8",
      rotation: 1,
      duration: 3 + index * 0.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });

  // 3. Interactive Hover Effects on Clay Cards
  const clayElements = document.querySelectorAll(".clay-hover");

  clayElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(el, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(el, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
  });

  // 4. Subtle Parallax on Mouse Move
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    gsap.to(".right-col", {
      x: x,
      y: y,
      duration: 1,
      ease: "power2.out"
    });
  });
});
