import { SideLink } from '@/data/sidelinks'
import { useLocation } from 'react-router-dom'

export default function useCheckActiveNav() {
  const { pathname } = useLocation()

  const checkActiveNav = (item: SideLink) => {
    if (item.sub) {
      return item.sub.some((subItem) => pathname === subItem.href)
    }
    return pathname === item.href
  }

  return { checkActiveNav }
}
