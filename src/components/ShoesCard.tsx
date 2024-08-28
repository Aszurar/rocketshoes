import { useAutoAnimate } from '@formkit/auto-animate/react'
import { CircleMinus } from 'lucide-react'
import { useState } from 'react'

import { IShoes } from '@/data/shoes'
import { cn } from '@/lib/utils'

import { Button } from './ui/button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from './ui/context-menu'

type ShoesProps = React.HTMLAttributes<HTMLDivElement> & {
  shoes: IShoes
  aspectRatio?: 'portrait' | 'square'
}

export function ShoesCard({
  shoes,
  aspectRatio = 'portrait',
  className,
  ...props
}: ShoesProps) {
  const [parent] = useAutoAnimate()

  const aspectRatioToTailwindCSS =
    aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'

  const [state, setState] = useState(0)

  return (
    <div
      className={cn('flex h-[440px] flex-col space-y-3', className)}
      {...props}
    >
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <img
              src={shoes.image}
              alt={shoes.title}
              width={250}
              height={330}
              className={cn(
                'h-auto w-auto object-cover transition-all hover:scale-105',
                aspectRatioToTailwindCSS,
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Adicionar ao Carrinho</ContextMenuItem>
          <ContextMenuItem>Comprar com 1 clique</ContextMenuItem>
          <ContextMenuItem>Adicionar a lista</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Favoritar</ContextMenuItem>
          <ContextMenuItem>Compartilhar</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <div className="flex flex-1 flex-col justify-between">
        <section className="space-y-1">
          <h3 className="font-medium leading-none">{shoes.title}</h3>
          <p className="text-sm text-muted-foreground">{shoes.price}</p>
        </section>

        <div ref={parent} className="flex items-center justify-center gap-5">
          <Button
            size="sm"
            type="button"
            variant="outline"
            className="self-center"
            onClick={() => setState(state + 1)}
          >
            Adicionar ao Carrinho
          </Button>

          {!!state && (
            <>
              <Button
                size="2xs"
                type="button"
                variant="destructive"
                className="self-center"
                onClick={() => setState(state - 1)}
              >
                <CircleMinus className="h-4 w-4" />
              </Button>

              <div className="text-xs font-bold text-muted-foreground">
                <span>x{state}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
