document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Initial Entrance Animations
  const tl = gsap.timeline();

  // Reveal Text
  tl.from(".gsap-reveal", {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out"
  });

  // Reveal Cards
  const wrappers = document.querySelectorAll(".card-wrapper");

  // Set initial rotations based on data attributes
  wrappers.forEach((wrapper) => {
    const rot = wrapper.getAttribute("data-rot");
    gsap.set(wrapper, { rotation: rot });
  });

  // Pop in cards
  tl.from(
    wrappers,
    {
      scale: 0,
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: {
        amount: 0.8,
        from: "center"
      },
      ease: "back.out(1.5)"
    },
    "-=0.8"
  );

  // 2. Scroll-Driven Parallax Animations
  // Each card moves at a different speed to create 3D depth
  wrappers.forEach((wrapper) => {
    const speed = parseFloat(wrapper.getAttribute("data-speed"));
    const initialRot = parseFloat(wrapper.getAttribute("data-rot"));

    gsap.to(wrapper, {
      y: () => -150 * speed, // Move up
      rotation: initialRot + speed * 10, // Slight rotation change on scroll
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1 // Smooth scrubbing
      }
    });
  });

  // Text parallax
  gsap.to(".text-layer", {
    y: 150,
    opacity: 0.2,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: 1
    }
  });

  // Hide scroll indicator on scroll
  gsap.to(".scroll-down", {
    opacity: 0,
    y: -20,
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "20% top",
      scrub: true
    }
  });

  // 3. Mouse Move Parallax (Optional extra interactivity)
  const hero = document.querySelector(".hero-section");
  hero.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    // Move cards slightly based on mouse
    wrappers.forEach((wrapper) => {
      const speed = parseFloat(wrapper.getAttribute("data-speed"));
      gsap.to(wrapper, {
        x: x * speed,
        y: y * speed,
        duration: 1,
        ease: "power2.out",
        overwrite: "auto"
      });
    });

    // Move text in opposite direction
    gsap.to(".text-layer", {
      x: -x * 2,
      y: -y * 2,
      duration: 1,
      ease: "power2.out",
      overwrite: "auto"
    });
  });

  // Reset mouse parallax on leave
  hero.addEventListener("mouseleave", () => {
    gsap.to(wrappers, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "power2.out",
      overwrite: "auto"
    });
    gsap.to(".text-layer", {
      x: 0,
      y: 0,
      duration: 1,
      ease: "power2.out",
      overwrite: "auto"
    });
  });
});
