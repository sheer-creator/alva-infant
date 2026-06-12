/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: Alva Agent settings page matching Figma Setting/Agent
 * [POS]: settings page
 */

import { useEffect, useRef, useState } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { DiscordConnectModal } from '@/app/components/shared/DiscordConnectModal';
import { ConnectAppList, type ConnectAppRowData } from '@/app/components/shared/ConnectAppsModal';
import { useAgentPlatforms, type AgentPlatform } from '@/lib/agent-connected';
import {
  SETTINGS_FONT,
  SettingsSection,
  ToggleSwitch,
} from '@/app/components/shell/settings-ui';

/* Figma Modal/Connect 7908:69704 — 4 个 app,绑定与"谁接收消息"单选合一 */
const PLATFORMS: (ConnectAppRowData & { id: AgentPlatform })[] = [
  { id: 'telegram', name: 'Telegram', sub: 'Bot DM — instant pushes', handle: 'Sheerruan', logo: 'https://alva-ai-static.b-cdn.net/icons/logo-social-telegram.svg' },
  { id: 'discord', name: 'Discord', sub: 'Bot DM — switch channels with /channel', handle: 'Sheerruan#0', logo: `${import.meta.env.BASE_URL}logo-social-discord.svg` },
  { id: 'slack', name: 'Slack', sub: 'Alva app in your workspace', handle: '@sheerruan · alva-hq', logo: 'https://alva-ai-static.b-cdn.net/icons/logo-social-slack2.svg' },
  { id: 'whatsapp', name: 'WhatsApp', sub: 'Business account DM', handle: '+1 ··· 4821', logo: 'https://alva-ai-static.b-cdn.net/icons/logo-social-whatsapp.svg' },
];

export default function AlvaAgentSettings({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { platforms, active, connect, disconnect, setActive } = useAgentPlatforms();
  const defaultedPlatform = useRef(false);
  const [chatNotifications, setChatNotifications] = useState(true);
  const [assistantPrompt, setAssistantPrompt] = useState('');
  const [discordFlowOpen, setDiscordFlowOpen] = useState(false);

  useEffect(() => {
    if (!defaultedPlatform.current && platforms.length === 0) {
      defaultedPlatform.current = true;
      connect('telegram');
    }
  }, [connect, platforms.length]);

  return (
    <SettingsLayout active="alva-agent" onNavigate={onNavigate} mapTo={{ 'alva-agent': 'agent' }}>
      <SettingsSection
        title="Connected App"
        subtitle="Choose the messaging app for your Alva Agent"
      >
        <ConnectAppList
          rows={PLATFORMS}
          connectedIds={platforms}
          activeId={active}
          onConnect={(id) => connect(id as AgentPlatform)}
          onDisconnect={(id) => disconnect(id as AgentPlatform)}
          onSetActive={(id) => setActive(id as AgentPlatform)}
          interceptConnect={(id) => {
            if (id === 'discord') {
              setDiscordFlowOpen(true);
              return true;
            }
            return false;
          }}
        />
      </SettingsSection>

      <SettingsSection
        title="Enable Chat Notifications"
        subtitle="Receive real-time chat and task updates on your connected apps."
        gap={0}
        right={<ToggleSwitch on={chatNotifications} size={20} onClick={() => setChatNotifications((value) => !value)} />}
      />

      <SettingsSection title="Customize Your Assistant" subtitle="Define the personality, tone, and response style.">
        <textarea
          value={assistantPrompt}
          onChange={(event) => setAssistantPrompt(event.target.value)}
          placeholder="Define your assistant's identity: name, tone, and response style"
          className="w-full min-h-[160px] max-h-[280px] p-[16px] rounded-[6px] resize-none outline-none text-[16px] leading-[26px] tracking-[0.16px] placeholder:text-[color:var(--text-n3,rgba(0,0,0,0.3))]"
          style={{ border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))', color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT }}
        />
      </SettingsSection>

      <DiscordConnectModal
        isOpen={discordFlowOpen}
        onClose={() => setDiscordFlowOpen(false)}
        onPaired={() => {
          connect('discord');
          setDiscordFlowOpen(false);
        }}
      />
    </SettingsLayout>
  );
}
