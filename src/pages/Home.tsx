import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { CHART_COLORS, AVATAR_COLOR_PALETTE, CREATOR_AVATARS } from '@/lib/chart-theme';

/* ══════ SVG MATH HELPERS ══════ */
function smoothLine(
  data: number[],
  x0: number,
  y0: number,
  w: number,
  h: number,
): string {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: x0 + (i / (data.length - 1)) * w,
    y: y0 + h - ((v - min) / range) * h * 0.85 - h * 0.06,
  }));
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const cx = (pts[i - 1].x + pts[i].x) / 2;
    const cy = (pts[i - 1].y + pts[i].y) / 2;
    d += ` Q ${pts[i - 1].x},${pts[i - 1].y} ${cx},${cy}`;
  }
  return d;
}

function areaFromLine(lp: string, x0: number, _y0: number, w: number, h: number): string {
  return `${lp} L ${x0 + w},${_y0 + h} L ${x0},${_y0 + h} Z`;
}

/* ══════ REUSABLE SVG SUB-COMPONENTS ══════ */
function Bars({
  data,
  x0,
  y0,
  w,
  h,
  color,
  opacity = 0.25,
}: {
  data: number[];
  x0: number;
  y0: number;
  w: number;
  h: number;
  color: string;
  opacity?: number;
}) {
  const max = Math.max(...data);
  const bw = (w / data.length) * 0.6;
  const gap = w / data.length;
  return (
    <>
      {data.map((v, i) => {
        const bh = (v / max) * h * 0.85;
        return (
          <rect
            key={i}
            x={x0 + i * gap + gap * 0.2}
            y={y0 + h - bh}
            width={bw}
            height={bh}
            rx={0.5}
            fill={color}
            opacity={opacity}
          />
        );
      })}
    </>
  );
}

function TextLines({
  x,
  y,
  w,
  count,
  gap = 6,
}: {
  x: number;
  y: number;
  w: number;
  count: number;
  gap?: number;
}) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <rect
          key={i}
          x={x}
          y={y + i * gap}
          width={w * (i === count - 1 ? 0.6 : 0.88)}
          height={3}
          rx={1}
          fill="rgba(0,0,0,0.08)"
        />
      ))}
    </>
  );
}

function KpiCell({
  x,
  y,
  w,
  h,
  vc,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  vc: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={1} fill="#fafafa" />
      <rect x={x + 4} y={y + 4} width={w * 0.4} height={2.5} rx={1} fill="rgba(0,0,0,0.10)" />
      <rect x={x + 4} y={y + 10} width={w * 0.55} height={4} rx={1} fill={vc} opacity={0.7} />
      <rect x={x + 4} y={y + 17} width={w * 0.3} height={2} rx={1} fill="rgba(0,0,0,0.06)" />
    </g>
  );
}

/* ══════ THUMBNAIL COMPONENTS ══════ */
const TW = 320;
const TH = 180;
const C = CHART_COLORS;

