/**
 * [INPUT]: Hash demo route, CdnIcon
 * [OUTPUT]: Demo index and skill fast-path action demo
 * [POS]: Page layer - product/design demo lab
 */

import { useEffect, useRef, useState } from 'react';
import type { Page } from '@/app/App';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { PlaybookCard, type ExplorePlaybook } from '@/app/components/shared/PlaybookCard';
import { AutomationCard, type AutomationCardData } from '@/app/components/shared/AutomationCard';
import { PLAYBOOKS_ORDERED } from '@/pages/Explore2';

type DemoSlug = 'skill-fast-path-actions' | 'recommendation-cards';
type PrivateActionType = 'ask' | 'build' | 'automation';

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

interface PrivateActionEntry {
  id: string;
  type: PrivateActionType;
  title: string;
  description: string;
  helper: string;
  cta: string;
  icon: string;
  tone: string;
  surface: string;
}

const DEMOS: DemoEntry[] = [
  {
    slug: 'skill-fast-path-actions',
    name: 'Skill Fast Path Actions',
    status: 'Draft',
    summary: 'The Ask / Build / Automation entry points offered when a skill is selected.',
    author: 'sheer-creator',
  },
  {
    slug: 'recommendation-cards',
    name: 'Recommendation Cards',
    status: 'Draft',
    summary: 'Skill recommendation row mixing Playbook cards with subscribable Automation cards.',
    author: 'sheer-creator',
  },
];

const SAMPLE_AUTOMATIONS: AutomationCardData[] = [
  {
    kind: 'normal',
    id: 'ai-diaspora',
    timestamp: 'May 8, 9:00 AM',
    source: 'ai-diaspora-tracker',
    feedName: 'nvda-social-feed',
    title: '【Recursive Superintelligence】· DeepMind + OpenAI + Salesforce alliance, exits Stealth mid-May',
    bullets: [
      '🧑 Founders: Tim Rocktäschel (fmr DeepMind), Richard Socher (fmr Salesforce), Josh Tobin & Jeff Clune (both fmr OpenAI)',
      '🏢 New company: Recursive Superintelligence — automate the full frontier AI R&D pipeline',
      '💰 Round: $500M / $4B pre-money; expected to close above $1B',
    ],
  },
  {
    kind: 'trade',
    id: 'space-rotation',
    timestamp: 'May 8, 12:00 PM',
    source: 'space-rotation',
    feedName: 'momentum-rebalancer',
    rows: [
      { ticker: 'AAPL', action: 'Buy', detail: 'weight 33.3%', dir: 'up' },
      { ticker: 'RKLB', action: 'Buy', detail: 'weight 33.3%', dir: 'up' },
      { ticker: 'NVDA', action: 'Buy', detail: 'weight 33.3%', dir: 'up' },
      { ticker: 'TSLA', action: 'Sell', detail: 'exit position', dir: 'down' },
    ],
    note: 'Rebalance: Top 3 by 63d momentum: AAPL(78.2%), RKLB(35.1%), NVDA(34.0%)',
  },
  {
    kind: 'kol',
    id: 'amzn-aws',
    timestamp: 'May 8, 12:00 PM',
    source: 'kol-signal-relay',
    feedName: 'kol-watch',
    kolName: 'Gavin Baker',
    headlineTicker: '$AMZN',
    headlineText: 'AWS CEO: "Compute demand is so excessive that we have never retired old A100s."',
    quoteTicker: '$NVDA',
    quoteSide: 'LONG',
    analysis:
      'The bet is that excessive compute demand keeps old GPUs in service and supports AI-infra capacity providers. No risk view is stated.',
  },
];

const PRIVATE_ACTIONS: PrivateActionEntry[] = [
  {
    id: 'ask',
    type: 'ask',
    title: 'Ask first',
    description: 'Get a quick answer using this skill without creating a shareable asset.',
    helper: 'Private answer. No Playbook is created.',
    cta: 'Ask',
    icon: 'chat-l1',
    tone: 'var(--main-m2)',
    surface: 'var(--main-m2-10)',
  },
  {
    id: 'build',
    type: 'build',
    title: 'Build a Playbook',
    description: 'Start the longer creation flow only when the user wants a reusable dashboard.',
    helper: 'Creates a draft Playbook that can later be shared.',
    cta: 'Build',
    icon: 'skill-l',
    tone: 'var(--text-n9)',
    surface: 'var(--grey-g02)',
  },
  {
    id: 'automation',
    type: 'automation',
    title: 'Create an automation',
    description: 'Set a private reminder or recurring job from this skill.',
    helper: 'Private automation. Not shareable.',
    cta: 'Automate',
    icon: 'clock-l',
    tone: 'var(--main-m3)',
    surface: 'var(--main-m3-10)',
  },
];

function IconPath({ d }: { d: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <div ref={containerRef} className="fixed bottom-[24px] right-[24px] z-[99999] flex flex-col items-end gap-[10px] font-['Delight',sans-serif] max-sm:bottom-[16px] max-sm:right-[16px]">
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

      <div className="flex flex-col items-stretch gap-[10px]">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-[40px] w-[228px] max-w-[calc(100vw_-_32px)] items-center justify-center gap-[8px] rounded-[8px] border border-[rgba(0,0,0,0.9)] bg-[rgba(0,0,0,0.9)] px-[14px] font-['Delight',sans-serif] text-[13px] font-medium leading-[22px] tracking-[0.13px] text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-transform hover:-translate-y-[1px]"
          aria-expanded={open}
          aria-pressed={open}
        >
          <IconPath d="M5 7h14M5 12h14M5 17h14" />
          <span className="min-w-0 truncate">{activeDemo?.name ?? 'Demos'}</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            onNavigate('new-chat');
          }}
          className="flex h-[40px] w-[228px] max-w-[calc(100vw_-_32px)] items-center justify-center gap-[8px] rounded-[8px] border border-[rgba(0,0,0,0.12)] bg-white px-[14px] font-['Delight',sans-serif] text-[13px] font-medium leading-[22px] tracking-[0.13px] text-[var(--text-n9)] shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-transform hover:-translate-y-[1px]"
        >
          <IconPath d="M19 12H5M11 6l-6 6 6 6" />
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
            className="group flex min-h-[72px] w-full items-center justify-between gap-[24px] border-0 border-t border-solid border-[var(--line-l2)] bg-transparent px-0 py-[20px] text-left text-[inherit] transition-opacity first:border-t-0 hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--main-m1)]"
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

