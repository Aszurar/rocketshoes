function formatPrice(priceText: string) {
  // Primeiro, remova o R$ e espaços
  let cleanText = priceText.replace('R$', '').trim()
  
  // Depois, remova todos os pontos (separadores de milhar)
  cleanText = cleanText.replace(/\./g, '')
  
  // Por fim, substitua a vírgula por ponto (para separador decimal)
  cleanText = cleanText.replace(',', '.')

  const priceFormatted = parseFloat(cleanText)

  return priceFormatted
}

function formatTextToInt(text?: string) {

  if (!text) {
    return 0
  }
  const formattedNumber = parseFloat(
    text.replace('R$', '').replace(',', '.').trim(),
  )
  return formattedNumber
}

export { formatPrice, formatTextToInt }