function ThumbBTC() {
  const ld = [100, 108, 103, 115, 112, 128, 135, 140, 132, 148, 155, 162, 158, 172, 180, 195, 210, 225, 238];
  const rd = [45, 52, 48, 62, 58, 70, 65, 72, 68, 55, 48, 42, 50, 58, 65, 60, 55, 48, 52];
  const l = smoothLine(ld, 8, 8, 304, 72);
  const a = areaFromLine(l, 8, 8, 304, 72);
  return (
    <svg viewBox={`0 0 ${TW} ${TH}`} preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.primary} stopOpacity={0.25} />
          <stop offset="100%" stopColor={C.primary} stopOpacity={0} />
        </linearGradient>
      </defs>
      <rect x={6} y={6} width={308} height={78} rx={3} fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth={0.5} />
      <path d={a} fill="url(#g1)" />
      <path d={l} fill="none" stroke={C.primary} strokeWidth={1.2} />
      <KpiCell x={6} y={88} w={74} h={24} vc={C.primary} />
      <KpiCell x={82} y={88} w={74} h={24} vc="#2a9b7d" />
      <KpiCell x={6} y={114} w={74} h={24} vc={C.red} />
      <KpiCell x={82} y={114} w={74} h={24} vc={C.blue} />
      <rect x={160} y={88} width={152} height={24} rx={3} fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth={0.5} />
      <path d={smoothLine(rd, 162, 89, 148, 22)} fill="none" stroke={C.orange} strokeWidth={0.8} />
      <line x1={162} y1={97} x2={308} y2={97} stroke="rgba(0,0,0,0.06)" strokeWidth={0.3} strokeDasharray="2 2" />
      <rect x={160} y={114} width={152} height={24} rx={3} fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth={0.5} />
      <TextLines x={166} y={119} w={140} count={3} gap={5} />
      <rect x={6} y={142} width={152} height={32} rx={3} fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth={0.5} />
      <TextLines x={12} y={148} w={140} count={4} gap={5} />
      <rect x={160} y={142} width={152} height={32} rx={3} fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth={0.5} />
      <path d="M 200,170 A 28,28 0 0,1 256,170" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={3} />
      <path d="M 200,170 A 28,28 0 0,1 238,150" fill="none" stroke={C.green} strokeWidth={3} strokeLinecap="round" />
      <circle cx={238} cy={150} r={2} fill={C.green} />
      <TextLines x={270} y={152} w={36} count={3} gap={5} />
    </svg>
  );
}

function ThumbMAG7() {
  const pd = [100, 105, 110, 108, 116, 122, 118, 125, 132, 128, 138, 145, 142, 150, 158, 162, 168, 175, 180, 190];
  const rv = [40, 45, 42, 50, 55, 52, 60, 65, 58, 62];
  const sp = [30, 35, 32, 38, 42, 40, 45, 48, 44, 50];
  const pl = smoothLine(pd, 8, 40, 304, 68);
  const colors = [C.primary, C.blue, C.green, C.orange, C.red, C.deepBlue];
  return (
    <svg viewBox={`0 0 ${TW} ${TH}`} preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.blue} stopOpacity={0.2} />
          <stop offset="100%" stopColor={C.blue} stopOpacity={0} />
        </linearGradient>
      </defs>
      {colors.map((color, i) => {
        const cx = 6 + i * 52;
        return (
          <g key={i}>
            <rect x={cx} y={6} width={50} height={28} rx={2} fill="#fafafa" />
            <rect x={cx + 4} y={10} width={20} height={2} rx={1} fill="rgba(0,0,0,0.10)" />
            <rect x={cx + 4} y={15} width={30} height={3.5} rx={1} fill={color} opacity={0.6} />
            <rect x={cx + 4} y={22} width={16} height={2} rx={1} fill="rgba(0,0,0,0.06)" />
          </g>
        );
      })}
      <rect x={6} y={38} width={308} height={74} rx={3} fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth={0.5} />
      <path d={areaFromLine(pl, 8, 40, 304, 68)} fill="url(#g2)" />
      <path d={pl} fill="none" stroke={C.blue} strokeWidth={1.2} />
      <rect x={6} y={116} width={152} height={58} rx={3} fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth={0.5} />
      <rect x={12} y={120} width={40} height={2.5} rx={1} fill="rgba(0,0,0,0.10)" />
      <Bars data={rv} x0={12} y0={128} w={140} h={42} color={C.primary} opacity={0.3} />
      <rect x={160} y={116} width={152} height={58} rx={3} fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth={0.5} />
      <rect x={166} y={120} width={40} height={2.5} rx={1} fill="rgba(0,0,0,0.10)" />
      <path d={smoothLine(sp, 166, 128, 140, 42)} fill="none" stroke={C.green} strokeWidth={0.9} />
      <path d={smoothLine(rv, 166, 128, 140, 42)} fill="none" stroke={C.orange} strokeWidth={0.9} opacity={0.6} />
    </svg>
  );
}

