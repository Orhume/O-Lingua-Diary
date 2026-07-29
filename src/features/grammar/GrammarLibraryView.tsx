import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CuteCard } from '../../components/common/CuteCard';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { Search, Trash2, Sparkles, ChevronRight, Layers } from 'lucide-react';

export const GrammarLibraryView: React.FC = () => {
  const { savedGrammar, removeGrammar, setSelectedGrammar, setActiveTab } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGrammar = savedGrammar.filter(g =>
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.structure.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.shortExplanation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-24 pt-2 px-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-stone-800 font-display flex items-center gap-1.5">
            Grammar Library 📚
          </h2>
          <p className="text-xs text-stone-500">Sentence structures discovered from your diary</p>
        </div>
        <Badge variant="sky">
          {savedGrammar.length} Notes
        </Badge>
      </div>

      {/* Search */}
      <CuteCard accentColor="cream" className="p-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search grammar patterns or formulas..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-amber-200 bg-white text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </CuteCard>

      {/* Grammar Cards List */}
      {filteredGrammar.length === 0 ? (
        <EmptyState
          icon={<Layers size={28} />}
          title="No grammar notes saved yet"
          description={
            searchQuery
              ? "No grammar patterns match your search filter."
              : "Your grammar notes will appear as you discover patterns from your diary entries."
          }
          actionLabel="Write Diary Entry"
          onAction={() => setActiveTab('diary')}
        />
      ) : (
        <div className="space-y-2.5">
          {filteredGrammar.map((point) => (
            <CuteCard
              key={point.id}
              accentColor="white"
              onClick={() => {
                setSelectedGrammar(point);
                setActiveTab('grammar-detail');
              }}
              className="hover:border-sky-300 transition-colors cursor-pointer border-sky-100"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-stone-900 font-display">
                    {point.title}
                  </h3>
                  <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md inline-block mt-1">
                    {point.structure}
                  </span>
                  <p className="text-xs text-stone-600 mt-1.5 line-clamp-2">
                    {point.shortExplanation}
                  </p>
                </div>

                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => removeGrammar(point.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove point"
                  >
                    <Trash2 size={14} />
                  </button>
                  <ChevronRight size={16} className="text-stone-400" />
                </div>
              </div>
            </CuteCard>
          ))}
        </div>
      )}
    </div>
  );
};
