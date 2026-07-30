import React, {
  useState, useRef, useEffect, useCallback, useId,
} from 'react';
import {
  Send, Square, Sparkles, RotateCcw, ChevronDown,
  AlertCircle, Bot, PanelLeftClose, PanelLeft,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useChatApi } from '../hooks/useChatApi';
import { MessageBubble } from '../components/chat/MessageBubble';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { SuggestedPrompts } from '../components/chat/SuggestedPrompts';
import { ChatHistorySidebar } from '../components/chat/ChatHistorySidebar';
import type { ChatMessage, ChatSession } from '../types/chat';

// ── Helpers ──────────────────────────────────────────────────

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

function sessionTitle(msg: string): string {
  const trimmed = msg.trim();
  if (trimmed.length <= 42) return trimmed;
  return trimmed.slice(0, 40).trimEnd() + '…';
}

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: `## Welcome to KPI Nexus AI\n\nI'm your executive intelligence assistant. I have full context on:\n\n- **Financial** performance — revenue, cash flow, margins\n- **Workforce** health — attendance, turnover, productivity\n- **Customer Experience** — CSAT, NPS, churn, support\n- **Project Portfolio** — completion rates, budget variance, delays\n- **Forecasts** — trend outlooks and confidence bands\n- **Anomaly Detection** — flagged KPIs and severity scores\n- **Cross-Domain Intelligence** — Granger causal relationships\n\nAsk me anything about the data, or use the suggested questions below.`,
  timestamp: new Date(),
};

// ── Page ──────────────────────────────────────────────────────