function ThumbNVDA() {
  const pd = [100, 104, 108, 106, 112, 110, 116, 114, 120, 118, 124, 122, 128, 125, 130];
  const kpiColors = [C.green, C.green, C.green, C.red, C.red];
  const l = smoothLine(pd, 210, 80, 98, 60);
  return (
    <svg viewBox={`0 0 ${TW} ${TH}`} preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.red} stopOpacity={0.18} />
          <stop offset="100%" stopColor={C.red} stopOpacity={0} />
        </linearGradient>
      </defs>
      <rect x={6} y={6} width={308} height={32} rx={3} fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth={0.5} />
      <rect x={12} y={11} width={22} height={22} rx={4} fill={C.red} opacity={0.15} />
      <text x={18} y={26} fill={C.red} fontSize={10} fontWeight={600} fontFamily="'Delight',sans-serif">
        N
      </text>
      <rect x={38} y={14} width={40} height={3.5} rx={1} fill="rgba(0,0,0,0.14)" />
      <rect x={38} y={21} width={24} height={2.5} rx={1} fill="rgba(0,0,0,0.07)" />
      <rect x={240} y={13} width={36} height={5} rx={1} fill={C.green} opacity={0.5} />
      <rect x={280} y={14} width={24} height={3} rx={1} fill={C.green} opacity={0.3} />
      {kpiColors.map((color, i) => {
        const cx = 6 + i * 62;
        return (
          <g key={i}>
            <rect x={cx} y={42} width={58} height={22} rx={2} fill="#fafafa" />
            <rect x={cx + 4} y={46} width={16} height={2} rx={1} fill="rgba(0,0,0,0.10)" />
            <rect x={cx + 4} y={52} width={28} height={3} rx={1} fill={color} opacity={0.5} />
          </g>
        );
      })}
      <rect x={6} y={68} width={196} height={106} rx={3} fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth={0.5} />
      <rect x={12} y={74} width={60} height={3} rx={1} fill={C.primary} opacity={0.4} />
      <TextLines x={12} y={82} w={180} count={3} gap={6} />
      <rect x={12} y={104} width={50} height={3} rx={1} fill={C.green} opacity={0.3} />
      <TextLines x={12} y={112} w={180} count={3} gap={6} />
      <rect x={206} y={68} width={108} height={106} rx={3} fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth={0.5} />
      <rect x={212} y={72} width={36} height={2.5} rx={1} fill="rgba(0,0,0,0.10)" />
      <path d={areaFromLine(l, 210, 80, 98, 60)} fill="url(#g3)" />
      <path d={l} fill="none" stroke={C.red} strokeWidth={0.9} />
      <KpiCell x={212} y={148} w={44} h={20} vc={C.primary} />
      <KpiCell x={260} y={148} w={44} h={20} vc={C.orange} />
    </svg>
  );
}

function ThumbWidget() {
  const la = [40, 45, 42, 55, 52, 60, 58, 65, 70, 68, 75, 72, 80];
  const lb = [20, 25, 22, 30, 28, 35, 32, 38, 42, 40, 48, 45, 52];
  const vd = [50, 70, 40, 80, 60, 90, 55, 75, 65, 85];
  const colors = [C.primary, C.orange, C.green, C.blue];
  return (
    <svg viewBox={`0 0 ${TW} ${TH}`} preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="g4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.orange} stopOpacity={0.2} />
          <stop offset="100%" stopColor={C.orange} stopOpacity={0} />
        </linearGradient>
      </defs>
      {colors.map((color, i) => {
        const cx = 6 + i * 78;
        return (
          <g key={i}>
            <rect x={cx} y={6} width={74} height={28} rx={2} fill="#fafafa" />
            <rect x={cx + 4} y={10} width={24} height={2} rx={1} fill="rgba(0,0,0,0.10)" />
            <rect x={cx + 4} y={15} width={36} height={3.5} rx={1} fill={color} opacity={0.6} />
            <rect x={cx + 4} y={22} width={18} height={2} rx={1} fill="rgba(0,0,0,0.06)" />
          </g>
        );
      })}
      <rect x={6} y={38} width={204} height={136} rx={3} fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth={0.5} />
      <path d={smoothLine(la, 12, 44, 192, 60)} fill="none" stroke={C.orange} strokeWidth={1} />
      <path d={smoothLine(lb, 12, 44, 192, 60)} fill="none" stroke={C.primary} strokeWidth={1} opacity={0.6} />
      <Bars data={vd} x0={12} y0={120} w={192} h={48} color={C.orange} opacity={0.2} />
      <rect x={214} y={38} width={100} height={66} rx={3} fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth={0.5} />
      <TextLines x={220} y={46} w={88} count={4} gap={7} />
      <rect x={220} y={80} width={60} height={3} rx={1} fill={C.green} opacity={0.4} />
      <TextLines x={220} y={88} w={88} count={1} gap={6} />
      <rect x={214} y={108} width={100} height={66} rx={3} fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth={0.5} />
      <path d={smoothLine([10, 15, 12, 20, 18, 25], 220, 114, 88, 28)} fill="none" stroke={C.deepBlue} strokeWidth={0.8} />
      <KpiCell x={220} y={148} w={40} h={18} vc={C.primary} />
      <KpiCell x={266} y={148} w={40} h={18} vc={C.red} />
    </svg>
  );
}

