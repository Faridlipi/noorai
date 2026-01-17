
import React, { useState } from 'react';
import { libraryItems } from '../data/libraryData';
import { LibraryItem } from '../types';

interface LibraryPageProps {
  onBack: () => void;
}

const LibraryPage: React.FC<LibraryPageProps> = ({ onBack }) => {
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);

  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation Padding */}
      <div className="h-24"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-20">
        <button 
          onClick={selectedItem ? () => setSelectedItem(null) : onBack}
          className="group flex items-center gap-3 text-charcoal/40 hover:text-charcoal transition-colors mb-12 uppercase tracking-[0.3em] text-[10px] font-bold"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {selectedItem ? 'Back to Library Index' : 'Back to Home'}
        </button>

        {!selectedItem ? (
          <div>
            <div className="mb-20">
              <span className="text-tan font-black uppercase tracking-[0.5em] text-[10px] block mb-4">Digital Archive</span>
              <h1 className="serif-heading text-6xl md:text-7xl text-charcoal mb-8">Islamic Library</h1>
              <p className="text-charcoal/50 max-w-2xl font-light text-lg">
                A curated selection of classical and contemporary Islamic literature, accessible for the modern seeker.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {libraryItems.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="bg-white p-12 rounded-[2.5rem] border border-charcoal/5 shadow-sm hover:shadow-2xl transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-8">
                    <span className="bg-cream px-4 py-2 rounded-lg text-[9px] font-bold text-tan uppercase tracking-widest">{item.category}</span>
                    <span className="text-[9px] font-bold text-charcoal/20 uppercase tracking-widest">{item.dateAdded}</span>
                  </div>
                  <h3 className="serif-heading text-3xl text-charcoal mb-4 group-hover:text-tan transition-colors">{item.title}</h3>
                  <p className="text-tan text-sm mb-6 font-medium tracking-wide">by {item.author}</p>
                  <p className="text-charcoal/50 font-light leading-relaxed line-clamp-2">{item.description}</p>
                  <div className="mt-10 pt-8 border-t border-charcoal/5 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-charcoal/30 group-hover:text-charcoal transition-colors">Open Manuscript</span>
                    <svg className="w-5 h-5 text-tan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white p-12 md:p-24 rounded-[4rem] shadow-2xl border border-charcoal/5 animate-[fadeIn_0.5s_ease-out]">
            <div className="max-w-3xl mx-auto">
              <span className="text-tan font-black uppercase tracking-[0.5em] text-[10px] block mb-6">{selectedItem.category}</span>
              <h2 className="serif-heading text-5xl md:text-7xl text-charcoal mb-4 leading-tight">{selectedItem.title}</h2>
              <p className="text-charcoal/40 text-xl font-light italic mb-12">Author: {selectedItem.author}</p>
              <div className="w-32 h-1 bg-tan/20 mb-16 rounded-full"></div>
              
              <div className="prose prose-xl max-w-none text-charcoal/70 leading-relaxed font-light space-y-10">
                {selectedItem.fullText.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              
              <div className="mt-24 p-12 bg-cream rounded-3xl border border-charcoal/5">
                <h4 className="serif-heading text-2xl text-charcoal mb-4">Bibliographic Note</h4>
                <p className="text-charcoal/50 text-sm leading-relaxed">
                  This text is part of the Noor AI Digital Preservation project. We strive to provide accurate transcriptions of the original manuscripts.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LibraryPage;
