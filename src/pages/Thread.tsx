import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { ChatMessages } from '@/app/components/chat/ChatMessages';
import { ChatInput } from '@/app/components/shared/ChatInput';
import { CONVERSATIONS } from '@/lib/chat-config';

interface ThreadProps {
  threadId: string;
  onNavigate: (page: Page) => void;
}

export default function Thread({ threadId, onNavigate }: ThreadProps) {
  const title = CONVERSATIONS.find(c => c.id === threadId)?.label ?? 'New Thread';
  const hasContent = threadId !== 'new' && CONVERSATIONS.some(c => c.id === threadId);

  return (
    <AppShell activePage={`thread/${threadId}`} onNavigate={onNavigate}>
      <div className="h-screen flex flex-col bg-white">
        {/* Topbar */}
        <div className="flex items-center h-[56px] px-[28px] shrink-0">
          <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] truncate">
            {title}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center min-h-0 overflow-hidden">
          <div className="flex flex-col flex-1 min-h-0 w-full" style={{ maxWidth: 840 }}>
            {hasContent ? (
              <div className="flex-1 min-h-0 overflow-y-auto px-[16px] pb-[64px]">
                <ChatMessages conversationId={threadId} />
              </div>
            ) : (
              <div className="flex-1 flex min-h-0">
                <ChatMessages conversationId="new" />
              </div>
            )}
            <div className="px-[16px] pb-[24px] shrink-0">
              <ChatInput shadow />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