function ThumbMACD() {
  const pd = [100, 102, 98, 105, 103, 108, 106, 110, 107, 112, 109, 114, 111, 116, 113, 118];
  const md = [0, 2, -1, 4, 2, 6, 3, 7, 4, 8, 5, 9, 6, 10, 7, 11];
  const l = smoothLine(pd, 8, 8, 304, 80);
  return (
    <svg viewBox={`0 0 ${TW} ${TH}`} preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="g5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.deepBlue} stopOpacity={0.18} />
          <stop offset="100%" stopColor={C.deepBlue} stopOpacity={0} />
        </linearGradient>
      </defs>
      <rect x={6} y={6} width={308} height={90} rx={3} fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth={0.5} />
      <path d={areaFromLine(l, 8, 8, 304, 80)} fill="url(#g5)" />
      <path d={l} fill="none" stroke={C.deepBlue} strokeWidth={1.2} />
      <rect x={6} y={100} width={308} height={74} rx={3} fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth={0.5} />
      <rect x={12} y={104} width={32} height={2.5} rx={1} fill="rgba(0,0,0,0.10)" />
      <line x1={8} y1={136} x2={312} y2={136} stroke="rgba(0,0,0,0.06)" strokeWidth={0.3} strokeDasharray="2 2" />
      <Bars data={md.map(Math.abs)} x0={12} y0={112} w={296} h={56} color={C.deepBlue} opacity={0.2} />
      <path d={smoothLine(md, 12, 112, 296, 56)} fill="none" stroke={C.red} strokeWidth={0.8} />
    </svg>
  );
}

const THUMB_MAP: Record<string, React.FC> = {
  'btc-ultimate': ThumbBTC,
  'mag7-rebalance': ThumbMAG7,
  'nvda-tsm': ThumbNVDA,
  'attribution': ThumbWidget,
  'btc-macd': ThumbMACD,
};

/* ══════ AVATAR COMPONENT ══════ */
function Avatar({ name, size }: { name: string; size: number }) {
  const src = CREATOR_AVATARS[name];
  if (src) {
    return (
      <img
        className="rounded-full flex-shrink-0 object-cover bg-[#f0f0f0]"
        src={src}
        width={size}
        height={size}
        alt={name}
      />
    );
  }
  const initial = name.trim().charAt(0).toUpperCase();
  const sum = [...name].reduce((s, c) => s + c.charCodeAt(0), 0);
  const color = AVATAR_COLOR_PALETTE[sum % AVATAR_COLOR_PALETTE.length];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: size * 0.44, color: '#fff', lineHeight: 1 }}>{initial}</span>
    </div>
  );
}

