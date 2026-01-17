
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import AIResponse from './components/AIResponse';
import TopicDetail from './components/TopicDetail';
import LibraryPage from './components/LibraryPage';
import SidebarMenu from './components/SidebarMenu';
import ScholarsPage from './components/ScholarsPage';
import BackgroundAudio from './components/BackgroundAudio';
import { islamicSearch } from './services/geminiService';
import { SearchResponse, Topic } from './types';
import { topics } from './data/topicsData';

type View = 'home' | 'library' | 'scholars' | 'history' | 'principles' | 'topic';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setSelectedTopic(null);
    try {
      const data = await islamicSearch(query);
      setResult(data);
      setCurrentView('home'); // Ensure we are on home to see the result
      setTimeout(() => {
        const responseEl = document.getElementById('ai-response-anchor');
        responseEl?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError("An unexpected error occurred while seeking knowledge. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const navigateTo = (view: View) => {
    setCurrentView(view);
    setSelectedTopic(null);
    window.scrollTo(0, 0);
  };

  // Render logic for different pages
  let content;
  if (selectedTopic) {
    content = (
      <TopicDetail
        topic={selectedTopic}
        onBack={() => setSelectedTopic(null)}
      />
    );
  } else if (currentView === 'library') {
    content = (
      <LibraryPage onBack={() => navigateTo('home')} />
    );
  } else if (currentView === 'scholars') {
    content = (
      <ScholarsPage onBack={() => navigateTo('home')} />
    );
  } else if (currentView === 'home') {
    content = (
      <main>
        <Hero onSearch={handleSearch} isLoading={loading} />

        <div id="ai-response-anchor" className="pt-2">
          <AIResponse data={result} error={error} />
        </div>

        {/* Education Library Section - Home Preview */}
        <section id="library" className="py-48 px-6 bg-cream">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-32">
              <span className="text-tan font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Foundation of Wisdom</span>
              <h2 className="serif-heading text-5xl md:text-7xl text-charcoal mb-8">Islamic Educational Archive</h2>
              <div className="w-20 h-1 bg-tan/20 mx-auto rounded-full mb-8"></div>
              <p className="text-charcoal/50 max-w-2xl mx-auto font-light leading-relaxed text-lg">
                Explore over 50 deep-dives into the history, laws, and practices of the Muslim world.
              </p>
              <button
                onClick={() => navigateTo('library')}
                className="mt-12 text-tan font-black uppercase tracking-[0.3em] text-[10px] border-b border-tan/30 pb-2 hover:text-charcoal hover:border-charcoal transition-all"
              >
                Browse Backend Library →
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className="group bg-white p-10 rounded-[2.5rem] border border-charcoal/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer flex flex-col justify-between min-h-[400px]"
                >
                  <div>
                    <span className="text-[9px] font-black text-tan uppercase tracking-[0.4em] mb-6 block">{topic.category}</span>
                    <h3 className="serif-heading text-3xl text-charcoal mb-6 leading-tight group-hover:text-tan transition-colors">{topic.title}</h3>
                    <p className="text-charcoal/50 text-sm font-light leading-relaxed line-clamp-3 mb-10">
                      {topic.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-6 border-t border-charcoal/5">
                    <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-charcoal">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal/30">Read Full Article</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Traditional Pillars CTA */}
        <section className="py-40 px-6 bg-charcoal text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="serif-heading text-4xl md:text-5xl text-cream mb-10 leading-tight">Elevate Your Understanding</h2>
            <p className="text-cream/40 mb-12 font-light text-lg max-w-2xl mx-auto italic">
              "Allah will exalt those of you who believe, and those who are given knowledge, in high degrees." (Quran 58:11)
            </p>
            <button className="bg-tan text-white px-14 py-5 rounded-2xl font-bold hover:bg-white hover:text-charcoal transition-all shadow-xl uppercase tracking-widest text-xs">
              Contact Our Scholars
            </button>
          </div>
        </section>
      </main>
    );
  } else {
    // Placeholder for other specific views
    content = (
      <div className="min-h-screen pt-40 flex items-center justify-center">
        <div className="text-center">
          <h2 className="serif-heading text-5xl mb-4 uppercase tracking-widest text-charcoal">Under Preservation</h2>
          <p className="text-tan font-bold tracking-widest">Coming Soon in our Digital Vault</p>
          <button onClick={() => navigateTo('home')} className="mt-8 text-charcoal/30 hover:text-charcoal transition-colors uppercase tracking-[0.4em] text-[10px]">Return to Sanctuary</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-charcoal selection:bg-charcoal selection:text-white overflow-x-hidden">
      <SidebarMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={navigateTo}
      />

      <BackgroundAudio />

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-8 py-6 ${scrolled || currentView !== 'home' ? 'bg-white/95 backdrop-blur-xl shadow-sm py-4 border-b border-charcoal/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`p-2 transition-colors duration-500 ${scrolled || currentView !== 'home' ? 'text-charcoal hover:text-tan' : 'text-white hover:text-tan'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="w-10 h-10 bg-charcoal rounded-xl flex items-center justify-center text-cream shadow-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
                </svg>
              </div>
              <span className={`serif-heading text-2xl font-bold tracking-tight transition-colors duration-500 ${scrolled || currentView !== 'home' ? 'text-charcoal' : 'text-white'}`}>Noor AI</span>
            </div>
          </div>

          <div className={`hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 ${scrolled || currentView !== 'home' ? 'text-charcoal/60' : 'text-white/60'}`}>
            <button onClick={() => navigateTo('library')} className="hover:text-tan transition-colors">Library</button>
            <button onClick={() => navigateTo('scholars')} className="hover:text-tan transition-colors">Scholars</button>
            <button className="bg-charcoal text-white px-8 py-3 rounded-xl hover:bg-black hover:shadow-xl transition-all active:scale-95">
              Support Us
            </button>
          </div>
        </div>
      </nav>

      {content}

      <footer className="bg-cream py-24 px-8 border-t border-charcoal/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-charcoal rounded-lg flex items-center justify-center text-cream">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
              </svg>
            </div>
            <span className="serif-heading text-xl font-bold text-charcoal tracking-tighter">Noor AI</span>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-charcoal/30 flex gap-8">
            <button onClick={() => navigateTo('home')} className="hover:text-charcoal transition-colors">Home</button>
            <button onClick={() => navigateTo('library')} className="hover:text-charcoal transition-colors">Library</button>
            <a href="#" className="hover:text-charcoal transition-colors">Privacy</a>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
