import { ColumnDef } from '@tanstack/react-table'

import { TableCell, TableRow } from '@/components/ui/table'

type TableBodyEmptyProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
}
/**
 ** Componente que renderiza uma linha vazia no corpo da tabela.
 *
 * Exibe uma célula única que se estende por todas as colunas,
 * contendo uma mensagem de "No results." quando não há dados para exibir.
 *
 * @template TData - Tipo dos dados da tabela.
 * @template TValue - Tipo do valor das colunas.
 * @param {Readonly<TableBodyEmptyProps<TData, TValue>>} props - Propriedades do componente.
 * @param {ColumnDef<TData, TValue>[]} props.columns - Array de definições das colunas.
 * @returns {JSX.Element} Elemento JSX representando a linha vazia da tabela.
 */
export function TableBodyEmpty<TData, TValue>({
  columns,
}: Readonly<TableBodyEmptyProps<TData, TValue>>) {
  return (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        No results.
      </TableCell>
    </TableRow>
  )
}