/* ══════ DATA ══════ */
const PLAYBOOKS = [
  {
    id: 'btc-ultimate',
    title: 'BTC Ultimate AI Trader',
    creator: 'Alva Intern',
    desc: 'Dual-engine analysis: RSI oversold alerts + Bollinger Band breakouts. Automatically trimming position extremities to capture core BTC price movements.',
    tickers: ['BTC', 'ETH', 'SOL'],
    color: C.primary,
    stars: 142,
    remixes: 23,
  },
  {
    id: 'mag7-rebalance',
    title: 'MAG7 Equal-Weight',
    creator: 'Harry Zzz',
    desc: 'Maintains a fully invested equal-weight portfolio of the Magnificent 7 stocks and rebalances monthly to capture sector rotation alpha.',
    tickers: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA'],
    color: C.blue,
    stars: 89,
    remixes: 14,
  },
  {
    id: 'nvda-tsm',
    title: 'NVDA +3% Triggered TSM',
    creator: 'Smart Jing',
    desc: 'Buys TSM at the close when NVDA gains >3% close-to-close, then exits on +10% take-profit or -5% stop-loss.',
    tickers: ['NVDA', 'TSM'],
    color: C.red,
    stars: 48,
    remixes: 7,
  },
  {
    id: 'attribution',
    title: 'Attribution Analysis',
    creator: 'Sheer YLL YGG',
    desc: 'Monitor selected tokens to detect abnormal changes in Open Interest and trading volume, generating real-time alerts for unusual market activity.',
    tickers: ['BTC', 'ETH', 'SOL', 'DOGE', 'AVAX'],
    color: C.orange,
    stars: 72,
    remixes: 11,
  },
  {
    id: 'btc-macd',
    title: 'BTC MACD 1h Crossover',
    creator: 'Macro Scope X',
    desc: 'Trade BTC using MACD(12,26,9) line crossing its signal on 1-hour candles; enter long on bullish cross, exit on bearish cross.',
    tickers: ['BTC'],
    color: C.deepBlue,
    stars: 34,
    remixes: 5,
  },
];

/* ══════ ICON COMPONENTS ══════ */
function StarIcon({ stroke = 'rgba(0,0,0,0.3)', size = 14 }: { stroke?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2l2.09 6.26H18.18l-4.93 3.58L15.34 18 10 14.27 4.66 18l2.09-6.16L1.82 8.26h6.09L10 2z"
        stroke={stroke}
        strokeWidth={1.2}
        fill="none"
      />
    </svg>
  );
}

