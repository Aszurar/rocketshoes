import { Table } from '@tanstack/react-table'

import { TableRow } from '@/components/ui/table'

import { TableHeaderGroups } from './table-header-groups'

type TableRowHeaderProps<TData> = {
  table: Table<TData>
}

/**
 ** Renderiza as linhas de cabeçalho da tabela.
 *
 * Este componente utiliza os grupos de cabeçalho da tabela (obtidos através de `table.getHeaderGroups()`)
 * para renderizar cada linha do cabeçalho. Cada grupo de cabeçalho corresponde a uma linha no cabeçalho da tabela,
 * o que é útil em casos onde a tabela possui múltiplos níveis de cabeçalho (por exemplo, colunas agrupadas).
 *
 * O método `.map()` é utilizado para iterar sobre o array de grupos de cabeçalho. Para cada grupo,
 * é renderizado um componente <TableRow> com uma chave única derivada do id do grupo. Dentro de cada linha,
 * o componente <TableHeaderGroups> é utilizado para exibir as células individuais do cabeçalho.
 *
 * @template TData - O tipo de dado utilizado na tabela.
 * @param {Readonly<TableRowHeaderProps<TData>>} props - As propriedades do componente.
 * @param {Table<TData>} props.table - A instância da tabela que fornece os grupos de cabeçalho.
 * @returns {JSX.Element} Uma coleção de linhas de cabeçalho da tabela.
 */
export function TableRowHeader<TData>({
  table,
}: Readonly<TableRowHeaderProps<TData>>) {
  const headerGroups = table.getHeaderGroups()

  return (
    <>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          <TableHeaderGroups headerGroup={headerGroup} />
        </TableRow>
      ))}
    </>
  )
}
