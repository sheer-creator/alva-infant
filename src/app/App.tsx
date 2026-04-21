import { useState, useEffect, useCallback, useTransition, lazy, Suspense } from 'react';

const VALID_PAGES = ['home', 'explore', 'screener', 'thesis', 'agent'] as const;
export type Page = (typeof VALID_PAGES)[number] | `thread/${string}`;

const Home = lazy(() => import('../pages/Home'));
const Explore = lazy(() => import('../pages/Explore'));
const Screener = lazy(() => import('../pages/Screener'));
const Thesis = lazy(() => import('../pages/Thesis'));
const Thread = lazy(() => import('../pages/Thread'));
const Agent = lazy(() => import('../pages/Agent'));

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
    const onHash = () => startTransition(() => setPage(getPageFromHash()));
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
      {page === 'agent' && <Agent onNavigate={navigate} />}
      {threadId && <Thread threadId={threadId} onNavigate={navigate} />}
    </Suspense>
  );
}
