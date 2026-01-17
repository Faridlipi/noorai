
import React, { useState } from 'react';
import Galaxy from './Galaxy';
import Lightning from './Lightning';

interface HeroProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const Hero: React.FC<HeroProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <section className="relative pt-48 pb-32 px-6 overflow-hidden min-h-[90vh] flex items-center justify-center">
      {/* Premium Dynamic Background (Space/Nature Feeling) */}
      <div className="absolute inset-0 bg-[#122620] z-0">
        {/* Blue Lightning Beam */}
        <Lightning
          hue={210}
          xOffset={0.2}
          speed={0.4}
          intensity={0.6}
          size={0.6}
          className="opacity-70"
        />
        
        {/* Cosmic Galaxy overlay */}
        <Galaxy 
          density={1.5}
          glowIntensity={0.5}
          hueShift={200}
          saturation={0.3}
          speed={0.2}
          mouseInteraction={true}
        />
        
        {/* Golden Lightning Beam */}
        <Lightning
          hue={40}
          xOffset={-0.4}
          speed={0.2}
          intensity={0.4}
          size={1.2}
          className="opacity-40 mix-blend-screen"
        />

        {/* Fade to page transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#122620]/20 via-transparent to-[#F9F7F2]"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
        <div className="mb-10 inline-block">
          <span className="text-white/20 font-bold tracking-[0.5em] uppercase text-[9px] border border-white/10 px-8 py-3 rounded-full backdrop-blur-sm">
            A Sanctuary for Islamic Learning
          </span>
        </div>
        
        <h1 className="serif-heading text-7xl md:text-9xl text-white mb-10 leading-tight drop-shadow-2xl">
          Noor <span className="text-tan italic italic-serif font-light opacity-90">AI</span>
        </h1>
        
        <div className="mb-16 max-w-2xl mx-auto flex flex-col items-center gap-6 animate-[fadeIn_1.2s_ease-out]">
          <p className="text-white/30 font-serif text-3xl md:text-5xl italic tracking-wide" dir="rtl">
            إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ
          </p>
          <div className="flex flex-col items-center">
            <p className="text-white/60 text-xl md:text-2xl font-light leading-relaxed italic mb-4">
              "Verily, Allah is beautiful and He loves beauty."
            </p>
            <span className="text-tan/80 text-[10px] uppercase tracking-[0.3em] font-black">
              — Prophet Muhammad (Sallallahu alayhi wa sallam)
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
          <div className="relative group">
            {/* Dark Search Bar Container matching the screenshot */}
            <div className="relative bg-[#0d1a16]/90 backdrop-blur-2xl border border-white/5 p-2 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about Islam, History, or Quran..."
                className="w-full bg-transparent text-white py-6 px-10 pr-48 focus:outline-none text-lg placeholder:text-white/10"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-4 top-4 bottom-4 bg-[#1a2e28] border border-tan/20 text-tan px-8 rounded-2xl font-black hover:bg-black hover:text-white transition-all flex items-center gap-3 disabled:opacity-50 active:scale-95 uppercase tracking-[0.2em] text-[10px]"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-tan/30 border-t-tan rounded-full animate-spin"></div>
                ) : (
                  <>
                    Search
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
