import { useVirtualizer } from '@tanstack/react-virtual'
import { ReactNode, useRef } from 'react'

import { cn } from '@/lib/utils'

import { VirtualizedItem } from './virtualized-item'

/**
 * Props para o componente VirtualizedList
 * @template T Tipo dos itens na lista
 */
type VirtualizedListProps<T> = {
  items: T[]
  gap?: number
  overscan?: number
  isLoading?: boolean
  className?: string
  estimateSize: number
  height: string | number
  isMaxHeight?: boolean
  emptyComponent?: ReactNode
  loadingComponent?: ReactNode
  renderItem: (item: T, index: number) => ReactNode
}

/**
 * Componente de lista virtualizada para renderização eficiente de grandes conjuntos de dados.
 *
 * Este componente implementa virtualização vertical (coluna única) usando TanStack Virtual,
 * renderizando apenas os itens visíveis na viewport mais um número configurável de itens
 * adicionais (overscan) para melhorar a experiência de rolagem.
 *
 * @template T Tipo dos itens na lista
 * @param {VirtualizedListProps<T>} props Propriedades do componente
 * @returns {ReactNode} Lista virtualizada renderizada
 *
 * @example
 * <VirtualizedList
 *   items={products}
 *   renderItem={(product, index) => <ProductCard product={product} />}
 *   height="600px"
 *   estimateSize={110}
 *   gap={16}
 *   overscan={2}
 *   emptyComponent={<EmptyList />}
 *   loadingComponent={<LoadingSkeleton />}
 * />
 */
export function VirtualizedList<T>({
  items,
  gap = 16,
  overscan = 2,
  height,
  isMaxHeight = false,
  isLoading,
  className,
  renderItem,
  estimateSize,
  emptyComponent,
  loadingComponent,
}: Readonly<VirtualizedListProps<T>>) {
  // Referência para o container da lista
  const listContainerRef = useRef<HTMLDivElement>(null)

  const totalItems = items.length

  // Normaliza a altura do container para ser usado no CSS
  const listHeight = typeof height === 'number' ? `${height}px` : height
  // Se for maxHeight, o aplique, se não, aplique height
  const listContainerStyle = {
    [isMaxHeight ? 'maxHeight' : 'height']: listHeight,
  }

  const isEmpty = items.length === 0 && !isLoading

  /**
   * Configura o virtualizador para gerenciar os itens visíveis
   * - count: número total de itens na lista
   * - getScrollElement: função que retorna o elemento de rolagem (container)
   * - estimateSize: altura estimada de cada item (importante para cálculos iniciais)
   * - overscan: número de itens extras a renderizar fora da área visível
   * - gap: espaçamento entre itens
   */
  const rowVirtualize = useVirtualizer({
    count: totalItems,
    getScrollElement: () => listContainerRef.current,
    estimateSize: () => estimateSize,
    overscan,
    gap,
  })

  // Obtém o tamanho total da lista virtualizada (altura)
  const listTotalHight = rowVirtualize.getTotalSize()

  // Obtém apenas a lista de linhas que devem ser renderizadas
  const itemsVirtualized = rowVirtualize.getVirtualItems()

  if (isLoading && loadingComponent) {
    return <>{loadingComponent}</>
  }

  if (isEmpty && emptyComponent) {
    return <>{emptyComponent}</>
  }

  return (
    <div
      ref={listContainerRef}
      className={cn(
        'xs:mt-5 relative mt-2 overflow-y-auto overflow-x-hidden sm:mt-10',
        'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary scrollbar-thumb-rounded-sm',
        className,
      )}
      // Devemos sempre definir uma altura fixa do container, ex(600px)
      style={listContainerStyle}
    >
      <div
        className="relative flex flex-col items-center"
        // Define a altura total como se todos os itens estivessem renderizados ex(10_000px)
        // Isso permite que a barra de rolagem reflita o tamanho real da lista
        style={{
          height: `${listTotalHight}px`,
        }}
      >
        {itemsVirtualized.map((virtualItem) => {
          return (
            <VirtualizedItem
              key={virtualItem.key}
              virtualItem={virtualItem}
              items={items}
              renderItem={renderItem}
            />
          )
        })}
      </div>
    </div>
  )
}
