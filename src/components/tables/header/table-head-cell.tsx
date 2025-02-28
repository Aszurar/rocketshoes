import { flexRender, Header } from '@tanstack/react-table'

import { TableHead } from '@/components/ui/table'

type TableHeadCellProps<IData> = {
  header: Header<IData, unknown>
}

/**
 ** Renderiza uma célula do cabeçalho da tabela.
 *
 * Este componente utiliza o método `flexRender` para renderizar o conteúdo do cabeçalho,
 * utilizando a definição da coluna (`header.column.columnDef.header`) e seu contexto (`header.getContext()`).
 * A variável `isShowFlexRender` é definida como o inverso de `header.isPlaceholder`. Assim,
 * se `header.isPlaceholder` for `false`, o conteúdo será renderizado; caso contrário, nada é exibido.
 *
 * @template IData - O tipo de dado utilizado na tabela.
 * @param {Readonly<TableHeadCellProps<IData>>} props - As propriedades do componente.
 * @param {Header<IData, unknown>} props.header - A instância do cabeçalho que contém a definição e contexto para renderização.
 * @returns {JSX.Element} Um elemento JSX representando uma célula de cabeçalho.
 */
export function TableHeadCell<IData>({
  header,
}: Readonly<TableHeadCellProps<IData>>) {
  const isShowFlexRender = Boolean(!header.isPlaceholder)

  return (
    <TableHead key={header.id} className="text-center font-semibold">
      {isShowFlexRender &&
        flexRender(header.column.columnDef.header, header.getContext())}
    </TableHead>
  )
}
