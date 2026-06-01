gsap.registerPlugin(ScrollTrigger);

// Initial states
gsap.set("#credit", { opacity: 0, y: -10 });
gsap.set(".ring", { transformOrigin: "400px 250px", scale: 0, opacity: 0 });
gsap.set("#brain", { scale: 0, opacity: 0 });
gsap.set(".icon-tile", { scale: 0, opacity: 0 });
gsap.set(".link", { strokeDashoffset: 600 });
gsap.set(".headline .inner", { y: "105%" });
gsap.set("#pointer", { scale: 0, opacity: 0, rotation: -20 });
gsap.set("#reinvent", { opacity: 0, y: 10 });
gsap.set(".ext-card", { opacity: 0 });
gsap.set(".cta-inner", { opacity: 0 });

// Set initial tile positions slightly off (they'll spring to their CSS positions)
// We'll do this with a from-y burst instead.

// ============================================================
// INTRO TIMELINE
// ============================================================
const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
intro
  .to("#credit", { opacity: 1, y: 0, duration: 0.8 }, 0.1)
  .to(
    ".ring",
    {
      scale: 1,
      opacity: 1,
      duration: 1.4,
      stagger: 0.12,
      ease: "power3.out"
    },
    0.3
  )
  .to(
    "#brain",
    {
      scale: 1,
      opacity: 1,
      duration: 1.1,
      ease: "back.out(1.8)"
    },
    0.5
  )
  .from(
    ".icon-tile",
    {
      y: (i) => (i % 2 === 0 ? -60 : 60),
      x: (i) => (i < 3 ? -40 : 40),
      duration: 1,
      ease: "back.out(1.6)"
    },
    0.9
  )
  .to(
    ".icon-tile",
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      stagger: 0.07,
      ease: "back.out(1.6)"
    },
    0.9
  )
  .to(
    ".link",
    {
      strokeDashoffset: 0,
      duration: 1.2,
      stagger: 0.08,
      ease: "power2.inOut"
    },
    1.3
  )
  .to(
    ".headline .inner",
    {
      y: "0%",
      duration: 1,
      stagger: 0.15,
      ease: "power3.out"
    },
    1.6
  )
  .to(
    "#pointer",
    {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.7,
      ease: "back.out(1.6)"
    },
    2.1
  )
  .to("#reinvent", { opacity: 1, y: 0, duration: 0.8 }, 2.3);

// ============================================================
// CONTINUOUS: brain bob + ring pulse + pointer wiggle
// ============================================================
gsap.to("#brain", {
  y: "+=8",
  rotation: "+=3",
  duration: 3,
  delay: 2.5,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1
});

// Sonar pulse on the rings (most visible on outer)
["ring-1", "ring-2", "ring-3", "ring-4"].forEach((cls, i) => {
  gsap.to(`.${cls}`, {
    attr: { r: 60 + i * 50 + 8 },
    opacity: 0.4,
    duration: 2.2,
    delay: 2.5 + i * 0.5,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1
  });
});

// Pointer wiggle every few seconds
function pointerWiggle() {
  gsap
    .timeline()
    .to("#pointer", { rotation: -15, duration: 0.2, ease: "power2.out" })
    .to("#pointer", {
      rotation: 0,
      duration: 0.6,
      ease: "elastic.out(1.2, 0.4)"
    })
    .to("#pointer", {
      rotation: -15,
      duration: 0.2,
      delay: 0.2,
      ease: "power2.out"
    })
    .to("#pointer", {
      rotation: 0,
      duration: 0.6,
      ease: "elastic.out(1.2, 0.4)"
    });
}
setTimeout(() => {
  pointerWiggle();
  setInterval(pointerWiggle, 4500);
}, 3500);

// ============================================================
// ICON TILE HOVER LIFT (3D)
// ============================================================
document.querySelectorAll(".icon-tile").forEach((tile) => {
  tile.addEventListener("mousemove", (e) => {
    const r = tile.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(tile, {
      rotateX: -py * 18,
      rotateY: px * 18,
      scale: 1.12,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 600,
      overwrite: "auto"
    });
  });
  tile.addEventListener("mouseleave", () => {
    gsap.to(tile, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.6)",
      overwrite: "auto"
    });
  });
  // Click pulse
  tile.addEventListener("click", () => {
    gsap.fromTo(
      tile,
      { scale: 1.12 },
      { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.inOut" }
    );
  });
});

