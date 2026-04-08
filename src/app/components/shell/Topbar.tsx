import { useState, useRef, useEffect, useCallback } from 'react';
import { CdnIcon } from '../shared/CdnIcon';
import { Avatar } from '../shared/Avatar';

interface TopbarProps {
  title: string;
  author?: string;
  starCount?: number;
  remixCount?: number;
  commentCount?: number;
  /** 用于 Remix 提示文案，例如 @ivan/geopolitical-risk */
  playbookRef?: string;
  /** 「Start Remixing」跳转的云端 Agent 地址 */
  remixAgentUrl?: string;
}

const COPY_FEEDBACK_MS = 2000;

function buildRemixPrompt(playbookRef: string) {
  return `Remix Playbook(${playbookRef}):

If you have the Alva skill → use it to build my own version.
If not → install it first: npx skills add https://github.com/alva-ai/skills

Then:
1. Customize it based on my preferences
2. Deploy as a new playbook under my account
3. If I don't specify what to change, ask me what I'd like to customize.`;
}

function RemixPromptBody({ playbookRef }: { playbookRef: string }) {
  return (
    <div className="w-full font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n7)]">
      <p className="mb-0">Remix Playbook({playbookRef}):</p>
      <p className="mb-0">&nbsp;</p>
      <p className="mb-0">If you have the Alva skill → use it to build my own version.</p>
      <p className="mb-0">If not → install it first: npx skills add https://github.com/alva-ai/skills</p>
      <p className="mb-0">&nbsp;</p>
      <p className="mb-0">Then:</p>
      <p className="mb-0">1. Customize it based on my preferences</p>
      <p className="mb-0">2. Deploy as a new playbook under my account</p>
      <p className="mb-0">{`3. If I don't specify what to change, ask me what I'd like to customize.`}</p>
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

function IconButton({
  children,
  label,
  active,
}: {
  children: React.ReactNode;
  label?: string | number;
  /** 选中 / 菜单展开等激活态：底 m1-10，由子级图标自行着色 */
  active?: boolean;
}) {
  return (
    <div
      className={`flex gap-[4px] h-[32px] items-center justify-center overflow-clip px-[8px] py-[6px] rounded-[6px] shrink-0 cursor-pointer transition-colors ${
        active ? 'bg-[var(--main-m1-10)]' : 'hover:bg-black/[0.04]'
      }`}
    >
      <div className="flex items-center overflow-clip shrink-0">
        <div className="shrink-0 size-[16px]">{children}</div>
      </div>
      {label !== undefined && (
        <p
          className={`font-['Delight',sans-serif] leading-[20px] text-[12px] tracking-[0.12px] whitespace-nowrap ${
            active ? 'text-[var(--main-m1)]' : 'text-[var(--text-n9)]'
          }`}
        >
          {label}
        </p>
      )}
    </div>
  );
}

export function Topbar({
  title,
  author = 'YGGYLL',
  starCount,
  remixCount,
  commentCount,
  playbookRef = '@ivan/geopolitical-risk',
  remixAgentUrl = 'https://app.alva.xyz',
}: TopbarProps) {
  const [remixOpen, setRemixOpen] = useState(false);
  const [ownAgentOpen, setOwnAgentOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const remixWrapRef = useRef<HTMLDivElement>(null);
  const remixPrompt = buildRemixPrompt(playbookRef);

  const closeRemix = useCallback(() => {
    setRemixOpen(false);
    setOwnAgentOpen(false);
    setCopied(false);
  }, []);

  useEffect(() => {
    if (!remixOpen) return;
    const onDown = (e: MouseEvent) => {
      if (remixWrapRef.current && !remixWrapRef.current.contains(e.target as Node)) {
        closeRemix();
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [remixOpen, closeRemix]);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(remixPrompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex gap-[12px] h-[56px] items-center py-[10px] sticky top-0 shrink-0 w-full z-10 bg-[var(--b0-page)] text-[var(--text-n9)]">
      {/* Left: avatar + author + dot + title + status */}
      <div className="flex flex-1 gap-[4px] items-center min-h-px min-w-px">
        <div className="shrink-0 size-[20px]">
          <Avatar name={author} size={20} />
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
        <div ref={remixWrapRef} className="relative shrink-0">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setRemixOpen(o => !o)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setRemixOpen(o => !o);
              }
            }}
            aria-expanded={remixOpen}
            aria-haspopup="dialog"
            aria-pressed={remixOpen}
          >
            <IconButton label={remixCount ?? 56} active={remixOpen}>
              <CdnIcon name="remix-l" color={remixOpen ? 'var(--main-m1)' : undefined} />
            </IconButton>
          </div>
          {remixOpen && (
            <div
              className="absolute right-0 top-full mt-[6px] z-50 flex w-[480px] flex-col gap-[16px] overflow-hidden rounded-[var(--radius-pop-popover)] p-[20px] shadow-s"
              style={{
                backgroundColor: 'var(--b0-container)',
                border: '0.5px solid var(--line-l2)',
              }}
              role="dialog"
              aria-label="Remix this Playbook"
            >
              <h2 className="relative w-full min-w-0 font-['Delight',sans-serif] font-medium text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)]">
                Remix this Playbook
              </h2>
              <p className="relative w-full min-w-0 font-['Delight',sans-serif] text-[14px] font-normal leading-[22px] tracking-[0.14px] text-[var(--text-n9)]">
                Create your own version — customize the data, layout, and style to fit your needs. Your remix will be published under your account.
              </p>
              <a
                href={remixAgentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex h-[40px] w-full shrink-0 items-center justify-center gap-[8px] rounded-[8px] px-[20px] py-[9px] font-['Delight',sans-serif] font-medium text-[14px] leading-[22px] tracking-[0.14px] text-white no-underline transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--main-m1)' }}
                onClick={() => setRemixOpen(false)}
              >
                <CdnIcon name="remix-l" size={18} color="#ffffff" />
                Start Remixing
              </a>
              <div className="relative flex w-full flex-col">
                <div className="relative flex w-full items-center gap-[8px]">
                  <div className="h-px min-w-0 flex-1 bg-[var(--line-l05)]" aria-hidden />
                  <button
                    type="button"
                    className="flex shrink-0 cursor-pointer items-center gap-[4px] rounded-[6px] bg-transparent py-[2px] font-['Delight',sans-serif] text-[12px] font-normal leading-[20px] tracking-[0.12px] text-[var(--text-n5)] outline-none hover:opacity-80"
                    onClick={() => setOwnAgentOpen(o => !o)}
                    aria-expanded={ownAgentOpen}
                  >
                    <span className="whitespace-nowrap">Or use your own agent</span>
                    <span
                      className="flex size-[12px] shrink-0 items-center justify-center transition-transform duration-300 ease-out"
                      style={{ transform: ownAgentOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                      aria-hidden
                    >
                      <CdnIcon name="arrow-down-l2" size={12} color="rgba(0,0,0,0.5)" />
                    </span>
                  </button>
                  <div className="h-px min-w-0 flex-1 bg-[var(--line-l05)]" aria-hidden />
                </div>
                <div
                  className={`grid w-full transition-[grid-template-rows,margin-top] duration-300 ease-out ${ownAgentOpen ? 'grid-rows-[1fr] mt-[16px]' : 'grid-rows-[0fr] mt-0'}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div
                      className={`relative flex w-full flex-col gap-[16px] rounded-[6px] px-[20px] py-[16px] transition-opacity duration-300 ease-out ${ownAgentOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                      style={{ backgroundColor: 'var(--b-r03)' }}
                      aria-hidden={!ownAgentOpen}
                    >
                      <div className="max-h-[240px] min-h-0 w-full overflow-y-auto">
                        <RemixPromptBody playbookRef={playbookRef} />
                      </div>
                      <button
                        type="button"
                        className="flex h-[40px] w-full shrink-0 cursor-pointer items-center justify-center gap-[8px] rounded-[8px] border-[0.5px] border-solid border-[var(--line-l3)] bg-transparent px-[20px] py-[9px] font-['Delight',sans-serif] text-[14px] font-medium leading-[22px] tracking-[0.14px] text-[var(--text-n9)] transition-[border-color,background-color] duration-200 ease-in-out hover:border-[var(--text-n9)] active:border-[var(--line-l3)] active:bg-[var(--b-r02)]"
                        onClick={copyPrompt}
                        tabIndex={ownAgentOpen ? undefined : -1}
                      >
                        {copied ? (
                          <CdnIcon name="check-l1" size={18} color="var(--main-m1)" />
                        ) : (
                          <CdnIcon name="copy-l" size={18} color="rgba(0,0,0,0.9)" />
                        )}
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
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
