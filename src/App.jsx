import React, { useState, useMemo } from 'react';
import { Search, LayoutGrid, Sparkles, Code2, Globe, Layers } from 'lucide-react';
import templates from './templates';
import OsmoImageToBackgroundZoom from './image-to-background-zoom.jsx';
import { ErosionPreview } from './Erosion.jsx';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showHero, setShowHero] = useState(true);
  const [fadeToBlack, setFadeToBlack] = useState(false);
  const [showMain, setShowMain] = useState(false);

  const categories = [
    { id: 'all', name: 'All Templates', icon: LayoutGrid },
    { id: 'landing', name: 'Landing Pages', icon: Globe },
    { id: 'hero', name: 'Hero Sections', icon: Sparkles },
    { id: 'data', name: 'Data Visualizations', icon: Code2 },
    { id: 'interactive', name: 'Interactive', icon: Layers },
  ];

  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const openTemplate = (template) => {
    setSelectedTemplate(template);
  };

  const closeTemplate = () => {
    setSelectedTemplate(null);
  };

  const handleEnter = () => {
    // Start fade to black after 3 seconds
    setTimeout(() => {
      setFadeToBlack(true);
      // Fade to black takes 1 second
      setTimeout(() => {
        setShowHero(false);
        setShowMain(true);
        // Fade in main content takes 1 second
        setTimeout(() => {
          setFadeToBlack(false);
        }, 1000);
      }, 1000);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      {showHero && (
        <ErosionPreview onEnter={handleEnter} />
      )}

      {/* Fade to Black Overlay */}
      {fadeToBlack && (
        <div 
          className="fixed inset-0 bg-black z-50"
          style={{
            animation: 'fadeIn 1s ease-in-out forwards'
          }}
        />
      )}

      {/* Main Content */}
      {showMain && (
        <div 
          className="min-h-screen bg-bg"
          style={{
            opacity: fadeToBlack ? 0 : 1,
            transition: 'opacity 1s ease-in-out'
          }}
        >
          {/* Header */}
          <header className="border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-textDark mb-2" style={{ letterSpacing: '-2px' }}>Template Showcase</h1>
              <p className="text-textMuted text-lg">
                Explore 46 beautiful GSAP animation templates
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-textMuted">
              <Sparkles className="w-5 h-5" />
              <span>Powered by GSAP</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textMuted" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border-3 border-white/60 rounded-2xl text-textDark placeholder:text-textMuted focus:outline-none shadow-clay focus:shadow-clay-hover transition-all"
              style={{ border: '3px solid rgba(255, 255, 255, 0.6)' }}
            />
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all ${
                  selectedCategory === category.id
                    ? 'bg-clayDark text-white shadow-clay'
                    : 'bg-white/50 text-textMuted hover:bg-white/70 shadow-clay'
                }`}
                style={{ border: '3px solid rgba(255, 255, 255, 0.6)' }}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Template Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <OsmoImageToBackgroundZoom
          images={filteredTemplates.map(t => ({ src: t.screenshot, title: t.name, template: t }))}
          duration={0.6}
          onImageClick={(image) => openTemplate(image.template)}
          onClose={closeTemplate}
          className="min-h-[600px]"
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-textMuted text-sm">
              Templates sourced from CodePen by OSINT619
            </p>
            <p className="text-textMuted text-sm">
              Built with React, Tailwind CSS, and GSAP
            </p>
          </div>
        </div>
      </footer>
        </div>
      )}
    </div>
  );
}

export default App;