// Brain click: emit pulse on the rings
document.getElementById("brain").addEventListener("click", () => {
  gsap.fromTo(
    "#brain",
    { scale: 1.15 },
    { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }
  );
  document.querySelectorAll(".ring").forEach((ring, i) => {
    const baseR = 60 + i * 50;
    gsap
      .timeline()
      .to(ring, {
        attr: { r: baseR + 30 },
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      })
      .to(ring, {
        attr: { r: baseR },
        opacity: 1,
        duration: 0.4,
        ease: "power2.in"
      });
  });
});

// ============================================================
// MOUSE PARALLAX ON HERO DIAGRAM
// ============================================================
const diagram = document.getElementById("diagram");
let mx = 0,
  my = 0,
  tx = 0,
  ty = 0;
diagram.addEventListener("mousemove", (e) => {
  const r = diagram.getBoundingClientRect();
  mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
  my = ((e.clientY - r.top) / r.height - 0.5) * 2;
});
diagram.addEventListener("mouseleave", () => {
  mx = 0;
  my = 0;
});

function parallax() {
  tx += (mx - tx) * 0.06;
  ty += (my - ty) * 0.06;
  document.querySelectorAll(".icon-tile").forEach((tile, i) => {
    const depth = 6 + (i % 3) * 3;
    // Only set translate transform here so it doesn't conflict with rotateX/rotateY
    tile.style.translate = `${tx * depth}px ${ty * depth}px`;
  });
  const brain = document.getElementById("brain");
  if (brain) brain.style.translate = `${tx * 4}px ${ty * 4}px`;
  requestAnimationFrame(parallax);
}
parallax();

// ============================================================
// SCROLL: poster diagram contracts / fades as you scroll past hero
// ============================================================
ScrollTrigger.create({
  trigger: ".poster",
  start: "top top",
  end: "bottom top",
  scrub: 0.8,
  onUpdate: (self) => {
    const p = self.progress;
    // Tiles drift outward and fade
    gsap.set(".tile-1", { x: -120 * p, y: -60 * p, rotation: -10 * p });
    gsap.set(".tile-2", { x: 120 * p, y: -60 * p, rotation: 10 * p });
    gsap.set(".tile-3", { x: -150 * p, y: 0, rotation: -6 * p });
    gsap.set(".tile-4", { x: 150 * p, y: 0, rotation: 6 * p });
    gsap.set(".tile-5", { x: -120 * p, y: 60 * p, rotation: 10 * p });
    gsap.set(".tile-6", { x: 120 * p, y: 60 * p, rotation: -10 * p });
    // Brain shrinks a touch
    gsap.set("#brain", { scale: 1 - 0.2 * p, opacity: 1 - 0.6 * p });
    // Links fade
    gsap.set(".link", { opacity: 1 - p * 1.5 });
    // Rings fade
    gsap.set(".ring", { opacity: (1 - p * 1.5) * 0.6 });
  }
});

// ============================================================
// EXT GRID REVEAL
// ============================================================
gsap.from(".ext-eyebrow, .ext-head h2, .ext-head p", {
  opacity: 0,
  y: 30,
  duration: 0.9,
  stagger: 0.1,
  ease: "power3.out",
  scrollTrigger: { trigger: ".ext-head", start: "top 80%" }
});

gsap.to(".ext-card", {
  opacity: 1,
  y: 0,
  duration: 1,
  stagger: 0.1,
  ease: "power3.out",
  scrollTrigger: { trigger: ".ext-grid", start: "top 80%" }
});
gsap.from(".ext-card", {
  y: 60,
  scale: 0.95,
  duration: 1,
  stagger: 0.1,
  ease: "back.out(1.3)",
  scrollTrigger: { trigger: ".ext-grid", start: "top 80%" }
});

// Card mini-tile hover lift inside cards
document.querySelectorAll(".mini-tile").forEach((tile) => {
  const parent = tile.closest(".ext-card");
  if (!parent) return;
  parent.addEventListener("mouseenter", () => {
    gsap.to(tile, {
      y: -6,
      rotate: -6,
      scale: 1.05,
      duration: 0.5,
      ease: "back.out(1.6)"
    });
  });
  parent.addEventListener("mouseleave", () => {
    gsap.to(tile, {
      y: 0,
      rotate: 0,
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
  scrollTrigger: { trigger: ".reinvent-cta", start: "top 80%" }
});
gsap.from(".cta-inner", {
  y: 80,
  scale: 0.95,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: { trigger: ".reinvent-cta", start: "top 80%" }
});

// CTA button click
document.getElementById("ctaBtn").addEventListener("click", () => {
  gsap.fromTo(
    "#ctaBtn",
    { scale: 1 },
    { scale: 0.92, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.inOut" }
  );
});

// Add-pill clicks
document.querySelectorAll(".add-pill").forEach((btn) => {
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