import { ShoppingCart } from 'lucide-react'

import LogoSVG from '@/assets/logo.svg'
import DarkLogoSVG from '@/assets/logo-dark.svg'
import { useTheme } from '@/hooks/useTheme'
import { THEME } from '@/utils/theme'

import { ThemeToggle } from './theme/theme-toggle'
import { Button } from './ui/button'

export function Header() {
  const { theme } = useTheme()

  const Logo = theme === THEME.Dark ? DarkLogoSVG : LogoSVG

  return (
    <header className="flex items-center justify-between">
      <img src={Logo} alt="" />

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button size="sm">
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
