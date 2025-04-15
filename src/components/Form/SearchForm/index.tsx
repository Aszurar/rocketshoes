import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Search, SearchX } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type SearchFormProps = {
  resultsQuantity: number
  isPending: boolean
}

export function SearchForm({
  resultsQuantity,
  isPending,
}: Readonly<SearchFormProps>) {
  const [parent] = useAutoAnimate()
  const [searchValue, setSearchValue] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  const titleParams = searchParams.get('title')

  const isFiltered = !!titleParams && titleParams.length > 0

  const hasSearchValue = searchValue?.trim().length > 0
  const hasResults = resultsQuantity > 0

  function handleSetSearchValue(event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value
    setSearchValue(value)
  }

  function handleReset() {
    setSearchParams((prevState) => {
      prevState.delete('title')
      return prevState
    })

    setSearchValue('')
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSearchParams((prevState) => {
      if (hasSearchValue) {
        prevState.set('title', searchValue)
      } else {
        prevState.delete('title')
      }

      return prevState
    })
  }

  return (
    <form
      id="search-form"
      ref={parent}
      onSubmit={handleSearch}
      className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:gap-4 sm:space-y-0"
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
      <div className="flex items-center gap-2">
        <Button
          type="submit"
          form="search-form"
          isLoading={isPending}
          className="min-w-28"
        >
          <Search className="h-5 w-5" />
          Buscar
        </Button>

        {isFiltered && (
          <Button type="button" variant="outline" onClick={handleReset}>
            <SearchX className="h-5 w-5" />
            Limpar
          </Button>
        )}
      </div>

      {hasResults && (
        <div className="ml-auto min-w-fit text-center sm:text-start">
          <span className="font-semibold text-primary">
            {resultsQuantity} encontrado(s)
          </span>
        </div>
      )}
    </form>
  )
}
