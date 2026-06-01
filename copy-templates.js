import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const templatesDir = path.join(__dirname, '..');
const publicTemplatesDir = path.join(__dirname, 'public', 'templates');

// Create public templates directory if it doesn't exist
if (!fs.existsSync(publicTemplatesDir)) {
  fs.mkdirSync(publicTemplatesDir, { recursive: true });
}

const templates = [
  'bold-modern-landing-page-gsap',
  'data-columns-floating',
  'data-columns-floating (1)',
  'data-columns-floating-interactive',
  'data-icons-float-gsap',
  'data-icons-landing-page-gsap',
  'data-icons-landing-page-gsap (1)',
  'data-landing-page-gsap',
  'data-landing-page-gsap (1)',
  'floating-icons-hero-section-gsap',
  'hero-capturing-moments-gallery-carousel-gsap',
  'hero-data-section-floating-data-gsap',
  'hero-section',
  'hero-section-data-gsap',
  'hero-section-floating-elements-gsap',
  'hero-section-gsap',
  'hero-section-gsap (1)',
  'hero-section-gsap (2)',
  'hero-section-gsap-carousel',
  'hero-section-gsap-carousel (1)',
  'hero-section-gsap-carousel (2)',
  'hero-section-gsap-gallery-carousel',
  'hero-section-join-newsletter-gsap',
  'hero-section-join-newsletter-gsap (1)',
  'hero-section-scroll-gsap',
  'interactive-node-flowchart-gsap',
  'landing-page-bento-gsap',
  'landing-page-gallery-carousel-gsap',
  'landing-page-gsap',
  'landing-page-gsap (1)',
  'landing-page-gsap (2)',
  'landing-page-gsap (3)',
  'landing-page-gsap-carousel-gallery',
  'landing-page-hero-section-bento-stats-gsap',
  'landing-page-hero-section-bento-stats-gsap (1)',
  'landing-page-hero-section-gsap',
  'medical-biology-hero-section-gsap',
  'modern-landing-page-gsap',
  'product-page-gsap',
  'scroll-driven-text-blow-out-with-gsap-css',
  'search-landing-page-gsap',
  'ui-kit-and-style-guide-generator-built-with-html-css-and-javascript',
  'silkbg1',
  'silkbg2',
  'landing-page-data-cards-gsap',
  'bento-grid-gsap'
];

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

let copiedCount = 0;
let skippedCount = 0;

for (const template of templates) {
  let templateDistPath = path.join(templatesDir, template, template, 'dist');
  
  if (!fs.existsSync(templateDistPath)) {
    // Try the numbered duplicate structure
    const nestedFolderName = template.replace(/ \(\d+\)$/, '');
    templateDistPath = path.join(templatesDir, template, nestedFolderName, 'dist');
  }
  
  const destPath = path.join(publicTemplatesDir, template);
  
  if (fs.existsSync(templateDistPath)) {
    console.log(`Copying: ${template}`);
    copyRecursiveSync(templateDistPath, destPath);
    copiedCount++;
  } else {
    console.log(`Skipped (not found): ${template}`);
    skippedCount++;
  }
}

console.log(`\nCopy complete: ${copiedCount} copied, ${skippedCount} skipped`);
