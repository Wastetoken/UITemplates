const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) =>
  Array.from(scope.querySelectorAll(selector));

const defaults = {
  brandName: "Aurora Kit",
  seedColor: "#6D5DFB",
  accentColor: "#00D5FF",
  harmony: "analogous",
  mood: "crystal",
  mode: "dark",
  fontPair: "neo",
  baseFont: 16,
  scaleRatio: 1.2,
  radius: 18,
  density: 1,
  saturation: 1
};

const fontPairs = {
  neo: {
    label: "Neo geometric",
    display:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    body:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },
  humanist: {
    label: "Humanist product",
    display: "Aptos Display, Avenir Next, ui-sans-serif, system-ui, sans-serif",
    body: "Aptos, Avenir, ui-sans-serif, system-ui, sans-serif"
  },
  editorial: {
    label: "Editorial contrast",
    display: "Georgia, 'Times New Roman', ui-serif, serif",
    body: "Aptos, ui-sans-serif, system-ui, sans-serif"
  },
  mono: {
    label: "Technical mono",
    display: "'SFMono-Regular', 'Cascadia Code', Consolas, monospace",
    body: "Inter, ui-sans-serif, system-ui, sans-serif"
  }
};

const moods = {
  crystal: {
    label: "Crystal glass",
    sat: 1.08,
    light: 1.03,
    bg: 0,
    soft: 0.18
  },
  midnight: {
    label: "Midnight SaaS",
    sat: 0.96,
    light: 0.94,
    bg: -2,
    soft: 0.16
  },
  editorial: {
    label: "Editorial luxury",
    sat: 0.82,
    light: 1.02,
    bg: 1,
    soft: 0.14
  },
  playful: {
    label: "Playful creator",
    sat: 1.24,
    light: 1.05,
    bg: 2,
    soft: 0.22
  },
  minimal: { label: "Quiet minimal", sat: 0.62, light: 0.98, bg: 3, soft: 0.12 }
};

const creativeNames = [
  "Nebula Studio",
  "Prism OS",
  "Velvet Grid",
  "Signal Bloom",
  "Lunar Foundry",
  "Halo Commerce",
  "Pulse Atlas",
  "Nova Ledger",
  "Kinetic Cloud",
  "Opal Interface",
  "Orbit Works",
  "Muse Engine",
  "Quantum Desk",
  "Atlas Ritual",
  "Soft Machine"
];

let state = { ...defaults };
let generated = null;
let activeExport = "css";

const controls = {};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function mod(number, n) {
  return ((number % n) + n) % n;
}

function normalizeHex(hex) {
  const safe = String(hex || "")
    .trim()
    .replace("#", "");
  if (safe.length === 3) {
    return `#${safe
      .split("")
      .map((char) => char + char)
      .join("")}`.toUpperCase();
  }
  return `#${safe.padEnd(6, "0").slice(0, 6)}`.toUpperCase();
}

function hexToRgb(hex) {
  const normalized = normalizeHex(hex).replace("#", "");
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16)
  };
}

function rgbToHex({ r, g, b }) {
  const toHex = (channel) =>
    clamp(Math.round(channel), 0, 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function rgbToHsl({ r, g, b }) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToRgb(h, s, l) {
  h = mod(h, 360) / 360;
  s = clamp(s, 0, 100) / 100;
  l = clamp(l, 0, 100) / 100;

  if (s === 0) {
    const gray = l * 255;
    return { r: gray, g: gray, b: gray };
  }

  const hueToRgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: hueToRgb(p, q, h + 1 / 3) * 255,
    g: hueToRgb(p, q, h) * 255,
    b: hueToRgb(p, q, h - 1 / 3) * 255
  };
}

function hslToHex(h, s, l) {
  return rgbToHex(hslToRgb(h, s, l));
}

function hexToHsl(hex) {
  return rgbToHsl(hexToRgb(hex));
}

function mix(hexA, hexB, weight = 0.5) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  return rgbToHex({
    r: a.r * (1 - weight) + b.r * weight,
    g: a.g * (1 - weight) + b.g * weight,
    b: a.b * (1 - weight) + b.b * weight
  });
}

function rgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const transform = (value) => {
    const channel = value / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
}

function contrastRatio(hexA, hexB) {
  const lumA = relativeLuminance(hexA);
  const lumB = relativeLuminance(hexB);
  const light = Math.max(lumA, lumB);
  const dark = Math.min(lumA, lumB);
  return (light + 0.05) / (dark + 0.05);
}

