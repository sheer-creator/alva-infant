export type ChatTriggerMode = 'floating-bar' | 'sidebar' | 'fab' | 'inline-composer';

/** Change this to switch between the four approaches */
export const CHAT_TRIGGER_MODE: ChatTriggerMode = 'inline-composer';

/** Threads 入口方案：1=Home 右下角 FAB；2=侧栏 history 展开列表；3=Home 右上角 history 下拉；4=侧栏 history 按钮+覆盖浮层 */
export type ThreadsEntryMode = '1' | '2' | '3' | '4';

export const THREADS_ENTRY_STORAGE_KEY = 'threadsEntryMode';

export const DEFAULT_THREADS_ENTRY_MODE: ThreadsEntryMode = '1';

export function readThreadsEntryMode(): ThreadsEntryMode {
  try {
    const v = sessionStorage.getItem(THREADS_ENTRY_STORAGE_KEY);
    if (v === '1' || v === '2' || v === '3' || v === '4') return v;
  } catch {
    /* ignore */
  }
  return DEFAULT_THREADS_ENTRY_MODE;
}

export interface ContextTagData {
  label: string;
  icon?: string;
}

/** 方案 1：为 Home 提供与对话框一致的 @ 上下文 */
export const HOME_CHAT_CONTEXT: ContextTagData = {
  label: 'Home',
  icon: 'sidebar-discover-normal',
};

/** Maps each page to its @context tag. null = no chat trigger on that page */
export const PAGE_CONTEXT_MAP: Record<string, ContextTagData | null> = {
  home: null,
  explore: { label: 'Explore', icon: 'sidebar-discover-normal' },
  trends: { label: 'Google / X Trends Tracker', icon: 'sidebar-discover-normal' },
  agent: null,
};

export interface ConversationItem {
  id: string;
  label: string;
  isAgent?: boolean;
}

/** Thread / conversation list shown in sidebar and ChatPanel dropdown (sorted by most recent) */
export const CONVERSATIONS: ConversationItem[] = [
  { id: 'agent-btc-alert', label: 'BTC 5% Drop Alert & NVDA Earnings Watch', isAgent: true },
  { id: 'demo', label: 'Animated Demo Playbook with Mock Data' },
  { id: 'cpi', label: 'US CPI Impact on Fed Rate Cut Odds' },
  { id: 'treasury', label: 'US Treasury Yield and Bitcoin Correlation Analysis' },
  { id: 'payrolls', label: 'Impact of Strong US Payrolls on Markets' },
  { id: 'fed-hike', label: 'Impact of 50 BPS Fed Rate Hike on Nasdaq Futures' },
  { id: 'sp-btc', label: 'Rolling 30-Day Correlation: S&P 500 & Bitcoin' },
  { id: 'tesla', label: 'Tesla Implied Move Before Earnings' },
  { id: 'mara', label: 'Impact of 20% Bitcoin Drop on MARA' },
  { id: 'coinbase', label: 'Analyzing Coinbase Stock with Technical Indicators' },
  { id: 'pe-eps', label: 'Scatter Plot of P/E Ratio vs. EPS Growth' },
  { id: 'heatmap', label: 'Heatmap of Top 10 US Tech Stocks' },
];

/** Default thread to load when opening chat on a specific page */
export const PAGE_DEFAULT_THREAD: Record<string, string> = {
  trends: 'demo',
};
