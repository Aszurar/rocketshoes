import { Table } from '@tanstack/react-table'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LABELS } from '@/utils/labels'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

const QUANTITY_PAGES_OPTIONS = [5, 10, 20, 30, 40, 50]

export function DataTablePagination<TData>({
  table,
}: Readonly<DataTablePaginationProps<TData>>) {
  const tablePageSize = table.getState().pagination.pageSize
  const tablePageIndex = table.getState().pagination.pageIndex
  const tablePageCount = table.getPageCount()

  const currentPage = tablePageIndex + 1

  return (
    <div className="flex items-center justify-between space-x-6 px-2 lg:space-x-8">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Linhas por página</p>
        <Select
          value={`${tablePageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value))
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={tablePageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {QUANTITY_PAGES_OPTIONS.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Página {currentPage} de {tablePageCount}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          title={LABELS.PAGINATION.GO_TO_FIRST_PAGE}
        >
          <span className="sr-only">{LABELS.PAGINATION.GO_TO_FIRST_PAGE}</span>
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          title={LABELS.PAGINATION.GO_TO_PREVIOUS_PAGE}
        >
          <span className="sr-only">
            {LABELS.PAGINATION.GO_TO_PREVIOUS_PAGE}
          </span>
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          title={LABELS.PAGINATION.GO_TO_NEXT_PAGE}
        >
          <span className="sr-only">{LABELS.PAGINATION.GO_TO_NEXT_PAGE}</span>
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(tablePageCount - 1)}
          disabled={!table.getCanNextPage()}
          title={LABELS.PAGINATION.GO_TO_LAST_PAGE}
        >
          <span className="sr-only">{LABELS.PAGINATION.GO_TO_LAST_PAGE}</span>
          <ChevronsRight />
        </Button>
      </div>
    </div>
  )
}
