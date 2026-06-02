gsap.registerPlugin(ScrollTrigger);
// Apply natural rotation to each card; store rest rotation; start off-screen
document.querySelectorAll(".pcard").forEach((card) => {
  const rot = parseFloat(card.dataset.rot) || 0;
  card.dataset.restRot = rot;
  gsap.set(card, {
    rotation: rot + 25,
    y: -500,
    opacity: 0,
    scale: 0.7
  });
});
gsap.set(".nav", {
  opacity: 0,
  y: -20
});
gsap.set(".top-left .word > span", {
  y: "105%"
});
gsap.set("#topRight > div", {
  opacity: 0,
  x: 30
});
gsap.set(".listen .letter, .listen .paren, .listen .dollar", {
  y: 200,
  opacity: 0
});
gsap.set("#desc", {
  opacity: 0,
  y: 20
});
gsap.set(".ep-card, .sub-inner", {
  opacity: 0
});
// ============================================================
// INTRO TIMELINE
// ============================================================
const intro = gsap.timeline({
  defaults: {
    ease: "power3.out"
  }
});
intro
  .to(
    ".nav",
    {
      opacity: 1,
      y: 0,
      duration: 0.8
    },
    0.1
  )
  .to(
    ".top-left .word > span",
    {
      y: "0%",
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out"
    },
    0.3
  )
  .to(
    "#topRight > div",
    {
      opacity: 1,
      x: 0,
      duration: 0.7,
      stagger: 0.08
    },
    0.6
  )
  .to(
    ".pcard",
    {
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: (i, el) => parseFloat(el.dataset.restRot) || 0,
      duration: 1.1,
      stagger: {
        each: 0.08,
        from: "center"
      },
      ease: "back.out(1.4)"
    },
    0.7
  )
  .to(
    ".listen .letter, .listen .paren, .listen .dollar",
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.06,
      ease: "back.out(1.6)"
    },
    1.2
  )
  .to(
    "#desc",
    {
      opacity: 1,
      y: 0,
      duration: 0.8
    },
    1.8
  );
// ============================================================
// CONTINUOUS FLOAT ON CARDS
// ============================================================
document.querySelectorAll(".pcard").forEach((card, i) => {
  const rot = parseFloat(card.dataset.restRot) || 0;
  gsap.to(card, {
    y: `+=${6 + (i % 3) * 4}`,
    rotation: rot + (i % 2 === 0 ? 1.2 : -1.2),
    duration: 3 + (i % 3) * 0.6,
    delay: 2 + i * 0.1,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1
  });
});
// ============================================================
// MOUSE PARALLAX
// ============================================================
const hero = document.querySelector(".hero");
let mx = 0,
  my = 0,
  tx = 0,
  ty = 0;
hero.addEventListener("mousemove", (e) => {
  const r = hero.getBoundingClientRect();
  mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
  my = ((e.clientY - r.top) / r.height - 0.5) * 2;
});
hero.addEventListener("mouseleave", () => {
  mx = 0;
  my = 0;
});

function parallax() {
  tx += (mx - tx) * 0.05;
  ty += (my - ty) * 0.05;
  document.querySelectorAll(".pcard").forEach((card) => {
    const d = parseFloat(card.dataset.depth) || 8;
    card.style.translate = `${tx * d}px ${ty * d * 0.6}px`;
  });
  requestAnimationFrame(parallax);
}
parallax();
// ============================================================
// CARD HOVER 3D LIFT (rotates to upright temporarily)
// ============================================================
document.querySelectorAll(".pcard").forEach((card) => {
  const restRot = parseFloat(card.dataset.restRot) || 0;
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card, {
      rotateX: -py * 14,
      rotateY: px * 14,
      rotation: restRot * 0.3, // straighten up
      scale: 1.1,
      zIndex: 20,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 700,
      overwrite: "auto"
    });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      rotation: restRot,
      scale: 1,
      zIndex: "",
      duration: 0.8,
      ease: "elastic.out(1, 0.6)",
      overwrite: "auto"
    });
  });
  card.addEventListener("click", () => {
    gsap.fromTo(
      card,
      {
        scale: 1.1
      },
      {
        scale: 1,
        duration: 0.3,
        ease: "elastic.out(1, 0.5)"
      }
    );
  });
});
// ============================================================
// SCROLL: cards fan out, "listen($)" spreads horizontally
// ============================================================
ScrollTrigger.create({
  trigger: ".hero",
  start: "top top",
  end: "bottom top",
  scrub: 0.8,
  onUpdate: (self) => {
    const p = self.progress;
    // Cards explode outward
    const moves = [
      {
        x: -260,
        y: -80,
        rot: -30
      },
      {
        x: -200,
        y: -40,
        rot: -22
      },
      {
        x: -120,
        y: 40,
        rot: -10
      },
      {
        x: 0,
        y: 80,
        rot: 0
      },
      {
        x: 120,
        y: 40,
        rot: 10
      },
      {
        x: 200,
        y: -40,
        rot: 22
      },
      {
        x: 260,
        y: -80,
        rot: 30
      }
    ];
    document.querySelectorAll(".pcard").forEach((card, i) => {
      const m = moves[i];
      const rest = parseFloat(card.dataset.restRot) || 0;
      gsap.set(card, {
        x: m.x * p,
        y: m.y * p,
        rotation: rest + m.rot * p
      });
    });
    // listen($) letters spread apart
    const letters = document.querySelectorAll(
      ".listen .letter, .listen .paren, .listen .dollar"
    );
    const cx = letters.length / 2;
    letters.forEach((l, i) => {
      const dist = i - cx;
      gsap.set(l, {
        x: dist * 8 * p,
        y: -30 * p
      });
    });
    // Fade other elements
    gsap.set(".top-left, .top-right, #desc", {
      opacity: 1 - p * 1.5
    });
    gsap.set(".listen", {
      opacity: 1 - p * 0.4
    });
  }
});
// ============================================================
// EPISODES REVEAL
// ============================================================
gsap.from(".eyebrow, .ep-head h2, .ep-head p", {
  opacity: 0,
  y: 30,
  duration: 0.9,
  stagger: 0.1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".ep-head",
    start: "top 80%"
  }
});
gsap.to(".ep-card", {
  opacity: 1,
  y: 0,
  duration: 1,
  stagger: 0.1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".ep-grid",
    start: "top 80%"
  }
});
gsap.from(".ep-card", {
  y: 70,
  scale: 0.95,
  rotation: (i) => (i % 2 === 0 ? -2 : 2),
  duration: 1,
  stagger: 0.1,
  ease: "back.out(1.3)",
  scrollTrigger: {
    trigger: ".ep-grid",
    start: "top 80%"
  }
});
// ============================================================
// SUBSCRIBE CTA REVEAL
// ============================================================
gsap.to(".sub-inner", {
  opacity: 1,
  y: 0,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".sub-cta",
    start: "top 80%"
  }
});
gsap.from(".sub-inner", {
  y: 60,
  scale: 0.97,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".sub-cta",
    start: "top 80%"
  }
});
// Button clicks
document
  .querySelectorAll(".sub-pill, .sub-form button, .ep-play")
  .forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      gsap.fromTo(
        btn,
        {
          scale: 1
        },
        {
          scale: 0.92,
          duration: 0.12,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        }
      );
    });
  });
