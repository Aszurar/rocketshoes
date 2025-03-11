import { VirtualItem } from '@tanstack/react-virtual'
import { ReactNode } from 'react'

/**
 * Props para o componente VirtualizedItem
 *
 * @template T - Tipo genérico dos itens na lista
 * @typedef {Object} VirtualizedItemProps
 * @property {VirtualItem} virtualRow - Objeto do TanStack Virtual que representa a linha virtual
 * @property {T[]} items - Array de itens a serem renderizados
 * @property {number} startIndex - Índice inicial para os itens na linha atual
 * @property {number} colIndex - Índice da coluna atual dentro da linha
 * @property {function} renderItem - Função de renderização que recebe o item/componente e seu índice
 */

type VirtualizedItemProps<T> = {
  virtualRow: VirtualItem
  items: T[]
  startIndex: number
  colIndex: number
  renderItem: (item: T, index: number) => ReactNode
}

/**
 * Componente que renderiza um único item dentro de uma linha virtualizada.
 *
 * Este componente é responsável por:
 * 1. Calcular o índice correto do item com base no índice inicial da linha e coluna atual
 * 2. Verificar se o índice está dentro dos limites do array de itens
 * 3. Renderizar o conteúdo usando a função renderItem ou um espaço vazio caso necessário
 *
 * @template T - Tipo genérico dos itens na lista
 * @param {Readonly<VirtualizedItemProps<T>>} props - Propriedades do componente
 * @returns {ReactNode} O item renderizado ou um espaço vazio
 *
 * @example
 * <VirtualizedItem
 *   virtualRow={virtualRow}
 *   items={products}
 *   startIndex={rowStartIndex}
 *   colIndex={2}
 *   renderItem={(product) => <ProductCard product={product} />}
 * />
 */
export function VirtualizedItem<T>({
  items,
  colIndex,
  startIndex,
  virtualRow,
  renderItem,
}: Readonly<VirtualizedItemProps<T>>) {
  // Calcula o índice absoluto do item no array, combinando o índice inicial da linha e a coluna atual
  const itemIndex = startIndex + colIndex

  // Verifica se o índice calculado está além do tamanho do array
  // Isso acontece quando a última linha não está completamente preenchida
  if (itemIndex >= items.length) {
    return <div key={`empty-${virtualRow.key}-${colIndex}`} />
  }

  const item = items[itemIndex]

  return renderItem(item, itemIndex)
}
