/* ══════════════════════════════════════════════════════════════
   <playbook-header> — Playbook info header custom element
   Renders title row + meta row + description, with feeds popover
   and description expand/collapse behavior.

   Usage:
     <link rel="stylesheet" href="./components/playbook-header.css">
     <script src="./components/playbook-header.js"></script>

     <playbook-header
       title="Quality Value Stock Screener 2"
       freq="15m"
       last-updated="15 minutes ago"
       owner="YGGYLL"
       owner-seed="YGGYLL"
       star="12" remix="56" comments="6"
       description="...">
       <script type="application/json" class="pb-feeds-data">
         [
           {"id":"capacity-monitor","name":"Capacity-Monitor","interval":"20 Minutes","lastRun":"15 minutes ago","clickable":true},
           {"id":"oem-tracker","name":"OEM-Tracker","interval":"1 hour","lastRun":"2 hours ago"}
         ]
       </script>
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
    if (seed === 'YGGYLL') return '/alva-infant/portrait.png';
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

  function renderFeeds(feeds, lastUpdated) {
    if (!feeds.length) return '';
    var metaRow = lastUpdated
      ? '<div class="feeds-popover-meta">Last Updated: ' + esc(lastUpdated) + '</div>'
      : '';
    var rows = feeds.map(function (f) {
      var cls = 'feeds-popover-row clickable';
      var extra = ' data-feed="' + esc(f.id || '') + '" role="button" tabindex="0"';
      var chev = '<span class="feeds-popover-row-chev" aria-hidden="true"></span>';
      return (
        '<div class="' + cls + '"' + extra + '>' +
          '<div class="feeds-popover-cell-name">' +
            '<span class="pb-freq-dot" aria-hidden="true"></span>' +
            '<span>' + esc(f.name) + '</span>' +
          '</div>' +
          '<div class="feeds-popover-cell-interval">' + esc(f.interval) + '</div>' +
          '<div class="feeds-popover-cell-last">' + esc(f.lastRun) + '</div>' +
          chev +
        '</div>'
      );
    }).join('');
    return (
      metaRow +
      '<div class="feeds-popover-header">' +
        '<div class="feeds-popover-cell-name">Automation</div>' +
        '<div class="feeds-popover-cell-interval">Interval</div>' +
        '<div class="feeds-popover-cell-last">Last Run</div>' +
        '<span class="feeds-popover-row-chev is-placeholder" aria-hidden="true"></span>' +
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
    return 'Remix ' + ref + ' — customize it based on my preferences and deploy as a new playbook under my account.';
  }

  function buildExternalRemixPrompt(title) {
    var ref = '@alva/' + (slugify(title) || 'playbook');
    return 'Remix Playbook(' + ref + '):\n\n' +
      'If you have the Alva skill → use it to build my own version.\n' +
      'If not → install it first: npx skills add https://github.com/alva-ai/skills\n\n' +
      'Then:\n' +
      '1. Customize it based on my preferences\n' +
      '2. Deploy as a new playbook under my account\n' +
      '3. If I don\'t specify what to change, ask me what I\'d like to customize.';
  }

  function render(host) {
    var title = host.getAttribute('title') || '';
    var freq = host.getAttribute('freq') || '';
    var lastUpdated = host.getAttribute('last-updated') || '';
    var owner = host.getAttribute('owner') || '';
    var ownerSeed = host.getAttribute('owner-seed') || owner;
    var star = host.getAttribute('star') || '';
    var remix = host.getAttribute('remix') || '';
    var alertsEnabled = host.hasAttribute('get-alerts')
      && host.getAttribute('get-alerts') !== 'false';
    var alertsLabel = host.getAttribute('alerts-label') || 'Get Alerts';
    var alertsStartConnected = host.hasAttribute('alerts-connected')
      && host.getAttribute('alerts-connected') !== 'false';
    var comments = host.getAttribute('comments') || '';
    var description = host.getAttribute('description') || '';
    var feeds = readFeeds(host);

    var authorBlock = owner
      ? '<span class="pb-pill pb-pill--author">' +
          '<img class="pb-meta-avatar" src="' + avatarUrl(ownerSeed) + '" alt="' + esc(owner) + '" />' +
          '<span>' + esc(owner) + '</span>' +
        '</span>'
      : '';

    var readmeModal = host.getAttribute('readme-modal') || '';
    var readmeBlock = readmeModal
      ? '<button class="pb-pill pb-pill--readme" type="button" data-readme-trigger>' +
          '<span class="pb-meta-icon ic-readme" aria-hidden="true"></span>' +
          '<span>README</span>' +
        '</button>'
      : '';

    var feedsCount = feeds.length;
    var statusParts = [];
    if (feedsCount) statusParts.push('<span>' + feedsCount + ' Automation' + (feedsCount > 1 ? 's' : '') + '</span>');
    if (freq) statusParts.push('<span>' + esc(freq) + '</span>');
    var statusInner = '';
    for (var i = 0; i < statusParts.length; i++) {
      if (i > 0) statusInner += '<span class="pb-pill-sep" aria-hidden="true">•</span>';
      statusInner += statusParts[i];
    }
    var statusTooltip = lastUpdated
      ? '<span class="pb-pill-tip" role="tooltip">' +
          '<div class="tooltip">' +
            '<div class="tooltip-border"></div>' +
            '<div class="tooltip-text">Last Updated: ' + esc(lastUpdated) + '</div>' +
          '</div>' +
        '</span>'
      : '';
    var statusTag = feedsCount ? 'button' : 'span';
    var statusAttrs = feedsCount
      ? ' type="button" data-feeds-trigger aria-haspopup="menu" aria-expanded="false"'
      : '';
    var statusClasses = 'pb-pill pb-pill--status' + (lastUpdated ? ' has-tooltip' : '');
    var statusBlock = statusParts.length
      ? (feedsCount
          ? '<div class="feeds-menu">' +
              '<' + statusTag + ' class="' + statusClasses + '"' + statusAttrs + (lastUpdated && !feedsCount ? ' tabindex="0"' : '') + '>' +
                '<span class="pb-freq-dot" aria-hidden="true"></span>' +
                statusInner +
                statusTooltip +
              '</' + statusTag + '>' +
              '<div class="feeds-popover" data-feeds-popover role="menu" aria-hidden="true">' +
                renderFeeds(feeds, lastUpdated) +
              '</div>' +
            '</div>'
          : '<' + statusTag + ' class="' + statusClasses + '"' + (lastUpdated ? ' tabindex="0"' : '') + '>' +
              '<span class="pb-freq-dot" aria-hidden="true"></span>' +
              statusInner +
              statusTooltip +
            '</' + statusTag + '>')
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
          '</div>' +
          '<div class="pb-actions">' +
            '<div class="share-menu">' +
              '<button class="pb-action pb-action--icon-only" type="button" aria-label="Share" data-share-trigger aria-haspopup="dialog" aria-expanded="false"><span class="pb-action-icon ic-share"></span></button>' +
              '<div class="share-popover" data-share-popover role="dialog" aria-label="Share" aria-hidden="true">' +
                '<h2 class="share-popover-title">Share</h2>' +
                '<div class="share-popover-group" role="radiogroup" aria-label="Share visibility">' +
                  '<button class="share-popover-row is-disabled" type="button" role="radio" aria-checked="false" aria-disabled="true" disabled data-share-option="private">' +
                    '<span class="share-popover-icon-badge"><span class="share-popover-icon ic-hide"></span></span>' +
                    '<span class="share-popover-row-text">' +
                      '<span class="share-popover-row-title">Private</span>' +
                      '<span class="share-popover-row-desc">Visible to yourself only.</span>' +
                    '</span>' +
                    '<span class="share-popover-pro">Pro</span>' +
                  '</button>' +
                  '<button class="share-popover-row is-selected" type="button" role="radio" aria-checked="true" data-share-option="public">' +
                    '<span class="share-popover-icon-badge is-filled"><span class="share-popover-icon ic-global"></span></span>' +
                    '<span class="share-popover-row-text">' +
                      '<span class="share-popover-row-title">Public</span>' +
                      '<span class="share-popover-row-desc">Anyone can access by link.</span>' +
                      '<span class="share-popover-row-note">Share to earn up to 3,000 credits/week.</span>' +
                    '</span>' +
                    '<span class="share-popover-check" aria-hidden="true"></span>' +
                  '</button>' +
                  '<button class="share-popover-row is-disabled" type="button" role="radio" aria-checked="false" aria-disabled="true" disabled data-share-option="sealed">' +
                    '<span class="share-popover-icon-badge"><span class="share-popover-icon ic-lightning"></span></span>' +
                    '<span class="share-popover-row-text">' +
                      '<span class="share-popover-row-title">Sealed</span>' +
                      '<span class="share-popover-row-desc">Other users need to pay credits to read.</span>' +
                      '<span class="share-popover-row-note">Share to earn up to 3,000 credits/week.</span>' +
                    '</span>' +
                    '<span class="share-popover-pro">Pro</span>' +
                  '</button>' +
                '</div>' +
                '<button class="share-popover-copy" type="button" data-share-copy>' +
                  '<span class="share-popover-copy-icon" data-share-copy-icon></span>' +
                  '<span data-share-copy-label>Copy Link</span>' +
                '</button>' +
              '</div>' +
            '</div>' +
            '<div class="star-menu">' +
              '<button class="pb-action" type="button" aria-label="Star" data-star-trigger aria-haspopup="dialog" aria-expanded="false">' +
                '<span class="pb-action-icon ic-star"></span>' +
                (star ? '<span class="pb-action-count">' + esc(star) + '</span>' : '') +
              '</button>' +
              '<div class="star-popover" data-star-popover role="dialog" aria-label="Connect Agents to Get Notified" aria-hidden="true">' +
                '<div class="star-popover-card">' +
                  '<div class="star-popover-logo"><img src="/alva-infant/logo-portrait.svg" alt="" /></div>' +
                  '<p class="star-popover-title">Connect Agents to Get Notified</p>' +
                  '<a href="https://t.me/alva_ai_bot" target="_blank" rel="noopener" class="star-popover-cta">' +
                    '<img class="star-popover-cta-icon" src="https://alva-ai-static.b-cdn.net/icons/logo-social-telegram.svg" alt="" />' +
                    '<span>Connect Telegram</span>' +
                  '</a>' +
                  '<div class="star-popover-socials">' +
                    '<span class="star-popover-chip"><img src="/alva-infant/logo-social-discord.svg" alt="" /><span>Discord</span></span>' +
                    '<span class="star-popover-chip is-disabled"><img src="/alva-infant/logo-social-slack.svg" alt="" /><span>Slack</span></span>' +
                    '<span class="star-popover-chip is-disabled"><img src="/alva-infant/logo-social-whatsapp.svg" alt="" /><span>WhatsApp</span></span>' +
                  '</div>' +
                '</div>' +
                '<button class="star-popover-footer" type="button" data-star-footer>' +
                  '<span class="star-popover-footer-icon" aria-hidden="true"></span>' +
                  '<span>Starred</span>' +
                '</button>' +
              '</div>' +
            '</div>' +
            '<button class="pb-action" type="button" aria-label="Comments" data-discuss-trigger aria-pressed="false"><span class="pb-action-icon ic-chat"></span>' + (comments ? '<span class="pb-action-count">' + esc(comments) + '</span>' : '') + '</button>' +
            '<div class="remix-menu pb-remix-wrap">' +
              '<button class="pb-remix-btn" type="button" aria-label="Remix" data-remix-trigger aria-haspopup="dialog" aria-expanded="false">' +
                '<span class="pb-remix-label">Remix</span>' +
                (remix ? '<span class="pb-remix-count">' + esc(remix) + '</span>' : '') +
              '</button>' +
              '<div class="remix-popover" data-remix-popover role="dialog" aria-label="Remix this Playbook" aria-hidden="true">' +
                '<h2 class="remix-popover-title">Remix this Playbook</h2>' +
                '<p class="remix-popover-desc">Create your own version — customize the data, layout, and style to fit your needs. Your remix will be published under your account.</p>' +
                '<button class="remix-popover-cta" type="button" data-remix-cta>' +
                  '<span class="remix-popover-cta-icon"></span>' +
                  '<span>Remix</span>' +
                '</button>' +
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
                    '<pre class="remix-popover-prompt" data-remix-prompt>' + esc(buildExternalRemixPrompt(title)) + '</pre>' +
                    '<button class="remix-popover-copy" type="button" data-remix-copy>' +
                      '<span class="remix-popover-copy-icon" data-remix-copy-icon></span>' +
                      '<span data-remix-copy-label>Copy</span>' +
                    '</button>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            (alertsEnabled
              ? '<div class="alerts-menu">' +
                  '<button class="pb-alerts-btn' + (alertsStartConnected ? ' is-on' : '') + '" type="button" aria-label="' + esc(alertsLabel) + '" data-alerts-trigger aria-haspopup="dialog" aria-expanded="false">' +
                    '<span class="pb-alerts-label">' + esc(alertsLabel) + '</span>' +
                  '</button>' +
                  '<div class="alerts-popover' + (alertsStartConnected ? ' is-connected' : '') + '" data-alerts-popover role="dialog" aria-label="' + esc(alertsLabel) + '" aria-hidden="true">' +
                    '<div class="alerts-popover-initial" data-alerts-initial>' +
                      '<p class="alerts-popover-title">Get Alerts</p>' +
                      '<div class="alerts-popover-card">' +
                        '<div class="alerts-popover-logo"><img src="/alva-infant/logo-portrait.svg" alt="" /></div>' +
                        '<p class="alerts-popover-subtitle">Connect Agents to Get Notified</p>' +
                        '<div class="alerts-popover-ctas">' +
                          '<button type="button" class="alerts-popover-cta alerts-popover-cta--primary" data-connect-platform="telegram">' +
                            '<span class="alerts-popover-cta-inner">' +
                              '<img class="alerts-popover-cta-icon" src="https://alva-ai-static.b-cdn.net/icons/logo-social-telegram.svg" alt="" />' +
                              '<span>Connect Telegram</span>' +
                            '</span>' +
                            '<span class="alerts-popover-cta-spinner" aria-hidden="true"></span>' +
                          '</button>' +
                          '<button type="button" class="alerts-popover-cta alerts-popover-cta--secondary" data-connect-platform="discord">' +
                            '<span class="alerts-popover-cta-inner">' +
                              '<img class="alerts-popover-cta-icon" src="/alva-infant/logo-social-discord.svg" alt="" />' +
                              '<span>Connect Discord</span>' +
                            '</span>' +
                            '<span class="alerts-popover-cta-spinner" aria-hidden="true"></span>' +
                          '</button>' +
                        '</div>' +
                        '<div class="alerts-popover-extra">' +
                          '<p class="alerts-popover-extra-label">Same agent, more channels</p>' +
                          '<div class="alerts-popover-chips">' +
                            '<span class="alerts-popover-chip is-disabled"><img src="/alva-infant/logo-social-slack.svg" alt="" /><span>Slack</span></span>' +
                            '<span class="alerts-popover-chip is-disabled"><img src="/alva-infant/logo-social-whatsapp.svg" alt="" /><span>WhatsApp</span></span>' +
                            '<span class="alerts-popover-chip is-disabled"><img src="/alva-infant/logo-social-line.svg" alt="" /><span>Line</span></span>' +
                          '</div>' +
                        '</div>' +
                      '</div>' +
                    '</div>' +
                    '<div class="alerts-popover-connected" data-alerts-connected>' +
                      '<p class="alerts-popover-title">Get Alerts</p>' +
                      '<div class="alerts-connected-section">' +
                        '<div class="alerts-connected-head">' +
                          '<span class="alerts-connected-head-label">Connected</span>' +
                          '<button class="alerts-connected-manage" type="button" data-alerts-manage>' +
                            '<span>Manage Accounts</span>' +
                            '<span class="alerts-connected-manage-chev" aria-hidden="true"></span>' +
                          '</button>' +
                        '</div>' +
                        '<div class="alerts-connected-account" data-alerts-account>' +
                          '<img class="alerts-connected-avatar" data-alerts-avatar data-platform="' + (alertsStartConnected ? 'discord' : 'telegram') + '" src="' + (alertsStartConnected ? '/alva-infant/logo-social-discord.svg' : 'https://alva-ai-static.b-cdn.net/icons/logo-social-telegram.svg') + '" alt="" />' +
                          '<span class="alerts-connected-name" data-alerts-name>Sheer Ruan</span>' +
                          '<div class="alerts-connected-toggle">' +
                            '<span class="alerts-connected-toggle-label">Receive Alerts</span>' +
                            '<button type="button" class="switch" data-alerts-switch role="switch" aria-checked="false"><span class="switch-thumb"></span></button>' +
                          '</div>' +
                        '</div>' +
                      '</div>' +
                      '<div class="alerts-signals-section">' +
                        '<p class="alerts-signals-title">Latest Signals</p>' +
                        '<div class="alerts-signals-list">' +
                          '<div class="alerts-signal-card">' +
                            '<p class="alerts-signal-date">Apr 16, 2026 · Market Close Digest</p>' +
                            '<ul class="alerts-signal-bullets">' +
                              '<li><strong>Top of basket:</strong> ALL (Allstate) holds #1 at Score 95 — ROE 39.5%, P/E 5.64; leadership in Insurance — Property &amp; Casualty continues.</li>' +
                              '<li><strong>New entries:</strong> BBVA (+7), PDD (+6), PBR (+3) rejoin the Top 20 on improved P/E and ROE reads.</li>' +
                              '<li><strong>Dropouts:</strong> TFC, SFNC fall out of Top 40 after D/E flags near 2.0 threshold.</li>' +
                            '</ul>' +
                          '</div>' +
                          '<div class="alerts-signal-card">' +
                            '<p class="alerts-signal-date">Apr 15, 2026 · Market Close Digest</p>' +
                            '<ul class="alerts-signal-bullets">' +
                              '<li><strong>Momentum:</strong> NVDA, META extend leadership on improving estimates; Score moves +2 avg.</li>' +
                              '<li><strong>Re-rating:</strong> Energy basket re-rates higher on improving ROE and lower leverage.</li>' +
                              '<li><strong>Watch:</strong> DIS, NKE drift lower — guidance risks heading into Q2 prints.</li>' +
                            '</ul>' +
                          '</div>' +
                        '</div>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</div>'
              : '') +
          '</div>' +
        '</div>' +
        '<div class="pb-meta">' +
          authorBlock +
          readmeBlock +
          statusBlock +
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

  function registerPopover(host, closeFn) {
    host._popovers = host._popovers || [];
    host._popovers.push(closeFn);
  }
  function closeOtherPopovers(host, self) {
    (host._popovers || []).forEach(function (fn) { if (fn !== self) fn(); });
  }

  function setupFeedsPopover(host) {
    var trigger = host.querySelector('[data-feeds-trigger]');
    var popover = host.querySelector('[data-feeds-popover]');
    if (!trigger || !popover) return;

    function close() {
      popover.classList.remove('open');
      popover.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.classList.remove('is-open');
    }
    function open() {
      closeOtherPopovers(host, close);
      popover.classList.add('open');
      popover.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
      trigger.classList.add('is-open');
    }
    registerPopover(host, close);

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
      trigger.classList.remove('is-open');
      var agentToggleEl = popover.querySelector('[data-remix-agent-toggle]');
      if (agentToggleEl) agentToggleEl.setAttribute('aria-expanded', 'false');
    }
    function open() {
      closeOtherPopovers(host, close);
      popover.classList.add('open');
      popover.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
      trigger.classList.add('is-open');
    }
    registerPopover(host, close);

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
    if (cta) {
      cta.addEventListener('click', function (e) {
        e.stopPropagation();
        var title = host.getAttribute('title') || '';
        var prompt = buildRemixPrompt(title);
        try {
          window.parent.postMessage({ type: 'alva:remix', prompt: prompt, title: title }, '*');
        } catch (_) {}
        close();
      });
    }

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

  function setupDiscussTrigger(host) {
    var btn = host.querySelector('[data-discuss-trigger]');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      host.dispatchEvent(new CustomEvent('playbook-discuss-click', { bubbles: true }));
    });
  }

  function updateDiscussActive(host) {
    var btn = host.querySelector('[data-discuss-trigger]');
    if (!btn) return;
    var active = host.getAttribute('discuss-active') === 'true';
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  }

  function setupSharePopover(host) {
    var trigger = host.querySelector('[data-share-trigger]');
    var popover = host.querySelector('[data-share-popover]');
    if (!trigger || !popover) return;

    function close() {
      popover.classList.remove('open');
      popover.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.classList.remove('is-open');
    }
    function open() {
      closeOtherPopovers(host, close);
      popover.classList.add('open');
      popover.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
      trigger.classList.add('is-open');
    }
    registerPopover(host, close);

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (popover.classList.contains('open')) close(); else open();
    });

    var onDocClick = function (e) {
      if (!popover.classList.contains('open')) return;
      if (popover.contains(e.target) || trigger.contains(e.target)) return;
      close();
    };
    var onKeydown = function (e) { if (e.key === 'Escape') close(); };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeydown);
    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeydown);
    });

    var rows = popover.querySelectorAll('[data-share-option]');
    rows.forEach(function (row) {
      row.addEventListener('click', function (e) {
        e.stopPropagation();
        rows.forEach(function (r) {
          r.classList.remove('is-selected');
          r.setAttribute('aria-checked', 'false');
          var badge = r.querySelector('.share-popover-icon-badge');
          if (badge) badge.classList.remove('is-filled');
        });
        row.classList.add('is-selected');
        row.setAttribute('aria-checked', 'true');
        var badge = row.querySelector('.share-popover-icon-badge');
        if (badge) badge.classList.add('is-filled');
      });
    });

    var copyBtn = popover.querySelector('[data-share-copy]');
    if (copyBtn) {
      copyBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var icon = copyBtn.querySelector('[data-share-copy-icon]');
        var label = copyBtn.querySelector('[data-share-copy-label]');
        var ok = function () {
          if (icon) icon.classList.add('copied');
          if (label) label.textContent = 'Copied';
          setTimeout(function () {
            if (icon) icon.classList.remove('copied');
            if (label) label.textContent = 'Copy Link';
          }, 2000);
        };
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(window.location.href).then(ok).catch(function () {});
          }
        } catch (_) {}
      });
    }
  }

  function setupStarPopover(host) {
    var trigger = host.querySelector('[data-star-trigger]');
    if (!trigger) return;
    var alertsEnabled = host.hasAttribute('get-alerts')
      && host.getAttribute('get-alerts') !== 'false';
    var popover = host.querySelector('[data-star-popover]');
    if (popover && popover.parentNode) popover.parentNode.removeChild(popover);
    trigger.removeAttribute('aria-haspopup');
    trigger.removeAttribute('aria-expanded');

    if (alertsEnabled) return; // alerts variant handles star click in setupAlertsPopover

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      trigger.classList.toggle('is-starred');
      trigger.setAttribute('aria-pressed', trigger.classList.contains('is-starred') ? 'true' : 'false');
    });
  }

  function setupAlertsPopover(host) {
    var popover = host.querySelector('[data-alerts-popover]');
    if (!popover) return;
    var alertsBtn = host.querySelector('[data-alerts-trigger]');
    var starBtn = host.querySelector('[data-star-trigger]');

    function close() {
      popover.classList.remove('open');
      popover.setAttribute('aria-hidden', 'true');
      if (alertsBtn) {
        alertsBtn.setAttribute('aria-expanded', 'false');
        alertsBtn.classList.remove('is-open');
      }
      if (starBtn) starBtn.setAttribute('aria-expanded', 'false');
    }
    function open() {
      closeOtherPopovers(host, close);
      popover.classList.add('open');
      popover.setAttribute('aria-hidden', 'false');
      if (alertsBtn) {
        alertsBtn.setAttribute('aria-expanded', 'true');
        alertsBtn.classList.add('is-open');
      }
      if (starBtn) starBtn.setAttribute('aria-expanded', 'true');
    }
    registerPopover(host, close);

    if (alertsBtn) {
      alertsBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (popover.classList.contains('open')) close(); else open();
      });
    }
    if (starBtn) {
      var starOpenTimer = null;
      starBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var nowStarred = !starBtn.classList.contains('is-starred');
        starBtn.classList.toggle('is-starred', nowStarred);
        starBtn.setAttribute('aria-pressed', nowStarred ? 'true' : 'false');
        if (starOpenTimer) { clearTimeout(starOpenTimer); starOpenTimer = null; }
        if (nowStarred) {
          // Small delay so the star fill animates first, then the popover eases in.
          starOpenTimer = setTimeout(function () { open(); starOpenTimer = null; }, 240);
        } else {
          close();
        }
      });
      host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
        if (starOpenTimer) { clearTimeout(starOpenTimer); starOpenTimer = null; }
      });
    }

    // ── Connect buttons: fake loading → connected state ──
    var connectTimer = null;
    var connectBtns = popover.querySelectorAll('[data-connect-platform]');
    connectBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (btn.classList.contains('is-loading')) return;
        if (popover.classList.contains('is-connected')) return;
        // mark loading + disable all connect buttons
        connectBtns.forEach(function (b) { b.classList.add('is-disabled'); });
        btn.classList.remove('is-disabled');
        btn.classList.add('is-loading');
        btn.setAttribute('aria-busy', 'true');
        if (connectTimer) clearTimeout(connectTimer);
        connectTimer = setTimeout(function () {
          // transition to connected state
          var platform = btn.getAttribute('data-connect-platform') || 'telegram';
          var avatarEl = popover.querySelector('[data-alerts-avatar]');
          if (avatarEl) {
            avatarEl.setAttribute('data-platform', platform);
            var iconSrc = platform === 'discord'
              ? '/alva-infant/logo-social-discord.svg'
              : 'https://alva-ai-static.b-cdn.net/icons/logo-social-telegram.svg';
            if (avatarEl.tagName === 'IMG') avatarEl.setAttribute('src', iconSrc);
          }
          popover.classList.add('is-connected');
          // reset loading (so if user re-opens, buttons are fresh)
          btn.classList.remove('is-loading');
          btn.removeAttribute('aria-busy');
          connectBtns.forEach(function (b) { b.classList.remove('is-disabled'); });
          connectTimer = null;
        }, 1500);
      });
    });

    // Manage Accounts → navigate parent to Alva Agent settings
    var manageBtn = popover.querySelector('[data-alerts-manage]');
    if (manageBtn) {
      manageBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        try {
          (window.parent || window).postMessage({ type: 'alva:navigate', page: 'alva-agent' }, '*');
        } catch (_) {}
        close();
      });
    }

    // Receive Alerts toggle switch
    var switchBtn = popover.querySelector('[data-alerts-switch]');
    if (switchBtn) {
      switchBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var on = !switchBtn.classList.contains('on');
        switchBtn.classList.toggle('on', on);
        switchBtn.setAttribute('aria-checked', on ? 'true' : 'false');
      });
    }

    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      if (connectTimer) { clearTimeout(connectTimer); connectTimer = null; }
    });

    var onDocClick = function (e) {
      if (!popover.classList.contains('open')) return;
      if (popover.contains(e.target)) return;
      if (alertsBtn && alertsBtn.contains(e.target)) return;
      if (starBtn && starBtn.contains(e.target)) return;
      close();
    };
    var onKeydown = function (e) { if (e.key === 'Escape') close(); };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeydown);
    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeydown);
    });
  }

  class PlaybookHeader extends HTMLElement {
    static get observedAttributes() { return ['discuss-active']; }
    attributeChangedCallback(name) {
      if (name === 'discuss-active' && this._pbHeaderMounted) updateDiscussActive(this);
    }
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
        setupStarPopover(self);
        setupAlertsPopover(self);
        setupSharePopover(self);
        setupReadmeTrigger(self);
        setupDiscussTrigger(self);
        updateDiscussActive(self);
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
