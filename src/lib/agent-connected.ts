import { useEffect, useState, useCallback } from 'react';

export type AgentPlatform = 'telegram' | 'discord';

const PLATFORMS_KEY = 'agentPlatforms';
const LEGACY_PLATFORM_KEY = 'agentPlatform';
const LEGACY_CONNECTED_KEY = 'agentConnected';
const EVENT = 'agent-connected-change';

const ALL: readonly AgentPlatform[] = ['telegram', 'discord'];

function read(): AgentPlatform[] {
  try {
    const raw = localStorage.getItem(PLATFORMS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.filter((p): p is AgentPlatform => ALL.includes(p));
      }
    }
    const legacy = localStorage.getItem(LEGACY_PLATFORM_KEY);
    if (legacy === 'telegram' || legacy === 'discord') return [legacy];
    if (localStorage.getItem(LEGACY_CONNECTED_KEY) === '1') return ['telegram'];
    return [];
  } catch { return []; }
}

export function useAgentPlatforms(): {
  platforms: AgentPlatform[];
  has: (p: AgentPlatform) => boolean;
  toggle: (p: AgentPlatform) => void;
  set: (next: AgentPlatform[]) => void;
} {
  const [platforms, setLocal] = useState<AgentPlatform[]>(read);

  useEffect(() => {
    const onChange = () => setLocal(read());
    window.addEventListener(EVENT, onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  const persist = useCallback((next: AgentPlatform[]) => {
    try {
      if (next.length > 0) localStorage.setItem(PLATFORMS_KEY, JSON.stringify(next));
      else localStorage.removeItem(PLATFORMS_KEY);
      localStorage.removeItem(LEGACY_PLATFORM_KEY);
      localStorage.removeItem(LEGACY_CONNECTED_KEY);
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const toggle = useCallback((p: AgentPlatform) => {
    persist(platforms.includes(p) ? platforms.filter(x => x !== p) : [...platforms, p]);
  }, [platforms, persist]);

  const has = useCallback((p: AgentPlatform) => platforms.includes(p), [platforms]);

  return { platforms, has, toggle, set: persist };
}

export function useAgentConnected(): [boolean, (value: boolean) => void] {
  const { platforms, set } = useAgentPlatforms();
  const setConnected = useCallback((value: boolean) => {
    set(value ? ['telegram'] : []);
  }, [set]);
  return [platforms.length > 0, setConnected];
}
