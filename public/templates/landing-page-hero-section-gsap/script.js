gsap.registerPlugin(ScrollTrigger);

// ============================================================
// INTRO TIMELINE
// ============================================================
gsap.set("#nav", { opacity: 0, y: -20 });
gsap.set("#bubble-left", { opacity: 0, x: -40, y: -20, rotation: -10 });
gsap.set("#bubble-right", { opacity: 0, x: 40, y: -20, rotation: 10 });
gsap.set(".headline .letter", { opacity: 0, y: 80 });
gsap.set("#cardBack", { opacity: 0, scale: 0.5, rotation: -40 });
gsap.set("#cardFront", { opacity: 0, scale: 0.5, rotation: 35 });
gsap.set(".meta-left, .meta-right", { opacity: 0, y: 20 });
gsap.set(".f-card, .cta-inner", { opacity: 0 });

const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
intro
  .to("#nav", { opacity: 1, y: 0, duration: 0.8 }, 0.1)
  .to(
    "#bubble-left",
    {
      opacity: 1,
      x: 0,
      y: 0,
      rotation: -3,
      duration: 0.9,
      ease: "back.out(1.4)"
    },
    0.3
  )
  .to(
    "#bubble-right",
    {
      opacity: 1,
      x: 0,
      y: 0,
      rotation: 3,
      duration: 0.9,
      ease: "back.out(1.4)"
    },
    0.35
  )
  .to(
    ".headline .letter",
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.05,
      ease: "power3.out"
    },
    0.45
  )
  .to(
    "#cardBack",
    {
      opacity: 1,
      scale: 1,
      rotation: -12,
      duration: 1.1,
      ease: "back.out(1.6)"
    },
    0.9
  )
  .to(
    "#cardFront",
    {
      opacity: 1,
      scale: 1,
      rotation: 8,
      duration: 1.1,
      ease: "back.out(1.6)"
    },
    1.0
  )
  .to(".meta-left", { opacity: 1, y: 0, duration: 0.8 }, 1.3)
  .to(".meta-right", { opacity: 1, y: 0, duration: 0.8 }, 1.4);

// ============================================================
// FLOATING BUBBLES
// ============================================================
gsap.to("#bubble-left", {
  y: "+=8",
  rotation: "+=2",
  duration: 3,
  delay: 2.5,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1
});
gsap.to("#bubble-right", {
  y: "+=10",
  rotation: "-=2",
  duration: 3.4,
  delay: 2.7,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1
});

// ============================================================
// FLOATING IMAGE CARDS (idle bob)
// ============================================================
gsap.to("#cardBack", {
  y: "+=8",
  rotation: "-=1.5",
  duration: 4,
  delay: 2.5,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1
});
gsap.to("#cardFront", {
  y: "+=10",
  rotation: "+=1.5",
  duration: 3.6,
  delay: 2.7,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1
});

// ============================================================
// SCROLL: LAYERED CARDS SLIDE APART (the main interaction)
// ============================================================
// During the hero, cards drift apart to reveal "TECHNOLOGY"
// and rotate more dramatically.
ScrollTrigger.create({
  trigger: ".hero",
  start: "top top",
  end: "bottom top",
  scrub: 0.8,
  onUpdate: (self) => {
    const p = self.progress;
    // Front card slides RIGHT, rotates clockwise
    gsap.set("#cardFront", {
      x: 280 * p,
      y: -40 * p,
      rotation: 8 + 18 * p,
      scale: 1 - 0.1 * p
    });
    // Back card slides LEFT, rotates counter-clockwise
    gsap.set("#cardBack", {
      x: -280 * p,
      y: 40 * p,
      rotation: -12 - 18 * p,
      scale: 1 - 0.1 * p
    });
    // TECHNOLOGY letters spread apart slightly + scale down
    document.querySelectorAll(".headline .letter").forEach((l, i) => {
      const center = 4.5; // index of midpoint
      const dist = i - center;
      gsap.set(l, {
        x: dist * 8 * p,
        y: -30 * p,
        opacity: 1 - p * 0.5
      });
    });
    // Bubbles drift up & out
    gsap.set("#bubble-left", { y: -60 * p, x: -20 * p, opacity: 1 - p * 1.2 });
    gsap.set("#bubble-right", { y: -60 * p, x: 20 * p, opacity: 1 - p * 1.2 });
  }
});

// ============================================================
// MOUSE PARALLAX ON HERO CARDS
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
  tx += (mx - tx) * 0.06;
  ty += (my - ty) * 0.06;
  const stack = document.getElementById("cardStack");
  if (stack) {
    stack.style.translate = `${tx * 12}px ${ty * 10}px`;
  }
  requestAnimationFrame(parallax);
}
parallax();

// ============================================================
// IMG CARD HOVER LIFT (3D)
// ============================================================
document.querySelectorAll(".img-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card, {
      rotateX: -py * 14,
      rotateY: px * 14,
      scale: 1.04,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 800,
      overwrite: "auto"
    });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.6)",
      overwrite: "auto"
    });
  });
});

// ============================================================
// FEATURES REVEAL ON SCROLL
// ============================================================
gsap.to(".f-card", {
  opacity: 1,
  y: 0,
  duration: 1,
  stagger: 0.12,
  ease: "power3.out",
  scrollTrigger: { trigger: ".features", start: "top 80%" }
});
gsap.from(".f-card", {
  y: 60,
  duration: 1,
  stagger: 0.12,
  ease: "power3.out",
  scrollTrigger: { trigger: ".features", start: "top 80%" }
});

// Numbered list items pop in
gsap.from(".numbered li", {
  opacity: 0,
  x: -30,
  duration: 0.6,
  stagger: 0.1,
  ease: "power3.out",
  scrollTrigger: { trigger: ".f-card-1", start: "top 75%" }
});

// Mission cards reveal
gsap.from(".mini-card", {
  opacity: 0,
  x: 40,
  duration: 0.8,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: { trigger: ".f-card-3", start: "top 75%" }
});

// ============================================================
// CTA REVEAL
// ============================================================
gsap.to(".cta-inner", {
  opacity: 1,
  y: 0,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: { trigger: ".cta", start: "top 80%" }
});
gsap.from(".cta-inner", {
  y: 60,
  scale: 0.97,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: { trigger: ".cta", start: "top 80%" }
});

// STATS counter
ScrollTrigger.create({
  trigger: ".cta",
  start: "top 75%",
  onEnter: () => {
    document.querySelectorAll(".stat-block .num").forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const span = el.querySelector("span");
      gsap.to(
        { v: 0 },
        {
          v: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: function () {
            span.textContent = Math.floor(this.targets()[0].v).toLocaleString();
          }
        }
      );
    });
  },
  once: true
});

// ============================================================
// BUTTON CLICK FEEDBACK
// ============================================================
document
  .querySelectorAll(".signup, .learn-pill, .plus-btn, .arrow-btn")
  .forEach((btn) => {
    btn.addEventListener("click", () => {
      gsap.fromTo(
        btn,
        { scale: 1 },
        {
          scale: 0.9,
          duration: 0.12,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        }
      );
    });
  });