gsap.registerPlugin(ScrollTrigger);

gsap.set(".nav", { opacity: 0, y: -20 });
gsap.set("#tag", { opacity: 0, x: -20 });
gsap.set("#headline .line > span", { y: "105%" });
gsap.set("#dermexcelBg .letter", { y: 60, opacity: 0 });
gsap.set("#figure", { y: 100, opacity: 0, scale: 0.92 });
gsap.set("#productGlow", { opacity: 0, scale: 0.6 });
gsap.set("#exploreCard", { opacity: 0, x: 40, scale: 0.9 });
gsap.set("#starsRow, #ctaRow", { opacity: 0, y: 20 });
gsap.set("#partners", { opacity: 0, x: 40 });
gsap.set(".meta-bar .m-item", { opacity: 0, y: 10 });
gsap.set(".bigpill", { opacity: 0, y: 60, scale: 0.9 });

const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
intro
  .to(".nav", { opacity: 1, y: 0, duration: 0.8 }, 0.1)
  .to(
    "#productGlow",
    { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
    0.4
  )
  .to(
    "#figure",
    { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: "back.out(1.3)" },
    0.4
  )
  .to(
    "#dermexcelBg .letter",
    {
      y: 0,
      opacity: 0.6,
      duration: 0.9,
      stagger: 0.06,
      ease: "back.out(1.4)"
    },
    0.5
  )
  .to("#tag", { opacity: 1, x: 0, duration: 0.7 }, 0.8)
  .to(
    "#headline .line > span",
    {
      y: "0%",
      duration: 0.9,
      stagger: 0.1
    },
    0.9
  )
  .to("#starsRow", { opacity: 1, y: 0, duration: 0.7 }, 1.3)
  .to("#ctaRow", { opacity: 1, y: 0, duration: 0.7 }, 1.45)
  .to(
    "#exploreCard",
    { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "back.out(1.4)" },
    1.1
  )
  .to("#partners", { opacity: 1, x: 0, duration: 0.8 }, 1.6)
  .to(
    ".meta-bar .m-item",
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
    1.7
  );

const cc = document.getElementById("customerCount");
gsap.to(
  { v: 0 },
  {
    v: 3000,
    duration: 2.4,
    delay: 1.4,
    ease: "power2.out",
    onUpdate: function () {
      cc.textContent =
        Math.floor(this.targets()[0].v).toLocaleString() + "+ Customers";
    }
  }
);

// Continuous: figure floats subtly, glow pulses, zenrixa shimmer
gsap.to("#figure", {
  y: "+=8",
  duration: 4,
  delay: 2,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1
});
gsap.to("#productGlow", {
  opacity: 0.7,
  scale: 1.1,
  duration: 3,
  delay: 2,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1
});
gsap.to("#dermexcelBg .letter", {
  y: "+=4",
  duration: 3,
  stagger: { each: 0.15, repeat: -1, yoyo: true },
  delay: 2.2,
  ease: "sine.inOut"
});

// Mouse parallax
const hero = document.querySelector(".hero-card");
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
  const fig = document.getElementById("figure");
  const bg = document.getElementById("dermexcelBg");
  const card = document.getElementById("exploreCard");
  if (fig) fig.style.translate = `${tx * 12}px ${ty * 8}px`;
  if (bg) bg.style.translate = `${tx * 22}px ${ty * 10}px`;
  if (card) card.style.translate = `${tx * 8}px ${ty * 6}px`;
  requestAnimationFrame(parallax);
}
parallax();

// Explore card hover
document.getElementById("exploreCard").addEventListener("mouseenter", () => {
  gsap.to("#exploreCard", {
    y: -4,
    scale: 1.02,
    duration: 0.5,
    ease: "back.out(1.4)"
  });
});
document.getElementById("exploreCard").addEventListener("mouseleave", () => {
  gsap.to("#exploreCard", {
    y: 0,
    scale: 1,
    duration: 0.7,
    ease: "elastic.out(1, 0.6)"
  });
});