const AIChatbotPage: React.FC = () => {
  const uid = useId();

  // ── State ──────────────────────────────────────────────────
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messagesMap, setMessagesMap] = useState<Record<string, ChatMessage[]>>({});
  const [input, setInput] = useState('');
  const [historyOpen, setHistoryOpen] = useState(true);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const { sendMessage, loading, error, setError, abort } = useChatApi();

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLTextAreaElement>(null);
  const endRef    = useRef<HTMLDivElement>(null);

  // ── Active messages ────────────────────────────────────────
  const activeMessages: ChatMessage[] = activeSessionId
    ? (messagesMap[activeSessionId] ?? [WELCOME_MESSAGE])
    : [WELCOME_MESSAGE];

  // ── Init: create first session ─────────────────────────────
  useEffect(() => {
    const id = makeId();
    const session: ChatSession = {
      id,
      title: 'New conversation',
      preview: 'Start by asking a question…',
      timestamp: new Date(),
      messageCount: 0,
    };
    setSessions([session]);
    setActiveSessionId(id);
    setMessagesMap({ [id]: [WELCOME_MESSAGE] });
  }, []);

  // ── Auto scroll ────────────────────────────────────────────
  const scrollToBottom = useCallback((smooth = true) => {
    endRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant' });
  }, []);

  useEffect(() => {
    if (loading) scrollToBottom();
  }, [loading, scrollToBottom]);

  useEffect(() => {
    const msgs = activeSessionId ? messagesMap[activeSessionId] : [];
    if (msgs?.length) scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesMap, activeSessionId]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 120);
  };

  // ── Auto resize textarea ───────────────────────────────────
  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 144)}px`;
  }, [input]);

  // ── Session helpers ────────────────────────────────────────
  const newSession = useCallback(() => {
    const id = makeId();
    const session: ChatSession = {
      id,
      title: 'New conversation',
      preview: 'Start by asking a question…',
      timestamp: new Date(),
      messageCount: 0,
    };
    setSessions((s) => [session, ...s]);
    setActiveSessionId(id);
    setMessagesMap((m) => ({ ...m, [id]: [WELCOME_MESSAGE] }));
    setInput('');
    setError(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [setError]);

  const deleteSession = useCallback((id: string) => {
    setSessions((s) => s.filter((x) => x.id !== id));
    setMessagesMap((m) => {
      const copy = { ...m };
      delete copy[id];
      return copy;
    });
    if (activeSessionId === id) {
      setSessions((s) => {
        const remaining = s.filter((x) => x.id !== id);
        if (remaining.length > 0) {
          setActiveSessionId(remaining[0].id);
        } else {
          // Create fresh
          const newId = makeId();
          const session: ChatSession = {
            id: newId,
            title: 'New conversation',
            preview: 'Start by asking a question…',
            timestamp: new Date(),
            messageCount: 0,
          };
          setSessions([session]);
          setActiveSessionId(newId);
          setMessagesMap({ [newId]: [WELCOME_MESSAGE] });
        }
        return remaining;
      });
    }
  }, [activeSessionId]);

  // ── Send ───────────────────────────────────────────────────
  const handleSend = useCallback(async (text?: string) => {
    const query = (text ?? input).trim();
    if (!query || loading || !activeSessionId) return;

    setInput('');
    setError(null);

    const userMsg: ChatMessage = {
      id: makeId(),
      role: 'user',
      content: query,
      timestamp: new Date(),
      status: 'delivered',
    };

    // Append user message
    setMessagesMap((m) => ({
      ...m,
      [activeSessionId]: [...(m[activeSessionId] ?? [WELCOME_MESSAGE]), userMsg],
    }));

    // Update session title & preview on first real user message
    setSessions((s) =>
      s.map((sess) =>
        sess.id === activeSessionId
          ? {
              ...sess,
              title: sess.messageCount === 0 ? sessionTitle(query) : sess.title,
              preview: query.slice(0, 50),
              timestamp: new Date(),
              messageCount: sess.messageCount + 1,
            }
          : sess
      )
    );

    try {
      const history = [
        ...(messagesMap[activeSessionId] ?? [WELCOME_MESSAGE]),
        userMsg,
      ];

      const result = await sendMessage(history);

      const aiMsg: ChatMessage = {
        id: makeId(),
        role: 'assistant',
        content: result.content,
        timestamp: new Date(),
        status: 'delivered',
        dataCard: result.dataCard,
      };

      setMessagesMap((m) => ({
        ...m,
        [activeSessionId]: [...(m[activeSessionId] ?? []), aiMsg],
      }));
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;

      const errMsg: ChatMessage = {
        id: makeId(),
        role: 'assistant',
        content: 'An error occurred while contacting the AI. Please try again.',
        timestamp: new Date(),
        status: 'error',
      };
      setMessagesMap((m) => ({
        ...m,
        [activeSessionId]: [...(m[activeSessionId] ?? []), errMsg],
      }));
    }
  }, [input, loading, activeSessionId, messagesMap, sendMessage, setError]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Retry last ─────────────────────────────────────────────
  const handleRetry = useCallback(() => {
    const msgs = activeSessionId ? (messagesMap[activeSessionId] ?? []) : [];
    const lastUser = [...msgs].reverse().find((m) => m.role === 'user');
    if (lastUser) handleSend(lastUser.content);
  }, [activeSessionId, messagesMap, handleSend]);

  const showEmpty = activeMessages.length <= 1 && !loading;
  const lastMsgId = activeMessages[activeMessages.length - 1]?.id;

  return (
    <div className="flex bg-bg-base overflow-hidden" style={{ height: '100%' }}>
      {/* ── History sidebar ──────────────────────────────────── */}
      <div className={cn(
        'transition-all duration-250 ease-in-out flex-shrink-0 overflow-hidden',
        historyOpen ? 'w-56' : 'w-0'
      )}>
        {historyOpen && (
          <ChatHistorySidebar
            sessions={sessions}
            activeSessionId={activeSessionId}
            onSelect={(id) => { setActiveSessionId(id); setInput(''); setError(null); }}
            onNew={newSession}
            onDelete={deleteSession}
          />
        )}
      </div>

      {/* ── Main chat area ────────────────────────────────────── */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">

        {/* Chat header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-bg-border bg-bg-surface shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setHistoryOpen((v) => !v)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-text-muted hover:text-text-secondary hover:bg-bg-elevated transition-all"
              title="Toggle history"
            >
              {historyOpen ? <PanelLeftClose size={15} /> : <PanelLeft size={15} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-accent-blue/20 border border-accent-blue/40 flex items-center justify-center">
                <Bot size={12} className="text-accent-blue" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary leading-none">KPI Nexus AI</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse-soft" />
                  <span className="text-[10px] text-text-muted">Online · All domains connected</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={newSession}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-bg-elevated hover:bg-bg-border border border-bg-border text-text-secondary hover:text-text-primary transition-all"
            >
              <Sparkles size={11} className="text-accent-purple" />
              New chat
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-5 space-y-5 relative"
        >
          {/* Welcome / empty state */}
          {showEmpty && (
            <div className="flex flex-col items-center justify-center h-full gap-6 animate-fade-in pb-8">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-accent-blue/15 border border-accent-blue/30 flex items-center justify-center shadow-elevated">
                  <Bot size={28} className="text-accent-blue" />
                </div>
                <div className="text-center">
                  <h2 className="text-base font-bold text-text-primary">KPI Nexus AI</h2>
                  <p className="text-xs text-text-muted mt-1">Executive intelligence across all domains</p>
                </div>
              </div>
            </div>
          )}

          {/* Message list */}
          {activeMessages.map((msg, idx) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isLatest={idx === activeMessages.length - 1}
            />
          ))}

          {/* Typing indicator */}
          {loading && <TypingIndicator />}

          {/* Error banner */}
          {error && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-accent-red/10 border border-accent-red/30 animate-fade-in">
              <AlertCircle size={14} className="text-accent-red flex-shrink-0" />
              <p className="text-xs text-accent-red flex-1">{error}</p>
              <button
                onClick={handleRetry}
                className="flex items-center gap-1 text-xs text-accent-red hover:text-red-300 font-medium transition-colors"
              >
                <RotateCcw size={11} />
                Retry
              </button>
            </div>
          )}

          <div ref={endRef} className="h-1" />
        </div>

        {/* Scroll-to-bottom button */}
        {showScrollBtn && (
          <div className="absolute bottom-36 right-6 z-20 animate-fade-in">
            <button
              onClick={() => scrollToBottom()}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-elevated border border-bg-border text-text-muted hover:text-text-primary shadow-elevated transition-all"
            >
              <ChevronDown size={16} />
            </button>
          </div>
        )}

        {/* Suggested prompts (only when few messages) */}
        {activeMessages.length <= 2 && !loading && (
          <div className="border-t border-bg-border bg-bg-surface animate-fade-in">
            <SuggestedPrompts onSelect={(p) => { setInput(''); handleSend(p); }} />
          </div>
        )}

        {/* Input area */}
        <div className="border-t border-bg-border bg-bg-surface px-4 pt-3 pb-4 shrink-0">
          <div className={cn(
            'flex items-end gap-2.5 rounded-2xl border bg-bg-elevated px-4 py-2.5 transition-all duration-150',
            loading ? 'border-accent-blue/30' : 'border-bg-border focus-within:border-accent-blue/50',
          )}>
            <textarea
              ref={inputRef}
              id={`${uid}-input`}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              placeholder="Ask about revenue, anomalies, workforce, projects…"
              className="flex-1 resize-none bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none leading-relaxed min-h-[22px] max-h-36 disabled:opacity-50"
            />

            <div className="flex items-center gap-1.5 pb-0.5 shrink-0">
              {loading ? (
                <button
                  onClick={abort}
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-red/15 hover:bg-accent-red/25 border border-accent-red/30 text-accent-red transition-all"
                  title="Stop generating"
                >
                  <Square size={13} fill="currentColor" />
                </button>
              ) : (
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-150',
                    input.trim()
                      ? 'bg-accent-blue hover:bg-blue-500 text-white shadow-sm'
                      : 'bg-bg-border text-text-muted cursor-not-allowed'
                  )}
                  title="Send (Enter)"
                >
                  <Send size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-[10px] text-text-muted mt-2">
            Press <kbd className="px-1 py-0.5 rounded bg-bg-border font-mono text-[9px]">Enter</kbd> to send ·{' '}
            <kbd className="px-1 py-0.5 rounded bg-bg-border font-mono text-[9px]">Shift+Enter</kbd> for new line ·
            AI responses are based on KPI dataset analysis
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChatbotPage;
