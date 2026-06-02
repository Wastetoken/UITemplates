if (typeof gsap !== "undefined") {
  document.body.classList.add("js-ready");
  document.addEventListener("DOMContentLoaded", () => {
    // ===== INTRO TIMELINE =====
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });
    // 1. Nav fades in
    tl.to("nav > *", {
      opacity: 1,
      duration: 0.5,
      stagger: 0.08
    })
      .from(
        "nav > *",
        {
          y: -16,
          duration: 0.55,
          stagger: 0.08
        },
        "<"
      )
      // 2. Label tag slides up
      .to(
        ".label-tag",
        {
          opacity: 1,
          duration: 0.4
        },
        "-=0.2"
      )
      .from(
        ".label-tag",
        {
          y: 14,
          duration: 0.5
        },
        "<"
      )
      // 3. Headline items stagger reveal (words AND keys)
      .to(
        ".headline .h-item",
        {
          opacity: 1,
          duration: 0.4,
          stagger: 0.04
        },
        "-=0.25"
      )
      .from(
        ".headline .h-item:not(.key)",
        {
          y: 28,
          rotateX: -45,
          duration: 0.65,
          stagger: 0.04,
          ease: "back.out(1.3)"
        },
        "<"
      )
      // 4. Keys get extra-special entrance: bounce in with rotation
      .from(
        "#keyWhite",
        {
          scale: 0,
          rotation: -180,
          y: -80,
          duration: 0.9,
          ease: "back.out(1.9)"
        },
        "-=1.5"
      )
      .from(
        "#keyPink",
        {
          scale: 0,
          rotation: 200,
          y: -100,
          duration: 1,
          ease: "back.out(1.8)"
        },
        "-=0.7"
      )
      // 5. Bestselling gradient sweep effect
      .to(
        "#bestselling",
        {
          backgroundPosition: "70% 0%",
          duration: 1.2,
          ease: "power2.inOut"
        },
        "-=0.6"
      )
      // 6. Cursor fades in (blinking already going via CSS)
      .to(
        ".cursor",
        {
          opacity: 1,
          duration: 0.3
        },
        "-=0.4"
      )
      // 7. Subtitle + form slide in
      .to(
        ".subtitle",
        {
          opacity: 1,
          duration: 0.5
        },
        "-=0.3"
      )
      .from(
        ".subtitle",
        {
          y: 14,
          duration: 0.55
        },
        "<"
      )
      .to(
        ".subscribe-bar",
        {
          opacity: 1,
          duration: 0.5
        },
        "-=0.4"
      )
      .from(
        ".subscribe-bar",
        {
          y: 20,
          scale: 0.94,
          duration: 0.7,
          ease: "back.out(1.5)"
        },
        "<"
      );
    // ===== CONTINUOUS LOOPS =====
    // White key: gentle bob + sway
    gsap.to("#keyWhite", {
      y: "-=8",
      duration: 2.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2.5
    });
    gsap.to("#keyWhite", {
      rotation: -7,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 3
    });
    // Pink key: bob slightly different
    gsap.to("#keyPink", {
      y: "-=10",
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 3
    });
    gsap.to("#keyPink", {
      rotation: 8,
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 3.3
    });
    // Bestselling: subtle gradient breathing
    gsap.to("#bestselling", {
      backgroundPosition: "50% 0%",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 3.5
    });
    // ===== INTERACTIONS =====
    // Key hover: lift + spin slightly
    const setupKey = (el, baseRot) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(el, {
          scale: 1.15,
          y: "-=14",
          rotation: baseRot * 1.5,
          duration: 0.35,
          ease: "back.out(2)",
          overwrite: "auto"
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto"
        });
      });
      el.addEventListener("click", () => {
        gsap.fromTo(
          el,
          {
            rotation: 0
          },
          {
            rotation: 360,
            duration: 0.8,
            ease: "back.out(1.4)"
          }
        );
      });
    };
    setupKey(document.getElementById("keyWhite"), -3);
    setupKey(document.getElementById("keyPink"), 4);
    // Subscribe button click: chunky bounce + email pulse if empty
    const subBtn = document.getElementById("subBtn");
    const emailInput = document.getElementById("emailInput");
    subBtn.addEventListener("click", (e) => {
      gsap.fromTo(
        subBtn,
        {
          scale: 0.92
        },
        {
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1.2, 0.4)"
        }
      );
      if (!emailInput.value) {
        // Shake the input
        gsap.fromTo(
          ".subscribe-bar",
          {
            x: 0
          },
          {
            x: -8,
            duration: 0.08,
            yoyo: true,
            repeat: 5,
            ease: "power2.inOut",
            onComplete: () =>
              gsap.to(".subscribe-bar", {
                x: 0,
                duration: 0.1
              })
          }
        );
      } else {
        // Success pulse on both keys
        gsap.to("#keyPink, #keyWhite", {
          scale: 1.2,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
          stagger: 0.05
        });
      }
    });
    // Nav pill links hover (already CSS-handled, but add a tiny scale)
    document.querySelectorAll(".nav-pill a").forEach((link) => {
      link.addEventListener("mouseenter", () => {
        gsap.to(link, {
          scale: 1.05,
          duration: 0.2,
          ease: "back.out(2)"
        });
      });
      link.addEventListener("mouseleave", () => {
        gsap.to(link, {
          scale: 1,
          duration: 0.25,
          ease: "power2.out"
        });
      });
    });
  });
}
