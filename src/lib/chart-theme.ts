export const CHART_COLORS = {
  primary: '#49A3A6',
  orange: '#FF9800',
  green: '#40A544',
  blue: '#5F75C9',
  red: '#E05357',
  yellow: '#E6A91A',
  deepBlue: '#3D8BD1',
} as const;

export const CHART_COLOR_PALETTE = [
  CHART_COLORS.primary,
  CHART_COLORS.orange,
  CHART_COLORS.green,
  CHART_COLORS.blue,
  CHART_COLORS.red,
  CHART_COLORS.yellow,
];

export const AVATAR_COLOR_PALETTE = [
  '#49A3A6', '#FF9800', '#40A544', '#8FC13A', '#3D8BD1',
  '#0D7498', '#5F75C9', '#7474D8', '#A878DC', '#DC7AA5',
  '#C76466', '#E6A91A', '#E05357', '#007949', '#838383',
];

export const CREATOR_AVATARS: Record<string, string> = {
  'Alva Intern': 'https://api.dicebear.com/9.x/notionists/svg?seed=AlvaIntern&backgroundColor=e8f5e9',
  'Harry Zzz': 'https://api.dicebear.com/9.x/notionists/svg?seed=HarryZzz&backgroundColor=e3f2fd',
  'Smart Jing': 'https://api.dicebear.com/9.x/notionists/svg?seed=SmartJing&backgroundColor=fce4ec',
  'Sheer YLL YGG': 'https://api.dicebear.com/9.x/notionists/svg?seed=SheerYLL&backgroundColor=fff3e0',
  'Macro Scope X': 'https://api.dicebear.com/9.x/notionists/svg?seed=MacroScopeX&backgroundColor=ede7f6',
};

export const FONT = "'Delight', -apple-system, BlinkMacSystemFont, sans-serif";
