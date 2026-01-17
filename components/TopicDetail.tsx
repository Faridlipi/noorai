
import React from 'react';
import { Topic } from '../types';

interface TopicDetailProps {
  topic: Topic;
  onBack: () => void;
}

const TopicDetail: React.FC<TopicDetailProps> = ({ topic, onBack }) => {
  return (
    <div className="min-h-screen bg-cream py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 text-charcoal/40 hover:text-charcoal transition-colors mb-16 uppercase tracking-[0.3em] text-[10px] font-bold"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Library
        </button>

        <article className="bg-white rounded-[3rem] p-10 md:p-20 shadow-2xl border border-charcoal/5">
          <span className="text-tan font-black uppercase tracking-[0.4em] text-[10px] mb-8 block">{topic.category}</span>
          <h1 className="serif-heading text-5xl md:text-7xl text-charcoal mb-12 leading-tight">{topic.title}</h1>
          
          <div className="w-24 h-1 bg-tan/20 mb-16 rounded-full"></div>

          <div className="prose prose-xl max-w-none text-charcoal/80 space-y-12 mb-24">
            {topic.content.split('\n').map((para, i) => (
              <p key={i} className="leading-relaxed font-light">{para}</p>
            ))}
          </div>

          <section className="grid md:grid-cols-2 gap-12 mb-24">
            <div className="bg-cream p-10 rounded-[2.5rem] border border-charcoal/5">
              <h3 className="serif-heading text-2xl text-charcoal mb-6">Historical Context</h3>
              <p className="text-charcoal/60 leading-relaxed font-light">{topic.historicalContext}</p>
            </div>
            <div className="bg-charcoal p-10 rounded-[2.5rem] text-cream">
              <h3 className="serif-heading text-2xl mb-6">World Comparison</h3>
              <p className="text-cream/60 leading-relaxed font-light">{topic.comparison}</p>
            </div>
          </section>

          <section className="border-t border-charcoal/5 pt-20">
            <h3 className="serif-heading text-3xl text-charcoal mb-12 text-center">Frequently Asked Questions</h3>
            <div className="space-y-8">
              {topic.faqs.map((faq, i) => (
                <div key={i} className="bg-cream/50 p-8 rounded-2xl border border-charcoal/5">
                  <h4 className="font-bold text-charcoal mb-4 flex gap-4">
                    <span className="text-tan italic">Q.</span> {faq.question}
                  </h4>
                  <p className="text-charcoal/60 font-light pl-8 border-l border-tan/20">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-20 pt-10 border-t border-charcoal/5">
            <div className="bg-tan/5 p-6 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 bg-charcoal rounded-lg flex items-center justify-center text-tan">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-[10px] text-charcoal/40 font-bold uppercase tracking-widest italic">
                AI Prompt Visualization Suggestion: {topic.imagePrompt}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default TopicDetail;
