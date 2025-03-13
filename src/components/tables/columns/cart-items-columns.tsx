import { ColumnDef } from '@tanstack/react-table'

import { ShoesCardImage } from '@/components/shoes-card-image'
import { ShoesCounter } from '@/components/shoes-counter'
import { IProduct } from '@/data/shoes'
import { monetaryValueFormatter } from '@/utils/monetary'

import { DataTableColumnHeaderActions } from './data-table-column-header-actions'
import { DeleteItemCell } from './delete-item-cell'

export const cartItemsTableColumns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'image',
    header: '',

    cell: ({ row }) => (
      <ShoesCardImage
        image={row.original.image}
        title={row.original.title}
        size="md"
      />
    ),
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeaderActions column={column} title="Produtos" />
    ),
    cell: ({ row }) => {
      return (
        <span className="flex min-w-52 text-start font-medium">
          {row.original.title}
        </span>
      )
    },
  },

  {
    accessorKey: 'amount',
    header: 'QTD',

    cell: ({ row }) => {
      return <ShoesCounter shoesOnCart={row.original} />
    },
  },
  {
    accessorKey: 'subtotal',
    header: 'Subtotal',
    cell: ({ row }) => {
      const subTotal = row.original.price * row.original.amount

      const subTotalFormatted = monetaryValueFormatter(subTotal)

      return <span className="font-mono">{subTotalFormatted}</span>
    },
  },

  {
    id: 'delete',
    cell: ({ row }) => {
      return <DeleteItemCell shoesId={row.original.id} />
    },
  },
]
