import { CdnIcon } from '../shared/CdnIcon';
import { ChatInput } from '../shared/ChatInput';
import { Dropdown } from '../shared/Dropdown';
import { useChatContext } from './ChatContext';
import { ChatMessages } from './ChatMessages';
import type { ContextTagData } from '@/lib/chat-config';
import { CONVERSATIONS } from '@/lib/chat-config';

interface ChatPanelProps {
  onClose: () => void;
  contextTag?: ContextTagData | null;
}

export function ChatPanel({ onClose, contextTag }: ChatPanelProps) {
  const { hasInitialInput, activeConversationId, setActiveConversation } = useChatContext();

  const handleFullscreen = () => {
    onClose();
    window.location.hash = `thread/${activeConversationId}`;
  };

  return (
    <div className="flex items-center pl-[8px] pr-[8px] py-[8px] h-full shrink-0 w-full">
      <div
        className="flex flex-col h-full w-full overflow-hidden"
        style={{
          background: 'white',
          border: '0.5px solid rgba(0,0,0,0.2)',
          borderRadius: 12,
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        }}
      >
        {/* ── Topbar ── */}
        <div className="flex items-center gap-[16px] h-[48px] px-[24px] py-[16px] shrink-0" style={{ zIndex: 2 }}>
          <div className="flex-1 min-w-0">
            <Dropdown
              items={CONVERSATIONS}
              activeId={activeConversationId}
              onSelect={setActiveConversation}
              trigger={
                <div className="flex gap-[4px] items-center min-w-0">
                  <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] truncate">
                    {CONVERSATIONS.find(c => c.id === activeConversationId)?.label ?? 'New Thread'}
                  </p>
                  <CdnIcon name="arrow-down-f2" size={14} color="rgba(0,0,0,0.2)" />
                </div>
              }
            />
          </div>
          <div className="flex items-center gap-[16px] shrink-0">
            <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity" onClick={() => setActiveConversation('new')}>
              <CdnIcon name="chat-new-l" size={16} />
            </button>
            <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity" onClick={handleFullscreen}>
              <CdnIcon name="full-screen-l" size={16} />
            </button>
            <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity" onClick={() => {}}>
              <CdnIcon name="more-l1" size={16} />
            </button>
            <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity" onClick={onClose}>
              <CdnIcon name="collapse-right-l" size={16} />
            </button>
          </div>
        </div>

        {/* ── Chat Body ── */}
        <div className="flex flex-col flex-1 items-center min-h-0 pb-[8px] px-[8px]" style={{ zIndex: 1 }}>
          <div className="flex flex-col flex-1 min-h-0 overflow-y-auto w-full pb-[64px] px-[16px]">
            <ChatMessages conversationId={activeConversationId} hasContent={hasInitialInput} />
          </div>
          <ChatInput contextTag={contextTag} />
        </div>
      </div>
    </div>
  );
}
