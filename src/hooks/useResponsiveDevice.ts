import { useEffect, useState } from 'react'

import { WINDOW_SIZES } from '@/utils/enums'

import { useDebounce } from './useDebounce'

/**
 * Hook para detectar se o dispositivo atual é um dispositivo móvel
 * baseado na largura da janela do navegador.
 *
 * Este hook adiciona um event listener para o evento 'resize' da janela
 * e atualiza o estado quando a largura da janela muda. O event listener
 * é removido quando o componente é desmontado para evitar memory leaks.
 *
 * Utiliza o hook useDebounce para evitar atualizações frequentes durante
 * o redimensionamento da janela.
 *
 * @param {number} [delay=300] - O tempo de espera em milissegundos para o debounce
 * @returns {boolean} Indica se o dispositivo atual é considerado um dispositivo móvel
 * (true se a largura da janela for menor que WINDOW_SIZES.xs)
 */
export function useResponsiveDevice(delay = 300) {
  const [currentBrowserWidth, setCurrentBrowserWidth] = useState(
    window.innerWidth,
  )
  const debouncedWidth = useDebounce({
    delay,
    value: currentBrowserWidth,
  })

  const isMobile = debouncedWidth < WINDOW_SIZES.xs

  function onUpdateCurrentBrowserWidth() {
    setCurrentBrowserWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', onUpdateCurrentBrowserWidth)
    return () => {
      window.removeEventListener('resize', onUpdateCurrentBrowserWidth)
    }
  }, [])

  return isMobile
}
