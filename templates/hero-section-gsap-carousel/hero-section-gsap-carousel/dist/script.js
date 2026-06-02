document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const track = document.querySelector(".carousel-track");
  const items = gsap.utils.toArray(".carousel-item");
  // 1. Initial Load Animations (Reveals)
  gsap.from(".header > *", {
    y: 40,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power4.out"
  });
  gsap.from(".form-section > *", {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    stagger: 0.2,
    ease: "power3.out"
  });
  // 2. Scroll-Driven Horizontal Translation
  // Calculate total scroll distance based on track width vs window width
  const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 200);
  ScrollTrigger.create({
    trigger: ".carousel-section",
    start: "center center",
    end: () => `+=${Math.abs(getScrollAmount())}`, // Duration of the pin matches track length
    pin: true,
    animation: gsap.to(track, {
      x: getScrollAmount,
      ease: "none"
    }),
    scrub: 1,
    invalidateOnRefresh: true // Recalculates sizes on window resize
  });
  // 3. Dynamic 3D Curved Cylinder Effect
  // Uses GSAP's ticker to constantly calculate distance from center and apply 3D transforms
  gsap.ticker.add(() => {
    const centerX = window.innerWidth / 2;
    items.forEach((item) => {
      const bounds = item.getBoundingClientRect();
      // Get the exact center of the individual carousel item
      const itemCenter = bounds.left + bounds.width / 2;
      // Calculate its distance from the screen center
      const distFromCenter = itemCenter - centerX;
      // Math for the curve effect
      const maxRotation = 35; // Max angle at screen edges
      const rotationY = (distFromCenter / centerX) * maxRotation;
      // Push elements backward as they approach the edge
      const z = Math.abs(distFromCenter / centerX) * -120;
      // Add slight scale down towards the edges to exaggerate the curve
      const scale = 1 - Math.abs(distFromCenter / window.innerWidth) * 0.15;
      // Apply the transformations
      gsap.set(item, {
        rotationY: rotationY,
        z: z,
        scale: scale
      });
    });
  });
});