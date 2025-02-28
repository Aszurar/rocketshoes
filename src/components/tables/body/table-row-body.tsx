import { ColumnDef, Table } from '@tanstack/react-table'

import { TableBodyEmpty } from './table-body-empty'
import { TableBodyRowCell } from './table-body-row-cell'

type TableRowBodyProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  table: Table<TData>
}

/**
 ** Componente que renderiza o corpo da tabela.
 *
 * Verifica se há linhas na tabela. Se não houver, renderiza o componente
 * {@link TableBodyEmpty} para exibir uma mensagem de "No results". Caso contrário,
 * renderiza cada linha utilizando o componente {@link TableBodyRowCell}.
 *
 * @template TData - Tipo dos dados da tabela.
 * @template TValue - Tipo do valor das colunas.
 * @param {Readonly<TableRowBodyProps<TData, TValue>>} props - Propriedades do componente.
 * @param {ColumnDef<TData, TValue>[]} props.columns - Array de definições das colunas.
 * @param {Table<TData>} props.table - Instância da tabela do Tanstack Table.
 * @returns {JSX.Element} Elemento JSX contendo o corpo da tabela.
 */
export function TableRowBody<TData, TValue>({
  table,
  columns,
}: Readonly<TableRowBodyProps<TData, TValue>>) {
  const hasRows = table.getRowModel().rows?.length

  if (!hasRows) {
    return <TableBodyEmpty columns={columns} />
  }

  const rows = table.getRowModel().rows

  return (
    <>
      {rows.map((row) => (
        <TableBodyRowCell key={row.id} row={row} />
      ))}
    </>
  )
}