function readableText(background) {
  const whiteRatio = contrastRatio(background, "#FFFFFF");
  const darkRatio = contrastRatio(background, "#080A14");
  return whiteRatio >= darkRatio ? "#FFFFFF" : "#080A14";
}

function hueForHarmony(baseHue, harmony, slot) {
  const table = {
    analogous: [0, 34, -28, 156],
    complementary: [0, 180, 210, 38],
    triadic: [0, 120, 240, 60],
    monochrome: [0, 0, 0, 0],
    cyber: [0, 95, 292, 172]
  };
  return mod(baseHue + (table[harmony] || table.analogous)[slot], 360);
}

function generatePalette() {
  const seedHex = normalizeHex(state.seedColor);
  const accentSeed = normalizeHex(state.accentColor);
  const seed = hexToHsl(seedHex);
  const accentHsl = hexToHsl(accentSeed);
  const mood = moods[state.mood] || moods.crystal;
  const chroma = clamp(seed.s * state.saturation * mood.sat, 14, 96);
  const activeMode =
    state.mode === "auto"
      ? relativeLuminance(seedHex) > 0.42
        ? "dark"
        : "light"
      : state.mode;

  const primaryLightness =
    activeMode === "dark"
      ? clamp(seed.l * mood.light + 5, 48, 68)
      : clamp(seed.l * mood.light - 5, 34, 55);

  const primary = hslToHex(seed.h, chroma, primaryLightness);
  const primaryStrong =
    activeMode === "dark"
      ? hslToHex(
          seed.h,
          clamp(chroma + 5, 0, 100),
          clamp(primaryLightness + 14, 54, 82)
        )
      : hslToHex(
          seed.h,
          clamp(chroma + 4, 0, 100),
          clamp(primaryLightness - 8, 22, 45)
        );

  const secondaryBase = hslToHex(
    hueForHarmony(seed.h, state.harmony, 1),
    clamp(chroma + 8, 18, 98),
    activeMode === "dark" ? 58 : 44
  );
  const accentBase = hslToHex(
    hueForHarmony(seed.h, state.harmony, 2),
    clamp(chroma + 12, 18, 98),
    activeMode === "dark" ? 62 : 48
  );
  const accentInfluence = state.harmony === "monochrome" ? 0.18 : 0.46;
  const secondary = mix(
    secondaryBase,
    accentSeed,
    state.harmony === "cyber" ? 0.2 : 0.34
  );
  const accent = mix(
    accentBase,
    hslToHex(
      accentHsl.h,
      clamp(accentHsl.s * state.saturation, 20, 98),
      activeMode === "dark" ? 62 : 46
    ),
    accentInfluence
  );

  const success = hslToHex(
    hueForHarmony(seed.h, state.harmony, 3) + 86,
    clamp(64 * state.saturation, 48, 88),
    activeMode === "dark" ? 54 : 38
  );
  const warning = hslToHex(
    42,
    clamp(84 * state.saturation, 58, 96),
    activeMode === "dark" ? 62 : 46
  );
  const danger = hslToHex(
    348,
    clamp(78 * state.saturation, 54, 94),
    activeMode === "dark" ? 62 : 48
  );
  const info = mix(
    secondary,
    hslToHex(208, 90, activeMode === "dark" ? 64 : 46),
    0.42
  );

  const bgHue = mod(seed.h + (state.mood === "editorial" ? 28 : 226), 360);
  const bgSat = clamp(seed.s * 0.2 * mood.sat, 4, 22);
  const bg =
    activeMode === "dark"
      ? hslToHex(bgHue, bgSat, clamp(5 + mood.bg, 3, 12))
      : hslToHex(bgHue, clamp(bgSat + 10, 8, 24), clamp(97 - mood.bg, 92, 98));
  const bgElevated =
    activeMode === "dark"
      ? hslToHex(bgHue, clamp(bgSat + 5, 6, 26), clamp(10 + mood.bg, 8, 18))
      : "#FFFFFF";

  const text = activeMode === "dark" ? "#F7F8FF" : "#111321";
  const muted =
    activeMode === "dark" ? hslToHex(bgHue, 18, 72) : hslToHex(bgHue, 18, 36);
  const subtle =
    activeMode === "dark" ? hslToHex(bgHue, 16, 50) : hslToHex(bgHue, 14, 48);
  const inverse = readableText(mix(primary, secondary, 0.42));

  const surfaceBase = activeMode === "dark" ? "#FFFFFF" : "#0B1020";
  const surface = rgba(
    surfaceBase,
    activeMode === "dark" ? mood.soft * 0.45 : 0.055
  );
  const surfaceStrong = rgba(
    surfaceBase,
    activeMode === "dark" ? mood.soft * 0.82 : 0.09
  );
  const border = rgba(surfaceBase, activeMode === "dark" ? 0.16 : 0.12);
  const borderStrong = rgba(surfaceBase, activeMode === "dark" ? 0.28 : 0.2);

  return {
    activeMode,
    colors: {
      primary,
      primaryStrong,
      primarySoft: rgba(primary, mood.soft),
      secondary,
      accent,
      success,
      warning,
      danger,
      info,
      bg,
      bgElevated,
      surface,
      surfaceStrong,
      border,
      borderStrong,
      text,
      muted,
      subtle,
      inverse
    }
  };
}

