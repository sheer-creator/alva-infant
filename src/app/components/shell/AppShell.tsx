import type { Page } from '../../App';
import { Sidebar } from './Sidebar';

interface AppShellProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  children: React.ReactNode;
}

export function AppShell({ activePage, onNavigate, children }: AppShellProps) {
  return (
    <div className="bg-[#2a2a38] flex h-screen overflow-hidden">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      <main className="ml-[228px] flex-1 bg-white rounded-tl-[8px] rounded-bl-[8px] overflow-hidden">
        {children}
      </main>
    </div>
  );
}
