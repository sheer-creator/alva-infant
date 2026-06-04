import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { Avatar } from '@/app/components/shared/Avatar';

const FONT = "'Delight', sans-serif";
const HERO_WIDTH = 898;

type Skill = {
  id: string;
  label: string;
  icon?: string;
  avatar?: string;
  title: string;
  prompts: string[];
};

type Playbook = {
  title: string;
  desc: string;
  author: string;
  cover: string;
  tags: string[];
  views?: string;
  remixes?: number;
  price?: string;
};

const SKILLS: Skill[] = [
  {
    id: 'theme-tracker',
    label: 'Theme Tracker',
    icon: 'buld-l',
    title: 'Theme Tracker Header',
    prompts: [
      'Build a theme tracker for AI infrastructure covering NVDA, AVGO, TSM, and power grid names',
      'Track the obesity drug theme (LLY, NVO, AMGN) and surface weekly sentiment shifts',
      'Watch nuclear-renaissance equities and flag any catalyst from the DOE / regulators',
    ],
  },
  {
    id: 'smart-screener',
    label: 'Smart Screener',
    icon: 'target-l2',
    title: 'Smart Screener Header',
    prompts: [
      'Build a theme tracker for AI infrastructure covering NVDA, AVGO, TSM, and power grid names',
      'Track the obesity drug theme (LLY, NVO, AMGN) and surface weekly sentiment shifts',
      'Watch nuclear-renaissance equities and flag any catalyst from the DOE / regulators',
    ],
  },
  { id: 'deep-dive', label: 'Deep Dive', icon: 'search-l', title: 'Deep Dive Header', prompts: [] },
  { id: 'daily-macro-brief', label: 'Daily Macro Brief', avatar: 'Macro Scope X', title: 'Daily Macro Brief Header', prompts: [] },
  { id: 'earnings-edge', label: 'Earnings Edge', avatar: 'Smart Jing', title: 'Earnings Edge Header', prompts: [] },
  { id: 'crypto-pulse', label: 'Crypto Pulse', avatar: 'Harry Zzz', title: 'Crypto Pulse Header', prompts: [] },
  { id: 'what-if', label: 'What If', icon: 'remix-l', title: 'What If Header', prompts: [] },
  { id: 'yield-hunter', label: 'Yield Hunter', icon: 'coin-l', title: 'Yield Hunter Header', prompts: [] },
  { id: 'dividend-diary', label: 'Dividend Diary', avatar: 'Dividend Diary', title: 'Dividend Diary Header', prompts: [] },
  { id: 'daily-macro-brief-2', label: 'Daily Macro Brief', avatar: 'Macro Brief', title: 'Daily Macro Brief Header', prompts: [] },
];

const TRENDING_FILTERS = [
  'Smart Screener',
  'Theme Tracker',
  'Backtest',
  'AI Digest',
  'Asset Deepdive',
  'Crypto',
  'BTC',
  'Thesis',
  'Tech',
  'Equity',
  'What-if',
  'NVDA',
  'Macro',
  'Healthcare',
  'ETH',
  'Energy',
];

const COVERS = [
  'https://www.figma.com/api/mcp/asset/b3328a7e-2f8c-4044-8331-3dc9d3e17109',
  'https://www.figma.com/api/mcp/asset/8f6c6be3-db9e-4aaa-adf4-05660f589412',
  'https://www.figma.com/api/mcp/asset/b1024bc9-fa26-41fe-8fd1-31ab33302877',
  'https://www.figma.com/api/mcp/asset/755f4107-5be3-4487-b442-34aaad90381b',
  'https://www.figma.com/api/mcp/asset/f7e8e4f8-3dfb-4aa8-b63d-549c81d5262a',
  'https://www.figma.com/api/mcp/asset/21255fb8-4a0a-4650-86e1-add9ed0fc8da',
  'https://www.figma.com/api/mcp/asset/4903081b-ae4d-4a9d-bac3-eca41290f3d2',
  'https://www.figma.com/api/mcp/asset/f35dc076-df44-4029-b5ac-136b3a10bfac',
  'https://www.figma.com/api/mcp/asset/d50f361c-8e97-46ef-b2e3-ede16dbff5d2',
  'https://www.figma.com/api/mcp/asset/1b5223b9-b41c-4716-8fb7-28af8674e334',
  'https://www.figma.com/api/mcp/asset/14d4137b-6121-4308-993b-8d7be1dbe99d',
  'https://www.figma.com/api/mcp/asset/f7754975-de0a-45f3-b3df-92720d40f2bb',
];

