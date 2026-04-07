import { useState, useRef, useEffect, useCallback } from 'react';
import { CdnIcon } from './CdnIcon';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: string;
  iconColor?: string;
}

export interface DropdownSection {
  title?: string;
  items: DropdownItem[];
}

interface DropdownProps {
  items?: DropdownItem[];
  sections?: DropdownSection[];
  activeId?: string;
  onSelect: (id: string) => void;
  trigger: React.ReactNode;
  width?: number;
  maxHeight?: number;
  align?: 'left' | 'right';
}

export function Dropdown({ items, sections, activeId, onSelect, trigger, width, maxHeight, align = 'left' }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open, handleClickOutside]);

  // Normalize items into sections
  const allSections: DropdownSection[] = sections ?? [{ items: items ?? [] }];

  const renderItem = (item: DropdownItem) => {
    const selected = item.id === activeId;
    return (
      <div
        key={item.id}
        className="relative w-full cursor-pointer"
        style={{
          backgroundColor: selected ? 'var(--b-r03)' : 'transparent',
          transition: 'background-color 0.12s ease',
        }}
        onClick={() => {
          onSelect(item.id);
          setOpen(false);
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.backgroundColor = 'var(--b-r03)';
        }}
        onMouseLeave={(e) => {
          if (!selected) (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent';
        }}
      >
        <div className="flex items-center gap-[8px]" style={{ padding: '7px 16px' }}>
          {item.icon && (
            <CdnIcon name={item.icon} size={20} color={item.iconColor ?? 'var(--text-n9)'} />
          )}
          <span
            className="flex-1 min-w-0 font-['Delight',-apple-system,BlinkMacSystemFont,sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] truncate"
          >
            {item.label}
          </span>
          {selected && (
            <CdnIcon name="check-l1" size={16} color="var(--main-m1)" />
          )}
        </div>
      </div>
    );
  };

  return (
    <div ref={ref} className="relative min-w-0">
      <div className="cursor-pointer min-w-0" onClick={() => setOpen(v => !v)}>
        {trigger}
      </div>
      {open && (
        <div
          className="absolute top-full mt-[4px] z-50 flex flex-col"
          style={{
            backgroundColor: 'var(--b0-container)',
            padding: '8px 0',
            borderRadius: 'var(--radius-ct-m)',
            boxShadow: 'var(--shadow-s)',
            width: width ?? 'auto',
            minWidth: width ?? 220,
            maxHeight: maxHeight,
            overflowY: maxHeight ? 'auto' : undefined,
            ...(align === 'right' ? { right: 0 } : { left: 0 }),
          }}
        >
          {/* Border overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              border: '0.5px solid var(--line-l2)',
              borderRadius: 'var(--radius-ct-m)',
            }}
          />
          {allSections.map((section, si) => (
            <div key={si}>
              {section.title && (
                <div className="flex items-center" style={{ padding: '8px 16px 4px 16px' }}>
                  <span className="font-['Delight',-apple-system,BlinkMacSystemFont,sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]">
                    {section.title}
                  </span>
                </div>
              )}
              {section.items.map(renderItem)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
