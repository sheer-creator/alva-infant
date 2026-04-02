import { useState, useEffect, useCallback, lazy, Suspense } from 'react';

const VALID_PAGES = ['home'] as const;
export type Page = (typeof VALID_PAGES)[number];

const Home = lazy(() => import('../pages/Home'));

function getPageFromHash(): Page {
  const hash = window.location.hash.slice(1);
  return VALID_PAGES.includes(hash as Page) ? (hash as Page) : 'home';
}

export default function App() {
  const [page, setPage] = useState<Page>(getPageFromHash);

  useEffect(() => {
    const onHash = () => setPage(getPageFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((p: Page) => {
    window.location.hash = p;
  }, []);

  return (
    <Suspense fallback={null}>
      {page === 'home' && <Home onNavigate={navigate} />}
    </Suspense>
  );
}
