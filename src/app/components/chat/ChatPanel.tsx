import { useState } from 'react';
import { CdnIcon } from '../shared/CdnIcon';
import { ChatInput } from '../shared/ChatInput';
import { Dropdown } from '../shared/Dropdown';
import { ThreadSwitcherDropdown, AGENT_CONVERSATION_ID } from '../shared/ThreadSwitcherDropdown';
import { useChatContext } from './ChatContext';
import { ChatMessages } from './ChatMessages';
import { TodoListCard, ReviewPlanCard, AnswerQuestionCard } from './StreamingMessages';
import { AlvaLoading } from '../shared/AlvaLoading';
import DotMatrixWave from '../shared/DotMatrixWave';
import type { ContextTagData } from '@/lib/chat-config';
import { CONVERSATIONS } from '@/lib/chat-config';
import { useAgentPlatforms, type AgentPlatform } from '@/lib/agent-connected';
import { Tooltip } from '../shared/Tooltip';

interface ChatPanelProps {
  onClose: () => void;
  contextTag?: ContextTagData | null;
}

export function ChatPanel({ onClose, contextTag }: ChatPanelProps) {
  const {
    hasInitialInput,
    activeConversationId,
    setActiveConversation,
    sendPrompt,
    overlay,
    dismissOverlay,
    prefillPrompt,
    clearPrefill,
  } = useChatContext();
  const { platforms, toggle } = useAgentPlatforms();
  const agentConnected = platforms.length > 0;
  const [connecting, setConnecting] = useState(false);

  const handleFullscreen = () => {
    onClose();
    window.location.hash = `thread/${activeConversationId}`;
  };

  const handleConnect = (platform: AgentPlatform) => {
    setConnecting(true);
    setTimeout(() => { toggle(platform); setConnecting(false); }, 2000);
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
        <div className="relative flex items-center gap-[16px] h-[48px] px-[24px] py-[16px] shrink-0" style={{ zIndex: 20 }}>
          <div className="flex-1 min-w-0">
            <ThreadSwitcherDropdown
              activeId={activeConversationId}
              onSelect={setActiveConversation}
              trigger={
                activeConversationId === AGENT_CONVERSATION_ID ? (
                  <div className="flex items-center gap-[8px] min-w-0">
                    <div className="relative shrink-0">
                      <img
                        src={`${import.meta.env.BASE_URL}logo-portrait.svg`}
                        alt="Alva Agent"
                        className="rounded-full"
                        style={{ width: 24, height: 24 }}
                      />
                      <div
                        className="absolute -bottom-[1px] right-[-3px] size-[10px] rounded-full border-[1.5px] border-white"
                        style={{ background: agentConnected ? 'var(--main-m1, #49A3A6)' : 'rgba(0,0,0,0.3)' }}
                      />
                    </div>
                    <div className="flex gap-[4px] items-center min-w-0">
                      <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] truncate">
                        Alva Agent
                      </p>
                      <CdnIcon name="arrow-down-f2" size={14} color="rgba(0,0,0,0.2)" />
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-[4px] items-center min-w-0">
                    <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] truncate">
                      {CONVERSATIONS.find(c => c.id === activeConversationId)?.label ?? 'New Thread'}
                    </p>
                    <CdnIcon name="arrow-down-f2" size={14} color="rgba(0,0,0,0.2)" />
                  </div>
                )
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
            <Dropdown
              items={[{ id: 'rename', label: 'Rename', icon: 'edit-l1' }, { id: 'delete', label: 'Delete', icon: 'delete-l' }]}
              onSelect={(id) => { if (id === 'delete') { /* handle delete */ } }}
              width={180}
              align="right"
              trigger={
                <div className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity">
                  <CdnIcon name="more-l1" size={16} />
                </div>
              }
            />
            <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity" onClick={onClose}>
              <CdnIcon name="collapse-right-l" size={16} />
            </button>
          </div>
        </div>

        {/* ── Chat Body ── */}
        {agentConnected || activeConversationId !== AGENT_CONVERSATION_ID ? (
          <div className="flex flex-col flex-1 items-center min-h-0 pb-[8px] px-[8px] relative" style={{ zIndex: 1 }}>
            <div className="flex flex-col flex-1 min-h-0 overflow-y-auto w-full pt-[12px] pb-[64px] px-[16px]">
              <ChatMessages conversationId={activeConversationId} hasContent={hasInitialInput} />
            </div>

            {/* ── Bottom area: plan replaces input; others float above input ── */}
            {overlay && overlay.type === 'plan' && overlay.plan ? (
              <div className="w-full shrink-0">
                <ReviewPlanCard data={overlay.plan} onApprove={dismissOverlay} />
              </div>
            ) : (
              <>
                {overlay && overlay.type === 'todos' && overlay.todos && (
                  <div className="w-full px-[8px] pb-[8px] shrink-0">
                    <TodoListCard data={overlay.todos} />
                  </div>
                )}
                {overlay && overlay.type === 'answer' && overlay.answer && (
                  <div className="w-full px-[8px] pb-[8px] shrink-0">
                    <AnswerQuestionCard
                      data={overlay.answer}
                      onSelect={() => dismissOverlay()}
                      onSkip={dismissOverlay}
                    />
                  </div>
                )}
                <ChatInput
                  contextTag={contextTag}
                  onSend={sendPrompt}
                  prefillText={prefillPrompt?.text ?? null}
                  prefillKey={prefillPrompt?.nonce}
                  onPrefillConsumed={clearPrefill}
                />
              </>
            )}
          </div>
        ) : (
          <div className="relative flex flex-1 min-h-0 overflow-hidden" style={{ background: '#ffffff', zIndex: 0 }}>
            <DotMatrixWave
              enableHover={false}
              bgColor="#ffffff"
              dotColor="#d1e0e0"
              waveSpeed={0.6}
              className="absolute inset-0 pointer-events-none w-full h-full"
            />
            <div className="relative flex-1 flex flex-col items-center justify-center px-[24px]">
              {connecting ? (
                <div className="flex flex-col items-center gap-[20px]">
                  <AlvaLoading size={36} />
                  <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n5)]">
                    Connecting to Telegram...
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-[20px]">
                  <img src={`${import.meta.env.BASE_URL}logo-portrait.svg`} alt="Alva Agent" className="rounded-full" style={{ width: 48, height: 48 }} />
                  <div className="flex flex-col items-center gap-[8px] text-center">
                    <p className="font-['Delight',sans-serif] text-[20px] leading-[30px] tracking-[0.2px] text-[var(--text-n9)]">
                      Connect Alva Agent
                    </p>
                    <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n5)]">
                      Connect Telegram to start chatting with your agent.
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-[12px]">
                    <button
                      type="button"
                      onClick={() => handleConnect('telegram')}
                      className="flex items-center justify-center gap-[8px] font-['Delight',sans-serif] font-medium text-[16px] leading-[26px] tracking-[0.16px] text-white cursor-pointer transition-opacity hover:opacity-90"
                      style={{ height: 48, width: 280, padding: '11px 20px', background: '#24A1DE', borderRadius: 6, border: 'none' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.8693 2.23048C17.8693 2.23048 19.6246 1.54575 19.4783 3.20864C19.4295 3.89337 18.9907 6.28986 18.6494 8.88202L17.4793 16.5606C17.4793 16.5606 17.3818 17.6855 16.5042 17.8812C15.6266 18.0768 14.3102 17.1964 14.0664 17.0008C13.8713 16.8541 10.4097 14.6532 9.19079 13.5772C8.84948 13.2838 8.45944 12.6968 9.23954 12.0121L14.3589 7.12132C14.944 6.53442 15.5291 5.16499 13.0913 6.82788L6.26545 11.4742C6.26545 11.4742 5.48535 11.9632 4.02269 11.5231L0.85355 10.5449C0.85355 10.5449 -0.316596 9.81129 1.68238 9.07762C6.558 6.77892 12.5549 4.43132 17.8693 2.23048Z" fill="#ffffff"/>
                      </svg>
                      Connect Telegram
                    </button>

                    <button
                      type="button"
                      onClick={() => handleConnect('discord')}
                      className="flex items-center justify-center gap-[8px] font-['Delight',sans-serif] font-medium text-[16px] leading-[26px] tracking-[0.16px] cursor-pointer transition-colors"
                      style={{ height: 48, width: 280, padding: '11px 20px', background: 'transparent', color: 'var(--text-n9)', borderRadius: 6, border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--b-r03, rgba(0,0,0,0.03))'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                    >
                      <img src={`${import.meta.env.BASE_URL}logo-social-discord.svg`} alt="" style={{ width: 20, height: 20 }} />
                      Connect Discord
                    </button>
                  </div>

                  <div className="flex flex-col items-center gap-[12px]">
                    <span className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]">
                      Same agent, more channels
                    </span>
                    <div className="flex items-center gap-[8px]">
                      {[
                        { name: 'Slack', file: 'logo-social-slack.svg' },
                        { name: 'WhatsApp', file: 'logo-social-whatsapp.svg' },
                        { name: 'Line', file: 'logo-social-line.svg' },
                      ].map(p => (
                        <Tooltip key={p.name} text="Coming Soon">
                          <span
                            aria-disabled="true"
                            className="flex items-center gap-[6px] rounded-full border-none cursor-not-allowed"
                            style={{ background: 'var(--b-r05)', padding: '4px 12px 4px 6px', opacity: 0.5 }}
                          >
                            <img src={`${import.meta.env.BASE_URL}${p.file}`} alt={p.name} style={{ width: 18, height: 18 }} />
                            <span
                              className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px]"
                              style={{ color: 'var(--text-n5)' }}
                            >
                              {p.name}
                            </span>
                          </span>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
