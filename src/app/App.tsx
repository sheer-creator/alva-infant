import { useState, useEffect, useCallback, useTransition, lazy, Suspense } from 'react';
import { ChatProvider } from './components/chat/ChatContext';
import { CHAT_TRIGGER_MODE } from '@/lib/chat-config';

const NON_ROUTED_PAGES = [
  'account', 'billing', 'portfolio-settings', 'alva-agent', 'automations', 'notifications', 'api-keys',
  'skills', 'docs', 'alva-chat-detail', 'referral-landing', 'playbook-referral',
] as const;

const SETTINGS_PAGES = [
  'account', 'billing', 'portfolio-settings', 'alva-agent', 'automations', 'notifications', 'api-keys',
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
const ROUTABLE_PAGES = [...VALID_PAGES, ...SETTINGS_PAGES] as const;
export type Page = (typeof VALID_PAGES)[number] | (typeof NON_ROUTED_PAGES)[number] | `thread/${string}`;

const NewChat = lazy(() => import('../pages/NewChat'));
const Account = lazy(() => import('../pages/Account'));
const ApiKeys = lazy(() => import('../pages/ApiKeys'));
const AlvaAgentSettings = lazy(() => import('../pages/AlvaAgentSettings'));
const Automations = lazy(() => import('../pages/Automations'));
const Billing = lazy(() => import('../pages/Billing'));
const Explore = lazy(() => import('../pages/Explore'));
const Notifications = lazy(() => import('../pages/Notifications'));
const PortfolioSettings = lazy(() => import('../pages/PortfolioSettings'));
const Screener = lazy(() => import('../pages/Screener'));
const TemplateScreener = lazy(() => import('../pages/TemplateScreener'));
const TemplateThesis = lazy(() => import('../pages/TemplateThesis'));
const TemplateWhatif = lazy(() => import('../pages/TemplateWhatif'));
const TemplateNotification = lazy(() => import('../pages/TemplateNotification'));
const Agent = lazy(() => import('../pages/Agent'));
const Portfolio = lazy(() => import('../pages/Portfolio'));
const AlvaSkills = lazy(() => import('../pages/AlvaSkills'));

function getPageFromHash(): Page {
  const hash = window.location.hash.slice(1);
  if (hash.startsWith('thread/')) return hash as Page;
  return ROUTABLE_PAGES.includes(hash as (typeof ROUTABLE_PAGES)[number]) ? (hash as Page) : 'new-chat';
}

export default function App() {
  const [page, setPage] = useState<Page>(getPageFromHash);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const init = getPageFromHash();
    if (!SETTINGS_PAGES.includes(init as (typeof SETTINGS_PAGES)[number])) {
      sessionStorage.setItem('settingsReturnPage', init);
    }

    let prev = init;
    const onHash = () => {
      const next = getPageFromHash();
      if (!SETTINGS_PAGES.includes(prev as (typeof SETTINGS_PAGES)[number])) {
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

  return (
    <ChatProvider activePage={page} threadsEntryMode="1" chatTriggerMode={CHAT_TRIGGER_MODE}>
      <Suspense fallback={null}>
        {page === 'new-chat' && <NewChat onNavigate={navigate} />}
        {page === 'account' && <Account onNavigate={navigate} />}
        {page === 'api-keys' && <ApiKeys onNavigate={navigate} />}
        {page === 'alva-agent' && <AlvaAgentSettings onNavigate={navigate} />}
        {page === 'automations' && <Automations onNavigate={navigate} />}
        {page === 'billing' && <Billing onNavigate={navigate} />}
        {page === 'explore' && <Explore onNavigate={navigate} />}
        {page === 'notifications' && <Notifications onNavigate={navigate} />}
        {page === 'portfolio-settings' && <PortfolioSettings onNavigate={navigate} />}
        {page === 'screener' && <Screener onNavigate={navigate} />}
        {page === 'template-screener' && <TemplateScreener onNavigate={navigate} />}
        {page === 'template-thesis' && <TemplateThesis onNavigate={navigate} />}
        {page === 'template-whatif' && <TemplateWhatif onNavigate={navigate} />}
        {page === 'template-notification' && <TemplateNotification onNavigate={navigate} />}
        {page === 'agent' && <Agent onNavigate={navigate} />}
        {page === 'portfolio' && <Portfolio onNavigate={navigate} />}
        {page === 'alva-skills' && <AlvaSkills onNavigate={navigate} />}
      </Suspense>
    </ChatProvider>
  );
}
