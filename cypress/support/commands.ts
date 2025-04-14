/// <reference types="cypress" />
/// <reference types="./commands.d.ts" />

import { formatPrice, formatTextToInt } from './utils'

Cypress.Commands.add('addProductToCart', (cardId: string) => {
  return cy
    .get(`[data-testid="${cardId}"]`)
    .contains('Adicionar ao Carrinho')
    .first()
    .click()
})

Cypress.Commands.add('removeProductFromCart', (cardId: string) => {
  return cy.get(`[data-testid="${cardId}"]`).first().click()
})

Cypress.Commands.add('openCart', () => {
  cy.get('[data-testid="notification-badge"]').click()
  return cy.get('[data-testid="cart-menu"]').should('be.visible')
})

Cypress.Commands.add('closeCart', () => {
  return cy.get('[data-testid="close-cart-button"]').click()
})

Cypress.Commands.add('checkNotificationBadge', (expectedCount: number) => {
  return cy
    .get('[data-testid="notification-badge"]')
    .children()
    .contains(expectedCount.toString())
})

Cypress.Commands.add('checkCartProductsCount', (expectedCount: number) => {
  return cy
    .get('[data-testid="cart-menu"]')
    .contains(`Produtos selecionados ${expectedCount}`)
})

Cypress.Commands.add('calculateCartTotal', () => {
  let totalPriceCount = 0

  return cy.get('[data-testid="shoes-card-cart"]').then(($cards) => {
    // Processamos cada cartão de forma síncrona usando jQuery
    $cards.each((_, card) => {
      const $card = Cypress.$(card)

      // Obter o preço
      const priceText = $card.find('[data-testid="price"]').text()
      const priceNumber = formatPrice(priceText)

      // Obter a quantidade
      const quantityText = $card
        .find('[data-testid="input-amount"]')
        .val() as string
      const quantityNumber = formatTextToInt(quantityText)

      // Adicionar ao total
      totalPriceCount += priceNumber * quantityNumber
    })

    // Retornamos apenas um único cy.wrap do valor final
    return cy.wrap(totalPriceCount)
  })
})
