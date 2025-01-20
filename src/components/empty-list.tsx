import Lottie from 'lottie-react'

import shoesAnimation from '@/assets/animations/logo.json'

export function EmptyList() {
  return (
    <div className="mt-[10%] flex flex-1 flex-col items-center justify-center">
      <Lottie
        animationData={shoesAnimation}
        loop={true}
        style={{ width: '350px', height: '350px' }}
      />
      <p className="text-2xl font-semibold text-muted-foreground">
        Nenhum item encontrado
      </p>
    </div>
  )
}