// Figure hover lift
document.getElementById("figure").style.pointerEvents = "auto";
document.getElementById("figure").addEventListener("mouseenter", () => {
  gsap.to("#figure", { scale: 1.04, duration: 0.6, ease: "back.out(1.4)" });
  gsap.to("#productGlow", {
    opacity: 0.9,
    scale: 1.2,
    duration: 0.6,
    ease: "power2.out"
  });
});
document.getElementById("figure").addEventListener("mouseleave", () => {
  gsap.to("#figure", { scale: 1, duration: 0.8, ease: "elastic.out(1, 0.6)" });
  gsap.to("#productGlow", {
    opacity: 0.7,
    scale: 1.1,
    duration: 0.8,
    ease: "power2.out"
  });
});

// Scroll
ScrollTrigger.create({
  trigger: ".hero-card",
  start: "top top",
  end: "bottom top",
  scrub: 0.8,
  onUpdate: (self) => {
    const p = self.progress;
    gsap.set("#figure", { y: -60 * p, scale: 1 + 0.06 * p });
    gsap.set("#productGlow", { y: -40 * p, opacity: 1 - p * 0.5 });
    gsap.set("#dermexcelBg", { y: -100 * p, opacity: 0.6 - p * 0.5 });
    gsap.set(".headline", { y: -40 * p, opacity: 1 - p * 1.3 });
    gsap.set("#exploreCard", { y: -40 * p, opacity: 1 - p * 1.3 });
    gsap.set("#partners", { y: -40 * p, opacity: 1 - p * 1.3 });
  }
});

// About reveals
gsap.from(".about-tag, .about-globe-line", {
  opacity: 0,
  y: 20,
  duration: 0.8,
  stagger: 0.12,
  ease: "power3.out",
  scrollTrigger: { trigger: ".about-section", start: "top 75%" }
});

const aboutText = document.querySelector(".about-text");
const words = aboutText.innerHTML
  .split(/(<span[^>]*>|<\/span>|\s+)/)
  .filter(Boolean);
let html = "";
words.forEach((w) => {
  if (w.startsWith("<span") || w.startsWith("</span")) {
    html += w;
  } else if (/^\s+$/.test(w)) {
    html += w;
  } else {
    html += `<span class="aw" style="display:inline-block;">${w}</span>`;
  }
});
aboutText.innerHTML = html;

gsap.from(".about-text .aw", {
  opacity: 0,
  y: 20,
  duration: 0.8,
  stagger: 0.04,
  ease: "power3.out",
  scrollTrigger: { trigger: ".about-text", start: "top 80%" }
});

gsap.from(".about-bottom", {
  opacity: 0,
  y: 30,
  duration: 0.9,
  ease: "power3.out",
  scrollTrigger: { trigger: ".about-bottom", start: "top 85%" }
});

gsap.from(".globe-art ellipse, .globe-art line, .globe-art circle", {
  opacity: 0,
  scale: 0.8,
  transformOrigin: "50% 50%",
  duration: 1.4,
  stagger: 0.05,
  ease: "power3.out",
  scrollTrigger: { trigger: ".about-section", start: "top 75%" }
});

gsap.to(".globe-art", {
  rotation: 360,
  duration: 80,
  ease: "none",
  repeat: -1,
  transformOrigin: "50% 50%"
});

// Pill row
gsap.to(".bigpill", {
  opacity: 1,
  y: 0,
  scale: 1,
  duration: 1.1,
  stagger: 0.12,
  ease: "back.out(1.4)",
  scrollTrigger: { trigger: ".pill-row", start: "top 80%" }
});

document.querySelectorAll(".bigpill").forEach((p) => {
  p.addEventListener("mousemove", (e) => {
    const r = p.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(p, {
      rotateX: -py * 12,
      rotateY: px * 12,
      y: -6,
      scale: 1.04,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 700,
      overwrite: "auto"
    });
  });
  p.addEventListener("mouseleave", () => {
    gsap.to(p, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.6)",
      overwrite: "auto"
    });
  });
});

gsap.to(".bp-arrow svg", {
  x: "+=4",
  duration: 1.4,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1
});

document
  .querySelectorAll(
    ".menu-btn, .pill-dark, .pill-ghost, .about-link, .bigpill, .si"
  )
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

document.getElementById("scrollDown").addEventListener("click", () => {
  document
    .querySelector(".about-section")
    .scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelectorAll(".nav-links a")
      .forEach((x) => x.classList.remove("active"));
    a.classList.add("active");
  });
});
