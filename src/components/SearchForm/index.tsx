import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Search, SearchX } from 'lucide-react'
import { FormEvent, useState } from 'react'

import { IProduct } from '@/data/shoes'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

type SearchFormProps = {
  shoes: IProduct[]
  resultsBySearch: IProduct[]
  onResultsBySearch: (results: IProduct[]) => void
}

export function SearchForm({
  shoes,
  resultsBySearch,
  onResultsBySearch,
}: Readonly<SearchFormProps>) {
  const [parent] = useAutoAnimate()
  const [searchValue, setSearchValue] = useState('')

  const isDirty = shoes?.length !== resultsBySearch.length
  const hasResults = resultsBySearch.length > 0

  function handleSetSearchValue(event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value
    setSearchValue(value)
  }

  function handleReset() {
    onResultsBySearch(shoes || [])
    setSearchValue('')
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const hasSearchValue = searchValue?.trim().length > 0

    if (hasSearchValue) {
      if (shoes) {
        const results = shoes.filter((item) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase()),
        )

        onResultsBySearch(results)

        return
      }
    }

    handleReset()
  }

  return (
    <form
      id="search-form"
      ref={parent}
      onSubmit={handleSearch}
      className="flex items-center gap-4"
    >
      <Input
        id="search"
        name="search"
        type="search"
        value={searchValue}
        placeholder="Pesquisar..."
        onChange={handleSetSearchValue}
        className="max-w-md"
      />
      <Button type="submit" form="search-form">
        <Search className="h-5 w-5" />
        Buscar
      </Button>

      {isDirty && (
        <Button type="button" variant="outline" onClick={handleReset}>
          <SearchX className="h-5 w-5" />
          Limpar
        </Button>
      )}

      {hasResults && (
        <div className="ml-auto min-w-fit">
          <span className="font-semibold text-primary">
            {resultsBySearch.length} encontrado(s)
          </span>
        </div>
      )}
    </form>
  )
}
