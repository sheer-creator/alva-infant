import { useRef, useState, useCallback, useEffect } from 'react';
import { CdnIcon } from './CdnIcon';
import type { ContextTagData } from '@/lib/chat-config';

interface ChatInputProps {
  placeholder?: string;
  contextTag?: ContextTagData | null;
  shadow?: boolean;
  prefillText?: string | null;
  prefillKey?: number;
  onPrefillConsumed?: () => void;
  onSend?: (text: string) => void;
}

export function ChatInput({
  placeholder = 'Build an investing playbook from your ideas',
  contextTag,
  shadow,
  prefillText,
  prefillKey,
  onPrefillConsumed,
  onSend,
}: ChatInputProps) {
  const [hasText, setHasText] = useState(false);
  const [tagDismissed, setTagDismissed] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setTagDismissed(false); }, [contextTag]);

  const showTag = !!contextTag && !tagDismissed;

  const getTextContent = useCallback(() => {
    const el = editorRef.current;
    if (!el) return '';
    return (el.textContent || '').replace(/\u200B/g, '').trim();
  }, []);

  const handleInput = useCallback(() => {
    setHasText(!!getTextContent());
  }, [getTextContent]);

  const placeCursorAtEnd = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;
    const sel = window.getSelection();
    if (!sel) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }, []);

  useEffect(() => {
    if (prefillText == null) return;
    const el = editorRef.current;
    if (!el) return;
    el.textContent = prefillText;
    setHasText(!!prefillText.trim());
    setTagDismissed(false);
    onPrefillConsumed?.();
    requestAnimationFrame(() => {
      el.focus();
      placeCursorAtEnd();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillKey]);

  const handleFocus = useCallback(() => {
    requestAnimationFrame(() => placeCursorAtEnd());
  }, [placeCursorAtEnd]);

  const handleSendClick = useCallback(() => {
    const text = getTextContent();
    if (text && onSend) {
      onSend(text);
      const el = editorRef.current;
      if (el) el.textContent = '';
      setHasText(false);
    }
  }, [getTextContent, onSend]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  }, [handleSendClick]);

  const showPlaceholder = !hasText;

  return (
    <div
      className="w-full shrink-0 flex flex-col gap-[12px] p-[16px] chat-input-wrapper"
      style={{ background: 'white', border: '0.5px solid rgba(0,0,0,0.2)', borderRadius: 12, boxShadow: shadow ? 'var(--shadow-s)' : undefined }}
    >
      {showTag && contextTag && (
        <div className="flex flex-wrap gap-[8px] items-start w-full">
          <div
            className="inline-flex items-center gap-[6px] p-[6px] rounded-[4px] shrink-0"
            style={{ border: '0.5px solid rgba(0,0,0,0.2)' }}
          >
            <span
              className="flex items-center justify-center shrink-0 rounded-[2px] size-[20px]"
              style={{ background: '#49A3A6' }}
            >
              <CdnIcon name={contextTag.icon || 'sidebar-discover-normal'} size={16} color="#fff" />
            </span>
            <span
              className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] truncate max-w-[184px]"
              style={{ color: 'var(--text-n9)' }}
            >
              {contextTag.label}
            </span>
            <button
              type="button"
              aria-label="Remove reference"
              className="flex items-center justify-center shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
              onClick={() => setTagDismissed(true)}
            >
              <CdnIcon name="close-l1" size={12} color="rgba(0,0,0,0.5)" />
            </button>
          </div>
        </div>
      )}
      <div className="relative min-h-[44px]" style={{ maxHeight: 240, overflowY: 'auto' }}>
        {showPlaceholder && (
          <div className="absolute inset-0 pointer-events-none font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n3)]">
            {placeholder}
          </div>
        )}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] outline-none min-h-[22px] w-full"
          style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
          onInput={handleInput}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex items-center gap-[12px] h-[28px]">
        <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity">
          <CdnIcon name="at-l" size={16} />
        </button>
        <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity">
          <CdnIcon name="photo-l" size={16} />
        </button>
        <div className="flex-1 flex items-center justify-end gap-[4px]">
          <span className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]">
            Sonnet 4.6
          </span>
          <CdnIcon name="arrow-down-f2" size={12} color="rgba(0,0,0,0.2)" />
        </div>
        <button
          className="flex items-center justify-center shrink-0 size-[28px] rounded-[6px] cursor-pointer transition-colors"
          style={{
            background: hasText ? '#49A3A6' : 'rgba(0,0,0,0.05)',
          }}
          onClick={handleSendClick}
        >
          <CdnIcon
            name="arrow-up-l1"
            size={14}
            color={hasText ? '#ffffff' : 'rgba(0,0,0,0.3)'}
          />
        </button>
      </div>
    </div>
  );
}
