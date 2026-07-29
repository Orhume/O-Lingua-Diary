import React from 'react';
import { CuteCard } from './CuteCard';
import { Sparkles } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <CuteCard accentColor="cream" className="text-center py-8 px-6 my-4 border-dashed border-zinc-300">
      <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center">
        {icon || <Sparkles size={28} />}
      </div>
      <h3 className="text-base font-bold text-zinc-900 font-sans mb-1">{title}</h3>
      <p className="text-xs text-zinc-500 leading-relaxed max-w-xs mx-auto mb-4">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-black active:scale-95 text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
        >
          {actionLabel}
        </button>
      )}
    </CuteCard>
  );
};
