/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Adiciona um produto ao carrinho de compras clicando no botão "Adicionar ao Carrinho"
     * dentro do card do produto especificado.
     *
     * @example
     * // Adiciona o produto do card 1 ao carrinho
     * cy.addProductToCart('shoes-card-1');
     *
     * // Adiciona múltiplos produtos ao carrinho
     * cy.addProductToCart('shoes-card-1');
     * cy.addProductToCart('shoes-card-2');
     * cy.addProductToCart('shoes-card-3');
     *
     * @param {string} cardId - O identificador do card do produto (valor do atributo data-testid)
     * @returns {Chainable<JQuery<HTMLElement>>} O elemento clicado
     */
    addProductToCart(cardId: string): Chainable<JQuery<HTMLElement>>

    /**
     * Remove um produto ao carrinho de compras clicando no botão que remove o produto
     * dentro do card do produto especificado.
     *
     * @example
     * // Rmoeve o produto do card 1 do carrinho
     * cy.removeProductFromCart('shoes-card-1');
     *
     * // Remove múltiplos produtos do carrinho
     * cy.removeProductFromCart('shoes-card-1');
     * cy.removeProductFromCart('shoes-card-2');
     * cy.removeProductFromCart('shoes-card-3');
     *
     * @param {string} cardId - O identificador do card do produto (valor do atributo data-testid)
     * @returns {Chainable<JQuery<HTMLElement>>} O elemento clicado
     */
    removeProductFromCart: (cardId: string) => Chainable<JQuery<HTMLElement>>

    /**
     * Verifica se o número de itens no badge de notificação corresponde ao esperado.
     *
     * @example
     * // Verifica se o badge de notificação tem 1 item
     * cy.checkNotificationBadge(1);
     *
     * @param {number} expectedCount - O número esperado de itens no badge de notificação
     * @returns {Chainable<JQuery<HTMLElement>>} O elemento clicado
     */
    checkNotificationBadge(
      expectedCount: number,
    ): Chainable<JQuery<HTMLElement>>

    /**
     * Abre o menu do carrinho de compras clicando no badge de notificação.
     *
     * @example
     * // Abre o menu do carrinho
     * cy.openCart();
     *
     * @returns {Chainable<JQuery<HTMLElement>>} O elemento clicado
     */
    openCart(): Chainable<JQuery<HTMLElement>>

    /**
     * Fecha o menu do carrinho de compras clicando no botão de fechá-lo
     *
     * @example
     * // Fecha o menu do carrinho
     * cy.closeCart();
     *
     * @returns {Chainable<JQuery<HTMLElement>>} O elemento clicado
     */
    closeCart(): Chainable<JQuery<HTMLElement>>

    /**
     * Verifica se o número de itens dentro do carrinho de compras corresponde ao esperado.
     * @example
     * // Verifica se o carrinho tem 1 item
     * cy.checkCartProductsCount(1);
     *
     * @param {number} expectedCount - O número esperado de itens no badge de notificação
     * @returns {Chainable<JQuery<HTMLElement>>} O elemento clicado
     */
    checkCartProductsCount(
      expectedCount: number,
    ): Chainable<JQuery<HTMLElement>>
    /**
     * Calcula o preço total dos produtos no carrinho de compras.
     *
     * @example
     *  const total = cy.calculateCartTotal()
     *
     * @returns {number} O preço total dos produtos no carrinho
     */
    calculateCartTotal(): Chainable<number>
  }
}
