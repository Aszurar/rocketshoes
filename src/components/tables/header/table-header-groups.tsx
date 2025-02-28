import { HeaderGroup } from '@tanstack/react-table'

import { TableHeadCell } from './table-head-cell'

type TableHeaderGroupsProps<TData> = {
  headerGroup: HeaderGroup<TData>
}

/**
 ** Renderiza um grupo de cabeçalhos da tabela.
 *
 * Este componente recebe um grupo de cabeçalhos (headerGroup) e itera sobre cada cabeçalho
 * contido nele utilizando o método `.map()`. Para cada cabeçalho, é renderizado o componente
 * <TableHeadCell> que é responsável por exibir o conteúdo da célula do cabeçalho.
 *
 * @template TData - O tipo de dado utilizado na tabela.
 * @param {Readonly<TableHeaderGroupsProps<TData>>} props - As propriedades do componente.
 * @param {HeaderGroup<TData>} props.headerGroup - O grupo de cabeçalhos que será renderizado.
 * @returns {JSX.Element} Um fragmento contendo os componentes de células do cabeçalho para esse grupo.
 */
export function TableHeaderGroups<TData>({
  headerGroup,
}: Readonly<TableHeaderGroupsProps<TData>>) {
  return (
    <>
      {headerGroup.headers.map((header) => (
        <TableHeadCell key={header.id} header={header} />
      ))}
    </>
  )
}
