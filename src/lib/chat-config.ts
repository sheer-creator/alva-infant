export type ChatTriggerMode = 'floating-bar' | 'sidebar' | 'fab';

/** Change this to switch between the three approaches */
export const CHAT_TRIGGER_MODE: ChatTriggerMode = 'floating-bar';

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
];

/** Default thread to load when opening chat on a specific page */
export const PAGE_DEFAULT_THREAD: Record<string, string> = {
  trends: 'demo',
};