function generateTypography() {
  const base = Number(state.baseFont);
  const ratio = Number(state.scaleRatio);
  const names = [
    "caption",
    "small",
    "body",
    "lead",
    "h4",
    "h3",
    "h2",
    "h1",
    "display"
  ];
  const powers = [-2, -1, 0, 1, 2, 3, 4, 5, 6];
  const sizes = names.map((name, index) => ({
    name,
    value: `${(base * Math.pow(ratio, powers[index])).toFixed(2)}px`,
    rem: `${Math.pow(ratio, powers[index]).toFixed(3)}rem`
  }));

  return {
    display: fontPairs[state.fontPair].display,
    body: fontPairs[state.fontPair].body,
    mono: "'SFMono-Regular', Consolas, 'Liberation Mono', monospace",
    sizes,
    base: `${base}px`,
    ratio: ratio.toFixed(2)
  };
}

function generateFoundation() {
  const density = Number(state.density);
  const radius = Number(state.radius);
  const spacing = {
    1: `${(0.25 * density).toFixed(2)}rem`,
    2: `${(0.5 * density).toFixed(2)}rem`,
    3: `${(0.75 * density).toFixed(2)}rem`,
    4: `${(1 * density).toFixed(2)}rem`,
    5: `${(1.25 * density).toFixed(2)}rem`,
    6: `${(1.5 * density).toFixed(2)}rem`,
    8: `${(2 * density).toFixed(2)}rem`,
    10: `${(2.5 * density).toFixed(2)}rem`,
    12: `${(3 * density).toFixed(2)}rem`
  };

  return {
    spacing,
    radius: {
      xs: `${Math.round(radius * 0.35)}px`,
      sm: `${Math.round(radius * 0.55)}px`,
      md: `${Math.round(radius * 0.78)}px`,
      lg: `${radius}px`,
      xl: `${Math.round(radius * 1.45)}px`,
      pill: "999px"
    },
    shadow: {
      soft: "0 18px 60px rgba(0, 0, 0, 0.28)",
      lift: `0 24px 80px rgba(0, 0, 0, 0.38), 0 0 48px ${rgba(
        state.seedColor,
        0.16
      )}`,
      ring: `0 0 0 1px var(--color-border), 0 0 0 8px ${rgba(
        state.seedColor,
        0.18
      )}`
    }
  };
}

function buildTokens() {
  const palette = generatePalette();
  const typography = generateTypography();
  const foundation = generateFoundation();

  const cssVars = {
    "font-display": typography.display,
    "font-body": typography.body,
    "font-mono": typography.mono,
    "base-font": typography.base,
    "scale-ratio": typography.ratio,
    density: Number(state.density).toFixed(2),
    "radius-base": foundation.radius.lg,
    "color-primary": palette.colors.primary,
    "color-primary-strong": palette.colors.primaryStrong,
    "color-primary-soft": palette.colors.primarySoft,
    "color-secondary": palette.colors.secondary,
    "color-accent": palette.colors.accent,
    "color-success": palette.colors.success,
    "color-warning": palette.colors.warning,
    "color-danger": palette.colors.danger,
    "color-info": palette.colors.info,
    "color-bg": palette.colors.bg,
    "color-bg-elevated": palette.colors.bgElevated,
    "color-surface": palette.colors.surface,
    "color-surface-strong": palette.colors.surfaceStrong,
    "color-border": palette.colors.border,
    "color-border-strong": palette.colors.borderStrong,
    "color-text": palette.colors.text,
    "color-muted": palette.colors.muted,
    "color-subtle": palette.colors.subtle,
    "color-inverse": palette.colors.inverse,
    "shadow-soft": foundation.shadow.soft,
    "shadow-lift": foundation.shadow.lift,
    "shadow-ring": foundation.shadow.ring,
    "transition-fast": "150ms ease",
    "transition-med": "260ms cubic-bezier(.2,.8,.2,1)"
  };

  Object.entries(foundation.spacing).forEach(
    ([key, value]) => (cssVars[`space-${key}`] = value)
  );
  Object.entries(foundation.radius).forEach(
    ([key, value]) => (cssVars[`radius-${key}`] = value)
  );
  typography.sizes.forEach(
    (item) => (cssVars[`font-size-${item.name}`] = item.value)
  );

  return { palette, typography, foundation, cssVars };
}

