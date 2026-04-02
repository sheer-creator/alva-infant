import { useState } from 'react';
import { CdnIcon } from '../shared/CdnIcon';
import { useChatContext } from './ChatContext';

const ANIM_CSS = `
@keyframes slideBottom {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
`;

export function FloatingChatBar() {
  const { openChat, contextTag } = useChatContext();
  const [input, setInput] = useState('');
  const [focused, setFocused] = useState(false);
  if (!contextTag) return null;

  const handleSend = () => {
    if (input.trim()) {
      openChat(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="fixed z-30"
      style={{
        bottom: 24,
        left: '50%',
        marginLeft: 114,
        transform: 'translateX(-50%)',
        width: 560,
        maxWidth: 'calc(100vw - 228px - 48px)',
      }}
    >
      <style>{ANIM_CSS}</style>
      <div
        className="relative flex gap-[12px] items-end p-[16px] w-full rounded-[12px] overflow-hidden"
        style={{
          background: 'white',
          border: '0.5px solid ' + (focused ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.2)'),
          boxShadow: focused
            ? 'inset 0 0 0 0.5px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.08)'
            : '0 4px 20px rgba(0,0,0,0.08)',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
      >
        {/* Bottom sliding light */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
          <div
            className="h-full w-[40%]"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(73,163,166,0.2) 30%, #49A3A6 100%)',
              animation: 'slideBottom 4s ease-in-out infinite',
            }}
          />
        </div>

        {/* Expand icon + input */}
        <div className="flex flex-1 gap-[8px] items-center overflow-clip py-[3px] min-w-0">
          <button
            className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => openChat(false)}
          >
            <CdnIcon name="unfoldd-l" size={16} color="rgba(0,0,0,0.5)" />
          </button>
          <input
            className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] placeholder:text-[var(--text-n3)] flex-1 min-w-0 outline-none bg-transparent"
            placeholder="Ask anything about investing"
            value={input}
            onChange={e => setInput(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Photo button */}
        <div className="flex items-center justify-center overflow-clip py-[6px] shrink-0">
          <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity">
            <CdnIcon name="photo-l" size={16} />
          </button>
        </div>

        {/* Send button */}
        <button
          className="flex items-center justify-center shrink-0 size-[28px] rounded-[6px] cursor-pointer transition-colors"
          style={{
            background: input.trim() ? '#49A3A6' : 'rgba(0,0,0,0.05)',
          }}
          onClick={handleSend}
        >
          <CdnIcon
            name="arrow-up-l1"
            size={14}
            color={input.trim() ? '#ffffff' : 'rgba(0,0,0,0.3)'}
          />
        </button>
      </div>
    </div>
  );
}
