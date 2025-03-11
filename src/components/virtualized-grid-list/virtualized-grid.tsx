import { useVirtualizer } from '@tanstack/react-virtual'
import { ReactNode, useRef } from 'react'

import { useColumnCount } from '@/hooks/useColumnCount'
import { cn } from '@/lib/utils'

import { VirtualizedRow } from './virtualized-row'

/**
 * Props para o componente VirtualizedGrid
 *
 * @template T - Tipo genérico dos itens na lista
 * @typedef {Object} VirtualizedGridProps
 * @property {T[]} items - Array de itens a serem renderizados na grid
 * @property {number} [gap=16] - Espaçamento vertical entre as linhas em pixels
 * @property {number} [overscan=3] - Número de linhas extras a serem renderizadas fora da viewport
 * @property {boolean} [isLoading] - Indica se os dados estão em carregamento
 * @property {string} [className] - Classes CSS adicionais para o container
 * @property {number} [estimateSize=440] - Altura estimada de cada linha em pixels
 * @property {string|number} [height] - Altura do container da grid
 * @property {ReactNode} [emptyComponent] - Componente a ser renderizado quando não há itens
 * @property {ReactNode} [loadingComponent] - Componente a ser renderizado durante o carregamento
 * @property {function} renderItem - Função que renderiza cada item individual
 */

type VirtualizedGridProps<T> = {
  items: T[]
  gap?: number
  overscan?: number
  isLoading?: boolean
  className?: string
  estimateSize?: number
  height?: string | number
  emptyComponent?: ReactNode
  loadingComponent?: ReactNode
  renderItem: (item: T, index: number) => ReactNode
}

/**
 * Componente de container da nossa lista grid virtualizada e responsiva.
 *
 * Este componente implementa uma grid virtualizada que:
 * 1. Renderiza apenas as linhas visíveis na viewport para melhorar a performance
 * 2. Adapta o número de colunas automaticamente com base na largura do container
 * 3. Suporta estados de carregamento e lista vazia
 * 4. Aplica efeitos visuais como fade nas bordas superior e inferior
 *
 * O componente usa TanStack Virtual para gerenciar a virtualização e o hook personalizado
 * useColumnCount para determinar o número de colunas com base no tamanho da tela.
 *
 * @template T - Tipo genérico dos itens na lista
 * @param {Readonly<VirtualizedGridProps<T>>} props - Propriedades do componente
 * @returns {ReactNode} Grid virtualizada com os itens renderizados
 *
 * @example
 * <VirtualizedGrid
 *   items={products}
 *   height="800px"
 *   gap={16}
 *   overscan={3}
 *   isLoading={isLoading}
 *   loadingComponent={<Spinner />}
 *   emptyComponent={<EmptyState />}
 *   renderItem={(product) => <ProductCard product={product} />}
 * />
 */
export function VirtualizedGrid<T>({
  items,
  height,
  gap = 16,
  overscan = 3,
  isLoading,
  className,
  renderItem,
  estimateSize = 440,
  emptyComponent,
  loadingComponent,
}: Readonly<VirtualizedGridProps<T>>) {
  // Referência para o container da grid
  const listContainerRef = useRef<HTMLDivElement>(null)
  // Determina o número de colunas com base na largura do container
  const columnCount = useColumnCount({ containerRef: listContainerRef })

  const isEmpty = items.length === 0 && !isLoading

  // Calcula o número total de linhas necessárias
  const rowCount = Math.ceil(items.length / columnCount)

  // Normaliza a altura do container para ser usado no CSS
  const listHeight = typeof height === 'number' ? `${height}px` : height

  // Configura o virtualizador para gerenciar as linhas
  const rowVirtualize = useVirtualizer({
    count: rowCount,
    getScrollElement: () => listContainerRef.current,
    estimateSize: () => estimateSize,
    overscan,
    gap,
  })
  // Obtém o tamanho total da lista virtualizada (altura)
  const listTotalHight = rowVirtualize.getTotalSize()

  // Obtém apenas a lista de linhas que devem ser renderizadas
  const rowsVirtualized = rowVirtualize.getVirtualItems()

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
        'relative mt-10 overflow-auto',
        'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary scrollbar-thumb-rounded-sm',
        className,
      )}
      style={{
        // Devemos sempre definir uma altura fixa do container, ex(600px)
        height: listHeight,
        // Efeito de fade nas extremidades superior e inferior da lista
        maskImage:
          'linear-gradient(to bottom, transparent, black 50px, black calc(100% - 50px), transparent)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent, black 50px, black calc(100% - 50px), transparent)',
      }}
    >
      <div
        className="relative"
        // Define a altura total dos itens se fossem renderizados de 1 vez(tipo 10_000px)
        style={{
          height: `${listTotalHight}px`,
        }}
      >
        {rowsVirtualized.map((virtualRow) => {
          const startIndex = virtualRow.index * columnCount

          return (
            <VirtualizedRow
              key={virtualRow.key}
              virtualRow={virtualRow}
              items={items}
              columnCount={columnCount}
              startIndex={startIndex}
              renderItem={renderItem}
            />
          )
        })}
      </div>
    </div>
  )
}