function applyTheme() {
  generated = buildTokens();
  const root = document.documentElement;

  Object.entries(generated.cssVars).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });

  root.style.colorScheme =
    generated.palette.activeMode === "dark" ? "dark" : "light";
  document.body.dataset.mode = generated.palette.activeMode;

  const cleanBrand = state.brandName.trim() || defaults.brandName;
  const initial =
    cleanBrand
      .replace(/[^a-z0-9]/gi, "")
      .charAt(0)
      .toUpperCase() || "A";
  $("#appBrandName").textContent = cleanBrand;
  $("#previewBrandName").textContent = cleanBrand;
  $("#heroTitle").textContent = `${cleanBrand} design system`;
  $("#brandMark").textContent = initial;
  $("#previewBrandMark").textContent = initial;
  $("#heroDescription").textContent = `${
    moods[state.mood].label
  } direction using ${state.harmony.replace(/-/g, " ")} harmony, ${fontPairs[
    state.fontPair
  ].label.toLowerCase()} typography, and ${
    generated.palette.activeMode
  } contrast tokens.`;

  updateControlOutputs();
  renderSwatches();
  renderContrast();
  renderTypeScale();
  renderFoundation();
  renderTokenTable();
  renderExportCode();
}

function updateControlOutputs() {
  $("#baseFontOut").textContent = `${state.baseFont}px`;
  $("#scaleOut").textContent = Number(state.scaleRatio).toFixed(2);
  $("#radiusOut").textContent = `${state.radius}px`;
  $("#densityOut").textContent = Number(state.density).toFixed(2);
  $("#saturationOut").textContent = Number(state.saturation).toFixed(2);
}

function renderSwatches() {
  const swatchGrid = $("#swatchGrid");
  swatchGrid.innerHTML = "";
  const template = $("#swatchTemplate");
  const swatches = [
    ["primary", generated.palette.colors.primary],
    ["primary strong", generated.palette.colors.primaryStrong],
    ["secondary", generated.palette.colors.secondary],
    ["accent", generated.palette.colors.accent],
    ["success", generated.palette.colors.success],
    ["warning", generated.palette.colors.warning],
    ["danger", generated.palette.colors.danger],
    ["info", generated.palette.colors.info],
    ["background", generated.palette.colors.bg],
    ["elevated", generated.palette.colors.bgElevated],
    ["text", generated.palette.colors.text],
    ["muted", generated.palette.colors.muted]
  ];

  swatches.forEach(([name, value]) => {
    const node = template.content.cloneNode(true);
    const swatch = $(".swatch", node);
    const color = $(".swatch-color", node);
    const strong = $("strong", node);
    const small = $("small", node);
    color.style.background = value;
    strong.textContent = name;
    small.textContent = value;
    swatch.setAttribute("aria-label", `Copy ${name} color ${value}`);
    swatch.addEventListener("click", () => copyText(value, `${name} copied`));
    swatchGrid.appendChild(node);
  });
}

function renderContrast() {
  const list = $("#contrastList");
  const c = generated.palette.colors;
  const pairs = [
    ["Text / background", c.text, c.bg],
    ["Muted / background", c.muted, c.bg],
    ["Primary / button text", c.primary, c.inverse],
    ["Secondary / button text", c.secondary, c.inverse],
    ["Success / background", c.success, c.bg]
  ];

  list.innerHTML = pairs
    .map(([name, a, b]) => {
      const ratio = contrastRatio(a, b);
      const label =
        ratio >= 7
          ? "AAA"
          : ratio >= 4.5
          ? "AA"
          : ratio >= 3
          ? "Large text only"
          : "Needs attention";
      const tone = ratio >= 4.5 ? "pass" : ratio >= 3 ? "warn" : "fail";
      return `
      <div class="contrast-item">
        <strong>${name}<em class="${tone}">${ratio.toFixed(2)}:1</em></strong>
        <span>${label}</span>
      </div>
    `;
    })
    .join("");
}

