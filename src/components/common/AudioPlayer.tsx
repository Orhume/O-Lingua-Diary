import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface AudioPlayerProps {
  text: string;
  lang?: string; // 'zh-CN' for Mandarin Chinese
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  text,
  lang = 'zh-CN',
  label = 'Listen',
  size = 'md',
  showLabel = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser environment.');
      return;
    }

    window.speechSynthesis.cancel(); // stop previous speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85; // Slightly slower for clear learning pronunciation

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const buttonSizes = {
    sm: 'p-1.5 text-xs gap-1',
    md: 'px-3 py-1.5 text-xs gap-1.5',
    lg: 'px-4 py-2 text-sm gap-2',
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  return (
    <button
      type="button"
      onClick={handleSpeak}
      className={`inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 ${
        isPlaying
          ? 'bg-zinc-900 text-white shadow-xs scale-105'
          : 'bg-zinc-100 text-zinc-900 border border-zinc-200 hover:bg-zinc-200 active:scale-95'
      } ${buttonSizes[size]}`}
      title={`Listen to "${text}"`}
    >
      {isPlaying ? (
        <Volume2 size={iconSizes[size]} className="animate-pulse" />
      ) : (
        <Volume2 size={iconSizes[size]} />
      )}
      {showLabel && <span>{isPlaying ? 'Speaking...' : label}</span>}
    </button>
  );
};
