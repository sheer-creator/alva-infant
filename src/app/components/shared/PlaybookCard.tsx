import { useState } from 'react';
import { CdnIcon } from './CdnIcon';
import { Avatar } from './Avatar';

const FONT = "'Delight', sans-serif";

export interface PlaybookCardProps {
  title: string;
  desc: string;
  author: string;
  stars: string | number;
  remixes: number;
  onClick?: () => void;
  noCover?: boolean;
  selected?: boolean;
}

export function PlaybookCard({
  title,
  desc,
  author,
  stars,
  remixes,
  onClick,
  noCover = false,
  selected = false,
}: PlaybookCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer"
      style={{
        borderRadius: noCover ? 'var(--radius-ct-l, 8px)' : 12,
        overflow: 'hidden',
        background: 'var(--b0-page, #fff)',
        border: selected
          ? '1px solid var(--line-l9, rgba(0,0,0,0.9))'
          : '0.5px solid var(--line-l3, rgba(0,0,0,0.3))',
        padding: selected ? 0 : 0.5,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: hovered ? 'var(--shadow-l, 0 10px 20px 0 rgba(0,0,0,0.08))' : 'none',
        transition: 'box-shadow 130ms cubic-bezier(0.2, 0, 0, 1)',
      }}
    >
      {/* Cover */}
      {!noCover && (
        <div
          style={{
            margin: '4px 4px 0 4px',
            width: 'calc(100% - 8px)',
            aspectRatio: '472 / 265.5',
            borderRadius: 8,
            background: 'linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)',
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 0.6px, transparent 0.6px)',
            backgroundSize: '3px 3px',
          }}
        />
      )}

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: noCover ? 8 : 12, padding: noCover ? '12px 14px' : '16px 16px 12px' }}>
        {noCover ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: '22px',
                  fontWeight: 500,
                  fontFamily: FONT,
                  color: 'var(--text-n9, rgba(0,0,0,0.9))',
                  letterSpacing: 0.14,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  margin: 0,
                }}
              >
                {title}
              </p>
              <p
                style={{
                  fontSize: 12,
                  lineHeight: '18px',
                  fontFamily: FONT,
                  color: 'var(--text-n5, rgba(0,0,0,0.5))',
                  letterSpacing: 0.12,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  margin: 0,
                }}
              >
                {desc}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 6, height: 20 }}>
                <Avatar name={author} size={20} />
                <span
                  style={{
                    fontSize: 12,
                    lineHeight: '20px',
                    fontFamily: FONT,
                    color: 'var(--text-n9, rgba(0,0,0,0.9))',
                    letterSpacing: 0.12,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {author}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, lineHeight: '20px', letterSpacing: 0.12, fontFamily: FONT }}>
                  <CdnIcon name="show-l" size={14} />
                  {stars}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, lineHeight: '20px', letterSpacing: 0.12, fontFamily: FONT }}>
                  <CdnIcon name="remix-l" size={14} />
                  {remixes}
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-[4px]">
              <p
                className="text-[16px] leading-[26px] tracking-[0.16px] whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT, margin: 0 }}
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
                  margin: 0,
                }}
              >
                {desc}
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <div className="flex-1 min-w-0 flex items-center gap-[6px] h-[22px]">
                <Avatar name={author} size={22} />
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
          </>
        )}
      </div>
    </div>
  );
}
