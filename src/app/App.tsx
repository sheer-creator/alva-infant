import { useState, useEffect, useCallback, useTransition, lazy, Suspense } from 'react';

const VALID_PAGES = [
  'home', 'explore', 'screener', 'thesis', 'thesis-remix', 'agent',
  'account', 'billing', 'portfolio-settings', 'alva-agent', 'automations', 'api-keys', 'alva-skills',
  'user-profile', 'pricing', 'skills',
] as const;
export type Page = (typeof VALID_PAGES)[number] | `thread/${string}`;

const SETTINGS_PAGES: readonly Page[] = [
  'account', 'billing', 'portfolio-settings', 'alva-agent', 'automations', 'api-keys', 'alva-skills',
];

const Home = lazy(() => import('../pages/Home'));
const Explore = lazy(() => import('../pages/Explore'));
const Screener = lazy(() => import('../pages/Screener'));
const Thesis = lazy(() => import('../pages/Thesis'));
const ThesisRemix = lazy(() => import('../pages/ThesisRemix'));
const Thread = lazy(() => import('../pages/Thread'));
const Agent = lazy(() => import('../pages/Agent'));
const Account = lazy(() => import('../pages/Account'));
const Billing = lazy(() => import('../pages/Billing'));
const PortfolioSettings = lazy(() => import('../pages/PortfolioSettings'));
const AlvaAgentSettings = lazy(() => import('../pages/AlvaAgentSettings'));
const Automations = lazy(() => import('../pages/Automations'));
const ApiKeys = lazy(() => import('../pages/ApiKeys'));
const AlvaSkills = lazy(() => import('../pages/AlvaSkills'));

function getPageFromHash(): Page {
  const hash = window.location.hash.slice(1);
  if (hash.startsWith('thread/')) return hash as Page;
  return VALID_PAGES.includes(hash as (typeof VALID_PAGES)[number]) ? (hash as Page) : 'home';
}

export function getThreadId(page: Page): string | null {
  if (typeof page === 'string' && page.startsWith('thread/')) return page.slice(7);
  return null;
}

export default function App() {
  const [page, setPage] = useState<Page>(getPageFromHash);
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

  const threadId = getThreadId(page);

  return (
    <Suspense fallback={null}>
      {page === 'home' && <Home onNavigate={navigate} />}
      {page === 'explore' && <Explore onNavigate={navigate} />}
      {page === 'screener' && <Screener onNavigate={navigate} />}
      {page === 'thesis' && <Thesis onNavigate={navigate} />}
      {page === 'thesis-remix' && <ThesisRemix onNavigate={navigate} />}
      {page === 'agent' && <Agent onNavigate={navigate} />}
      {page === 'account' && <Account onNavigate={navigate} />}
      {page === 'billing' && <Billing onNavigate={navigate} />}
      {page === 'portfolio-settings' && <PortfolioSettings onNavigate={navigate} />}
      {page === 'alva-agent' && <AlvaAgentSettings onNavigate={navigate} />}
      {page === 'automations' && <Automations onNavigate={navigate} />}
      {page === 'api-keys' && <ApiKeys onNavigate={navigate} />}
      {page === 'alva-skills' && <AlvaSkills onNavigate={navigate} />}
      {threadId && <Thread threadId={threadId} onNavigate={navigate} />}
    </Suspense>
  );
}
