import { Column } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

enum SORT_TYPE {
  ASC = 'asc',
  DESC = 'desc',
}

export function DataTableColumnHeaderActions<TData, TValue>({
  column,
  title,
  className,
}: Readonly<DataTableColumnHeaderProps<TData, TValue>>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  const isDescSorted = column.getIsSorted() === SORT_TYPE.DESC
  const isAscSorted = column.getIsSorted() === SORT_TYPE.ASC
  const isntSorted = !isDescSorted && !isAscSorted

  function getTheIconForSortType() {
    if (isDescSorted) {
      return <ArrowDown className="h-5 w-5" />
    } else if (isAscSorted) {
      return <ArrowUp className="h-5 w-5" />
    } else {
      return <ChevronsUpDown className="h-5 w-5" />
    }
  }

  const iconForSortType = getTheIconForSortType()
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 gap-1 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {iconForSortType}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            data-select={isAscSorted}
            onClick={() => column.toggleSorting(false)}
            className="gap-1"
          >
            <ArrowUp className="h-4 w-4 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            data-select={isDescSorted}
            onClick={() => column.toggleSorting(true)}
            className="gap-1"
          >
            <ArrowDown className="h-4 w-4 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            data-select={isntSorted}
            onClick={() => column.clearSorting()}
            className="gap-1"
          >
            <ChevronsUpDown className="h-4 w-4 text-muted-foreground/70" />
            No sort
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => column.toggleVisibility(false)}
            className="gap-1"
          >
            <EyeOff className="h-4 w-4 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
