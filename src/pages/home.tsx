import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { EmptyList } from '@/components/empty-list'
import { ShoesCardMemoized } from '@/components/shoes-card'
import { ShoesCardListSkeleton } from '@/components/shoes-card-list-skeleton'
import { VirtualizedGrid } from '@/components/virtualized-grid-list/virtualized-grid'
import { IShoes } from '@/data/shoes'
import { getShoes } from '@/services/requests/get-shoes'

// TODO
// [ ] - Acessibilidade

export function Home() {
  const [shoes, setShoes] = useState<IShoes[]>([])
  const [isGetShoesLoading, setIsGetShoesLoading] = useState(false)

  async function onGetShoes() {
    try {
      setIsGetShoesLoading(true)
      const response = await getShoes()
      setShoes(response)
    } catch (error) {
      console.error('Erro ao buscar os produtos', error)
      toast.error('Erro ao buscar os produtos')
    } finally {
      setIsGetShoesLoading(false)
    }
  }

  useEffect(() => {
    onGetShoes()
  }, [])

  const renderShoesCard = useCallback((shoesItem: IShoes) => {
    return (
      <ShoesCardMemoized
        key={`shoes-${shoesItem.id}`}
        shoes={shoesItem}
        aspectRatio="portrait"
      />
    )
  }, [])

  return (
    <main className="ml-auto mr-auto">
      <VirtualizedGrid
        items={shoes}
        renderItem={renderShoesCard}
        height="1000px"
        gap={16}
        isLoading={isGetShoesLoading}
        loadingComponent={<ShoesCardListSkeleton />}
        emptyComponent={<EmptyList />}
      />
    </main>
  )
}
