import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { EmptyList } from '@/components/empty-list'
import { SearchForm } from '@/components/Form/SearchForm'
import Seo from '@/components/seo'
import { ShoesCardMemoized } from '@/components/shoes-card'
import { ShoesCardListSkeleton } from '@/components/shoes-card-list-skeleton'
import { VirtualizedGrid } from '@/components/virtualized-grid-list/virtualized-grid'
import { IShoes } from '@/data/shoes'
import { getShoes } from '@/services/requests/get-shoes'
import { MESSAGES } from '@/utils/messages'

export function Home() {
  const [searchParams] = useSearchParams()
  const titleParams = searchParams.get('title')

  const {
    data: shoes,
    isError,
    error,
    isPending: isShoesPending,
  } = useQuery({
    queryFn: () => getShoes({ title: titleParams }),
    queryKey: ['shoes', titleParams],
  })

  const shoesQuantity = shoes?.length ?? 0

  useEffect(() => {
    if (isError) {
      console.log(MESSAGES.ERRORS.GET_SHOES, error)
      toast.error(MESSAGES.ERRORS.GET_SHOES)
    }
  }, [isError, error])

  const renderShoesCard = useCallback((shoesItem: IShoes) => {
    return (
      <ShoesCardMemoized
        key={`shoes-${shoesItem.id}`}
        shoes={shoesItem}
        aspectRatio="portrait"
        data-testid={`shoes-card-${shoesItem.id}`}
      />
    )
  }, [])

  return (
    <>
      <Seo
        title="Produtos"
        description="Venha comprar seus tênis no melhor preço! Confira e veja seus produtos favoritos aqui, temos diversas opções para todos os gostos!"
      />
      <main className="ml-auto mr-auto space-y-4">
        <SearchForm
          resultsQuantity={shoesQuantity}
          isPending={isShoesPending}
        />
        <VirtualizedGrid
          items={shoes}
          renderItem={renderShoesCard}
          height="1000px"
          gap={16}
          overscan={3}
          isLoading={isShoesPending}
          loadingComponent={<ShoesCardListSkeleton />}
          emptyComponent={<EmptyList />}
        />
      </main>
    </>
  )
}