function renderTypeScale() {
  const container = $("#typeScale");
  const samples = {
    display: "Launch luminous systems.",
    h1: "Product interfaces with presence.",
    h2: "Expressive hierarchy",
    h3: "Modular rhythm",
    h4: "Readable sections",
    lead: "A polished lead paragraph for landing pages and dashboards.",
    body: "Body copy remains calm, legible, and high-contrast across surfaces.",
    small: "Small metadata and supporting labels.",
    caption: "CAPTION / 012"
  };

  container.innerHTML = generated.typography.sizes
    .slice()
    .reverse()
    .map(
      (item) => `
    <div class="type-row">
      <small>${item.name}<br>${item.value} · ${item.rem}</small>
      <p style="font-size:${item.value}">${
        samples[item.name] || "The quick brown fox jumps over the lazy dog."
      }</p>
    </div>
  `
    )
    .join("");
}

function renderFoundation() {
  const container = $("#foundationGrid");
  const radius = generated.foundation.radius;
  const spacing = generated.foundation.spacing;
  container.innerHTML = `
    ${Object.entries(spacing)
      .slice(0, 6)
      .map(
        ([key, value]) => `
      <div class="foundation-item">
        <small>space-${key}<br>${value}</small>
        <span class="space-bar" style="width: min(100%, calc(${value} * 8)); border-radius: var(--radius-pill)"></span>
      </div>
    `
      )
      .join("")}
    <div class="foundation-item">
      <small>radius-lg<br>${radius.lg}</small>
      <span class="radius-demo" style="border-radius:${radius.lg}"></span>
    </div>
    <div class="foundation-item">
      <small>shadow-lift<br>dynamic glow</small>
      <span class="shadow-demo"></span>
    </div>
  `;
}

function flattenTokens() {
  const rows = [];
  const colorNames = [
    ["color.primary", generated.palette.colors.primary],
    ["color.primaryStrong", generated.palette.colors.primaryStrong],
    ["color.primarySoft", generated.palette.colors.primarySoft],
    ["color.secondary", generated.palette.colors.secondary],
    ["color.accent", generated.palette.colors.accent],
    ["color.success", generated.palette.colors.success],
    ["color.warning", generated.palette.colors.warning],
    ["color.danger", generated.palette.colors.danger],
    ["color.info", generated.palette.colors.info],
    ["color.bg", generated.palette.colors.bg],
    ["color.bgElevated", generated.palette.colors.bgElevated],
    ["color.surface", generated.palette.colors.surface],
    ["color.surfaceStrong", generated.palette.colors.surfaceStrong],
    ["color.border", generated.palette.colors.border],
    ["color.borderStrong", generated.palette.colors.borderStrong],
    ["color.text", generated.palette.colors.text],
    ["color.muted", generated.palette.colors.muted],
    ["color.subtle", generated.palette.colors.subtle],
    ["color.inverse", generated.palette.colors.inverse]
  ];
  colorNames.forEach(([name, value]) =>
    rows.push({ name, value, type: "color" })
  );
  generated.typography.sizes.forEach((item) =>
    rows.push({
      name: `fontSize.${item.name}`,
      value: item.value,
      type: "font"
    })
  );
  rows.push({
    name: "fontFamily.display",
    value: generated.typography.display,
    type: "text"
  });
  rows.push({
    name: "fontFamily.body",
    value: generated.typography.body,
    type: "text"
  });
  Object.entries(generated.foundation.spacing).forEach(([key, value]) =>
    rows.push({ name: `space.${key}`, value, type: "space" })
  );
  Object.entries(generated.foundation.radius).forEach(([key, value]) =>
    rows.push({ name: `radius.${key}`, value, type: "radius" })
  );
  Object.entries(generated.foundation.shadow).forEach(([key, value]) =>
    rows.push({ name: `shadow.${key}`, value, type: "shadow" })
  );
  rows.push({
    name: "meta.mode",
    value: generated.palette.activeMode,
    type: "text"
  });
  rows.push({
    name: "meta.mood",
    value: moods[state.mood].label,
    type: "text"
  });
  rows.push({ name: "meta.harmony", value: state.harmony, type: "text" });
  return rows;
}

