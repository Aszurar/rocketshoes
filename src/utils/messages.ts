const MESSAGES = {
  INFO: {
    STOCK_AMOUNT_REACHED: {
      alert: 'Limite atingido',
      description: 'Quantidade máxima disponível de estoque atingida.',
    },
    STOCK_OUT_OF_STOCK: {
      alert: 'Sem estoque',
      description: 'Produto sem estoque disponível.',
    },
  },
  ERRORS: {
    GET_SHOES: 'Error ao tentar carregar os dados dos produtos.',
    GET_STOCK_AMOUNT: {
      description:
        'Ocorreu um erro ao tentar carregar a quantidade de estoque do produto.',
      alert: 'Erro de Estoque',
    },
  },
} as const

export { MESSAGES }
