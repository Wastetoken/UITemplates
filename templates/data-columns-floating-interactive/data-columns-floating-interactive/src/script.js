// ===== TAB DATA =====
const tabData = {
  reviews: {
    light: {
      title: "Deployment (v2.8.5)\nadded uncached lookups",
      desc:
        "Requests are overloading the database, causing latency spikes and broken frontend responses.",
      tags: [
        {
          label: "v2.8.5",
          accent: null
        },
        {
          label: "Open source",
          accent: "green"
        },
        {
          label: "database",
          accent: null
        }
      ],
      footLeft: "<strong>(27)</strong> spikes found",
      footRight: "Read more"
    },
    dark: {
      title: "Secure deployment",
      desc:
        "No deploys with uncached fetches. CI must load-test any component that pulls user data on render.",
      small: "v2.8.6 securely encrypted",
      status: "Deployed",
      cta: "Restart investigation"
    }
  },
  solve: {
    light: {
      title: "Memory leak in\nWebSocket handler",
      desc:
        "Long-lived connections leak buffers, killing pods after roughly six hours of sustained traffic.",
      tags: [
        {
          label: "v3.1.0",
          accent: null
        },
        {
          label: "Critical",
          accent: "amber"
        },
        {
          label: "backend",
          accent: null
        }
      ],
      footLeft: "<strong>(12)</strong> incidents this week",
      footRight: "View trace"
    },
    dark: {
      title: "Graceful reconnect",
      desc:
        "New socket pool releases buffers on idle. Connections drain cleanly on every shutdown signal.",
      small: "Hotfix v3.1.1 ready to ship",
      status: "Patched",
      cta: "Run integration tests"
    }
  },
  prevent: {
    light: {
      title: "Exposed admin\nendpoints found",
      desc:
        "Internal admin routes reachable without auth from the staging mirror. Three accounts already probed.",
      tags: [
        {
          label: "v2.9.2",
          accent: null
        },
        {
          label: "Security",
          accent: "violet"
        },
        {
          label: "auth",
          accent: null
        }
      ],
      footLeft: "<strong>(4)</strong> endpoints exposed",
      footRight: "Audit log"
    },
    dark: {
      title: "Zero-trust gateway",
      desc:
        "All admin paths route through SSO. Probe attempts trigger immediate token revoke and alert ops.",
      small: "Policy v1.4 enforced cluster-wide",
      status: "Active",
      cta: "Review policy"
    }
  }
};
let currentTab = "reviews";

function applyData(tabKey) {
  const data = tabData[tabKey];
  if (!data) return;
  document.getElementById("clTitle").textContent = data.light.title;
  document.getElementById("clDesc").textContent = data.light.desc;
  document.getElementById("clFootLeft").innerHTML = data.light.footLeft;
  document.getElementById("clFootRight").textContent = data.light.footRight;
  const tagsEl = document.getElementById("clTags");
  tagsEl.innerHTML = "";
  data.light.tags.forEach((t) => {
    const span = document.createElement("span");
    span.className = "tag" + (t.accent ? " accent-" + t.accent : "");
    span.textContent = t.label;
    tagsEl.appendChild(span);
  });
  document.getElementById("cdTitle").textContent = data.dark.title;
  document.getElementById("cdDesc").textContent = data.dark.desc;
  document.getElementById("cdSmall").textContent = data.dark.small;
  document.getElementById("cdStatusLabel").textContent = data.dark.status;
  document.getElementById("cdCtaLabel").textContent = data.dark.cta;
}

