(function () {
  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);
  // ─── PREP SVG paths for stroke-dashoffset draw-in ───
  const drawPaths = [
    document.querySelector(".organic-circle path"),
    document.querySelector(".title-arrow path"),
    document.getElementById("ribbonPath"),
    document.querySelector(".stamp .mark svg path:nth-child(1)"),
    document.querySelector(".stamp .mark svg path:nth-child(2)"),
    document.querySelector(".stamp .mark svg path:nth-child(3)"),
    document.querySelector(".stamp .mark svg path:nth-child(4)")
  ].filter(Boolean);
  drawPaths.forEach((p) => {
    const len = p.getTotalLength();
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;
  });
  // ─── INITIAL STATES ───
  gsap.set(".header > *", {
    y: -16,
    opacity: 0
  });
  gsap.set(".title .line", {
    yPercent: 100,
    opacity: 0
  });
  gsap.set(".stamp", {
    scale: 0,
    opacity: 0
  });
  gsap.set(".price, .desc, .cta-row", {
    y: 20,
    opacity: 0
  });
  gsap.set(".arch", {
    scale: 0.55,
    opacity: 0
  });
  gsap.set(".arch-ring", {
    scale: 0.6,
    opacity: 0
  });
  gsap.set(".bottle, .bottle-fallback", {
    y: 60,
    opacity: 0,
    scale: 0.92
  });
  gsap.set(".sphere", {
    scale: 0,
    opacity: 0
  });
  gsap.set(".notif", {
    y: 30,
    opacity: 0,
    scale: 0.9
  });
  gsap.set(".scroll-down", {
    y: 20,
    opacity: 0
  });
  gsap.set(".pagination, .accordion", {
    y: 20,
    opacity: 0
  });
  // ─── PAGE LOAD TIMELINE ───
  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out"
    },
    delay: 0.2
  });
  tl.to(".header > *", {
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.07
  })
    .to(
      ".title .line",
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.08,
        ease: "power4.out"
      },
      "-=.3"
    )
    .to(
      ".organic-circle path",
      {
        strokeDashoffset: 0,
        duration: 1,
        ease: "power2.out"
      },
      "-=.7"
    )
    .to(
      ".title-arrow path",
      {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: "power2.out"
      },
      "-=.6"
    )
    .to(
      ".stamp",
      {
        scale: 1,
        opacity: 1,
        duration: 0.55,
        ease: "back.out(2)"
      },
      "-=.3"
    )
    .to(
      ".stamp .mark svg path",
      {
        strokeDashoffset: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out"
      },
      "-=.3"
    )
    .to(
      ".price",
      {
        y: 0,
        opacity: 1,
        duration: 0.5
      },
      "-=.5"
    )
    .to(
      ".desc",
      {
        y: 0,
        opacity: 1,
        duration: 0.5
      },
      "-=.3"
    )
    .to(
      ".cta-row",
      {
        y: 0,
        opacity: 1,
        duration: 0.6
      },
      "-=.3"
    )
    .to(
      ".arch-ring",
      {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out"
      },
      "-=1.8"
    )
    .to(
      ".arch",
      {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: "back.out(1.4)"
      },
      "-=1.6"
    )
    .to(
      ".bottle, .bottle-fallback",
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      },
      "-=.6"
    )
    .to(
      "#ribbonPath",
      {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.out"
      },
      "-=.8"
    )
    .to(
      ".sphere",
      {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "back.out(2)"
      },
      "-=1.0"
    )
    .to(
      ".notif",
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.18,
        ease: "back.out(1.7)"
      },
      "-=.6"
    )
    .to(
      ".scroll-down",
      {
        y: 0,
        opacity: 1,
        duration: 0.5
      },
      "-=.4"
    )
    .to(
      ".pagination, .accordion",
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1
      },
      "-=.4"
    );
  // ─── CONTINUOUS FLOATS (clay breathing) ───
  gsap.to(".sphere.s1", {
    y: "+=12",
    duration: 3.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  gsap.to(".sphere.s2", {
    y: "-=10",
    duration: 4.0,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  gsap.to(".sphere.s3", {
    y: "+=14",
    duration: 3.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  gsap.to(".sphere.s4", {
    y: "-=12",
    duration: 4.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  gsap.to(".sphere.s5", {
    y: "+=8",
    duration: 3.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  gsap.to(".bottle, .bottle-fallback", {
    y: "+=8",
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  gsap.to(".notif-like", {
    y: "+=4",
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  gsap.to(".notif-buy", {
    y: "-=4",
    duration: 4.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  // ─── MOUSE PARALLAX over stage ───
  const stage = document.getElementById("stage");
  const isCoarse = matchMedia("(pointer: coarse)").matches;
  if (stage && !isCoarse) {
    stage.addEventListener("mousemove", (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(".bottle, .bottle-fallback", {
        x: x * 14,
        rotateY: x * 7,
        rotateX: -y * 4,
        duration: 0.8,
        ease: "power3.out",
        transformPerspective: 1000
      });
      gsap.to(".sphere.s1", {
        x: x * 22,
        y: y * 18,
        duration: 0.8,
        ease: "power3.out"
      });
      gsap.to(".sphere.s2", {
        x: x * -16,
        y: y * 22,
        duration: 0.8,
        ease: "power3.out"
      });
      gsap.to(".sphere.s3", {
        x: x * 28,
        y: y * -20,
        duration: 0.8,
        ease: "power3.out"
      });
      gsap.to(".sphere.s4", {
        x: x * -22,
        y: y * -18,
        duration: 0.8,
        ease: "power3.out"
      });
      gsap.to(".sphere.s5", {
        x: x * 18,
        y: y * 14,
        duration: 0.8,
        ease: "power3.out"
      });
      gsap.to(".ribbon", {
        x: x * 10,
        y: y * 8,
        duration: 0.8,
        ease: "power3.out"
      });
      gsap.to(".notif-like", {
        x: x * -12,
        y: y * -8,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto"
      });
      gsap.to(".notif-buy", {
        x: x * 12,
        y: y * 10,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto"
      });
    });
    stage.addEventListener("mouseleave", () => {
      gsap.to(
        [
          ".bottle",
          ".bottle-fallback",
          ".sphere",
          ".ribbon",
          ".notif-like",
          ".notif-buy"
        ],
        {
          x: 0,
          y: 0,
          rotateY: 0,
          rotateX: 0,
          duration: 1,
          ease: "elastic.out(1, .5)"
        }
      );
    });
  }
  // ─── ACCORDION ───
  document.querySelectorAll(".acc-head").forEach((head) => {
    head.addEventListener("click", () => {
      const item = head.closest(".acc-item");
      const open = item.dataset.open === "true";
      // close others
      document
        .querySelectorAll(".acc-item")
        .forEach((i) => (i.dataset.open = "false"));
      // toggle current
      item.dataset.open = open ? "false" : "true";
    });
  });
  // ─── HEART (wishlist) TOGGLE w/ animation ───
  document.querySelectorAll(".btn-heart, .prod-like").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      btn.classList.toggle("liked");
      gsap
        .timeline()
        .to(btn, {
          scale: 1.3,
          duration: 0.18,
          ease: "power2.out"
        })
        .to(btn, {
          scale: 1,
          duration: 0.55,
          ease: "elastic.out(1, .4)"
        });
      if (btn.classList.contains("liked")) {
        // emit a little floating heart
        const heart = document.createElement("span");
        heart.textContent = "♥";
        Object.assign(heart.style, {
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          color: "#e23744",
          fontSize: "20px",
          pointerEvents: "none",
          zIndex: "99"
        });
        btn.appendChild(heart);
        gsap.fromTo(
          heart,
          {
            y: 0,
            opacity: 1,
            scale: 0.6
          },
          {
            y: -40,
            opacity: 0,
            scale: 1.4,
            duration: 0.9,
            ease: "power2.out",
            onComplete: () => heart.remove()
          }
        );
      }
    });
  });
  // ─── ADD TO CART feedback ───
  const btnCart = document.getElementById("btnCart");
  btnCart?.addEventListener("click", () => {
    gsap
      .timeline()
      .to(btnCart, {
        scale: 0.94,
        duration: 0.1,
        ease: "power2.out"
      })
      .to(btnCart, {
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, .4)"
      });
    // little plus icon flies into the badge
    const fly = document.createElement("span");
    fly.textContent = "+1";
    Object.assign(fly.style, {
      position: "fixed",
      left: btnCart.getBoundingClientRect().left + "px",
      top: btnCart.getBoundingClientRect().top + "px",
      fontFamily: "Plus Jakarta Sans, sans-serif",
      fontWeight: "700",
      fontSize: "14px",
      color: "#e23744",
      pointerEvents: "none",
      zIndex: "999"
    });
    document.body.appendChild(fly);
    const bag = document.querySelector(".icon-btn:nth-of-type(2)");
    if (bag) {
      const target = bag.getBoundingClientRect();
      gsap.to(fly, {
        left: target.left + 12 + "px",
        top: target.top + 6 + "px",
        scale: 0.6,
        opacity: 0,
        duration: 0.9,
        ease: "power2.in",
        onComplete: () => {
          fly.remove();
          gsap.fromTo(
            bag.querySelector(".badge"),
            {
              scale: 1
            },
            {
              scale: 1.4,
              duration: 0.25,
              yoyo: true,
              repeat: 1,
              ease: "power2.out"
            }
          );
        }
      });
    }
  });
  // ─── BRAND TOGGLE ───
  const brand = document.getElementById("brandToggle");
  brand?.addEventListener("click", () => brand.classList.toggle("on"));
  // ─── SCROLL DOWN ───
  document.getElementById("scrollDown")?.addEventListener("click", () => {
    document.querySelector(".related")?.scrollIntoView({
      behavior: "smooth"
    });
  });
  // ─── SCROLL PARALLAX on bottle stage ───
  gsap.to(".bottle, .bottle-fallback", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.2
    },
    y: -80,
    scale: 0.92
  });
  gsap.to(".arch", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.2
    },
    y: -40,
    scale: 1.06
  });
  gsap.to(".title", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.2
    },
    y: -30,
    opacity: 0.6
  });
  gsap.to(".sphere.s3", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.5
    },
    y: -100,
    x: 30
  });
  gsap.to(".sphere.s4", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.5
    },
    y: 80,
    x: -20
  });
  // ─── REVEAL on scroll ───
  gsap.utils.toArray(".reveal").forEach((el, i) => {
    gsap.fromTo(
      el,
      {
        y: 60,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true
        }
      }
    );
  });
  // ─── PROD card tilt ───
  if (!isCoarse) {
    document.querySelectorAll(".prod").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(card, {
          rotateY: x * 6,
          rotateX: -y * 6,
          duration: 0.4,
          ease: "power2.out",
          transformPerspective: 900
        });
        gsap.to(card.querySelector(".prod-img-wrap img"), {
          x: x * 16,
          y: y * -12,
          duration: 0.5,
          ease: "power2.out"
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.6,
          ease: "elastic.out(1, .6)"
        });
        gsap.to(card.querySelector(".prod-img-wrap img"), {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, .5)"
        });
      });
    });
  }
})();