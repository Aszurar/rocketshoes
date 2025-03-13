import { useEffect, useState } from 'react'

type UseDebounceProps<T> = {
  value: T
  delay: number
}

/**
 * Hook que atrasa a atualização de um valor até que um período de inatividade ocorra.
 *
 * Útil para evitar operações caras (como chamadas de API, recálculos complexos)
 * quando um valor muda com alta frequência, como durante digitação ou redimensionamento.
 *
 * @template T Tipo do valor a ser debounced
 * @param {T} value O valor que será debounced
 * @param {number} delay Tempo de espera em milissegundos após a última mudança
 * @returns {T} O valor atualizado após o período de delay
 *
 * @example
 * // Para input de pesquisa
 * const [search, setSearch] = useState('');
 * const debouncedSearch = useDebounce(search, 500);
 *
 * useEffect(() => {
 *   // Essa API só é chamada 500ms após o usuário parar de digitar
 *   if (debouncedSearch) searchAPI(debouncedSearch);
 * }, [debouncedSearch]);
 */
function useDebounce<T>({ delay, value }: UseDebounceProps<T>): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export { useDebounce }
