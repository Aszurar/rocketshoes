import { useEffect, useState } from 'react'

import { WINDOW_SIZES } from '@/utils/enums'

export function useResponsiveDevice() {
  const [currentBrowserWidth, setCurrentBrowserWidth] = useState(
    window.innerWidth,
  )
  const isMobile = currentBrowserWidth < WINDOW_SIZES.xs

  function onUpdateCurrentBrowserWidth() {
    setCurrentBrowserWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', onUpdateCurrentBrowserWidth)
    return () => {
      window.removeEventListener('resize', onUpdateCurrentBrowserWidth)
    }
  }, [])

  return { isMobile }
}
