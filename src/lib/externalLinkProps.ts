/**
 * Anchor props for a link that navigates away from this site.
 *
 * `target="_blank"` alone leaves the new page holding `window.opener`, a live
 * reference back to this tab - reverse tabnabbing, where the opened page
 * navigates the opener somewhere else while the visitor is looking at the new
 * tab. `rel="noopener"` cuts that reference; `noreferrer` additionally drops
 * the `Referer` header, since content links can point anywhere a resume or a
 * "Source" link says to. See docs/adr/ADR-007-security-posture.md.
 *
 * `mailto:` is excluded: it opens the visitor's mail client, not a browsing
 * context, so there is no opener to cut and no referrer to send.
 */
export function externalLinkProps(href: string): { target?: '_blank'; rel?: string } {
  if (href.startsWith('mailto:')) return {};
  return { target: '_blank', rel: 'noopener noreferrer' };
}
