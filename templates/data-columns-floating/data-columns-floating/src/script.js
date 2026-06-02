if (typeof gsap !== "undefined") {
  document.body.classList.add("js-ready");

  document.addEventListener("DOMContentLoaded", () => {
    // ===== INTRO TIMELINE =====
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Panel scales in from below
    tl.to(".panel", {
      opacity: 1,
      duration: 0.6
    })
      .from(
        ".panel",
        {
          y: 30,
          scale: 0.97,
          duration: 0.9,
          ease: "power3.out"
        },
        "<"
      )

      // 2. Heading words stagger
      .to(
        ".heading .word",
        {
          opacity: 1,
          duration: 0.4,
          stagger: 0.06
        },
        "-=0.5"
      )
      .from(
        ".heading .word",
        {
          y: 16,
          rotateX: -40,
          duration: 0.55,
          stagger: 0.06,
          ease: "back.out(1.4)"
        },
        "<"
      )

      // 3. Tabs slide in from right
      .to(
        ".tabs",
        {
          opacity: 1,
          duration: 0.5
        },
        "-=0.6"
      )
      .from(
        ".tabs",
        {
          x: 40,
          scale: 0.9,
          duration: 0.7,
          ease: "back.out(1.5)"
        },
        "<"
      )

      // 4. Light card rises
      .to(
        ".card-light",
        {
          opacity: 1,
          duration: 0.5
        },
        "-=0.3"
      )
      .from(
        ".card-light",
        {
          y: 40,
          scale: 0.95,
          duration: 0.8,
          ease: "back.out(1.4)"
        },
        "<"
      )

      // 5. Dark card rises (slightly delayed)
      .to(
        ".card-dark",
        {
          opacity: 1,
          duration: 0.5
        },
        "-=0.65"
      )
      .from(
        ".card-dark",
        {
          y: 40,
          scale: 0.95,
          duration: 0.8,
          ease: "back.out(1.4)"
        },
        "<"
      )

      // 6. Tags pop in with stagger
      .to(
        ".tag",
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.08
        },
        "-=0.4"
      )
      .from(
        ".tag",
        {
          y: 12,
          scale: 0.7,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(2)"
        },
        "<"
      )

      // 7. Buttons in dark card slide in
      .to(
        ".btn-deployed, .btn-restart",
        {
          opacity: 1,
          duration: 0.4,
          stagger: 0.1
        },
        "-=0.3"
      )
      .from(
        ".btn-deployed",
        {
          x: -20,
          scale: 0.85,
          duration: 0.6,
          ease: "back.out(1.6)"
        },
        "<"
      )
      .from(
        ".btn-restart",
        {
          x: 20,
          scale: 0.85,
          duration: 0.6,
          ease: "back.out(1.6)"
        },
        "-=0.55"
      );

    // ===== CONTINUOUS LOOPS =====
    // Active tab dot pulse (notification-style)
    gsap.to("#tabDot", {
      scale: 1.25,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2.5,
      transformOrigin: "center center"
    });
    gsap.to("#tabDot", {
      boxShadow:
        "0 0 0 5px rgba(240,136,80,0.05), 0 1px 0 rgba(255,255,255,0.4) inset, 0 -1px 1px rgba(120,40,10,0.3) inset",
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2.5
    });

    // Deployed check subtle pulse
    gsap.to(".deployed-check", {
      scale: 1.08,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 3,
      transformOrigin: "center center"
    });

    // Subtle card breath (very gentle)
    gsap.to(".card-light, .card-dark", {
      y: "-=2",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 3,
      stagger: 0.5
    });

    // ===== INTERACTIONS =====
    // Tab switching
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        if (tab.classList.contains("active")) return;

        // Remove active state
        document.querySelector(".tab.active").classList.remove("active");
        tab.classList.add("active");

        // Move the dot (visually re-render)
        const existingDot = document.getElementById("tabDot");
        if (existingDot) existingDot.remove();

        const newDot = document.createElement("span");
        newDot.className = "tab-dot";
        newDot.id = "tabDot";
        tab.prepend(newDot);

        // Re-attach pulse
        gsap.fromTo(
          newDot,
          { scale: 0 },
          { scale: 1, duration: 0.5, ease: "back.out(2.5)" }
        );
        gsap.to(newDot, {
          scale: 1.25,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.5
        });

        // Tab activation bounce
        gsap.fromTo(
          tab,
          { scale: 0.92 },
          { scale: 1, duration: 0.5, ease: "back.out(2)" }
        );
      });
    });

    // Card hover lift
    document.querySelectorAll(".card-light, .card-dark").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: "-=8",
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto"
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto"
        });
      });
    });

    // Deployed button click: chunky press
    document
      .getElementById("btnDeployed")
      .addEventListener("click", function () {
        gsap.fromTo(
          this,
          { scale: 0.94 },
          { scale: 1, duration: 0.5, ease: "elastic.out(1.2, 0.4)" }
        );
      });

    // Restart investigation: chunky press + dark card pulse
    document
      .getElementById("btnRestart")
      .addEventListener("click", function () {
        gsap.fromTo(
          this,
          { scale: 0.94 },
          { scale: 1, duration: 0.5, ease: "elastic.out(1.2, 0.4)" }
        );
        gsap.fromTo(
          ".card-dark",
          { scale: 1 },
          {
            scale: 1.01,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
          }
        );
      });

    // Tags hover
    document.querySelectorAll(".tag").forEach((tag) => {
      tag.addEventListener("mouseenter", () => {
        gsap.to(tag, {
          scale: 1.05,
          y: -2,
          duration: 0.2,
          ease: "back.out(2)",
          overwrite: "auto"
        });
      });
      tag.addEventListener("mouseleave", () => {
        gsap.to(tag, {
          scale: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto"
        });
      });
    });

    // Read more hover
    document
      .querySelector(".read-more")
      .addEventListener("mouseenter", function () {
        gsap.to(this, { x: 3, duration: 0.2, ease: "power2.out" });
      });
    document
      .querySelector(".read-more")
      .addEventListener("mouseleave", function () {
        gsap.to(this, { x: 0, duration: 0.25, ease: "power2.out" });
      });
  });
}
