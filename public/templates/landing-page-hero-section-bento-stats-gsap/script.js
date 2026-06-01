gsap.registerPlugin(ScrollTrigger);

// Initial states
gsap.set(".nav", { opacity: 0, y: -20 });
gsap.set(".headline .line > span", { y: "105%" });
gsap.set("#subhead, #ctaStack", { opacity: 0, y: 20 });
gsap.set(".accent", { scale: 0, opacity: 0 });
gsap.set("#accLine", { scaleX: 0 });
gsap.set(".card", { opacity: 0, y: 60, scale: 0.95 });
gsap.set(".wf-card, .cta-inner", { opacity: 0 });

// ============================================================
// INTRO TIMELINE
// ============================================================
const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
intro
  .to(".nav", { opacity: 1, y: 0, duration: 0.8 }, 0.1)
  .to(
    ".headline .line > span",
    {
      y: "0%",
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out"
    },
    0.3
  )
  .to("#subhead", { opacity: 1, y: 0, duration: 0.8 }, 0.7)
  .to("#ctaStack", { opacity: 1, y: 0, duration: 0.8 }, 0.85)
  .to(
    ".accent",
    {
      scale: 1,
      opacity: 1,
      duration: 0.7,
      stagger: 0.08,
      ease: "back.out(1.6)"
    },
    1.0
  )
  .to("#accLine", { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 1.2)
  .to(
    ".card",
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.0,
      stagger: 0.1,
      ease: "back.out(1.3)"
    },
    1.2
  );

// Stat counters (delayed to align with card reveal)
document.querySelectorAll(".stat-num").forEach((el, i) => {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  gsap.to(
    { v: 0 },
    {
      v: target,
      duration: 2,
      delay: 1.8 + i * 0.2,
      ease: "power2.out",
      onUpdate: function () {
        el.textContent = Math.floor(this.targets()[0].v) + suffix;
      }
    }
  );
});

// ============================================================
// CONTINUOUS: floating accents
// ============================================================
["#acc1", "#acc2", "#acc3", "#acc4", "#acc5", "#acc6"].forEach((sel, i) => {
  gsap.to(sel, {
    y: `+=${6 + (i % 3) * 4}`,
    x: `+=${(i % 2 === 0 ? 1 : -1) * 3}`,
    rotation: i % 2 === 0 ? 4 : -4,
    duration: 3 + (i % 3) * 0.5,
    delay: 2 + i * 0.15,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1
  });
});

// ============================================================
// ACCENT HOVER: pop with spring
// ============================================================
document.querySelectorAll(".accent").forEach((a) => {
  a.addEventListener("mouseenter", () => {
    gsap.to(a, {
      scale: 1.2,
      rotation: "+=15",
      duration: 0.4,
      ease: "back.out(1.6)"
    });
  });
  a.addEventListener("mouseleave", () => {
    gsap.to(a, {
      scale: 1,
      rotation: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.6)"
    });
  });
});

// ============================================================
// MOUSE PARALLAX ON HERO ACCENTS
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
  document.querySelectorAll(".accent").forEach((a, i) => {
    const d = 8 + (i % 3) * 4;
    a.style.translate = `${tx * d}px ${ty * d}px`;
  });
  requestAnimationFrame(parallax);
}
parallax();

// ============================================================
// CARD HOVER: 3D tilt
// ============================================================
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card, {
      rotateX: -py * 8,
      rotateY: px * 8,
      y: -10,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 900,
      overwrite: "auto"
    });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.6)",
      overwrite: "auto"
    });
  });
});

// ============================================================
// SCROLL: cards parallax slightly differently as you scroll
// ============================================================
ScrollTrigger.create({
  trigger: ".card-row",
  start: "top 90%",
  end: "bottom top",
  scrub: 1,
  onUpdate: (self) => {
    const p = self.progress;
    const cards = document.querySelectorAll(".card-row .card");
    // Outer cards rise more, center stays
    const factors = [-40, -20, 0, -20, -40];
    cards.forEach((card, i) => {
      gsap.set(card, { y: factors[i] * p });
    });
  }
});

// Headline parallax up on scroll
ScrollTrigger.create({
  trigger: ".hero",
  start: "top top",
  end: "bottom top",
  scrub: 0.8,
  onUpdate: (self) => {
    const p = self.progress;
    gsap.set(".headline, #subhead, #ctaStack", {
      y: -60 * p,
      opacity: 1 - p * 1.2
    });
    gsap.set(".accent", { opacity: 1 - p * 1.5 });
  }
});

// ============================================================
// WORKFLOW REVEAL
// ============================================================
gsap.from(".eyebrow, .wf-head h2, .wf-head p", {
  opacity: 0,
  y: 30,
  duration: 0.9,
  stagger: 0.1,
  ease: "power3.out",
  scrollTrigger: { trigger: ".wf-head", start: "top 80%" }
});

gsap.to(".wf-card", {
  opacity: 1,
  y: 0,
  duration: 1,
  stagger: 0.12,
  ease: "power3.out",
  scrollTrigger: { trigger: ".wf-grid", start: "top 80%" }
});
gsap.from(".wf-card", {
  y: 60,
  scale: 0.95,
  duration: 1,
  stagger: 0.12,
  ease: "back.out(1.3)",
  scrollTrigger: { trigger: ".wf-grid", start: "top 0%" }
});

// Step icon hover effect
document.querySelectorAll(".wf-card").forEach((card) => {
  const icon = card.querySelector(".step-icon");
  card.addEventListener("mouseenter", () => {
    gsap.to(icon, {
      rotate: -10,
      y: -4,
      scale: 1.08,
      duration: 0.5,
      ease: "back.out(1.6)"
    });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(icon, {
      rotate: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.6)"
    });
  });
});

// ============================================================
// CTA REVEAL
// ============================================================
gsap.to(".cta-inner", {
  opacity: 1,
  y: 0,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: { trigger: ".cta-section", start: "top 80%" }
});
gsap.from(".cta-inner", {
  y: 60,
  scale: 0.97,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: { trigger: ".cta-section", start: "top 80%" }
});

// Button clicks
document
  .querySelectorAll(".contact-pill, .get-started, .try-demo, .cta-btn")
  .forEach((btn) => {
    btn.addEventListener("click", () => {
      gsap.fromTo(
        btn,
        { scale: 1 },
        {
          scale: 0.94,
          duration: 0.12,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        }
      );
    });
  });