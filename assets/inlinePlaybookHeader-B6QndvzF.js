var e=`/* ══════════════════════════════════════════════════════════════
   Playbook Header Component
   Shared styles for <playbook-header> custom element.
   Depends on design-tokens.css for --sp-*, --r-*, --text-*, --main-*, --line-*.
   ══════════════════════════════════════════════════════════════ */

playbook-header { display: block; }

.playbook-info {
    width: 100%; max-width: 2048px; margin: 0 auto;
    padding: var(--sp-xl) var(--sp-xxl);
    display: flex; flex-direction: column; gap: var(--sp-xs);
}

/* title row */
.pb-top { display: flex; align-items: center; gap: var(--sp-xs); width: 100%; }
.pb-top-left {
    display: flex; flex: 1 1 0; min-width: 0;
    align-items: center; gap: var(--sp-xs);
}
.pb-title {
    font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 20px; font-weight: 400;
    line-height: 30px; letter-spacing: 0.2px;
    color: var(--text-n9);
    margin: 0; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis;
}
.pb-freq-chip {
    display: inline-flex; align-items: center; gap: 2px;
    padding: 1px 8px 1px 6px;
    border: 1px solid var(--line-l07);
    border-radius: 999px;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n5);
    white-space: nowrap; flex-shrink: 0;
}
.pb-freq-dot {
    width: 12px; height: 12px; position: relative;
    display: inline-flex; align-items: center; justify-content: center;
    flex-shrink: 0;
}
.pb-freq-dot::before {
    content: ''; position: absolute; inset: 0;
    background: #DBEDED; border-radius: 50%;
}
.pb-freq-dot::after {
    content: ''; position: absolute; inset: 28.6%;
    background: var(--main-m1); border-radius: 50%;
}

/* actions */
.pb-actions { display: flex; align-items: center; flex-shrink: 0; gap: 0; }
.pb-action {
    display: inline-flex; align-items: center; gap: 4px;
    height: 32px; padding: 6px 8px;
    border: none; background: transparent; border-radius: var(--r-m);
    cursor: pointer; font-family: inherit;
    color: var(--text-n9);
    transition: background .15s;
}
.pb-action:hover { background: rgba(0,0,0,0.04); }
.pb-action-icon {
    width: 16px; height: 16px; display: inline-block;
    background-color: var(--text-n9);
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
    flex-shrink: 0;
}
.pb-action-icon.ic-share { -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/share-l.svg');  mask-image: url('https://alva-ai-static.b-cdn.net/icons/share-l.svg'); }
.pb-action-icon.ic-star  { -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/star-l.svg');   mask-image: url('https://alva-ai-static.b-cdn.net/icons/star-l.svg'); }
.pb-action-icon.ic-remix { -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/remix-l.svg');  mask-image: url('https://alva-ai-static.b-cdn.net/icons/remix-l.svg'); }
.pb-action-icon.ic-chat  { -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/chat-l1.svg');  mask-image: url('https://alva-ai-static.b-cdn.net/icons/chat-l1.svg'); }
.pb-action-count {
    font-family: inherit;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n9);
    white-space: nowrap;
}
.pb-trade-btn {
    display: inline-flex; align-items: center; justify-content: center;
    height: 32px; padding: 6px 10px;
    background: var(--main-m1);
    color: #fff; border: none; border-radius: var(--r-m);
    font-family: inherit;
    font-size: 12px; font-weight: 500;
    line-height: 20px; letter-spacing: 0.12px;
    cursor: pointer; white-space: nowrap;
    margin-left: var(--sp-xxs);
    transition: opacity .15s;
}
.pb-trade-btn:hover { opacity: 0.9; }

/* meta row */
.pb-meta {
    display: flex; align-items: center; gap: var(--sp-xs);
    flex-wrap: wrap;
    font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n5);
}
.pb-meta-author {
    display: flex; align-items: center; gap: 4px;
    color: var(--text-n9);
}
.pb-meta-avatar {
    width: 20px; height: 20px; border-radius: 50%;
    flex-shrink: 0;
    object-fit: cover;
    background: #f0f0f0;
}
.pb-meta-sep {
    color: rgba(0,0,0,0.2);
    user-select: none;
    font-size: 12px; line-height: 20px;
}
.pb-meta-item { display: flex; align-items: center; gap: 4px; }
.pb-meta-icon {
    width: 14px; height: 14px; display: inline-block;
    background-color: var(--text-n5);
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
    flex-shrink: 0;
}
.pb-meta-icon.ic-update {
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/update-l.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/update-l.svg');
}
.pb-meta-icon.ic-readme {
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/researcher-l1.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/researcher-l1.svg');
}
.pb-meta-link .pb-meta-icon { background-color: currentColor; margin-right: 2px; }
.pb-meta-link {
    display: inline-flex; align-items: center; gap: 2px;
    background: transparent; border: none; padding: 0;
    cursor: pointer; font-family: inherit;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n5);
    transition: color .15s;
}
.pb-meta-link:hover { color: var(--text-n9); }
.pb-meta-link-chev {
    width: 12px; height: 12px; display: inline-block; flex-shrink: 0;
    background-color: currentColor;
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/arrow-right-l2.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/arrow-right-l2.svg');
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
}

/* feeds popover */
.feeds-menu { position: relative; display: inline-flex; }
.feeds-popover {
    position: absolute;
    top: calc(100% + 6px); left: 0;
    z-index: 50;
    display: none;
    flex-direction: column;
    width: 520px;
    background: #fff;
    border: 0.5px solid rgba(0,0,0,0.2);
    border-radius: 8px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.04);
    overflow: hidden;
}
.feeds-popover.open { display: flex; }
.feeds-popover-header,
.feeds-popover-row {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.07);
    white-space: nowrap;
}
.feeds-popover-header {
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: rgba(0,0,0,0.5);
}
.feeds-popover-row {
    font-size: 14px; line-height: 22px; letter-spacing: 0.14px;
    color: rgba(0,0,0,0.9);
}
.feeds-popover-row:last-child { border-bottom: none; }
.feeds-popover-row.clickable { cursor: pointer; transition: background 0.15s; }
.feeds-popover-row.clickable:hover { background: rgba(0,0,0,0.02); }
.feeds-popover-cell-name { flex: 1; min-width: 0; display: flex; align-items: center; gap: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.feeds-popover-cell-interval { width: 100px; flex-shrink: 0; }
.feeds-popover-cell-last { width: 120px; flex-shrink: 0; }
.feeds-popover-viewall {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 20px;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: rgba(0,0,0,0.5);
    cursor: pointer;
    transition: background .15s;
    white-space: nowrap;
}
.feeds-popover-viewall:hover { background: rgba(0,0,0,0.02); }
.feeds-popover-viewall-label { flex: 1; min-width: 0; }
.feeds-popover-viewall-chev {
    width: 12px; height: 12px; flex-shrink: 0;
    background-color: rgba(0,0,0,0.5);
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/arrow-right-l2.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/arrow-right-l2.svg');
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
}

/* remix popover */
.remix-menu { position: relative; display: inline-flex; }
.remix-popover {
    position: absolute;
    top: calc(100% + 6px); right: 0;
    z-index: 50;
    display: none;
    flex-direction: column;
    gap: 16px;
    width: 480px;
    padding: 20px;
    background: #fff;
    border: 0.5px solid rgba(0,0,0,0.2);
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.04);
}
.remix-popover.open { display: flex; }
.remix-popover-title {
    font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px; font-weight: 500;
    line-height: 26px; letter-spacing: 0.16px;
    color: rgba(0,0,0,0.9);
    margin: 0;
}
.remix-popover-desc {
    font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 14px; line-height: 22px; letter-spacing: 0.14px;
    color: rgba(0,0,0,0.9);
    margin: 0;
}
.remix-popover-cta {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    height: 40px; padding: 9px 20px;
    background: var(--main-m1); color: #fff;
    border: none; border-radius: 8px;
    font-family: inherit;
    font-size: 14px; font-weight: 500;
    line-height: 22px; letter-spacing: 0.14px;
    text-decoration: none;
    cursor: pointer;
    transition: opacity .15s;
}
.remix-popover-cta:hover { opacity: 0.9; }
.remix-popover-cta-icon {
    width: 18px; height: 18px; display: inline-block;
    background-color: #fff;
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/remix-l.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/remix-l.svg');
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
    flex-shrink: 0;
}
.remix-popover-agent { display: flex; flex-direction: column; }
.remix-popover-divider { display: flex; align-items: center; gap: 8px; }
.remix-popover-divider-line { flex: 1; height: 1px; background: rgba(0,0,0,0.05); }
.remix-popover-agent-toggle {
    display: flex; align-items: center; gap: 4px;
    background: transparent; border: none; padding: 0;
    cursor: pointer; font-family: inherit;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: rgba(0,0,0,0.5);
    white-space: nowrap;
    transition: opacity .15s;
}
.remix-popover-agent-toggle:hover { opacity: 0.8; }
.remix-popover-agent-arrow {
    width: 12px; height: 12px; display: inline-block;
    background-color: rgba(0,0,0,0.5);
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/arrow-right-l2.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/arrow-right-l2.svg');
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
    transform: rotate(0deg);
    transition: transform 0.3s ease-out;
    flex-shrink: 0;
}
.remix-popover.agent-open .remix-popover-agent-arrow { transform: rotate(90deg); }
.remix-popover-agent-body {
    display: none;
    flex-direction: column; gap: 16px;
    margin-top: 16px;
    padding: 16px 20px;
    background: rgba(0,0,0,0.03);
    border-radius: 6px;
}
.remix-popover.agent-open .remix-popover-agent-body { display: flex; }
.remix-popover-prompt {
    margin: 0;
    max-height: 240px;
    overflow-y: auto;
    white-space: pre-wrap; word-break: break-word;
    font-family: inherit;
    font-size: 14px; line-height: 22px; letter-spacing: 0.14px;
    color: rgba(0,0,0,0.7);
}
.remix-popover-copy {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    height: 40px; padding: 9px 20px;
    background: transparent;
    border: 0.5px solid rgba(0,0,0,0.2);
    border-radius: 8px;
    font-family: inherit;
    font-size: 14px; font-weight: 500;
    line-height: 22px; letter-spacing: 0.14px;
    color: rgba(0,0,0,0.9);
    cursor: pointer;
    transition: border-color .15s;
}
.remix-popover-copy:hover { border-color: rgba(0,0,0,0.9); }
.remix-popover-copy-icon {
    width: 18px; height: 18px; display: inline-block;
    background-color: currentColor;
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/copy-l.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/copy-l.svg');
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
    flex-shrink: 0;
}
.remix-popover-copy-icon.copied {
    background-color: var(--main-m1);
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/check-l1.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/check-l1.svg');
}

/* description */
.pb-desc {
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n5);
    max-width: 840px; margin: 0;
    display: flex; align-items: flex-start; gap: 6px;
}
.pb-desc-text { flex: 1 1 auto; min-width: 0; }
.pb-desc.collapsed .pb-desc-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.pb-desc-toggle {
    flex-shrink: 0;
    background: transparent; border: none; padding: 0;
    font-family: inherit;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n7);
    cursor: pointer;
    display: none;
    transition: color .15s ease;
}
.pb-desc-toggle:hover { color: var(--text-n9); }
.pb-desc.has-overflow .pb-desc-toggle { display: inline-block; }
`,t=`/* ══════════════════════════════════════════════════════════════
   <playbook-header> — Playbook info header custom element
   Renders title row + meta row + description, with feeds popover
   and description expand/collapse behavior.

   Usage:
     <link rel="stylesheet" href="./components/playbook-header.css">
     <script src="./components/playbook-header.js"><\/script>

     <playbook-header
       title="Quality Value Stock Screener 2"
       freq="15m"
       owner="YGGYLL"
       owner-seed="YGGYLL"
       update-interval="Every 5 minutes"
       star="12" remix="56" comments="6"
       description="...">
       <script type="application/json" class="pb-feeds-data">
         [
           {"id":"capacity-monitor","name":"Capacity-Monitor","interval":"5 minutes","lastRun":"15 minutes ago","clickable":true},
           {"id":"oem-tracker","name":"OEM-Tracker","interval":"1 hour","lastRun":"2 hours ago"}
         ]
       <\/script>
     </playbook-header>

   Events:
     playbook-feed-click   detail: { id }   — fired when a clickable feed row is activated
     playbook-feeds-viewall                 — fired when "View all feeds in Settings" is clicked
   ══════════════════════════════════════════════════════════════ */

(function () {
  if (customElements.get('playbook-header')) return;

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function avatarUrl(seed) {
    var s = encodeURIComponent(seed || 'user');
    return 'https://api.dicebear.com/9.x/notionists/svg?seed=' + s + '&backgroundColor=fff3e0';
  }

  function readFeeds(host) {
    var node = host.querySelector('script.pb-feeds-data[type="application/json"]');
    if (!node) return [];
    try {
      var data = JSON.parse(node.textContent || '[]');
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.warn('[playbook-header] invalid feeds JSON', e);
      return [];
    }
  }

  function renderFeeds(feeds) {
    if (!feeds.length) return '';
    var rows = feeds.map(function (f) {
      var cls = 'feeds-popover-row' + (f.clickable ? ' clickable' : '');
      var extra = f.clickable
        ? ' data-feed="' + esc(f.id || '') + '" role="button" tabindex="0"'
        : '';
      return (
        '<div class="' + cls + '"' + extra + '>' +
          '<div class="feeds-popover-cell-name">' +
            '<span class="pb-freq-dot" aria-hidden="true"></span>' +
            '<span>' + esc(f.name) + '</span>' +
          '</div>' +
          '<div class="feeds-popover-cell-interval">' + esc(f.interval) + '</div>' +
          '<div class="feeds-popover-cell-last">' + esc(f.lastRun) + '</div>' +
        '</div>'
      );
    }).join('');
    return (
      '<div class="feeds-popover-header">' +
        '<div class="feeds-popover-cell-name">Automation</div>' +
        '<div class="feeds-popover-cell-interval">Interval</div>' +
        '<div class="feeds-popover-cell-last">Last Run</div>' +
      '</div>' +
      rows +
      '<div class="feeds-popover-viewall" role="button" tabindex="0">' +
        '<span class="feeds-popover-viewall-label">View all automations in Settings</span>' +
        '<span class="feeds-popover-viewall-chev" aria-hidden="true"></span>' +
      '</div>'
    );
  }

  function slugify(s) {
    return String(s || '').toLowerCase().trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function buildRemixPrompt(title) {
    var ref = '@alva/' + (slugify(title) || 'playbook');
    return 'Remix Playbook(' + ref + '):\\n\\n' +
      'If you have the Alva skill → use it to build my own version.\\n' +
      'If not → install it first: npx skills add https://github.com/alva-ai/skills\\n\\n' +
      'Then:\\n' +
      '1. Customize it based on my preferences\\n' +
      '2. Deploy as a new playbook under my account\\n' +
      '3. If I don\\'t specify what to change, ask me what I\\'d like to customize.';
  }

  function render(host) {
    var title = host.getAttribute('title') || '';
    var freq = host.getAttribute('freq') || '';
    var owner = host.getAttribute('owner') || '';
    var ownerSeed = host.getAttribute('owner-seed') || owner;
    var updateInterval = host.getAttribute('update-interval') || '';
    var star = host.getAttribute('star') || '';
    var remix = host.getAttribute('remix') || '';
    var comments = host.getAttribute('comments') || '';
    var description = host.getAttribute('description') || '';
    var feeds = readFeeds(host);

    var freqChip = freq
      ? '<span class="pb-freq-chip"><span class="pb-freq-dot" aria-hidden="true"></span>' + esc(freq) + '</span>'
      : '';

    var authorBlock = owner
      ? '<div class="pb-meta-author">' +
          '<img class="pb-meta-avatar" src="' + avatarUrl(ownerSeed) + '" alt="' + esc(owner) + '" />' +
          '<span>' + esc(owner) + '</span>' +
        '</div><span class="pb-meta-sep">|</span>'
      : '';

    var updateBlock = updateInterval
      ? '<div class="pb-meta-item">' +
          '<span class="pb-meta-icon ic-update" aria-hidden="true"></span>' +
          '<span>' + esc(updateInterval) + '</span>' +
        '</div><span class="pb-meta-sep">|</span>'
      : '';

    var readmeModal = host.getAttribute('readme-modal') || '';
    var readmeBlock = readmeModal
      ? '<button class="pb-meta-link" type="button" data-readme-trigger>' +
          '<span class="pb-meta-icon ic-readme" aria-hidden="true"></span>' +
          '<span>Readme</span>' +
          '<span class="pb-meta-link-chev" aria-hidden="true"></span>' +
        '</button><span class="pb-meta-sep">|</span>'
      : '';

    var feedsCount = feeds.length;
    var feedsBlock = feedsCount
      ? '<span class="pb-meta-sep">|</span>' +
        '<div class="feeds-menu">' +
          '<button class="pb-meta-link" type="button" data-feeds-trigger aria-haspopup="menu" aria-expanded="false">' +
            '<span>' + feedsCount + ' Automation' + (feedsCount > 1 ? 's' : '') + '</span>' +
            '<span class="pb-meta-link-chev" aria-hidden="true"></span>' +
          '</button>' +
          '<div class="feeds-popover" data-feeds-popover role="menu" aria-hidden="true">' +
            renderFeeds(feeds) +
          '</div>' +
        '</div>'
      : '';

    var descBlock = description
      ? '<div class="pb-desc collapsed">' +
          '<span class="pb-desc-text">' + esc(description) + '</span>' +
          '<button class="pb-desc-toggle" type="button" aria-expanded="false">Show more</button>' +
        '</div>'
      : '';

    host.innerHTML =
      '<section class="playbook-info">' +
        '<div class="pb-top">' +
          '<div class="pb-top-left">' +
            '<h1 class="pb-title">' + esc(title) + '</h1>' +
            freqChip +
          '</div>' +
          '<div class="pb-actions">' +
            '<button class="pb-action" type="button" aria-label="Share"><span class="pb-action-icon ic-share"></span></button>' +
            '<button class="pb-action" type="button" aria-label="Star"><span class="pb-action-icon ic-star"></span>' + (star ? '<span class="pb-action-count">' + esc(star) + '</span>' : '') + '</button>' +
            '<div class="remix-menu">' +
              '<button class="pb-action" type="button" aria-label="Remix" data-remix-trigger aria-haspopup="dialog" aria-expanded="false">' +
                '<span class="pb-action-icon ic-remix"></span>' +
                (remix ? '<span class="pb-action-count">' + esc(remix) + '</span>' : '') +
              '</button>' +
              '<div class="remix-popover" data-remix-popover role="dialog" aria-label="Remix this Playbook" aria-hidden="true">' +
                '<h2 class="remix-popover-title">Remix this Playbook</h2>' +
                '<p class="remix-popover-desc">Create your own version — customize the data, layout, and style to fit your needs. Your remix will be published under your account.</p>' +
                '<a href="https://app.alva.xyz" target="_blank" rel="noopener" class="remix-popover-cta" data-remix-cta>' +
                  '<span class="remix-popover-cta-icon"></span>' +
                  '<span>Remix</span>' +
                '</a>' +
                '<div class="remix-popover-agent">' +
                  '<div class="remix-popover-divider">' +
                    '<div class="remix-popover-divider-line"></div>' +
                    '<button class="remix-popover-agent-toggle" type="button" data-remix-agent-toggle aria-expanded="false">' +
                      '<span>Or use your own agent</span>' +
                      '<span class="remix-popover-agent-arrow"></span>' +
                    '</button>' +
                    '<div class="remix-popover-divider-line"></div>' +
                  '</div>' +
                  '<div class="remix-popover-agent-body">' +
                    '<pre class="remix-popover-prompt" data-remix-prompt>' + esc(buildRemixPrompt(title)) + '</pre>' +
                    '<button class="remix-popover-copy" type="button" data-remix-copy>' +
                      '<span class="remix-popover-copy-icon" data-remix-copy-icon></span>' +
                      '<span data-remix-copy-label>Copy</span>' +
                    '</button>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<button class="pb-action" type="button" aria-label="Comments"><span class="pb-action-icon ic-chat"></span>' + (comments ? '<span class="pb-action-count">' + esc(comments) + '</span>' : '') + '</button>' +
            '<button class="pb-trade-btn" type="button">Trade</button>' +
          '</div>' +
        '</div>' +
        '<div class="pb-meta">' +
          authorBlock +
          updateBlock +
          readmeBlock +
          '<button class="pb-meta-link" type="button"><span>History</span><span class="pb-meta-link-chev" aria-hidden="true"></span></button>' +
          feedsBlock +
        '</div>' +
        descBlock +
      '</section>';
  }

  function setupReadmeTrigger(host) {
    var btn = host.querySelector('[data-readme-trigger]');
    if (!btn) return;
    var modalId = host.getAttribute('readme-modal') || '';
    btn.addEventListener('click', function () {
      host.dispatchEvent(new CustomEvent('playbook-readme-click', {
        bubbles: true,
        detail: { modalId: modalId }
      }));
    });
  }

  function setupDescToggle(host) {
    var desc = host.querySelector('.pb-desc');
    if (!desc) return;
    var text = desc.querySelector('.pb-desc-text');
    var toggle = desc.querySelector('.pb-desc-toggle');
    if (!text || !toggle) return;

    function checkOverflow() {
      var wasCollapsed = desc.classList.contains('collapsed');
      desc.classList.add('collapsed');
      var overflows = text.scrollWidth - text.clientWidth > 1;
      if (!wasCollapsed) desc.classList.remove('collapsed');
      desc.classList.toggle('has-overflow', overflows);
    }

    checkOverflow();
    var onResize = function () { checkOverflow(); };
    window.addEventListener('resize', onResize);
    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      window.removeEventListener('resize', onResize);
    });

    toggle.addEventListener('click', function () {
      var collapsed = desc.classList.toggle('collapsed');
      toggle.textContent = collapsed ? 'Show more' : 'Show less';
      toggle.setAttribute('aria-expanded', String(!collapsed));
    });
  }

  function setupFeedsPopover(host) {
    var trigger = host.querySelector('[data-feeds-trigger]');
    var popover = host.querySelector('[data-feeds-popover]');
    if (!trigger || !popover) return;

    function close() {
      popover.classList.remove('open');
      popover.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
    }
    function open() {
      popover.classList.add('open');
      popover.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
    }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (popover.classList.contains('open')) close(); else open();
    });

    var onDocClick = function (e) {
      if (!popover.classList.contains('open')) return;
      if (popover.contains(e.target) || trigger.contains(e.target)) return;
      close();
    };
    var onKeydown = function (e) {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeydown);
    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeydown);
    });

    popover.querySelectorAll('[data-feed]').forEach(function (row) {
      var activate = function () {
        close();
        host.dispatchEvent(new CustomEvent('playbook-feed-click', {
          bubbles: true,
          detail: { id: row.getAttribute('data-feed') }
        }));
      };
      row.addEventListener('click', activate);
      row.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
      });
    });

    var viewAll = popover.querySelector('.feeds-popover-viewall');
    if (viewAll) {
      var go = function () {
        close();
        host.dispatchEvent(new CustomEvent('playbook-feeds-viewall', { bubbles: true }));
      };
      viewAll.addEventListener('click', go);
      viewAll.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
      });
    }
  }

  function setupRemixPopover(host) {
    var trigger = host.querySelector('[data-remix-trigger]');
    var popover = host.querySelector('[data-remix-popover]');
    if (!trigger || !popover) return;

    function close() {
      popover.classList.remove('open');
      popover.classList.remove('agent-open');
      popover.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      var agentToggleEl = popover.querySelector('[data-remix-agent-toggle]');
      if (agentToggleEl) agentToggleEl.setAttribute('aria-expanded', 'false');
    }
    function open() {
      popover.classList.add('open');
      popover.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
    }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (popover.classList.contains('open')) close(); else open();
    });

    var onDocClick = function (e) {
      if (!popover.classList.contains('open')) return;
      if (popover.contains(e.target) || trigger.contains(e.target)) return;
      close();
    };
    var onKeydown = function (e) {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeydown);
    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeydown);
    });

    var agentToggle = popover.querySelector('[data-remix-agent-toggle]');
    if (agentToggle) {
      agentToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var opened = popover.classList.toggle('agent-open');
        agentToggle.setAttribute('aria-expanded', String(opened));
      });
    }

    var cta = popover.querySelector('[data-remix-cta]');
    if (cta) cta.addEventListener('click', close);

    var copyBtn = popover.querySelector('[data-remix-copy]');
    var promptEl = popover.querySelector('[data-remix-prompt]');
    if (copyBtn && promptEl) {
      copyBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var text = promptEl.textContent || '';
        var icon = copyBtn.querySelector('[data-remix-copy-icon]');
        var label = copyBtn.querySelector('[data-remix-copy-label]');
        var ok = function () {
          if (icon) icon.classList.add('copied');
          if (label) label.textContent = 'Copied';
          setTimeout(function () {
            if (icon) icon.classList.remove('copied');
            if (label) label.textContent = 'Copy';
          }, 2000);
        };
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(ok).catch(function () {});
          }
        } catch (_) {}
      });
    }
  }

  class PlaybookHeader extends HTMLElement {
    connectedCallback() {
      if (this._pbHeaderMounted) return;
      this._pbHeaderMounted = true;
      // connectedCallback can fire before child <script type="application/json">
      // nodes are parsed (when the element JS is loaded inline in <head>, the
      // parser upgrades the element on its open tag before reading children).
      // Defer mount to the next tick so we can read the feeds JSON child.
      var self = this;
      var mount = function () {
        render(self);
        setupDescToggle(self);
        setupFeedsPopover(self);
        setupRemixPopover(self);
        setupReadmeTrigger(self);
      };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount, { once: true });
      } else {
        Promise.resolve().then(mount);
      }
    }
    disconnectedCallback() {
      (this._pbHeaderCleanup || []).forEach(function (fn) { try { fn(); } catch (_) {} });
      this._pbHeaderCleanup = [];
    }
  }

  customElements.define('playbook-header', PlaybookHeader);
})();
`,n=`/* Alva Design Tokens — single source of truth.
   React side: imported by theme.css.
   Playbook HTML side: inlined into iframe srcDoc by inlinePlaybookHeader.ts. */

:root {
  /* ── Common ── */
  --b-common-white: #ffffff;
  --b-common-black: #000000;

  /* ── Semantic Brand ── */
  --main-m1:    #49A3A6;
  --main-m1-10: rgba(73, 163, 166, 0.1);
  --main-m2:    #2196f3;
  --main-m2-10: rgba(33, 150, 243, 0.1);
  --main-m3:    #2a9b7d;
  --main-m3-10: rgba(42, 155, 125, 0.1);
  --main-m4:    #e05357;
  --main-m4-10: rgba(224, 83, 87, 0.1);
  --main-m5:    #E6A91A;
  --main-m5-10: rgba(230, 169, 26, 0.1);
  --main-m6:    #ff9800;
  --main-m6-10: rgba(255, 152, 0, 0.1);
  --main-m7:    rgba(0, 0, 0, 0.6);

  /* ── Chart ── */
  --chart-orange1-main: #ff9800;
  --chart-orange1-1: #ffbb1c;
  --chart-orange1-2: #f8cb86;
  --chart-green1-main: #40a544;
  --chart-green1-1: #007949;
  --chart-green1-2: #78c26d;
  --chart-green2-main: #8fc13a;
  --chart-green2-1: #5b8513;
  --chart-green2-2: #c0d40f;
  --chart-cyan1-1: #117a7d;
  --chart-cyan1-2: #77c9c2;
  --chart-cyan2-main: #7cafad;
  --chart-cyan2-1: #4c807e;
  --chart-cyan2-2: #a5c7c6;
  --chart-blue1-main: #3d8bd1;
  --chart-blue1-1: #005daf;
  --chart-blue1-2: #88b7e0;
  --chart-blue2-main: #0d7498;
  --chart-blue2-1: #54a5c2;
  --chart-blue2-2: #91d1db;
  --chart-purple1-main: #5f75c9;
  --chart-purple1-1: #3a52be;
  --chart-purple1-2: #9ab1d7;
  --chart-purple2-main: #7474d8;
  --chart-purple2-1: #4646ae;
  --chart-purple2-2: #afbbf7;
  --chart-violet1-main: #a878dc;
  --chart-violet1-1: #7f4eb4;
  --chart-violet1-2: #d4b2e1;
  --chart-pink1-main: #dc7aa5;
  --chart-pink1-1: #ba5883;
  --chart-pink1-2: #ecb0ca;
  --chart-red1-main: #c76466;
  --chart-red1-1: #a94749;
  --chart-red1-2: #f2a0a1;
  --chart-grey-main: #838383;
  --chart-grey-1: #555555;
  --chart-grey-2: #b7b7b7;

  /* ── Spacing ── */
  --spacing-xxxs: 2px;
  --spacing-xxs: 4px;
  --spacing-xs: 8px;
  --spacing-s: 12px;
  --spacing-m: 16px;
  --spacing-l: 20px;
  --spacing-xl: 24px;
  --spacing-xxl: 28px;
  --spacing-xxxl: 32px;
  --spacing-xxxxl: 40px;
  --spacing-xxxxxl: 48px;
  --spacing-xxxxxxl: 56px;

  /* ── Radius ── */
  --radius-ct-xs: 2px;
  --radius-ct-s: 4px;
  --radius-ct-m: 6px;
  --radius-ct-l: 8px;
  --radius-ct-xl: 12px;
  --radius-pop-dialog: 12px;
  --radius-pop-action-sheets: 12px;
  --radius-pop-dropdown: 8px;
  --radius-pop-popover: 8px;
  --radius-pop-toast: 8px;
  --radius-pop-tips: 8px;
  --radius-btn-xs: 4px;
  --radius-btn-s: 6px;
  --radius-btn-m: 8px;
  --radius-btn-l: 12px;

  /* ── Text (Light) ── */
  --text-n9: rgba(0, 0, 0, 0.9);
  --text-n7: rgba(0, 0, 0, 0.7);
  --text-n5: rgba(0, 0, 0, 0.5);
  --text-n3: rgba(0, 0, 0, 0.3);
  --text-n2: rgba(0, 0, 0, 0.2);

  /* ── Background ── */
  --b0-page:           #ffffff;
  --b0-container:      #ffffff;
  --b0-sidebar:        #1D1D1D;
  --b0-sidebar-select: rgba(255, 255, 255, 0.03);
  --grey-g01: #fafafa;
  --grey-g02: #f5f5f5;
  --grey-g03: #f0f0f0;
  --grey-g05: #eaeaea;
  --grey-g1:  #dedede;
  --b-r02: rgba(0, 0, 0, 0.02);
  --b-r03: rgba(0, 0, 0, 0.03);
  --b-r05: rgba(0, 0, 0, 0.05);
  --b-r07: rgba(0, 0, 0, 0.07);
  --b-r1:  rgba(0, 0, 0, 0.1);

  /* ── Line & Border ── */
  --line-l05: rgba(0, 0, 0, 0.05);
  --line-l07: rgba(0, 0, 0, 0.07);
  --line-l12: rgba(0, 0, 0, 0.12);
  --line-l2:  rgba(0, 0, 0, 0.2);
  --line-l3:  rgba(0, 0, 0, 0.3);
  --line-l9:  rgba(0, 0, 0, 0.9);

  /* ── Shadow ── */
  --shadow-xs: 0 4px 15px 0 rgba(0, 0, 0, 0.05);
  --shadow-s:  0 6px 20px 0 rgba(0, 0, 0, 0.04);
  --shadow-l:  0 10px 20px 0 rgba(0, 0, 0, 0.08);

  /* ── Tailwind / shadcn compat ── */
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --background: rgba(246, 246, 246, 1);
  --foreground: rgba(0, 0, 0, 0.9);
  --primary: rgba(73, 163, 166, 1);
  --primary-foreground: rgba(255, 255, 255, 1);
  --card: rgba(255, 255, 255, 1);
  --card-foreground: rgba(0, 0, 0, 0.9);
  --border: rgba(0, 0, 0, 0.3);
  --muted: rgba(250, 250, 250, 1);
  --muted-foreground: rgba(0, 0, 0, 0.7);
  --destructive: rgba(224, 83, 87, 1);
  --ring: rgba(73, 163, 166, 1);
  --radius: 6px;
  --radius-card: 8px;
  --sidebar: rgba(42, 42, 56, 1);
  --sidebar-foreground: rgba(0, 0, 0, 0.9);
  --sidebar-primary: rgba(73, 163, 166, 1);

  /* ── Short-name aliases used by playbook HTMLs ── */
  --sp-xxs: var(--spacing-xxs);
  --sp-xs:  var(--spacing-xs);
  --sp-s:   var(--spacing-s);
  --sp-m:   var(--spacing-m);
  --sp-l:   var(--spacing-l);
  --sp-xl:  var(--spacing-xl);
  --sp-xxl: var(--spacing-xxl);
  --sp-xxxl:var(--spacing-xxxl);
  --r-xs: var(--radius-ct-xs);
  --r-s:  var(--radius-ct-s);
  --r-m:  var(--radius-btn-s);
  --r-l:  var(--radius-ct-l);
}

/* Dark Mode (disabled — kept for future use) */
[data-theme="dark-disabled"] {
  /* Text */
  --text-n9: rgba(255, 255, 255, 0.9);
  --text-n7: rgba(255, 255, 255, 0.7);
  --text-n5: rgba(255, 255, 255, 0.5);
  --text-n3: rgba(255, 255, 255, 0.3);
  --text-n2: rgba(255, 255, 255, 0.2);

  /* Background */
  --b0-page: #15161a;
  --b0-container: #15161a;
  --b0-sidebar: #1D1D1D;
  --b0-sidebar-select: rgba(255, 255, 255, 0.03);
  --grey-g01: #1a1b1f;
  --grey-g02: #1c1d21;
  --grey-g03: #212225;
  --grey-g05: #25262a;
  --grey-g1: #2c2d31;
  --b-r02: rgba(255, 255, 255, 0.02);
  --b-r03: rgba(255, 255, 255, 0.03);
  --b-r05: rgba(255, 255, 255, 0.05);
  --b-r07: rgba(255, 255, 255, 0.07);
  --b-r1: rgba(255, 255, 255, 0.1);

  /* Line & Border */
  --line-l07: rgba(255, 255, 255, 0.07);
  --line-l05: rgba(255, 255, 255, 0.05);
  --line-l12: rgba(255, 255, 255, 0.12);
  --line-l2: rgba(255, 255, 255, 0.2);
  --line-l3: rgba(255, 255, 255, 0.3);
  --line-l9: rgba(255, 255, 255, 0.9);

  /* Shadow */
  --shadow-xs: 0 4px 15px 0 rgba(0, 0, 0, 0.25);
  --shadow-s: 0 6px 20px 0 rgba(0, 0, 0, 0.24);
  --shadow-l: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
}
`,r=`<link rel="stylesheet" href="./styles/tokens.css" />`,i=`<link rel="stylesheet" href="./components/playbook-header.css" />`,a=`<script src="./components/playbook-header.js" defer><\/script>`;function o(o){let s=t.replace(/<\/script>/gi,`<\\/script>`);return o.replace(r,`<style>${n}</style>`).replace(i,`<style>${e}</style>`).replace(a,`<script>${s}<\/script>`)}export{o as t};