function renderTokenTable() {
  const tbody = $("#tokenTable");
  const query = ($("#tokenSearch")?.value || "").trim().toLowerCase();
  const rows = flattenTokens().filter((row) =>
    `${row.name} ${row.value}`.toLowerCase().includes(query)
  );
  tbody.innerHTML = rows
    .map(
      (row) => `
    <tr>
      <td><span class="token-name">${escapeHtml(row.name)}</span></td>
      <td><span class="token-value">${escapeHtml(row.value)}</span></td>
      <td>${renderTokenPreview(row)}</td>
      <td><button class="copy-token" data-copy="${escapeAttribute(
        row.value
      )}" type="button">Copy</button></td>
    </tr>
  `
    )
    .join("");

  $$(".copy-token", tbody).forEach((button) => {
    button.addEventListener("click", () =>
      copyText(button.dataset.copy, "Token copied")
    );
  });
}

function renderTokenPreview(row) {
  if (row.type === "color")
    return `<span class="token-preview" style="background:${escapeAttribute(
      row.value
    )}"></span>`;
  if (row.type === "font")
    return `<span class="token-preview text-preview" style="font-size:${escapeAttribute(
      row.value
    )}">Aa</span>`;
  if (row.type === "radius")
    return `<span class="token-preview" style="border-radius:${escapeAttribute(
      row.value
    )}; background:var(--color-primary-soft)"></span>`;
  if (row.type === "shadow")
    return `<span class="token-preview" style="box-shadow:${escapeAttribute(
      row.value
    )}; background:var(--color-surface-strong)"></span>`;
  if (row.type === "space")
    return `<span class="token-preview" style="width:${escapeAttribute(
      row.value
    )}; background:var(--color-secondary)"></span>`;
  return '<span class="token-preview text-preview">Text</span>';
}

function cssVariableExport() {
  const lines = Object.entries(generated.cssVars).map(
    ([key, value]) => `  --${key}: ${value};`
  );
  return `/* ${
    state.brandName || defaults.brandName
  } · generated UI kit tokens */\n:root {\n${lines.join(
    "\n"
  )}\n}\n\n[data-theme='dark'] { color-scheme: dark; }\n[data-theme='light'] { color-scheme: light; }`;
}

function structuredTokens() {
  const token = (value, type) => ({ value, type });
  return {
    brand: state.brandName || defaults.brandName,
    mode: generated.palette.activeMode,
    mood: state.mood,
    harmony: state.harmony,
    tokens: {
      color: Object.fromEntries(
        Object.entries(generated.palette.colors).map(([key, value]) => [
          key,
          token(value, "color")
        ])
      ),
      typography: {
        fontFamily: {
          display: token(generated.typography.display, "fontFamily"),
          body: token(generated.typography.body, "fontFamily"),
          mono: token(generated.typography.mono, "fontFamily")
        },
        fontSize: Object.fromEntries(
          generated.typography.sizes.map((item) => [
            item.name,
            token(item.value, "dimension")
          ])
        )
      },
      spacing: Object.fromEntries(
        Object.entries(generated.foundation.spacing).map(([key, value]) => [
          key,
          token(value, "dimension")
        ])
      ),
      radius: Object.fromEntries(
        Object.entries(generated.foundation.radius).map(([key, value]) => [
          key,
          token(value, "dimension")
        ])
      ),
      shadow: Object.fromEntries(
        Object.entries(generated.foundation.shadow).map(([key, value]) => [
          key,
          token(value, "shadow")
        ])
      )
    }
  };
}

function jsonExport() {
  return JSON.stringify(structuredTokens(), null, 2);
}

function scssExport() {
  const mapLines = Object.entries(generated.cssVars).map(
    ([key, value]) =>
      `  '${key}': ${
        typeof value === "string" &&
        value.includes(",") &&
        !value.startsWith("rgba")
          ? `'${value}'`
          : value
      }`
  );
  return `$${dashName(state.brandName)}-tokens: (\n${mapLines.join(
    ",\n"
  )}\n);\n\n@mixin ${dashName(
    state.brandName
  )}-css-vars {\n  :root {\n${Object.entries(generated.cssVars)
    .map(([key, value]) => `    --${key}: ${value};`)
    .join("\n")}\n  }\n}`;
}

