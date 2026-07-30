import React from 'react';
import { MessageSquare, Plus, Trash2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { ChatSession } from '../../types/chat';

interface Props {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
}

function formatRelative(d: Date): string {
  const diffMs = Date.now() - d.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export const ChatHistorySidebar: React.FC<Props> = ({
  sessions, activeSessionId, onSelect, onNew, onDelete,
}) => (
  <aside className="w-56 flex-shrink-0 flex flex-col border-r border-bg-border bg-bg-surface h-full">
    {/* Header */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-bg-border">
      <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">History</span>
      <button
        onClick={onNew}
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-accent-blue/15 hover:bg-accent-blue/25 text-accent-blue border border-accent-blue/30 transition-all"
        title="New conversation"
      >
        <Plus size={11} />
        New
      </button>
    </div>

    {/* Sessions list */}
    <div className="flex-1 overflow-y-auto py-1.5 space-y-0.5">
      {sessions.length === 0 && (
        <p className="text-center text-[11px] text-text-muted py-6 px-3">
          No previous conversations
        </p>
      )}
      {sessions.map((s) => (
        <div
          key={s.id}
          className={cn(
            'group relative flex items-start gap-2.5 mx-1.5 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150',
            s.id === activeSessionId
              ? 'bg-bg-elevated text-text-primary'
              : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
          )}
          onClick={() => onSelect(s.id)}
        >
          {s.id === activeSessionId && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 bg-accent-blue rounded-full" />
          )}
          <MessageSquare size={13} className="flex-shrink-0 mt-0.5 text-text-muted" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium leading-tight truncate">{s.title}</p>
            <p className="text-[10px] text-text-muted mt-0.5 truncate">{s.preview}</p>
            <p className="text-[10px] text-text-muted/70 mt-0.5">{formatRelative(s.timestamp)}</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(s.id); }}
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:text-accent-red text-text-muted"
            title="Delete"
          >
            <Trash2 size={10} />
          </button>
        </div>
      ))}
    </div>
  </aside>
);
