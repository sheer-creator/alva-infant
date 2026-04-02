import { AVATAR_COLOR_PALETTE } from '@/lib/chart-theme';

const CDN = 'https://alva-ai-static.b-cdn.net/icons';

interface TopbarProps {
  title: string;
  author?: string;
  starCount?: number;
  remixCount?: number;
  commentCount?: number;
  onChatToggle?: () => void;
}

function UserAvatar({ name, size = 20 }: { name: string; size?: number }) {
  const initial = name.trim().charAt(0).toUpperCase();
  const color = AVATAR_COLOR_PALETTE[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_COLOR_PALETTE.length];
  return (
    <div
      style={{
        width: size, height: size, borderRadius: '50%',
        background: color, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <span style={{ fontSize: size * 0.44, color: '#fff', lineHeight: 1, fontFamily: "'Delight', sans-serif" }}>
        {initial}
      </span>
    </div>
  );
}

function StatusDot() {
  return (
    <div className="flex items-center shrink-0 size-[12px]">
      <div className="flex-1 h-full min-h-px min-w-px overflow-clip relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
          <svg className="block size-full" fill="none" viewBox="0 0 12 12">
            <circle cx="6" cy="6" fill="#DBEDED" r="6" />
          </svg>
        </div>
        <div className="absolute bottom-[28.6%] left-1/2 top-[28.6%] -translate-x-1/2">
          <svg className="block size-full" fill="none" viewBox="0 0 5.136 5.136">
            <circle cx="2.568" cy="2.568" fill="#49A3A6" r="2.568" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconButton({ children, label }: { children: React.ReactNode; label?: string | number }) {
  return (
    <div className="flex gap-[4px] h-[32px] items-center justify-center overflow-clip px-[8px] py-[6px] rounded-[6px] shrink-0 cursor-pointer hover:bg-black/[0.04] transition-colors">
      <div className="flex items-center overflow-clip shrink-0">
        <div className="shrink-0 size-[16px]">{children}</div>
      </div>
      {label !== undefined && (
        <p className="font-['Delight',sans-serif] leading-[20px] text-[12px] text-[var(--text-n9)] tracking-[0.12px] whitespace-nowrap">
          {label}
        </p>
      )}
    </div>
  );
}

function CdnIcon({ name, size = 16, color }: { name: string; size?: number; color?: string }) {
  const url = `${CDN}/${name}.svg`;
  if (color) {
    return (
      <div
        className="block"
        style={{
          width: size, height: size,
          backgroundColor: color,
          WebkitMaskImage: `url(${url})`,
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskImage: `url(${url})`,
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
        }}
      />
    );
  }
  return (
    <img
      src={url}
      alt={name}
      width={size}
      height={size}
      className="block"
      style={{ width: size, height: size }}
    />
  );
}

export function Topbar({ title, author = 'YGGYLL', starCount, remixCount, commentCount, onChatToggle }: TopbarProps) {
  return (
    <div className="flex gap-[12px] h-[56px] items-center py-[10px] sticky top-0 shrink-0 w-full z-10 bg-[var(--b0-page)] text-[var(--text-n9)]">
      {/* Left: avatar + author + dot + title + status */}
      <div className="flex flex-1 gap-[4px] items-center min-h-px min-w-px">
        <div className="shrink-0 size-[20px]">
          <UserAvatar name={author} size={20} />
        </div>
        <div className="flex flex-1 gap-[4px] items-center min-h-px min-w-px overflow-hidden">
          <p className="font-['Delight',sans-serif] leading-[22px] text-[14px] text-[var(--text-n9)] tracking-[0.14px] whitespace-nowrap overflow-hidden text-ellipsis shrink-0">
            {author}
          </p>
          <p className="font-['Delight',sans-serif] leading-[22px] text-[14px] text-[var(--text-n5)] tracking-[0.14px] shrink-0">
            &bull;
          </p>
          <p className="font-['Delight',sans-serif] leading-[22px] text-[14px] text-[var(--text-n9)] tracking-[0.14px] whitespace-nowrap overflow-hidden text-ellipsis shrink-0">
            {title}
          </p>
          <StatusDot />
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center shrink-0">
        <IconButton><CdnIcon name="share-l" /></IconButton>
        <IconButton label={starCount ?? 12}><CdnIcon name="star-l" /></IconButton>
        <IconButton label={remixCount ?? 56}><CdnIcon name="remix-l" /></IconButton>
        <IconButton label={commentCount ?? 6}><CdnIcon name="chat-l1" /></IconButton>

        {/* Action buttons */}
        <div className="flex gap-[8px] items-center pl-[8px]">
          <button className="flex gap-[6px] h-[32px] items-center justify-center px-[10px] py-[6px] rounded-[6px] cursor-pointer hover:bg-black/[0.04] transition-colors" style={{ border: '0.5px solid var(--text-n3)' }}>
            <span className="font-['Delight',sans-serif] font-medium leading-[20px] text-[12px] text-[var(--text-n9)] tracking-[0.12px] whitespace-nowrap">
              Trade
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