function tailwindExport() {
  return `/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        primary: 'var(--color-primary)',\n        'primary-strong': 'var(--color-primary-strong)',\n        secondary: 'var(--color-secondary)',\n        accent: 'var(--color-accent)',\n        success: 'var(--color-success)',\n        warning: 'var(--color-warning)',\n        danger: 'var(--color-danger)',\n        info: 'var(--color-info)',\n        bg: 'var(--color-bg)',\n        surface: 'var(--color-surface)',\n        text: 'var(--color-text)',\n        muted: 'var(--color-muted)'\n      },\n      borderRadius: {\n        xs: 'var(--radius-xs)',\n        sm: 'var(--radius-sm)',\n        md: 'var(--radius-md)',\n        lg: 'var(--radius-lg)',\n        xl: 'var(--radius-xl)',\n        pill: 'var(--radius-pill)'\n      },\n      spacing: {\n${Object.keys(
    generated.foundation.spacing
  )
    .map((key) => `        '${key}': 'var(--space-${key})'`)
    .join(
      ",\n"
    )}\n      },\n      fontFamily: {\n        display: ['var(--font-display)'],\n        body: ['var(--font-body)'],\n        mono: ['var(--font-mono)']\n      },\n      boxShadow: {\n        soft: 'var(--shadow-soft)',\n        lift: 'var(--shadow-lift)',\n        ring: 'var(--shadow-ring)'\n      }\n    }\n  }\n};`;
}

function figmaTokensExport() {
  const source = structuredTokens().tokens;
  const figma = {
    global: {
      color: Object.fromEntries(
        Object.entries(source.color).map(([key, token]) => [
          key,
          { value: token.value, type: "color" }
        ])
      ),
      typography: {
        display: {
          value: {
            fontFamily: generated.typography.display,
            fontSize: generated.typography.sizes.find(
              (item) => item.name === "h2"
            ).value,
            fontWeight: "800",
            lineHeight: "1.05"
          },
          type: "typography"
        },
        body: {
          value: {
            fontFamily: generated.typography.body,
            fontSize: generated.typography.base,
            fontWeight: "400",
            lineHeight: "1.6"
          },
          type: "typography"
        }
      },
      spacing: source.spacing,
      radius: source.radius,
      shadow: source.shadow
    }
  };
  return JSON.stringify(figma, null, 2);
}

function getCurrentExport() {
  const exports = {
    css: cssVariableExport,
    json: jsonExport,
    scss: scssExport,
    tailwind: tailwindExport,
    figma: figmaTokensExport
  };
  return exports[activeExport]();
}

function renderExportCode() {
  $("#exportCode").textContent = getCurrentExport();
}

function dashName(value) {
  return (
    String(value || "aurora-kit")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "aurora-kit"
  );
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function syncControls() {
  Object.entries(controls).forEach(([key, element]) => {
    if (!element) return;
    element.value = state[key];
  });
  updateControlOutputs();
}

function captureControls() {
  state = {
    ...state,
    brandName: controls.brandName.value,
    seedColor: normalizeHex(controls.seedColor.value),
    accentColor: normalizeHex(controls.accentColor.value),
    harmony: controls.harmony.value,
    mood: controls.mood.value,
    mode: controls.mode.value,
    fontPair: controls.fontPair.value,
    baseFont: Number(controls.baseFont.value),
    scaleRatio: Number(controls.scaleRatio.value),
    radius: Number(controls.radius.value),
    density: Number(controls.density.value),
    saturation: Number(controls.saturation.value)
  };
}

function randomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(62 + Math.random() * 30);
  const lightness = Math.floor(46 + Math.random() * 14);
  return hslToHex(hue, saturation, lightness);
}

function randomizeTheme() {
  const harmonyOptions = [
    "analogous",
    "complementary",
    "triadic",
    "monochrome",
    "cyber"
  ];
  const moodOptions = Object.keys(moods);
  const fontOptions = Object.keys(fontPairs);
  const seed = randomColor();
  const seedHue = hexToHsl(seed).h;
  const accent = hslToHex(
    seedHue + (Math.random() > 0.5 ? 95 : 180 + Math.random() * 80),
    86,
    58
  );

  state = {
    ...state,
    brandName: creativeNames[Math.floor(Math.random() * creativeNames.length)],
    seedColor: seed,
    accentColor: accent,
    harmony: harmonyOptions[Math.floor(Math.random() * harmonyOptions.length)],
    mood: moodOptions[Math.floor(Math.random() * moodOptions.length)],
    fontPair: fontOptions[Math.floor(Math.random() * fontOptions.length)],
    mode: Math.random() > 0.24 ? "dark" : "light",
    baseFont: Math.floor(15 + Math.random() * 5),
    scaleRatio: Number((1.14 + Math.random() * 0.18).toFixed(2)),
    radius: Math.floor(Math.random() * 30),
    density: Number((0.9 + Math.random() * 0.28).toFixed(2)),
    saturation: Number((0.82 + Math.random() * 0.5).toFixed(2))
  };
  syncControls();
  applyTheme();
  showToast("Creative direction generated");
}

