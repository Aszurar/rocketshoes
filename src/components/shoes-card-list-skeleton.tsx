import { Skeleton } from './ui/skeleton'

export function ShoesCardListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Skeleton className="h-96 w-full rounded-md" />
      <Skeleton className="h-96 w-full rounded-md" />
      <Skeleton className="h-96 w-full rounded-md" />
      <Skeleton className="h-96 w-full rounded-md" />
      <Skeleton className="h-96 w-full rounded-md" />
      <Skeleton className="h-96 w-full rounded-md" />
      <Skeleton className="h-96 w-full rounded-md" />
      <Skeleton className="h-96 w-full rounded-md" />
      <Skeleton className="h-96 w-full rounded-md" />
      <Skeleton className="h-96 w-full rounded-md" />
      <Skeleton className="h-96 w-full rounded-md" />
      <Skeleton className="h-96 w-full rounded-md" />
    </div>
  )
}
