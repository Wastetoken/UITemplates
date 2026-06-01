import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const templates = [
  {
    id: 1,
    name: 'Bold Modern Landing Page',
    folder: 'bold-modern-landing-page-gsap'
  },
  {
    id: 2,
    name: 'Data Columns Floating',
    folder: 'data-columns-floating'
  },
  {
    id: 3,
    name: 'Data Columns Floating (1)',
    folder: 'data-columns-floating (1)'
  },
  {
    id: 4,
    name: 'Data Columns Floating Interactive',
    folder: 'data-columns-floating-interactive'
  },
  {
    id: 5,
    name: 'Data Icons Float GSAP',
    folder: 'data-icons-float-gsap'
  },
  {
    id: 6,
    name: 'Data Icons Landing Page',
    folder: 'data-icons-landing-page-gsap'
  },
  {
    id: 7,
    name: 'Data Icons Landing Page (1)',
    folder: 'data-icons-landing-page-gsap (1)'
  },
  {
    id: 8,
    name: 'Data Landing Page GSAP',
    folder: 'data-landing-page-gsap'
  },
  {
    id: 9,
    name: 'Data Landing Page GSAP (1)',
    folder: 'data-landing-page-gsap (1)'
  },
  {
    id: 10,
    name: 'Floating Icons Hero Section',
    folder: 'floating-icons-hero-section-gsap'
  },
  {
    id: 11,
    name: 'Hero Capturing Moments Gallery',
    folder: 'hero-capturing-moments-gallery-carousel-gsap'
  },
  {
    id: 12,
    name: 'Hero Data Section Floating',
    folder: 'hero-data-section-floating-data-gsap'
  },
  {
    id: 13,
    name: 'Hero Section',
    folder: 'hero-section'
  },
  {
    id: 14,
    name: 'Hero Section Data GSAP',
    folder: 'hero-section-data-gsap'
  },
  {
    id: 15,
    name: 'Hero Section Floating Elements',
    folder: 'hero-section-floating-elements-gsap'
  },
  {
    id: 16,
    name: 'Hero Section GSAP',
    folder: 'hero-section-gsap'
  },
  {
    id: 17,
    name: 'Hero Section GSAP (1)',
    folder: 'hero-section-gsap (1)'
  },
  {
    id: 18,
    name: 'Hero Section GSAP (2)',
    folder: 'hero-section-gsap (2)'
  },
  {
    id: 19,
    name: 'Hero Section GSAP Carousel',
    folder: 'hero-section-gsap-carousel'
  },
  {
    id: 20,
    name: 'Hero Section GSAP Carousel (1)',
    folder: 'hero-section-gsap-carousel (1)'
  },
  {
    id: 21,
    name: 'Hero Section GSAP Carousel (2)',
    folder: 'hero-section-gsap-carousel (2)'
  },
  {
    id: 22,
    name: 'Hero Section GSAP Gallery',
    folder: 'hero-section-gsap-gallery-carousel'
  },
  {
    id: 23,
    name: 'Hero Section Join Newsletter',
    folder: 'hero-section-join-newsletter-gsap'
  },
  {
    id: 24,
    name: 'Hero Section Join Newsletter (1)',
    folder: 'hero-section-join-newsletter-gsap (1)'
  },
  {
    id: 25,
    name: 'Hero Section Scroll',
    folder: 'hero-section-scroll-gsap'
  },
  {
    id: 26,
    name: 'Interactive Node Flowchart',
    folder: 'interactive-node-flowchart-gsap'
  },
  {
    id: 27,
    name: 'Landing Page Bento GSAP',
    folder: 'landing-page-bento-gsap'
  },
  {
    id: 28,
    name: 'Landing Page Gallery Carousel',
    folder: 'landing-page-gallery-carousel-gsap'
  },
  {
    id: 29,
    name: 'Landing Page GSAP',
    folder: 'landing-page-gsap'
  },
  {
    id: 30,
    name: 'Landing Page GSAP (1)',
    folder: 'landing-page-gsap (1)'
  },
  {
    id: 31,
    name: 'Landing Page GSAP (2)',
    folder: 'landing-page-gsap (2)'
  },
  {
    id: 32,
    name: 'Landing Page GSAP (3)',
    folder: 'landing-page-gsap (3)'
  },
  {
    id: 33,
    name: 'Landing Page GSAP Carousel Gallery',
    folder: 'landing-page-gsap-carousel-gallery'
  },
  {
    id: 34,
    name: 'Landing Page Hero Bento Stats',
    folder: 'landing-page-hero-section-bento-stats-gsap'
  },
  {
    id: 35,
    name: 'Landing Page Hero Bento Stats (1)',
    folder: 'landing-page-hero-section-bento-stats-gsap (1)'
  },
  {
    id: 36,
    name: 'Landing Page Hero Section',
    folder: 'landing-page-hero-section-gsap'
  },
  {
    id: 37,
    name: 'Medical Biology Hero Section',
    folder: 'medical-biology-hero-section-gsap'
  },
  {
    id: 38,
    name: 'Modern Landing Page GSAP',
    folder: 'modern-landing-page-gsap'
  },
  {
    id: 39,
    name: 'Product Page GSAP',
    folder: 'product-page-gsap'
  },
  {
    id: 40,
    name: 'Scroll Driven Text Blow Out',
    folder: 'scroll-driven-text-blow-out-with-gsap-css'
  },
  {
    id: 41,
    name: 'Search Landing Page GSAP',
    folder: 'search-landing-page-gsap'
  },
  {
    id: 42,
    name: 'UI Kit Style Guide Generator',
    folder: 'ui-kit-and-style-guide-generator-built-with-html-css-and-javascript'
  },
  {
    id: 43,
    name: 'Silk BG 1',
    folder: 'silkbg1'
  },
  {
    id: 44,
    name: 'Silk BG 2',
    folder: 'silkbg2'
  },
  {
    id: 45,
    name: 'Landing Page Data Cards GSAP',
    folder: 'landing-page-data-cards-gsap'
  },
  {
    id: 46,
    name: 'Bento Grid GSAP',
    folder: 'bento-grid-gsap'
  }
];

