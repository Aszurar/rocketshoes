import LogoSVG from '@/assets/logo.svg'
import DarkLogoSVG from '@/assets/logo-dark.svg'
import { useTheme } from '@/hooks/useTheme'
import { THEME } from '@/utils/theme'

import CartMenu from './cart-menu'
import { ThemeToggle } from './theme/theme-toggle'

export function Header() {
  const { theme } = useTheme()

  const Logo = theme === THEME.Dark ? DarkLogoSVG : LogoSVG

  return (
    <header className="flex items-center justify-between">
      <img src={Logo} alt="" />

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <CartMenu />
      </div>
    </header>
  )
}