function RemixIcon({ stroke = 'rgba(0,0,0,0.3)', size = 14 }: { stroke?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M5 3v4.5c0 .83.67 1.5 1.5 1.5h3c.83 0 1.5.67 1.5 1.5V13M5 3L3 5M5 3l2 2M11 13l-2-2M11 13l2-2"
        stroke={stroke}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ══════ MAIN COMPONENT ══════ */
export default function Home({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <AppShell activePage="home" onNavigate={onNavigate}>
      <div className="h-screen overflow-y-auto bg-[#fafafa]">
        {/* ══════ HERO ══════ */}
        <section
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '80px 50px 40px',
            gap: 40,
            position: 'relative',
          }}
        >
          {/* Dot pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              WebkitMaskImage:
                'radial-gradient(ellipse 60% 80% at 50% 40%, black 20%, transparent 70%)',
              maskImage:
                'radial-gradient(ellipse 60% 80% at 50% 40%, black 20%, transparent 70%)',
            }}
          />

          <h1
            style={{
              fontSize: 45,
              lineHeight: 1.2,
              fontWeight: 400,
              color: 'rgba(0,0,0,0.9)',
              textAlign: 'center',
              maxWidth: 616,
              letterSpacing: 0.45,
              position: 'relative',
              zIndex: 1,
            }}
          >
            Turn Ideas into Live Investing Playbooks in Minutes
          </h1>

          {/* Chat input */}
          <div style={{ width: '100%', maxWidth: 780, position: 'relative', zIndex: 1 }}>
            <div
              style={{
                borderRadius: 16,
                background: 'white',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                border: '0.5px solid rgba(0,0,0,0.2)',
                overflow: 'visible',
              }}
            >
              <textarea
                rows={2}
                placeholder="Build an investing playbook from your ideas"
                readOnly
                style={{
                  width: '100%',
                  resize: 'none',
                  border: 'none',
                  outline: 'none',
                  padding: '16px 16px 0',
                  fontSize: 14,
                  lineHeight: '22px',
                  fontFamily: "'Delight', sans-serif",
                  color: 'rgba(0,0,0,0.85)',
                  background: 'transparent',
                  minHeight: 48,
                  maxHeight: 480,
                  letterSpacing: 0.14,
                }}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px 16px',
                  height: 28,
                  boxSizing: 'content-box',
                }}
              >
                {/* @ button */}
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    width: 16,
                    height: 16,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width={16} height={16} viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 13.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
                      stroke="rgba(0,0,0,0.5)"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.5 10v1.25a2.25 2.25 0 0 0 4.5 0V10a8 8 0 1 0-3.12 6.35"
                      stroke="rgba(0,0,0,0.5)"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {/* image button */}
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    width: 16,
                    height: 16,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width={16} height={16} viewBox="0 0 20 20" fill="none">
                    <rect
                      x={2}
                      y={3}
                      width={16}
                      height={14}
                      rx={2}
                      stroke="rgba(0,0,0,0.5)"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx={7} cy={8} r={1.5} stroke="rgba(0,0,0,0.5)" strokeWidth={1.5} />
                    <path
                      d="M18 13l-4.293-4.293a1 1 0 0 0-1.414 0L5 16"
                      stroke="rgba(0,0,0,0.5)"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {/* spacer with model button */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '4px 0',
                      fontFamily: "'Delight', sans-serif",
                      fontSize: 12,
                      lineHeight: '20px',
                      letterSpacing: 0.12,
                      color: 'rgba(0,0,0,0.5)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <span>Sonnet 4.6</span>
                    <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
                      <path
                        d="M3 4.5L6 7.5L9 4.5"
                        stroke="rgba(0,0,0,0.5)"
                        strokeWidth={1.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                {/* send button */}
                <button
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: 'rgba(0,0,0,0.05)',
                    border: 'none',
                    cursor: 'pointer',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                  }}
                >
                  <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 11V3M7 3L3.5 6.5M7 3l3.5 3.5"
                      stroke="rgba(0,0,0,0.5)"
                      strokeWidth={1.3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ WHAT YOU CAN BUILD ══════ */}
        <section
          style={{
            width: '100%',
            background: '#f6f6f6',
            borderTop: '0.5px solid rgba(0,0,0,0.15)',
            borderBottom: '0.5px solid rgba(0,0,0,0.15)',
          }}
        >
          <div
            style={{
              maxWidth: 1272,
              margin: '0 auto',
              padding: '20px 50px',
              display: 'flex',
              gap: 28,
              alignItems: 'stretch',
            }}
          >
            {/* Left */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, padding: '10px 0' }}>
              <h2
                style={{
                  fontSize: 24,
                  lineHeight: 1.2,
                  fontWeight: 400,
                  color: 'rgba(0,0,0,0.9)',
                  letterSpacing: 0.24,
                }}
              >
                What You Can Build
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {[
                  { label: 'EV Supply Chain Intelligence', active: true },
                  { label: 'Unusual Volume Scanner', active: false },
                  { label: 'Earnings Whisper Board', active: false },
                  { label: 'Thesis Debate Room', active: false },
                  { label: 'Macro Regime Adaptive Trading', active: false },
                ].map((tag) => (
                  <button
                    key={tag.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 16px',
                      borderRadius: 6,
                      border: '0.5px solid rgba(0,0,0,0.3)',
                      background: tag.active ? '#e5eeee' : 'white',
                      fontFamily: "'Delight', sans-serif",
                      fontSize: 14,
                      lineHeight: '22px',
                      fontWeight: 400,
                      color: 'rgba(0,0,0,0.9)',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      letterSpacing: 0.14,
                    }}
                  >
                    {tag.label}
                  </button>
                ))}
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 0',
                    fontSize: 14,
                    lineHeight: '22px',
                    color: 'rgba(0,0,0,0.5)',
                    cursor: 'pointer',
                    letterSpacing: 0.14,
                  }}
                >
                  Explore More
                </span>
              </div>
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '9px 16px',
                  borderRadius: 8,
                  background: C.primary,
                  border: 'none',
                  cursor: 'pointer',
                  width: 'fit-content',
                }}
              >
                <svg width={18} height={18} viewBox="0 0 16 16" fill="none">
                  <path
                    d="M5 3v4.5c0 .83.67 1.5 1.5 1.5h3c.83 0 1.5.67 1.5 1.5V13M5 3L3 5M5 3l2 2M11 13l-2-2M11 13l2-2"
                    stroke="white"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{
                    fontFamily: "'Delight', sans-serif",
                    fontSize: 14,
                    lineHeight: '22px',
                    fontWeight: 500,
                    color: 'white',
                    letterSpacing: 0.14,
                  }}
                >
                  Remix This
                </span>
              </button>
            </div>

            {/* Right (preview card) */}
            <div
              style={{
                flex: 1,
                borderRadius: 12,
                overflow: 'hidden',
                border: '0.5px solid rgba(0,0,0,0.3)',
                background: 'white',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                position: 'relative',
                aspectRatio: '522 / 666',
              }}
            >
              <div style={{ position: 'absolute', inset: 8, bottom: 160 }}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: '#fafafa',
                  }}
                >
                  <ThumbBTC />
                </div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '56px 16px 16px',
                  background: 'linear-gradient(180deg, transparent 0%, white 60%)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    paddingTop: 16,
                    borderTop: '1px solid rgba(0,0,0,0.07)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Avatar name="Alva Intern" size={22} />
                    <span
                      style={{
                        fontSize: 14,
                        lineHeight: '22px',
                        color: 'rgba(0,0,0,0.9)',
                        letterSpacing: 0.14,
                      }}
                    >
                      alva
                    </span>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: 16,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <StarIcon stroke="rgba(0,0,0,0.9)" size={16} />
                      <span style={{ fontSize: 14, lineHeight: '22px', color: 'rgba(0,0,0,0.9)', letterSpacing: 0.14 }}>
                        12.8K
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <RemixIcon stroke="rgba(0,0,0,0.9)" size={16} />
                      <span style={{ fontSize: 14, lineHeight: '22px', color: 'rgba(0,0,0,0.9)', letterSpacing: 0.14 }}>
                        3
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ FEATURED PLAYBOOKS ══════ */}
        <section style={{ maxWidth: 1272, margin: '0 auto', padding: '28px 50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
            <h2
              style={{
                fontSize: 16,
                lineHeight: '26px',
                fontWeight: 400,
                color: 'rgba(0,0,0,0.9)',
                flex: 1,
                letterSpacing: 0.16,
              }}
            >
              Featured Playbooks
            </h2>
            <span
              style={{
                fontSize: 14,
                lineHeight: '22px',
                color: 'rgba(0,0,0,0.5)',
                cursor: 'pointer',
                letterSpacing: 0.14,
              }}
            >
              View All
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {PLAYBOOKS.map((p) => {
              const ThumbComponent = THUMB_MAP[p.id];
              return (
                <div
                  key={p.id}
                  style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    background: 'white',
                    border: '0.5px solid rgba(0,0,0,0.12)',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.2s',
                  }}
                >
                  <div style={{ width: '100%', aspectRatio: '16 / 9', background: '#fafafa', overflow: 'hidden' }}>
                    {ThumbComponent && <ThumbComponent />}
                  </div>
                  <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <h3
                      style={{
                        fontSize: 15,
                        lineHeight: '22px',
                        fontWeight: 400,
                        color: 'rgba(0,0,0,0.9)',
                        letterSpacing: 0.15,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        lineHeight: '20px',
                        color: 'rgba(0,0,0,0.5)',
                        letterSpacing: 0.13,
                        height: 40,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {p.desc}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                      <Avatar name={p.creator} size={20} />
                      <span
                        style={{
                          fontSize: 13,
                          lineHeight: '20px',
                          color: 'rgba(0,0,0,0.7)',
                          flex: 1,
                          minWidth: 0,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          letterSpacing: 0.13,
                        }}
                      >
                        {p.creator}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                        <StarIcon />
                        <span style={{ fontSize: 12, lineHeight: '18px', color: 'rgba(0,0,0,0.4)' }}>{p.stars}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                        <RemixIcon />
                        <span style={{ fontSize: 12, lineHeight: '18px', color: 'rgba(0,0,0,0.4)' }}>{p.remixes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 24,
              fontSize: 14,
              lineHeight: '22px',
              color: 'rgba(0,0,0,0.5)',
              cursor: 'pointer',
              letterSpacing: 0.14,
            }}
          >
            Load More
          </div>
        </section>
      </div>
    </AppShell>
  );
}
