import React from 'react';

interface CuteCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  accentColor?: 'purple' | 'pink' | 'yellow' | 'blue' | 'green' | 'cream' | 'white';
  id?: string;
}

export const CuteCard: React.FC<CuteCardProps> = ({
  children,
  className = '',
  onClick,
  accentColor = 'white',
  id,
}) => {
  const colorMap = {
    white: 'bg-white border-zinc-200 shadow-xs text-zinc-900',
    cream: 'bg-zinc-50 border-zinc-200 shadow-xs text-zinc-900',
    purple: 'bg-zinc-900 border-zinc-800 text-white shadow-sm',
    pink: 'bg-zinc-100 border-zinc-200 text-zinc-900',
    yellow: 'bg-zinc-50 border-zinc-300 text-zinc-900',
    blue: 'bg-zinc-50 border-zinc-200 text-zinc-900',
    green: 'bg-zinc-100 border-zinc-200 text-zinc-900',
  };

  return (
    <div
      id={id}
      onClick={onClick}
      className={`rounded-2xl border p-4 transition-all duration-200 ${colorMap[accentColor]} ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md active:translate-y-0' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
