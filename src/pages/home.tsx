import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { EmptyList } from '@/components/empty-list'
import { ShoesCardMemoized } from '@/components/shoes-card'
import { ShoesCardListSkeleton } from '@/components/shoes-card-list-skeleton'
import { IShoes } from '@/data/shoes'
import { getShoes } from '@/services/requests/get-shoes'

// TODO
// [ ] - vERITIFACR TOOLTIP NOVAMENTE
// [ ] - Aumaentar lagura do sheet
// [ ] - Responsividade
// [ ] - Paginação da tabela em 5 por padrão
// [ ] - Acessibilidade

export function Home() {
  const [shoes, setShoes] = useState<IShoes[]>([])
  const [isGetShoesLoading, setIsGetShoesLoading] = useState(false)

  const isEmptyShoes = shoes.length === 0

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

  const shoesCardMemoizedList = shoes.map((shoe) => (
    <ShoesCardMemoized
      key={shoe.id}
      shoes={shoe}
      className="w-62.5"
      aspectRatio="portrait"
    />
  ))

  return (
    <main>
      <div className="grid justify-center gap-x-4 gap-y-8 pb-4 sm:grid-cols-2 sm:justify-start md:grid-cols-3 lg:grid-cols-4">
        {isGetShoesLoading && <ShoesCardListSkeleton />}
        {!isGetShoesLoading && shoesCardMemoizedList}
      </div>
      {isEmptyShoes && <EmptyList />}
    </main>
  )
}
