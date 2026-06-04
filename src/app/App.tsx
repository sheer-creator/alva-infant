import { useState, useEffect, useCallback, useTransition, lazy, Suspense } from 'react';
import { ChatProvider } from './components/chat/ChatContext';
import { CHAT_TRIGGER_MODE } from '@/lib/chat-config';
import SearchModal from '@/app/components/SearchModal';

const NON_ROUTED_PAGES = [
  'account', 'billing', 'portfolio-settings', 'alva-agent', 'automations', 'notifications', 'api-keys',
  'skills', 'docs', 'alva-chat-detail', 'referral-landing', 'playbook-referral',
] as const;

const VALID_PAGES = [
  // 左侧栏入口
  'new-chat',
  'explore',
  'agent', 'portfolio', 'alva-skills',
  'template-screener', 'template-thesis', 'template-whatif', 'template-notification',
  'screener',
  'pricing',
  'user-profile',
] as const;
export type Page = (typeof VALID_PAGES)[number] | (typeof NON_ROUTED_PAGES)[number] | `thread/${string}`;

const NewChat = lazy(() => import('../pages/NewChat'));
const Explore = lazy(() => import('../pages/Explore'));
const Screener = lazy(() => import('../pages/Screener'));
const TemplateScreener = lazy(() => import('../pages/TemplateScreener'));
const TemplateThesis = lazy(() => import('../pages/TemplateThesis'));
const TemplateWhatif = lazy(() => import('../pages/TemplateWhatif'));
const TemplateNotification = lazy(() => import('../pages/TemplateNotification'));
const Agent = lazy(() => import('../pages/Agent'));
const AlvaSkills = lazy(() => import('../pages/AlvaSkills'));

function getPageFromHash(): Page {
  const hash = window.location.hash.slice(1);
  return VALID_PAGES.includes(hash as (typeof VALID_PAGES)[number]) ? (hash as Page) : 'new-chat';
}

export default function App() {
  const [page, setPage] = useState<Page>(getPageFromHash);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const init = getPageFromHash();
    sessionStorage.setItem('settingsReturnPage', init);

    let prev = init;
    const onHash = () => {
      const next = getPageFromHash();
      sessionStorage.setItem('settingsReturnPage', prev);
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

  return (
    <ChatProvider activePage={page} threadsEntryMode="1" chatTriggerMode={CHAT_TRIGGER_MODE}>
      <Suspense fallback={null}>
        {page === 'new-chat' && <NewChat onNavigate={navigate} onOpenSearch={openSearch} />}
        {page === 'explore' && <Explore onNavigate={navigate} onOpenSearch={openSearch} />}
        {page === 'screener' && <Screener onNavigate={navigate} />}
        {page === 'template-screener' && <TemplateScreener onNavigate={navigate} />}
        {page === 'template-thesis' && <TemplateThesis onNavigate={navigate} />}
        {page === 'template-whatif' && <TemplateWhatif onNavigate={navigate} />}
        {page === 'template-notification' && <TemplateNotification onNavigate={navigate} />}
        {page === 'agent' && <Agent onNavigate={navigate} />}
        {page === 'alva-skills' && <AlvaSkills onNavigate={navigate} />}
      </Suspense>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </ChatProvider>
  );
}