const SELECTED_COVERS = [
  'https://www.figma.com/api/mcp/asset/504d280d-bab8-4de7-931a-e565dbbc256b',
  'https://www.figma.com/api/mcp/asset/585c9109-5a25-4182-a1ce-fe575eb3f3f7',
  'https://www.figma.com/api/mcp/asset/42178a9b-9a07-454c-9058-1332632714f1',
];

const PLAYBOOKS: Playbook[] = [
  {
    title: 'BTC Ultimate AI Trader',
    desc: "This strategy intelligently pinpoints BTC's optimal trading sweet spots through dual-engine analysis: RSI oversold alerts + Bollinger Band breakouts.",
    author: 'Alva Intern',
    cover: COVERS[0],
    tags: ['Screener', 'BTC'],
  },
  {
    title: 'MAG7 Equal-Weight Monthly Rebalance',
    desc: 'Maintains a fully invested equal-weight portfolio of the Magnificent 7 stocks and rebalances monthly.',
    author: 'Alva Intern',
    cover: COVERS[1],
    tags: ['What-if'],
    price: '$50',
  },
  {
    title: 'PEPE Long vs BTC Short Monthly Rebalance',
    desc: 'The OI Abnormal Movement Monitoring Strategy tracks selected crypto tokens on a 4-hour timeframe to detect unusually large changes in Open Interest.',
    author: 'Alva Intern',
    cover: COVERS[2],
    tags: ['What-if', 'PEPE', 'BTC'],
  },
  {
    title: 'Attribution Analysis Strategy for Price Trends',
    desc: 'Monitor selected tokens on a 4-hour timeframe to detect abnormal changes in Open Interest and trading volume in order to capture unusual market activity.',
    author: 'Alva Intern',
    cover: COVERS[3],
    tags: ['Thesis', 'BTC', 'ETH'],
  },
  {
    title: 'BTC MACD 1h Simple Crossover',
    desc: 'Trade BTC using MACD(12,26,9) line crossing its signal on 1-hour candles; enter long on bullish cross, exit on bearish cross.',
    author: 'Alva Intern',
    cover: COVERS[4],
    tags: ['Screener', 'BTC'],
  },
  {
    title: 'NVDA +3% Triggered TSM TP/SL',
    desc: 'Buys TSM at the close when NVDA gains >3% close-to-close, then exits on +10% take-profit or -5% stop-loss.',
    author: 'Alva Intern',
    cover: COVERS[5],
    tags: ['What-if', 'NVDA', 'TSM'],
    price: '$50',
  },
  {
    title: 'ETH Daily Price & Change Tracker',
    desc: 'Tracks daily prices and daily percentage changes for ETH in a single table for quick monitoring.',
    author: 'Alva Intern',
    cover: COVERS[6],
    tags: ['Screener', 'ETH'],
  },
  {
    title: 'Short-Squeeze Risk Map',
    desc: "This strategy intelligently pinpoints BTC's optimal trading sweet spots through dual-engine analysis.",
    author: 'Alva Intern',
    cover: COVERS[7],
    tags: ['Thesis'],
  },
  {
    title: 'NVDA Trading Strategy Research Dashboard',
    desc: 'Multi-timeframe NVDA price/volume context, trend and momentum, relative strength vs market/sector, flow and derivatives proxies.',
    author: 'Alva Intern',
    cover: COVERS[8],
    tags: ['Thesis', 'NVDA'],
  },
];

const SELECTED_PLAYBOOKS: Playbook[] = [
  {
    title: 'BTC Ultimate AI Trader',
    desc: "This strategy intelligently pinpoints BTC's optimal trading sweet spots through dual-engine analysis.",
    author: 'Alva Intern',
    cover: SELECTED_COVERS[0],
    tags: ['Screener', 'BTC'],
  },
  {
    title: 'MAG7 Equal-Weight Monthly Rebalance',
    desc: 'Maintains a fully invested equal-weight portfolio of the Magnificent 7 stocks and rebalances monthly.',
    author: 'Alva Intern',
    cover: SELECTED_COVERS[1],
    tags: ['What-if'],
  },
  {
    title: 'PEPE Long vs BTC Short Monthly Rebalance',
    desc: 'The OI Abnormal Movement Monitoring Strategy tracks selected crypto tokens on a 4-hour timeframe.',
    author: 'Alva Intern',
    cover: SELECTED_COVERS[2],
    tags: ['What-if', 'PEPE', 'BTC'],
  },
];

