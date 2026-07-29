import React from 'react';
import { useApp, AppTab } from '../../context/AppContext';
import { Home, PlusCircle, Map, RotateCcw, Library } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const navItems: { tab: AppTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'today', label: 'Today', icon: <Home size={20} /> },
    { tab: 'diary', label: 'New Entry', icon: <PlusCircle size={22} className="stroke-[2.2]" /> },
    { tab: 'pathway', label: 'Pathway', icon: <Map size={20} /> },
    { tab: 'review', label: 'Review', icon: <RotateCcw size={20} /> },
    { tab: 'library', label: 'Library', icon: <Library size={20} /> },
  ];

  // Hide bottom nav in onboarding
  if (activeTab === 'onboarding') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 pb-safe pt-2 px-3">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.tab;
          const isNewEntry = item.tab === 'diary';

          if (isNewEntry) {
            return (
              <button
                key={item.tab}
                onClick={() => setActiveTab('diary')}
                className="flex flex-col items-center justify-center -mt-5 group"
              >
                <div className={`w-12 h-12 rounded-full bg-zinc-900 text-white flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105 group-active:scale-95 ${
                  isActive ? 'ring-4 ring-zinc-300' : ''
                }`}>
                  <PlusCircle size={26} className="stroke-[2.4]" />
                </div>
                <span className="text-[11px] font-semibold text-zinc-900 mt-1">
                  Write Diary
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-150 ${
                isActive
                  ? 'text-zinc-900 font-bold scale-105'
                  : 'text-zinc-400 font-medium hover:text-zinc-700'
              }`}
            >
              <div className={isActive ? 'text-zinc-900' : ''}>{item.icon}</div>
              <span className="text-[11px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
