/// <reference types="cypress" />
/// <reference types="../../cypress/support/commands.d.ts" />

import { TIME } from '../../src/utils/time'

describe('Search products', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be able to search for a product', () => {
    cy.get('input[placeholder="Pesquisar..."]').type('Nike')
    
    cy.wait(TIME.SECOND)

    cy.get('form#search-form').submit()

    cy.contains('Tênis Nike').first().should('exist')

  })


  it('should be able to reset the search', () => {
    cy.get('input[placeholder="Pesquisar..."]').type('Nike')
    
    cy.wait(TIME.SECOND)

    cy.get('form#search-form').submit()

    cy.contains('Tênis Nike').first().should('exist')

    cy.contains('Limpar').click()

    cy.get('input[placeholder="Pesquisar..."]').should('have.value', '')
  })


  it('should be able to search for a product and add it to the cart', () => {
    cy.get('input[placeholder="Pesquisar..."]').type('Nike')
    
    cy.wait(TIME.SECOND)

    cy.get('form#search-form').submit()

    cy.contains('Tênis Nike').first().should('exist')

    cy.contains('Adicionar ao Carrinho').first().click()

    cy.checkNotificationBadge(1)
  }
  )
  it('should be able to search for a product and remove it from the cart', () => {
    cy.get('input[placeholder="Pesquisar..."]').type('Nike')
    
    cy.wait(TIME.SECOND)

    cy.get('form#search-form').submit()

    cy.contains('Tênis Nike').first().should('exist')

    cy.contains('Adicionar ao Carrinho').first().click()
    cy.contains('Adicionar ao Carrinho').first().click()

    cy.checkNotificationBadge(2)

    cy.get('[data-test-id="remove-item"]').first().click()

    cy.checkNotificationBadge(1)
  })
})