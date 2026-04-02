import { useChatContext } from './ChatContext';
import alvaLogo from './alva-logo.svg';

const ANIM_CSS = `
@keyframes fabBreathe {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(73,163,166,0.5), 0 4px 16px rgba(0,0,0,0.15);
  }
  50% {
    box-shadow: 0 0 12px 4px rgba(73,163,166,0.35), 0 4px 16px rgba(0,0,0,0.15);
  }
}
.fab-breathe {
  animation: fabBreathe 3s ease-in-out infinite;
}
`;

export function FloatingChatFAB() {
  const { chatOpen, openChat } = useChatContext();

  if (chatOpen) return null;

  return (
    <>
      <style>{ANIM_CSS}</style>
      <button
        className="fixed z-30 flex items-center gap-[6px] px-[14px] h-[40px] rounded-[8px] cursor-pointer hover:scale-105 active:scale-95 fab-breathe"
        style={{
          bottom: 24,
          right: 24,
          background: '#49A3A6',
          border: '0.5px solid rgba(0,0,0,0.3)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          transition: 'transform 0.2s',
        }}
        onClick={() => openChat(false)}
      >
        <img src={alvaLogo} width={12} height={12} alt="Alva" />
        <span className="font-['Delight',sans-serif] text-[13px] leading-[22px] tracking-[0.13px] font-medium text-white whitespace-nowrap">
          Ask Alva
        </span>
      </button>
    </>
  );
}