function saveTheme() {
  localStorage.setItem("aurora-kit-theme", JSON.stringify(state));
  showToast("Theme saved locally");
}

function loadTheme() {
  try {
    const saved = JSON.parse(localStorage.getItem("aurora-kit-theme"));
    if (saved && typeof saved === "object") state = { ...defaults, ...saved };
  } catch {
    state = { ...defaults };
  }
}

function resetTheme() {
  state = { ...defaults };
  localStorage.removeItem("aurora-kit-theme");
  syncControls();
  applyTheme();
  showToast("Theme reset");
}

function showTab(id) {
  $$(".tab").forEach((button) =>
    button.classList.toggle("is-active", button.dataset.tab === id)
  );
  $$(".tab-panel").forEach((panel) =>
    panel.classList.toggle("is-active", panel.id === id)
  );
}

function showExportTab(id) {
  activeExport = id;
  $$(".export-tab").forEach((button) =>
    button.classList.toggle("is-active", button.dataset.export === id)
  );
  renderExportCode();
}

function showExports() {
  showTab("exports");
  $("#exports").scrollIntoView({ behavior: "smooth", block: "start" });
}

async function copyText(text, message = "Copied") {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
  showToast(message);
}

function downloadCurrentExport() {
  const extensions = {
    css: "css",
    json: "json",
    scss: "scss",
    tailwind: "js",
    figma: "json"
  };
  const fileName = `${dashName(state.brandName)}-tokens.${
    extensions[activeExport]
  }`;
  const blob = new Blob([getCurrentExport()], {
    type: "text/plain;charset=utf-8"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast(`${fileName} downloaded`);
}

function showToast(message) {
  const region = $("#toastRegion");
  const template = $("#toastTemplate");
  const node = template.content.cloneNode(true);
  const toast = $(".toast", node);
  $("p", node).textContent = message;
  region.appendChild(node);
  window.setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(0.75rem) scale(.98)";
    window.setTimeout(() => toast.remove(), 220);
  }, 2400);
}

function bindEvents() {
  [
    "brandName",
    "seedColor",
    "accentColor",
    "harmony",
    "mood",
    "mode",
    "fontPair",
    "baseFont",
    "scaleRatio",
    "radius",
    "density",
    "saturation"
  ].forEach((id) => (controls[id] = $(`#${id}`)));

  Object.values(controls).forEach((element) => {
    element.addEventListener("input", () => {
      captureControls();
      applyTheme();
    });
  });

  $("#randomize").addEventListener("click", randomizeTheme);
  $("#saveTheme").addEventListener("click", saveTheme);
  $("#resetTheme").addEventListener("click", resetTheme);
  $("#exportThemeTop").addEventListener("click", showExports);
  $("#jumpTokens").addEventListener("click", () => showTab("tokens"));
  $("#copyCSSHero").addEventListener("click", () =>
    copyText(cssVariableExport(), "CSS variables copied")
  );
  $("#copyPalette").addEventListener("click", () =>
    copyText(
      JSON.stringify(generated.palette.colors, null, 2),
      "Palette copied"
    )
  );
  $("#copyExport").addEventListener("click", () =>
    copyText(getCurrentExport(), `${activeExport.toUpperCase()} copied`)
  );
  $("#downloadExport").addEventListener("click", downloadCurrentExport);
  $("#toggleCompact").addEventListener("click", () => {
    document.body.classList.toggle("focus-mode");
    showToast(
      document.body.classList.contains("focus-mode")
        ? "Focus mode enabled"
        : "Focus mode disabled"
    );
  });

  $$(".tab").forEach((button) =>
    button.addEventListener("click", () => showTab(button.dataset.tab))
  );
  $$(".export-tab").forEach((button) =>
    button.addEventListener("click", () => showExportTab(button.dataset.export))
  );
  $("#tokenSearch").addEventListener("input", renderTokenTable);

  document.addEventListener("keydown", (event) => {
    const tag = document.activeElement?.tagName?.toLowerCase();
    const isTyping = ["input", "textarea", "select"].includes(tag);
    if (isTyping || event.metaKey || event.ctrlKey || event.altKey) return;
    const key = event.key.toLowerCase();
    if (key === "g") randomizeTheme();
    if (key === "e") showExports();
    if (key === "f") $("#toggleCompact").click();
  });
}

function init() {
  bindEvents();
  loadTheme();
  syncControls();
  applyTheme();
}

document.addEventListener("DOMContentLoaded", init);