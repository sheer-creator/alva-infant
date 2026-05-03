import { CdnIcon } from './CdnIcon';

const AVATAR_COLORS: Record<string, string> = {
  'Alva Intern': '#49A3A6',
  'Harry Zzz': '#FF9800',
  'Leo Leo': '#5F75C9',
  'Sheer YLL YGG': '#40A544',
  'Macro Scope X': '#3D8BD1',
  'Smart Jing': '#DC7AA5',
};

export interface PlaybookCardProps {
  title: string;
  desc: string;
  author: string;
  stars: string | number;
  remixes: number;
  onClick?: () => void;
}

export function PlaybookCard({
  title,
  desc,
  author,
  stars,
  remixes,
  onClick,
}: PlaybookCardProps) {
  const initial = author.charAt(0).toUpperCase();
  const color = AVATAR_COLORS[author] ?? '#838383';

  return (
    <div
      onClick={onClick}
      className="flex flex-col overflow-hidden rounded-[12px] cursor-pointer transition-shadow hover:shadow-l"
      style={{
        border: '0.5px solid rgba(0,0,0,0.3)',
        background: 'var(--b0-page, #fff)',
      }}
    >
      {/* Cover placeholder */}
      <div
        className="aspect-[472/265.5] rounded-t-[8px]"
        style={{
          margin: '4px 4px 0 4px',
          width: 'calc(100% - 8px)',
          background: 'linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)',
          borderRadius: 8,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 0.6px, transparent 0.6px)',
          backgroundSize: '3px 3px',
        }}
      />

      {/* Info */}
      <div className="flex flex-col gap-[12px] px-[16px] pt-[16px] pb-[12px]">
        {/* Title + description */}
        <div className="flex flex-col gap-[4px]">
          <p
            className="text-[16px] leading-[26px] tracking-[0.16px] whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}
          >
            {title}
          </p>
          <p
            className="text-[12px] leading-[20px] tracking-[0.12px] overflow-hidden"
            style={{
              color: 'var(--text-n5, rgba(0,0,0,0.5))',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {desc}
          </p>
        </div>

        {/* Creator + stats */}
        <div className="flex items-center gap-[10px]">
          <div className="flex-1 min-w-0 flex items-center gap-[6px] h-[22px]">
            <div
              className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] font-medium text-white shrink-0"
              style={{ background: color }}
            >
              {initial}
            </div>
            <span
              className="text-[14px] leading-[22px] tracking-[0.14px] truncate"
              style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}
            >
              {author}
            </span>
          </div>

          <div
            className="flex items-center gap-[12px] shrink-0"
            style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}
          >
            <span className="flex items-center gap-[4px] text-[14px] leading-[22px] tracking-[0.14px]">
              <CdnIcon name="star-l" size={16} />
              {stars}
            </span>
            <span className="flex items-center gap-[4px] text-[14px] leading-[22px] tracking-[0.14px]">
              <CdnIcon name="remix-l" size={16} />
              {remixes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
