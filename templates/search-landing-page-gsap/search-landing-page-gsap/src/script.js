if (typeof gsap !== "undefined") {
  document.body.classList.add("js-ready");
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
}

// ===== TYPING ANIMATION QUERIES =====
const searchQueries = [
  "Search Cosmos",
  "Curated lips & form",
  "Terracotta vessels",
  "Studio still life",
  "Editorial portraiture",
  "Light & shadow",
  "Tactile materials"
];
let queryIndex = 0;
let isTyping = false;

document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined") return;

  // ===== INTRO TIMELINE =====
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(".sphere", { opacity: 1, duration: 0.6 })
    .from(
      ".sphere",
      {
        scale: 0.5,
        rotation: -90,
        duration: 1.2,
        ease: "back.out(1.4)"
      },
      "<"
    )
    .from(
      ".tile",
      {
        opacity: 0,
        scale: 0.6,
        duration: 0.5,
        stagger: { each: 0.04, from: "center" },
        ease: "back.out(1.6)"
      },
      "-=0.6"
    )
    .to(".search-bar", { opacity: 1, duration: 0.5 }, "-=0.4")
    .from(
      ".search-bar",
      {
        scaleX: 0.3,
        duration: 0.8,
        ease: "back.out(1.5)"
      },
      "<"
    )
    .to(
      ".float-card",
      {
        opacity: 1,
        duration: 0.4,
        stagger: { each: 0.06, from: "random" }
      },
      "-=0.5"
    )
    .from(
      ".float-card",
      {
        scale: 0.4,
        rotation: "+=20",
        duration: 0.8,
        stagger: { each: 0.06, from: "random" },
        ease: "back.out(1.7)"
      },
      "<"
    );

  // ===== TYPING ANIMATION =====
  function typeText(text, callback) {
    const input = document.getElementById("searchInput");
    input.placeholder = "";
    let i = 0;
    isTyping = true;
    const interval = setInterval(() => {
      if (i <= text.length) {
        input.placeholder = text.substring(0, i);
        i++;
      } else {
        clearInterval(interval);
        isTyping = false;
        setTimeout(callback, 2200);
      }
    }, 60);
  }

  function eraseText(callback) {
    const input = document.getElementById("searchInput");
    let text = input.placeholder;
    isTyping = true;
    const interval = setInterval(() => {
      if (text.length > 0) {
        text = text.substring(0, text.length - 1);
        input.placeholder = text;
      } else {
        clearInterval(interval);
        isTyping = false;
        setTimeout(callback, 400);
      }
    }, 30);
  }

  function cycleSearchText() {
    queryIndex = (queryIndex + 1) % searchQueries.length;
    eraseText(() => {
      typeText(searchQueries[queryIndex], cycleSearchText);
    });
  }

  // Start cycling after intro
  setTimeout(() => {
    setTimeout(cycleSearchText, 2000);
  }, 2500);

  // ===== CONTINUOUS LOOPS =====
  // Sphere subtle rotation hint (very slow)
  gsap.to(".sphere-inner", {
    rotation: 360,
    duration: 200,
    repeat: -1,
    ease: "none",
    transformOrigin: "center center"
  });

  // Floating cards subtle bob
  gsap.utils.toArray(".float-card").forEach((card, i) => {
    gsap.to(card, {
      y: "-=" + (5 + (i % 3) * 3),
      duration: 2.5 + i * 0.3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2 + i * 0.2
    });
  });

  // ===== MOUSE PARALLAX =====
  document.addEventListener("mousemove", (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / window.innerWidth;
    const dy = (e.clientY - cy) / window.innerHeight;

    // Sphere drifts subtly opposite to cursor
    gsap.to(".sphere", {
      x: dx * -10,
      y: dy * -10,
      rotationY: dx * 4,
      rotationX: -dy * 4,
      transformPerspective: 1200,
      duration: 0.7,
      ease: "power2.out",
      overwrite: "auto"
    });

    // Cards drift further with random strength
    document.querySelectorAll(".float-card").forEach((card, i) => {
      const strength = 8 + (i % 4) * 4;
      gsap.to(card, {
        x: dx * strength * -1,
        y: dy * strength * -1,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
  });

  // ===== CARD HOVER INTERACTIONS =====
  document.querySelectorAll(".float-card").forEach((card) => {
    const baseRot =
      parseFloat(
        getComputedStyle(card).transform.split(",")[0].replace("matrix(", "")
      ) || 0;
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        scale: 1.2,
        rotation: 0,
        duration: 0.4,
        ease: "back.out(2)",
        overwrite: "auto",
        zIndex: 10
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
        zIndex: 4,
        clearProps: "rotation"
      });
    });
    card.addEventListener("click", () => {
      gsap.fromTo(
        card,
        { rotation: 0 },
        { rotation: 360, duration: 0.9, ease: "back.out(1.4)" }
      );
    });
  });

  // ===== SPHERE CLICK - shuffle tiles =====
  document.getElementById("sphere").addEventListener("click", (e) => {
    // Only on sphere body, not on search bar (which is overlaid)
    if (e.target.closest(".search-bar")) return;

    // Pulse rotation
    gsap.fromTo(
      ".sphere-inner",
      { rotation: 0 },
      { rotation: 90, duration: 0.6, ease: "power2.inOut" }
    );

    // Tile scale ripple
    gsap.fromTo(
      ".tile",
      { scale: 1 },
      {
        scale: 0.9,
        duration: 0.3,
        stagger: { each: 0.03, from: "center" },
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      }
    );
  });

  // ===== SEARCH BUTTON CLICK =====
  document.getElementById("searchBtn").addEventListener("click", function (e) {
    e.stopPropagation();

    // Spin button
    gsap.fromTo(
      this,
      { rotation: 0 },
      { rotation: 360, duration: 0.8, ease: "back.out(1.6)" }
    );

    // Pulse all cards
    gsap.fromTo(
      ".float-card",
      { scale: 1 },
      {
        scale: 1.15,
        duration: 0.3,
        stagger: 0.06,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      }
    );

    // Shuffle search query
    if (!isTyping) {
      cycleSearchText();
    }
  });

  // ===== SEARCH BAR PULSE on hover =====
  document
    .getElementById("searchBar")
    .addEventListener("mouseenter", function () {
      gsap.to(this, {
        scale: 1.02,
        duration: 0.3,
        ease: "back.out(1.5)"
      });
    });
  document
    .getElementById("searchBar")
    .addEventListener("mouseleave", function () {
      gsap.to(this, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    });

  // ===== SCROLL-DRIVEN: as user scrolls, cards spread out =====
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.create({
      trigger: ".page",
      start: "top top",
      end: "+=600",
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        // Cards spread outward as you scroll
        document.querySelectorAll(".float-card").forEach((card, i) => {
          const dirX = i % 2 === 0 ? -1 : 1;
          const dirY = i < 3 ? -1 : 1;
          gsap.set(card, {
            xPercent: dirX * p * 30,
            yPercent: dirY * p * 30
          });
        });
        // Sphere scales up slightly
        gsap.set(".sphere", { scale: 1 + p * 0.06 });
        // Search bar widens slightly
        gsap.set(".search-bar", { scaleX: 1 + p * 0.04 });
      }
    });
  }
});
