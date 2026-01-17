
import React from 'react';

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: 'home' | 'library' | 'scholars' | 'history' | 'principles') => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  const menuItems = [
    { name: 'Home', id: 'home' as const },
    { name: 'Library', id: 'library' as const },
    { name: 'Scholars', id: 'scholars' as const },
    { name: 'History', id: 'history' as const },
    { name: 'Principles', id: 'principles' as const },
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 bottom-0 w-80 bg-charcoal z-[70] transition-transform duration-500 ease-out shadow-2xl p-12 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-24">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-tan rounded-lg flex items-center justify-center text-charcoal">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
              </svg>
            </div>
            <span className="serif-heading text-xl font-bold text-cream tracking-tighter">Noor AI</span>
          </div>
          <button onClick={onClose} className="text-cream/40 hover:text-cream transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-10">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
              className="text-left group flex flex-col"
            >
              <span className="text-tan text-[9px] font-black uppercase tracking-[0.5em] mb-2 opacity-0 group-hover:opacity-100 transition-all">Select</span>
              <span className="serif-heading text-4xl text-cream/70 group-hover:text-white group-hover:translate-x-4 transition-all duration-300">
                {item.name}
              </span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-12 border-t border-white/5">
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] leading-relaxed">
            Preserving the light of Islamic tradition for the digital age.
          </p>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
