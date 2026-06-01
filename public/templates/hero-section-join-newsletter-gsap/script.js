if (typeof gsap !== "undefined") {
  document.body.classList.add("js-ready");
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
}

// ===== LIVE NOTIFICATION DATA =====
const liveNotifications = [
  "Sarah from Berlin just joined",
  "Marcus in São Paulo just joined",
  "Aisha from London just joined",
  "Kenji in Tokyo just joined",
  "Priya from Mumbai just joined",
  "Alex in Toronto just joined",
  "Sofia from Madrid just joined",
  "Liam in Dublin just joined"
];
let notifIndex = 0;
let userCountValue = 8258;

document.addEventListener("DOMContentLoaded", () => {
  // ===== INTRO TIMELINE =====
  if (typeof gsap !== "undefined") {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(".top-icon-wrap", { opacity: 1, duration: 0.5 })
      .from(
        ".top-icon-wrap .icon-3d",
        {
          y: -30,
          scale: 0.5,
          duration: 0.85,
          ease: "back.out(1.7)"
        },
        "<"
      )
      .to(".beta-pill", { opacity: 1, duration: 0.4 }, "-=0.3")
      .from(".beta-pill", { y: 8, duration: 0.5 }, "<")
      .to(
        ".headline .word, .headline .accent",
        { opacity: 1, duration: 0.4, stagger: 0.05 },
        "-=0.25"
      )
      .from(
        ".headline .word",
        {
          y: 24,
          rotateX: -40,
          duration: 0.65,
          stagger: 0.05,
          ease: "back.out(1.4)"
        },
        "<"
      )
      .from(
        ".headline .accent",
        {
          y: 24,
          scale: 0.85,
          rotation: -6,
          duration: 0.8,
          ease: "back.out(1.7)"
        },
        "-=0.3"
      )
      .to(".subtitle", { opacity: 1, duration: 0.5 }, "-=0.3")
      .from(".subtitle", { y: 12, duration: 0.55 }, "<")
      .to(".waitlist", { opacity: 1, duration: 0.4 }, "-=0.3")
      .from(
        ".waitlist",
        {
          y: 20,
          scale: 0.95,
          duration: 0.7,
          ease: "back.out(1.5)"
        },
        "<"
      )
      .to(".social-proof", { opacity: 1, duration: 0.4 }, "-=0.3")
      .from(".social-proof", { y: 12, duration: 0.55 }, "<")
      .from(
        ".avatar-mini",
        {
          scale: 0.3,
          x: -10,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1.8)"
        },
        "<"
      )
      .to(".feature", { opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3")
      .from(
        ".feature",
        {
          y: 24,
          scale: 0.95,
          duration: 0.7,
          stagger: 0.1,
          ease: "back.out(1.4)"
        },
        "<"
      );

    // Brain icon and mission card animate on scroll
    if (typeof ScrollTrigger !== "undefined") {
      gsap.to(".float-brain", {
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: ".float-brain",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
      gsap.from(".float-brain .icon-3d", {
        y: -40,
        scale: 0.5,
        duration: 0.9,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".float-brain",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.to(".mission-card", {
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: ".mission-card",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
      gsap.from(".mission-card", {
        y: 40,
        duration: 0.8,
        ease: "back.out(1.3)",
        scrollTrigger: {
          trigger: ".mission-card",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
      gsap.from(".mission-card > *", {
        y: 16,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".mission-card",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    } else {
      // No scrollTrigger fallback
      gsap.to(".float-brain", { opacity: 1, duration: 0.5, delay: 0.5 });
      gsap.to(".mission-card", { opacity: 1, duration: 0.5, delay: 0.8 });
    }

    // ===== CONTINUOUS LOOPS =====
    // Bird icon bobs
    gsap.to("#topIcon", {
      y: -8,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5
    });

    // Brain icon bobs
    gsap.to("#brainIcon", {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2
    });

    // Feature icons gentle continuous animation
    gsap.utils.toArray(".feature .icon-3d").forEach((icon, i) => {
      gsap.to(icon, {
        y: "-=4",
        duration: 2.2 + i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2 + i * 0.3
      });
    });

    // ===== USER COUNTER ANIMATION =====
    const userCountEl = document.getElementById("userCount");
    const obj = { val: 0 };
    gsap.to(obj, {
      val: userCountValue,
      duration: 2,
      ease: "power2.out",
      delay: 1.5,
      onUpdate: () => {
        userCountEl.textContent = Math.round(obj.val).toLocaleString();
      }
    });

    // ===== FEATURE ICON HOVER ROTATION =====
    document.querySelectorAll(".feature").forEach((feature) => {
      const icon = feature.querySelector(".icon-3d");
      feature.addEventListener("mouseenter", () => {
        gsap.to(icon, {
          scale: 1.15,
          rotation: "+=20",
          duration: 0.35,
          ease: "back.out(2)",
          overwrite: "auto"
        });
      });
      feature.addEventListener("mouseleave", () => {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto"
        });
      });
    });

    // Top + brain icons spin on click
    [
      document.getElementById("topIcon"),
      document.getElementById("brainIcon")
    ].forEach((el) => {
      el.style.cursor = "pointer";
      el.addEventListener("click", () => {
        gsap.fromTo(
          el,
          { rotation: 0 },
          { rotation: 360, duration: 0.9, ease: "back.out(1.4)" }
        );
      });
    });
  }

  // ===== WAITLIST FORM SUBMIT =====
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  document.getElementById("waitlistForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("emailInput");
    const btn = document.getElementById("joinBtn");
    const form = document.getElementById("waitlistForm");

    if (!isValidEmail(input.value)) {
      // Shake the form
      if (typeof gsap !== "undefined") {
        gsap.fromTo(
          form,
          { x: 0 },
          {
            x: -10,
            duration: 0.08,
            yoyo: true,
            repeat: 5,
            ease: "power2.inOut",
            onComplete: () => gsap.to(form, { x: 0, duration: 0.1 })
          }
        );
      }
      input.focus();
      return;
    }

    // Success!
    if (typeof gsap !== "undefined") {
      gsap.fromTo(
        btn,
        { scale: 0.92 },
        { scale: 1, duration: 0.55, ease: "elastic.out(1.2, 0.4)" }
      );
    }

    btn.textContent = "✓ You're in!";
    btn.style.background = "linear-gradient(180deg, #4ea05e 0%, #2f7a4d 100%)";
    form.classList.add("success");

    // Bump the user count
    userCountValue += 1;
    const userCountEl = document.getElementById("userCount");
    if (typeof gsap !== "undefined") {
      gsap.fromTo(
        userCountEl,
        { scale: 1.4, color: "#4ea05e" },
        { scale: 1, color: "#0a0a0a", duration: 0.8, ease: "back.out(2)" }
      );
    }
    userCountEl.textContent = userCountValue.toLocaleString();

    // Pulse all 3D icons
    if (typeof gsap !== "undefined") {
      gsap.fromTo(
        ".icon-3d",
        { scale: 1 },
        {
          scale: 1.15,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
          stagger: 0.05
        }
      );
    }

    setTimeout(() => {
      btn.textContent = "Join Waitlist";
      btn.style.background = "";
      form.classList.remove("success");
      input.value = "";
    }, 3000);
  });

  // ===== LIVE NOTIFICATION TICKER =====
  function showNotification() {
    const notif = document.getElementById("liveNotif");
    const text = document.getElementById("liveNotifText");
    text.textContent = liveNotifications[notifIndex];
    notifIndex = (notifIndex + 1) % liveNotifications.length;

    notif.classList.add("show");

    // Increment user count by 1 each time
    userCountValue += 1;
    const userCountEl = document.getElementById("userCount");
    if (typeof gsap !== "undefined") {
      gsap.fromTo(
        userCountEl,
        { color: "#4ea05e" },
        { color: "#0a0a0a", duration: 1.5, ease: "power2.out" }
      );
    }
    userCountEl.textContent = userCountValue.toLocaleString();

    setTimeout(() => {
      notif.classList.remove("show");
    }, 4000);
  }

  // Show first notification after delay
  setTimeout(showNotification, 5000);
  setInterval(showNotification, 12000);
});