import { useState, useEffect, useCallback, useTransition, lazy, Suspense } from 'react';
import { ChatProvider } from './components/chat/ChatContext';
import { CHAT_TRIGGER_MODE } from '@/lib/chat-config';
import SearchModal from '@/app/components/SearchModal';

const VALID_PAGES = [
  // 首页 / 新对话
  'new-chat', 'home',
  // 探索
  'explore', 'screener',
  // 模板
  'template-screener', 'template-thesis', 'template-whatif', 'template-notification',
  // 主功能
  'agent', 'portfolio',
  // 设置
  'account', 'billing', 'portfolio-settings', 'alva-agent', 'automations', 'notifications', 'api-keys', 'alva-skills',
  // 其它（Freshman 链路引用，保证类型/路由合法）
  'user-profile', 'pricing', 'skills', 'docs', 'alva-chat-detail', 'referral-landing', 'playbook-referral',
] as const;
export type Page = (typeof VALID_PAGES)[number] | `thread/${string}`;

const SETTINGS_PAGES: readonly Page[] = [
  'account', 'billing', 'portfolio-settings', 'alva-agent', 'automations', 'notifications', 'api-keys', 'alva-skills',
];

const NewChat = lazy(() => import('../pages/NewChat'));
const Explore = lazy(() => import('../pages/Explore'));
const Screener = lazy(() => import('../pages/Screener'));
const TemplateScreener = lazy(() => import('../pages/TemplateScreener'));
const TemplateThesis = lazy(() => import('../pages/TemplateThesis'));
const TemplateWhatif = lazy(() => import('../pages/TemplateWhatif'));
const TemplateNotification = lazy(() => import('../pages/TemplateNotification'));
const Thread = lazy(() => import('../pages/Thread'));
const Agent = lazy(() => import('../pages/Agent'));
const Account = lazy(() => import('../pages/Account'));
const Billing = lazy(() => import('../pages/Billing'));
const PortfolioSettings = lazy(() => import('../pages/PortfolioSettings'));
const AlvaAgentSettings = lazy(() => import('../pages/AlvaAgentSettings'));
const Automations = lazy(() => import('../pages/Automations'));
const Notifications = lazy(() => import('../pages/Notifications'));
const ApiKeys = lazy(() => import('../pages/ApiKeys'));
const AlvaSkills = lazy(() => import('../pages/AlvaSkills'));

function getPageFromHash(): Page {
  const hash = window.location.hash.slice(1);
  if (hash.startsWith('thread/')) return hash as Page;
  return VALID_PAGES.includes(hash as (typeof VALID_PAGES)[number]) ? (hash as Page) : 'new-chat';
}

export function getThreadId(page: Page): string | null {
  if (typeof page === 'string' && page.startsWith('thread/')) return page.slice(7);
  return null;
}

export default function App() {
  const [page, setPage] = useState<Page>(getPageFromHash);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const init = getPageFromHash();
    if (!SETTINGS_PAGES.includes(init)) {
      sessionStorage.setItem('settingsReturnPage', init);
    }

    let prev = init;
    const onHash = () => {
      const next = getPageFromHash();
      if (!SETTINGS_PAGES.includes(prev)) {
        sessionStorage.setItem('settingsReturnPage', prev);
      }
      prev = next;
      startTransition(() => setPage(next));
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((p: Page) => {
    window.location.hash = p;
  }, []);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);

  const threadId = getThreadId(page);

  return (
    <ChatProvider activePage={page} threadsEntryMode="1" chatTriggerMode={CHAT_TRIGGER_MODE}>
      <Suspense fallback={null}>
        {(page === 'new-chat' || page === 'home') && <NewChat onNavigate={navigate} onOpenSearch={openSearch} />}
        {page === 'explore' && <Explore onNavigate={navigate} onOpenSearch={openSearch} />}
        {page === 'screener' && <Screener onNavigate={navigate} />}
        {page === 'template-screener' && <TemplateScreener onNavigate={navigate} />}
        {page === 'template-thesis' && <TemplateThesis onNavigate={navigate} />}
        {page === 'template-whatif' && <TemplateWhatif onNavigate={navigate} />}
        {page === 'template-notification' && <TemplateNotification onNavigate={navigate} />}
        {page === 'agent' && <Agent onNavigate={navigate} />}
        {page === 'account' && <Account onNavigate={navigate} />}
        {page === 'billing' && <Billing onNavigate={navigate} />}
        {page === 'portfolio-settings' && <PortfolioSettings onNavigate={navigate} />}
        {page === 'alva-agent' && <AlvaAgentSettings onNavigate={navigate} />}
        {page === 'automations' && <Automations onNavigate={navigate} />}
        {page === 'notifications' && <Notifications onNavigate={navigate} />}
        {page === 'api-keys' && <ApiKeys onNavigate={navigate} />}
        {page === 'alva-skills' && <AlvaSkills onNavigate={navigate} />}
        {threadId && <Thread threadId={threadId} onNavigate={navigate} />}
      </Suspense>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </ChatProvider>
  );
}
