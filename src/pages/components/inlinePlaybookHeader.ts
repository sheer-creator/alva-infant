import headerCss from './playbook-header.css?raw';
import headerJs from './playbook-header.js?raw';
import tokensCss from '../../styles/tokens.css?raw';

const TOKENS_LINK = '<link rel="stylesheet" href="./styles/tokens.css" />';
const CSS_LINK = '<link rel="stylesheet" href="./components/playbook-header.css" />';
const JS_SCRIPT = '<script src="./components/playbook-header.js" defer></script>';

/**
 * Playbook HTML files reference design tokens, header CSS and header JS via
 * relative <link>/<script> tags. When injected into an iframe via `srcDoc`,
 * relative URLs resolve against `about:srcdoc` and fail — so swap them for
 * inline <style>/<script> blocks.
 */
export function inlinePlaybookHeader(html: string): string {
  const safeJs = headerJs.replace(/<\/script>/gi, '<\\/script>');
  return html
    .replace(TOKENS_LINK, `<style>${tokensCss}</style>`)
    .replace(CSS_LINK, `<style>${headerCss}</style>`)
    .replace(JS_SCRIPT, `<script>${safeJs}</script>`);
}
