import React from 'react';

export const TypingIndicator: React.FC = () => (
  <div className="flex items-end gap-2.5 animate-fade-in">
    {/* Avatar */}
    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-accent-blue/20 border border-accent-blue/40 flex items-center justify-center">
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-accent-blue" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 2a6 6 0 100 12A6 6 0 008 2z" />
        <path d="M5.5 9s.833 1.5 2.5 1.5S10.5 9 10.5 9" strokeLinecap="round" />
        <circle cx="6" cy="7" r="0.75" fill="currentColor" stroke="none" />
        <circle cx="10" cy="7" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    </div>

    {/* Bubble */}
    <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-bg-surface border border-bg-border max-w-[80px]">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="inline-block w-1.5 h-1.5 rounded-full bg-text-muted"
            style={{
              animation: 'bounce 1.2s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>

    <style>{`
      @keyframes bounce {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
        30% { transform: translateY(-5px); opacity: 1; }
      }
    `}</style>
  </div>
);
