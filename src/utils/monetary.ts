const DELIVERY_COST = 24.99

/**
 * Formata valores monetários para o formato brasileiro.
 *
 * Esta constante é uma instância de `Intl.NumberFormat` configurada para formatar valores monetários
 * para o formato brasileiro (pt-BR), usando o Real (BRL) como moeda e o estilo 'currency'.
 *
 * @example
 * // retorna 'R$ 1.000,00'
 * monetaryValueFormatter.format(1000)
 */
function monetaryValueFormatter(value?: number | null) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })

  const valueParsed = value ?? 0

  return formatter.format(valueParsed)
}

export { DELIVERY_COST, monetaryValueFormatter }
