import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { ShoesCardMemoized } from '@/components/shoes-card'
import { ShoesCardListSkeleton } from '@/components/shoes-card-list-skeleton'
import { IShoes } from '@/data/shoes'
import { getShoes } from '@/services/requests/get-shoes'

export function Home() {
  const [shoes, setShoes] = useState<IShoes[]>([])
  const [isGetShoesLoading, setIsGetShoesLoading] = useState(false)

  async function onGetShoes() {
    try {
      setIsGetShoesLoading(true)
      const response = await getShoes()
      setShoes(response)
    } catch (error) {
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
      <div className="grid gap-x-4 gap-y-8 pb-4 lg:grid-cols-4">
        {isGetShoesLoading && <ShoesCardListSkeleton />}
        {!isGetShoesLoading && shoesCardMemoizedList}
      </div>
    </main>
  )
}
