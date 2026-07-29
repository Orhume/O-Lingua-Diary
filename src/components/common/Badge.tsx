import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'pink' | 'amber' | 'emerald' | 'sky' | 'slate';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  size = 'sm',
  icon,
}) => {
  const variants = {
    purple: 'bg-zinc-900 text-white border-zinc-800',
    pink: 'bg-zinc-100 text-zinc-900 border-zinc-200',
    amber: 'bg-zinc-100 text-zinc-800 border-zinc-200',
    emerald: 'bg-zinc-100 text-zinc-900 border-zinc-200',
    sky: 'bg-zinc-100 text-zinc-900 border-zinc-200',
    slate: 'bg-zinc-100 text-zinc-700 border-zinc-200',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-0.5 rounded-full',
    md: 'text-sm px-3 py-1 rounded-full',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium border ${variants[variant]} ${sizes[size]}`}
    >
      {icon}
      {children}
    </span>
  );
};
