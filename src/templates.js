const templates = [
  {
    id: 1,
    name: 'Bold Modern Landing Page',
    description: 'Bold and modern landing page design with GSAP animations',
    category: 'landing',
    folder: 'bold-modern-landing-page-gsap',
    screenshot: '/screenshots/1.png'
  },
  {
    id: 2,
    name: 'Data Columns Floating',
    description: 'Floating data columns with smooth animation effects',
    category: 'data',
    folder: 'data-columns-floating',
    screenshot: '/screenshots/2.png'
  },
  {
    id: 3,
    name: 'Data Columns Floating (1)',
    description: 'Floating data columns variant with animation effects',
    category: 'data',
    folder: 'data-columns-floating (1)',
    screenshot: '/screenshots/3.png'
  },
  {
    id: 4,
    name: 'Data Columns Floating Interactive',
    description: 'Interactive floating data columns with user engagement',
    category: 'data',
    folder: 'data-columns-floating-interactive',
    screenshot: '/screenshots/4.png'
  },
  {
    id: 5,
    name: 'Data Icons Float GSAP',
    description: 'Floating data icons with GSAP animation effects',
    category: 'data',
    folder: 'data-icons-float-gsap',
    screenshot: '/screenshots/5.png'
  },
  {
    id: 6,
    name: 'Data Icons Landing Page',
    description: 'Landing page featuring animated data icons',
    category: 'landing',
    folder: 'data-icons-landing-page-gsap',
    screenshot: '/screenshots/6.png'
  },
  {
    id: 7,
    name: 'Data Icons Landing Page (1)',
    description: 'Data icons landing page variant',
    category: 'landing',
    folder: 'data-icons-landing-page-gsap (1)',
    screenshot: '/screenshots/7.png'
  },
  {
    id: 8,
    name: 'Data Landing Page GSAP',
    description: 'Data-focused landing page with smooth animations',
    category: 'landing',
    folder: 'data-landing-page-gsap',
    screenshot: '/screenshots/8.png'
  },
  {
    id: 9,
    name: 'Data Landing Page GSAP (1)',
    description: 'Data landing page variant',
    category: 'landing',
    folder: 'data-landing-page-gsap (1)',
    screenshot: '/screenshots/9.png'
  },
  {
    id: 10,
    name: 'Floating Icons Hero Section',
    description: 'Hero section with floating animated icons',
    category: 'hero',
    folder: 'floating-icons-hero-section-gsap',
    screenshot: '/screenshots/10.png'
  },
  {
    id: 11,
    name: 'Hero Capturing Moments Gallery',
    description: 'Gallery carousel hero section for capturing moments',
    category: 'hero',
    folder: 'hero-capturing-moments-gallery-carousel-gsap',
    screenshot: '/screenshots/11.png'
  },
  {
    id: 12,
    name: 'Hero Data Section Floating',
    description: 'Hero section with floating data visualization elements',
    category: 'hero',
    folder: 'hero-data-section-floating-data-gsap',
    screenshot: '/screenshots/12.png'
  },
  {
    id: 13,
    name: 'Hero Section',
    description: 'Clean hero section with minimal design',
    category: 'hero',
    folder: 'hero-section',
    screenshot: '/screenshots/13.png'
  },
  {
    id: 14,
    name: 'Hero Section Data GSAP',
    description: 'Data-driven hero section with GSAP animations',
    category: 'hero',
    folder: 'hero-section-data-gsap',
    screenshot: '/screenshots/14.png'
  },
  {
    id: 15,
    name: 'Hero Section Floating Elements',
    description: 'Hero section with floating animated elements',
    category: 'hero',
    folder: 'hero-section-floating-elements-gsap',
    screenshot: '/screenshots/15.png'
  },
  {
    id: 16,
    name: 'Hero Section GSAP',
    description: 'Animated hero section with engaging entrance animations',
    category: 'hero',
    folder: 'hero-section-gsap',
    screenshot: '/screenshots/16.png'
  },
  {
    id: 17,
    name: 'Hero Section GSAP (1)',
    description: 'Hero section variant with GSAP animations',
    category: 'hero',
    folder: 'hero-section-gsap (1)',
    screenshot: '/screenshots/17.png'
  },
  {
    id: 18,
    name: 'Hero Section GSAP (2)',
    description: 'Hero section variant 2 with GSAP animations',
    category: 'hero',
    folder: 'hero-section-gsap (2)',
    screenshot: '/screenshots/18.png'
  },
  {
    id: 19,
    name: 'Hero Section GSAP Carousel',
    description: 'Carousel-based hero section with GSAP animations',
    category: 'hero',
    folder: 'hero-section-gsap-carousel',
    screenshot: '/screenshots/19.png'
  },
  {
    id: 20,
    name: 'Hero Section GSAP Carousel (1)',
    description: 'Hero section carousel variant',
    category: 'hero',
    folder: 'hero-section-gsap-carousel (1)',
    screenshot: '/screenshots/20.png'
  },
  {
    id: 21,
    name: 'Hero Section GSAP Carousel (2)',
    description: 'Hero section carousel variant 2',
    category: 'hero',
    folder: 'hero-section-gsap-carousel (2)',
    screenshot: '/screenshots/21.png'
  },
  {
    id: 22,
    name: 'Hero Section GSAP Gallery',
    description: 'Gallery-based hero section with smooth transitions',
    category: 'hero',
    folder: 'hero-section-gsap-gallery-carousel',
    screenshot: '/screenshots/22.png'
  },
  {
    id: 23,
    name: 'Hero Section Join Newsletter',
    description: 'Hero section with newsletter signup functionality',
    category: 'hero',
    folder: 'hero-section-join-newsletter-gsap',
    screenshot: '/screenshots/23.png'
  },
  {
    id: 24,
    name: 'Hero Section Join Newsletter (1)',
    description: 'Hero section newsletter variant',
    category: 'hero',
    folder: 'hero-section-join-newsletter-gsap (1)',
    screenshot: '/screenshots/24.png'
  },
  {
    id: 25,
    name: 'Hero Section Scroll',
    description: 'Scroll-driven hero section animations',
    category: 'hero',
    folder: 'hero-section-scroll-gsap',
    screenshot: '/screenshots/25.png'
  },
  {
    id: 26,
    name: 'Interactive Node Flowchart',
    description: 'Interactive flowchart with animated node connections',
    category: 'interactive',
    folder: 'interactive-node-flowchart-gsap',
    screenshot: '/screenshots/26.png'
  },
  {
    id: 27,
    name: 'Landing Page Bento GSAP',
    description: 'Bento grid layout landing page with animations',
    category: 'landing',
    folder: 'landing-page-bento-gsap',
    screenshot: '/screenshots/27.png'
  },
  {
    id: 28,
    name: 'Landing Page Gallery Carousel',
    description: 'Landing page with gallery carousel feature',
    category: 'landing',
    folder: 'landing-page-gallery-carousel-gsap',
    screenshot: '/screenshots/28.png'
  },
  {
    id: 29,
    name: 'Landing Page GSAP',
    description: 'A modern landing page with smooth GSAP animations and transitions',
    category: 'landing',
    folder: 'landing-page-gsap',
    screenshot: '/screenshots/29.png'
  },
  {
    id: 30,
    name: 'Landing Page GSAP (1)',
    description: 'Landing page variant with GSAP animations',
    category: 'landing',
    folder: 'landing-page-gsap (1)',
    screenshot: '/screenshots/30.png'
  },
  {
    id: 31,
    name: 'Landing Page GSAP (2)',
    description: 'Landing page variant 2 with GSAP animations',
    category: 'landing',
    folder: 'landing-page-gsap (2)',
    screenshot: '/screenshots/31.png'
  },
  {
    id: 32,
    name: 'Landing Page GSAP (3)',
    description: 'Landing page variant 3 with GSAP animations',
    category: 'landing',
    folder: 'landing-page-gsap (3)',
    screenshot: '/screenshots/32.png'
  },
  {
    id: 33,
    name: 'Landing Page GSAP Carousel Gallery',
    description: 'Landing page with carousel and gallery features',
    category: 'landing',
    folder: 'landing-page-gsap-carousel-gallery',
    screenshot: '/screenshots/33.png'
  },
  {
    id: 34,
    name: 'Landing Page Hero Bento Stats',
    description: 'Landing page with bento grid and statistics',
    category: 'landing',
    folder: 'landing-page-hero-section-bento-stats-gsap',
    screenshot: '/screenshots/34.png'
  },
  {
    id: 35,
    name: 'Landing Page Hero Bento Stats (1)',
    description: 'Landing page bento stats variant',
    category: 'landing',
    folder: 'landing-page-hero-section-bento-stats-gsap (1)',
    screenshot: '/screenshots/35.png'
  },
  {
    id: 36,
    name: 'Landing Page Hero Section',
    description: 'Hero section landing page with animations',
    category: 'landing',
    folder: 'landing-page-hero-section-gsap',
    screenshot: '/screenshots/36.png'
  },
  {
    id: 37,
    name: 'Medical Biology Hero Section',
    description: 'Medical/biology themed hero section',
    category: 'hero',
    folder: 'medical-biology-hero-section-gsap',
    screenshot: '/screenshots/37.png'
  },
  {
    id: 38,
    name: 'Modern Landing Page GSAP',
    description: 'Modern landing page with contemporary design',
    category: 'landing',
    folder: 'modern-landing-page-gsap',
    screenshot: '/screenshots/38.png'
  },
  {
    id: 39,
    name: 'Product Page GSAP',
    description: 'Product showcase page with GSAP animations',
    category: 'landing',
    folder: 'product-page-gsap',
    screenshot: '/screenshots/39.png'
  },
  {
    id: 40,
    name: 'Scroll Driven Text Blow Out',
    description: 'Scroll-driven text animation with CSS and GSAP',
    category: 'interactive',
    folder: 'scroll-driven-text-blow-out-with-gsap-css',
    screenshot: '/screenshots/40.png'
  },
  {
    id: 41,
    name: 'Search Landing Page GSAP',
    description: 'Search-focused landing page with animations',
    category: 'landing',
    folder: 'search-landing-page-gsap',
    screenshot: '/screenshots/41.png'
  },
  {
    id: 42,
    name: 'UI Kit Style Guide Generator',
    description: 'UI kit and style guide generator tool',
    category: 'interactive',
    folder: 'ui-kit-and-style-guide-generator-built-with-html-css-and-javascript',
    screenshot: '/screenshots/42.png'
  },
  {
    id: 43,
    name: 'Silk BG 1',
    description: 'Silk background animation template',
    category: 'hero',
    folder: 'silkbg1',
    screenshot: '/screenshots/43.png'
  },
  {
    id: 44,
    name: 'Silk BG 2',
    description: 'Silk background animation variant',
    category: 'hero',
    folder: 'silkbg2',
    screenshot: '/screenshots/44.png'
  },
  {
    id: 45,
    name: 'Landing Page Data Cards GSAP',
    description: 'Landing page with data cards using GSAP animations',
    category: 'landing',
    folder: 'landing-page-data-cards-gsap',
    screenshot: '/screenshots/45.png'
  },
  {
    id: 46,
    name: 'Bento Grid GSAP',
    description: 'Bento grid layout with GSAP animations',
    category: 'landing',
    folder: 'bento-grid-gsap',
    screenshot: '/screenshots/46.png'
  }
];

export default templates;
