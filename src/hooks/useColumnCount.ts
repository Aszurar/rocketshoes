import { RefObject, useEffect, useState } from 'react'

import { COLUMNS_COUNT } from '@/utils/enums'
import { calculateColumnCount } from '@/utils/virtualize'

type UseColumnCountProps = {
  containerRef: RefObject<HTMLDivElement>
}
// TODO - Anotar sobre o ResizeObserver
/**
 * Hook personalizado para calcular e monitorar dinamicamente o número de colunas
 * da listagem virtualizada em grid com base na largura do container ou da janela.
 *
 * Este hook resolve o problema de inicialização quando o containerRef ainda não está disponível,
 * usando a largura da janela como valor inicial e atualizando quando o container for montado.
 *
 * @param {UseColumnCountProps} props - Propriedades do hook
 * @returns {number} O número de colunas calculado
 *
 * @example
 * // Em seu componente:
 * const containerRef = useRef<HTMLDivElement>(null);
 * const columnCount = useColumnCount({ containerRef });
 */
export function useColumnCount({ containerRef }: UseColumnCountProps) {
  const [columnCount, setColumnCount] = useState(() => {
    // Verifica se estamos no navegador (não no SSR) ou se temos
    // o objeto window disponível
    const isWindow = typeof window !== 'undefined'
    if (isWindow) {
      // Caso tenhamos o objeto window disponível, calculamos
      // o número de colunas com base na largura da janela
      const windowWidthSize = window.innerWidth
      return calculateColumnCount(windowWidthSize)
    }

    // Caso contrário, retornamos um valor padrão para o número de colunas
    return COLUMNS_COUNT.xs
  })

  useEffect(() => {
    /**
     * Função para atualizar o número de colunas com base na largura disponível.
     * Usa a largura do container quando disponível, ou a largura da janela como fallback.
     */
    const updateColumnCount = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        setColumnCount(calculateColumnCount(containerWidth))
      } else {
        const windowWidthSize = window.innerWidth
        setColumnCount(calculateColumnCount(windowWidthSize))
      }
    }

    // Calcula o número de colunas imediatamente após montagem
    updateColumnCount()

    // Configura um ResizeObserver para detectar mudanças na dimensão do container
    const resizeObserver = new ResizeObserver(updateColumnCount)

    // Se o container estiver disponível, começa a observá-lo
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // Adiciona listener para redimensionamento da janela como backup
    // Isso é útil em navegadores que não suportam ResizeObserver
    // e também para a primeira renderização
    window.addEventListener('resize', updateColumnCount)

    // Função de limpeza para evitar memory leaks
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateColumnCount)
    }
  }, [containerRef])

  return columnCount
}
