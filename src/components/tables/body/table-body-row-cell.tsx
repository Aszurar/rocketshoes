import { Cell, flexRender, Row } from '@tanstack/react-table'

import { TableCell, TableRow } from '@/components/ui/table'

type TableRowBodyCellProps<TData> = {
  row: Row<TData>
}

/**
 ** Componente que renderiza uma linha do corpo da tabela.
 *
 * Itera sobre as células visíveis da linha fornecida, renderizando cada uma
 * utilizando a função `flexRender` do Tanstack Table.
 *
 * @template TData - Tipo dos dados da linha.
 * @param {Readonly<TableRowBodyCellProps<TData>>} props - Propriedades do componente.
 * @param {Row<TData>} props.row - A linha da tabela a ser renderizada.
 * @returns {JSX.Element} Elemento JSX representando a linha renderizada com suas células.
 */
export function TableBodyRowCell<TData>({
  row,
}: Readonly<TableRowBodyCellProps<TData>>) {
  const rowVisibleCells = row.getVisibleCells()
  const isRowSelected = row.getIsSelected()

  const flexRenderComponent = (cell: Cell<TData, unknown>) => {
    return flexRender(cell.column.columnDef.cell, cell.getContext())
  }

  return (
    <TableRow key={row.id} data-state={isRowSelected && 'selected'}>
      {rowVisibleCells.map((cell) => (
        <TableCell key={cell.id} className="text-center">
          {flexRenderComponent(cell)}
        </TableCell>
      ))}
    </TableRow>
  )
}
