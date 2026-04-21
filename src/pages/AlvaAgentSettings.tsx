/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: Alva Agent 设置页 — Connected App + Customize prompt
 * [POS]: 页面层
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { useAgentPlatforms, type AgentPlatform } from '@/lib/agent-connected';

const FONT = "'Delight', sans-serif";

function TelegramMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 240 240" fill="none" style={{ display: 'block' }}>
      <circle cx="120" cy="120" r="120" fill="#26A5E4" />
      <path d="M100 144.4l48.4 35.7c5.5 3 9.5 1.5 10.9-5.1l19.7-93c2-8.1-3.1-11.7-8.4-9.3L55.6 113c-7.9 3.2-7.8 7.6-1.4 9.5l36.3 11.4 84.2-53c4-2.4 7.6-1.1 4.6 1.5L100 144.4z" fill="#FFFFFF" />
    </svg>
  );
}

const PLATFORMS: { id: AgentPlatform; name: string; handle: string; render: () => React.ReactNode }[] = [
  { id: 'telegram', name: 'Telegram', handle: 'Sheerruan', render: () => <TelegramMark size={40} /> },
  { id: 'discord', name: 'Discord', handle: 'sheerruan', render: () => <img src={`${import.meta.env.BASE_URL}logo-social-discord.svg`} alt="Discord" style={{ width: 40, height: 40, borderRadius: '50%' }} /> },
];

export default function AlvaAgentSettings({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { has, toggle } = useAgentPlatforms();
  const [prompt, setPrompt] = useState('');
  const dirty = prompt.trim().length > 0;

  return (
    <SettingsLayout active="alva-agent" onNavigate={onNavigate} mapTo={{ 'alva-agent': 'agent' }}>

      <h1 className="text-[28px] leading-[38px] tracking-[0.28px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT, fontWeight: 400 }}>Alva Agent</h1>

      {/* Connected App */}
      <div className="flex flex-col gap-[12px]">
        <div>
          <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>Connected App</p>
          <p className="text-[12px] leading-[20px] tracking-[0.12px] mt-[2px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>Connect one or more messaging apps to chat with your Alva Agent anywhere.</p>
        </div>
        <div className="flex flex-col gap-[var(--spacing-m)]">
          {PLATFORMS.map(p => {
            const isActive = has(p.id);
            return (
              <div
                key={p.id}
                className="flex items-center gap-[16px] px-[20px] py-[16px] rounded-[8px]"
                style={{ background: 'rgba(0,0,0,0.02)' }}
              >
                {p.render()}
                <div className="flex-1 min-w-0">
                  <p className="text-[16px] leading-[26px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>{p.name}</p>
                  {isActive && (
                    <p className="text-[14px] leading-[22px] mt-[2px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>{p.handle}</p>
                  )}
                </div>
                <button
                  onClick={() => toggle(p.id)}
                  className="text-[14px] leading-[22px] cursor-pointer"
                  style={{ color: isActive ? 'rgba(0,0,0,0.5)' : '#49a3a6', background: 'none', border: 'none', fontFamily: FONT, fontWeight: 400 }}
                >
                  {isActive ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Customize */}
      <div className="flex flex-col gap-[12px]">
        <div>
          <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>Customize Your Assistant</p>
          <p className="text-[12px] leading-[20px] tracking-[0.12px] mt-[2px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>Define the personality, tone, and response style.</p>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Define your assistant's identity: name, tone, and response style"
          className="h-[160px] p-[16px] rounded-[8px] text-[16px] leading-[26px] tracking-[0.16px] outline-none resize-none"
          style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT, border: '0.5px solid rgba(0,0,0,0.3)', background: '#fff' }}
        />
      </div>

      <button
        disabled={!dirty}
        className="h-[48px] w-[120px] px-[16px] rounded-[8px] flex items-center justify-center text-[16px] font-medium leading-[26px] tracking-[0.16px]"
        style={{
          background: dirty ? '#49A3A6' : 'rgba(0,0,0,0.05)',
          border: 'none',
          color: dirty ? '#fff' : 'rgba(0,0,0,0.2)',
          fontFamily: FONT,
          cursor: dirty ? 'pointer' : 'not-allowed',
        }}
      >
        Save
      </button>
    </SettingsLayout>
  );
}