function switchTab(newTab) {
  if (newTab === currentTab) return;
  // Toggle active state
  document.querySelectorAll(".tab").forEach((t) => {
    t.classList.remove("active");
    t.setAttribute("aria-selected", "false");
  });
  const newTabEl = document.querySelector('.tab[data-tab="' + newTab + '"]');
  newTabEl.classList.add("active");
  newTabEl.setAttribute("aria-selected", "true");
  currentTab = newTab;
  if (typeof gsap === "undefined") {
    applyData(newTab);
    return;
  }
  // Fade out content, swap, fade in
  const fadeTargets = [
    "#clTitle",
    "#clDesc",
    "#clTags",
    "#clFootLeft",
    "#clFootRight",
    "#cdTitle",
    "#cdDesc",
    "#cdSmall",
    "#cdStatusLabel",
    "#cdCtaLabel"
  ];
  gsap.to(fadeTargets, {
    opacity: 0,
    y: -6,
    duration: 0.22,
    ease: "power2.in",
    stagger: 0.012,
    onComplete: () => {
      applyData(newTab);
      gsap.set(".card-tags .tag", {
        opacity: 0,
        scale: 0.85,
        y: 6
      });
      gsap.to(fadeTargets, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
        stagger: 0.025
      });
      gsap.to(".card-tags .tag", {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "back.out(1.7)",
        delay: 0.15
      });
      gsap.fromTo(
        ".check-icon",
        {
          scale: 0.6,
          rotation: -90
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.55,
          ease: "back.out(2)"
        }
      );
      // Pulse the newly active dot
      gsap.fromTo(
        newTabEl.querySelector(".tab-dot"),
        {
          scale: 0
        },
        {
          scale: 1,
          duration: 0.5,
          ease: "back.out(2.5)"
        }
      );
    }
  });
}
// ===== Wire tabs =====
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => switchTab(tab.dataset.tab));
});
// Initial render
applyData("reviews");
// ===== INTRO ANIMATIONS =====
if (typeof gsap !== "undefined") {
  document.body.classList.add("js-ready");
  document.addEventListener("DOMContentLoaded", () => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });
    tl.to(".outer-wrap", {
      opacity: 1,
      duration: 0.4
    })
      .from(
        ".outer-wrap",
        {
          scale: 0.97,
          y: 20,
          duration: 0.8,
          ease: "back.out(1.3)"
        },
        "<"
      )
      .to(
        ".headline",
        {
          opacity: 1,
          duration: 0.5
        },
        "-=0.3"
      )
      .from(
        ".headline",
        {
          y: 12,
          duration: 0.55
        },
        "<"
      )
      .to(
        ".tabs",
        {
          opacity: 1,
          duration: 0.4
        },
        "-=0.4"
      )
      .from(
        ".tabs",
        {
          x: 30,
          scale: 0.92,
          duration: 0.6,
          ease: "back.out(1.5)"
        },
        "<"
      )
      .to(
        ".card-light",
        {
          opacity: 1,
          duration: 0.4
        },
        "-=0.3"
      )
      .from(
        ".card-light",
        {
          y: 30,
          scale: 0.96,
          duration: 0.75,
          ease: "back.out(1.3)"
        },
        "<"
      )
      .to(
        ".card-dark",
        {
          opacity: 1,
          duration: 0.4
        },
        "-=0.5"
      )
      .from(
        ".card-dark",
        {
          y: 30,
          scale: 0.96,
          duration: 0.8,
          ease: "back.out(1.3)"
        },
        "<"
      )
      .from(
        ["#clTitle", "#clDesc", "#cdTitle", "#cdDesc", "#cdSmall"],
        {
          opacity: 0,
          y: 14,
          duration: 0.5,
          stagger: 0.04
        },
        "-=0.4"
      )
      .from(
        ".card-tags .tag",
        {
          opacity: 0,
          scale: 0.85,
          y: 8,
          duration: 0.5,
          stagger: 0.07,
          ease: "back.out(1.7)"
        },
        "-=0.3"
      )
      .from(
        ".card-footer > *",
        {
          opacity: 0,
          y: 10,
          duration: 0.45,
          stagger: 0.06
        },
        "-=0.3"
      );
    // ===== CONTINUOUS LOOPS =====
    gsap.to(".tab.active .tab-dot", {
      scale: 1.25,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2
    });
    gsap.to(".check-icon", {
      scale: 1.08,
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2.5
    });
    // ===== Hover interactions =====
    ["cardLight", "cardDark"].forEach((id) => {
      const el = document.getElementById(id);
      el.addEventListener("mouseenter", () => {
        gsap.to(el, {
          y: -4,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });
    document.addEventListener("mouseover", (e) => {
      if (e.target.classList && e.target.classList.contains("tag")) {
        gsap.to(e.target, {
          scale: 1.06,
          duration: 0.2,
          ease: "back.out(2)"
        });
      }
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.classList && e.target.classList.contains("tag")) {
        gsap.to(e.target, {
          scale: 1,
          duration: 0.25,
          ease: "power2.out"
        });
      }
    });
    document.getElementById("cdCta").addEventListener("click", function () {
      gsap.fromTo(
        this,
        {
          scale: 0.94
        },
        {
          scale: 1,
          duration: 0.55,
          ease: "elastic.out(1.2, 0.4)"
        }
      );
    });
  });
}
