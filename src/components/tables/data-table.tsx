import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Table, TableBody, TableHeader } from '@/components/ui/table'
import { useAppDispatch } from '@/store'
import { clearCart } from '@/store/slices/cart'

import { ConfirmAlert } from '../confirm-alert'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { TableRowBody } from './body/table-row-body'
import { DataTableViewOptions } from './columns/data-table-view-options'
import { TableRowHeader } from './header/table-row-header'
import { DataTablePagination } from './pagination'

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

// TODO
// - [ ] Note that some transformations to get only de ids of selected rows e make a Set or a list to add
// a global state some zustand or redux
// - [ ] Note that some transformations to use a manual pagination with request from api to get the next
// page of data, passing the page index and page size to the api
// - [ ] Note that some transformations to sorting and filtering to use a request from api to get the
// data sorted and filtered
export function DataTable<TData, TValue>({
  columns,
  data,
}: Readonly<DataTableProps<TData, TValue>>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const dispatch = useAppDispatch()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  const hasData = data.length > 0

  const filterValue =
    (table.getColumn('title')?.getFilterValue() as string) ?? ''

  function handleFilterChange(event: React.ChangeEvent<HTMLInputElement>) {
    table.getColumn('title')?.setFilterValue(event.target.value)
  }

  function handleClearCart() {
    dispatch(clearCart())
  }

  return (
    <div className="flex flex-col gap-1">
      <section className="flex items-center gap-4 py-4">
        <Input
          placeholder="Filtrar Produtos..."
          value={filterValue}
          onChange={handleFilterChange}
          className="max-w-sm"
        />

        <div className="ml-auto flex items-center gap-4">
          <ConfirmAlert
            asChild
            title="Remover todos itens"
            description="Você tem certeza que deseja remover todos os itens do carrinho?"
            onConfirm={handleClearCart}
          >
            <Button disabled={!hasData} variant="destructive" size="sm">
              <Trash2 className="h-4 w-4" />
              Limpar carrinho
            </Button>
          </ConfirmAlert>

          <DataTableViewOptions table={table} />
        </div>
      </section>
      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRowHeader table={table} />
          </TableHeader>
          <TableBody>
            <TableRowBody columns={columns} table={table} />
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  )
}
