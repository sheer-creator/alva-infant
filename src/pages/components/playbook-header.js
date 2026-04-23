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
    var comments = host.getAttribute('comments') || '';
    var description = host.getAttribute('description') || '';
    var feeds = readFeeds(host);

    var freqTooltip = lastUpdated
      ? '<span class="pb-freq-tip-anchor" role="tooltip">' +
          '<div class="tooltip">' +
            '<div class="tooltip-border"></div>' +
            '<div class="tooltip-text">Last Updated: ' + esc(lastUpdated) + '</div>' +
          '</div>' +
        '</span>'
      : '';
    var freqChip = freq
      ? '<span class="pb-freq-chip"' + (lastUpdated ? ' tabindex="0"' : '') + '><span class="pb-freq-dot" aria-hidden="true"></span>' + esc(freq) + freqTooltip + '</span>'
      : '';

    var authorBlock = owner
      ? '<div class="pb-meta-author">' +
          '<img class="pb-meta-avatar" src="' + avatarUrl(ownerSeed) + '" alt="' + esc(owner) + '" />' +
          '<span>' + esc(owner) + '</span>' +
        '</div><span class="pb-meta-sep">|</span>'
      : '';

    var readmeModal = host.getAttribute('readme-modal') || '';
    var readmeBlock = readmeModal
      ? '<button class="pb-meta-link pb-meta-link--readme" type="button" data-readme-trigger>' +
          '<span class="pb-meta-icon-badge" aria-hidden="true">' +
            '<img class="pb-meta-icon-img" src="https://alva-ai-static.b-cdn.net/icons/researcher-l1.svg" width="12" height="12" alt="" />' +
          '</span>' +
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
