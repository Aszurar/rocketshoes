import { VirtualItem } from '@tanstack/react-virtual'
import { ReactNode } from 'react'

/**
 * Props para o componente VirtualizedItem
 * @template T Tipo dos itens na lista
 */
type VirtualizedItemProps<T> = {
  virtualItem: VirtualItem
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
}

/**
 * Componente responsável por renderizar um item individual em uma lista virtualizada.
 *
 * Este componente posiciona cada item usando posicionamento absoluto e transformações CSS
 * para garantir alta performance durante a rolagem. Ele recebe um objeto VirtualItem do
 * TanStack Virtual que contém informações de posicionamento e dimensionamento.
 *
 * @template T Tipo dos itens na lista
 * @param {VirtualizedItemProps<T>} props Propriedades do componente
 * @param {VirtualItem} props.virtualItem Item virtual fornecido pelo virtualizador
 * @param {T[]} props.items Array contendo todos os itens da lista
 * @param {Function} props.renderItem Função que renderiza cada item individual
 * @returns {ReactNode} O item renderizado na posição correta
 *
 * @example
 * <VirtualizedItem
 *   virtualItem={virtualRow}
 *   items={products}
 *   renderItem={(product, index) => <ProductCard product={product} />}
 * />
 */
export function VirtualizedItem<T>({
  virtualItem,
  items,
  renderItem,
}: Readonly<VirtualizedItemProps<T>>) {
  // Obtém o item real da lista com base no índice do item virtual
  const item = items[virtualItem.index]

  // Proteção contra índices fora dos limites da lista
  if (virtualItem.index >= items.length) {
    return <div key={`list-empty-${virtualItem.key}`} />
  }

  return (
    <div
      key={virtualItem.key}
      className="absolute"
      style={{
        // A linha tem a altura exata do tamanho calculado pelo TanStack Virtual
        height: `${virtualItem.size}px`,
        // Posiciona a linha verticalmente usando transform para melhor performance
        // Transform é preferido em vez de top/left para melhor desempenho de renderização
        transform: `translateY(${virtualItem.start}px)`,
      }}
    >
      {renderItem(item, virtualItem.index)}
    </div>
  )
}
