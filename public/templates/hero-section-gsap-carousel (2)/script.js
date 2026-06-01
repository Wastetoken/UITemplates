document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Initial Load Animations
  const tl = gsap.timeline();

  tl.from(".nav-reveal", {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  }).from(
    ".reveal-text",
    {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out"
    },
    "-=0.5"
  );

  // 2. Horizontal Scroll Carousel Logic
  const carouselSection = document.getElementById("carousel-section");
  const track = document.getElementById("carousel-track");

  // Calculate the exact amount to scroll to the left
  function getScrollAmount() {
    let trackWidth = track.scrollWidth;
    return -(trackWidth - window.innerWidth);
  }

  const tween = gsap.to(track, {
    x: getScrollAmount,
    ease: "none"
  });

  ScrollTrigger.create({
    trigger: carouselSection,
    start: "top top",
    end: () => `+=${getScrollAmount() * -1}`, // The duration of the pin dictates the scroll speed
    pin: true,
    animation: tween,
    scrub: 1, // Smooth scrubbing
    invalidateOnRefresh: true // Recalculates on resize
  });

  // 3. Footer Reveal
  gsap.from(".scroll-reveal", {
    scrollTrigger: {
      trigger: ".footer",
      start: "top 80%"
    },
    y: 100,
    scale: 0.9,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.5)"
  });
});