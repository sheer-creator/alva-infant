import{t as e}from"./jsx-runtime-Bg_NI1en.js";import{t}from"./AppShell-CwV_FEhg.js";var n=`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Defense Thesis Tracker · Playbook Info Remix</title>
<link rel="stylesheet" href="https://alva-ai-static.b-cdn.net/design-system/design-tokens.css" />
<style>
    /* ── Local vars on top of design-tokens.css ── */
    :root {
        --theme-color: #4A6B5A;
        --theme-color-soft: rgba(74,107,90,0.10);
        --theme-grad:  linear-gradient(135deg, #4A6B5A 0%, #2C3E33 100%);

        /* Fallbacks if token file is missing */
        --sp-xxs: 4px; --sp-xs: 8px; --sp-s: 12px; --sp-m: 16px;
        --sp-l: 20px;  --sp-xl: 24px; --sp-xxl: 28px; --sp-xxxl: 32px;
        --r-xs: 2px; --r-s: 4px; --r-m: 6px; --r-l: 8px;

        --text-n9:  rgba(0,0,0,0.9);
        --text-n7:  rgba(0,0,0,0.7);
        --text-n5:  rgba(0,0,0,0.5);
        --text-n3:  rgba(0,0,0,0.3);

        --main-m1:  #49A3A6;
        --main-m3:  #2a9b7d;
        --main-m4:  #e05357;

        --white:     #ffffff;
        --grey-g01:  #fafafa;
        --line-l05:  rgba(0,0,0,0.05);
        --line-l07:  rgba(0,0,0,0.07);
        --line-l12:  rgba(0,0,0,0.12);
    }

    html { height: 100%; overflow: hidden; }
    body {
        height: 100%; overflow-y: auto; overflow-x: hidden;
        margin: 0; padding: 0;
        background: var(--b0-page, #ffffff);
        color: var(--text-n9);
        font-family: Delight, -apple-system, BlinkMacSystemFont, sans-serif;
        font-weight: 400;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
    }
    * { -ms-overflow-style: none; scrollbar-width: none; box-sizing: border-box; }
    *::-webkit-scrollbar { display: none; }

    .playbook-container {
        width: 100%; max-width: 2048px; margin: 0 auto;
        padding: var(--sp-l) var(--sp-xxl) var(--sp-xxxl);
    }
    @media (max-width: 768px) { .playbook-container { padding: var(--sp-m); } }

    /* ══════════════════════════════════════════
       HERO — consolidated playbook header
       Replaces:  topbar title + PlaybookInfoPopup + first overview widget
       ══════════════════════════════════════════ */
    .hero {
        border-radius: var(--r-l);
        background: var(--grey-g01);
        padding: var(--sp-xl);
        display: grid;
        grid-template-columns: 52px 1fr auto;
        column-gap: var(--sp-l);
        row-gap: var(--sp-m);
        align-items: start;
        position: relative;
        overflow: hidden;
    }
    .hero::before {
        content: '';
        position: absolute;
        left: 0; top: 0; bottom: 0;
        width: 3px;
        background: var(--theme-grad);
    }

    .hero-icon {
        grid-column: 1; grid-row: 1 / 3;
        width: 52px; height: 52px;
        border-radius: var(--r-m);
        background: var(--theme-grad);
        display: flex; align-items: center; justify-content: center;
        color: white; flex-shrink: 0;
    }
    .hero-icon svg { width: 26px; height: 26px; }

    .hero-titlewrap { grid-column: 2; grid-row: 1; min-width: 0; }
    .hero-titlerow {
        display: flex; align-items: center; gap: var(--sp-s);
        flex-wrap: wrap;
    }
    .hero-title {
        font-size: 22px; font-weight: 400;
        color: var(--text-n9);
        letter-spacing: 0.22px;
        line-height: 30px;
        margin: 0;
    }
    .hero-pill {
        display: inline-flex; align-items: center; gap: 6px;
        height: 22px; padding: 0 10px;
        border-radius: 11px;
        font-size: 11px; letter-spacing: 0.22px;
        text-transform: uppercase;
    }
    .hero-pill.live {
        background: rgba(42,155,125,0.1);
        color: var(--main-m3);
    }
    .hero-pill.live::before {
        content: ''; width: 6px; height: 6px; border-radius: 50%;
        background: var(--main-m3);
        box-shadow: 0 0 0 3px rgba(42,155,125,0.15);
        animation: live-pulse 2s ease-in-out infinite;
    }
    @keyframes live-pulse {
        0%, 100% { box-shadow: 0 0 0 3px rgba(42,155,125,0.15); }
        50%      { box-shadow: 0 0 0 5px rgba(42,155,125,0.0); }
    }
    .hero-version {
        font-size: 11px; font-weight: 500;
        color: var(--text-n7);
        background: var(--white);
        border: 1px solid var(--line-l07);
        padding: 2px 8px;
        border-radius: 10px;
        letter-spacing: 0.22px;
    }

    .hero-meta {
        margin-top: var(--sp-xs);
        display: flex; align-items: center;
        gap: var(--sp-s);
        flex-wrap: wrap;
        font-size: 12px; color: var(--text-n5);
        letter-spacing: 0.12px;
    }
    .hero-meta-item { display: flex; align-items: center; gap: 6px; }
    .hero-meta-item svg { width: 12px; height: 12px; }
    .hero-meta-avatar {
        width: 16px; height: 16px; border-radius: 50%;
        background: var(--main-m1);
        display: flex; align-items: center; justify-content: center;
        font-size: 8px; font-weight: 500; color: white;
    }
    .hero-meta-author { color: var(--text-n7); font-weight: 500; }
    .hero-meta-sep {
        width: 3px; height: 3px; border-radius: 50%;
        background: var(--text-n3);
    }

    .hero-desc {
        grid-column: 2 / 4; grid-row: 2;
        font-size: 14px; line-height: 22px;
        color: var(--text-n7);
        letter-spacing: 0.14px;
        max-width: 760px;
        margin: 0;
    }

    .hero-sources {
        grid-column: 2 / 4; grid-row: 3;
        display: flex; align-items: center;
        gap: var(--sp-xs); flex-wrap: wrap;
        padding-top: var(--sp-s);
        border-top: 1px solid var(--line-l05);
    }
    .hero-sources-label {
        font-size: 11px; color: var(--text-n5);
        letter-spacing: 0.22px; text-transform: uppercase;
        margin-right: var(--sp-xxs);
    }
    .source-chip {
        display: inline-flex; align-items: center; gap: 6px;
        height: 22px; padding: 0 10px;
        background: var(--white); border: 1px solid var(--line-l07);
        border-radius: 11px;
        font-size: 11px; color: var(--text-n7);
        letter-spacing: 0.11px;
        transition: border-color .15s, color .15s;
        cursor: default;
    }
    .source-chip:hover { border-color: var(--line-l12); color: var(--text-n9); }
    .source-chip-dot { width: 6px; height: 6px; border-radius: 50%; }

    .hero-actions {
        grid-column: 3; grid-row: 1;
        display: flex; align-items: center; gap: var(--sp-xs);
        justify-self: end;
    }
    .hero-btn {
        height: 32px; padding: 0 12px;
        display: inline-flex; align-items: center; gap: 6px;
        border-radius: var(--r-m);
        font-size: 12px; font-weight: 500; letter-spacing: 0.12px;
        cursor: pointer; transition: background .15s, border-color .15s;
        background: var(--white); color: var(--text-n9);
        border: 1px solid var(--line-l07);
        font-family: inherit;
    }
    .hero-btn:hover { border-color: var(--line-l12); }
    .hero-btn svg { width: 12px; height: 12px; }
    .hero-btn-primary {
        background: var(--text-n9); color: white; border-color: var(--text-n9);
    }
    .hero-btn-primary:hover { background: #000; border-color: #000; }

    .hero-stats {
        grid-column: 1 / 4; grid-row: 4;
        margin-top: var(--sp-s);
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1px;
        background: var(--line-l05);
        border-radius: var(--r-m);
        overflow: hidden;
        border: 1px solid var(--line-l05);
    }
    .hero-stat {
        background: var(--white);
        padding: var(--sp-s) var(--sp-m);
        display: flex; flex-direction: column; gap: 2px;
    }
    .hero-stat-label {
        font-size: 10px; color: var(--text-n5);
        letter-spacing: 0.2px; text-transform: uppercase;
    }
    .hero-stat-val {
        font-size: 15px; color: var(--text-n9); font-weight: 500;
        letter-spacing: 0.15px;
    }
    .hero-stat-val.sub { font-size: 12px; color: var(--text-n7); font-weight: 400; }
    .hero-stat-val.pos { color: var(--main-m3); }

    /* ══════════════════════════════════════════
       REMIX NOTE (designer-only)
       ══════════════════════════════════════════ */
    .remix-note {
        margin-top: var(--sp-m);
        padding: var(--sp-s) var(--sp-m);
        background: rgba(73,163,166,0.06);
        border-left: 2px solid var(--main-m1);
        border-radius: 0 var(--r-s) var(--r-s) 0;
        font-size: 11px; color: var(--text-n7);
        line-height: 18px; letter-spacing: 0.11px;
    }
    .remix-note strong { color: var(--main-m1); font-weight: 500; }

    /* ══════════════════════════════════════════
       CONTENT
       ══════════════════════════════════════════ */
    .content {
        margin-top: var(--sp-xl);
        display: flex; flex-direction: column;
        gap: var(--sp-xl);
    }

    .section-title {
        display: flex; align-items: baseline;
        gap: var(--sp-s);
        margin-top: var(--sp-xs);
    }
    .section-title-text {
        font-size: 18px; font-weight: 400;
        color: var(--text-n9); letter-spacing: 0.18px;
        line-height: 26px;
    }
    .section-title-sub {
        font-size: 11px; color: var(--text-n5);
        padding-left: var(--sp-xs);
        border-left: 1px solid var(--line-l07);
    }

    .widget-card { background: transparent; display: flex; flex-direction: column; }
    .widget-title {
        display: flex; align-items: center; justify-content: space-between;
        height: 22px; margin-bottom: var(--sp-m);
    }
    .widget-title-text {
        font-size: 14px; color: var(--text-n9);
        letter-spacing: 0.14px; line-height: 22px;
    }
    .widget-timestamp {
        display: flex; align-items: center; gap: var(--sp-xxs);
        font-size: 12px; color: var(--text-n5); line-height: 20px;
    }
    .clock-icon {
        width: 12px; height: 12px;
        border: 1px solid currentColor;
        border-radius: 50%; position: relative; flex-shrink: 0;
    }
    .clock-icon::before {
        content:''; position:absolute; width:3px; height:1px;
        background:currentColor; top:4px; left:3.5px;
    }
    .clock-icon::after {
        content:''; position:absolute; width:1px; height:3px;
        background:currentColor; top:2px; left:5px;
    }
    .card-body {
        background: var(--grey-g01);
        border-radius: var(--r-m);
        padding: var(--sp-l); position: relative;
    }

    .row { display: grid; gap: var(--sp-xl); }
    .row-3col { grid-template-columns: 1fr 1fr 1fr; }

    .ptable { width: 100%; border-collapse: collapse; }
    .ptable th {
        text-align: left; padding: 10px 12px;
        font-size: 11px; color: var(--text-n5);
        font-weight: 400; letter-spacing: 0.22px;
        text-transform: uppercase;
        border-bottom: 1px solid var(--line-l07);
    }
    .ptable td {
        padding: 12px; font-size: 13px;
        color: var(--text-n9); letter-spacing: 0.13px;
        border-bottom: 1px solid var(--line-l05);
        vertical-align: middle;
    }
    .ptable tr:last-child td { border-bottom: none; }
    .ticker { display: inline-flex; align-items: center; gap: 8px; }
    .ticker-logo {
        width: 24px; height: 24px; border-radius: 4px;
        display: flex; align-items: center; justify-content: center;
        font-size: 10px; font-weight: 500; color: white;
    }
    .pos { color: var(--main-m3); }
    .neg { color: var(--main-m4); }

    .kpi-tile {
        background: var(--grey-g01);
        border-radius: var(--r-m);
        padding: var(--sp-l);
        display: flex; flex-direction: column; gap: 6px;
    }
    .kpi-label {
        font-size: 12px; color: var(--text-n5);
        letter-spacing: 0.12px;
    }
    .kpi-val {
        font-size: 28px; color: var(--text-n9);
        letter-spacing: -0.3px; font-weight: 400;
    }
    .kpi-delta {
        font-size: 12px; letter-spacing: 0.12px;
    }

    .feed-list {
        display: flex; flex-direction: column;
        background: var(--grey-g01);
        border-radius: var(--r-m);
        overflow: hidden;
    }
    .feed-item {
        padding: var(--sp-s) var(--sp-m);
        display: flex; align-items: flex-start; gap: var(--sp-s);
        border-bottom: 1px solid var(--line-l05);
    }
    .feed-item:last-child { border-bottom: none; }
    .feed-date {
        font-size: 11px; color: var(--text-n5);
        letter-spacing: 0.22px; text-transform: uppercase;
        white-space: nowrap; padding-top: 2px; flex-shrink: 0;
        min-width: 54px;
    }
    .feed-body { flex: 1; min-width: 0; }
    .feed-title {
        font-size: 13px; color: var(--text-n9);
        letter-spacing: 0.13px; margin-bottom: 2px;
    }
    .feed-meta {
        font-size: 11px; color: var(--text-n5);
        letter-spacing: 0.11px;
    }
    .feed-tag {
        display: inline-block;
        font-size: 10px;
        background: var(--theme-color-soft);
        color: var(--theme-color);
        padding: 1px 6px; border-radius: 3px;
        letter-spacing: 0.2px; text-transform: uppercase;
        margin-right: 6px;
    }
</style>
</head>
<body>

<div class="playbook-container">

    <!-- ═══════════════ HERO ═══════════════ -->
    <section class="hero">
        <div class="hero-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
                <path d="M9 12l2 2 4-4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>

        <div class="hero-titlewrap">
            <div class="hero-titlerow">
                <h1 class="hero-title">Defense Thesis Tracker</h1>
                <span class="hero-pill live">Live</span>
                <span class="hero-version">V1</span>
            </div>

            <div class="hero-meta">
                <div class="hero-meta-item">
                    <div class="hero-meta-avatar">H</div>
                    <span class="hero-meta-author">@harryzz</span>
                </div>
                <div class="hero-meta-sep"></div>
                <div class="hero-meta-item">
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1"><circle cx="6" cy="6" r="4.5"/><path d="M6 3.5V6l1.8 1.2" stroke-linecap="round"/></svg>
                    <span>Updated 3 hours ago</span>
                </div>
                <div class="hero-meta-sep"></div>
                <div class="hero-meta-item">
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1"><path d="M2 6a4 4 0 017-2.6M10 6a4 4 0 01-7 2.6M10 2v2H8M2 10V8h2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <span>Runs every 15m</span>
                </div>
                <div class="hero-meta-sep"></div>
                <div class="hero-meta-item">
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1"><rect x="1.5" y="2.5" width="9" height="8" rx="1"/><path d="M1.5 5h9M4 2v2M8 2v2" stroke-linecap="round"/></svg>
                    <span>Created Feb 14, 2026</span>
                </div>
            </div>
        </div>

        <div class="hero-actions">
            <button class="hero-btn" title="Settings">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="6" cy="6" r="1.8"/><path d="M6 .5v2M6 9.5v2M1.5 6h2M8.5 6h2M2.5 2.5l1.4 1.4M8.1 8.1l1.4 1.4M2.5 9.5l1.4-1.4M8.1 3.9l1.4-1.4" stroke-linecap="round"/></svg>
                Settings
            </button>
            <button class="hero-btn" title="Share">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="9" cy="3" r="1.5"/><circle cx="3" cy="6" r="1.5"/><circle cx="9" cy="9" r="1.5"/><path d="M4.3 5.3l3.4-1.7M4.3 6.7l3.4 1.7"/></svg>
                Share
            </button>
            <button class="hero-btn hero-btn-primary" title="Remix">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M2 3.5a1 1 0 011-1h6a1 1 0 011 1v4a1 1 0 01-1 1H5l-2.5 2V3.5z" stroke-linejoin="round"/></svg>
                Remix
            </button>
        </div>

        <p class="hero-desc">
            Tracks a long-bias thesis across US defense primes by folding DoD
            budget flows, contract-award momentum, and geopolitical catalysts
            into a single view. Designed to surface regime changes early — before
            they show up in consensus estimates — and to keep conviction honest
            when the tape disagrees with the thesis.
        </p>

        <div class="hero-sources">
            <span class="hero-sources-label">Sources · 5 feeds</span>
            <span class="source-chip"><span class="source-chip-dot" style="background:#3D8BD1"></span>DoD Budget</span>
            <span class="source-chip"><span class="source-chip-dot" style="background:#49A3A6"></span>USASpending</span>
            <span class="source-chip"><span class="source-chip-dot" style="background:#e05357"></span>GDELT · Conflicts</span>
            <span class="source-chip"><span class="source-chip-dot" style="background:#5F75C9"></span>SIPRI Arms Trade</span>
            <span class="source-chip"><span class="source-chip-dot" style="background:#ff9800"></span>FactSet · Estimates</span>
        </div>

        <div class="hero-stats">
            <div class="hero-stat">
                <span class="hero-stat-label">Thesis Strength</span>
                <span class="hero-stat-val pos">7.2 / 10</span>
                <span class="hero-stat-val sub">+0.4 WoW</span>
            </div>
            <div class="hero-stat">
                <span class="hero-stat-label">Tracked Tickers</span>
                <span class="hero-stat-val">6</span>
                <span class="hero-stat-val sub">LMT · RTX · NOC · GD · HII · BA</span>
            </div>
            <div class="hero-stat">
                <span class="hero-stat-label">Active Catalysts</span>
                <span class="hero-stat-val">4</span>
                <span class="hero-stat-val sub">2 within 14 days</span>
            </div>
            <div class="hero-stat">
                <span class="hero-stat-label">Last Feed Run</span>
                <span class="hero-stat-val">12:47 PM</span>
                <span class="hero-stat-val sub">All 5 sources green</span>
            </div>
        </div>
    </section>

    <!-- Designer note — remove when shipping -->
    <div class="remix-note">
        <strong>Remix note</strong> &nbsp;·&nbsp;
        Topbar now carries only the breadcrumb — no name, no author, no status.
        The old hover <em>PlaybookInfoPopup</em> is retired: its description,
        author, frequency, and feed list are all surfaced inline in the Hero.
        Content below starts directly with thesis-level widgets (no redundant
        "Overview" module).
    </div>

    <!-- ═══════════════ CONTENT ═══════════════ -->
    <div class="content">

        <div>
            <div class="section-title">
                <span class="section-title-text">Portfolio snapshot</span>
                <span class="section-title-sub">6 primes · equal-weight</span>
            </div>
        </div>

        <div class="widget-card">
            <div class="widget-title">
                <span class="widget-title-text">Defense primes — live quotes</span>
                <div class="widget-timestamp"><div class="clock-icon"></div><span>Real-time · Apr 21, 2026</span></div>
            </div>
            <div class="card-body" style="padding: 4px 12px;">
                <table class="ptable">
                    <thead>
                        <tr>
                            <th style="width: 26%;">Ticker</th>
                            <th style="width: 14%; text-align:right;">Price</th>
                            <th style="width: 14%; text-align:right;">1D</th>
                            <th style="width: 14%; text-align:right;">YTD</th>
                            <th style="width: 16%; text-align:right;">Market Cap</th>
                            <th style="width: 16%; text-align:right;">Fwd P/E</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span class="ticker"><span class="ticker-logo" style="background:#0033A0">L</span>Lockheed Martin <span style="color:var(--text-n5);margin-left:4px;">LMT</span></span></td>
                            <td style="text-align:right;">$528.90</td>
                            <td class="pos" style="text-align:right;">+1.2%</td>
                            <td class="pos" style="text-align:right;">+14.7%</td>
                            <td style="text-align:right;">$126B</td>
                            <td style="text-align:right;">17.8x</td>
                        </tr>
                        <tr>
                            <td><span class="ticker"><span class="ticker-logo" style="background:#D22630">R</span>RTX Corporation <span style="color:var(--text-n5);margin-left:4px;">RTX</span></span></td>
                            <td style="text-align:right;">$121.45</td>
                            <td class="pos" style="text-align:right;">+0.6%</td>
                            <td class="pos" style="text-align:right;">+9.3%</td>
                            <td style="text-align:right;">$162B</td>
                            <td style="text-align:right;">19.2x</td>
                        </tr>
                        <tr>
                            <td><span class="ticker"><span class="ticker-logo" style="background:#041E42">N</span>Northrop Grumman <span style="color:var(--text-n5);margin-left:4px;">NOC</span></span></td>
                            <td style="text-align:right;">$482.10</td>
                            <td class="neg" style="text-align:right;">−0.4%</td>
                            <td class="pos" style="text-align:right;">+6.5%</td>
                            <td style="text-align:right;">$72B</td>
                            <td style="text-align:right;">18.4x</td>
                        </tr>
                        <tr>
                            <td><span class="ticker"><span class="ticker-logo" style="background:#002F6C">G</span>General Dynamics <span style="color:var(--text-n5);margin-left:4px;">GD</span></span></td>
                            <td style="text-align:right;">$278.60</td>
                            <td class="pos" style="text-align:right;">+0.9%</td>
                            <td class="pos" style="text-align:right;">+8.1%</td>
                            <td style="text-align:right;">$76B</td>
                            <td style="text-align:right;">20.1x</td>
                        </tr>
                        <tr>
                            <td><span class="ticker"><span class="ticker-logo" style="background:#003F7F">H</span>Huntington Ingalls <span style="color:var(--text-n5);margin-left:4px;">HII</span></span></td>
                            <td style="text-align:right;">$265.30</td>
                            <td class="pos" style="text-align:right;">+2.1%</td>
                            <td class="pos" style="text-align:right;">+11.6%</td>
                            <td style="text-align:right;">$10B</td>
                            <td style="text-align:right;">16.2x</td>
                        </tr>
                        <tr>
                            <td><span class="ticker"><span class="ticker-logo" style="background:#1B365D">B</span>Boeing · Defense <span style="color:var(--text-n5);margin-left:4px;">BA</span></span></td>
                            <td style="text-align:right;">$186.70</td>
                            <td class="neg" style="text-align:right;">−1.4%</td>
                            <td class="neg" style="text-align:right;">−3.2%</td>
                            <td style="text-align:right;">$114B</td>
                            <td style="text-align:right;">22.0x</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div>
            <div class="section-title">
                <span class="section-title-text">Budget &amp; contract flow</span>
                <span class="section-title-sub">rolling 90-day view</span>
            </div>
        </div>

        <div class="row row-3col">
            <div class="widget-card">
                <div class="widget-title">
                    <span class="widget-title-text">DoD FY26 budget request</span>
                    <div class="widget-timestamp"><div class="clock-icon"></div><span>Daily</span></div>
                </div>
                <div class="kpi-tile">
                    <div class="kpi-label">Total · FY26 requested</div>
                    <div class="kpi-val">$895B</div>
                    <div class="kpi-delta pos">▲ +4.1% vs FY25 enacted</div>
                </div>
            </div>
            <div class="widget-card">
                <div class="widget-title">
                    <span class="widget-title-text">Contract awards · L90D</span>
                    <div class="widget-timestamp"><div class="clock-icon"></div><span>USASpending</span></div>
                </div>
                <div class="kpi-tile">
                    <div class="kpi-label">Awarded · primes tracked</div>
                    <div class="kpi-val">$42.1B</div>
                    <div class="kpi-delta pos">▲ +8.7% YoY</div>
                </div>
            </div>
            <div class="widget-card">
                <div class="widget-title">
                    <span class="widget-title-text">Global conflict index</span>
                    <div class="widget-timestamp"><div class="clock-icon"></div><span>GDELT</span></div>
                </div>
                <div class="kpi-tile">
                    <div class="kpi-label">7-day event intensity</div>
                    <div class="kpi-val">3.84</div>
                    <div class="kpi-delta neg">▲ +0.22 WoW</div>
                </div>
            </div>
        </div>

        <div>
            <div class="section-title">
                <span class="section-title-text">Upcoming catalysts</span>
                <span class="section-title-sub">next 30 days</span>
            </div>
        </div>

        <div class="widget-card">
            <div class="widget-title">
                <span class="widget-title-text">Calendar &amp; events</span>
                <div class="widget-timestamp"><div class="clock-icon"></div><span>Updated 3h ago</span></div>
            </div>
            <div class="feed-list">
                <div class="feed-item">
                    <div class="feed-date">Apr 24</div>
                    <div class="feed-body">
                        <div class="feed-title"><span class="feed-tag">Earnings</span>RTX Q1 results &amp; full-year outlook</div>
                        <div class="feed-meta">Consensus EPS $1.32 · Guide likely raised on Pratt &amp; Whitney aftermarket</div>
                    </div>
                </div>
                <div class="feed-item">
                    <div class="feed-date">Apr 29</div>
                    <div class="feed-body">
                        <div class="feed-title"><span class="feed-tag">Contract</span>DoD F-35 Lot 20 option decision window closes</div>
                        <div class="feed-meta">LMT · Est. $14–16B · Margin-accretive vs Lot 19 baseline</div>
                    </div>
                </div>
                <div class="feed-item">
                    <div class="feed-date">May 02</div>
                    <div class="feed-body">
                        <div class="feed-title"><span class="feed-tag">Macro</span>Senate Armed Services FY26 markup begins</div>
                        <div class="feed-meta">Watch shipbuilding line-items (HII exposure) and Sentinel ICBM funding (NOC)</div>
                    </div>
                </div>
                <div class="feed-item">
                    <div class="feed-date">May 14</div>
                    <div class="feed-body">
                        <div class="feed-title"><span class="feed-tag">Geopol.</span>NATO defense ministerial · Brussels</div>
                        <div class="feed-meta">European spending commitments — tailwind for RTX international mix</div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</div>

</body>
</html>
`,r=e();function i({onNavigate:e}){return(0,r.jsxs)(`div`,{className:`flex h-[48px] shrink-0 items-center justify-between`,style:{borderBottom:`1px solid rgba(0,0,0,0.05)`},children:[(0,r.jsxs)(`nav`,{className:`flex items-center gap-[6px] font-['Delight',sans-serif] text-[12px] tracking-[0.12px]`,style:{color:`var(--text-n5, rgba(0,0,0,0.5))`},children:[(0,r.jsx)(`button`,{type:`button`,className:`cursor-pointer bg-transparent border-0 p-0 transition-colors hover:text-[var(--text-n9)]`,style:{color:`inherit`,fontFamily:`inherit`,fontSize:`inherit`},onClick:()=>e(`home`),children:`Playbooks`}),(0,r.jsx)(`span`,{style:{color:`var(--text-n3, rgba(0,0,0,0.3))`,fontSize:10},children:`›`}),(0,r.jsx)(`span`,{style:{color:`var(--text-n5, rgba(0,0,0,0.5))`},children:`Thesis`}),(0,r.jsx)(`span`,{style:{color:`var(--text-n3, rgba(0,0,0,0.3))`,fontSize:10},children:`›`}),(0,r.jsx)(`span`,{style:{color:`var(--text-n9, rgba(0,0,0,0.9))`},children:`Defense Thesis Tracker`})]}),(0,r.jsx)(`div`,{className:`flex items-center gap-[12px]`,children:(0,r.jsx)(`div`,{className:`flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full text-[11px] font-medium text-white`,style:{background:`#49A3A6`},children:`A`})})]})}function a({onNavigate:e}){return(0,r.jsxs)(`div`,{className:`h-screen flex flex-col`,style:{background:`var(--b0-page)`},children:[(0,r.jsx)(`div`,{className:`sticky top-0 z-10 bg-white px-[24px] shrink-0`,children:(0,r.jsx)(i,{onNavigate:e})}),(0,r.jsx)(`div`,{className:`flex-1 overflow-hidden`,children:(0,r.jsx)(`iframe`,{srcDoc:n,title:`Playbook Info Remix — Defense Thesis Tracker`,className:`block h-full w-full border-0`})})]})}function o({onNavigate:e}){return(0,r.jsx)(t,{activePage:`thesis-remix`,onNavigate:e,children:(0,r.jsx)(a,{onNavigate:e})})}export{o as default};