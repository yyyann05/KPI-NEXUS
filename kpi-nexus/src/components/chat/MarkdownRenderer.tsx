// Lightweight markdown renderer — no external deps.
// Supports: headers, bold, italic, inline-code, code blocks,
// tables, unordered/ordered lists, blockquotes, hr, paragraphs.

import React from 'react';
import { cn } from '../../utils/cn';

interface Props {
  content: string;
  className?: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Render inline markdown: **bold**, *italic*, `code`, links */
function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Combined regex: **bold**, *italic*, `code`
  const re = /(\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`)/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    if (match[2] !== undefined) {
      parts.push(<strong key={match.index} className="font-semibold text-text-primary">{match[2]}</strong>);
    } else if (match[3] !== undefined) {
      parts.push(<em key={match.index} className="italic text-text-secondary">{match[3]}</em>);
    } else if (match[4] !== undefined) {
      parts.push(
        <code key={match.index} className="px-1.5 py-0.5 rounded text-[11px] font-mono bg-bg-elevated text-accent-teal border border-bg-border">
          {match[4]}
        </code>
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export const MarkdownRenderer: React.FC<Props> = ({ content, className }) => {
  const lines = content.split('\n');
  const nodes: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // ── Fenced code block ──────────────────────────────────────
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(escapeHtml(lines[i]));
        i++;
      }
      nodes.push(
        <div key={`cb-${i}`} className="my-3 rounded-xl overflow-hidden border border-bg-border">
          {lang && (
            <div className="px-4 py-1.5 bg-bg-elevated border-b border-bg-border flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400/60" />
              <span className="w-2 h-2 rounded-full bg-amber-400/60" />
              <span className="w-2 h-2 rounded-full bg-green-400/60" />
              <span className="ml-2 text-[10px] text-text-muted font-mono">{lang}</span>
            </div>
          )}
          <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed text-text-secondary bg-bg-base">
            <code dangerouslySetInnerHTML={{ __html: codeLines.join('\n') }} />
          </pre>
        </div>
      );
      i++; // skip closing ```
      continue;
    }

    // ── Table ─────────────────────────────────────────────────
    if (line.includes('|') && lines[i + 1]?.includes('---')) {
      const headers = line.split('|').map((h) => h.trim()).filter(Boolean);
      i += 2; // skip header and separator
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes('|')) {
        rows.push(lines[i].split('|').map((c) => c.trim()).filter(Boolean));
        i++;
      }
      nodes.push(
        <div key={`tbl-${i}`} className="my-3 overflow-x-auto rounded-xl border border-bg-border">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-bg-elevated border-b border-bg-border">
                {headers.map((h, hi) => (
                  <th key={hi} className="px-3 py-2 text-left font-semibold text-text-secondary">
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className={cn('border-b border-bg-border last:border-0', ri % 2 === 1 && 'bg-bg-elevated/40')}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 text-text-secondary leading-relaxed">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // ── Blockquote ────────────────────────────────────────────
    if (line.startsWith('> ')) {
      const bqLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        bqLines.push(lines[i].slice(2));
        i++;
      }
      nodes.push(
        <blockquote key={`bq-${i}`} className="my-2 pl-3 border-l-2 border-accent-blue/60 text-text-secondary text-sm italic leading-relaxed">
          {bqLines.map((bl, bi) => <span key={bi}>{renderInline(bl)}{bi < bqLines.length - 1 ? <br /> : null}</span>)}
        </blockquote>
      );
      continue;
    }

    // ── Headings ──────────────────────────────────────────────
    if (line.startsWith('### ')) {
      nodes.push(
        <h3 key={`h3-${i}`} className="mt-4 mb-1.5 text-sm font-semibold text-text-primary">
          {renderInline(line.slice(4))}
        </h3>
      );
      i++; continue;
    }
    if (line.startsWith('## ')) {
      nodes.push(
        <h2 key={`h2-${i}`} className="mt-4 mb-2 text-base font-bold text-text-primary">
          {renderInline(line.slice(3))}
        </h2>
      );
      i++; continue;
    }
    if (line.startsWith('# ')) {
      nodes.push(
        <h1 key={`h1-${i}`} className="mt-4 mb-2 text-lg font-bold text-text-primary">
          {renderInline(line.slice(2))}
        </h1>
      );
      i++; continue;
    }

    // ── Horizontal rule ───────────────────────────────────────
    if (/^---+$/.test(line.trim())) {
      nodes.push(<hr key={`hr-${i}`} className="my-3 border-bg-border" />);
      i++; continue;
    }

    // ── Unordered list ────────────────────────────────────────
    if (/^[-*] /.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i])) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      nodes.push(
        <ul key={`ul-${i}`} className="my-2 space-y-1 pl-4">
          {listItems.map((item, li) => (
            <li key={li} className="flex gap-2 text-sm text-text-secondary leading-relaxed">
              <span className="text-accent-blue mt-1.5 shrink-0 text-[8px]">●</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // ── Ordered list ──────────────────────────────────────────
    if (/^\d+\. /.test(line)) {
      const olItems: string[] = [];
      let num = 1;
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        olItems.push(lines[i].replace(/^\d+\. /, ''));
        i++;
      }
      nodes.push(
        <ol key={`ol-${i}`} className="my-2 space-y-1 pl-4">
          {olItems.map((item, li) => (
            <li key={li} className="flex gap-2.5 text-sm text-text-secondary leading-relaxed">
              <span className="text-accent-blue font-semibold shrink-0 text-xs mt-0.5 w-4">{li + num}.</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // ── Empty line ────────────────────────────────────────────
    if (line.trim() === '') {
      nodes.push(<div key={`sp-${i}`} className="h-1.5" />);
      i++; continue;
    }

    // ── Paragraph ────────────────────────────────────────────
    nodes.push(
      <p key={`p-${i}`} className="text-sm text-text-secondary leading-relaxed">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return (
    <div className={cn('prose-custom space-y-0.5', className)}>
      {nodes}
    </div>
  );
};
