import React from 'react';
import { scholars } from '../data/scholarsData';

interface ScholarsPageProps {
    onBack: () => void;
}

const ScholarsPage: React.FC<ScholarsPageProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 animate-[fadeIn_0.5s_ease-out]">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-20 text-center">
                    <button
                        onClick={onBack}
                        className="mb-12 text-tan font-black uppercase tracking-[0.3em] text-[10px] border-b border-tan/30 pb-2 hover:text-charcoal hover:border-charcoal transition-all"
                    >
                        ← Return to Sanctuary
                    </button>
                    <span className="text-tan font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Keepers of Knowledge</span>
                    <h2 className="serif-heading text-5xl md:text-7xl text-charcoal mb-8">Luminaries of Light</h2>
                    <div className="w-20 h-1 bg-tan/20 mx-auto rounded-full mb-8"></div>
                    <p className="text-charcoal/50 max-w-2xl mx-auto font-light leading-relaxed text-lg">
                        "The scholars are the heirs of the Prophets." (Abu Dawud)
                    </p>
                </div>

                {/* Grid Section */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {scholars.map((scholar) => (
                        <div
                            key={scholar.id}
                            className="group bg-white p-10 rounded-[2.5rem] border border-charcoal/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer flex flex-col justify-between"
                        >
                            <div>
                                <span className="text-[9px] font-black text-tan uppercase tracking-[0.4em] mb-4 block">{scholar.era}</span>
                                <h3 className="serif-heading text-3xl text-charcoal mb-2 leading-tight group-hover:text-tan transition-colors">{scholar.name}</h3>
                                <p className="text-charcoal/40 text-xs font-bold uppercase tracking-widest mb-8">{scholar.title}</p>
                                <div className="w-12 h-0.5 bg-tan/20 mb-8 rounded-full"></div>

                                <p className="text-charcoal/50 text-sm font-light leading-relaxed mb-10">
                                    {scholar.description}
                                </p>

                                <div className="space-y-3">
                                    {scholar.contributions.map((contribution, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-tan/40 mt-1.5 shrink-0"></div>
                                            <p className="text-charcoal/60 text-xs leading-relaxed">{contribution}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScholarsPage;
