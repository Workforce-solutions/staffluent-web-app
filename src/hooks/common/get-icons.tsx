import { clientLinks } from '@/data/client-links'
import { operationsManagersLinks } from '@/data/operations-managers-links'
import { SideLink, sidelinks } from '@/data/sidelinks'
import { teamLeaderLinks } from '@/data/team-leader-links'

// Function to flatten sidelinks and sub-links
const flattenLinks = (links: SideLink[]): SideLink[] => {
  return links.flatMap((link) =>
    link.sub ? [link, ...flattenLinks(link.sub)] : [link]
  )
}

// Generate iconObj dynamically
export const iconObj: Record<string, JSX.Element> = flattenLinks([
  ...sidelinks,
  ...operationsManagersLinks,
  ...teamLeaderLinks,
  ...clientLinks,
]).reduce(
  (acc, link) => {
    acc[link.href] = link.icon
    return acc
  },
  {} as Record<string, JSX.Element>
)
