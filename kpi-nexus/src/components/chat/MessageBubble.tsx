import React, { useState } from 'react';
import { Copy, Check, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';
import { MarkdownRenderer } from './MarkdownRenderer';
import type { ChatMessage } from '../../types/chat';

interface Props {
  message: ChatMessage;
  isLatest?: boolean;
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const TREND_ICON = {
  up:      <TrendingUp size={11} className="text-accent-green" />,
  down:    <TrendingDown size={11} className="text-accent-red" />,
  neutral: <Minus size={11} className="text-text-muted" />,
};

const TREND_VAL_COLOR = {
  up:      'text-accent-green',
  down:    'text-accent-red',
  neutral: 'text-text-primary',
};

export const MessageBubble: React.FC<Props> = ({ message, isLatest }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isUser) {
    return (
      <div className="flex justify-end gap-2.5 group animate-fade-in">
        <div className="flex flex-col items-end gap-1 max-w-[75%]">
          <div className="px-4 py-2.5 rounded-2xl rounded-br-sm bg-accent-blue text-white text-sm leading-relaxed shadow-sm">
            {message.content}
          </div>
          <span className="text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
            {formatTime(message.timestamp)}
          </span>
        </div>
        {/* User avatar */}
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-accent-blue/25 border border-accent-blue/40 flex items-center justify-center self-end">
          <span className="text-[10px] font-bold text-accent-blue">C</span>
        </div>
      </div>
    );
  }

  // ── Assistant bubble ─────────────────────────────────────────
  return (
    <div className="flex items-end gap-2.5 group animate-fade-in">
      {/* AI avatar */}
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-accent-blue/20 border border-accent-blue/40 flex items-center justify-center self-end">
        <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-accent-blue" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 2a6 6 0 100 12A6 6 0 008 2z" />
          <path d="M5.5 9s.833 1.5 2.5 1.5S10.5 9 10.5 9" strokeLinecap="round" />
          <circle cx="6" cy="7" r="0.75" fill="currentColor" stroke="none" />
          <circle cx="10" cy="7" r="0.75" fill="currentColor" stroke="none" />
        </svg>
      </div>

      <div className={cn('flex flex-col gap-2 max-w-[80%]', isLatest && 'max-w-[85%]')}>
        {/* Main bubble */}
        <div className="relative px-4 py-3.5 rounded-2xl rounded-bl-sm bg-bg-surface border border-bg-border shadow-card">
          {message.status === 'error' ? (
            <p className="text-accent-red text-sm">{message.content}</p>
          ) : (
            <MarkdownRenderer content={message.content} />
          )}

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-bg-elevated text-text-muted hover:text-text-secondary"
            title="Copy message"
          >
            {copied
              ? <Check size={12} className="text-accent-green" />
              : <Copy size={12} />
            }
          </button>
        </div>

        {/* Data card */}
        {message.dataCard && (
          <div className="rounded-xl border border-bg-border bg-bg-elevated overflow-hidden animate-fade-in">
            <div className="px-4 py-2 border-b border-bg-border">
              <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wide">
                {message.dataCard.title}
              </p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-y divide-bg-border">
              {message.dataCard.items.map((item, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'px-3.5 py-2.5 flex flex-col gap-0.5',
                    item.highlight && 'bg-accent-blue/5'
                  )}
                >
                  <div className="flex items-center gap-1">
                    {item.trend && TREND_ICON[item.trend]}
                    <span className={cn(
                      'text-xs font-semibold',
                      item.highlight ? 'text-text-primary' : TREND_VAL_COLOR[item.trend ?? 'neutral']
                    )}>
                      {item.value}
                    </span>
                  </div>
                  <span className="text-[10px] text-text-muted leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timestamp */}
        <span className="text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity self-start">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
};
