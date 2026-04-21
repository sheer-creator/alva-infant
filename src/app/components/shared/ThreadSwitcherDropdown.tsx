import { Dropdown } from './Dropdown';
import { CONVERSATIONS } from '@/lib/chat-config';

export const AGENT_CONVERSATION_ID = '__agent__';
export const AGENT_ICON = `${import.meta.env.BASE_URL}sidebar-skills-normal.svg`;

const AGENT_SECTION = {
  title: 'Alva Agent',
  items: [{ id: AGENT_CONVERSATION_ID, label: 'Alva Agent', icon: AGENT_ICON, badge: 3 }],
};

const THREAD_SECTION = {
  title: 'Recent Threads',
  items: CONVERSATIONS.map(c => ({ ...c, icon: 'sidebar-thread-normal' })),
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
      sections={[AGENT_SECTION, THREAD_SECTION]}
      activeId={activeId}
      onSelect={onSelect}
      width={400}
      maxHeight={640}
      align={align}
      trigger={trigger}
    />
  );
}
