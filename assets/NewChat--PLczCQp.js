import{a as e,n as t,t as n}from"./jsx-runtime-Bg_NI1en.js";import{s as r}from"./index-B4KFRKMV.js";import{a as i,c as a,l as o,s,t as c}from"./AppShell-CJaNczUW.js";import{t as l}from"./CdnIcon-hfvclUzS.js";import{n as u,t as d}from"./FeedDetailModal-DQ5osuxh.js";import{i as f,n as p,r as m,t as h}from"./TrendingFilterBar-D4eJ7_QG.js";import"./PulseIndicator-BjmmAeOH.js";var g=e(t(),1),_=r(),v=o,ee=[{id:`extra-hyperscaler-capex`,title:`Hyperscaler Capex Tracker`,creator:`Macro Scope X`,desc:`Quarterly roll-up of MSFT / AMZN / GOOGL / META capex guidance, mapped to AI-infra beneficiaries with accel/decel flags.`,tickers:[`MSFT`,`AMZN`,`GOOGL`,`META`],color:v.primary,stars:489,remixes:72},{id:`extra-gold-regime`,title:`Gold Regime Dashboard`,creator:`Sheer YLL YGG`,desc:`Real-yield, DXY, and central-bank-buying regime overlay for gold with confidence-scored regime shifts.`,tickers:[`GLD`,`GDX`,`DXY`],color:v.orange,stars:342,remixes:51},{id:`extra-eth-l2`,title:`ETH L2 Market Share`,creator:`YGGYLL`,desc:`Live TVL, daily txns, and fee capture across Base / Arbitrum / Optimism / zkSync with revenue accrual to ETH mainnet.`,tickers:[`ETH`,`ARB`,`OP`],color:v.deepBlue,stars:276,remixes:44},{id:`extra-fomc-playbook`,title:`FOMC Day Playbook`,creator:`Harry Zzz`,desc:`Intraday vol + rate-path positioning around every FOMC. Tracks dot-plot surprise, SEP revisions, and post-meeting rotation.`,tickers:[`SPY`,`TLT`,`VIX`],color:v.red,stars:198,remixes:29},{id:`extra-pair-trade`,title:`Pair-Trade Radar`,creator:`Alva Intern`,desc:`Scans SPX + NDX pairs for 2σ spread dislocations with cointegration filter. Generates long/short candidates with sizing.`,tickers:[`KO`,`PEP`,`V`,`MA`],color:v.blue,stars:164,remixes:23},{id:`extra-dividend-alpha`,title:`Dividend Aristocrat Alpha`,creator:`Smart Jing`,desc:`Ranks 65 aristocrats by yield-on-cost, payout coverage, and 3Y growth. Rotates into the top quintile monthly.`,tickers:[`SPX`,`NOBL`],color:v.green,stars:231,remixes:38}],y=e=>{if(e.length>=6)return e.slice(0,6);let t=6-e.length,n=new Set(e.map(e=>e.id)),r=[];for(let e of ee){if(r.length>=t)break;n.has(e.id)||r.push(e)}return[...e,...r]},b=[{id:`theme-tracker`,label:`Theme Tracker`,icon:`buld-l`,creator:`Alva`,description:`Build a live tracker for any market theme — surfaces sentiment, earnings, and policy catalysts across the basket weekly.`,prompts:[`Which AI-infrastructure names (NVDA, AVGO, TSM) have the strongest momentum right now?`,`What’s driving the obesity-drug basket — LLY, NVO, AMGN — this week?`,`Build a live tracker for nuclear-renaissance equities with catalyst alerts`],playbooks:y([{id:`ai-infra-theme`,title:`AI Infra Theme Radar`,creator:`Alva Intern`,desc:`Tracks NVDA / AVGO / TSM + power grid enablers. Surfaces weekly sentiment + rev-beat signals and rebalances exposure to the strongest relative performers.`,tickers:[`NVDA`,`AVGO`,`TSM`,`VST`],color:v.primary,stars:312,remixes:48},{id:`glp1-theme`,title:`GLP-1 Obesity Complex`,creator:`Harry Zzz`,desc:`Unified tracker for GLP-1 winners (LLY / NVO) and food/restaurant losers. Weekly sentiment scoring with catalyst calendar.`,tickers:[`LLY`,`NVO`,`AMGN`],color:v.orange,stars:186,remixes:22},{id:`nuclear-theme`,title:`Nuclear Renaissance Monitor`,creator:`Macro Scope X`,desc:`Watches uranium miners, SMR names, and hyperscaler PPA headlines. Surfaces policy + permitting catalysts in near real-time.`,tickers:[`CCJ`,`SMR`,`VST`,`CEG`],color:v.deepBlue,stars:94,remixes:12}]),recCards:[{type:`playbook`,playbook:{id:`tt-rec-pb`,title:`AI Infra Theme Radar`,creator:`Alva Intern`,desc:`Tracks NVDA / AVGO / TSM + power enablers. Weekly sentiment and rev-beat signals, rebalances to the strongest relative performers.`,tickers:[`NVDA`,`AVGO`,`TSM`,`VST`],color:v.primary,stars:312,remixes:48}},{type:`playbook`,playbook:{id:`tt-rec-pb2`,title:`GLP-1 Obesity Complex`,creator:`Harry Zzz`,desc:`Unified tracker for GLP-1 winners (LLY / NVO) and food/restaurant losers. Weekly sentiment scoring with catalyst calendar.`,tickers:[`LLY`,`NVO`],color:v.orange,stars:186,remixes:22}},{type:`playbook`,playbook:{id:`tt-rec-pb3`,title:`Nuclear Renaissance Monitor`,creator:`Macro Scope X`,desc:`Watches uranium miners, SMR names, and hyperscaler PPA headlines. Surfaces policy + permitting catalysts in near real-time.`,tickers:[`CCJ`,`SMR`],color:v.deepBlue,stars:94,remixes:12}},{type:`push`,push:{kind:`normal`,id:`tt-rec-normal`,timestamp:`May 8, 9:00 AM`,source:`ai-infra-tracker`,feedName:`ai-infra-digest`,title:`【Blackwell ramp】· Hyperscaler orders pull forward into Q3, supply still tight`,bullets:[`🏭 TSMC CoWoS capacity booked through year-end; HBM remains the bottleneck`,`📈 AVGO raises AI revenue guide; custom-silicon pipeline expands`,`⚡ Grid + power names (VST, CEG) bid as data-center demand compounds`,`🧠 Context: hyperscaler capex revisions continue to climb — MSFT guided FY26 capex above consensus, AMZN reiterated full-year spend, GOOGL flagged TPU v6 ramp, and META lifted the low end of its range. Supply chain checks point to CoWoS-L allocation tightening through Q1 with HBM4 qualification slipping for at least one memory vendor.`,`📌 Watch next: NVDA GTC keynote (Mar 17) for Rubin platform details, AVGO earnings (Mar 5) for AI ASIC backlog update, and TSMC Feb revenue print for wafer-start confirmation. Any guide-down on CoWoS expansion would be the first crack in the thesis.`,`⚠️ Risk framing: basket is +38% YTD vs SMH +21%; positioning is crowded and a single hyperscaler capex cut headline could trigger a 5-8% air pocket. Keep position sizes inside the 2% single-name band.`]}},{type:`push`,push:{kind:`trade`,id:`tt-rec-trade`,timestamp:`May 8, 12:00 PM`,source:`ai-infra-basket`,feedName:`theme-rebalancer`,rows:[{ticker:`NVDA`,action:`Buy`,detail:`weight 40%`,dir:`up`},{ticker:`AVGO`,action:`Buy`,detail:`weight 35%`,dir:`up`},{ticker:`TSM`,action:`Buy`,detail:`weight 25%`,dir:`up`}],note:`Rebalance: tilt to compute + packaging leaders by 90d relative strength`}}]},{id:`smart-screener`,label:`Smart Screener`,icon:`target-l2`,creator:`Alva`,description:`Rank stocks by any factor combo, daily.`,prompts:[`Which US large-caps have rising earnings estimates and positive momentum today?`,`Find cash-rich small-caps under 10x forward earnings with expanding margins`,`Build a dividend-growth screener I can rerun daily`],playbooks:y([{id:`momentum-quality`,title:`Momentum × Quality Screen`,creator:`Smart Jing`,desc:`Daily screen ranking SPX names by 6M momentum × ROIC. Top decile goes long, rebalances weekly with 2% stop-loss band.`,tickers:[`SPX`,`QQQ`],color:v.green,stars:241,remixes:37},{id:`cheap-cashcow`,title:`Cheap Cash Cow Screener`,creator:`Alva Intern`,desc:`Finds small/mid-caps with FCF yield > 8% and net debt / EBITDA < 1.5. Excludes financials and energy. Rebalances monthly.`,tickers:[`R2K`],color:v.blue,stars:128,remixes:19},{id:`crypto-breakout`,title:`Crypto Breakout Screen`,creator:`YGGYLL`,desc:`Scans top-50 tokens for 30D return > 30% combined with rising active-address count. Generates candidate list for further review.`,tickers:[`BTC`,`ETH`,`SOL`,`AVAX`],color:v.red,stars:76,remixes:9}]),recCards:[{type:`playbook`,playbook:{id:`ss-rec-pb`,title:`Momentum × Quality Screen`,creator:`Smart Jing`,desc:`Daily screen ranking SPX names by 6M momentum × ROIC. Top decile goes long, weekly rebalance with a 2% stop band.`,tickers:[`SPX`,`QQQ`],color:v.green,stars:241,remixes:37}},{type:`playbook`,playbook:{id:`ss-rec-pb2`,title:`Cheap Cash Cow Screener`,creator:`Alva Intern`,desc:`Finds small/mid-caps with FCF yield > 8% and net debt / EBITDA < 1.5. Excludes financials and energy. Rebalances monthly.`,tickers:[`R2K`],color:v.blue,stars:128,remixes:19}},{type:`playbook`,playbook:{id:`ss-rec-pb3`,title:`Crypto Breakout Screen`,creator:`YGGYLL`,desc:`Scans top-50 tokens for 30D return > 30% combined with rising active-address count. Generates candidate list for review.`,tickers:[`BTC`,`SOL`],color:v.red,stars:76,remixes:9}},{type:`push`,push:{kind:`normal`,id:`ss-rec-normal`,timestamp:`May 8, 8:30 AM`,source:`screener-run`,feedName:`momentum-quality-screen`,title:`【Daily screen】· 14 names enter the top decile, 9 drop out`,bullets:[`🟢 New entrants: ANET, FICO, GE — rising estimates + positive 20d momentum`,`🔴 Dropped: EW, MKTX — momentum decay below threshold`,`📊 Median forward P/E of the basket: 19.4x`]}},{type:`push`,push:{kind:`kol`,id:`ss-rec-kol`,timestamp:`May 8, 11:00 AM`,source:`kol-signal-relay`,feedName:`kol-watch`,kolName:`Smart Jing`,headlineTicker:`$ANET`,headlineText:`"Networking is the quiet winner of the AI buildout — backlog keeps compounding."`,quoteTicker:`$ANET`,quoteSide:`LONG`,analysis:`Screen surfaces ANET on momentum × ROIC; the KOL view aligns with the quality-momentum thesis. No risk view stated.`}}]},{id:`deep-dive`,label:`Deep Dive`,icon:`search-l`,creator:`Alva`,description:`A complete research package on any ticker. Pulls revenue segmentation from filings, builds a peer comparable set, traces the supply chain up and downstream, then drafts a bull and bear thesis with scenario-weighted price targets. Output is a single read-once briefing — no skimming required, no follow-up questions left dangling.`,prompts:[`Give me a deep-dive on NVDA — revenue segments, peer valuation, supply chain, bull/bear thesis`,`Deep-dive TSMC: capacity, customer mix, geopolitical risk, and margin trajectory`,`Turn a Solana deep-dive into a Playbook I can keep tracking`],playbooks:y([{id:`nvda-deepdive`,title:`NVDA 360° Deep Dive`,creator:`Sheer YLL YGG`,desc:`End-to-end NVDA research — revenue segmentation, hyperscaler capex correlation, peer valuation, and scenario-based price targets.`,tickers:[`NVDA`,`AMD`,`AVGO`],color:v.primary,stars:412,remixes:58},{id:`tsmc-deepdive`,title:`TSMC Long Thesis`,creator:`Macro Scope X`,desc:`Capacity roadmap, customer concentration, Arizona + Kumamoto fab ramps, geopolitical risk weighting, and 5Y margin path.`,tickers:[`TSM`,`2330.TW`],color:v.deepBlue,stars:163,remixes:21},{id:`sol-deepdive`,title:`SOL Ecosystem Deep Dive`,creator:`Harry Zzz`,desc:`DEX volume, Firedancer progress, validator decentralization, revenue accrual, and valuation vs ETH + L2 peers.`,tickers:[`SOL`],color:v.orange,stars:87,remixes:13}])},{id:`daily-macro-brief`,label:`Daily Macro Brief`,kol:!0,creator:`Macro Scope X`,description:`A daily breakdown of macro flows — rates, FX, and cross-asset signals — distilled into a 5-minute brief.`,prompts:[`What are this morning’s key macro flows — rates, DXY, oil, credit spreads?`,`Give me a 5-minute China macro digest — credit impulse, property, policy`,`Build a daily macro brief that posts every US open`],playbooks:y([{id:`daily-macro`,title:`Daily Macro Brief`,creator:`Macro Scope X`,desc:`Auto-generated macro snapshot every US open — rates, DXY, oil, credit spreads, and LLM-authored summary of overnight drivers.`,tickers:[`DXY`,`CL`,`HYG`],color:v.deepBlue,stars:211,remixes:34},{id:`china-weekly`,title:`China Macro Weekly`,creator:`Harry Zzz`,desc:`Weekly China credit impulse, property sales, and policy-move tracker. Flags deviations from trend and dispatches alerts.`,tickers:[`FXI`,`KWEB`],color:v.red,stars:58,remixes:6},{id:`global-risk`,title:`Global Risk Cross-Asset`,creator:`Smart Jing`,desc:`Asia → Europe → US handoff dashboard tracking equity, rates, FX, and credit moves with regime-shift detection.`,tickers:[`SPY`,`EFA`,`EEM`],color:v.blue,stars:144,remixes:18}])},{id:`earnings-edge`,label:`Earnings Edge`,kol:!0,creator:`Smart Jing`,description:`Whisper numbers and post-print drift, weekly.`,prompts:[`Summarize the latest NVDA earnings call and compare guidance to consensus`,`What are the whisper numbers for next week’s MAG7 reports?`,`Build a weekly post-earnings drift scanner for semis (TSM → ASML → NVDA)`],playbooks:y([{id:`earnings-whisper`,title:`Earnings Whisper Board`,creator:`Smart Jing`,desc:`Crowdsourced + LLM whisper numbers + post-earnings drift tracker. Ranks names by whisper-vs-consensus gap for upcoming reports.`,tickers:[`AAPL`,`MSFT`,`NVDA`,`META`],color:v.primary,stars:182,remixes:27},{id:`semis-readacross`,title:`Semis Read-Across`,creator:`Alva Intern`,desc:`Chain earnings read-across TSM → ASML → AMAT → NVDA. Quantifies lead-lag signal on each node of the supply chain.`,tickers:[`TSM`,`ASML`,`AMAT`,`NVDA`],color:v.orange,stars:74,remixes:10},{id:`mag7-postprint`,title:`MAG7 Post-Print Drift`,creator:`Harry Zzz`,desc:`Backtests post-earnings drift across MAG7 by surprise magnitude and guide direction. Suggests entry windows.`,tickers:[`AAPL`,`MSFT`,`GOOGL`,`AMZN`,`NVDA`,`META`,`TSLA`],color:v.green,stars:102,remixes:14}])}],x=[{id:`crypto-pulse`,label:`Crypto Pulse`,kol:!0,creator:`Harry Zzz`,description:`Spot tradable signal in noisy crypto. Aggregates news flow, on-chain activity, ETF flows, exchange balances, and stablecoin issuance into a single morning pulse — flags the names with statistically meaningful deviations and explains *why* in plain English so you can move before the desk does.`,prompts:[`Summarize the last 24h of news on Bitcoin and flag anything that moved price >2%`,`Scan top-50 tokens for 30D breakouts and rising active addresses`,`Track ETH L2 market share — TVL, txns, and fee accrual back to mainnet`],playbooks:y([{id:`btc-news`,title:`BTC News Pulse`,creator:`YGGYLL`,desc:`24h news aggregator for BTC with sentiment scoring, price-correlation tagging, and auto-flagging of likely movers.`,tickers:[`BTC`],color:v.primary,stars:64,remixes:8},{id:`crypto-breakout-2`,title:`Crypto Breakout Screen`,creator:`YGGYLL`,desc:`Scans top-50 tokens for 30D return > 30% combined with rising active-address count.`,tickers:[`BTC`,`ETH`,`SOL`],color:v.red,stars:76,remixes:9}])},{id:`what-if`,label:`What If`,icon:`remix-l`,creator:`Alva`,description:`Run scenarios. See your portfolio reprice.`,prompts:[`What if the Fed delivers 3 more cuts in 2026 — how should a balanced 60/40 portfolio reposition?`,`What if NVDA earnings miss consensus by 5% next quarter — which AI beneficiaries still outperform?`,`What if oil spikes to $120 on Middle East tension — sector rotation map and hedges`],playbooks:y([{id:`fed-cuts-scenario`,title:`Fed-Cut Scenario Rebalancer`,creator:`Smart Jing`,desc:`Monte Carlo on 60/40 under 3 Fed cut paths (dovish / base / hawkish). Suggests duration + small-cap tilt adjustments each FOMC.`,tickers:[`AGG`,`IWM`,`SPY`],color:v.blue,stars:154,remixes:25},{id:`nvda-miss-scenario`,title:`NVDA Miss Shockwave`,creator:`Alva Intern`,desc:`What-if engine for AI peer reaction to a 5% NVDA revenue miss. Ranks relative drawdowns and identifies resilient derivatives plays.`,tickers:[`NVDA`,`AVGO`,`AMD`,`MU`],color:v.red,stars:98,remixes:14},{id:`oil-spike-scenario`,title:`Oil Spike Hedge Map`,creator:`Macro Scope X`,desc:`Maps SPX sector responses to a $120 oil scenario and proposes airline / transport hedges sized to portfolio oil-beta.`,tickers:[`XOM`,`CVX`,`DAL`,`FDX`],color:v.orange,stars:71,remixes:9}])},{id:`yield-hunter`,label:`Yield Hunter`,kol:!0,creator:`Sheer YLL YGG`,description:`Hunts the highest risk-adjusted yield wherever it lives — Treasuries, IG and HY credit, preferreds, MLPs, REITs, and on-chain stablecoin lending. Normalizes spreads to common units, attaches default-probability and smart-contract-risk overlays where relevant, and ladders the result so you can rotate up or down the curve as regimes shift. Includes a tax-equivalent comparison across muni / corporate / pass-through structures.`,prompts:[`Compare 10Y Treasury yield vs IG/HY credit spreads with regime-shift highlights`,`Find dividend-growth names with 10+ years of growth and sub-60% payout ratio`,`Stablecoin yield ladder — Aave / Compound / Pendle with risk scores`],playbooks:y([{id:`div-aristocrat`,title:`Dividend Aristocrat Alpha`,creator:`Smart Jing`,desc:`Ranks 65 aristocrats by yield-on-cost, payout coverage, and 3Y growth. Rotates into the top quintile monthly.`,tickers:[`SPX`,`NOBL`],color:v.green,stars:231,remixes:38},{id:`credit-ladder`,title:`IG / HY Credit Ladder`,creator:`Macro Scope X`,desc:`Spread + duration ladder across IG and HY buckets with default-probability overlays and regime triggers.`,tickers:[`LQD`,`HYG`],color:v.blue,stars:89,remixes:12}])},{id:`dividend-diary`,label:`Dividend Diary`,kol:!0,creator:`Lily Lou`,description:`A weekly diary of dividend hikes, cuts, and special distributions across SPX and global aristocrats.`,prompts:[`List companies that hiked dividends >10% this week and their payout coverage`,`Build a dividend-growth screener with 10+ years of growth and sub-60% payout ratio`,`Flag any SPX dividend cut announcements in the past 30 days`],playbooks:y([{id:`div-aristocrat-2`,title:`Dividend Aristocrat Alpha`,creator:`Smart Jing`,desc:`Ranks 65 aristocrats by yield-on-cost, payout coverage, and 3Y growth. Rotates into the top quintile monthly.`,tickers:[`SPX`,`NOBL`],color:v.green,stars:231,remixes:38},{id:`div-hikes`,title:`Weekly Dividend Hike Tracker`,creator:`Lily Lou`,desc:`Surfaces every SPX/RIY dividend hike each week with coverage, growth-streak, and post-announcement drift.`,tickers:[`SPX`],color:v.primary,stars:64,remixes:7}])},{id:`backtest`,label:`Backtest`,icon:`history-l`,creator:`Alva`,description:`Rule-based strategies, fully attributed.`,prompts:[`Backtest a monthly-rebalanced equal-weight MAG7 basket over the last 10 years`,`Backtest a BTC/ETH 70/30 portfolio rebalanced weekly with 15% max drawdown stop`,`Backtest buying TSM on days where NVDA gains >3%, exit on +10% TP or -5% SL`],playbooks:y([{id:`mag7-equal`,title:`MAG7 Equal-Weight`,creator:`Harry Zzz`,desc:`Maintains a fully invested equal-weight MAG7 portfolio, rebalanced monthly. Tracks alpha vs SPX and records decomposition.`,tickers:[`AAPL`,`MSFT`,`GOOGL`,`AMZN`,`NVDA`,`META`,`TSLA`],color:v.blue,stars:89,remixes:14},{id:`nvda-tsm-bt`,title:`NVDA +3% → TSM Entry`,creator:`Smart Jing`,desc:`Trigger-based backtest — buy TSM at close when NVDA gains >3%, exit on +10% TP or -5% SL. Full historical P&L attribution.`,tickers:[`NVDA`,`TSM`],color:v.red,stars:48,remixes:7},{id:`btc-macd-bt`,title:`BTC MACD 1h Crossover`,creator:`Macro Scope X`,desc:`Backtests BTC MACD(12,26,9) crossover on 1h candles. Reports Sharpe, max DD, and sensitivity to parameter sweeps.`,tickers:[`BTC`],color:v.deepBlue,stars:34,remixes:5}])},{id:`valuation`,label:`Valuation`,icon:`credit-l`,creator:`Alva`,description:`Reverse-DCF, relative-multiple, and SOTP frameworks — value any asset like a sell-side analyst.`,prompts:[`Build a reverse-DCF for MSFT implied by the current share price and compare to peers`,`Relative valuation snapshot for the Mag7 — EV/Sales, P/E, and FCF yield vs 5Y median`,`SOTP valuation for Amazon — AWS / Retail / Ads / Prime / Logistics`],playbooks:y([{id:`mag7-relval`,title:`MAG7 Relative Valuation`,creator:`Alva Intern`,desc:`Live EV/Sales, P/E NTM, and FCF yield table for MAG7 with z-score vs 5-year median. Highlights outliers automatically.`,tickers:[`AAPL`,`MSFT`,`GOOGL`,`AMZN`,`NVDA`,`META`,`TSLA`],color:v.primary,stars:142,remixes:23},{id:`amzn-sotp`,title:`AMZN SOTP`,creator:`Sheer YLL YGG`,desc:`Sum-of-the-parts on Amazon — AWS, Retail, Ads, Prime, Logistics. Adjustable multiples per segment and scenario toggles.`,tickers:[`AMZN`],color:v.orange,stars:96,remixes:11}])}],S=[{id:`community-insider-buy-radar`,label:`Insider Buy Radar`,kol:!0,creator:`Deep Ledger`,description:`Tracks clustered insider buys, 10b5-1 changes, and post-filing drift across US equities.`,tags:[`Filings`,`Insider Cluster`,`Event Drift`],uses:`1.8k uses`,updatedAt:`23m ago`,prompts:[`Build an insider-buy radar for US mid-caps, filtering for clustered purchases above $250k`,`Track 10b5-1 changes and open-market buys for software stocks with positive earnings revisions`,`Flag insider purchases that happen within 30 days of guidance updates or activist filings`],playbooks:y([{id:`insider-cluster-us`,title:`Clustered Insider Buy Monitor`,creator:`Deep Ledger`,desc:`Finds companies with multiple open-market insider purchases over a 14-day window and ranks them by purchase size, role seniority, and post-filing drift.`,tickers:[`SPX`,`R2K`],color:v.primary,stars:318,remixes:46},{id:`ceo-cfo-buys`,title:`CEO / CFO Buy Signal`,creator:`Deep Ledger`,desc:`Filters insider buys to CEO and CFO activity, removes low-signal option exercises, and scores names against valuation and estimate revisions.`,tickers:[`IWM`,`QQQ`],color:v.blue,stars:204,remixes:28},{id:`activist-plus-insider`,title:`Activist + Insider Overlap`,creator:`Alva Intern`,desc:`Watches activist filings and insider buying overlap, then builds a candidate list for event-driven deep dives.`,tickers:[`SPY`,`IWM`],color:v.orange,stars:147,remixes:19}])},{id:`community-whale-wallet-watch`,label:`Whale Wallet Watch`,kol:!0,creator:`WalletWatcher`,description:`Flags large wallet movements, exchange inflows, stablecoin rotations, and funding stress.`,tags:[`On-chain Flow`,`Exchange Flow`,`Liquidity`],uses:`2.4k uses`,updatedAt:`1h ago`,prompts:[`Track BTC whale movements above 1,000 BTC and alert when transfers move toward major exchanges`,`Build a stablecoin rotation monitor across USDT, USDC, and DAI with exchange inflow context`,`Watch SOL and ETH large-wallet activity alongside funding rates and spot volume`],playbooks:y([{id:`btc-whale-exchange-flow`,title:`BTC Whale Exchange Flow`,creator:`WalletWatcher`,desc:`Tracks dormant-wallet movements, large exchange deposits, and spot volume confirmation to flag potential sell-pressure windows.`,tickers:[`BTC`],color:v.orange,stars:402,remixes:64},{id:`stablecoin-rotation`,title:`Stablecoin Rotation Map`,creator:`YGGYLL`,desc:`Maps USDT / USDC flows by venue and chain, then scores whether liquidity is moving into or out of risk assets.`,tickers:[`USDT`,`USDC`,`BTC`],color:v.green,stars:288,remixes:41},{id:`sol-whale-pulse`,title:`SOL Whale Pulse`,creator:`Harry Zzz`,desc:`Combines SOL whale transfers, perp funding, and DEX volume to surface early risk-on and risk-off rotations.`,tickers:[`SOL`,`ETH`],color:v.deepBlue,stars:166,remixes:24}])},{id:`community-options-flow-scanner`,label:`Options Flow Scanner`,kol:!0,creator:`Options Club`,description:`Ranks unusual option flow by premium, sweep quality, open interest, and post-flow move.`,tags:[`Derivatives`,`Vol Surface`,`Positioning`],uses:`1.1k uses`,updatedAt:`5h ago`,prompts:[`Scan unusual call buying in liquid US equities, filtering for premium above $1m and OI expansion`,`Build a weekly options-flow dashboard for MAG7 with sweep quality and implied-vol change`,`Flag bearish put flow that appears before earnings or guidance revisions`],playbooks:y([{id:`unusual-call-flow`,title:`Unusual Call Flow Ranker`,creator:`Options Club`,desc:`Scores call sweeps by premium, liquidity, OI confirmation, and follow-through to reduce noisy single-print alerts.`,tickers:[`AAPL`,`NVDA`,`TSLA`],color:v.primary,stars:265,remixes:39},{id:`mag7-vol-flow`,title:`MAG7 Vol Flow Board`,creator:`Smart Jing`,desc:`Combines options premium, IV change, and post-flow price action across MAG7 for a daily directional board.`,tickers:[`AAPL`,`MSFT`,`NVDA`],color:v.blue,stars:221,remixes:31},{id:`earnings-put-flow`,title:`Pre-Earnings Put Flow`,creator:`Macro Scope X`,desc:`Watches put buying ahead of earnings and filters for flows that historically precede downside gaps.`,tickers:[`QQQ`,`SPY`],color:v.red,stars:119,remixes:15}])},{id:`community-semis-supply-chain`,label:`Semis Supply Chain`,kol:!0,creator:`Silicon Cycle`,description:`Connects TSM, ASML, HBM vendors, and hyperscaler capex into one signal map.`,tags:[`Supply Chain`,`Capacity`,`Read-through`],uses:`3.2k uses`,updatedAt:`1d ago`,prompts:[`Build a semis supply-chain tracker across NVDA, TSM, ASML, SK hynix, MU, and hyperscaler capex`,`Track HBM supply commentary and map read-through to GPU system shipments`,`Monitor TSM capacity, CoWoS packaging, and AI server demand signals in one weekly brief`],playbooks:y([{id:`hbm-bottleneck-map`,title:`HBM Bottleneck Map`,creator:`Silicon Cycle`,desc:`Tracks HBM supply, packaging capacity, and memory-vendor commentary to explain bottlenecks in AI accelerator shipments.`,tickers:[`NVDA`,`MU`,`TSM`],color:v.deepBlue,stars:534,remixes:82},{id:`cowos-capacity-watch`,title:`CoWoS Capacity Watch`,creator:`Macro Scope X`,desc:`Watches TSM advanced packaging updates, supplier lead times, and hyperscaler demand commentary.`,tickers:[`TSM`,`ASML`],color:v.primary,stars:346,remixes:47},{id:`ai-server-readthrough`,title:`AI Server Read-Through`,creator:`Alva Intern`,desc:`Maps Dell, Super Micro, ODM, and component commentary back to AI infrastructure beneficiaries.`,tickers:[`DELL`,`SMCI`,`NVDA`],color:v.orange,stars:271,remixes:33}])},{id:`community-dividend-cut-guard`,label:`Dividend Cut Guard`,kol:!0,creator:`Cashflow Club`,description:`Screens payout risk, FCF coverage, leverage, and management language before dividend cuts.`,tags:[`Payout Risk`,`FCF Coverage`,`Leverage`],uses:`760 uses`,updatedAt:`2d ago`,prompts:[`Screen dividend stocks for payout risk using FCF coverage, leverage, and negative guidance language`,`Build a dividend cut watchlist for REITs and utilities with debt maturity pressure`,`Flag companies where dividend yield is high but free cash flow coverage is deteriorating`],playbooks:y([{id:`dividend-cut-watchlist`,title:`Dividend Cut Watchlist`,creator:`Cashflow Club`,desc:`Ranks dividend stocks by FCF coverage, leverage trend, maturity wall, and management language risk.`,tickers:[`NOBL`,`SPX`],color:v.green,stars:186,remixes:23},{id:`reit-payout-risk`,title:`REIT Payout Risk Monitor`,creator:`Lily Lou`,desc:`Combines payout ratios, debt maturities, and cap-rate pressure for REIT dividend sustainability scoring.`,tickers:[`VNQ`,`SPY`],color:v.blue,stars:128,remixes:14},{id:`yield-trap-screen`,title:`Yield Trap Screen`,creator:`Smart Jing`,desc:`Screens high-yield names for deteriorating FCF, falling estimates, and leverage pressure.`,tickers:[`HYG`,`LQD`],color:v.red,stars:97,remixes:11}])},{id:`community-macro-brief-builder`,label:`Macro Brief Builder`,kol:!0,creator:`Market Bento`,description:`Turns rates, FX, oil, credit, and equity futures into a concise daily macro brief.`,tags:[`Cross-asset`,`Rates & FX`,`Risk Regime`],uses:`920 uses`,updatedAt:`3h ago`,prompts:[`Create a daily macro brief from rates, DXY, oil, credit spreads, and equity futures`,`Summarize today’s cross-asset risk regime and explain what changed since yesterday`,`Build a morning brief for Asia to US market handoff with rates, FX, and commodity context`],playbooks:y([{id:`cross-asset-morning-brief`,title:`Cross-Asset Morning Brief`,creator:`Market Bento`,desc:`Summarizes rates, FX, oil, credit, and equity futures into a concise macro regime note before the US open.`,tickers:[`DXY`,`TLT`,`SPY`],color:v.deepBlue,stars:214,remixes:31},{id:`risk-regime-score`,title:`Risk Regime Score`,creator:`Macro Scope X`,desc:`Combines VIX, credit spreads, DXY, and rates momentum into a daily risk-on / risk-off score.`,tickers:[`VIX`,`HYG`,`DXY`],color:v.red,stars:172,remixes:21},{id:`asia-us-handoff`,title:`Asia to US Handoff`,creator:`Harry Zzz`,desc:`Turns Asia and Europe market moves into a US premarket brief with ETF and futures context.`,tickers:[`EFA`,`EEM`,`SPY`],color:v.orange,stars:143,remixes:18}])},{id:`community-short-squeeze-radar`,label:`Short Squeeze Radar`,kol:!0,creator:`Float Hunter`,description:`Surfaces high short-interest names with rising borrow rates and tightening float dynamics.`,tags:[`Short Interest`,`Borrow Rate`,`Float`],uses:`1.3k uses`,updatedAt:`40m ago`,prompts:[`Find R2K names with SI > 20% of float and borrow rate above 15%`,`Rank squeeze candidates by days-to-cover and recent retail flow`],playbooks:y([{id:`r2k-squeeze-radar`,title:`R2K Squeeze Radar`,creator:`Float Hunter`,desc:`Ranks Russell 2000 names by short-interest, borrow rate, and days-to-cover with retail-flow overlay.`,tickers:[`IWM`,`R2K`],color:v.red,stars:251,remixes:33}])},{id:`community-etf-flow-tracker`,label:`ETF Flow Tracker`,kol:!0,creator:`Flowmaster`,description:`Daily net creations and redemptions across sector, factor, and thematic ETFs with regime context.`,tags:[`ETF Flow`,`Sector Rotation`,`Positioning`],uses:`2.1k uses`,updatedAt:`2h ago`,prompts:[`Show ETF flows by sector for the last 5 trading days`,`Map factor-ETF inflows to underlying single-name leadership`],playbooks:y([{id:`sector-etf-flow`,title:`Sector ETF Flow Board`,creator:`Flowmaster`,desc:`Daily net flows across XLK / XLF / XLE etc. with leadership scoring and breadth confirmation.`,tickers:[`SPY`,`QQQ`],color:v.blue,stars:188,remixes:26}])},{id:`community-fx-carry-monitor`,label:`FX Carry Monitor`,kol:!0,creator:`Carry Desk`,description:`Tracks G10 + EM carry baskets, vol-adjusted spreads, and rate-differential momentum.`,tags:[`FX`,`Carry`,`Rate Diff`],uses:`640 uses`,updatedAt:`4h ago`,prompts:[`Rank G10 carry pairs by vol-adjusted yield`,`Build an EM carry basket excluding TRY / ARS with hedge rules`],playbooks:y([{id:`g10-carry-rank`,title:`G10 Carry Ranker`,creator:`Carry Desk`,desc:`Vol-adjusted carry score across G10 with rate-differential momentum and DXY regime overlay.`,tickers:[`DXY`],color:v.orange,stars:124,remixes:16}])},{id:`community-credit-spread-watch`,label:`Credit Spread Watch`,kol:!0,creator:`Spread Lab`,description:`IG and HY OAS, distress ratios, and CDX positioning rolled up daily with regime detection.`,tags:[`Credit`,`OAS`,`CDX`],uses:`880 uses`,updatedAt:`1d ago`,prompts:[`Daily IG vs HY OAS snapshot with regime flag`,`Track CDX HY positioning and distress ratio for sub-IG`],playbooks:y([{id:`ig-hy-daily`,title:`IG vs HY Daily`,creator:`Spread Lab`,desc:`Daily OAS levels with z-score regime detection and distress-ratio overlay.`,tickers:[`LQD`,`HYG`],color:v.deepBlue,stars:159,remixes:22}])},{id:`community-ai-capex-monitor`,label:`AI Capex Monitor`,kol:!0,creator:`Hyperscaler Watch`,description:`Hyperscaler capex guidance, supplier read-through, and power-grid beneficiary mapping each quarter.`,tags:[`AI Capex`,`Hyperscaler`,`Read-through`],uses:`3.8k uses`,updatedAt:`6h ago`,prompts:[`Track MSFT/AMZN/GOOGL/META capex guides and revisions`,`Map AI capex to power and cooling beneficiaries`],playbooks:y([{id:`hyperscaler-capex-roll`,title:`Hyperscaler Capex Roll-Up`,creator:`Hyperscaler Watch`,desc:`Quarterly capex guides for MSFT/AMZN/GOOGL/META mapped to AI infra winners with accel/decel flags.`,tickers:[`MSFT`,`AMZN`,`GOOGL`,`META`],color:v.primary,stars:471,remixes:68}])},{id:`community-commodity-radar`,label:`Commodity Radar`,kol:!0,creator:`Pit Boss`,description:`Oil, copper, gold, and ags pricing with inventory, futures curve, and positioning context.`,tags:[`Commodities`,`Curve`,`Inventory`],uses:`730 uses`,updatedAt:`1d ago`,prompts:[`Daily WTI brief: inventory, curve shape, and producer hedging`,`Copper supply/demand monitor with Chinese demand overlay`],playbooks:y([{id:`wti-daily`,title:`WTI Daily Radar`,creator:`Pit Boss`,desc:`Inventory, futures curve, refinery margins, and producer hedging — daily.`,tickers:[`CL`],color:v.orange,stars:144,remixes:19}])},{id:`community-bond-auction-tracker`,label:`Bond Auction Tracker`,kol:!0,creator:`Auction Desk`,description:`Tracks Treasury auction tails, bid-to-cover, and primary-dealer takedown against rate moves.`,tags:[`Rates`,`Auctions`,`Tail Risk`],uses:`410 uses`,updatedAt:`2d ago`,prompts:[`Latest 10Y / 30Y auction tails with rate impact`,`Primary dealer takedown trends across coupon auctions`],playbooks:y([{id:`auction-tail-tracker`,title:`Auction Tail Tracker`,creator:`Auction Desk`,desc:`Bid-to-cover, tail size, indirect bid, and post-auction rate move per Treasury auction.`,tickers:[`TLT`],color:v.deepBlue,stars:78,remixes:9}])},{id:`community-earnings-revisions`,label:`Earnings Revisions Pulse`,kol:!0,creator:`EPS Watcher`,description:`Daily upward and downward revision breadth across sectors with single-name standouts.`,tags:[`Estimate Revisions`,`Breadth`,`Sectors`],uses:`1.5k uses`,updatedAt:`3h ago`,prompts:[`Daily revision breadth by sector`,`Top up/down NTM EPS revision names this week`],playbooks:y([{id:`revision-breadth`,title:`Revision Breadth Board`,creator:`EPS Watcher`,desc:`Sector-level upward / downward revision ratio with single-name standouts and price-action overlay.`,tickers:[`SPX`],color:v.green,stars:192,remixes:27}])},{id:`community-ipo-radar`,label:`IPO Radar`,kol:!0,creator:`Primary Desk`,description:`Tracks live and upcoming IPOs with comps, lockup expiries, and post-listing drift backtests.`,tags:[`IPO`,`Lockup`,`Comps`],uses:`520 uses`,updatedAt:`5h ago`,prompts:[`Upcoming IPO pipeline with valuation comps`,`Backtest post-lockup drift for tech IPOs since 2020`],playbooks:y([{id:`ipo-pipeline`,title:`IPO Pipeline Dashboard`,creator:`Primary Desk`,desc:`Live pipeline with deal size, target valuation, comps table, and lockup-expiry calendar.`,tickers:[`SPY`],color:v.blue,stars:96,remixes:12}])},{id:`community-buyback-tracker`,label:`Buyback Tracker`,kol:!0,creator:`Repurchase Co`,description:`Monitors authorized vs executed buybacks, yield, and post-program drift across SPX names.`,tags:[`Buybacks`,`Capital Return`,`Yield`],uses:`670 uses`,updatedAt:`8h ago`,prompts:[`Top buyback yield names this quarter`,`Track new authorizations and execution pace`],playbooks:y([{id:`buyback-yield-screen`,title:`Buyback Yield Screen`,creator:`Repurchase Co`,desc:`Ranks SPX names by trailing buyback yield, execution rate, and post-program drift.`,tickers:[`SPX`],color:v.primary,stars:121,remixes:16}])},{id:`community-sentiment-pulse`,label:`Sentiment Pulse`,kol:!0,creator:`Mood Ring`,description:`Crowd sentiment from X, Reddit, and Discord — scored, deduped, and tied to price action.`,tags:[`Sentiment`,`Social`,`Retail Flow`],uses:`2.8k uses`,updatedAt:`20m ago`,prompts:[`Top 10 names by 24h sentiment delta`,`Track retail-driven sentiment vs short-interest setups`],playbooks:y([{id:`social-sentiment-board`,title:`Social Sentiment Board`,creator:`Mood Ring`,desc:`Multi-platform sentiment scoring with dedup and price-action linkage, refreshed every hour.`,tickers:[`QQQ`,`SPY`],color:v.orange,stars:318,remixes:44}])},{id:`community-cn-policy-radar`,label:`China Policy Radar`,kol:!0,creator:`Beijing Desk`,description:`Reads PBOC, MoF, NDRC, and CSRC releases — flags moves likely to reprice Chinese assets.`,tags:[`China`,`Policy`,`Property`],uses:`590 uses`,updatedAt:`6h ago`,prompts:[`Weekly digest of PBOC operations and rate moves`,`Track property-stimulus measures and read-through to FXI / KWEB`],playbooks:y([{id:`pboc-weekly`,title:`PBOC Weekly Digest`,creator:`Beijing Desk`,desc:`PBOC OMO, MLF, RRR, and rate-corridor updates with FXI / KWEB / CNH read-through.`,tickers:[`FXI`,`KWEB`],color:v.red,stars:84,remixes:10}])},{id:`community-japan-radar`,label:`Japan Macro Radar`,kol:!0,creator:`Tokyo Tape`,description:`BOJ, JGB curve, JPY carry, and Topix flow watcher with English-language summaries.`,tags:[`Japan`,`BOJ`,`Carry`],uses:`380 uses`,updatedAt:`12h ago`,prompts:[`BOJ statement parser — hawkish/dovish scoring`,`Topix sector rotation tied to JPY moves`],playbooks:y([{id:`boj-parser`,title:`BOJ Statement Parser`,creator:`Tokyo Tape`,desc:`Tokenizes BOJ statements, scores hawkishness vs prior, and maps to JGB and JPY reaction.`,tickers:[`TOPIX 500`],color:v.deepBlue,stars:62,remixes:8}])},{id:`community-onchain-yield`,label:`On-Chain Yield Lab`,kol:!0,creator:`DeFi Lab`,description:`Stablecoin and ETH yields across Aave, Compound, Pendle, and points programs with risk scoring.`,tags:[`DeFi`,`Stablecoin`,`Yield`],uses:`1.0k uses`,updatedAt:`4h ago`,prompts:[`Compare stablecoin yields across Aave / Compound / Pendle`,`Build an ETH yield ladder with LST + restaking exposure`],playbooks:y([{id:`stablecoin-yield-rank`,title:`Stablecoin Yield Rank`,creator:`DeFi Lab`,desc:`Normalized yields across major venues with TVL, smart-contract age, and risk-tier scoring.`,tickers:[`USDT`,`USDC`],color:v.green,stars:137,remixes:18}])},{id:`community-event-study`,label:`Event Study Builder`,kol:!0,creator:`Event Lab`,description:`Spin up event-study windows around macro prints, earnings, or policy decisions in one click.`,tags:[`Event Study`,`Drift`,`Backtest`],uses:`450 uses`,updatedAt:`1d ago`,prompts:[`Run an event study on SPX around CPI prints since 2018`,`Build a custom event window around FOMC for risk assets`],playbooks:y([{id:`cpi-event-study`,title:`CPI Event Study`,creator:`Event Lab`,desc:`Pre/post CPI windows for SPX, IWM, and TLT with surprise-bucketed conditional drifts.`,tickers:[`SPY`,`IWM`,`TLT`],color:v.blue,stars:71,remixes:9}])},{id:`community-thematic-basket`,label:`Thematic Basket Builder`,kol:!0,creator:`Theme Lab`,description:`Build, weight, and backtest custom thematic baskets — from robotics to GLP-1 to nuclear.`,tags:[`Themes`,`Basket`,`Backtest`],uses:`1.7k uses`,updatedAt:`7h ago`,prompts:[`Build a humanoid-robotics basket with equal-weight and beta cap`,`Backtest a nuclear-renaissance basket with rebalancing rules`],playbooks:y([{id:`robotics-basket`,title:`Humanoid Robotics Basket`,creator:`Theme Lab`,desc:`Equal-weight basket of robotics names with monthly rebalance, beta cap, and risk parity weighting option.`,tickers:[`NVDA`,`TSLA`],color:v.primary,stars:226,remixes:31}])}];v.primary,v.orange,v.deepBlue,v.green,v.red,v.blue;var C=[{keys:[`btc`,`bitcoin`],prompts:[`Track BTC momentum and alert me on 1h breakouts above 3% gains`,`Build a BTC DCA playbook with weekly rebalancing and a 20% max drawdown stop`,`Correlate BTC with NASDAQ tech names and flag regime shifts in real time`]},{keys:[`eth`,`ethereum`],prompts:[`Set up an ETH staking-yield tracker with alerts on gas-fee spikes`,`Build an ETH/BTC ratio rotation playbook with RSI confirmation`,`Monitor ETH Layer-2 TVL shifts and flag capital rotation signals`]},{keys:[`sol`,`solana`],prompts:[`Track SOL DEX volume vs ETH and surface dApp rotation signals`,`Build a SOL/ETH pair-trade triggered by volume divergence`,`Monitor SOL validator health and alert on decentralization risk`]},{keys:[`nvda`,`nvidia`],prompts:[`Deep-dive NVDA — revenue segmentation, peer valuation, and supply-chain exposure`,`Build an NVDA earnings run-up playbook with an options overlay`,`Track NVDA vs AMD/AVGO relative strength with daily alerts`]},{keys:[`tsla`,`tesla`],prompts:[`Track TSLA delivery numbers vs consensus and alert on misses`,`Build a TSLA vs BYD pair-trade with weekly rebalancing`,`Correlate TSLA price with China EV sentiment and surface leading indicators`]},{keys:[`ai`,`artificial intelligence`],prompts:[`Surface the top 5 AI infrastructure plays by 90-day momentum`,`Build an AI-sector rotation basket rebalanced monthly`,`Compare AI beneficiaries vs software incumbents and flag divergences`]},{keys:[`macro`,`fed`,`cpi`,`rates`],prompts:[`Daily macro brief — US rates, DXY, oil, credit spreads with LLM commentary`,`Build a recession-risk dashboard with 5 leading indicators`,`Set up Fed-cut scenario alerts when CPI surprises move odds >5%`]},{keys:[`earnings`],prompts:[`Build an earnings whisper tracker for the next 2 weeks`,`Post-earnings drift playbook — long beaters, short missers on a 3-day hold`,`Compare implied vs realized moves across MAG7 earnings`]},{keys:[`options`,`iv`],prompts:[`Scan for unusual options volume in mega-cap tech and alert on sweeps`,`Build an IV-crush playbook for post-earnings plays`,`Track 0DTE flow on SPX and surface directional bias shifts`]},{keys:[`dividend`,`income`],prompts:[`Build a dividend-growth screen with 10+ years of growth and sub-60% payout ratio`,`Track dividend ex-dates across my watchlist and alert 5 days ahead`,`Compare dividend-yield baskets vs treasury yield and flag regime shifts`]},{keys:[`what is`,`what's`],prompts:[`What is the implied-volatility curve telling us about NVDA this week?`,`What is the best way to hedge a long BTC position right now?`,`What is the Sharpe ratio of my current portfolio over 90 days?`]},{keys:[`how to`,`how do i`,`how do`],prompts:[`How to build a momentum playbook with drawdown caps`,`How to hedge my equity portfolio against a Fed surprise`,`How to spot unusual options flow in real time`]},{keys:[`find`,`show me`,`show`],prompts:[`Find playbooks with >20% annualized return and <10% drawdown`,`Show me undervalued tech names with rising earnings estimates`,`Find the top yield opportunities in stablecoins right now`]},{keys:[`compare`,`vs`,`versus`],prompts:[`Compare NVDA and AMD across growth, margins, and valuation`,`Compare my portfolio vs the S&P 500 over the last 90 days`,`Compare BTC and ETH risk-adjusted returns year-to-date`]},{keys:[`why`],prompts:[`Why is BTC underperforming NASDAQ this month?`,`Why are semis volatile heading into earnings?`,`Why did my portfolio drop on Friday's close?`]},{keys:[`summarize`,`summary`,`tl;dr`],prompts:[`Summarize this week's Fed speakers and market reactions`,`Summarize my recent trades and flag any discipline slips`,`Summarize the latest AI-sector earnings ranked by relevance`]},{keys:[`explain`],prompts:[`Explain what's driving the 10-year yield higher today`,`Explain the divergence between SPX and credit spreads`,`Explain the risk profile of my current top holding`]}],w=2;function T(e){return e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)}function E(e,t){let n=`\\b${T(t).replace(/\s+/g,`\\s+`)}\\b`;return new RegExp(n,`i`).test(e)}function te(e){let t=e.trim();if(t.length<w||t.length>60||t.split(/\s+/).length>5)return[];for(let e of C)if(e.keys.some(e=>E(t,e)))return e.prompts;return[]}var D=n(),O=[{id:`salp-thesis`,creator:`alvin0617`,title:`SALP Thesis Tracker`,description:`Tracks Situational Awareness LP — Leopold Aschenbrenner's AI infrastructure fund. Based on actual Q4 2025 13F holdings across four layers: AI Cloud, Power, Photonics, and Semiconductors.`,tickers:[`CRWV`,`CORZ`,`IREN`,`APLD`],pulse:`active`,stars:14731,remixes:68,cover:{template:`thesis`,title:`SALP Thesis Tracker`,author:`alvin0617`,tickers:[`CRWV`,`CORZ`,`IREN`,`APLD`],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-00f7b5d8-5b41-47cb-a98d-f3f7cc5c5be8.webp`}},{id:`humanoid-citrini-vf`,creator:`Lakel`,title:`Humanoid Robots Tracker`,description:`The humanoid robots thesis Citrini published in May 2025, now monitored and tracked daily. 75 names across 9 supply-chain layers, scored against fresh news + market data every weekday — with the read delivered to your phone.`,tickers:[`TSLA`,`NVDA`,`RRX`,`ON`],pulse:`active`,stars:480,remixes:5,cover:{template:`thesis`,title:`Humanoid Robots Tracker`,author:`Lakel`,tickers:[`TSLA`,`NVDA`,`RRX`,`ON`],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-faa0783d-4904-4e1e-9d9e-a142a6960793_Browserless.webp`}},{id:`cls-long-thesis-alva`,creator:`Lakel`,title:`Long Thesis: Celestica (CLS)`,description:`Long-thesis playbook on Celestica (CLS), ported to the Alva visual chassis from the Citrini Research article dated Jul 31, 2023.`,tickers:[`CLS`],pulse:`active`,stars:236,remixes:2,cover:{template:`thesis`,title:`Long Thesis: Celestica (CLS)`,author:`Lakel`,tickers:[`CLS`],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-d73c00b6-39a8-47de-a0fa-e2307b6ca088_Browserless.webp`}},{id:`amd-deep-dive`,creator:`Lakel`,title:`AMD Deep-Dive`,description:`Single-stock deep-dive on Advanced Micro Devices (AMD)`,tickers:[`AMD`],pulse:`active`,stars:167,remixes:1,cover:{template:`thesis`,title:`AMD Deep-Dive`,author:`Lakel`,tickers:[`AMD`],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-a43bb55b-e2bc-436f-b34c-ca5ed45d7f3c_Browserless.webp`}},{id:`iran-conflict-digest`,creator:`tianqi`,title:`Iran Conflict Digest`,description:`Daily classified digest of Iran military ops, nuclear program, Strait of Hormuz, regional proxies, and energy-market risk. Automated escalation classification, two-tier Brave search.`,tickers:[],pulse:`active`,stars:188,remixes:2,cover:{template:`thesis`,title:`Iran Conflict Digest`,author:`tianqi`,tickers:[],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-e9150041-4a33-4ca0-9862-1b9466e76964_Browserless.webp`}},{id:`shanghaojin-tweet-trader`,creator:`furyfrog1993`,title:`Herman Jin Tweet Trader`,description:`Backtest of @shanghaojin's tweet signals · 3 holding strategies · AI Trader Profile · Refreshed hourly`,tickers:[`NVDA`,`ICG`,`AVGO`,`GOOG`],pulse:`active`,stars:477,remixes:3,cover:{template:`thesis`,title:`Herman Jin Tweet Trader`,author:`furyfrog1993`,tickers:[`NVDA`,`ICG`,`AVGO`,`GOOG`],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-9f150e82-d3a6-4ce6-a81c-d3db7d2a2414_Browserless.webp`}},{id:`mag7-capex`,creator:`sirius.shen`,title:`AI Infra Stocks Tracker`,description:`Daily verification of the three AI-infra thesis pillars: Mag7 hyperscaler capex direction, ASIC vs GPU share-take, and real beneficiary revenue translation across optical / HBM / enterprise-AI storage. Tracks an 18-name basket vs SMH with ADK-narrated thesis-divergence findings.`,tickers:[`GOOG`,`MSFT`,`META`,`AMZN`],pulse:`active`,stars:2317,remixes:7,cover:{template:`thesis`,title:`AI Infra Stocks Tracker`,author:`sirius.shen`,tickers:[`GOOG`,`MSFT`,`META`,`AMZN`],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-dcf0fe01-30e7-48a2-9773-9b5823e23292.webp`}},{id:`korea-semi-raw-numbers`,creator:`Blue`,title:`Korea Semi Raw Numbers`,description:`Bare-bones KCS monitor for the two HS lines from the KOL post: DRAM/HBM (HS 8542.32) and SSD (HS 8523.51, the modern home after HS 8471.70.4010 was retired). Monthly export USD, weight, and implied unit price per group. No commentary, no equity proxies — just the raw numbers.`,tickers:[],pulse:`active`,stars:710,remixes:10,cover:{template:`thesis`,title:`Korea Semi Raw Numbers`,author:`Blue`,tickers:[],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-12812480-54ea-4d45-ab5f-063eebe9182b.webp`}},{id:`miner-ai-pivot`,creator:`alvin0617`,title:`Miner AI Pivot Tracker`,description:`9 Bitcoin miners pivoting to AI/HPC, tracked through Leopold Aschenbrenner's 'power is the bottleneck' lens. Daily quant snapshot + ADK divergence-finder anchored to three pillars: power capacity & energization, AI/HPC contract translation, and the mining-economics floor. Alpha measured vs BTC, SPY, and WGMI.`,tickers:[`WULF`,`CORZ`,`CIFR`,`HCM`],pulse:`active`,stars:58,remixes:1,cover:{template:`thesis`,title:`Miner AI Pivot Tracker`,author:`alvin0617`,tickers:[`WULF`,`CORZ`,`CIFR`,`HCM`],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-1eb4577d-d638-4feb-9724-cb693e490f8f_Browserless.webp`}},{id:`kol-tweet-trader-leaderboard`,creator:`vernon`,title:`KOL Tweet Trader Leaderboard`,description:`Top 50 financial KOLs ALVA tracks via per-handle tweet-trader campaign feeds — ranked by audited Score Index, win rate, and 90D backtest PnL.`,tickers:[],pulse:`active`,stars:44,remixes:1,cover:{template:`thesis`,title:`KOL Tweet Trader Leaderboard`,author:`vernon`,tickers:[],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-8c76f2b2-7833-42a5-9ee5-6c823d4d6c54_Browserless.webp`}},{id:`trump-china-tracker`,creator:`ivan`,title:`Trump China Trade Tracker`,description:`CEO DELEGATION TRACKER — US stocks tied to Trump's Beijing trip and surrounding China headlines
Ranked by delegation status, China-business linkage, and live news flow — surfaces who wins or loses as deals are announced from Beijing`,tickers:[],pulse:`idle`,stars:211,remixes:2,cover:{template:`thesis`,title:`Trump China Trade Tracker`,author:`ivan`,tickers:[],coverImageUrl:`https://alva-ai-static.b-cdn.net/prd/uploads/1961349611146735616/2026/05/f2033ae6-8faf-44e4-8374-260cf91f62b0.png`}},{id:`openai-rewire-screener`,creator:`MacKinsey`,title:`OpenAI Cloud Shift Screener`,description:`MEMORY CYCLE STAGE TRACKER — DRAM / NAND / HBM + semi hardware names with Early / Mid / Late / Down stage labels
Ranked by momentum, volume, and fundamental inflection — surfaces names where the memory cycle is turning`,tickers:[],pulse:`idle`,stars:382,remixes:2,cover:{template:`screener`,title:`OpenAI Cloud Shift Screener`,author:`MacKinsey`,tickers:[],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-ee0a6c0f-b1bb-44b0-80d1-afa3549136d4.webp`}},{id:`ai-infra-after-mag7-earnings`,creator:`MinnesotaCafe`,title:`AI Infra After Mag7 Earnings`,description:`AI infrastructure basket (equal-weight ANET/AVGO/MRVL/VRT/CRDO/NTAP) after each Mag7 earnings day, 2021-2025.`,tickers:[`ANET`,`AVGO`,`MRVL`,`VRT`],pulse:`idle`,stars:247,remixes:2,cover:{template:`what-if`,title:`AI Infra After Mag7 Earnings`,author:`MinnesotaCafe`,tickers:[`ANET`,`AVGO`,`MRVL`,`VRT`],coverImageUrl:`https://alva-ai-static.b-cdn.net/prd/uploads/1961349611146735616/2026/05/a8a10b60-033a-42fb-876a-a02338e0e7c4.png`}},{id:`aleabitoreddit-tweet-trader`,creator:`furyfrog1993`,title:`Serenity Tweet Trader`,description:`Backtest of @aleabitoreddit's tweet signals · 3 holding strategies · AI Trader Profile · Refreshed every 6h`,tickers:[`AAOI`,`AXTI`,`LITE`],pulse:`idle`,stars:333,remixes:1,cover:{template:`thesis`,title:`Serenity Tweet Trader`,author:`furyfrog1993`,tickers:[`AAOI`,`AXTI`,`LITE`],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-db3d8ffc-f3ad-413e-a517-cd9f0dd88681.webp`}},{id:`memory-cycle-screener`,creator:`ivan`,title:`Memory Cycle Screener`,description:`MEMORY CYCLE STAGE TRACKER — DRAM / NAND / HBM + semi hardware names with Early / Mid / Late / Down stage labels
Ranked by momentum, volume, and fundamental inflection — surfaces names where the memory cycle is turning`,tickers:[],pulse:`idle`,stars:285,remixes:4,cover:{template:`screener`,title:`Memory Cycle Screener`,author:`ivan`,tickers:[],coverImageUrl:`https://alva-ai-static.b-cdn.net/prd/uploads/1961349611146735616/2026/05/81ae6530-4f7f-45f4-b13a-239407b2a16a.png`}},{id:`kol-trade-ideas-digest-v3`,creator:`Brighton Knights`,title:`KOL Trade Ideas Digest`,description:`Daily digest of top trade calls from finance KOLs — clusters by asset, surfaces BTC directional splits, multi-asset singletons, and pushes fresh ideas every day.`,tickers:[`BTC`,`ETH`,`SOL`,`NVDA`],pulse:`idle`,stars:109,remixes:2,cover:{template:`thesis`,title:`KOL Trade Ideas Digest`,author:`Brighton Knights`,tickers:[`BTC`,`ETH`,`SOL`,`NVDA`],coverImageUrl:`https://alva-ai-static.b-cdn.net/prd/uploads/1961349611146735616/2026/05/ee372f15-f980-4f09-9535-1bd3a34d0ff4.png`}},{id:`commodity-pulse`,creator:`tianqi`,title:`Commodity Pulse`,description:`Commodity Pulse tracks fast-moving shifts across metals, energy, and critical minerals by combining market data, news, and social signals to surface what moved, why it matters, and what to watch next.`,tickers:[],pulse:`idle`,stars:35,remixes:1,cover:{template:`thesis`,title:`Commodity Pulse`,author:`tianqi`,tickers:[],coverImageUrl:`https://alva-ai-static.b-cdn.net/prd/uploads/1961349611146735616/2026/05/33357a50-8ae6-42da-9cb8-4c57faa4478a.png`}},{id:`ai-infra-after-mag7-earnings-2975`,creator:`steven`,title:`AI Infra After Mag7 Earnings`,description:`AI infrastructure basket (equal-weight ANET/AVGO/MRVL/VRT/CRDO/NTAP) after each Mag7 earnings day, 2021-2025.`,tickers:[`ANET`,`AVGO`,`MRVL`,`VRT`],pulse:`idle`,stars:190,remixes:1,cover:{template:`what-if`,title:`AI Infra After Mag7 Earnings`,author:`steven`,tickers:[`ANET`,`AVGO`,`MRVL`,`VRT`],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-4ffa8414-1026-4508-b990-4567d5bc100a.webp`}},{id:`market-anomaly-digest-v2`,creator:`B.D.E`,title:`Market Anomaly Digest`,description:`Daily anomaly digest — template-aligned. Tracks unusual price, volume, options, and volatility signals. Four frozen sections, one pushed card per day.`,tickers:[],pulse:`idle`,stars:100,remixes:1,cover:{template:`thesis`,title:`Market Anomaly Digest`,author:`B.D.E`,tickers:[],coverImageUrl:`https://alva-ai-static.b-cdn.net/prd/uploads/1961349611146735616/2026/05/ac5a314c-29f1-4559-b6f4-d0c09920fdfb.png`}},{id:`kevinxu-tweet-trader`,creator:`furyfrog1993`,title:`Kevin Xu Tweet Trader`,description:`Backtest of @kevinxu's tweet signals · 3 holding strategies · AI Trader Profile · Refreshed every 6h`,tickers:[`IREN`,`HIMS`,`QS`,`FIG`],pulse:`idle`,stars:239,remixes:3,cover:{template:`thesis`,title:`Kevin Xu Tweet Trader`,author:`furyfrog1993`,tickers:[`IREN`,`HIMS`,`QS`,`FIG`],coverImageUrl:`https://alva-ai-static.b-cdn.net/thumbnails/screenshot-4e35799b-3884-4255-9aad-f35818d95279.webp`}}],ne=[`salp-thesis`,`humanoid-citrini-vf`,`cls-long-thesis-alva`,`amd-deep-dive`,`iran-conflict-digest`,`shanghaojin-tweet-trader`,`mag7-capex`,`korea-semi-raw-numbers`,`miner-ai-pivot`,`kol-tweet-trader-leaderboard`,`trump-china-tracker`,`openai-rewire-screener`,`ai-infra-after-mag7-earnings`,`aleabitoreddit-tweet-trader`,`memory-cycle-screener`,`kol-trade-ideas-digest-v3`,`commodity-pulse`,`ai-infra-after-mag7-earnings-2975`,`market-anomaly-digest-v2`,`kevinxu-tweet-trader`];ne.slice(0,5);var k=ne.map(e=>O.find(t=>t.id===e)).filter(e=>e!==void 0);function A(e,t){let n=`${t.title} ${t.description} ${t.tickers.join(` `)} ${t.cover.domain??``} ${t.cover.template}`.toLowerCase(),r=e.toLowerCase();return e===`Smart Screener`&&t.cover.template===`screener`||e===`Theme Tracker`&&t.cover.template===`thesis`||e===`What-if`&&t.cover.template===`what-if`||e===`Thesis`&&t.cover.template===`thesis`||t.tickers.some(e=>e.toLowerCase()===r)?!0:n.includes(r)}var re=`researcher-l1`;function j(){return typeof window>`u`||typeof window.matchMedia!=`function`?!0:window.matchMedia(`(hover: hover)`).matches}var M={display:`flex`,alignItems:`center`,gap:8,height:40,padding:`0 16px`,borderRadius:999,border:`0.5px solid var(--line-l2)`,fontFamily:`'Delight', sans-serif`,fontSize:14,lineHeight:`22px`,fontWeight:400,color:`var(--text-n9)`,whiteSpace:`nowrap`,cursor:`pointer`,letterSpacing:.14,userSelect:`none`,background:`white`,transition:`box-shadow 160ms ease, transform 160ms ease`};function ie({template:e,active:t,onClick:n,onHover:r,onLeave:i}){let o=(0,g.useRef)(null);return(0,D.jsxs)(`button`,{ref:o,onClick:n,onMouseEnter:()=>{j()&&o.current&&(o.current.style.boxShadow=`0 4px 12px rgba(0,0,0,0.05)`,o.current.style.transform=`translateY(-2px)`,r&&r(o.current.getBoundingClientRect()))},onMouseLeave:()=>{j()&&(o.current&&(o.current.style.boxShadow=`none`,o.current.style.transform=`translateY(0)`),i?.())},style:{...M,background:t?`#f3f8f8`:`white`},children:[e.kol?(0,D.jsx)(a,{name:e.creator,size:22}):e.icon&&(0,D.jsx)(l,{name:e.icon,size:16,color:`var(--text-n7)`}),e.label]})}function N(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}function P(e){let t=N(e)%7200;return t<1?`just now`:t<60?`${t}m ago`:t<1440?`${Math.floor(t/60)}h ago`:`${Math.floor(t/1440)}d ago`}var F=`Filings.Insider Cluster.Event Drift.Earnings Drift.Whisper Numbers.Macro Flow.FX Cross.Rates Curve.Credit Spread.Sentiment.Theme Tracker.Catalyst.Risk Off.Backtest.Yield Curve.Dividend.On-Chain.ETF Flow.MAG7.AI Capex.Hyperscaler.Volatility.Carry.Drawdown.Sharpe.Quintile.Read-Across.Sector Rotation.Pair Trade.Theme`.split(`.`);function I(e){let t=(N(e)>>>12)%2+2,n=new Set,r=[];for(let i=0;r.length<t&&i<32;i++){let t=N(`${e}|tag|${i}`)%F.length;n.has(t)||(n.add(t),r.push(F[t]))}return r}var L=e=>()=>(0,D.jsx)(`img`,{src:`/alva-infant/${e}`,alt:``,width:14,height:14,style:{width:14,height:14,display:`block`}}),R={discord:{key:`discord`,label:`Discord`,href:`https://discord.com`,render:L(`logo-social-discord.svg`)},telegram:{key:`telegram`,label:`Telegram`,href:`https://telegram.org`,render:L(`logo-telegram.svg`)},x:{key:`x`,label:`X`,href:`https://x.com`,render:()=>(0,D.jsx)(`svg`,{width:12,height:12,viewBox:`0 0 24 24`,fill:`rgba(0,0,0,0.85)`,"aria-hidden":!0,style:{display:`block`},children:(0,D.jsx)(`path`,{d:`M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z`})})},instagram:{key:`instagram`,label:`Instagram`,href:`https://instagram.com`,render:()=>(0,D.jsx)(`svg`,{width:13,height:13,viewBox:`0 0 24 24`,fill:`rgba(0,0,0,0.85)`,"aria-hidden":!0,style:{display:`block`},children:(0,D.jsx)(`path`,{d:`M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z`})})}},ae=[`discord`,`telegram`,`x`],z=[`x`,`telegram`,`discord`,`instagram`];function B(e){if(e===`Alva`)return ae.map(e=>R[e]);let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619)>>>0;let n=e=>{let n=t;for(let t=0;t<e.length;t++)n^=e.charCodeAt(t),n=Math.imul(n,16777619)>>>0;return n},r=t%2+1;return[...z].sort((e,t)=>n(e)-n(t)).slice(0,r).map(e=>R[e])}function oe({template:e,anchor:t,placeAbove:n,side:r=`auto`,onMouseEnter:i,onMouseLeave:o}){let s=(0,g.useRef)(null),[c,l]=(0,g.useState)(220);(0,g.useLayoutEffect)(()=>{s.current&&l(s.current.offsetHeight)},[e.id]);let u=e.tags??I(e.id),d,f;return r===`left`?(d=t.left-360-10,typeof window<`u`&&(d=Math.max(12,d)),f=t.top+t.height/2-c/2,typeof window<`u`&&(f=Math.max(12,Math.min(f,window.innerHeight-c-12)))):(d=t.left+t.width/2-360/2,typeof window<`u`&&(d=Math.max(12,Math.min(d,window.innerWidth-360-12))),f=n?t.top-c-10:t.bottom+10),(0,D.jsxs)(`div`,{ref:s,onMouseEnter:i,onMouseLeave:o,style:{position:`fixed`,top:f,left:d,width:360,zIndex:50,background:`#ffffff`,borderRadius:8,border:`0.5px solid var(--line-l2)`,boxShadow:`var(--shadow-s)`,padding:20,pointerEvents:`auto`,animation:`newchat-fadeup 160ms ease-out`},children:[(0,D.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:4},children:[(0,D.jsx)(`h2`,{style:{fontFamily:`'Delight', sans-serif`,fontSize:18,lineHeight:`24px`,fontWeight:400,color:`var(--text-n9)`,letterSpacing:.18,margin:0},children:e.label}),(0,D.jsx)(`span`,{style:{fontFamily:`'Delight', sans-serif`,fontSize:11,lineHeight:`16px`,color:`rgba(0,0,0,0.4)`,letterSpacing:.11,fontWeight:400},children:P(e.id)})]}),(0,D.jsx)(`p`,{style:{fontFamily:`'Delight', sans-serif`,fontSize:13,lineHeight:`20px`,color:`var(--text-n7)`,letterSpacing:.13,margin:`10px 0 0`},children:e.description}),(0,D.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:5,flexWrap:`wrap`,marginTop:10},children:u.slice(0,3).map(e=>(0,D.jsx)(`span`,{style:{height:20,padding:`0 6px`,borderRadius:5,background:`var(--b-r05)`,color:`var(--text-n5)`,fontFamily:`'Delight', sans-serif`,fontSize:11,lineHeight:`20px`,letterSpacing:.11,whiteSpace:`nowrap`},children:e},e))}),(0,D.jsx)(`div`,{style:{height:1,background:`var(--line-l07)`,margin:`20px 0`}}),(0,D.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12},children:[(0,D.jsxs)(`button`,{type:`button`,className:`nc-creator-link`,onClick:e=>e.stopPropagation(),style:{flex:1,minWidth:0,display:`flex`,alignItems:`center`,gap:10,padding:`4px 6px`,margin:`-4px -6px`,border:`none`,background:`transparent`,cursor:`pointer`,borderRadius:6,transition:`background 140ms ease`,textAlign:`left`},children:[(0,D.jsx)(a,{name:e.creator,size:36}),(0,D.jsxs)(`div`,{style:{minWidth:0},children:[(0,D.jsx)(`div`,{style:{fontFamily:`'Delight', sans-serif`,fontSize:11,lineHeight:`14px`,color:`rgba(0,0,0,0.4)`,letterSpacing:.11,fontWeight:400},children:`Created by`}),(0,D.jsx)(`div`,{className:`nc-creator-link-name`,style:{fontFamily:`'Delight', sans-serif`,fontSize:14,lineHeight:`20px`,color:`var(--text-n9)`,letterSpacing:.14,fontWeight:400,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`,transition:`color 140ms ease`},children:e.creator})]})]}),(0,D.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:4,flexShrink:0},children:B(e.creator).map(e=>(0,D.jsx)(`a`,{href:e.href,target:`_blank`,rel:`noreferrer noopener`,"aria-label":e.label,style:{width:24,height:24,borderRadius:`9999px`,background:`var(--b-r05)`,display:`inline-flex`,alignItems:`center`,justifyContent:`center`,flexShrink:0,transition:`background 120ms ease, transform 120ms ease`},onMouseEnter:e=>{j()&&(e.currentTarget.style.background=`var(--b-r1)`,e.currentTarget.style.transform=`translateY(-1px)`)},onMouseLeave:e=>{j()&&(e.currentTarget.style.background=`var(--b-r05)`,e.currentTarget.style.transform=`translateY(0)`)},children:e.render()},e.key))})]})]})}function se({text:e,onClick:t,index:n=0}){return(0,D.jsxs)(`button`,{type:`button`,className:`nc-prompt-row`,style:{animation:`newchat-fade 220ms ease-out both`,animationDelay:`${n*70}ms`},onClick:t,onMouseEnter:e=>{j()&&(e.currentTarget.style.background=`var(--b-r03)`)},onMouseLeave:e=>{j()&&(e.currentTarget.style.background=`transparent`)},children:[(0,D.jsx)(`span`,{className:`nc-prompt-text`,children:e}),(0,D.jsx)(l,{name:`enter-l`,size:20,color:`rgba(0,0,0,0.4)`})]})}function V({widthPct:e}){return(0,D.jsxs)(`div`,{className:`nc-prompt-skeleton-row`,style:{display:`flex`,alignItems:`center`,gap:12,height:46,padding:`12px`,boxSizing:`border-box`},children:[(0,D.jsx)(`div`,{style:{flex:1,height:14,background:`var(--b-r07)`,borderRadius:4,maxWidth:`${e}%`}}),(0,D.jsx)(`div`,{style:{width:20,height:20,background:`var(--b-r05)`,borderRadius:4}})]})}var H={"theme-tracker":`thesis`,"smart-screener":`screener`,"deep-dive":`thesis`,"daily-macro-brief":`general`,"earnings-edge":`thesis`,"crypto-pulse":`general`,"what-if":`what-if`,"yield-hunter":`screener`,"dividend-diary":`screener`,backtest:`what-if`,valuation:`thesis`},ce={"theme-tracker":`macro`,"smart-screener":`momentum`,"deep-dive":`ai`,"daily-macro-brief":`review`,"earnings-edge":`macro`,"crypto-pulse":`alerts`,"what-if":`event_study`,"yield-hunter":`dividend`,"dividend-diary":`dividend`,backtest:`event_study`,valuation:`value`},U=[`S&P LARGE CAP`,`RUSSELL 2000`,`NASDAQ 100`,`MSCI EMG`,`STOXX 600`,`TOPIX 500`],le=[`1H`,`6H`,`1D`,`1W`],W=[`Late long-term debt cycle · risk-off bias`,`AI capex peak forming into Q3`,`Basket −2.1% vs SMH +0.6% YTD`,`Hyperscaler PPA flows feed power demand`,`Dollar regime shift, EM tailwind`,`Curve re-steepening as growth softens`],G=[`Historically Drops`,`Historically Rises`,`Range-Bound`,`Outperforms Peers`,`Trails Benchmark`],K=[`CONTEXT FEED · daily`,`WATCHLIST · 2026`,`BRIEF · daily`,`PULSE · live`,`ALERTS · LIVE · 30S`],q=[`2h ago`,`38 holdings`,`1.2M views`,`live`,`12 alerts`,`07:30 ET`],J=[`JAN`,`FEB`,`MAR`,`APR`,`MAY`,`JUN`,`JUL`,`AUG`,`SEP`,`OCT`,`NOV`,`DEC`],Y=[`RISK`,`CATALYST`,`AMBIGUOUS`];function ue(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}function X(e,t){let n=H[t]??`general`,r=ce[t],i=ue(`${e.id}|${e.title}`),a=(e,t)=>e[(i>>>t)%e.length],o=e.tickers??[],s={template:n,title:e.title,author:e.creator,tickers:o,domain:r};if(n===`screener`)return{...s,series:`SCORED · ${a(U,0)} · ${a(le,6)}`};if(n===`thesis`){let e=a(J,0),t=(i>>>4)%28+1;return{...s,anchor:`${e} ${t}`,category:a(Y,8),kind:a(W,12)}}if(n===`what-if`){let e=(i>>>0&1)==1,t=((i>>>2)%45+5)/10,n=(i>>>8)%9+2,r=Array.from({length:5}).map((t,n)=>{let r=(i>>>n*3&255)/255*2-1;return Math.round((r*(e?1:-1)*4+(e?.6:-.6))*10)/10});return{...s,series:`30D AFTER · ${n}×`,kind:a(G,16),anchor:`${e?`+`:`−`}${t.toFixed(1)}%`,whatIfBars:r}}let c=(i>>>0)%70+10,l=((i>>>4)%200+50)/10;return{...s,kind:a(K,0),anchor:a(q,8),series:`${c} PIECES · ${l.toFixed(1)}K VIEWS`}}function de(e,t){return{id:e.id,creator:e.creator,title:e.title,description:e.desc,tickers:e.tickers,pulse:`active`,stars:e.stars,remixes:e.remixes,cover:X(e,t)}}function fe(){return(0,D.jsxs)(`div`,{style:{background:`#ffffff`,border:`0.5px solid var(--line-l12)`,borderRadius:8,padding:4,display:`flex`,flexDirection:`column`,overflow:`hidden`},children:[(0,D.jsx)(`div`,{style:{width:`100%`,aspectRatio:`472 / 265.5`,borderRadius:4,background:`var(--b-r05)`}}),(0,D.jsxs)(`div`,{style:{padding:`16px 12px 12px`,display:`flex`,flexDirection:`column`,gap:10},children:[(0,D.jsxs)(`div`,{style:{display:`flex`,gap:6},children:[(0,D.jsx)(`div`,{style:{width:70,height:20,background:`var(--b-r07)`,borderRadius:4}}),(0,D.jsx)(`div`,{style:{width:40,height:20,background:`var(--b-r05)`,borderRadius:4}})]}),(0,D.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:6},children:[(0,D.jsx)(`div`,{style:{height:18,background:`var(--b-r07)`,borderRadius:4,maxWidth:`60%`}}),(0,D.jsx)(`div`,{style:{height:12,background:`var(--b-r05)`,borderRadius:4}}),(0,D.jsx)(`div`,{style:{height:12,background:`var(--b-r05)`,borderRadius:4,maxWidth:`80%`}})]})]})]})}function pe({skills:e,selectedId:t,onSelect:n,onClose:r}){let i=e=>e<640?1:e<960?2:3,[o,s]=(0,g.useState)(()=>typeof window>`u`?3:i(window.innerWidth));if((0,g.useEffect)(()=>{let e=()=>s(i(window.innerWidth));return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),typeof document>`u`)return null;let c=Array.from({length:o},()=>[]);return e.forEach((e,t)=>c[t%o].push(e)),(0,_.createPortal)((0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(`div`,{className:`skills-panel-backdrop`,onClick:r}),(0,D.jsxs)(`div`,{className:`skills-panel`,role:`dialog`,"aria-label":`Skills`,children:[(0,D.jsxs)(`div`,{className:`skills-panel-header`,children:[(0,D.jsx)(`span`,{className:`skills-panel-title`,children:`Skills`}),(0,D.jsx)(`button`,{type:`button`,"aria-label":`Close`,className:`skills-panel-close`,onClick:r,children:(0,D.jsx)(l,{name:`close-l1`,size:16,color:`var(--text-n7)`})})]}),(0,D.jsx)(`div`,{className:`skills-panel-scroll`,children:(0,D.jsx)(`div`,{className:`skills-panel-grid`,children:c.map((e,r)=>(0,D.jsx)(`div`,{className:`skills-panel-col`,children:e.map(e=>{let r=e.tags??I(e.id),i=t===e.id,o=B(e.creator);return(0,D.jsxs)(`button`,{type:`button`,className:`skills-panel-card${i?` is-selected`:``}`,onClick:()=>n(e.id),children:[(0,D.jsxs)(`div`,{className:`skills-panel-card-content`,children:[(0,D.jsxs)(`div`,{className:`skills-panel-card-header`,children:[e.creator===`Alva`&&e.icon?(0,D.jsx)(`span`,{className:`skills-panel-card-icon-wrap`,children:(0,D.jsx)(l,{name:e.icon,size:20,color:`var(--text-n7)`})}):(0,D.jsx)(`span`,{className:`skills-panel-card-creator-thumb`,children:(0,D.jsx)(a,{name:e.creator,size:36})}),(0,D.jsxs)(`div`,{className:`skills-panel-card-titleblock`,children:[(0,D.jsx)(`span`,{className:`skills-panel-card-name`,children:e.label}),(0,D.jsx)(`span`,{className:`skills-panel-card-author`,children:e.creator})]})]}),(0,D.jsx)(`p`,{className:`skills-panel-card-desc`,children:e.description}),r.length>0&&(0,D.jsx)(`div`,{className:`skills-panel-card-tags`,children:r.slice(0,3).map(e=>(0,D.jsx)(`span`,{className:`skills-panel-card-tag`,children:e},e))})]}),(0,D.jsx)(`div`,{className:`skills-panel-card-hoverblock`,children:(0,D.jsxs)(`div`,{className:`skills-panel-card-hoverblock-inner`,children:[(0,D.jsx)(`div`,{className:`skills-panel-card-divider`}),(0,D.jsxs)(`div`,{className:`skills-panel-card-creator-row`,children:[(0,D.jsx)(a,{name:e.creator,size:36}),(0,D.jsxs)(`div`,{className:`skills-panel-card-creator-text`,children:[(0,D.jsx)(`span`,{className:`skills-panel-card-creator-caps`,children:`Created by`}),(0,D.jsx)(`button`,{type:`button`,className:`skills-panel-card-creator-name`,onClick:e=>e.stopPropagation(),children:(0,D.jsx)(`span`,{className:`skills-panel-card-creator-name-text`,children:e.creator})})]}),(0,D.jsx)(`div`,{className:`skills-panel-card-socials`,children:o.map(e=>(0,D.jsx)(`a`,{href:e.href,target:`_blank`,rel:`noreferrer noopener`,"aria-label":e.label,onClick:e=>e.stopPropagation(),className:`skills-panel-card-social`,children:e.render()},e.key))})]})]})})]},e.id)})},r))})})]})]}),document.body)}var me=36,he=28,Z=1.33,ge=640,_e=18;function ve({selected:e,maxWidth:t}){let[n,r]=(0,g.useState)(()=>typeof window<`u`?window.innerWidth<ge:!1);(0,g.useEffect)(()=>{let e=()=>r(window.innerWidth<ge);return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]);let i=n?he:me,a=Math.ceil(i*Z)*2,o=(0,g.useRef)(null),s=(0,g.useRef)(null),c=(0,g.useRef)(null),l=(0,g.useRef)(null),u=(0,g.useRef)(``);(0,g.useRef)(!1);let[d,f]=(0,g.useState)(1),p=e?`Build your ${e.label}`:`Turn Ideas into Live
Investing Playbooks in Minutes`;return(0,g.useLayoutEffect)(()=>{let e=o.current,t=s.current;if(!e||!t)return;let n=()=>{t.style.maxWidth=`${e.clientWidth}px`;let n=t.scrollHeight;f(n>a?a/n:1)};n();let r=new ResizeObserver(n);return r.observe(e),()=>r.disconnect()},[p,a]),(0,g.useEffect)(()=>{if(u.current===p){u.current=p;return}u.current=p,o.current,s.current,c.current,l.current},[p]),(0,D.jsxs)(`div`,{ref:o,style:{position:`relative`,width:`100%`,maxWidth:t,height:a,display:`flex`,alignItems:`center`,justifyContent:`center`,overflow:`visible`},children:[(0,D.jsx)(`style`,{children:`
        @keyframes tr-dot-flash { 0%{opacity:0} 15%{opacity:1} 100%{opacity:0} }
        @keyframes tr-char-erase { 0%{opacity:1} 100%{opacity:0} }
        @keyframes tr-char-appear { 0%{opacity:0} 100%{opacity:1} }
        .tr-cell{ position:absolute; width:${_e}px; height:${_e}px; opacity:0; pointer-events:none; }
      `}),(0,D.jsx)(`h1`,{ref:c,"aria-hidden":!0,style:{position:`absolute`,left:0,right:0,top:`50%`,transform:`translateY(-50%) scale(${d})`,transformOrigin:`center`,fontSize:i,lineHeight:Z,fontWeight:400,color:`var(--text-n9)`,textAlign:`center`,letterSpacing:.45,margin:0,pointerEvents:`none`,zIndex:1}}),(0,D.jsx)(`h1`,{ref:s,style:{fontSize:i,lineHeight:Z,fontWeight:400,color:`var(--text-n9)`,textAlign:`center`,letterSpacing:.45,margin:0,transform:`scale(${d})`,transformOrigin:`center`,position:`relative`,zIndex:1,whiteSpace:`pre-line`},children:p}),(0,D.jsx)(`div`,{ref:l,"aria-hidden":!0,style:{position:`absolute`,inset:0,pointerEvents:`none`,zIndex:2,overflow:`visible`}})]})}function ye({template:e,onClose:t,onSelect:n}){let r=e.tags??I(e.id);return typeof document>`u`?null:(0,_.createPortal)((0,D.jsx)(`div`,{onClick:t,style:{position:`fixed`,inset:0,background:`rgba(0,0,0,0.45)`,zIndex:9999,display:`flex`,alignItems:`center`,justifyContent:`center`,padding:16,animation:`newchat-fade 160ms ease-out`},children:(0,D.jsxs)(`div`,{onClick:e=>e.stopPropagation(),style:{width:`100%`,maxWidth:360,background:`#ffffff`,borderRadius:14,padding:20,boxShadow:`0 20px 48px rgba(0,0,0,0.18), 0 6px 14px rgba(0,0,0,0.08)`,animation:`newchat-fadeup 220ms ease-out`},children:[(0,D.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:4},children:[(0,D.jsx)(`h2`,{style:{fontFamily:`'Delight', sans-serif`,fontSize:18,lineHeight:`24px`,fontWeight:500,color:`var(--text-n9)`,letterSpacing:.18,margin:0},children:e.label}),(0,D.jsx)(`span`,{style:{fontFamily:`'Delight', sans-serif`,fontSize:11,lineHeight:`16px`,color:`rgba(0,0,0,0.4)`,letterSpacing:.11,fontWeight:500},children:P(e.id)})]}),(0,D.jsx)(`p`,{style:{fontFamily:`'Delight', sans-serif`,fontSize:13,lineHeight:`20px`,color:`var(--text-n7)`,letterSpacing:.13,margin:`10px 0 0`},children:e.description}),(0,D.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:5,flexWrap:`wrap`,marginTop:10},children:r.slice(0,3).map(e=>(0,D.jsx)(`span`,{style:{height:20,padding:`0 6px`,borderRadius:5,background:`var(--b-r05)`,color:`var(--text-n5)`,fontFamily:`'Delight', sans-serif`,fontSize:11,lineHeight:`20px`,letterSpacing:.11,whiteSpace:`nowrap`},children:e},e))}),(0,D.jsx)(`div`,{style:{height:1,background:`var(--line-l07)`,margin:`20px 0 12px`}}),(0,D.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12},children:[(0,D.jsxs)(`div`,{style:{flex:1,minWidth:0,display:`flex`,alignItems:`center`,gap:10},children:[(0,D.jsx)(a,{name:e.creator,size:36}),(0,D.jsxs)(`div`,{style:{minWidth:0},children:[(0,D.jsx)(`div`,{style:{fontFamily:`'Delight', sans-serif`,fontSize:11,lineHeight:`14px`,color:`var(--text-n5)`,letterSpacing:.11,fontWeight:500},children:`Created by`}),(0,D.jsx)(`div`,{style:{fontFamily:`'Delight', sans-serif`,fontSize:14,lineHeight:`20px`,color:`var(--text-n9)`,letterSpacing:.14,fontWeight:500,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`},children:e.creator})]})]}),(0,D.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:6,flexShrink:0},children:B(e.creator).map(e=>(0,D.jsx)(`a`,{href:e.href,target:`_blank`,rel:`noreferrer noopener`,"aria-label":e.label,style:{width:24,height:24,borderRadius:`9999px`,background:`var(--b-r05)`,display:`inline-flex`,alignItems:`center`,justifyContent:`center`,flexShrink:0},children:e.render()},e.key))})]}),(0,D.jsx)(`div`,{style:{height:1,background:`var(--line-l07)`,margin:`12px 0 20px`}}),(0,D.jsx)(`button`,{type:`button`,onClick:n,style:{width:`100%`,height:44,border:`none`,borderRadius:10,background:`var(--main-m1)`,color:`#fff`,fontFamily:`'Delight', sans-serif`,fontSize:14,fontWeight:500,letterSpacing:.14,cursor:`pointer`},children:`Pick this skill`})]})}),document.body)}var be=340,Q=16;function xe({onNavigate:e}){let[t,n]=(0,g.useState)(`Popular`),[r,i]=(0,g.useState)(()=>new Set),a=(0,g.useRef)(null),[o,s]=(0,g.useState)(0);(0,g.useEffect)(()=>{if(!a.current)return;let e=a.current,t=new ResizeObserver(e=>{s(e[0]?.contentRect.width??0)});return t.observe(e),()=>t.disconnect()},[]);let c=e=>{i(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})},u=(0,g.useMemo)(()=>{let e=t===`Recent`?[...k].reverse():k;return r.size===0?e:e.filter(e=>{for(let t of r)if(A(t,e))return!0;return!1})},[t,r]),d=o===0?{display:`grid`,gap:Q,width:`100%`}:{display:`grid`,gridTemplateColumns:`repeat(${Math.max(1,Math.floor((o+Q)/be))}, minmax(0, 1fr))`,gap:Q,width:`100%`};return(0,D.jsx)(`section`,{style:{width:`100%`,padding:`40px 28px 60px`,position:`relative`,zIndex:2},children:(0,D.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:`100%`},children:[(0,D.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,width:`100%`},children:[(0,D.jsx)(`p`,{style:{fontFamily:`'Delight', sans-serif`,fontSize:20,lineHeight:`30px`,letterSpacing:.2,color:`var(--text-n9)`},children:`Trending Playbooks`}),(0,D.jsxs)(`button`,{type:`button`,onClick:()=>e(`explore`),style:{display:`inline-flex`,alignItems:`center`,gap:4,height:28,padding:`4px 0`,background:`transparent`,border:`none`,cursor:`pointer`,fontFamily:`'Delight', sans-serif`,fontSize:12,lineHeight:`20px`,letterSpacing:.12,color:`var(--text-n9)`},children:[`View all`,(0,D.jsx)(l,{name:`arrow-right-l2`,size:14,color:`var(--text-n9)`})]})]}),(0,D.jsx)(m,{sort:t,sortOptions:h,chips:p,onSortChange:n,selectedChips:r,onChipToggle:c}),(0,D.jsx)(`div`,{ref:a,style:d,children:u.map((e,t)=>(0,D.jsx)(`div`,{style:{width:`100%`},children:(0,D.jsx)(f,{p:e,staggerMs:t%10*1e3})},e.id))})]})})}var $=960;function Se({onNavigate:e}){let[t,n]=(0,g.useState)(null),[r,o]=(0,g.useState)(null),[p,m]=(0,g.useState)(null),[h,_]=(0,g.useState)(``),[v,ee]=(0,g.useState)(``),[y,C]=(0,g.useState)(null),[w,T]=(0,g.useState)(!1),[E,O]=(0,g.useState)(null);(0,g.useEffect)(()=>{if(typeof document>`u`)return;let e=!!E||w;return document.body.classList.toggle(`nc-overlay-open`,e),()=>{document.body.classList.remove(`nc-overlay-open`)}},[E,w]);let[ne,k]=(0,g.useState)(()=>typeof window<`u`?window.innerWidth<640:!1);(0,g.useEffect)(()=>{let e=()=>k(window.innerWidth<640);return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]);let A=(0,g.useRef)(null),ie=(0,g.useRef)(null),N=(0,g.useRef)(null),P=(0,g.useRef)(null),F=(0,g.useRef)(null),[I,L]=(0,g.useState)(null),R=()=>{P.current!==null&&(window.clearTimeout(P.current),P.current=null),F.current&&=(document.removeEventListener(`mousemove`,F.current),null),L(null)},ae=(e,t,n,r)=>{R(),L({x:n,y:r});let i=e=>L({x:e.clientX,y:e.clientY});document.addEventListener(`mousemove`,i),F.current=i,P.current=window.setTimeout(()=>{R(),H(e,t.getBoundingClientRect())},600)},z=()=>{N.current!==null&&(window.clearTimeout(N.current),N.current=null)},B=()=>{z(),N.current=window.setTimeout(()=>C(null),160)},H=(e,t,n=`auto`)=>{if(n===`left`){z(),C({id:e,rect:t,placeAbove:!1,side:`left`});return}let r=!1;A.current&&A.current.querySelectorAll(`button, [role="button"]`).forEach(e=>{e.getBoundingClientRect().top>t.bottom-1&&(r=!0)}),z(),C({id:e,rect:t,placeAbove:r,side:`auto`})},[ce,U]=(0,g.useState)(!1),[le,W]=(0,g.useState)(!1);(0,g.useEffect)(()=>{let e=setTimeout(()=>ee(h),700);return()=>clearTimeout(e)},[h]),(0,g.useEffect)(()=>{if(!w)return;let e=e=>{e.key===`Escape`&&T(!1)};return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)},[w]),(0,g.useEffect)(()=>{if(!t){U(!1),W(!1);return}U(!1),W(!1);let e=setTimeout(()=>U(!0),900),n=setTimeout(()=>W(!0),1500);return()=>{clearTimeout(e),clearTimeout(n)}},[t]);let G=(0,g.useMemo)(()=>te(v),[v]),K=!t&&G.length>0,q=(0,g.useMemo)(()=>t&&(b.find(e=>e.id===t)||x.find(e=>e.id===t)||S.find(e=>e.id===t))||null,[t]),J=(0,g.useMemo)(()=>q?q.recCards&&q.recCards.length?q.recCards:q.playbooks.slice(0,3).map(e=>({type:`playbook`,playbook:e})):[],[q]),Y=(0,g.useMemo)(()=>[...b,...x,...S],[]),ue=(0,g.useRef)(null),[X,me]=(0,g.useState)(new Set);(0,g.useLayoutEffect)(()=>{let e=()=>{let e=A.current;if(!e)return;let t=Array.from(e.querySelectorAll(`button[data-skill-id]`)),n=e.querySelector(`[data-more-wrap]`);if(!n)return;t.forEach(e=>{e.style.display=``}),n.style.display=``;let r=[],i=()=>{let e=[...new Set([...t.filter(e=>e.style.display!==`none`).map(e=>e.offsetTop),n.offsetTop])].sort((e,t)=>e-t).indexOf(n.offsetTop);return e>=0&&e<=1},a=t.length;for(;a-- >0&&!i();){let n=t.filter(e=>e.style.display!==`none`);if(n.length===0)break;let i=n[n.length-1],a=i.dataset.skillId;a&&r.push(a),i.style.display=`none`,e.offsetWidth}r.length===0&&(n.style.display=`none`);let o=new Set(r);o.size===X.size&&[...o].every(e=>X.has(e))||me(o)};e();let t=new ResizeObserver(e);return A.current&&t.observe(A.current),window.addEventListener(`resize`,e),()=>{t.disconnect(),window.removeEventListener(`resize`,e)}},[Y,X,t]);let he=e=>{if(ne){O(e),T(!1),C(null);return}n(t=>t===e?null:e),C(null),T(!1)},Z=e=>{n(t=>t===e?null:e),C(null),T(!1)},ge=()=>{E&&(n(E),O(null),T(!1))},_e=()=>n(null),be=e=>o({text:e,seq:Date.now()}),Q=t=>{e(t===`__agent__`?`agent`:`thread/${t}`)},Se=y?b.find(e=>e.id===y.id)||x.find(e=>e.id===y.id)||S.find(e=>e.id===y.id):null;return(0,D.jsxs)(c,{activePage:`new-chat`,onNavigate:e,children:[(0,D.jsx)(`style`,{children:`
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

        /* ══════ Skills library panel (bottom-up, full grid) ══════ */
        .skills-panel-backdrop{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,0.45);
          z-index:9998;
          animation:newchat-fade 200ms ease-out;
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
          border-radius:14px;
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
        /* 手动分列瀑布流：JS 把卡片 round-robin 分到 N 个独立列容器（flex column）
           每列独立堆叠 → 第一行顶部对齐；某列内 hover 撑高，只影响同列下方卡片，
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
          gap:16px;
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
            border-color:var(--line-l12);
            box-shadow:0 6px 20px rgba(0,0,0,0.04);
            /* 用户行下方边距 = 用户行到分割线的距离（16px）*/
            padding-bottom:16px;
          }
        }
        .skills-panel-card.is-selected{
          background:var(--b-r02);
          border-color:var(--main-m1);
        }
        @media (hover: hover){
          .skills-panel-card.is-selected:hover{
            background:rgba(255,255,255,0.9);
            border-color:var(--main-m1);
            box-shadow:0 6px 20px rgba(0,0,0,0.04);
          }
        }
        /* Hover 展开底部 creator + socials 行。
           所有过渡使用统一的 240ms cubic-bezier(0.4,0,0.2,1)，确保
           hover-in 和 hover-out 节奏一致。 */
        .skills-panel-card-hoverblock{
          display:grid;
          grid-template-rows:0fr;
          opacity:0;
          /* margin-top:-16 抵消 card-level gap:16，使收起态不留间距；
             展开时 grid-template-rows 撑开，gap:16 通过 row-gap 自然出现。 */
          margin-top:-16px;
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
        /* KOL 卡片（顶部用 Avatar）：hover 时头像隐藏，标题块滑到左侧。
           Alva 卡片（顶部用 icon-wrap）不参与此动画 —— 图标保留。 */
        .skills-panel-card-creator-thumb{
          flex-shrink:0;
          display:inline-flex;
          align-items:center;
        }
        .skills-panel-card-titleblock{
          transition:transform 240ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (hover: hover){
          .skills-panel-card:hover .skills-panel-card-creator-thumb{
            visibility:hidden;
          }
          .skills-panel-card:hover .skills-panel-card-creator-thumb + .skills-panel-card-titleblock{
            transform:translateX(-48px);
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
        .skills-panel-card-content{
          display:flex;
          flex-direction:column;
          gap:4px;
        }
        .skills-panel-card-header{
          display:flex;
          align-items:center;
          gap:12px;
          padding-bottom:4px;
        }
        .skills-panel-card-icon-wrap{
          width:36px;
          height:36px;
          flex-shrink:0;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          border-radius:9999px;
          background:#fff;
          border:1px solid var(--line-l05);
          transition:background 240ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (hover: hover){
          .skills-panel-card:hover .skills-panel-card-icon-wrap{
            background:var(--b-r02);
          }
        }
        .skills-panel-card-titleblock{
          flex:1;
          min-width:0;
          display:flex;
          flex-direction:column;
        }
        .skills-panel-card-name{
          font-family:'Delight',sans-serif;
          font-size:18px;
          line-height:28px;
          font-weight:500;
          color:var(--text-n9);
          letter-spacing:0.18px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .skills-panel-card-author{
          font-family:'Delight',sans-serif;
          font-size:10px;
          line-height:16px;
          color:var(--text-n5);
          letter-spacing:0.1px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .skills-panel-card-desc{
          font-family:'Delight',sans-serif;
          font-size:12px;
          line-height:20px;
          color:var(--text-n5);
          letter-spacing:0.12px;
          margin:0;
        }
        .skills-panel-card-tags{
          display:flex;
          flex-wrap:wrap;
          gap:4px;
          padding-top:4px;
        }
        .skills-panel-card-tag{
          height:22px;
          padding:0 6px;
          border-radius:4px;
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

      `}),(0,D.jsxs)(`div`,{className:`h-screen overflow-y-auto relative`,style:{backgroundColor:`var(--b0-container, #ffffff)`},children:[(0,D.jsx)(`div`,{className:`flex items-center gap-[16px] h-[56px] px-[28px] shrink-0 newchat-page-topbar`,style:{position:`sticky`,top:0,zIndex:5,background:`var(--b0-container, #ffffff)`},children:(0,D.jsx)(`div`,{className:`flex-1 min-w-0`,children:(0,D.jsx)(i,{activeId:`new`,onSelect:Q,trigger:(0,D.jsxs)(`div`,{className:`flex gap-[4px] items-center min-w-0 cursor-pointer`,children:[(0,D.jsx)(`p`,{className:`font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] truncate`,children:`New Chat`}),(0,D.jsx)(l,{name:`arrow-down-f2`,size:14,color:`var(--text-n2)`})]})})})}),(0,D.jsxs)(`section`,{className:`nc-hero-section`,style:{width:`100%`,display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`flex-start`,gap:36,padding:`24px 28px`,position:`relative`,zIndex:2},children:[(0,D.jsx)(ve,{selected:q,maxWidth:$}),(0,D.jsx)(`div`,{className:`nc-chatbox-wrap`,style:{width:`100%`,maxWidth:$,position:`relative`,zIndex:1},children:(0,D.jsx)(s,{shadow:!0,hideSkill:!0,hideInspector:!0,allowReferences:!1,bottomChip:q?{label:q.label,icon:q.kol?void 0:q.icon??re,avatar:q.kol?q.creator:void 0,creator:q.creator,onRemove:_e,onHover:e=>H(q.id,e),onLeave:B}:null,injectText:r,onInputChange:_})}),K&&(0,D.jsx)(`div`,{className:`nc-prompts-container`,style:{width:`100%`,maxWidth:$,position:`relative`,zIndex:1,marginTop:0,display:`flex`,flexDirection:`column`},children:(0,D.jsx)(`div`,{className:`nc-prompts-list`,children:G.map((e,t)=>(0,D.jsx)(se,{text:e,index:t,onClick:()=>be(e)},t))})},v),!K&&(0,D.jsxs)(`div`,{ref:A,style:{display:`flex`,flexWrap:`wrap`,gap:12,justifyContent:`center`,paddingTop:12,position:`relative`,zIndex:1,width:`100%`,maxWidth:900},children:[Y.map(e=>{let n=t===e.id;return(0,D.jsxs)(`button`,{"data-skill-id":e.id,className:`nc-pill`,onClick:()=>he(e.id),onMouseEnter:t=>{j()&&(t.currentTarget.style.boxShadow=`0 4px 12px rgba(0,0,0,0.05)`,t.currentTarget.style.transform=`translateY(-2px)`,ae(e.id,t.currentTarget,t.clientX,t.clientY))},onMouseLeave:e=>{j()&&(e.currentTarget.style.boxShadow=`none`,e.currentTarget.style.transform=`translateY(0)`,R(),B())},style:{...M,background:n?`rgba(0,0,0,0.7)`:`white`,color:n?`rgba(255,255,255,0.9)`:M.color,borderColor:n?`rgba(0,0,0,0.7)`:M.border?.replace(`0.5px solid `,``)??void 0},children:[e.kol?(0,D.jsx)(a,{name:e.creator,size:22}):e.icon&&(0,D.jsx)(l,{name:e.icon,size:18,color:n?`#fff`:`var(--text-n9)`}),e.label]},e.id)}),(0,D.jsx)(`div`,{ref:ie,"data-more-wrap":!0,style:{position:`relative`},children:(0,D.jsxs)(`button`,{ref:ue,type:`button`,className:`nc-pill`,"aria-expanded":w,"aria-label":`More skills`,style:{...M,cursor:`pointer`,background:w?`#f3f8f8`:`white`,border:w?`0.5px solid rgba(73,163,166,0.45)`:M.border},onMouseEnter:e=>{j()&&(e.currentTarget.style.boxShadow=`0 4px 12px rgba(0,0,0,0.05)`,e.currentTarget.style.transform=`translateY(-2px)`)},onMouseLeave:e=>{j()&&(e.currentTarget.style.boxShadow=`none`,e.currentTarget.style.transform=`translateY(0)`)},onClick:()=>{T(e=>!e),C(null)},children:[`More`,(0,D.jsx)(l,{name:`arrow-right-l2`,size:14,color:`var(--text-n5)`})]})})]}),q&&(0,D.jsx)(`div`,{className:`nc-prompts-container`,style:{width:`100%`,maxWidth:$,position:`relative`,zIndex:1,marginTop:0,display:`flex`,flexDirection:`column`},children:ce?(0,D.jsx)(`div`,{className:`nc-prompts-list`,style:{animation:`newchat-fade 280ms ease-out`},children:q.prompts.slice(0,3).map((e,t)=>(0,D.jsx)(se,{text:e,index:t,onClick:()=>be(e)},t))}):(0,D.jsxs)(`div`,{className:`nc-prompts-list nc-skeleton-anim`,style:{animation:`newchat-fade 200ms ease-out`},children:[(0,D.jsx)(V,{widthPct:92}),(0,D.jsx)(V,{widthPct:70}),(0,D.jsx)(V,{widthPct:82})]})}),q&&(0,D.jsx)(`div`,{style:{width:`100%`,maxWidth:$,position:`relative`,zIndex:2,display:`flex`,flexDirection:`column`,gap:16},children:le?(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(3, minmax(0, 1fr))`,gap:16},children:J.flatMap(e=>e.type===`playbook`?[e.playbook]:[]).slice(0,3).map((t,n)=>(0,D.jsx)(`div`,{onClick:()=>{sessionStorage.setItem(`autoOpenChatPanel`,`1`),e(`new-chat`)},style:{animation:`newchat-fadeup 360ms ease-out both`,animationDelay:`${n*50}ms`},children:(0,D.jsx)(f,{p:de(t,q.id),staggerMs:n*1e3})},t.id))}),(()=>{let e=J.flatMap(e=>e.type===`push`?[e.push]:[]).slice(0,2);return e.length===0?null:(0,D.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(${e.length}, minmax(0, 1fr))`,gap:16,gridAutoRows:281.5},children:e.map((e,t)=>(0,D.jsx)(`div`,{onClick:()=>m(e),style:{height:`100%`,cursor:`pointer`,animation:`newchat-fadeup 360ms ease-out both`,animationDelay:`${(t+3)*50}ms`},children:(0,D.jsx)(u,{a:e})},e.id))})})()]}):(0,D.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(3, minmax(0, 1fr))`,gap:16},children:Array.from({length:3}).map((e,t)=>(0,D.jsx)(`div`,{className:`nc-skeleton-anim`,style:{animation:`newchat-fade 200ms ease-out`},children:(0,D.jsx)(fe,{})},t))})},q.id)]}),!K&&(0,D.jsx)(xe,{onNavigate:e})]}),y&&Se&&(0,D.jsx)(oe,{template:Se,anchor:y.rect,placeAbove:y.placeAbove,side:y.side,onMouseEnter:z,onMouseLeave:B}),I&&(0,D.jsxs)(`div`,{"aria-hidden":!0,style:{position:`fixed`,left:I.x+14,top:I.y+14,width:16,height:16,pointerEvents:`none`,zIndex:9999},children:[(0,D.jsxs)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 16 16`,style:{display:`block`},children:[(0,D.jsx)(`circle`,{cx:`8`,cy:`8`,r:`6`,fill:`none`,stroke:`rgba(0,0,0,0.12)`,strokeWidth:`1.6`}),(0,D.jsx)(`circle`,{cx:`8`,cy:`8`,r:`6`,fill:`none`,stroke:`var(--main-m1)`,strokeWidth:`1.6`,strokeLinecap:`round`,strokeDasharray:2*Math.PI*6,strokeDashoffset:2*Math.PI*6,transform:`rotate(-90 8 8)`,style:{animation:`nc-pill-ring-fill 600ms linear forwards`}})]}),(0,D.jsx)(`style`,{children:`
            @keyframes nc-pill-ring-fill {
              from { stroke-dashoffset: ${2*Math.PI*6}; }
              to   { stroke-dashoffset: 0; }
            }
          `})]}),w&&(0,D.jsx)(pe,{skills:Y,selectedId:t,onSelect:Z,onClose:()=>T(!1)}),E&&(()=>{let e=Y.find(e=>e.id===E);return e?(0,D.jsx)(ye,{template:e,onClose:()=>O(null),onSelect:ge}):null})(),(0,D.jsx)(d,{open:!!p,onClose:()=>m(null),feedName:p?.feedName??``,alerts:p?[p]:void 0,description:`This automation runs on a fixed schedule and publishes new results to its subscribers. Each run pulls the latest data, applies the feed's logic, and writes a signal that powers the cards and alerts above. Open Settings → Automations to view full run logs and manage it.`})]})}export{ie as SkillPill,Se as default};