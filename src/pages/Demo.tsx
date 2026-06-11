/**
 * [INPUT]: Hash demo route
 * [OUTPUT]: Demo index and automation popover layout demo
 * [POS]: Page layer - product/design demo lab
 */

import { useEffect, useRef, useState } from 'react';
import type { Page } from '@/app/App';
import { AutomationPopoverDemo } from '@/app/components/demo/AutomationPopoverDemo';
import { DEMO_AUTHORS } from '@/data/demo-authors.generated';

type DemoSlug = 'automation-popover';

interface DemoProps {
  onNavigate: (page: Page) => void;
  demoId?: string;
}

interface DemoEntry {
  slug: DemoSlug;
  name: string;
  status: string;
  summary: string;
  author: string;
}

const DEMOS: DemoEntry[] = [
  {
    slug: 'automation-popover',
    name: 'Automation Popover Layouts',
    status: 'Draft',
    summary: 'Three layout options for the automations hover card on the playbook header pill.',
    author: DEMO_AUTHORS['automation-popover'] ?? 'sheer-creator',
  },
];

function IconPath({ d, size = 16 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d={d} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function demoPath(slug: DemoSlug): Page {
  return `demo/${slug}` as Page;
}

function DemoFloatingSwitcher({ activeSlug, onNavigate }: { activeSlug?: string; onNavigate: (page: Page) => void }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeDemo = DEMOS.find((demo) => demo.slug === activeSlug);
  const indexActive = !activeSlug;

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && containerRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="fixed bottom-[16px] right-[16px] z-[99999] flex flex-col items-end gap-[8px] font-['Delight',sans-serif]">
      {open && (
        <div
          className="w-[520px] max-w-[calc(100vw_-_32px)] rounded-[8px] border border-[rgba(0,0,0,0.12)] bg-white p-[8px] shadow-[0_12px_32px_rgba(0,0,0,0.16)]"
          role="menu"
          aria-label="Switch demo"
        >
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onNavigate('demo');
            }}
            className="flex w-full flex-col items-start rounded-[6px] px-[10px] py-[9px] text-left transition-colors hover:bg-[var(--grey-g01)]"
            style={{ background: indexActive ? 'var(--main-m1-10)' : undefined }}
          >
            <span className="flex w-full items-center justify-between gap-[12px]">
              <span className="font-['Delight',sans-serif] text-[13px] leading-[22px] tracking-[0.13px] text-[var(--text-n9)]">
                Demo index
              </span>
              {indexActive && (
                <span className="shrink-0 font-['Delight',sans-serif] text-[10px] leading-[14px] tracking-[0.1px] text-[var(--main-m1)]">
                  Current
                </span>
              )}
            </span>
            <span className="max-w-full truncate font-['Delight',sans-serif] text-[12px] leading-[18px] tracking-[0.12px] text-[var(--text-n5)]">
              All available product demos
            </span>
          </button>

          <div className="my-[6px] h-px bg-[var(--line-l05)]" />

          {DEMOS.map((demo) => {
            const active = demo.slug === activeSlug;
            return (
              <button
                key={demo.slug}
                type="button"
                onClick={() => {
                  setOpen(false);
                  onNavigate(demoPath(demo.slug));
                }}
                className="flex w-full flex-col items-start rounded-[6px] px-[10px] py-[9px] text-left transition-colors hover:bg-[var(--grey-g01)]"
                style={{ background: active ? 'var(--main-m1-10)' : undefined }}
              >
                <span className="flex w-full items-center justify-between gap-[12px]">
                  <span className="font-['Delight',sans-serif] text-[13px] leading-[22px] tracking-[0.13px] text-[var(--text-n9)]">
                    {demo.name}
                  </span>
                  {active && (
                    <span className="shrink-0 font-['Delight',sans-serif] text-[10px] leading-[14px] tracking-[0.1px] text-[var(--main-m1)]">
                      Current
                    </span>
                  )}
                </span>
                <span className="max-w-full truncate font-['Delight',sans-serif] text-[12px] leading-[18px] tracking-[0.12px] text-[var(--text-n5)]">
                  {demo.summary}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className="flex flex-col items-end gap-[8px]">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-[30px] w-auto max-w-[min(210px,calc(100vw_-_32px))] items-center justify-center gap-[6px] rounded-full border border-[rgba(0,0,0,0.9)] bg-[rgba(0,0,0,0.9)] px-[11px] font-['Delight',sans-serif] text-[12px] font-medium leading-[18px] tracking-[0.12px] text-white shadow-[0_4px_12px_rgba(0,0,0,0.10)] transition-transform hover:-translate-y-[1px]"
          aria-expanded={open}
          aria-pressed={open}
        >
          <IconPath d="M5 7h14M5 12h14M5 17h14" size={13} />
          <span className="min-w-0 truncate">{activeDemo?.name ?? 'Demos'}</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            onNavigate('new-chat');
          }}
          className="flex h-[30px] w-auto max-w-[min(210px,calc(100vw_-_32px))] items-center justify-center gap-[6px] rounded-full border border-[rgba(0,0,0,0.12)] bg-white px-[11px] font-['Delight',sans-serif] text-[12px] font-medium leading-[18px] tracking-[0.12px] text-[var(--text-n9)] shadow-[0_4px_12px_rgba(0,0,0,0.10)] transition-transform hover:-translate-y-[1px]"
        >
          <IconPath d="M19 12H5M11 6l-6 6 6 6" size={13} />
          <span className="min-w-0 truncate">Back to Alva</span>
        </button>
      </div>
    </div>
  );
}

function DemoIndex({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className="flex flex-col">
      <header className="mb-[28px]">
        <h1 className="m-0 font-['Delight',sans-serif] text-[36px] font-normal leading-[44px] tracking-[0] text-[var(--text-n9)]">
          Demo Index
        </h1>
      </header>

      <section aria-label="Demo pages">
        {DEMOS.map((demo) => (
          <button
            key={demo.slug}
            type="button"
            onClick={() => onNavigate(demoPath(demo.slug))}
            className="group flex min-h-[72px] w-full items-center justify-between gap-[24px] border-0 border-t-[0.5px] border-solid border-[var(--line-l2)] bg-transparent px-0 py-[20px] text-left text-[inherit] transition-opacity first:border-t-0 hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--main-m1)]"
          >
            <span className="flex min-w-0 flex-col items-start gap-[6px]">
              <span className="[overflow-wrap:anywhere] font-['Delight',sans-serif] text-[18px] leading-[28px] tracking-[0.18px] text-[var(--text-n9)]">
                {demo.name}
              </span>
              <span className="line-clamp-2 font-['Delight',sans-serif] text-[13px] leading-[20px] tracking-[0.13px] text-[var(--text-n7)]">
                {demo.summary}
              </span>
            </span>
            <span className="shrink-0 font-['Delight',sans-serif] text-[12px] leading-[18px] tracking-[0.12px] text-[var(--text-n5)]">
              @{demo.author}
            </span>
          </button>
        ))}
      </section>
    </div>
  );
}

export default function Demo({ onNavigate, demoId }: DemoProps) {
  const activeSlug: DemoSlug | undefined = demoId === 'automation-popover' ? 'automation-popover' : undefined;
  const activeDemo = DEMOS.find((demo) => demo.slug === activeSlug);

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex min-h-screen w-full max-w-[1024px] flex-col px-[20px] py-[28px] sm:px-[40px] sm:py-[40px]">
        {activeDemo?.slug === 'automation-popover' ? (
          <AutomationPopoverDemo />
        ) : (
          <DemoIndex onNavigate={onNavigate} />
        )}
      </main>
      <DemoFloatingSwitcher activeSlug={activeSlug} onNavigate={onNavigate} />
    </div>
  );
}
