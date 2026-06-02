import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const templates = [
  {
    id: 47,
    name: 'Structural Scrolling',
    folder: 'Structural-scrolling'
  },
  {
    id: 48,
    name: 'Responsive GSAP Slider with Button Wave Effect',
    folder: 'responsive-gsap-slider-with-button-wave-effect'
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

    // Try multiple folder structures
    let templatePath = join(__dirname, 'public', 'templates', template.folder, 'index.html');

    if (!fs.existsSync(templatePath)) {
      // Try nested structure: template-folder/template-folder/dist
      templatePath = join(__dirname, '..', template.folder, template.folder, 'dist', 'index.html');
    }

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