function SkillFastPathActionsDemo() {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[8px]">
        <h2 className="m-0 font-['Delight',sans-serif] text-[22px] font-medium leading-[32px] tracking-[0.22px] text-[var(--text-n9)]">
          Skill fast-path actions
        </h2>
        <p className="m-0 max-w-[64ch] font-['Delight',sans-serif] text-[14px] leading-[24px] tracking-[0.14px] text-[var(--text-n7)]">
          When a skill is selected, these are the entry points to offer up front — so the user can pick intent before the long creation flow. None of them are shareable Playbook cards.
        </p>
      </div>

      <div className="grid gap-[12px] [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
        {PRIVATE_ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            className="group flex min-h-[148px] flex-col justify-between rounded-[8px] border border-[var(--line-l07)] bg-white p-[16px] text-left transition-colors hover:border-[var(--line-l12)] hover:bg-[var(--grey-g01)]"
          >
            <span className="flex items-start justify-between gap-[12px]">
              <span className="flex min-w-0 items-center gap-[9px]">
                <span
                  className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[6px]"
                  style={{ background: action.surface }}
                >
                  <CdnIcon name={action.icon} size={16} color={action.tone} />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="font-['Delight',sans-serif] text-[13px] font-medium leading-[22px] tracking-[0.13px] text-[var(--text-n9)]">
                    {action.title}
                  </span>
                  <span className="line-clamp-1 font-['Delight',sans-serif] text-[11px] leading-[16px] tracking-[0.11px] text-[var(--text-n5)]">
                    {action.helper}
                  </span>
                </span>
              </span>
              <span className="shrink-0 text-[var(--text-n5)] transition-transform group-hover:translate-x-[2px]">
                <IconPath d="M5 12h14M13 6l6 6-6 6" />
              </span>
            </span>

            <span className="mt-[12px] flex flex-col gap-[10px]">
              <span className="line-clamp-2 font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n7)]">
                {action.description}
              </span>
              <span
                className="w-fit rounded-[4px] px-[7px] py-[3px] font-['Delight',sans-serif] text-[11px] font-medium leading-[16px] tracking-[0.11px]"
                style={{ background: action.surface, color: action.tone }}
              >
                {action.cta}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function RecommendationCardsDemo() {
  const playbooks = PLAYBOOKS_ORDERED.slice(0, 3);
  const items: Array<{ type: 'pb'; pb: ExplorePlaybook } | { type: 'auto'; a: AutomationCardData }> = [];
  const max = Math.max(playbooks.length, SAMPLE_AUTOMATIONS.length);
  for (let i = 0; i < max; i++) {
    if (playbooks[i]) items.push({ type: 'pb', pb: playbooks[i] });
    if (SAMPLE_AUTOMATIONS[i]) items.push({ type: 'auto', a: SAMPLE_AUTOMATIONS[i] });
  }

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[8px]">
        <h2 className="m-0 font-['Delight',sans-serif] text-[22px] font-medium leading-[32px] tracking-[0.22px] text-[var(--text-n9)]">
          Recommendation cards — Playbook × Automation
        </h2>
        <p className="m-0 max-w-[68ch] font-['Delight',sans-serif] text-[14px] leading-[24px] tracking-[0.14px] text-[var(--text-n7)]">
          The skill recommendation row can be hand-configured as all Playbooks, all Automations, or a mix. Automation cards reuse the Playbook card shell, swap the cover for a push preview, and put Get Alerts (subscribe) in the footer. Playbook cards are unchanged.
        </p>
      </div>

      <div className="grid gap-[12px] [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]">
        {items.map((it, i) =>
          it.type === 'pb' ? (
            <PlaybookCard key={it.pb.id} p={it.pb} staggerMs={i * 200} hideTags />
          ) : (
            <AutomationCard key={it.a.id} a={it.a} defaultOn={i === 1} />
          ),
        )}
      </div>
    </div>
  );
}

export default function Demo({ onNavigate, demoId }: DemoProps) {
  const activeSlug: DemoSlug | undefined =
    demoId === 'skill-fast-path-actions' || demoId === 'skill-intent-cards'
      ? 'skill-fast-path-actions'
      : demoId === 'recommendation-cards'
        ? 'recommendation-cards'
        : undefined;
  const activeDemo = DEMOS.find((demo) => demo.slug === activeSlug);

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex min-h-screen w-full max-w-[1024px] flex-col px-[20px] py-[28px] sm:px-[40px] sm:py-[40px]">
        {activeDemo?.slug === 'skill-fast-path-actions' ? (
          <SkillFastPathActionsDemo />
        ) : activeDemo?.slug === 'recommendation-cards' ? (
          <RecommendationCardsDemo />
        ) : (
          <DemoIndex onNavigate={onNavigate} />
        )}
      </main>
      <DemoFloatingSwitcher activeSlug={activeSlug} onNavigate={onNavigate} />
    </div>
  );
}
