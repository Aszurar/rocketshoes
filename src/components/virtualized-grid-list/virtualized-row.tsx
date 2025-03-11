import { VirtualItem } from '@tanstack/react-virtual'
import { ReactNode } from 'react'

import { VirtualizedItem } from './virtualized-item'

/**
 * Props para o componente VirtualizedRow
 *
 * @template T - Tipo genérico dos itens na lista
 * @typedef {Object} VirtualizedRowProps
 * @property {VirtualItem} virtualRow - Objeto do TanStack Virtual que representa a linha virtual e contém propriedades como key, index, start e size
 * @property {T[]} items - Array completo de itens a serem renderizados na grid
 * @property {number} columnCount - Número de colunas na grid, calculado com base na largura do container
 * @property {number} startIndex - Índice inicial para os itens nesta linha (calculado como virtualRow.index * columnCount)
 * @property {function} renderItem - Função de renderização que recebe o item e seu índice e retorna um elemento React
 */
type VirtualizedRowProps<T> = {
  virtualRow: VirtualItem
  items: T[]
  columnCount: number
  startIndex: number
  renderItem: (item: T, index: number) => ReactNode
}

/**
 * Componente que renderiza uma linha virtualizada dentro de um grid.
 *
 * Este componente é responsável por:
 * 1. Posicionar a linha corretamente dentro do container usando posicionamento absoluto
 * 2. Definir o layout de grid com o número apropriado de colunas
 * 3. Renderizar cada célula da linha usando o componente VirtualizedItem
 *
 * A linha é posicionada verticalmente usando transform: translateY() com base no
 * valor virtualRow.start fornecido pelo TanStack Virtual, que calcula a posição
 * correta considerando linhas virtualizadas que vêm antes dela.
 *
 * @template T - Tipo genérico dos itens na lista
 * @param {Readonly<VirtualizedRowProps<T>>} props - Propriedades do componente
 * @returns {ReactNode} Uma linha do grid contendo múltiplos itens virtualizados
 *
 * @example
 * <VirtualizedRow
 *   virtualRow={virtualRow}
 *   items={products}
 *   columnCount={4}
 *   startIndex={virtualRow.index * 4}
 *   renderItem={(product) => <ProductCard product={product} />}
 * />
 */
export function VirtualizedRow<T>({
  virtualRow,
  items,
  columnCount,
  startIndex,
  renderItem,
}: Readonly<VirtualizedRowProps<T>>) {
  // Cria um array com o número exato de colunas para mapear
  // Usamos apenas para iterar, e renderizar cada célula da linha
  const columnsVirtualized = Array.from({ length: columnCount })

  return (
    <div
      key={virtualRow.key}
      className="absolute left-0 top-0 grid w-full"
      style={{
        // A linha tem a altura exata do tamanho calculado pelo TanStack Virtual
        height: `${virtualRow.size}px`,
        // Posiciona a linha verticalmente usando transform para melhor performance
        transform: `translateY(${virtualRow.start}px)`,
        // Define o layout de grid com colunas de tamanho igual
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
      }}
    >
      {columnsVirtualized.map((_, colIndex) => (
        <VirtualizedItem
          key={`virtualized-item-${virtualRow.key}-${colIndex}`}
          items={items}
          colIndex={colIndex}
          startIndex={startIndex}
          virtualRow={virtualRow}
          renderItem={renderItem}
        />
      ))}
    </div>
  )
}
