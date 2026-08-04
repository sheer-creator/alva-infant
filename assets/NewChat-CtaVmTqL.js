import{c as e,f as t,l as n,n as r}from"./index-LWmaJPZm.js";import{n as i,r as a,t as o}from"./ChatInput-BN0psCDM.js";import{a as s,t as c}from"./AppShell-B2hcyOau.js";import{n as l,t as u}from"./FeedDetailModal-CWmP-mle.js";import{a as d,i as f,n as p,o as m,r as h,s as g,t as _}from"./new-chat-mock-DkKr3pE1.js";import{i as ee,n as v,r as te,t as y}from"./TrendingFilterBar-BnQqK5-i.js";var b=e(),x=t(n(),1),S=r(),ne=(0,x.forwardRef)(function({icon:e,avatar:t,label:n,active:r,trailing:a,className:o,style:s,type:c=`button`,...l},u){return(0,S.jsxs)(`button`,{ref:u,type:c,className:`flex h-[38px] cursor-pointer items-center gap-[8px] rounded-full px-[16px] py-[8px] ${o??``}`,style:{fontFamily:`'Delight', sans-serif`,fontSize:14,fontWeight:400,lineHeight:`22px`,letterSpacing:.14,whiteSpace:`nowrap`,userSelect:`none`,border:r?`0.5px solid rgba(0,0,0,0.7)`:`0.5px solid var(--line-l2, rgba(0,0,0,0.2))`,background:r?`rgba(0,0,0,0.7)`:`#fff`,color:r?`rgba(255,255,255,0.9)`:`var(--text-n9, rgba(0,0,0,0.9))`,transition:`box-shadow 160ms ease, transform 160ms ease, background-color 120ms ease, color 120ms ease, border-color 120ms ease`,...s},...l,children:[e&&(0,S.jsx)(i,{name:e,size:18,color:r?`#fff`:`var(--text-n9, rgba(0,0,0,0.9))`}),t,(0,S.jsx)(`span`,{children:n}),a]})}),C=[{keys:[`btc`,`bitcoin`],prompts:[`Track BTC momentum and alert me on 1h breakouts above 3% gains`,`Build a BTC DCA playbook with weekly rebalancing and a 20% max drawdown stop`,`Correlate BTC with NASDAQ tech names and flag regime shifts in real time`]},{keys:[`eth`,`ethereum`],prompts:[`Set up an ETH staking-yield tracker with alerts on gas-fee spikes`,`Build an ETH/BTC ratio rotation playbook with RSI confirmation`,`Monitor ETH Layer-2 TVL shifts and flag capital rotation signals`]},{keys:[`sol`,`solana`],prompts:[`Track SOL DEX volume vs ETH and surface dApp rotation signals`,`Build a SOL/ETH pair-trade triggered by volume divergence`,`Monitor SOL validator health and alert on decentralization risk`]},{keys:[`nvda`,`nvidia`],prompts:[`Deep-dive NVDA — revenue segmentation, peer valuation, and supply-chain exposure`,`Build an NVDA earnings run-up playbook with an options overlay`,`Track NVDA vs AMD/AVGO relative strength with daily alerts`]},{keys:[`tsla`,`tesla`],prompts:[`Track TSLA delivery numbers vs consensus and alert on misses`,`Build a TSLA vs BYD pair-trade with weekly rebalancing`,`Correlate TSLA price with China EV sentiment and surface leading indicators`]},{keys:[`ai`,`artificial intelligence`],prompts:[`Surface the top 5 AI infrastructure plays by 90-day momentum`,`Build an AI-sector rotation basket rebalanced monthly`,`Compare AI beneficiaries vs software incumbents and flag divergences`]},{keys:[`macro`,`fed`,`cpi`,`rates`],prompts:[`Daily macro brief — US rates, DXY, oil, credit spreads with LLM commentary`,`Build a recession-risk dashboard with 5 leading indicators`,`Set up Fed-cut scenario alerts when CPI surprises move odds >5%`]},{keys:[`earnings`],prompts:[`Build an earnings whisper tracker for the next 2 weeks`,`Post-earnings drift playbook — long beaters, short missers on a 3-day hold`,`Compare implied vs realized moves across MAG7 earnings`]},{keys:[`options`,`iv`],prompts:[`Scan for unusual options volume in mega-cap tech and alert on sweeps`,`Build an IV-crush playbook for post-earnings plays`,`Track 0DTE flow on SPX and surface directional bias shifts`]},{keys:[`dividend`,`income`],prompts:[`Build a dividend-growth screen with 10+ years of growth and sub-60% payout ratio`,`Track dividend ex-dates across my watchlist and alert 5 days ahead`,`Compare dividend-yield baskets vs treasury yield and flag regime shifts`]},{keys:[`what is`,`what's`],prompts:[`What is the implied-volatility curve telling us about NVDA this week?`,`What is the best way to hedge a long BTC position right now?`,`What is the Sharpe ratio of my current portfolio over 90 days?`]},{keys:[`how to`,`how do i`,`how do`],prompts:[`How to build a momentum playbook with drawdown caps`,`How to hedge my equity portfolio against a Fed surprise`,`How to spot unusual options flow in real time`]},{keys:[`find`,`show me`,`show`],prompts:[`Find playbooks with >20% annualized return and <10% drawdown`,`Show me undervalued tech names with rising earnings estimates`,`Find the top yield opportunities in stablecoins right now`]},{keys:[`compare`,`vs`,`versus`],prompts:[`Compare NVDA and AMD across growth, margins, and valuation`,`Compare my portfolio vs the S&P 500 over the last 90 days`,`Compare BTC and ETH risk-adjusted returns year-to-date`]},{keys:[`why`],prompts:[`Why is BTC underperforming NASDAQ this month?`,`Why are semis volatile heading into earnings?`,`Why did my portfolio drop on Friday's close?`]},{keys:[`summarize`,`summary`,`tl;dr`],prompts:[`Summarize this week's Fed speakers and market reactions`,`Summarize my recent trades and flag any discipline slips`,`Summarize the latest AI-sector earnings ranked by relevance`]},{keys:[`explain`],prompts:[`Explain what's driving the 10-year yield higher today`,`Explain the divergence between SPX and credit spreads`,`Explain the risk profile of my current top holding`]}],w=2;function T(e){return e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)}function E(e,t){let n=`\\b${T(t).replace(/\s+/g,`\\s+`)}\\b`;return new RegExp(n,`i`).test(e)}function re(e){let t=e.trim();if(t.length<w||t.length>60||t.split(/\s+/).length>5)return[];for(let e of C)if(e.keys.some(e=>E(t,e)))return e.prompts;return[]}var D=[{id:`salp-thesis`,creator:`alvin0617`,title:`SALP Thesis Tracker`,description:`Tracks Situational Awareness LP — Leopold Aschenbrenner's AI infrastructure fund. Based on actual Q4 2025 13F holdings across four layers: AI Cloud, Power, Photonics, and Semiconductors.`,tickers:[`CRWV`,`CORZ`,`IREN`,`APLD`],pulse:`active`,stars:14731,remixes:68,cover:{template:`thesis`,title:`SALP Thesis Tracker`,author:`alvin0617`,tickers:[`CRWV`,`CORZ`,`IREN`,`APLD`],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-00f7b5d8-5b41-47cb-a98d-f3f7cc5c5be8.webp`}},{id:`humanoid-citrini-vf`,creator:`Lakel`,title:`Humanoid Robots Tracker`,description:`The humanoid robots thesis Citrini published in May 2025, now monitored and tracked daily. 75 names across 9 supply-chain layers, scored against fresh news + market data every weekday — with the read delivered to your phone.`,tickers:[`TSLA`,`NVDA`,`RRX`,`ON`],pulse:`active`,stars:480,remixes:5,cover:{template:`thesis`,title:`Humanoid Robots Tracker`,author:`Lakel`,tickers:[`TSLA`,`NVDA`,`RRX`,`ON`],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-faa0783d-4904-4e1e-9d9e-a142a6960793_Browserless.webp`}},{id:`cls-long-thesis-alva`,creator:`Lakel`,title:`Long Thesis: Celestica (CLS)`,description:`Long-thesis playbook on Celestica (CLS), ported to the Alva visual chassis from the Citrini Research article dated Jul 31, 2023.`,tickers:[`CLS`],pulse:`active`,stars:236,remixes:2,cover:{template:`thesis`,title:`Long Thesis: Celestica (CLS)`,author:`Lakel`,tickers:[`CLS`],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-d73c00b6-39a8-47de-a0fa-e2307b6ca088_Browserless.webp`}},{id:`amd-deep-dive`,creator:`Lakel`,title:`AMD Deep-Dive`,description:`Single-stock deep-dive on Advanced Micro Devices (AMD)`,tickers:[`AMD`],pulse:`active`,stars:167,remixes:1,cover:{template:`thesis`,title:`AMD Deep-Dive`,author:`Lakel`,tickers:[`AMD`],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-a43bb55b-e2bc-436f-b34c-ca5ed45d7f3c_Browserless.webp`}},{id:`iran-conflict-digest`,creator:`tianqi`,title:`Iran Conflict Digest`,description:`Daily classified digest of Iran military ops, nuclear program, Strait of Hormuz, regional proxies, and energy-market risk. Automated escalation classification, two-tier Brave search.`,tickers:[],pulse:`active`,stars:188,remixes:2,cover:{template:`thesis`,title:`Iran Conflict Digest`,author:`tianqi`,tickers:[],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-e9150041-4a33-4ca0-9862-1b9466e76964_Browserless.webp`}},{id:`shanghaojin-tweet-trader`,creator:`furyfrog1993`,title:`Herman Jin Tweet Trader`,description:`Backtest of @shanghaojin's tweet signals · 3 holding strategies · AI Trader Profile · Refreshed hourly`,tickers:[`NVDA`,`ICG`,`AVGO`,`GOOG`],pulse:`active`,stars:477,remixes:3,cover:{template:`thesis`,title:`Herman Jin Tweet Trader`,author:`furyfrog1993`,tickers:[`NVDA`,`ICG`,`AVGO`,`GOOG`],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-9f150e82-d3a6-4ce6-a81c-d3db7d2a2414_Browserless.webp`}},{id:`mag7-capex`,creator:`sirius.shen`,title:`AI Infra Stocks Tracker`,description:`Daily verification of the three AI-infra thesis pillars: Mag7 hyperscaler capex direction, ASIC vs GPU share-take, and real beneficiary revenue translation across optical / HBM / enterprise-AI storage. Tracks an 18-name basket vs SMH with ADK-narrated thesis-divergence findings.`,tickers:[`GOOG`,`MSFT`,`META`,`AMZN`],pulse:`active`,stars:2317,remixes:7,cover:{template:`thesis`,title:`AI Infra Stocks Tracker`,author:`sirius.shen`,tickers:[`GOOG`,`MSFT`,`META`,`AMZN`],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-dcf0fe01-30e7-48a2-9773-9b5823e23292.webp`}},{id:`korea-semi-raw-numbers`,creator:`Blue`,title:`Korea Semi Raw Numbers`,description:`Bare-bones KCS monitor for the two HS lines from the KOL post: DRAM/HBM (HS 8542.32) and SSD (HS 8523.51, the modern home after HS 8471.70.4010 was retired). Monthly export USD, weight, and implied unit price per group. No commentary, no equity proxies — just the raw numbers.`,tickers:[],pulse:`active`,stars:710,remixes:10,cover:{template:`thesis`,title:`Korea Semi Raw Numbers`,author:`Blue`,tickers:[],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-12812480-54ea-4d45-ab5f-063eebe9182b.webp`}},{id:`miner-ai-pivot`,creator:`alvin0617`,title:`Miner AI Pivot Tracker`,description:`9 Bitcoin miners pivoting to AI/HPC, tracked through Leopold Aschenbrenner's 'power is the bottleneck' lens. Daily quant snapshot + ADK divergence-finder anchored to three pillars: power capacity & energization, AI/HPC contract translation, and the mining-economics floor. Alpha measured vs BTC, SPY, and WGMI.`,tickers:[`WULF`,`CORZ`,`CIFR`,`HCM`],pulse:`active`,stars:58,remixes:1,cover:{template:`thesis`,title:`Miner AI Pivot Tracker`,author:`alvin0617`,tickers:[`WULF`,`CORZ`,`CIFR`,`HCM`],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-1eb4577d-d638-4feb-9724-cb693e490f8f_Browserless.webp`}},{id:`kol-tweet-trader-leaderboard`,creator:`vernon`,title:`KOL Tweet Trader Leaderboard`,description:`Top 50 financial KOLs ALVA tracks via per-handle tweet-trader campaign feeds — ranked by audited Score Index, win rate, and 90D backtest PnL.`,tickers:[],pulse:`active`,stars:44,remixes:1,cover:{template:`thesis`,title:`KOL Tweet Trader Leaderboard`,author:`vernon`,tickers:[],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-8c76f2b2-7833-42a5-9ee5-6c823d4d6c54_Browserless.webp`}},{id:`trump-china-tracker`,creator:`ivan`,title:`Trump China Trade Tracker`,description:`CEO DELEGATION TRACKER — US stocks tied to Trump's Beijing trip and surrounding China headlines
Ranked by delegation status, China-business linkage, and live news flow — surfaces who wins or loses as deals are announced from Beijing`,tickers:[],pulse:`idle`,stars:211,remixes:2,cover:{template:`thesis`,title:`Trump China Trade Tracker`,author:`ivan`,tickers:[],coverImageUrl:`https://alva-ai-static.b-cdn.net/prd/uploads/1961349611146735616/2026/05/f2033ae6-8faf-44e4-8374-260cf91f62b0.png`}},{id:`openai-rewire-screener`,creator:`MacKinsey`,title:`OpenAI Cloud Shift Screener`,description:`MEMORY CYCLE STAGE TRACKER — DRAM / NAND / HBM + semi hardware names with Early / Mid / Late / Down stage labels
Ranked by momentum, volume, and fundamental inflection — surfaces names where the memory cycle is turning`,tickers:[],pulse:`idle`,stars:382,remixes:2,cover:{template:`screener`,title:`OpenAI Cloud Shift Screener`,author:`MacKinsey`,tickers:[],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-ee0a6c0f-b1bb-44b0-80d1-afa3549136d4.webp`}},{id:`ai-infra-after-mag7-earnings`,creator:`MinnesotaCafe`,title:`AI Infra After Mag7 Earnings`,description:`AI infrastructure basket (equal-weight ANET/AVGO/MRVL/VRT/CRDO/NTAP) after each Mag7 earnings day, 2021-2025.`,tickers:[`ANET`,`AVGO`,`MRVL`,`VRT`],pulse:`idle`,stars:247,remixes:2,cover:{template:`what-if`,title:`AI Infra After Mag7 Earnings`,author:`MinnesotaCafe`,tickers:[`ANET`,`AVGO`,`MRVL`,`VRT`],coverImageUrl:`https://alva-ai-static.b-cdn.net/prd/uploads/1961349611146735616/2026/05/a8a10b60-033a-42fb-876a-a02338e0e7c4.png`}},{id:`aleabitoreddit-tweet-trader`,creator:`furyfrog1993`,title:`Serenity Tweet Trader`,description:`Backtest of @aleabitoreddit's tweet signals · 3 holding strategies · AI Trader Profile · Refreshed every 6h`,tickers:[`AAOI`,`AXTI`,`LITE`],pulse:`idle`,stars:333,remixes:1,cover:{template:`thesis`,title:`Serenity Tweet Trader`,author:`furyfrog1993`,tickers:[`AAOI`,`AXTI`,`LITE`],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-db3d8ffc-f3ad-413e-a517-cd9f0dd88681.webp`}},{id:`memory-cycle-screener`,creator:`ivan`,title:`Memory Cycle Screener`,description:`MEMORY CYCLE STAGE TRACKER — DRAM / NAND / HBM + semi hardware names with Early / Mid / Late / Down stage labels
Ranked by momentum, volume, and fundamental inflection — surfaces names where the memory cycle is turning`,tickers:[],pulse:`idle`,stars:285,remixes:4,cover:{template:`screener`,title:`Memory Cycle Screener`,author:`ivan`,tickers:[],coverImageUrl:`https://alva-ai-static.b-cdn.net/prd/uploads/1961349611146735616/2026/05/81ae6530-4f7f-45f4-b13a-239407b2a16a.png`}},{id:`kol-trade-ideas-digest-v3`,creator:`Brighton Knights`,title:`KOL Trade Ideas Digest`,description:`Daily digest of top trade calls from finance KOLs — clusters by asset, surfaces BTC directional splits, multi-asset singletons, and pushes fresh ideas every day.`,tickers:[`BTC`,`ETH`,`SOL`,`NVDA`],pulse:`idle`,stars:109,remixes:2,cover:{template:`thesis`,title:`KOL Trade Ideas Digest`,author:`Brighton Knights`,tickers:[`BTC`,`ETH`,`SOL`,`NVDA`],coverImageUrl:`https://alva-ai-static.b-cdn.net/prd/uploads/1961349611146735616/2026/05/ee372f15-f980-4f09-9535-1bd3a34d0ff4.png`}},{id:`commodity-pulse`,creator:`tianqi`,title:`Commodity Pulse`,description:`Commodity Pulse tracks fast-moving shifts across metals, energy, and critical minerals by combining market data, news, and social signals to surface what moved, why it matters, and what to watch next.`,tickers:[],pulse:`idle`,stars:35,remixes:1,cover:{template:`thesis`,title:`Commodity Pulse`,author:`tianqi`,tickers:[],coverImageUrl:`https://alva-ai-static.b-cdn.net/prd/uploads/1961349611146735616/2026/05/33357a50-8ae6-42da-9cb8-4c57faa4478a.png`}},{id:`ai-infra-after-mag7-earnings-2975`,creator:`steven`,title:`AI Infra After Mag7 Earnings`,description:`AI infrastructure basket (equal-weight ANET/AVGO/MRVL/VRT/CRDO/NTAP) after each Mag7 earnings day, 2021-2025.`,tickers:[`ANET`,`AVGO`,`MRVL`,`VRT`],pulse:`idle`,stars:190,remixes:1,cover:{template:`what-if`,title:`AI Infra After Mag7 Earnings`,author:`steven`,tickers:[`ANET`,`AVGO`,`MRVL`,`VRT`],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-4ffa8414-1026-4508-b990-4567d5bc100a.webp`}},{id:`market-anomaly-digest-v2`,creator:`B.D.E`,title:`Market Anomaly Digest`,description:`Daily anomaly digest — template-aligned. Tracks unusual price, volume, options, and volatility signals. Four frozen sections, one pushed card per day.`,tickers:[],pulse:`idle`,stars:100,remixes:1,cover:{template:`thesis`,title:`Market Anomaly Digest`,author:`B.D.E`,tickers:[],coverImageUrl:`https://alva-ai-static.b-cdn.net/prd/uploads/1961349611146735616/2026/05/ac5a314c-29f1-4559-b6f4-d0c09920fdfb.png`}},{id:`kevinxu-tweet-trader`,creator:`furyfrog1993`,title:`Kevin Xu Tweet Trader`,description:`Backtest of @kevinxu's tweet signals · 3 holding strategies · AI Trader Profile · Refreshed every 6h`,tickers:[`IREN`,`HIMS`,`QS`,`FIG`],pulse:`idle`,stars:239,remixes:3,cover:{template:`thesis`,title:`Kevin Xu Tweet Trader`,author:`furyfrog1993`,tickers:[`IREN`,`HIMS`,`QS`,`FIG`],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-4e35799b-3884-4255-9aad-f35818d95279.webp`}}],O=[`salp-thesis`,`humanoid-citrini-vf`,`cls-long-thesis-alva`,`amd-deep-dive`,`iran-conflict-digest`,`shanghaojin-tweet-trader`,`mag7-capex`,`korea-semi-raw-numbers`,`miner-ai-pivot`,`kol-tweet-trader-leaderboard`,`trump-china-tracker`,`openai-rewire-screener`,`ai-infra-after-mag7-earnings`,`aleabitoreddit-tweet-trader`,`memory-cycle-screener`,`kol-trade-ideas-digest-v3`,`commodity-pulse`,`ai-infra-after-mag7-earnings-2975`,`market-anomaly-digest-v2`,`kevinxu-tweet-trader`].map(e=>D.find(t=>t.id===e)).filter(e=>e!==void 0);function k(e,t){let n=`${t.title} ${t.description} ${t.tickers.join(` `)} ${t.cover.domain??``} ${t.cover.template}`.toLowerCase(),r=e.toLowerCase();return e===`Smart Screener`&&t.cover.template===`screener`||e===`Theme Tracker`&&t.cover.template===`thesis`||e===`What-if`&&t.cover.template===`what-if`||e===`Thesis`&&t.cover.template===`thesis`||t.tickers.some(e=>e.toLowerCase()===r)?!0:n.includes(r)}var ie=`researcher-l1`;function A(){return typeof window>`u`||typeof window.matchMedia!=`function`?!0:window.matchMedia(`(hover: hover)`).matches}function j(e){let t=d(e)%7200;return t<1?`just now`:t<60?`${t}m ago`:t<1440?`${Math.floor(t/60)}h ago`:`${Math.floor(t/1440)}d ago`}function ae({template:e,anchor:t,placeAbove:n,side:r=`auto`,onMouseEnter:i,onMouseLeave:o}){let s=(0,x.useRef)(null),[c,l]=(0,x.useState)(220);(0,x.useLayoutEffect)(()=>{s.current&&l(s.current.offsetHeight)},[e.id]);let u=e.tags??g(e.id),d,f;return r===`left`?(d=t.left-360-10,typeof window<`u`&&(d=Math.max(12,d)),f=t.top+t.height/2-c/2,typeof window<`u`&&(f=Math.max(12,Math.min(f,window.innerHeight-c-12)))):(d=t.left+t.width/2-360/2,typeof window<`u`&&(d=Math.max(12,Math.min(d,window.innerWidth-360-12))),f=n?t.top-c-10:t.bottom+10),(0,S.jsxs)(`div`,{ref:s,onMouseEnter:i,onMouseLeave:o,style:{position:`fixed`,top:f,left:d,width:360,zIndex:50,background:`#ffffff`,borderRadius:8,border:`0.5px solid var(--line-l2)`,boxShadow:`var(--shadow-s)`,padding:20,pointerEvents:`auto`,animation:`newchat-fadeup 160ms ease-out`},children:[(0,S.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:4},children:[(0,S.jsx)(`h2`,{style:{fontFamily:`'Delight', sans-serif`,fontSize:18,lineHeight:`24px`,fontWeight:400,color:`var(--text-n9)`,letterSpacing:.18,margin:0},children:e.label}),(0,S.jsx)(`span`,{style:{fontFamily:`'Delight', sans-serif`,fontSize:11,lineHeight:`16px`,color:`rgba(0,0,0,0.4)`,letterSpacing:.11,fontWeight:400},children:j(e.id)})]}),(0,S.jsx)(`p`,{style:{fontFamily:`'Delight', sans-serif`,fontSize:13,lineHeight:`20px`,color:`var(--text-n7)`,letterSpacing:.13,margin:`10px 0 0`},children:e.description}),(0,S.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:5,flexWrap:`wrap`,marginTop:10},children:u.slice(0,3).map(e=>(0,S.jsx)(`span`,{style:{height:20,padding:`0 6px`,borderRadius:5,background:`var(--b-r05)`,color:`var(--text-n5)`,fontFamily:`'Delight', sans-serif`,fontSize:11,lineHeight:`20px`,letterSpacing:.11,whiteSpace:`nowrap`},children:e},e))}),(0,S.jsx)(`div`,{style:{height:1,background:`var(--line-l07)`,margin:`20px 0`}}),(0,S.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12},children:[(0,S.jsxs)(`button`,{type:`button`,className:`nc-creator-link`,onClick:e=>e.stopPropagation(),style:{flex:1,minWidth:0,display:`flex`,alignItems:`center`,gap:10,padding:`4px 6px`,margin:`-4px -6px`,border:`none`,background:`transparent`,cursor:`pointer`,borderRadius:6,transition:`background 140ms ease`,textAlign:`left`},children:[(0,S.jsx)(a,{name:e.creator,size:36}),(0,S.jsxs)(`div`,{style:{minWidth:0},children:[(0,S.jsx)(`div`,{style:{fontFamily:`'Delight', sans-serif`,fontSize:11,lineHeight:`14px`,color:`rgba(0,0,0,0.4)`,letterSpacing:.11,fontWeight:400},children:`Created by`}),(0,S.jsx)(`div`,{className:`nc-creator-link-name`,style:{fontFamily:`'Delight', sans-serif`,fontSize:14,lineHeight:`20px`,color:`var(--text-n9)`,letterSpacing:.14,fontWeight:400,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`,transition:`color 140ms ease`},children:e.creator})]})]}),(0,S.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:4,flexShrink:0},children:m(e.creator).map(e=>(0,S.jsx)(`a`,{href:e.href,target:`_blank`,rel:`noreferrer noopener`,"aria-label":e.label,style:{width:24,height:24,borderRadius:`9999px`,background:`var(--b-r05)`,display:`inline-flex`,alignItems:`center`,justifyContent:`center`,flexShrink:0,transition:`background 120ms ease, transform 120ms ease`},onMouseEnter:e=>{A()&&(e.currentTarget.style.background=`var(--b-r1)`,e.currentTarget.style.transform=`translateY(-1px)`)},onMouseLeave:e=>{A()&&(e.currentTarget.style.background=`var(--b-r05)`,e.currentTarget.style.transform=`translateY(0)`)},children:e.render()},e.key))})]})]})}function oe({text:e,onClick:t,index:n=0}){return(0,S.jsxs)(`button`,{type:`button`,className:`nc-prompt-row`,style:{animation:`newchat-fade 220ms ease-out both`,animationDelay:`${n*70}ms`},onClick:t,onMouseEnter:e=>{A()&&(e.currentTarget.style.background=`var(--b-r03)`)},onMouseLeave:e=>{A()&&(e.currentTarget.style.background=`transparent`)},children:[(0,S.jsx)(`span`,{className:`nc-prompt-text`,children:e}),(0,S.jsx)(i,{name:`enter-l`,size:20,color:`rgba(0,0,0,0.4)`})]})}function M({widthPct:e}){return(0,S.jsxs)(`div`,{className:`nc-prompt-skeleton-row`,style:{display:`flex`,alignItems:`center`,gap:12,height:46,padding:`12px`,boxSizing:`border-box`},children:[(0,S.jsx)(`div`,{style:{flex:1,height:14,background:`var(--b-r07)`,borderRadius:4,maxWidth:`${e}%`}}),(0,S.jsx)(`div`,{style:{width:20,height:20,background:`var(--b-r05)`,borderRadius:4}})]})}var N={"theme-tracker":`thesis`,"smart-screener":`screener`,"deep-dive":`thesis`,"daily-macro-brief":`general`,"earnings-edge":`thesis`,"crypto-pulse":`general`,"what-if":`what-if`,"yield-hunter":`screener`,"dividend-diary":`screener`,backtest:`what-if`,valuation:`thesis`},se={"theme-tracker":`macro`,"smart-screener":`momentum`,"deep-dive":`ai`,"daily-macro-brief":`review`,"earnings-edge":`macro`,"crypto-pulse":`alerts`,"what-if":`event_study`,"yield-hunter":`dividend`,"dividend-diary":`dividend`,backtest:`event_study`,valuation:`value`},P=[`S&P LARGE CAP`,`RUSSELL 2000`,`NASDAQ 100`,`MSCI EMG`,`STOXX 600`,`TOPIX 500`],F=[`1H`,`6H`,`1D`,`1W`],I=[`Late long-term debt cycle · risk-off bias`,`AI capex peak forming into Q3`,`Basket −2.1% vs SMH +0.6% YTD`,`Hyperscaler PPA flows feed power demand`,`Dollar regime shift, EM tailwind`,`Curve re-steepening as growth softens`],L=[`Historically Drops`,`Historically Rises`,`Range-Bound`,`Outperforms Peers`,`Trails Benchmark`],R=[`CONTEXT FEED · daily`,`WATCHLIST · 2026`,`BRIEF · daily`,`PULSE · live`,`ALERTS · LIVE · 30S`],z=[`2h ago`,`38 holdings`,`1.2M views`,`live`,`12 alerts`,`07:30 ET`],B=[`JAN`,`FEB`,`MAR`,`APR`,`MAY`,`JUN`,`JUL`,`AUG`,`SEP`,`OCT`,`NOV`,`DEC`],V=[`RISK`,`CATALYST`,`AMBIGUOUS`];function H(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}function U(e,t){let n=N[t]??`general`,r=se[t],i=H(`${e.id}|${e.title}`),a=(e,t)=>e[(i>>>t)%e.length],o=e.tickers??[],s={template:n,title:e.title,author:e.creator,tickers:o,domain:r};if(n===`screener`)return{...s,series:`SCORED · ${a(P,0)} · ${a(F,6)}`};if(n===`thesis`){let e=a(B,0),t=(i>>>4)%28+1;return{...s,anchor:`${e} ${t}`,category:a(V,8),kind:a(I,12)}}if(n===`what-if`){let e=(i>>>0&1)==1,t=((i>>>2)%45+5)/10,n=(i>>>8)%9+2,r=Array.from({length:5}).map((t,n)=>{let r=(i>>>n*3&255)/255*2-1;return Math.round((r*(e?1:-1)*4+(e?.6:-.6))*10)/10});return{...s,series:`30D AFTER · ${n}×`,kind:a(L,16),anchor:`${e?`+`:`−`}${t.toFixed(1)}%`,whatIfBars:r}}let c=(i>>>0)%70+10,l=((i>>>4)%200+50)/10;return{...s,kind:a(R,0),anchor:a(z,8),series:`${c} PIECES · ${l.toFixed(1)}K VIEWS`}}function ce(e,t){return{id:e.id,creator:e.creator,title:e.title,description:e.desc,tickers:e.tickers,pulse:`active`,stars:e.stars,remixes:e.remixes,cover:U(e,t)}}function le(){return(0,S.jsxs)(`div`,{style:{background:`#ffffff`,border:`0.5px solid var(--line-l12)`,borderRadius:8,padding:4,display:`flex`,flexDirection:`column`,overflow:`hidden`},children:[(0,S.jsx)(`div`,{style:{width:`100%`,aspectRatio:`472 / 265.5`,borderRadius:4,background:`var(--b-r05)`}}),(0,S.jsxs)(`div`,{style:{padding:`16px 12px 12px`,display:`flex`,flexDirection:`column`,gap:10},children:[(0,S.jsxs)(`div`,{style:{display:`flex`,gap:6},children:[(0,S.jsx)(`div`,{style:{width:70,height:20,background:`var(--b-r07)`,borderRadius:4}}),(0,S.jsx)(`div`,{style:{width:40,height:20,background:`var(--b-r05)`,borderRadius:4}})]}),(0,S.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:6},children:[(0,S.jsx)(`div`,{style:{height:18,background:`var(--b-r07)`,borderRadius:4,maxWidth:`60%`}}),(0,S.jsx)(`div`,{style:{height:12,background:`var(--b-r05)`,borderRadius:4}}),(0,S.jsx)(`div`,{style:{height:12,background:`var(--b-r05)`,borderRadius:4,maxWidth:`80%`}})]})]})]})}var ue=36,W=28,G=1.33,K=640,q=18;function de({selected:e,maxWidth:t}){let[n,r]=(0,x.useState)(()=>typeof window<`u`?window.innerWidth<K:!1);(0,x.useEffect)(()=>{let e=()=>r(window.innerWidth<K);return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]);let i=n?W:ue,a=Math.ceil(i*G)*2,o=(0,x.useRef)(null),s=(0,x.useRef)(null),c=(0,x.useRef)(null),l=(0,x.useRef)(null),u=(0,x.useRef)(``);(0,x.useRef)(!1);let[d,f]=(0,x.useState)(1),p=e?`Build your ${e.label}`:`Turn Ideas into Live
Investing Playbooks in Minutes`;return(0,x.useLayoutEffect)(()=>{let e=o.current,t=s.current;if(!e||!t)return;let n=()=>{t.style.maxWidth=`${e.clientWidth}px`;let n=t.scrollHeight;f(n>a?a/n:1)};n();let r=new ResizeObserver(n);return r.observe(e),()=>r.disconnect()},[p,a]),(0,x.useEffect)(()=>{if(u.current===p){u.current=p;return}u.current=p,o.current,s.current,c.current,l.current},[p]),(0,S.jsxs)(`div`,{ref:o,style:{position:`relative`,width:`100%`,maxWidth:t,height:a,display:`flex`,alignItems:`center`,justifyContent:`center`,overflow:`visible`},children:[(0,S.jsx)(`style`,{children:`
        @keyframes tr-dot-flash { 0%{opacity:0} 15%{opacity:1} 100%{opacity:0} }
        @keyframes tr-char-erase { 0%{opacity:1} 100%{opacity:0} }
        @keyframes tr-char-appear { 0%{opacity:0} 100%{opacity:1} }
        .tr-cell{ position:absolute; width:${q}px; height:${q}px; opacity:0; pointer-events:none; }
      `}),(0,S.jsx)(`h1`,{ref:c,"aria-hidden":!0,style:{position:`absolute`,left:0,right:0,top:`50%`,transform:`translateY(-50%) scale(${d})`,transformOrigin:`center`,fontSize:i,lineHeight:G,fontWeight:400,color:`var(--text-n9)`,textAlign:`center`,letterSpacing:.45,margin:0,pointerEvents:`none`,zIndex:1}}),(0,S.jsx)(`h1`,{ref:s,style:{fontSize:i,lineHeight:G,fontWeight:400,color:`var(--text-n9)`,textAlign:`center`,letterSpacing:.45,margin:0,transform:`scale(${d})`,transformOrigin:`center`,position:`relative`,zIndex:1,whiteSpace:`pre-line`},children:p}),(0,S.jsx)(`div`,{ref:l,"aria-hidden":!0,style:{position:`absolute`,inset:0,pointerEvents:`none`,zIndex:2,overflow:`visible`}})]})}function fe({template:e,onClose:t,onSelect:n}){let r=e.tags??g(e.id);return typeof document>`u`?null:(0,b.createPortal)((0,S.jsx)(`div`,{onClick:t,style:{position:`fixed`,inset:0,background:`rgba(0,0,0,0.45)`,zIndex:9999,display:`flex`,alignItems:`center`,justifyContent:`center`,padding:16,animation:`newchat-fade 160ms ease-out`},children:(0,S.jsxs)(`div`,{onClick:e=>e.stopPropagation(),style:{width:`100%`,maxWidth:360,background:`#ffffff`,borderRadius:14,padding:20,boxShadow:`0 20px 48px rgba(0,0,0,0.18), 0 6px 14px rgba(0,0,0,0.08)`,animation:`newchat-fadeup 220ms ease-out`},children:[(0,S.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:4},children:[(0,S.jsx)(`h2`,{style:{fontFamily:`'Delight', sans-serif`,fontSize:18,lineHeight:`24px`,fontWeight:500,color:`var(--text-n9)`,letterSpacing:.18,margin:0},children:e.label}),(0,S.jsx)(`span`,{style:{fontFamily:`'Delight', sans-serif`,fontSize:11,lineHeight:`16px`,color:`rgba(0,0,0,0.4)`,letterSpacing:.11,fontWeight:500},children:j(e.id)})]}),(0,S.jsx)(`p`,{style:{fontFamily:`'Delight', sans-serif`,fontSize:13,lineHeight:`20px`,color:`var(--text-n7)`,letterSpacing:.13,margin:`10px 0 0`},children:e.description}),(0,S.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:5,flexWrap:`wrap`,marginTop:10},children:r.slice(0,3).map(e=>(0,S.jsx)(`span`,{style:{height:20,padding:`0 6px`,borderRadius:5,background:`var(--b-r05)`,color:`var(--text-n5)`,fontFamily:`'Delight', sans-serif`,fontSize:11,lineHeight:`20px`,letterSpacing:.11,whiteSpace:`nowrap`},children:e},e))}),(0,S.jsx)(`div`,{style:{height:1,background:`var(--line-l07)`,margin:`20px 0 12px`}}),(0,S.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12},children:[(0,S.jsxs)(`div`,{style:{flex:1,minWidth:0,display:`flex`,alignItems:`center`,gap:10},children:[(0,S.jsx)(a,{name:e.creator,size:36}),(0,S.jsxs)(`div`,{style:{minWidth:0},children:[(0,S.jsx)(`div`,{style:{fontFamily:`'Delight', sans-serif`,fontSize:11,lineHeight:`14px`,color:`var(--text-n5)`,letterSpacing:.11,fontWeight:500},children:`Created by`}),(0,S.jsx)(`div`,{style:{fontFamily:`'Delight', sans-serif`,fontSize:14,lineHeight:`20px`,color:`var(--text-n9)`,letterSpacing:.14,fontWeight:500,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`},children:e.creator})]})]}),(0,S.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:6,flexShrink:0},children:m(e.creator).map(e=>(0,S.jsx)(`a`,{href:e.href,target:`_blank`,rel:`noreferrer noopener`,"aria-label":e.label,style:{width:24,height:24,borderRadius:`9999px`,background:`var(--b-r05)`,display:`inline-flex`,alignItems:`center`,justifyContent:`center`,flexShrink:0},children:e.render()},e.key))})]}),(0,S.jsx)(`div`,{style:{height:1,background:`var(--line-l07)`,margin:`12px 0 20px`}}),(0,S.jsx)(`button`,{type:`button`,onClick:n,style:{width:`100%`,height:44,border:`none`,borderRadius:10,background:`var(--main-m1)`,color:`#fff`,fontFamily:`'Delight', sans-serif`,fontSize:14,fontWeight:500,letterSpacing:.14,cursor:`pointer`},children:`Pick this skill`})]})}),document.body)}var J=340,Y=16;function pe({onNavigate:e}){let[t,n]=(0,x.useState)(`Popular`),[r,a]=(0,x.useState)(()=>new Set),o=(0,x.useRef)(null),[s,c]=(0,x.useState)(0);(0,x.useEffect)(()=>{if(!o.current)return;let e=o.current,t=new ResizeObserver(e=>{c(e[0]?.contentRect.width??0)});return t.observe(e),()=>t.disconnect()},[]);let l=e=>{a(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})},u=(0,x.useMemo)(()=>{let e=t===`Recent`?[...O].reverse():O;return r.size===0?e:e.filter(e=>{for(let t of r)if(k(t,e))return!0;return!1})},[t,r]),d=s===0?{display:`grid`,gap:Y,width:`100%`}:{display:`grid`,gridTemplateColumns:`repeat(${Math.max(1,Math.floor((s+Y)/J))}, minmax(0, 1fr))`,gap:Y,width:`100%`};return(0,S.jsx)(`section`,{style:{width:`100%`,padding:`40px 28px 60px`,position:`relative`,zIndex:2},children:(0,S.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:`100%`},children:[(0,S.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,width:`100%`},children:[(0,S.jsx)(`p`,{style:{fontFamily:`'Delight', sans-serif`,fontSize:20,lineHeight:`30px`,letterSpacing:.2,color:`var(--text-n9)`},children:`Trending Playbooks`}),(0,S.jsxs)(`button`,{type:`button`,onClick:()=>e(`explore`),style:{display:`inline-flex`,alignItems:`center`,gap:4,height:28,padding:`4px 0`,background:`transparent`,border:`none`,cursor:`pointer`,fontFamily:`'Delight', sans-serif`,fontSize:12,lineHeight:`20px`,letterSpacing:.12,color:`var(--text-n9)`},children:[`View all`,(0,S.jsx)(i,{name:`arrow-right-l2`,size:14,color:`var(--text-n9)`})]})]}),(0,S.jsx)(te,{sort:t,sortOptions:y,chips:v,onSortChange:n,selectedChips:r,onChipToggle:l}),(0,S.jsx)(`div`,{ref:o,style:d,children:u.map((e,t)=>(0,S.jsx)(`div`,{style:{width:`100%`},children:(0,S.jsx)(ee,{p:e,staggerMs:t%10*1e3})},e.id))})]})})}var X=960;function Z({onNavigate:e}){let[t,n]=(0,x.useState)(null),[r,d]=(0,x.useState)(null),[m,g]=(0,x.useState)(null),[v,te]=(0,x.useState)(``),[y,b]=(0,x.useState)(``),[C,w]=(0,x.useState)(null),[T,E]=(0,x.useState)(!1),[D,O]=(0,x.useState)(null);(0,x.useEffect)(()=>{if(typeof document>`u`)return;let e=!!D||T;return document.body.classList.toggle(`nc-overlay-open`,e),()=>{document.body.classList.remove(`nc-overlay-open`)}},[D,T]);let[k,j]=(0,x.useState)(()=>typeof window<`u`?window.innerWidth<640:!1);(0,x.useEffect)(()=>{let e=()=>j(window.innerWidth<640);return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]);let N=(0,x.useRef)(null),se=(0,x.useRef)(null),P=(0,x.useRef)(null),F=(0,x.useRef)(null),I=(0,x.useRef)(null),[L,R]=(0,x.useState)(null),z=()=>{F.current!==null&&(window.clearTimeout(F.current),F.current=null),I.current&&=(document.removeEventListener(`mousemove`,I.current),null),R(null)},B=(e,t,n,r)=>{z(),R({x:n,y:r});let i=e=>R({x:e.clientX,y:e.clientY});document.addEventListener(`mousemove`,i),I.current=i,F.current=window.setTimeout(()=>{z(),U(e,t.getBoundingClientRect())},600)},V=()=>{P.current!==null&&(window.clearTimeout(P.current),P.current=null)},H=()=>{V(),P.current=window.setTimeout(()=>w(null),160)},U=(e,t,n=`auto`)=>{if(n===`left`){V(),w({id:e,rect:t,placeAbove:!1,side:`left`});return}let r=!1;N.current&&N.current.querySelectorAll(`button, [role="button"]`).forEach(e=>{e.getBoundingClientRect().top>t.bottom-1&&(r=!0)}),V(),w({id:e,rect:t,placeAbove:r,side:`auto`})},[ue,W]=(0,x.useState)(!1),[G,K]=(0,x.useState)(!1);(0,x.useEffect)(()=>{let e=setTimeout(()=>b(v),700);return()=>clearTimeout(e)},[v]),(0,x.useEffect)(()=>{if(!T)return;let e=e=>{e.key===`Escape`&&E(!1)};return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)},[T]),(0,x.useEffect)(()=>{if(!t){W(!1),K(!1);return}W(!1),K(!1);let e=setTimeout(()=>W(!0),900),n=setTimeout(()=>K(!0),1500);return()=>{clearTimeout(e),clearTimeout(n)}},[t]);let q=(0,x.useMemo)(()=>re(y),[y]),J=!t&&q.length>0,Y=(0,x.useMemo)(()=>t&&(h.find(e=>e.id===t)||p.find(e=>e.id===t)||_.find(e=>e.id===t))||null,[t]),Z=(0,x.useMemo)(()=>Y?Y.recCards&&Y.recCards.length?Y.recCards:Y.playbooks.slice(0,3).map(e=>({type:`playbook`,playbook:e})):[],[Y]),Q=(0,x.useMemo)(()=>[...h,...p,..._],[]),me=(0,x.useRef)(null),[$,he]=(0,x.useState)(new Set);(0,x.useLayoutEffect)(()=>{let e=()=>{let e=N.current;if(!e)return;let t=Array.from(e.querySelectorAll(`button[data-skill-id]`)),n=e.querySelector(`[data-more-wrap]`);if(!n)return;t.forEach(e=>{e.style.display=``}),n.style.display=``;let r=[],i=()=>{let e=[...new Set([...t.filter(e=>e.style.display!==`none`).map(e=>e.offsetTop),n.offsetTop])].sort((e,t)=>e-t).indexOf(n.offsetTop);return e>=0&&e<=1},a=t.length;for(;a-- >0&&!i();){let n=t.filter(e=>e.style.display!==`none`);if(n.length===0)break;let i=n[n.length-1],a=i.dataset.skillId;a&&r.push(a),i.style.display=`none`,e.offsetWidth}r.length===0&&(n.style.display=`none`);let o=new Set(r);o.size===$.size&&[...o].every(e=>$.has(e))||he(o)};e();let t=new ResizeObserver(e);return N.current&&t.observe(N.current),window.addEventListener(`resize`,e),()=>{t.disconnect(),window.removeEventListener(`resize`,e)}},[Q,$,t]);let ge=e=>{if(k){O(e),E(!1),w(null);return}n(t=>t===e?null:e),w(null),E(!1)},_e=e=>{n(t=>t===e?null:e),w(null),E(!1)},ve=()=>{D&&(n(D),O(null),E(!1))},ye=()=>n(null),be=e=>d({text:e,seq:Date.now()}),xe=t=>{e(t===`__agent__`?`agent`:`thread/${t}`)},Se=C?h.find(e=>e.id===C.id)||p.find(e=>e.id===C.id)||_.find(e=>e.id===C.id):null;return(0,S.jsxs)(c,{activePage:`new-chat`,onNavigate:e,children:[(0,S.jsx)(`style`,{children:`
        @keyframes newchat-fadeup{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes newchat-fade{from{opacity:0}to{opacity:1}}
        @keyframes newchat-bubble-pop{
          0%{opacity:0;transform:scale(0.55)}
          55%{opacity:1;transform:scale(1.08)}
          100%{opacity:1;transform:scale(1)}
        }
        @keyframes newchat-skeleton{
          0%{opacity:.55}50%{opacity:.85}100%{opacity:.55}
        }
        .nc-skeleton-anim{animation:newchat-skeleton 1.4s ease-in-out infinite}
        button.nc-pill{display:flex}
        .nc-chatbox-wrap .chat-input-wrapper{
          box-sizing:border-box;
        }
        .nc-chatbox-wrap .chat-input-editor-shell{
          min-height:48px;
        }
        .nc-sample-cards-grid{
          display:grid;
          grid-template-columns:repeat(3,minmax(240px,1fr));
          gap:12px;
          overflow-x:auto;
          overflow-y:visible;
          /* 给 hover 阴影 + 末卡右侧留出空间，避免 overflow 裁切 */
          padding:16px 20px 28px 20px;
          overscroll-behavior-x:contain;
          -webkit-overflow-scrolling:touch;
          scrollbar-width:none;
        }
        .nc-sample-cards-grid::-webkit-scrollbar{
          display:none;
        }
        .nc-prompts-list{
          display:flex;
          flex-direction:column;
          width:100%;
        }
        .nc-prompt-row{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          height:46px;
          min-height:46px;
          max-height:46px;
          flex:0 0 46px;
          box-sizing:border-box;
          padding:12px;
          background:transparent;
          border:none;
          border-radius:0;
          overflow:hidden;
          text-align:left;
          cursor:pointer;
          width:100%;
          transition:background 0.15s;
        }
        .nc-prompts-list > .nc-prompt-row:not(:last-child),
        .nc-prompts-list > .nc-prompt-skeleton-row:not(:last-child){
          border-bottom:0.5px solid var(--line-l12);
        }
        .nc-prompt-text{
          flex:1;
          min-width:0;
          font-family:'Delight',sans-serif;
          font-size:14px;
          line-height:22px;
          color:var(--text-n9);
          letter-spacing:0.14px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        @media (max-width: 639px){
          .newchat-page-topbar{display:none}
          /* mobile pill：尺寸更小，单行能放更多 */
          .nc-pill{
            height:40px !important;
            padding:0 14px !important;
            font-size:14px !important;
            line-height:22px !important;
            gap:8px !important;
            letter-spacing:0.14px !important;
          }
          .nc-pill > img,
          .nc-pill > div[class*="rounded-full"]{
            width:22px !important;
            height:22px !important;
            min-width:22px !important;
            min-height:22px !important;
          }
          .nc-pill > div[role="img"],
          .nc-pill .block{
            width:16px !important;
            height:16px !important;
          }
          .nc-hero-section{
            padding:56px 16px 12px !important;
            gap:24px !important;
          }
          /* 移动端输入框内边距收紧 */
          .chat-input-wrapper{
            padding:12px !important;
            gap:8px !important;
          }
          .nc-chatbox-wrap .chat-input-wrapper{
            min-height:0;
          }
          .nc-chatbox-wrap .chat-input-editor-shell{
            flex:initial;
          }
          .nc-prompts-container{
            margin-top:0 !important;
            max-width:none !important;
          }
          .nc-prompt-row{
            padding:12px 4px;
            background:transparent;
            border-radius:0;
            margin-bottom:0;
          }
          .nc-prompt-text{
            font-size:13px;
            line-height:20px;
          }
          .nc-cards-section{
            padding:12px 0 80px 16px !important;
            margin-top:24px !important;
          }
        }
        @media (hover: hover){
          .nc-creator-link:hover{background:var(--b-r05)}
          .nc-creator-link:hover .nc-creator-link-name{color:var(--main-m1);text-decoration:underline;text-underline-offset:2px}
        }
        .more-skills-dropdown{
          position:absolute;
          top:calc(100% + 8px);
          right:0;
          width:320px;
          background:#fff;
          border:0.5px solid var(--line-l2);
          border-radius:8px;
          box-shadow:var(--shadow-s);
          z-index:20;
          animation:newchat-fadeup 160ms ease-out;
          overflow:hidden;
        }
        .more-skills-dropdown-scroll{
          max-height:360px;
          overflow-y:auto;
          padding:6px;
        }
        .more-skill-row{
          display:flex;
          align-items:center;
          gap:10px;
          width:100%;
          padding:8px 12px;
          border:none;
          background:transparent;
          text-align:left;
          cursor:pointer;
          border-radius:8px;
          transition:background 140ms ease;
        }
        @media (hover: hover){
          .more-skill-row:hover{
            background:var(--b-r05);
          }
        }
        .more-skills-backdrop{display:none}
        .more-skills-header{display:none}
        @media (max-width: 639px){
          .more-skills-backdrop{
            display:block;
            position:fixed;
            inset:0;
            background:rgba(0,0,0,0.45);
            z-index:9998;
            animation:newchat-fade 200ms ease-out;
          }
          .more-skills-dropdown{
            position:fixed !important;
            z-index:9999 !important;
            top:auto !important;
            right:0 !important;
            left:0 !important;
            bottom:0 !important;
            width:100% !important;
            border-radius:14px 14px 0 0 !important;
            animation:newchat-sheet-up 220ms cubic-bezier(0.2,0.8,0.2,1);
          }
          .more-skills-dropdown::before{
            content:"";
            display:block;
            width:36px;
            height:4px;
            border-radius:2px;
            background:rgba(0,0,0,0.18);
            margin:8px auto 4px;
          }
          .more-skills-header{
            display:flex !important;
            align-items:center;
            justify-content:space-between;
            padding:14px 16px 8px;
          }
          .more-skills-title{
            font-family:'Delight',sans-serif;
            font-size:16px;
            line-height:22px;
            font-weight:500;
            color:var(--text-n9);
            letter-spacing:0.16px;
          }
          .more-skills-close{
            width:24px;
            height:24px;
            border:none;
            background:transparent;
            padding:0;
            display:inline-flex;
            align-items:center;
            justify-content:center;
            cursor:pointer;
          }
          .more-skills-dropdown-scroll{
            max-height:60vh !important;
            padding:4px 12px 32px !important;
            display:flex !important;
            flex-direction:column;
            gap:8px;
          }
          .more-skill-row{
            padding:18px 16px !important;
            background:var(--b-r05) !important;
            border-radius:12px !important;
            gap:14px !important;
          }
          .more-skill-row:active{
            background:var(--b-r07) !important;
          }
          .more-skill-name{
            font-size:15px !important;
            line-height:20px !important;
          }
          .more-skill-author{
            font-size:13px !important;
            line-height:18px !important;
          }
          /* 移动端 sheet 行底色已是灰，icon tile 用白色避免叠灰 */
          .more-skill-icon-wrap{
            background:#fff !important;
          }
        }
        @keyframes newchat-sheet-up{
          from{transform:translateY(100%)}
          to{transform:translateY(0)}
        }
        .more-skill-text{
          flex:1;
          min-width:0;
          display:flex;
          flex-direction:column;
          gap:2px;
        }
        .more-skill-name{
          font-family:'Delight',sans-serif;
          font-size:14px;
          line-height:20px;
          font-weight:400;
          color:var(--text-n9);
          letter-spacing:0.14px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .more-skill-author{
          font-family:'Delight',sans-serif;
          font-size:12px;
          line-height:16px;
          color:var(--text-n5);
          letter-spacing:0.12px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .more-skill-icon-wrap{
          width:32px;
          height:32px;
          flex-shrink:0;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          border-radius:9999px;
          /* 桌面默认灰底，hover 时变白让 icon 浮起 */
          background:var(--b-r05);
          border:1px solid var(--line-l12);
          transition:background 140ms ease;
        }
        @media (hover: hover){
          .more-skill-row:hover .more-skill-icon-wrap{
            background:#fff;
          }
        }
        /* 圆头像加弱边框，避免在灰底上融掉 */
        .more-skill-row > div[class*="rounded-full"],
        .more-skill-row > img{
          box-shadow:inset 0 0 0 1px var(--line-l12);
          border-radius:9999px;
        }


      `}),(0,S.jsxs)(`div`,{className:`h-screen overflow-y-auto relative`,style:{backgroundColor:`var(--b0-container, #ffffff)`},children:[(0,S.jsx)(`div`,{className:`flex items-center gap-[16px] h-[56px] px-[28px] shrink-0 newchat-page-topbar`,style:{position:`sticky`,top:0,zIndex:5,background:`var(--b0-container, #ffffff)`},children:(0,S.jsx)(`div`,{className:`flex-1 min-w-0`,children:(0,S.jsx)(s,{activeId:`new`,onSelect:xe,trigger:(0,S.jsxs)(`div`,{className:`flex gap-[4px] items-center min-w-0 cursor-pointer`,children:[(0,S.jsx)(`p`,{className:`font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] truncate`,children:`New Chat`}),(0,S.jsx)(i,{name:`arrow-down-f2`,size:14,color:`var(--text-n2)`})]})})})}),(0,S.jsxs)(`section`,{className:`nc-hero-section`,style:{width:`100%`,display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`flex-start`,gap:36,padding:`24px 28px`,position:`relative`,zIndex:2},children:[(0,S.jsx)(de,{selected:Y,maxWidth:X}),(0,S.jsx)(`div`,{className:`nc-chatbox-wrap`,style:{width:`100%`,maxWidth:X,position:`relative`,zIndex:1},children:(0,S.jsx)(o,{shadow:!0,hideSkill:!0,hideInspector:!0,voiceInput:!0,allowReferences:!1,bottomChip:Y?{label:Y.label,icon:Y.kol?void 0:Y.icon??ie,avatar:Y.kol?Y.creator:void 0,creator:Y.creator,onRemove:ye,onHover:e=>U(Y.id,e),onLeave:H}:null,injectText:r,onInputChange:te})}),J&&(0,S.jsx)(`div`,{className:`nc-prompts-container`,style:{width:`100%`,maxWidth:X,position:`relative`,zIndex:1,marginTop:0,display:`flex`,flexDirection:`column`},children:(0,S.jsx)(`div`,{className:`nc-prompts-list`,children:q.map((e,t)=>(0,S.jsx)(oe,{text:e,index:t,onClick:()=>be(e)},t))})},y),!J&&(0,S.jsxs)(`div`,{ref:N,style:{display:`flex`,flexWrap:`wrap`,gap:12,justifyContent:`center`,paddingTop:12,position:`relative`,zIndex:1,width:`100%`,maxWidth:900},children:[Q.map(e=>{let n=t===e.id;return(0,S.jsx)(ne,{"data-skill-id":e.id,className:`nc-pill`,label:e.label,active:n,icon:e.kol?void 0:e.icon,avatar:e.kol?e.avatarSrc?(0,S.jsx)(`img`,{src:`/alva-infant/avatars/${e.avatarSrc}`,alt:``,className:`size-[22px] shrink-0 rounded-full object-cover`}):(0,S.jsx)(a,{name:e.creator,size:22}):void 0,onClick:()=>ge(e.id),onMouseEnter:t=>{A()&&(t.currentTarget.style.boxShadow=`0 4px 12px rgba(0,0,0,0.05)`,t.currentTarget.style.transform=`translateY(-2px)`,B(e.id,t.currentTarget,t.clientX,t.clientY))},onMouseLeave:e=>{A()&&(e.currentTarget.style.boxShadow=`none`,e.currentTarget.style.transform=`translateY(0)`,z(),H())}},e.id)}),(0,S.jsx)(`div`,{ref:se,"data-more-wrap":!0,style:{position:`relative`},children:(0,S.jsx)(ne,{ref:me,className:`nc-pill`,"aria-expanded":T,"aria-label":`More skills`,label:`More`,trailing:(0,S.jsx)(i,{name:`arrow-right-l2`,size:14,color:`var(--text-n5)`}),style:T?{background:`#f3f8f8`,border:`0.5px solid rgba(73,163,166,0.45)`}:void 0,onMouseEnter:e=>{A()&&(e.currentTarget.style.boxShadow=`0 4px 12px rgba(0,0,0,0.05)`,e.currentTarget.style.transform=`translateY(-2px)`)},onMouseLeave:e=>{A()&&(e.currentTarget.style.boxShadow=`none`,e.currentTarget.style.transform=`translateY(0)`)},onClick:()=>{E(e=>!e),w(null)}})})]}),Y&&(0,S.jsx)(`div`,{className:`nc-prompts-container`,style:{width:`100%`,maxWidth:X,position:`relative`,zIndex:1,marginTop:0,display:`flex`,flexDirection:`column`},children:ue?(0,S.jsx)(`div`,{className:`nc-prompts-list`,style:{animation:`newchat-fade 280ms ease-out`},children:Y.prompts.slice(0,3).map((e,t)=>(0,S.jsx)(oe,{text:e,index:t,onClick:()=>be(e)},t))}):(0,S.jsxs)(`div`,{className:`nc-prompts-list nc-skeleton-anim`,style:{animation:`newchat-fade 200ms ease-out`},children:[(0,S.jsx)(M,{widthPct:92}),(0,S.jsx)(M,{widthPct:70}),(0,S.jsx)(M,{widthPct:82})]})}),Y&&(0,S.jsx)(`div`,{style:{width:`100%`,maxWidth:X,position:`relative`,zIndex:2,display:`flex`,flexDirection:`column`,gap:16},children:G?(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(3, minmax(0, 1fr))`,gap:16},children:Z.flatMap(e=>e.type===`playbook`?[e.playbook]:[]).slice(0,3).map((t,n)=>(0,S.jsx)(`div`,{onClick:()=>{sessionStorage.setItem(`autoOpenChatPanel`,`1`),e(`new-chat`)},style:{animation:`newchat-fadeup 360ms ease-out both`,animationDelay:`${n*50}ms`},children:(0,S.jsx)(ee,{p:ce(t,Y.id),staggerMs:n*1e3})},t.id))}),(()=>{let e=Z.flatMap(e=>e.type===`push`?[e.push]:[]).slice(0,2);return e.length===0?null:(0,S.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(${e.length}, minmax(0, 1fr))`,gap:16,gridAutoRows:281.5},children:e.map((e,t)=>(0,S.jsx)(`div`,{onClick:()=>g(e),style:{height:`100%`,cursor:`pointer`,animation:`newchat-fadeup 360ms ease-out both`,animationDelay:`${(t+3)*50}ms`},children:(0,S.jsx)(l,{a:e})},e.id))})})()]}):(0,S.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(3, minmax(0, 1fr))`,gap:16},children:Array.from({length:3}).map((e,t)=>(0,S.jsx)(`div`,{className:`nc-skeleton-anim`,style:{animation:`newchat-fade 200ms ease-out`},children:(0,S.jsx)(le,{})},t))})},Y.id)]}),!J&&(0,S.jsx)(pe,{onNavigate:e})]}),C&&Se&&(0,S.jsx)(ae,{template:Se,anchor:C.rect,placeAbove:C.placeAbove,side:C.side,onMouseEnter:V,onMouseLeave:H}),L&&(0,S.jsxs)(`div`,{"aria-hidden":!0,style:{position:`fixed`,left:L.x+14,top:L.y+14,width:16,height:16,pointerEvents:`none`,zIndex:9999},children:[(0,S.jsxs)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 16 16`,style:{display:`block`},children:[(0,S.jsx)(`circle`,{cx:`8`,cy:`8`,r:`6`,fill:`none`,stroke:`rgba(0,0,0,0.12)`,strokeWidth:`1.6`}),(0,S.jsx)(`circle`,{cx:`8`,cy:`8`,r:`6`,fill:`none`,stroke:`var(--main-m1)`,strokeWidth:`1.6`,strokeLinecap:`round`,strokeDasharray:2*Math.PI*6,strokeDashoffset:2*Math.PI*6,transform:`rotate(-90 8 8)`,style:{animation:`nc-pill-ring-fill 600ms linear forwards`}})]}),(0,S.jsx)(`style`,{children:`
            @keyframes nc-pill-ring-fill {
              from { stroke-dashoffset: ${2*Math.PI*6}; }
              to   { stroke-dashoffset: 0; }
            }
          `})]}),T&&(0,S.jsx)(f,{skills:Q,selectedId:t,onSelect:_e,onClose:()=>E(!1)}),D&&(()=>{let e=Q.find(e=>e.id===D);return e?(0,S.jsx)(fe,{template:e,onClose:()=>O(null),onSelect:ve}):null})(),(0,S.jsx)(u,{open:!!m,onClose:()=>g(null),feedName:m?.feedName??``,alerts:m?[m]:void 0,description:`This automation runs on a fixed schedule and publishes new results to its subscribers. Each run pulls the latest data, applies the feed's logic, and writes a signal that powers the cards and alerts above. Open Settings → Automations to view full run logs and manage it.`})]})}export{Z as default};