document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Initial Reveal Timeline
  const tl = gsap.timeline();

  // Fade in side text
  tl.from(".gsap-fade", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out"
  });

  // Pop in the fragmented clay tiles randomly
  tl.from(
    ".tile-container",
    {
      scale: 0.4,
      opacity: 0,
      duration: 0.8,
      stagger: {
        amount: 0.8,
        from: "random"
      },
      ease: "back.out(1.5)"
    },
    "-=1.2"
  );

  // 2. Scroll-driven Parallax effect
  // We use standard ScrollTrigger to slightly shift tiles up and down
  // creating a floating fragmented image effect as you scroll

  gsap.utils.toArray(".t-anim").forEach((tile) => {
    gsap.to(tile, {
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom top",
        scrub: 1.5
      }
    });
  });

  gsap.utils.toArray(".t-anim-alt").forEach((tile) => {
    gsap.to(tile, {
      y: 30,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom top",
        scrub: 1.5
      }
    });
  });

  // Subtle parallax for left/right columns
  gsap.to(".col-left", {
    y: 50,
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom top",
      scrub: 2
    }
  });

  gsap.to(".col-right", {
    y: -30,
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom top",
      scrub: 2
    }
  });
});