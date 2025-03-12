import { Link } from 'react-router-dom'

import LogoSVG from '@/assets/logo.svg'
import DarkLogoSVG from '@/assets/logo-dark.svg'
import { useTheme } from '@/hooks/useTheme'
import { ROUTES } from '@/router/utils'
import { THEME } from '@/utils/theme'

import CartMenu from './cart-menu'
import { ThemeToggle } from './theme/theme-toggle'
export function Header() {
  const { theme } = useTheme()

  const Logo = theme === THEME.Dark ? DarkLogoSVG : LogoSVG

  return (
    <header className="flex items-center justify-between">
      <Link to={ROUTES.home}>
        <img src={Logo} alt="." width={276} height={36} />
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />

        <CartMenu />
      </div>
    </header>
  )
}