function TitleReveal({ text }: { text: string }) {
  const [previous, setPrevious] = useState<string | null>(null);
  const [shown, setShown] = useState(text);
  const [burst, setBurst] = useState<Array<{ x: number; y: number; s: number; d: number; r: number }>>([]);
  const prevRef = useRef(text);

  useEffect(() => {
    if (prevRef.current === text) return;
    const old = prevRef.current;
    prevRef.current = text;
    setPrevious(old);
    setShown(text);
    setBurst(
      Array.from({ length: 52 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const radiusX = 50 + Math.random() * 220;
        const radiusY = 16 + Math.random() * 48;
        return {
          x: Math.cos(angle) * radiusX,
          y: Math.sin(angle) * radiusY,
          s: 3 + Math.random() * 8,
          d: Math.random() * 180,
          r: Math.random() * 90,
        };
      }),
    );
    const t = window.setTimeout(() => {
      setPrevious(null);
      setBurst([]);
    }, 620);
    return () => window.clearTimeout(t);
  }, [text]);

  return (
    <div className="home-title-reveal">
      {previous && <h1 className="home-title home-title-out">{previous}</h1>}
      <h1 key={shown} className="home-title home-title-in">{shown}</h1>
      <div className="home-title-burst" aria-hidden>
        {burst.map((p, i) => (
          <span
            key={`${shown}-${i}`}
            className="home-title-dot"
            style={{
              '--x': `${p.x}px`,
              '--y': `${p.y}px`,
              '--s': `${p.s}px`,
              '--d': `${p.d}ms`,
              '--r': `${p.r}deg`,
            } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}

function HomeComposer({ selectedSkill, onClear }: { selectedSkill: Skill | null; onClear: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasText, setHasText] = useState(false);
  const color = hasText ? 'var(--main-m1)' : 'var(--b-r05)';

  return (
    <div className="home-composer">
      {selectedSkill && (
        <div className="home-composer-chip-row">
          <span className="home-composer-chip">
            <span className="home-composer-chip-icon">
              {selectedSkill.avatar ? (
                <Avatar name={selectedSkill.avatar} size={18} />
              ) : (
                <CdnIcon name={selectedSkill.icon || 'target-l2'} size={14} color="var(--main-m1)" />
              )}
            </span>
            <span>{selectedSkill.label}</span>
            <button type="button" aria-label="Remove selected skill" onClick={onClear}>
              <CdnIcon name="close-l1" size={12} color="var(--text-n5)" />
            </button>
          </span>
        </div>
      )}
      <div className="home-composer-editor-wrap">
        {!hasText && (
          <div className="home-composer-placeholder">
            Ask Alva anything. @ for context, / for skills
          </div>
        )}
        <div
          ref={ref}
          className="home-composer-editor"
          contentEditable
          suppressContentEditableWarning
          onInput={() => setHasText(Boolean(ref.current?.textContent?.trim()))}
        />
      </div>
      <div className="home-composer-toolbar">
        <button type="button" aria-label="Add context" className="home-icon-button">
          <CdnIcon name="add-l2" size={16} color="var(--text-n7)" />
        </button>
        <div className="home-model-picker">
          <span>Sonnet 4.6</span>
          <CdnIcon name="arrow-down-f2" size={12} color="var(--text-n2)" />
        </div>
        <button type="button" aria-label="Send" className="home-send-button" style={{ background: color }}>
          <CdnIcon name="arrow-up-l1" size={14} color={hasText ? '#fff' : 'var(--text-n3)'} />
        </button>
      </div>
    </div>
  );
}

function SkillPill({ skill, active, onClick }: { skill: Skill; active: boolean; onClick: () => void }) {
  return (
    <button type="button" className={`home-skill-pill ${active ? 'is-active' : ''}`} onClick={onClick}>
      {skill.avatar ? (
        <Avatar name={skill.avatar} size={22} />
      ) : (
        <CdnIcon name={skill.icon || 'target-l2'} size={18} color={active ? '#fff' : 'var(--text-n9)'} />
      )}
      <span>{skill.label}</span>
    </button>
  );
}

function PromptRow({ text }: { text: string }) {
  return (
    <button type="button" className="home-prompt-row">
      <span>{text}</span>
      <CdnIcon name="arrow-turn-down-left-l" size={14} color="var(--text-n5)" />
    </button>
  );
}

function Tag({ label }: { label: string }) {
  const isTicker = label.length <= 5 && label === label.toUpperCase();
  return (
    <span className="home-card-tag">
      <CdnIcon name={isTicker ? 'coin-l' : label === 'Screener' ? 'target-l2' : 'remix-l'} size={12} color="var(--text-n5)" />
      {label}
    </span>
  );
}

function LibraryCard({ playbook }: { playbook: Playbook }) {
  return (
    <article className="home-playbook-card">
      <div className="home-card-cover">
        <img src={playbook.cover} alt="" loading="lazy" />
      </div>
      {playbook.price && (
        <div className="home-price-tag">
          <CdnIcon name="locked-f" size={14} color="#fff" />
          {playbook.price}
        </div>
      )}
      <div className="home-card-body">
        <div className="home-card-tags">
          {playbook.tags.slice(0, 3).map((tag) => <Tag key={tag} label={tag} />)}
        </div>
        <div className="home-card-copy">
          <h3>{playbook.title}</h3>
          <p>{playbook.desc}</p>
        </div>
        <div className="home-card-meta">
          <span className="home-author">
            <Avatar name={playbook.author} size={18} />
            {playbook.author}
          </span>
          <span><CdnIcon name="show-l" size={14} />{playbook.views || '12.8K'}</span>
          <span><CdnIcon name="remix-l" size={14} />{playbook.remixes ?? 3}</span>
        </div>
      </div>
    </article>
  );
}

function TrendingSection({ topOffset = false }: { topOffset?: boolean }) {
  return (
    <section className={`home-trending ${topOffset ? 'with-offset' : ''}`}>
      <div className="home-section-head">
        <h2>Trending Playbooks</h2>
        <button type="button">View all <CdnIcon name="arrow-right-l2" size={14} color="var(--text-n9)" /></button>
      </div>
      <div className="home-filter-row">
        {TRENDING_FILTERS.map((filter, index) => {
          const isActive = index === 0 || index === 1 || index === 3;
          return (
            <button key={filter} type="button" className={isActive ? 'is-active' : ''}>{filter}</button>
          );
        })}
        <span className="home-filter-divider" aria-hidden />
        <button type="button" className="home-sort-button">Popular <CdnIcon name="arrow-down-f2" size={12} color="var(--text-n9)" /></button>
      </div>
      <div className="home-card-grid">
        {PLAYBOOKS.map((playbook) => <LibraryCard key={playbook.title} playbook={playbook} />)}
      </div>
    </section>
  );
}

export default function Home({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedSkill = useMemo(
    () => SKILLS.find((skill) => skill.id === selectedId) || null,
    [selectedId],
  );

  useEffect(() => {
    const reset = () => setSelectedId(null);
    window.addEventListener('alva:new-chat', reset);
    return () => window.removeEventListener('alva:new-chat', reset);
  }, []);

  const title = selectedSkill ? selectedSkill.title : 'Turn Ideas into Live Investing Playbooks in Minutes';
  const prompts = selectedSkill?.prompts.length ? selectedSkill.prompts : SKILLS[1].prompts;

  return (
    <AppShell activePage="home" onNavigate={onNavigate}>
      <style>{`
        .home-new-chat-page{
          height:100vh;
          overflow-y:auto;
          background:#fff;
          color:var(--text-n9);
          font-family:${FONT};
        }
        .home-topbar{
          position:sticky;
          top:0;
          z-index:5;
          height:40px;
          display:flex;
          align-items:center;
          padding:14px 20px 0;
          background:rgba(255,255,255,0.92);
          backdrop-filter:blur(8px);
        }
        .home-thread-trigger{
          display:flex;
          align-items:center;
          gap:4px;
          border:0;
          background:transparent;
          padding:0;
          color:var(--text-n9);
          font-family:${FONT};
          font-size:12px;
          line-height:20px;
          letter-spacing:0;
          cursor:pointer;
        }
        .home-hero{
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:24px;
          padding:24px 24px 0;
        }
        .home-title-reveal{
          position:relative;
          width:min(100%, 960px);
          min-height:38px;
          display:flex;
          align-items:center;
          justify-content:center;
          overflow:visible;
        }
        .home-title{
          margin:0;
          max-width:640px;
          text-align:center;
          font-family:${FONT};
          font-size:28px;
          line-height:38px;
          font-weight:400;
          letter-spacing:0.28px;
          color:var(--text-n9);
        }
        .home-title-out{
          position:absolute;
          inset:auto 0;
          animation:home-title-out 360ms cubic-bezier(0.4,0,0.2,1) both;
        }
        .home-title-in{
          animation:home-title-in 420ms cubic-bezier(0.4,0,0.2,1) both;
        }
        .home-title-burst{
          position:absolute;
          left:50%;
          top:50%;
          width:0;
          height:0;
          pointer-events:none;
          overflow:visible;
        }
        .home-title-dot{
          position:absolute;
          left:0;
          top:0;
          width:var(--s);
          height:var(--s);
          border-radius:3px;
          background:#111;
          opacity:0;
          transform:translate(-50%,-50%) rotate(var(--r));
          animation:home-title-dot 420ms ease-out var(--d) both;
        }
        @keyframes home-title-in{from{opacity:0;filter:blur(2px);transform:translateY(4px)}to{opacity:1;filter:blur(0);transform:translateY(0)}}
        @keyframes home-title-out{from{opacity:1;filter:blur(0);transform:translateY(0)}to{opacity:0;filter:blur(2px);transform:translateY(-4px)}}
        @keyframes home-title-dot{0%{opacity:0;transform:translate(-50%,-50%) scale(.7) rotate(var(--r))}35%{opacity:.9}100%{opacity:0;transform:translate(calc(var(--x) - 50%), calc(var(--y) - 50%)) scale(.15) rotate(calc(var(--r) + 60deg))}}
        .home-composer{
          width:min(100%, ${HERO_WIDTH}px);
          min-height:104px;
          display:flex;
          flex-direction:column;
          gap:12px;
          padding:16px;
          border:.5px solid rgba(0,0,0,.7);
          border-radius:8px;
          background:#fff;
          overflow:hidden;
        }
        .home-composer-chip-row{
          display:flex;
          flex-wrap:wrap;
          gap:8px;
          animation:home-fade-up 220ms ease-out both;
        }
        .home-composer-chip{
          display:inline-flex;
          align-items:center;
          gap:6px;
          min-height:32px;
          padding:6px;
          border:.5px solid var(--line-l2);
          border-radius:4px;
          font-size:12px;
          line-height:20px;
          letter-spacing:0;
          color:var(--text-n9);
        }
        .home-composer-chip-icon{
          width:20px;
          height:20px;
          display:flex;
          align-items:center;
          justify-content:center;
          border-radius:2px;
          background:var(--main-m1-10);
        }
        .home-composer-chip button{
          display:flex;
          border:0;
          padding:0;
          background:transparent;
          cursor:pointer;
        }
        .home-composer-editor-wrap{
          position:relative;
          min-height:48px;
          max-height:480px;
          overflow-y:auto;
        }
        .home-composer-placeholder{
          position:absolute;
          inset:0;
          pointer-events:none;
          color:var(--text-n3);
          font-size:14px;
          line-height:22px;
          letter-spacing:0.14px;
        }
        .home-composer-editor{
          min-height:24px;
          outline:0;
          white-space:pre-wrap;
          word-break:break-word;
          font-size:14px;
          line-height:22px;
          letter-spacing:0.14px;
        }
        .home-composer-toolbar{
          height:28px;
          display:flex;
          align-items:center;
          gap:12px;
        }
        .home-icon-button,
        .home-send-button{
          width:28px;
          height:28px;
          display:flex;
          align-items:center;
          justify-content:center;
          border:0;
          border-radius:4px;
          cursor:pointer;
        }
        .home-icon-button{background:transparent}
        .home-send-button{transition:background 160ms ease}
        .home-model-picker{
          flex:1;
          display:flex;
          align-items:center;
          justify-content:flex-end;
          gap:4px;
          color:var(--text-n5);
          font-size:12px;
          line-height:20px;
          letter-spacing:0;
        }
        .home-skill-row{
          display:flex;
          flex-wrap:wrap;
          justify-content:center;
          gap:12px;
          width:min(100%, 960px);
          margin-top:0;
        }
        .home-skill-pill{
          height:40px;
          display:flex;
          align-items:center;
          gap:8px;
          padding:9px 16px;
          border:.5px solid var(--line-l2);
          border-radius:999px;
          background:#fff;
          color:var(--text-n9);
          font-family:${FONT};
          font-size:14px;
          line-height:22px;
          letter-spacing:0.14px;
          cursor:pointer;
          white-space:nowrap;
          transition:background 160ms ease, color 160ms ease, border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
        }
        .home-skill-pill:hover{
          transform:translateY(-1px);
          box-shadow:0 4px 12px rgba(0,0,0,.05);
        }
        .home-skill-pill.is-active{
          background:rgba(0,0,0,.8);
          border-color:rgba(0,0,0,.8);
          color:#fff;
        }
        .home-prompt-list{
          width:min(100%, ${HERO_WIDTH}px);
          display:flex;
          flex-direction:column;
          margin-top:-18px;
          animation:home-fade-up 260ms ease-out both;
        }
        .home-prompt-row{
          height:44px;
          display:flex;
          align-items:center;
          gap:12px;
          border:0;
          border-bottom:.5px solid var(--line-l07);
          background:transparent;
          padding:0 8px;
          color:var(--text-n9);
          font-family:${FONT};
          font-size:12px;
          line-height:20px;
          letter-spacing:0;
          text-align:left;
          cursor:pointer;
        }
        .home-prompt-row span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .home-selected-cards{
          width:min(100%, 968px);
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          gap:12px;
          animation:home-fade-up 320ms ease-out both;
        }
        .home-trending{
          width:100%;
          max-width:2048px;
          margin:0 auto;
          padding:40px clamp(16px,1.8vw,40px) 24px;
          container:home-cards / inline-size;
        }
        .home-trending.with-offset{padding-top:24px}
        .home-section-head{
          display:flex;
          align-items:center;
          gap:16px;
          margin-bottom:16px;
        }
        .home-section-head h2{
          flex:1;
          margin:0;
          color:var(--text-n9);
          font-size:20px;
          line-height:30px;
          font-weight:400;
          letter-spacing:0.2px;
        }
        .home-section-head button{
          display:flex;
          align-items:center;
          gap:4px;
          border:0;
          background:transparent;
          color:var(--text-n9);
          font-family:${FONT};
          font-size:12px;
          line-height:20px;
          letter-spacing:0.12px;
          cursor:pointer;
        }
        .home-filter-row{
          display:flex;
          align-items:center;
          gap:8px;
          height:28px;
          overflow-x:auto;
          padding-bottom:0;
          margin-bottom:24px;
        }
        .home-filter-row button{
          height:28px;
          display:flex;
          align-items:center;
          gap:4px;
          border:0;
          border-radius:16px;
          padding:4px 10px;
          background:rgba(0,0,0,.03);
          color:var(--text-n7);
          font-family:${FONT};
          font-size:12px;
          line-height:20px;
          letter-spacing:0.12px;
          white-space:nowrap;
          cursor:pointer;
        }
        .home-filter-row button.is-active{
          background:rgba(0,0,0,.7);
          color:rgba(255,255,255,.9);
        }
        .home-filter-divider{
          flex-shrink:0;
          width:1px;
          height:16px;
          background:var(--line-l07);
          margin-left:auto;
        }
        .home-filter-row .home-sort-button{
          width:100px;
          justify-content:space-between;
          border:.5px solid var(--line-l3);
          background:#fff;
          color:var(--text-n9);
          border-radius:4px;
          padding:4px 8px;
        }
        .home-filter-row .home-sort-button.is-active{
          background:#fff;
          color:var(--text-n9);
        }
        .home-card-grid{
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          gap:16px;
        }
        .home-playbook-card{
          position:relative;
          min-width:0;
          overflow:hidden;
          border:.5px solid var(--line-l3);
          border-radius:8px;
          background:#fff;
          padding:4px;
          transition:box-shadow 150ms ease, transform 150ms ease;
        }
        .home-playbook-card:hover{
          transform:translateY(-1px);
          box-shadow:var(--shadow-l);
        }
        .home-card-cover{
          aspect-ratio:472 / 265.5;
          overflow:hidden;
          border-radius:4px;
          background:var(--grey-g02);
        }
        .home-card-cover img{
          width:100%;
          height:100%;
          display:block;
          object-fit:cover;
        }
        .home-price-tag{
          position:absolute;
          top:3.5px;
          right:3.5px;
          display:flex;
          align-items:center;
          gap:4px;
          height:28px;
          padding:4px 8px;
          border-radius:0 6px 0 6px;
          background:linear-gradient(90deg,var(--main-m3),var(--main-m1));
          color:#fff;
          font-size:12px;
          line-height:20px;
        }
        .home-card-body{
          display:flex;
          flex-direction:column;
          gap:12px;
          padding:16px 8px 12px 12px;
        }
        .home-card-tags{
          display:flex;
          align-items:center;
          gap:6px;
          min-height:20px;
          overflow:hidden;
        }
        .home-card-tag{
          height:20px;
          display:inline-flex;
          align-items:center;
          gap:4px;
          padding:0 6px;
          border-radius:4px;
          background:var(--b-r05);
          color:var(--text-n7);
          font-size:12px;
          line-height:20px;
          letter-spacing:0;
          white-space:nowrap;
        }
        .home-card-copy{display:flex;flex-direction:column;gap:4px;min-width:0}
        .home-card-copy h3{
          margin:0;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          color:var(--text-n9);
          font-size:16px;
          line-height:26px;
          font-weight:400;
          letter-spacing:0;
        }
        .home-card-copy p{
          height:40px;
          margin:0;
          display:-webkit-box;
          overflow:hidden;
          -webkit-line-clamp:2;
          -webkit-box-orient:vertical;
          color:var(--text-n5);
          font-size:12px;
          line-height:20px;
          letter-spacing:0;
        }
        .home-card-meta{
          display:flex;
          align-items:center;
          gap:12px;
          min-width:0;
          color:var(--text-n9);
          font-size:12px;
          line-height:20px;
          letter-spacing:0;
        }
        .home-card-meta span{
          display:flex;
          align-items:center;
          gap:4px;
          flex-shrink:0;
        }
        .home-card-meta .home-author{
          flex:1;
          min-width:0;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        @keyframes home-fade-up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @container home-cards (min-width: 1728px){
          .home-card-grid{grid-template-columns:repeat(4,minmax(0,1fr))}
        }
        @media (max-width: 1100px){
          .home-card-grid,.home-selected-cards{grid-template-columns:repeat(2,minmax(0,1fr))}
        }
        @media (max-width: 720px){
          .home-hero{padding:34px 16px 0;gap:24px}
          .home-title{font-size:20px;line-height:28px}
          .home-card-grid,.home-selected-cards{grid-template-columns:1fr}
          .home-trending{margin-top:38px;padding-inline:16px}
          .home-skill-row{justify-content:flex-start;overflow-x:auto;flex-wrap:nowrap;padding:0 2px}
        }
      `}</style>
      <div className="home-new-chat-page">
        <div className="home-topbar">
          <button type="button" className="home-thread-trigger">
            New chat
            <CdnIcon name="arrow-down-f2" size={12} color="var(--text-n3)" />
          </button>
        </div>

        <section className="home-hero">
          <TitleReveal text={title} />
          <HomeComposer selectedSkill={selectedSkill} onClear={() => setSelectedId(null)} />
          <div className="home-skill-row">
            {SKILLS.map((skill) => (
              <SkillPill
                key={skill.id}
                skill={skill}
                active={selectedId === skill.id}
                onClick={() => setSelectedId((current) => (current === skill.id ? null : skill.id))}
              />
            ))}
            <button type="button" className="home-skill-pill">
              <span>More</span>
              <CdnIcon name="arrow-right-l2" size={14} color="var(--text-n9)" />
            </button>
          </div>

          {selectedSkill && (
            <>
              <div className="home-prompt-list">
                {prompts.slice(0, 3).map((prompt) => <PromptRow key={prompt} text={prompt} />)}
              </div>
              <div className="home-selected-cards">
                {SELECTED_PLAYBOOKS.map((playbook) => <LibraryCard key={playbook.title} playbook={playbook} />)}
              </div>
            </>
          )}
        </section>

        <TrendingSection topOffset={Boolean(selectedSkill)} />
      </div>
    </AppShell>
  );
}
