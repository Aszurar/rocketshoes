import { useQuery } from '@tanstack/react-query'

import { IShoes, STOCK_AMOUNT_DEFAULT } from '@/data/shoes'
import { getAmount } from '@/services/requests/get-amount'
import { STOCK_ALERT_STATUS } from '@/utils/enums'
import { MESSAGES } from '@/utils/messages'

type UseStockStatusProps = {
  shoes: IShoes
  cartQuantity?: number | null
}

const REACHED_STOCK_LIMIT = {
  title: MESSAGES.INFO.STOCK_AMOUNT_REACHED.alert,
  description: MESSAGES.INFO.STOCK_AMOUNT_REACHED.description,
}

const STOCK_AMOUNT_ERROR = {
  title: MESSAGES.ERRORS.GET_STOCK_AMOUNT.alert,
  description: MESSAGES.ERRORS.GET_STOCK_AMOUNT.description,
}

const STOCK_AMOUNT_OUT_OF_STOCK = {
  title: MESSAGES.INFO.STOCK_OUT_OF_STOCK.alert,
  description: MESSAGES.INFO.STOCK_OUT_OF_STOCK.description,
}

const STOCK_AMOUNT_EMPTY = {
  title: '',
  description: '',
}

const STOCK_ALERT_CONTENT = {
  [STOCK_ALERT_STATUS.ERROR]: STOCK_AMOUNT_ERROR,
  [STOCK_ALERT_STATUS.OUT_OF_STOCK]: STOCK_AMOUNT_OUT_OF_STOCK,
  [STOCK_ALERT_STATUS.LIMIT_REACHED]: REACHED_STOCK_LIMIT,
  [STOCK_ALERT_STATUS.EMPTY]: STOCK_AMOUNT_EMPTY,
}

type StockAlertContentKeyType = keyof typeof STOCK_ALERT_CONTENT

/**
 * Hook para gerenciar o status de estoque de produtos e apresentar alertas associados.
 *
 * Este hook busca informações de estoque do produto especificado, determina seu status
 * (disponível, esgotado, limite atingido) e fornece informações para exibição de alertas
 * nos componentes.
 *
 * @param {Object} params Parâmetros do hook
 * @param {IShoes} params.shoes Objeto do produto a ser verificado
 * @param {number} [params.cartQuantity=0] Quantidade atual do produto no carrinho
 *
 * @returns {Object} returns.stock Informações de estoque do produto
 * @returns {boolean} returns.isStockError Indica se ocorreu um erro ao buscar informações de estoque
 * @returns {boolean} returns.isStockPending Indica se a busca de estoque está em andamento
 * @returns {boolean} returns.isShowStockAlert Indica se um alerta deve ser exibido
 * @returns {boolean} returns.canAddMore Indica se é possível adicionar mais itens do produto
 * @returns {Object|null} returns.stockAlertContent Conteúdo do alerta (título e descrição)
 * @returns {boolean} returns.hasReachedLimitStock Indica se o limite de estoque foi atingido
 *
 * @example
 * // Em um componente de produto
 * const { canAddMore, isShowAlert, stockAlertContent, isStockPending } = useStockStatus({
 *   shoes: product,
 *   cartQuantity: currentCartQuantity
 * });
 *
 * return (
 *   <div>
 *     {isShowAlert && <Alert title={stockAlertContent.title} description={stockAlertContent.description} />}
 *     <Button disabled={!canAddMore || isStockPending}>Adicionar ao Carrinho</Button>
 *   </div>
 * );
 */
function useStockStatus({ shoes, cartQuantity = 0 }: UseStockStatusProps) {
  const cartQuantityFormatted = cartQuantity ?? 0
  const {
    data,
    isError: isStockError,
    isPending: isStockPending,
  } = useQuery({
    queryFn: () => getAmount(shoes.id),
    queryKey: ['stock', `${shoes.id}`],
  })

  const stock = data ?? STOCK_AMOUNT_DEFAULT

  const isOutOfStock = stock.amount === STOCK_AMOUNT_DEFAULT.amount
  const hasReachedLimitStock =
    cartQuantityFormatted >= stock.amount &&
    stock.amount > STOCK_AMOUNT_DEFAULT.amount
  const canAddMoreInCart = !isOutOfStock && cartQuantityFormatted < stock.amount

  let stockAlertStatus = null as StockAlertContentKeyType | null

  if (isStockError) {
    stockAlertStatus = STOCK_ALERT_STATUS.ERROR
  } else if (isOutOfStock) {
    stockAlertStatus = STOCK_ALERT_STATUS.OUT_OF_STOCK
  } else if (hasReachedLimitStock) {
    stockAlertStatus = STOCK_ALERT_STATUS.LIMIT_REACHED
  }

  const isShowStockAlert = Boolean(stockAlertStatus) && !isStockPending
  const stockAlertContent = stockAlertStatus
    ? STOCK_ALERT_CONTENT[stockAlertStatus]
    : STOCK_ALERT_CONTENT.EMPTY

  return {
    stock,
    isStockError,
    isStockPending,
    isShowStockAlert,
    canAddMoreInCart,
    stockAlertContent,
    hasReachedLimitStock,
  }
}

export { useStockStatus }
