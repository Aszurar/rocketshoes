import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { ShoesCardMemoized } from '@/components/shoes-card'
import { IShoes } from '@/data/shoes'
import { getShoes } from '@/services/requests/get-shoes'

export function Home() {
  const [shoes, setShoes] = useState<IShoes[]>([])

  async function onGetShoes() {
    try {
      const response = await getShoes()
      setShoes(response)
    } catch (error) {
      toast.error('Erro ao buscar os produtos')
    }
  }

  useEffect(() => {
    onGetShoes()
  }, [])

  return (
    <main>
      <div className="grid gap-x-4 gap-y-8 pb-4 lg:grid-cols-4">
        {shoes.map((shoe) => (
          <ShoesCardMemoized
            key={shoe.id}
            shoes={shoe}
            className="w-62.5"
            aspectRatio="portrait"
          />
        ))}
      </div>
    </main>
  )
}
