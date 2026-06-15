import{c as e,f as t,l as n,n as r}from"./index-CrYG1NLV.js";import{a as i,n as a,r as o}from"./ChatInput-PlsQKsMe.js";var s=t(n(),1),c=e(),l=r();function u(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}var d=`Filings.Insider Cluster.Event Drift.Earnings Drift.Whisper Numbers.Macro Flow.FX Cross.Rates Curve.Credit Spread.Sentiment.Theme Tracker.Catalyst.Risk Off.Backtest.Yield Curve.Dividend.On-Chain.ETF Flow.MAG7.AI Capex.Hyperscaler.Volatility.Carry.Drawdown.Sharpe.Quintile.Read-Across.Sector Rotation.Pair Trade.Theme`.split(`.`);function f(e){let t=(u(e)>>>12)%2+2,n=new Set,r=[];for(let i=0;r.length<t&&i<32;i++){let t=u(`${e}|tag|${i}`)%d.length;n.has(t)||(n.add(t),r.push(d[t]))}return r}function p(e){let t=u(e)%7200;return t<1?`just now`:t<60?`${t}m ago`:t<1440?`${Math.floor(t/60)}h ago`:`${Math.floor(t/1440)}d ago`}var m=e=>()=>(0,l.jsx)(`img`,{src:`/alva-infant/${e}`,alt:``,width:14,height:14,style:{width:14,height:14,display:`block`}}),h={discord:{key:`discord`,label:`Discord`,href:`https://discord.com`,render:m(`logo-social-discord.svg`)},telegram:{key:`telegram`,label:`Telegram`,href:`https://telegram.org`,render:m(`logo-social-telegram.svg`)},x:{key:`x`,label:`X`,href:`https://x.com`,render:()=>(0,l.jsx)(`svg`,{width:12,height:12,viewBox:`0 0 24 24`,fill:`rgba(0,0,0,0.85)`,"aria-hidden":!0,style:{display:`block`},children:(0,l.jsx)(`path`,{d:`M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z`})})},instagram:{key:`instagram`,label:`Instagram`,href:`https://instagram.com`,render:()=>(0,l.jsx)(`svg`,{width:13,height:13,viewBox:`0 0 24 24`,fill:`rgba(0,0,0,0.85)`,"aria-hidden":!0,style:{display:`block`},children:(0,l.jsx)(`path`,{d:`M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z`})})}},g=[`discord`,`telegram`,`x`],_=[`x`,`telegram`,`discord`,`instagram`];function v(e){if(e===`Alva`)return g.map(e=>h[e]);let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619)>>>0;let n=e=>{let n=t;for(let t=0;t<e.length;t++)n^=e.charCodeAt(t),n=Math.imul(n,16777619)>>>0;return n},r=t%2+1;return[..._].sort((e,t)=>n(e)-n(t)).slice(0,r).map(e=>h[e])}var y=`
@keyframes skills-panel-fade{from{opacity:0}to{opacity:1}}
.skills-panel-backdrop{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.45);
  z-index:9998;
  animation:skills-panel-fade 200ms ease-out;
}
@keyframes skills-panel-modal-in{
  from{ opacity:0; transform:translate(-50%, -50%) scale(0.96); }
  to{ opacity:1; transform:translate(-50%, -50%) scale(1); }
}
.skills-panel{
  position:fixed;
  left:50%;
  top:50%;
  transform:translate(-50%, -50%);
  width:calc(100% - 48px);
  max-width:1200px;
  max-height:min(800px, calc(100vh - 64px));
  background:#fff;
  border-radius:var(--radius-pop-dialog, 8px);
  box-shadow:0 24px 64px rgba(0,0,0,0.16), 0 8px 24px rgba(0,0,0,0.08);
  z-index:9999;
  display:flex;
  flex-direction:column;
  animation:skills-panel-modal-in 220ms cubic-bezier(0.2,0.8,0.2,1);
  overflow:hidden;
}
.skills-panel-header{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:20px 24px 12px;
  flex-shrink:0;
}
.skills-panel-title{
  font-family:'Delight',sans-serif;
  font-size:18px;
  line-height:28px;
  font-weight:500;
  color:var(--text-n9);
  letter-spacing:0.18px;
}
.skills-panel-close{
  width:28px;
  height:28px;
  border:none;
  background:transparent;
  border-radius:6px;
  cursor:pointer;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  transition:background 140ms ease;
}
@media (hover: hover){
  .skills-panel-close:hover{ background:var(--b-r05); }
}
.skills-panel-scroll{
  flex:1;
  overflow-y:auto;
  padding:4px 24px 24px;
}
/* 手动分列瀑布流:JS 把卡片 round-robin 分到 N 个独立列容器(flex column)
   每列独立堆叠 → 第一行顶部对齐;某列内 hover 撑高,只影响同列下方卡片,
   其它列不会跟着重排。 */
.skills-panel-grid{
  display:flex;
  gap:12px;
  align-items:flex-start;
}
.skills-panel-col{
  flex:1 1 0;
  min-width:0;
  display:flex;
  flex-direction:column;
  gap:12px;
}
@media (max-width: 639px){
  .skills-panel{
    max-height:85vh;
  }
  .skills-panel-scroll{ padding:4px 16px 24px; }
  .skills-panel-header{ padding:16px 16px 8px; }
}
.skills-panel-card{
  position:relative;
  display:flex;
  flex-direction:column;
  gap:12px;
  padding:20px;
  text-align:left;
  background:var(--b-r02);
  border:1px solid var(--line-l07);
  border-radius:8px;
  cursor:pointer;
  /* Same easing + duration for hover-in and hover-out across every prop */
  transition:background 240ms cubic-bezier(0.4, 0, 0.2, 1),
             border-color 240ms cubic-bezier(0.4, 0, 0.2, 1),
             box-shadow 240ms cubic-bezier(0.4, 0, 0.2, 1),
             padding-bottom 240ms cubic-bezier(0.4, 0, 0.2, 1);
}
@media (hover: hover){
  .skills-panel-card:hover{
    background:rgba(255,255,255,0.9);
    border-color:var(--line-l9, rgba(0,0,0,0.9));
    box-shadow:0 6px 20px rgba(0,0,0,0.04);
    /* 用户行下方边距 = 用户行到分割线的距离(16px)*/
    padding-bottom:16px;
  }
}
.skills-panel-card.is-selected{
  background:var(--b-r02);
  border-color:var(--line-l9, rgba(0,0,0,0.9));
}
@media (hover: hover){
  .skills-panel-card.is-selected:hover{
    background:rgba(255,255,255,0.9);
    border-color:var(--line-l9, rgba(0,0,0,0.9));
    box-shadow:0 6px 20px rgba(0,0,0,0.04);
  }
}
/* Hover 展开底部 creator + socials 行。
   所有过渡使用统一的 240ms cubic-bezier(0.4,0,0.2,1),确保
   hover-in 和 hover-out 节奏一致。 */
.skills-panel-card-hoverblock{
  display:grid;
  grid-template-rows:0fr;
  opacity:0;
  /* margin-top:-12 抵消 card-level gap:12,使收起态不留间距;
     展开时 grid-template-rows 撑开,gap 通过 row-gap 自然出现。 */
  margin-top:-12px;
  transition:grid-template-rows 240ms cubic-bezier(0.4, 0, 0.2, 1),
             opacity 240ms cubic-bezier(0.4, 0, 0.2, 1),
             margin-top 240ms cubic-bezier(0.4, 0, 0.2, 1);
}
.skills-panel-card-hoverblock-inner{
  overflow:hidden;
  min-height:0;
}
@media (hover: hover){
  .skills-panel-card:hover .skills-panel-card-hoverblock{
    grid-template-rows:1fr;
    opacity:1;
    margin-top:0;
  }
}
@media (hover: none){
  .skills-panel-card-hoverblock{
    grid-template-rows:1fr;
    opacity:1;
    margin-top:0;
  }
}
/* KOL 卡片(顶部用 Avatar):hover 时头像隐藏,标题块滑到左侧。
   Alva 卡片(顶部用 icon-wrap)不参与此动画 —— 图标保留。
   偏移 = 头像 48 + gap 12。 */
@media (hover: hover){
  .skills-panel-card:hover .skills-panel-card-creator-thumb{
    visibility:hidden;
  }
  .skills-panel-card:hover .skills-panel-card-creator-thumb + .skills-panel-card-titleblock{
    transform:translateX(-60px);
  }
}
.skills-panel-card-divider{
  height:1px;
  background:var(--line-l07);
  margin:0 0 16px;
}
.skills-panel-card-creator-row{
  display:flex;
  align-items:center;
  gap:10px;
}
.skills-panel-card-creator-text{
  flex:1;
  min-width:0;
  display:flex;
  flex-direction:column;
}
.skills-panel-card-creator-caps{
  font-family:'Delight',sans-serif;
  font-size:11px;
  line-height:14px;
  color:rgba(0,0,0,0.4);
  letter-spacing:0.11px;
}
.skills-panel-card-creator-name{
  align-self:flex-start;
  max-width:100%;
  padding:0;
  margin:0;
  background:transparent;
  border:none;
  cursor:pointer;
  text-align:left;
  color:var(--text-n9);
  font:inherit;
}
.skills-panel-card-creator-name-text{
  display:inline-block;
  max-width:100%;
  font-family:'Delight',sans-serif;
  font-size:13px;
  line-height:18px;
  font-weight:500;
  color:var(--text-n9);
  letter-spacing:0.13px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  text-decoration:underline dashed transparent;
  text-decoration-thickness:1px;
  text-underline-offset:3px;
  transition:text-decoration-color 160ms ease;
}
@media (hover: hover){
  .skills-panel-card-creator-name:hover .skills-panel-card-creator-name-text{
    text-decoration-color:var(--text-n9);
  }
}
.skills-panel-card-socials{
  display:flex;
  align-items:center;
  gap:6px;
  flex-shrink:0;
}
.skills-panel-card-social{
  width:24px;
  height:24px;
  border-radius:9999px;
  background:var(--b-r05);
  display:inline-flex;
  align-items:center;
  justify-content:center;
  transition:background 120ms ease;
}
.skills-panel-card-social:hover{ background:rgba(0,0,0,0.1); }
/* 卡片头(参考 Skills Hub 截图):大圆图标 / 头像 + 标题 + by-line */
.skills-panel-card-header{
  display:flex;
  align-items:center;
  gap:12px;
}
.skills-panel-card-icon-wrap{
  width:48px;
  height:48px;
  flex-shrink:0;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  border-radius:9999px;
  background:#fff;
  border:1px solid var(--line-l07);
  transition:background 240ms cubic-bezier(0.4, 0, 0.2, 1);
}
@media (hover: hover){
  .skills-panel-card:hover .skills-panel-card-icon-wrap{
    background:var(--b-r02);
  }
}
.skills-panel-card-creator-thumb{
  flex-shrink:0;
  display:inline-flex;
  align-items:center;
}
.skills-panel-card-titleblock{
  flex:1;
  min-width:0;
  display:flex;
  flex-direction:column;
  gap:2px;
  transition:transform 240ms cubic-bezier(0.4, 0, 0.2, 1);
}
.skills-panel-card-name{
  font-family:'Delight',sans-serif;
  font-size:16px;
  line-height:24px;
  font-weight:400;
  color:var(--text-n9);
  letter-spacing:0.16px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.skills-panel-card-author{
  font-family:'Delight',sans-serif;
  font-size:12px;
  line-height:18px;
  color:var(--text-n5);
  letter-spacing:0.12px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.skills-panel-card-desc{
  font-family:'Delight',sans-serif;
  font-size:13px;
  line-height:22px;
  color:var(--text-n7);
  letter-spacing:0.13px;
  margin:0;
}
.skills-panel-card-tags{
  display:flex;
  flex-wrap:wrap;
  gap:6px;
}
.skills-panel-card-tag{
  height:24px;
  padding:0 8px;
  border-radius:6px;
  background:var(--b-r05);
  color:var(--text-n5);
  font-family:'Delight',sans-serif;
  font-size:12px;
  line-height:20px;
  letter-spacing:0.12px;
  white-space:nowrap;
  display:inline-flex;
  align-items:center;
}
`;function b({skills:e,selectedId:t,onSelect:n,onClose:r}){let i=e=>e<640?1:e<960?2:3,[u,d]=(0,s.useState)(()=>typeof window>`u`?3:i(window.innerWidth));if((0,s.useEffect)(()=>{let e=()=>d(i(window.innerWidth));return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),typeof document>`u`)return null;let m=Array.from({length:u},()=>[]);return e.forEach((e,t)=>m[t%u].push(e)),(0,c.createPortal)((0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(`style`,{children:y}),(0,l.jsx)(`div`,{className:`skills-panel-backdrop`,onClick:r}),(0,l.jsxs)(`div`,{className:`skills-panel`,role:`dialog`,"aria-label":`Skills Hub`,children:[(0,l.jsxs)(`div`,{className:`skills-panel-header`,children:[(0,l.jsx)(`span`,{className:`skills-panel-title`,children:`Skills Hub`}),(0,l.jsx)(`button`,{type:`button`,"aria-label":`Close`,className:`skills-panel-close`,onClick:r,children:(0,l.jsx)(a,{name:`close-l1`,size:16,color:`var(--text-n7)`})})]}),(0,l.jsx)(`div`,{className:`skills-panel-scroll`,children:(0,l.jsx)(`div`,{className:`skills-panel-grid`,children:m.map((e,r)=>(0,l.jsx)(`div`,{className:`skills-panel-col`,children:e.map(e=>{let r=e.tags??f(e.id),i=t===e.id,s=v(e.creator);return(0,l.jsxs)(`button`,{type:`button`,className:`skills-panel-card${i?` is-selected`:``}`,onClick:()=>n(e.id),children:[(0,l.jsxs)(`div`,{className:`skills-panel-card-header`,children:[e.creator===`Alva`&&e.icon?(0,l.jsx)(`span`,{className:`skills-panel-card-icon-wrap`,children:(0,l.jsx)(a,{name:e.icon,size:22,color:`var(--text-n7)`})}):(0,l.jsx)(`span`,{className:`skills-panel-card-creator-thumb`,children:(0,l.jsx)(o,{name:e.creator,size:48})}),(0,l.jsxs)(`div`,{className:`skills-panel-card-titleblock`,children:[(0,l.jsx)(`span`,{className:`skills-panel-card-name`,children:e.label}),(0,l.jsxs)(`span`,{className:`skills-panel-card-author`,children:[`by `,e.creator,` · `,p(e.id)]})]})]}),(0,l.jsx)(`p`,{className:`skills-panel-card-desc`,children:e.description}),r.length>0&&(0,l.jsx)(`div`,{className:`skills-panel-card-tags`,children:r.slice(0,3).map(e=>(0,l.jsx)(`span`,{className:`skills-panel-card-tag`,children:e},e))}),(0,l.jsx)(`div`,{className:`skills-panel-card-hoverblock`,children:(0,l.jsxs)(`div`,{className:`skills-panel-card-hoverblock-inner`,children:[(0,l.jsx)(`div`,{className:`skills-panel-card-divider`}),(0,l.jsxs)(`div`,{className:`skills-panel-card-creator-row`,children:[(0,l.jsx)(o,{name:e.creator,size:36}),(0,l.jsxs)(`div`,{className:`skills-panel-card-creator-text`,children:[(0,l.jsx)(`span`,{className:`skills-panel-card-creator-caps`,children:`Created by`}),(0,l.jsx)(`button`,{type:`button`,className:`skills-panel-card-creator-name`,onClick:e=>e.stopPropagation(),children:(0,l.jsx)(`span`,{className:`skills-panel-card-creator-name-text`,children:e.creator})})]}),(0,l.jsx)(`div`,{className:`skills-panel-card-socials`,children:s.map(e=>(0,l.jsx)(`a`,{href:e.href,target:`_blank`,rel:`noreferrer noopener`,"aria-label":e.label,onClick:e=>e.stopPropagation(),className:`skills-panel-card-social`,children:e.render()},e.key))})]})]})})]},e.id)})},r))})})]})]}),document.body)}var x=i,S=[{id:`extra-hyperscaler-capex`,title:`Hyperscaler Capex Tracker`,creator:`Macro Scope X`,desc:`Quarterly roll-up of MSFT / AMZN / GOOGL / META capex guidance, mapped to AI-infra beneficiaries with accel/decel flags.`,tickers:[`MSFT`,`AMZN`,`GOOGL`,`META`],color:x.primary,stars:489,remixes:72},{id:`extra-gold-regime`,title:`Gold Regime Dashboard`,creator:`Sheer YLL YGG`,desc:`Real-yield, DXY, and central-bank-buying regime overlay for gold with confidence-scored regime shifts.`,tickers:[`GLD`,`GDX`,`DXY`],color:x.orange,stars:342,remixes:51},{id:`extra-eth-l2`,title:`ETH L2 Market Share`,creator:`YGGYLL`,desc:`Live TVL, daily txns, and fee capture across Base / Arbitrum / Optimism / zkSync with revenue accrual to ETH mainnet.`,tickers:[`ETH`,`ARB`,`OP`],color:x.deepBlue,stars:276,remixes:44},{id:`extra-fomc-playbook`,title:`FOMC Day Playbook`,creator:`Harry Zzz`,desc:`Intraday vol + rate-path positioning around every FOMC. Tracks dot-plot surprise, SEP revisions, and post-meeting rotation.`,tickers:[`SPY`,`TLT`,`VIX`],color:x.red,stars:198,remixes:29},{id:`extra-pair-trade`,title:`Pair-Trade Radar`,creator:`Alva Intern`,desc:`Scans SPX + NDX pairs for 2σ spread dislocations with cointegration filter. Generates long/short candidates with sizing.`,tickers:[`KO`,`PEP`,`V`,`MA`],color:x.blue,stars:164,remixes:23},{id:`extra-dividend-alpha`,title:`Dividend Aristocrat Alpha`,creator:`Smart Jing`,desc:`Ranks 65 aristocrats by yield-on-cost, payout coverage, and 3Y growth. Rotates into the top quintile monthly.`,tickers:[`SPX`,`NOBL`],color:x.green,stars:231,remixes:38}],C=e=>{if(e.length>=6)return e.slice(0,6);let t=6-e.length,n=new Set(e.map(e=>e.id)),r=[];for(let e of S){if(r.length>=t)break;n.has(e.id)||r.push(e)}return[...e,...r]},w=[{id:`theme-tracker`,label:`Theme Tracker`,icon:`buld-l`,creator:`Alva`,description:`Build a live tracker for any market theme — surfaces sentiment, earnings, and policy catalysts across the basket weekly.`,prompts:[`Which AI-infrastructure names (NVDA, AVGO, TSM) have the strongest momentum right now?`,`What’s driving the obesity-drug basket — LLY, NVO, AMGN — this week?`,`Build a live tracker for nuclear-renaissance equities with catalyst alerts`],playbooks:C([{id:`ai-infra-theme`,title:`AI Infra Theme Radar`,creator:`Alva Intern`,desc:`Tracks NVDA / AVGO / TSM + power grid enablers. Surfaces weekly sentiment + rev-beat signals and rebalances exposure to the strongest relative performers.`,tickers:[`NVDA`,`AVGO`,`TSM`,`VST`],color:x.primary,stars:312,remixes:48},{id:`glp1-theme`,title:`GLP-1 Obesity Complex`,creator:`Harry Zzz`,desc:`Unified tracker for GLP-1 winners (LLY / NVO) and food/restaurant losers. Weekly sentiment scoring with catalyst calendar.`,tickers:[`LLY`,`NVO`,`AMGN`],color:x.orange,stars:186,remixes:22},{id:`nuclear-theme`,title:`Nuclear Renaissance Monitor`,creator:`Macro Scope X`,desc:`Watches uranium miners, SMR names, and hyperscaler PPA headlines. Surfaces policy + permitting catalysts in near real-time.`,tickers:[`CCJ`,`SMR`,`VST`,`CEG`],color:x.deepBlue,stars:94,remixes:12}]),recCards:[{type:`playbook`,playbook:{id:`tt-rec-pb`,title:`AI Infra Theme Radar`,creator:`Alva Intern`,desc:`Tracks NVDA / AVGO / TSM + power enablers. Weekly sentiment and rev-beat signals, rebalances to the strongest relative performers.`,tickers:[`NVDA`,`AVGO`,`TSM`,`VST`],color:x.primary,stars:312,remixes:48}},{type:`playbook`,playbook:{id:`tt-rec-pb2`,title:`GLP-1 Obesity Complex`,creator:`Harry Zzz`,desc:`Unified tracker for GLP-1 winners (LLY / NVO) and food/restaurant losers. Weekly sentiment scoring with catalyst calendar.`,tickers:[`LLY`,`NVO`],color:x.orange,stars:186,remixes:22}},{type:`playbook`,playbook:{id:`tt-rec-pb3`,title:`Nuclear Renaissance Monitor`,creator:`Macro Scope X`,desc:`Watches uranium miners, SMR names, and hyperscaler PPA headlines. Surfaces policy + permitting catalysts in near real-time.`,tickers:[`CCJ`,`SMR`],color:x.deepBlue,stars:94,remixes:12}},{type:`push`,push:{kind:`normal`,id:`tt-rec-normal`,timestamp:`May 8, 9:00 AM`,source:`ai-infra-tracker`,feedName:`ai-infra-digest`,title:`【Blackwell ramp】· Hyperscaler orders pull forward into Q3, supply still tight`,bullets:[`🏭 TSMC CoWoS capacity booked through year-end; HBM remains the bottleneck`,`📈 AVGO raises AI revenue guide; custom-silicon pipeline expands`,`⚡ Grid + power names (VST, CEG) bid as data-center demand compounds`,`🧠 Context: hyperscaler capex revisions continue to climb — MSFT guided FY26 capex above consensus, AMZN reiterated full-year spend, GOOGL flagged TPU v6 ramp, and META lifted the low end of its range. Supply chain checks point to CoWoS-L allocation tightening through Q1 with HBM4 qualification slipping for at least one memory vendor.`,`📌 Watch next: NVDA GTC keynote (Mar 17) for Rubin platform details, AVGO earnings (Mar 5) for AI ASIC backlog update, and TSMC Feb revenue print for wafer-start confirmation. Any guide-down on CoWoS expansion would be the first crack in the thesis.`,`⚠️ Risk framing: basket is +38% YTD vs SMH +21%; positioning is crowded and a single hyperscaler capex cut headline could trigger a 5-8% air pocket. Keep position sizes inside the 2% single-name band.`]}},{type:`push`,push:{kind:`trade`,id:`tt-rec-trade`,timestamp:`May 8, 12:00 PM`,source:`ai-infra-basket`,feedName:`theme-rebalancer`,rows:[{ticker:`NVDA`,action:`Buy`,detail:`weight 40%`,dir:`up`},{ticker:`AVGO`,action:`Buy`,detail:`weight 35%`,dir:`up`},{ticker:`TSM`,action:`Buy`,detail:`weight 25%`,dir:`up`}],note:`Rebalance: tilt to compute + packaging leaders by 90d relative strength`}}]},{id:`smart-screener`,label:`Smart Screener`,icon:`target-l2`,creator:`Alva`,description:`Rank stocks by any factor combo, daily.`,prompts:[`Which US large-caps have rising earnings estimates and positive momentum today?`,`Find cash-rich small-caps under 10x forward earnings with expanding margins`,`Build a dividend-growth screener I can rerun daily`],playbooks:C([{id:`momentum-quality`,title:`Momentum × Quality Screen`,creator:`Smart Jing`,desc:`Daily screen ranking SPX names by 6M momentum × ROIC. Top decile goes long, rebalances weekly with 2% stop-loss band.`,tickers:[`SPX`,`QQQ`],color:x.green,stars:241,remixes:37},{id:`cheap-cashcow`,title:`Cheap Cash Cow Screener`,creator:`Alva Intern`,desc:`Finds small/mid-caps with FCF yield > 8% and net debt / EBITDA < 1.5. Excludes financials and energy. Rebalances monthly.`,tickers:[`R2K`],color:x.blue,stars:128,remixes:19},{id:`crypto-breakout`,title:`Crypto Breakout Screen`,creator:`YGGYLL`,desc:`Scans top-50 tokens for 30D return > 30% combined with rising active-address count. Generates candidate list for further review.`,tickers:[`BTC`,`ETH`,`SOL`,`AVAX`],color:x.red,stars:76,remixes:9}]),recCards:[{type:`playbook`,playbook:{id:`ss-rec-pb`,title:`Momentum × Quality Screen`,creator:`Smart Jing`,desc:`Daily screen ranking SPX names by 6M momentum × ROIC. Top decile goes long, weekly rebalance with a 2% stop band.`,tickers:[`SPX`,`QQQ`],color:x.green,stars:241,remixes:37}},{type:`playbook`,playbook:{id:`ss-rec-pb2`,title:`Cheap Cash Cow Screener`,creator:`Alva Intern`,desc:`Finds small/mid-caps with FCF yield > 8% and net debt / EBITDA < 1.5. Excludes financials and energy. Rebalances monthly.`,tickers:[`R2K`],color:x.blue,stars:128,remixes:19}},{type:`playbook`,playbook:{id:`ss-rec-pb3`,title:`Crypto Breakout Screen`,creator:`YGGYLL`,desc:`Scans top-50 tokens for 30D return > 30% combined with rising active-address count. Generates candidate list for review.`,tickers:[`BTC`,`SOL`],color:x.red,stars:76,remixes:9}},{type:`push`,push:{kind:`normal`,id:`ss-rec-normal`,timestamp:`May 8, 8:30 AM`,source:`screener-run`,feedName:`momentum-quality-screen`,title:`【Daily screen】· 14 names enter the top decile, 9 drop out`,bullets:[`🟢 New entrants: ANET, FICO, GE — rising estimates + positive 20d momentum`,`🔴 Dropped: EW, MKTX — momentum decay below threshold`,`📊 Median forward P/E of the basket: 19.4x`]}},{type:`push`,push:{kind:`kol`,id:`ss-rec-kol`,timestamp:`May 8, 11:00 AM`,source:`kol-signal-relay`,feedName:`kol-watch`,kolName:`Smart Jing`,headlineTicker:`$ANET`,headlineText:`"Networking is the quiet winner of the AI buildout — backlog keeps compounding."`,quoteTicker:`$ANET`,quoteSide:`LONG`,analysis:`Screen surfaces ANET on momentum × ROIC; the KOL view aligns with the quality-momentum thesis. No risk view stated.`}}]},{id:`deep-dive`,label:`Deep Dive`,icon:`search-l`,creator:`Alva`,description:`A complete research package on any ticker. Pulls revenue segmentation from filings, builds a peer comparable set, traces the supply chain up and downstream, then drafts a bull and bear thesis with scenario-weighted price targets. Output is a single read-once briefing — no skimming required, no follow-up questions left dangling.`,prompts:[`Give me a deep-dive on NVDA — revenue segments, peer valuation, supply chain, bull/bear thesis`,`Deep-dive TSMC: capacity, customer mix, geopolitical risk, and margin trajectory`,`Turn a Solana deep-dive into a Playbook I can keep tracking`],playbooks:C([{id:`nvda-deepdive`,title:`NVDA 360° Deep Dive`,creator:`Sheer YLL YGG`,desc:`End-to-end NVDA research — revenue segmentation, hyperscaler capex correlation, peer valuation, and scenario-based price targets.`,tickers:[`NVDA`,`AMD`,`AVGO`],color:x.primary,stars:412,remixes:58},{id:`tsmc-deepdive`,title:`TSMC Long Thesis`,creator:`Macro Scope X`,desc:`Capacity roadmap, customer concentration, Arizona + Kumamoto fab ramps, geopolitical risk weighting, and 5Y margin path.`,tickers:[`TSM`,`2330.TW`],color:x.deepBlue,stars:163,remixes:21},{id:`sol-deepdive`,title:`SOL Ecosystem Deep Dive`,creator:`Harry Zzz`,desc:`DEX volume, Firedancer progress, validator decentralization, revenue accrual, and valuation vs ETH + L2 peers.`,tickers:[`SOL`],color:x.orange,stars:87,remixes:13}])},{id:`daily-macro-brief`,label:`Daily Macro Brief`,kol:!0,avatarSrc:`skill-daily-macro-brief.png`,creator:`Macro Scope X`,description:`A daily breakdown of macro flows — rates, FX, and cross-asset signals — distilled into a 5-minute brief.`,prompts:[`What are this morning’s key macro flows — rates, DXY, oil, credit spreads?`,`Give me a 5-minute China macro digest — credit impulse, property, policy`,`Build a daily macro brief that posts every US open`],playbooks:C([{id:`daily-macro`,title:`Daily Macro Brief`,creator:`Macro Scope X`,desc:`Auto-generated macro snapshot every US open — rates, DXY, oil, credit spreads, and LLM-authored summary of overnight drivers.`,tickers:[`DXY`,`CL`,`HYG`],color:x.deepBlue,stars:211,remixes:34},{id:`china-weekly`,title:`China Macro Weekly`,creator:`Harry Zzz`,desc:`Weekly China credit impulse, property sales, and policy-move tracker. Flags deviations from trend and dispatches alerts.`,tickers:[`FXI`,`KWEB`],color:x.red,stars:58,remixes:6},{id:`global-risk`,title:`Global Risk Cross-Asset`,creator:`Smart Jing`,desc:`Asia → Europe → US handoff dashboard tracking equity, rates, FX, and credit moves with regime-shift detection.`,tickers:[`SPY`,`EFA`,`EEM`],color:x.blue,stars:144,remixes:18}])},{id:`earnings-edge`,label:`Earnings Edge`,kol:!0,avatarSrc:`skill-earnings-edge.png`,creator:`Smart Jing`,description:`Whisper numbers and post-print drift, weekly.`,prompts:[`Summarize the latest NVDA earnings call and compare guidance to consensus`,`What are the whisper numbers for next week’s MAG7 reports?`,`Build a weekly post-earnings drift scanner for semis (TSM → ASML → NVDA)`],playbooks:C([{id:`earnings-whisper`,title:`Earnings Whisper Board`,creator:`Smart Jing`,desc:`Crowdsourced + LLM whisper numbers + post-earnings drift tracker. Ranks names by whisper-vs-consensus gap for upcoming reports.`,tickers:[`AAPL`,`MSFT`,`NVDA`,`META`],color:x.primary,stars:182,remixes:27},{id:`semis-readacross`,title:`Semis Read-Across`,creator:`Alva Intern`,desc:`Chain earnings read-across TSM → ASML → AMAT → NVDA. Quantifies lead-lag signal on each node of the supply chain.`,tickers:[`TSM`,`ASML`,`AMAT`,`NVDA`],color:x.orange,stars:74,remixes:10},{id:`mag7-postprint`,title:`MAG7 Post-Print Drift`,creator:`Harry Zzz`,desc:`Backtests post-earnings drift across MAG7 by surprise magnitude and guide direction. Suggests entry windows.`,tickers:[`AAPL`,`MSFT`,`GOOGL`,`AMZN`,`NVDA`,`META`,`TSLA`],color:x.green,stars:102,remixes:14}])}],T=[{id:`crypto-pulse`,label:`Crypto Pulse`,kol:!0,avatarSrc:`skill-crypto-pulse.png`,creator:`Harry Zzz`,description:`Spot tradable signal in noisy crypto. Aggregates news flow, on-chain activity, ETF flows, exchange balances, and stablecoin issuance into a single morning pulse — flags the names with statistically meaningful deviations and explains *why* in plain English so you can move before the desk does.`,prompts:[`Summarize the last 24h of news on Bitcoin and flag anything that moved price >2%`,`Scan top-50 tokens for 30D breakouts and rising active addresses`,`Track ETH L2 market share — TVL, txns, and fee accrual back to mainnet`],playbooks:C([{id:`btc-news`,title:`BTC News Pulse`,creator:`YGGYLL`,desc:`24h news aggregator for BTC with sentiment scoring, price-correlation tagging, and auto-flagging of likely movers.`,tickers:[`BTC`],color:x.primary,stars:64,remixes:8},{id:`crypto-breakout-2`,title:`Crypto Breakout Screen`,creator:`YGGYLL`,desc:`Scans top-50 tokens for 30D return > 30% combined with rising active-address count.`,tickers:[`BTC`,`ETH`,`SOL`],color:x.red,stars:76,remixes:9}])},{id:`what-if`,label:`What If`,icon:`remix-l`,creator:`Alva`,description:`Run scenarios. See your portfolio reprice.`,prompts:[`What if the Fed delivers 3 more cuts in 2026 — how should a balanced 60/40 portfolio reposition?`,`What if NVDA earnings miss consensus by 5% next quarter — which AI beneficiaries still outperform?`,`What if oil spikes to $120 on Middle East tension — sector rotation map and hedges`],playbooks:C([{id:`fed-cuts-scenario`,title:`Fed-Cut Scenario Rebalancer`,creator:`Smart Jing`,desc:`Monte Carlo on 60/40 under 3 Fed cut paths (dovish / base / hawkish). Suggests duration + small-cap tilt adjustments each FOMC.`,tickers:[`AGG`,`IWM`,`SPY`],color:x.blue,stars:154,remixes:25},{id:`nvda-miss-scenario`,title:`NVDA Miss Shockwave`,creator:`Alva Intern`,desc:`What-if engine for AI peer reaction to a 5% NVDA revenue miss. Ranks relative drawdowns and identifies resilient derivatives plays.`,tickers:[`NVDA`,`AVGO`,`AMD`,`MU`],color:x.red,stars:98,remixes:14},{id:`oil-spike-scenario`,title:`Oil Spike Hedge Map`,creator:`Macro Scope X`,desc:`Maps SPX sector responses to a $120 oil scenario and proposes airline / transport hedges sized to portfolio oil-beta.`,tickers:[`XOM`,`CVX`,`DAL`,`FDX`],color:x.orange,stars:71,remixes:9}])},{id:`yield-hunter`,label:`Yield Hunter`,kol:!0,avatarSrc:`skill-yield-hunter.png`,creator:`Sheer YLL YGG`,description:`Hunts the highest risk-adjusted yield wherever it lives — Treasuries, IG and HY credit, preferreds, MLPs, REITs, and on-chain stablecoin lending. Normalizes spreads to common units, attaches default-probability and smart-contract-risk overlays where relevant, and ladders the result so you can rotate up or down the curve as regimes shift. Includes a tax-equivalent comparison across muni / corporate / pass-through structures.`,prompts:[`Compare 10Y Treasury yield vs IG/HY credit spreads with regime-shift highlights`,`Find dividend-growth names with 10+ years of growth and sub-60% payout ratio`,`Stablecoin yield ladder — Aave / Compound / Pendle with risk scores`],playbooks:C([{id:`div-aristocrat`,title:`Dividend Aristocrat Alpha`,creator:`Smart Jing`,desc:`Ranks 65 aristocrats by yield-on-cost, payout coverage, and 3Y growth. Rotates into the top quintile monthly.`,tickers:[`SPX`,`NOBL`],color:x.green,stars:231,remixes:38},{id:`credit-ladder`,title:`IG / HY Credit Ladder`,creator:`Macro Scope X`,desc:`Spread + duration ladder across IG and HY buckets with default-probability overlays and regime triggers.`,tickers:[`LQD`,`HYG`],color:x.blue,stars:89,remixes:12}])},{id:`dividend-diary`,label:`Dividend Diary`,kol:!0,avatarSrc:`skill-dividend-diary.png`,creator:`Lily Lou`,description:`A weekly diary of dividend hikes, cuts, and special distributions across SPX and global aristocrats.`,prompts:[`List companies that hiked dividends >10% this week and their payout coverage`,`Build a dividend-growth screener with 10+ years of growth and sub-60% payout ratio`,`Flag any SPX dividend cut announcements in the past 30 days`],playbooks:C([{id:`div-aristocrat-2`,title:`Dividend Aristocrat Alpha`,creator:`Smart Jing`,desc:`Ranks 65 aristocrats by yield-on-cost, payout coverage, and 3Y growth. Rotates into the top quintile monthly.`,tickers:[`SPX`,`NOBL`],color:x.green,stars:231,remixes:38},{id:`div-hikes`,title:`Weekly Dividend Hike Tracker`,creator:`Lily Lou`,desc:`Surfaces every SPX/RIY dividend hike each week with coverage, growth-streak, and post-announcement drift.`,tickers:[`SPX`],color:x.primary,stars:64,remixes:7}])},{id:`backtest`,label:`Backtest`,icon:`history-l`,creator:`Alva`,description:`Rule-based strategies, fully attributed.`,prompts:[`Backtest a monthly-rebalanced equal-weight MAG7 basket over the last 10 years`,`Backtest a BTC/ETH 70/30 portfolio rebalanced weekly with 15% max drawdown stop`,`Backtest buying TSM on days where NVDA gains >3%, exit on +10% TP or -5% SL`],playbooks:C([{id:`mag7-equal`,title:`MAG7 Equal-Weight`,creator:`Harry Zzz`,desc:`Maintains a fully invested equal-weight MAG7 portfolio, rebalanced monthly. Tracks alpha vs SPX and records decomposition.`,tickers:[`AAPL`,`MSFT`,`GOOGL`,`AMZN`,`NVDA`,`META`,`TSLA`],color:x.blue,stars:89,remixes:14},{id:`nvda-tsm-bt`,title:`NVDA +3% → TSM Entry`,creator:`Smart Jing`,desc:`Trigger-based backtest — buy TSM at close when NVDA gains >3%, exit on +10% TP or -5% SL. Full historical P&L attribution.`,tickers:[`NVDA`,`TSM`],color:x.red,stars:48,remixes:7},{id:`btc-macd-bt`,title:`BTC MACD 1h Crossover`,creator:`Macro Scope X`,desc:`Backtests BTC MACD(12,26,9) crossover on 1h candles. Reports Sharpe, max DD, and sensitivity to parameter sweeps.`,tickers:[`BTC`],color:x.deepBlue,stars:34,remixes:5}])},{id:`valuation`,label:`Valuation`,icon:`credit-l`,creator:`Alva`,description:`Reverse-DCF, relative-multiple, and SOTP frameworks — value any asset like a sell-side analyst.`,prompts:[`Build a reverse-DCF for MSFT implied by the current share price and compare to peers`,`Relative valuation snapshot for the Mag7 — EV/Sales, P/E, and FCF yield vs 5Y median`,`SOTP valuation for Amazon — AWS / Retail / Ads / Prime / Logistics`],playbooks:C([{id:`mag7-relval`,title:`MAG7 Relative Valuation`,creator:`Alva Intern`,desc:`Live EV/Sales, P/E NTM, and FCF yield table for MAG7 with z-score vs 5-year median. Highlights outliers automatically.`,tickers:[`AAPL`,`MSFT`,`GOOGL`,`AMZN`,`NVDA`,`META`,`TSLA`],color:x.primary,stars:142,remixes:23},{id:`amzn-sotp`,title:`AMZN SOTP`,creator:`Sheer YLL YGG`,desc:`Sum-of-the-parts on Amazon — AWS, Retail, Ads, Prime, Logistics. Adjustable multiples per segment and scenario toggles.`,tickers:[`AMZN`],color:x.orange,stars:96,remixes:11}])}],E=[{id:`community-insider-buy-radar`,label:`Insider Buy Radar`,kol:!0,creator:`Deep Ledger`,description:`Tracks clustered insider buys, 10b5-1 changes, and post-filing drift across US equities.`,tags:[`Filings`,`Insider Cluster`,`Event Drift`],uses:`1.8k uses`,updatedAt:`23m ago`,prompts:[`Build an insider-buy radar for US mid-caps, filtering for clustered purchases above $250k`,`Track 10b5-1 changes and open-market buys for software stocks with positive earnings revisions`,`Flag insider purchases that happen within 30 days of guidance updates or activist filings`],playbooks:C([{id:`insider-cluster-us`,title:`Clustered Insider Buy Monitor`,creator:`Deep Ledger`,desc:`Finds companies with multiple open-market insider purchases over a 14-day window and ranks them by purchase size, role seniority, and post-filing drift.`,tickers:[`SPX`,`R2K`],color:x.primary,stars:318,remixes:46},{id:`ceo-cfo-buys`,title:`CEO / CFO Buy Signal`,creator:`Deep Ledger`,desc:`Filters insider buys to CEO and CFO activity, removes low-signal option exercises, and scores names against valuation and estimate revisions.`,tickers:[`IWM`,`QQQ`],color:x.blue,stars:204,remixes:28},{id:`activist-plus-insider`,title:`Activist + Insider Overlap`,creator:`Alva Intern`,desc:`Watches activist filings and insider buying overlap, then builds a candidate list for event-driven deep dives.`,tickers:[`SPY`,`IWM`],color:x.orange,stars:147,remixes:19}])},{id:`community-whale-wallet-watch`,label:`Whale Wallet Watch`,kol:!0,creator:`WalletWatcher`,description:`Flags large wallet movements, exchange inflows, stablecoin rotations, and funding stress.`,tags:[`On-chain Flow`,`Exchange Flow`,`Liquidity`],uses:`2.4k uses`,updatedAt:`1h ago`,prompts:[`Track BTC whale movements above 1,000 BTC and alert when transfers move toward major exchanges`,`Build a stablecoin rotation monitor across USDT, USDC, and DAI with exchange inflow context`,`Watch SOL and ETH large-wallet activity alongside funding rates and spot volume`],playbooks:C([{id:`btc-whale-exchange-flow`,title:`BTC Whale Exchange Flow`,creator:`WalletWatcher`,desc:`Tracks dormant-wallet movements, large exchange deposits, and spot volume confirmation to flag potential sell-pressure windows.`,tickers:[`BTC`],color:x.orange,stars:402,remixes:64},{id:`stablecoin-rotation`,title:`Stablecoin Rotation Map`,creator:`YGGYLL`,desc:`Maps USDT / USDC flows by venue and chain, then scores whether liquidity is moving into or out of risk assets.`,tickers:[`USDT`,`USDC`,`BTC`],color:x.green,stars:288,remixes:41},{id:`sol-whale-pulse`,title:`SOL Whale Pulse`,creator:`Harry Zzz`,desc:`Combines SOL whale transfers, perp funding, and DEX volume to surface early risk-on and risk-off rotations.`,tickers:[`SOL`,`ETH`],color:x.deepBlue,stars:166,remixes:24}])},{id:`community-options-flow-scanner`,label:`Options Flow Scanner`,kol:!0,creator:`Options Club`,description:`Ranks unusual option flow by premium, sweep quality, open interest, and post-flow move.`,tags:[`Derivatives`,`Vol Surface`,`Positioning`],uses:`1.1k uses`,updatedAt:`5h ago`,prompts:[`Scan unusual call buying in liquid US equities, filtering for premium above $1m and OI expansion`,`Build a weekly options-flow dashboard for MAG7 with sweep quality and implied-vol change`,`Flag bearish put flow that appears before earnings or guidance revisions`],playbooks:C([{id:`unusual-call-flow`,title:`Unusual Call Flow Ranker`,creator:`Options Club`,desc:`Scores call sweeps by premium, liquidity, OI confirmation, and follow-through to reduce noisy single-print alerts.`,tickers:[`AAPL`,`NVDA`,`TSLA`],color:x.primary,stars:265,remixes:39},{id:`mag7-vol-flow`,title:`MAG7 Vol Flow Board`,creator:`Smart Jing`,desc:`Combines options premium, IV change, and post-flow price action across MAG7 for a daily directional board.`,tickers:[`AAPL`,`MSFT`,`NVDA`],color:x.blue,stars:221,remixes:31},{id:`earnings-put-flow`,title:`Pre-Earnings Put Flow`,creator:`Macro Scope X`,desc:`Watches put buying ahead of earnings and filters for flows that historically precede downside gaps.`,tickers:[`QQQ`,`SPY`],color:x.red,stars:119,remixes:15}])},{id:`community-semis-supply-chain`,label:`Semis Supply Chain`,kol:!0,creator:`Silicon Cycle`,description:`Connects TSM, ASML, HBM vendors, and hyperscaler capex into one signal map.`,tags:[`Supply Chain`,`Capacity`,`Read-through`],uses:`3.2k uses`,updatedAt:`1d ago`,prompts:[`Build a semis supply-chain tracker across NVDA, TSM, ASML, SK hynix, MU, and hyperscaler capex`,`Track HBM supply commentary and map read-through to GPU system shipments`,`Monitor TSM capacity, CoWoS packaging, and AI server demand signals in one weekly brief`],playbooks:C([{id:`hbm-bottleneck-map`,title:`HBM Bottleneck Map`,creator:`Silicon Cycle`,desc:`Tracks HBM supply, packaging capacity, and memory-vendor commentary to explain bottlenecks in AI accelerator shipments.`,tickers:[`NVDA`,`MU`,`TSM`],color:x.deepBlue,stars:534,remixes:82},{id:`cowos-capacity-watch`,title:`CoWoS Capacity Watch`,creator:`Macro Scope X`,desc:`Watches TSM advanced packaging updates, supplier lead times, and hyperscaler demand commentary.`,tickers:[`TSM`,`ASML`],color:x.primary,stars:346,remixes:47},{id:`ai-server-readthrough`,title:`AI Server Read-Through`,creator:`Alva Intern`,desc:`Maps Dell, Super Micro, ODM, and component commentary back to AI infrastructure beneficiaries.`,tickers:[`DELL`,`SMCI`,`NVDA`],color:x.orange,stars:271,remixes:33}])},{id:`community-dividend-cut-guard`,label:`Dividend Cut Guard`,kol:!0,creator:`Cashflow Club`,description:`Screens payout risk, FCF coverage, leverage, and management language before dividend cuts.`,tags:[`Payout Risk`,`FCF Coverage`,`Leverage`],uses:`760 uses`,updatedAt:`2d ago`,prompts:[`Screen dividend stocks for payout risk using FCF coverage, leverage, and negative guidance language`,`Build a dividend cut watchlist for REITs and utilities with debt maturity pressure`,`Flag companies where dividend yield is high but free cash flow coverage is deteriorating`],playbooks:C([{id:`dividend-cut-watchlist`,title:`Dividend Cut Watchlist`,creator:`Cashflow Club`,desc:`Ranks dividend stocks by FCF coverage, leverage trend, maturity wall, and management language risk.`,tickers:[`NOBL`,`SPX`],color:x.green,stars:186,remixes:23},{id:`reit-payout-risk`,title:`REIT Payout Risk Monitor`,creator:`Lily Lou`,desc:`Combines payout ratios, debt maturities, and cap-rate pressure for REIT dividend sustainability scoring.`,tickers:[`VNQ`,`SPY`],color:x.blue,stars:128,remixes:14},{id:`yield-trap-screen`,title:`Yield Trap Screen`,creator:`Smart Jing`,desc:`Screens high-yield names for deteriorating FCF, falling estimates, and leverage pressure.`,tickers:[`HYG`,`LQD`],color:x.red,stars:97,remixes:11}])},{id:`community-macro-brief-builder`,label:`Macro Brief Builder`,kol:!0,creator:`Market Bento`,description:`Turns rates, FX, oil, credit, and equity futures into a concise daily macro brief.`,tags:[`Cross-asset`,`Rates & FX`,`Risk Regime`],uses:`920 uses`,updatedAt:`3h ago`,prompts:[`Create a daily macro brief from rates, DXY, oil, credit spreads, and equity futures`,`Summarize today’s cross-asset risk regime and explain what changed since yesterday`,`Build a morning brief for Asia to US market handoff with rates, FX, and commodity context`],playbooks:C([{id:`cross-asset-morning-brief`,title:`Cross-Asset Morning Brief`,creator:`Market Bento`,desc:`Summarizes rates, FX, oil, credit, and equity futures into a concise macro regime note before the US open.`,tickers:[`DXY`,`TLT`,`SPY`],color:x.deepBlue,stars:214,remixes:31},{id:`risk-regime-score`,title:`Risk Regime Score`,creator:`Macro Scope X`,desc:`Combines VIX, credit spreads, DXY, and rates momentum into a daily risk-on / risk-off score.`,tickers:[`VIX`,`HYG`,`DXY`],color:x.red,stars:172,remixes:21},{id:`asia-us-handoff`,title:`Asia to US Handoff`,creator:`Harry Zzz`,desc:`Turns Asia and Europe market moves into a US premarket brief with ETF and futures context.`,tickers:[`EFA`,`EEM`,`SPY`],color:x.orange,stars:143,remixes:18}])},{id:`community-short-squeeze-radar`,label:`Short Squeeze Radar`,kol:!0,creator:`Float Hunter`,description:`Surfaces high short-interest names with rising borrow rates and tightening float dynamics.`,tags:[`Short Interest`,`Borrow Rate`,`Float`],uses:`1.3k uses`,updatedAt:`40m ago`,prompts:[`Find R2K names with SI > 20% of float and borrow rate above 15%`,`Rank squeeze candidates by days-to-cover and recent retail flow`],playbooks:C([{id:`r2k-squeeze-radar`,title:`R2K Squeeze Radar`,creator:`Float Hunter`,desc:`Ranks Russell 2000 names by short-interest, borrow rate, and days-to-cover with retail-flow overlay.`,tickers:[`IWM`,`R2K`],color:x.red,stars:251,remixes:33}])},{id:`community-etf-flow-tracker`,label:`ETF Flow Tracker`,kol:!0,creator:`Flowmaster`,description:`Daily net creations and redemptions across sector, factor, and thematic ETFs with regime context.`,tags:[`ETF Flow`,`Sector Rotation`,`Positioning`],uses:`2.1k uses`,updatedAt:`2h ago`,prompts:[`Show ETF flows by sector for the last 5 trading days`,`Map factor-ETF inflows to underlying single-name leadership`],playbooks:C([{id:`sector-etf-flow`,title:`Sector ETF Flow Board`,creator:`Flowmaster`,desc:`Daily net flows across XLK / XLF / XLE etc. with leadership scoring and breadth confirmation.`,tickers:[`SPY`,`QQQ`],color:x.blue,stars:188,remixes:26}])},{id:`community-fx-carry-monitor`,label:`FX Carry Monitor`,kol:!0,creator:`Carry Desk`,description:`Tracks G10 + EM carry baskets, vol-adjusted spreads, and rate-differential momentum.`,tags:[`FX`,`Carry`,`Rate Diff`],uses:`640 uses`,updatedAt:`4h ago`,prompts:[`Rank G10 carry pairs by vol-adjusted yield`,`Build an EM carry basket excluding TRY / ARS with hedge rules`],playbooks:C([{id:`g10-carry-rank`,title:`G10 Carry Ranker`,creator:`Carry Desk`,desc:`Vol-adjusted carry score across G10 with rate-differential momentum and DXY regime overlay.`,tickers:[`DXY`],color:x.orange,stars:124,remixes:16}])},{id:`community-credit-spread-watch`,label:`Credit Spread Watch`,kol:!0,creator:`Spread Lab`,description:`IG and HY OAS, distress ratios, and CDX positioning rolled up daily with regime detection.`,tags:[`Credit`,`OAS`,`CDX`],uses:`880 uses`,updatedAt:`1d ago`,prompts:[`Daily IG vs HY OAS snapshot with regime flag`,`Track CDX HY positioning and distress ratio for sub-IG`],playbooks:C([{id:`ig-hy-daily`,title:`IG vs HY Daily`,creator:`Spread Lab`,desc:`Daily OAS levels with z-score regime detection and distress-ratio overlay.`,tickers:[`LQD`,`HYG`],color:x.deepBlue,stars:159,remixes:22}])},{id:`community-ai-capex-monitor`,label:`AI Capex Monitor`,kol:!0,creator:`Hyperscaler Watch`,description:`Hyperscaler capex guidance, supplier read-through, and power-grid beneficiary mapping each quarter.`,tags:[`AI Capex`,`Hyperscaler`,`Read-through`],uses:`3.8k uses`,updatedAt:`6h ago`,prompts:[`Track MSFT/AMZN/GOOGL/META capex guides and revisions`,`Map AI capex to power and cooling beneficiaries`],playbooks:C([{id:`hyperscaler-capex-roll`,title:`Hyperscaler Capex Roll-Up`,creator:`Hyperscaler Watch`,desc:`Quarterly capex guides for MSFT/AMZN/GOOGL/META mapped to AI infra winners with accel/decel flags.`,tickers:[`MSFT`,`AMZN`,`GOOGL`,`META`],color:x.primary,stars:471,remixes:68}])},{id:`community-commodity-radar`,label:`Commodity Radar`,kol:!0,creator:`Pit Boss`,description:`Oil, copper, gold, and ags pricing with inventory, futures curve, and positioning context.`,tags:[`Commodities`,`Curve`,`Inventory`],uses:`730 uses`,updatedAt:`1d ago`,prompts:[`Daily WTI brief: inventory, curve shape, and producer hedging`,`Copper supply/demand monitor with Chinese demand overlay`],playbooks:C([{id:`wti-daily`,title:`WTI Daily Radar`,creator:`Pit Boss`,desc:`Inventory, futures curve, refinery margins, and producer hedging — daily.`,tickers:[`CL`],color:x.orange,stars:144,remixes:19}])},{id:`community-bond-auction-tracker`,label:`Bond Auction Tracker`,kol:!0,creator:`Auction Desk`,description:`Tracks Treasury auction tails, bid-to-cover, and primary-dealer takedown against rate moves.`,tags:[`Rates`,`Auctions`,`Tail Risk`],uses:`410 uses`,updatedAt:`2d ago`,prompts:[`Latest 10Y / 30Y auction tails with rate impact`,`Primary dealer takedown trends across coupon auctions`],playbooks:C([{id:`auction-tail-tracker`,title:`Auction Tail Tracker`,creator:`Auction Desk`,desc:`Bid-to-cover, tail size, indirect bid, and post-auction rate move per Treasury auction.`,tickers:[`TLT`],color:x.deepBlue,stars:78,remixes:9}])},{id:`community-earnings-revisions`,label:`Earnings Revisions Pulse`,kol:!0,creator:`EPS Watcher`,description:`Daily upward and downward revision breadth across sectors with single-name standouts.`,tags:[`Estimate Revisions`,`Breadth`,`Sectors`],uses:`1.5k uses`,updatedAt:`3h ago`,prompts:[`Daily revision breadth by sector`,`Top up/down NTM EPS revision names this week`],playbooks:C([{id:`revision-breadth`,title:`Revision Breadth Board`,creator:`EPS Watcher`,desc:`Sector-level upward / downward revision ratio with single-name standouts and price-action overlay.`,tickers:[`SPX`],color:x.green,stars:192,remixes:27}])},{id:`community-ipo-radar`,label:`IPO Radar`,kol:!0,creator:`Primary Desk`,description:`Tracks live and upcoming IPOs with comps, lockup expiries, and post-listing drift backtests.`,tags:[`IPO`,`Lockup`,`Comps`],uses:`520 uses`,updatedAt:`5h ago`,prompts:[`Upcoming IPO pipeline with valuation comps`,`Backtest post-lockup drift for tech IPOs since 2020`],playbooks:C([{id:`ipo-pipeline`,title:`IPO Pipeline Dashboard`,creator:`Primary Desk`,desc:`Live pipeline with deal size, target valuation, comps table, and lockup-expiry calendar.`,tickers:[`SPY`],color:x.blue,stars:96,remixes:12}])},{id:`community-buyback-tracker`,label:`Buyback Tracker`,kol:!0,creator:`Repurchase Co`,description:`Monitors authorized vs executed buybacks, yield, and post-program drift across SPX names.`,tags:[`Buybacks`,`Capital Return`,`Yield`],uses:`670 uses`,updatedAt:`8h ago`,prompts:[`Top buyback yield names this quarter`,`Track new authorizations and execution pace`],playbooks:C([{id:`buyback-yield-screen`,title:`Buyback Yield Screen`,creator:`Repurchase Co`,desc:`Ranks SPX names by trailing buyback yield, execution rate, and post-program drift.`,tickers:[`SPX`],color:x.primary,stars:121,remixes:16}])},{id:`community-sentiment-pulse`,label:`Sentiment Pulse`,kol:!0,creator:`Mood Ring`,description:`Crowd sentiment from X, Reddit, and Discord — scored, deduped, and tied to price action.`,tags:[`Sentiment`,`Social`,`Retail Flow`],uses:`2.8k uses`,updatedAt:`20m ago`,prompts:[`Top 10 names by 24h sentiment delta`,`Track retail-driven sentiment vs short-interest setups`],playbooks:C([{id:`social-sentiment-board`,title:`Social Sentiment Board`,creator:`Mood Ring`,desc:`Multi-platform sentiment scoring with dedup and price-action linkage, refreshed every hour.`,tickers:[`QQQ`,`SPY`],color:x.orange,stars:318,remixes:44}])},{id:`community-cn-policy-radar`,label:`China Policy Radar`,kol:!0,creator:`Beijing Desk`,description:`Reads PBOC, MoF, NDRC, and CSRC releases — flags moves likely to reprice Chinese assets.`,tags:[`China`,`Policy`,`Property`],uses:`590 uses`,updatedAt:`6h ago`,prompts:[`Weekly digest of PBOC operations and rate moves`,`Track property-stimulus measures and read-through to FXI / KWEB`],playbooks:C([{id:`pboc-weekly`,title:`PBOC Weekly Digest`,creator:`Beijing Desk`,desc:`PBOC OMO, MLF, RRR, and rate-corridor updates with FXI / KWEB / CNH read-through.`,tickers:[`FXI`,`KWEB`],color:x.red,stars:84,remixes:10}])},{id:`community-japan-radar`,label:`Japan Macro Radar`,kol:!0,creator:`Tokyo Tape`,description:`BOJ, JGB curve, JPY carry, and Topix flow watcher with English-language summaries.`,tags:[`Japan`,`BOJ`,`Carry`],uses:`380 uses`,updatedAt:`12h ago`,prompts:[`BOJ statement parser — hawkish/dovish scoring`,`Topix sector rotation tied to JPY moves`],playbooks:C([{id:`boj-parser`,title:`BOJ Statement Parser`,creator:`Tokyo Tape`,desc:`Tokenizes BOJ statements, scores hawkishness vs prior, and maps to JGB and JPY reaction.`,tickers:[`TOPIX 500`],color:x.deepBlue,stars:62,remixes:8}])},{id:`community-onchain-yield`,label:`On-Chain Yield Lab`,kol:!0,creator:`DeFi Lab`,description:`Stablecoin and ETH yields across Aave, Compound, Pendle, and points programs with risk scoring.`,tags:[`DeFi`,`Stablecoin`,`Yield`],uses:`1.0k uses`,updatedAt:`4h ago`,prompts:[`Compare stablecoin yields across Aave / Compound / Pendle`,`Build an ETH yield ladder with LST + restaking exposure`],playbooks:C([{id:`stablecoin-yield-rank`,title:`Stablecoin Yield Rank`,creator:`DeFi Lab`,desc:`Normalized yields across major venues with TVL, smart-contract age, and risk-tier scoring.`,tickers:[`USDT`,`USDC`],color:x.green,stars:137,remixes:18}])},{id:`community-event-study`,label:`Event Study Builder`,kol:!0,creator:`Event Lab`,description:`Spin up event-study windows around macro prints, earnings, or policy decisions in one click.`,tags:[`Event Study`,`Drift`,`Backtest`],uses:`450 uses`,updatedAt:`1d ago`,prompts:[`Run an event study on SPX around CPI prints since 2018`,`Build a custom event window around FOMC for risk assets`],playbooks:C([{id:`cpi-event-study`,title:`CPI Event Study`,creator:`Event Lab`,desc:`Pre/post CPI windows for SPX, IWM, and TLT with surprise-bucketed conditional drifts.`,tickers:[`SPY`,`IWM`,`TLT`],color:x.blue,stars:71,remixes:9}])},{id:`community-thematic-basket`,label:`Thematic Basket Builder`,kol:!0,creator:`Theme Lab`,description:`Build, weight, and backtest custom thematic baskets — from robotics to GLP-1 to nuclear.`,tags:[`Themes`,`Basket`,`Backtest`],uses:`1.7k uses`,updatedAt:`7h ago`,prompts:[`Build a humanoid-robotics basket with equal-weight and beta cap`,`Backtest a nuclear-renaissance basket with rebalancing rules`],playbooks:C([{id:`robotics-basket`,title:`Humanoid Robotics Basket`,creator:`Theme Lab`,desc:`Equal-weight basket of robotics names with monthly rebalance, beta cap, and risk parity weighting option.`,tickers:[`NVDA`,`TSLA`],color:x.primary,stars:226,remixes:31}])}];x.primary,x.orange,x.deepBlue,x.green,x.red,x.blue;export{u as a,b as i,T as n,v as o,w as r,f as s,E as t};