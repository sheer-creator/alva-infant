export type ChatTriggerMode = 'floating-bar' | 'sidebar' | 'fab' | 'inline-composer';

/** Change this to switch between the four approaches */
export const CHAT_TRIGGER_MODE: ChatTriggerMode = 'inline-composer';

export interface ContextTagData {
  label: string;
  icon?: string;
}

/** Maps each page to its @context tag. null = no chat trigger on that page */
export const PAGE_CONTEXT_MAP: Record<string, ContextTagData | null> = {
  home: null,
  explore: { label: 'Explore', icon: 'sidebar-discover-normal' },
  trends: { label: 'Google / X Trends Tracker', icon: 'sidebar-discover-normal' },
};

export interface ConversationItem {
  id: string;
  label: string;
}

/** Thread / conversation list shown in sidebar and ChatPanel dropdown */
export const CONVERSATIONS: ConversationItem[] = [
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