async function generateScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const screenshotsDir = join(__dirname, 'public', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  let successCount = 0;
  let failCount = 0;

  for (const template of templates) {
    console.log(`Generating screenshot for: ${template.name}`);
    
    // Try both folder structures: template-folder/template-folder/dist and template-folder/template-folder-nested/dist
    let templatePath = join(__dirname, '..', template.folder, template.folder, 'dist', 'index.html');
    
    if (!fs.existsSync(templatePath)) {
      // Try the numbered duplicate structure
      const nestedFolderName = template.folder.replace(/ \(\d+\)$/, '');
      templatePath = join(__dirname, '..', template.folder, nestedFolderName, 'dist', 'index.html');
    }
    
    // Check if file exists
    if (!fs.existsSync(templatePath)) {
      console.log(`✗ Skipped (not found): ${template.name}`);
      failCount++;
      continue;
    }
    
    const fileUrl = `file://${templatePath.replace(/\\/g, '/')}`;
    
    const page = await browser.newPage();
    
    try {
      await page.goto(fileUrl, { 
        waitUntil: 'networkidle0',
        timeout: 30000
      });
      
      // Wait for animations to settle using newer API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const screenshotPath = join(screenshotsDir, `${template.id}.png`);
      await page.screenshot({
        path: screenshotPath,
        width: 1200,
        height: 800
      });
      
      console.log(`✓ Saved: ${template.name}`);
      successCount++;
    } catch (error) {
      console.error(`✗ Failed: ${template.name}`, error.message);
      failCount++;
    } finally {
      await page.close();
    }
  }
  
  await browser.close();
  console.log(`\nScreenshot generation complete: ${successCount} successful, ${failCount} failed`);
}

generateScreenshots().catch(console.error);
