
import React from 'react';
import { SearchResponse } from '../types';

interface AIResponseProps {
  data: SearchResponse | null;
  error: string | null;
}

const AIResponse: React.FC<AIResponseProps> = ({ data, error }) => {
  if (error) {
    return (
      <div className="max-w-4xl mx-auto -mt-16 relative z-30 mb-20 px-4">
        <div className="bg-white border-l-4 border-charcoal p-10 rounded-3xl shadow-2xl">
          <p className="text-charcoal/70 font-light text-lg italic">"{error}"</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto -mt-24 relative z-30 mb-40 px-4 animate-[fadeIn_0.8s_ease-out]">
      <div className="bg-white p-10 md:p-20 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(18,38,32,0.15)] border border-charcoal/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 pb-12 border-b border-charcoal/5">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-charcoal rounded-3xl flex items-center justify-center shadow-xl">
              <svg className="w-8 h-8 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 className="serif-heading text-4xl text-charcoal mb-1">Knowledge Given</h3>
              <p className="text-tan text-[9px] font-black uppercase tracking-[0.4em]">Rooted in Tradition</p>
            </div>
          </div>
          
          {!data.isIslamic && (
            <span className="bg-tan/10 text-tan px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-tan/10">
              Guidance Note
            </span>
          )}
        </div>

        <div className="prose prose-xl max-w-none text-charcoal/80 leading-relaxed space-y-12">
          {data.answer.split('\n').map((line, i) => {
            if (!line.trim()) return null;
            const hasArabic = /[\u0600-\u06FF]/.test(line);
            
            return (
              <div 
                key={i} 
                className={`${hasArabic ? 'bg-cream p-10 md:p-14 rounded-[2.5rem] border border-charcoal/5 text-right' : ''}`}
                dir={hasArabic ? 'rtl' : 'ltr'}
              >
                <p className={`${hasArabic ? 'font-serif text-4xl md:text-5xl leading-[1.8] text-charcoal mb-4' : 'font-light'}`}>
                  {line}
                </p>
                {hasArabic && <div className="w-12 h-0.5 bg-tan/30 mr-0 ml-auto mt-8 rounded-full"></div>}
              </div>
            );
          })}
        </div>

        {data.sources.length > 0 && (
          <div className="mt-24 pt-12 border-t border-charcoal/5">
            <p className="text-[10px] font-black text-charcoal/30 uppercase tracking-[0.5em] mb-10 text-center">Reference Sources</p>
            <div className="flex flex-wrap justify-center gap-4">
              {data.sources.map((source, idx) => (
                <a
                  key={idx}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cream text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5 px-8 py-4 rounded-2xl text-[11px] font-bold tracking-widest transition-all border border-charcoal/5 shadow-sm"
                >
                  {source.title.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AIResponse;
