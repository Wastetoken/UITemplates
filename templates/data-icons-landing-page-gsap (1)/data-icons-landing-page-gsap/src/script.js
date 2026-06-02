document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  // --- 1. Initial Reveal Timeline ---
  const tl = gsap.timeline();
  // Nav Drop down
  tl.from(".gsap-nav", {
    y: -30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  })
    // Hero Content stagger up
    .from(
      ".gsap-hero",
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      },
      "-=0.4"
    );
  // --- 2. Network Diagram Scroll Reveal ---
  // Set initial state for lines to be drawn
  const paths = document.querySelectorAll(".line-path");
  paths.forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    });
  });
  const networkTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".network-section",
      start: "top 70%",
      toggleActions: "play none none reverse"
    }
  });
  // Pop in Center Node
  networkTl
    .from(".center-node", {
      scale: 0,
      opacity: 0,
      rotation: -45,
      duration: 0.8,
      ease: "back.out(1.5)"
    })
    // Draw lines outward from center
    .to(
      ".line-path",
      {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
        stagger: {
          amount: 0.5,
          from: "center"
        }
      },
      "-=0.4"
    )
    // Pop in Tool Nodes
    .from(
      ".tool-node",
      {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.5)"
      },
      "-=1.2"
    );
  // --- 3. Continuous Organic Floating ---
  // Simulates suspension in space, enhancing the 3D matte feel
  gsap.utils.toArray(".float-anim").forEach((node, i) => {
    gsap.to(node, {
      y: "-=12",
      rotation: "1",
      duration: 2.5 + i * 0.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.1
    });
  });
  gsap.utils.toArray(".float-anim-alt").forEach((node, i) => {
    gsap.to(node, {
      y: "+=12",
      rotation: "-1",
      duration: 2.8 + i * 0.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.15
    });
  });
  // Center node pulse/float
  gsap.to(".center-node", {
    y: "-=6",
    scale: 1.02,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  // --- 4. Interactive Hover Effect on Nodes ---
  const allNodes = document.querySelectorAll(".tool-node");
  allNodes.forEach((node) => {
    node.addEventListener("mouseenter", () => {
      gsap.to(node, {
        scale: 1.15,
        duration: 0.3,
        ease: "back.out(2)",
        overwrite: "auto"
      });
    });
    node.addEventListener("mouseleave", () => {
      gsap.to(node, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
  });
  // --- 5. Subtle Scroll Parallax ---
  gsap.to(".network-section", {
    y: 50,
    ease: "none",
    scrollTrigger: {
      trigger: ".network-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    }
  });
});
