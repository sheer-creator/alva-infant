import { Dropdown } from './Dropdown';
import { CONVERSATIONS } from '@/lib/chat-config';

const AGENT_ICON = `${import.meta.env.BASE_URL}sidebar-skills-normal.svg`;

const THREAD_SECTION = {
  title: 'Recent Threads',
  items: CONVERSATIONS.map(c => ({
    ...c,
    icon: c.isAgent ? AGENT_ICON : 'sidebar-thread-normal',
  })),
};

export function ThreadSwitcherDropdown({
  activeId,
  onSelect,
  trigger,
  align = 'left',
}: {
  activeId: string;
  onSelect: (id: string) => void;
  trigger: React.ReactNode;
  align?: 'left' | 'right';
}) {
  return (
    <Dropdown
      sections={[THREAD_SECTION]}
      activeId={activeId}
      onSelect={onSelect}
      width={400}
      maxHeight={640}
      align={align}
      trigger={trigger}
    />
  );
}
