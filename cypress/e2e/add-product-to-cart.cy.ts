import { formatPrice, formatTextToInt } from "./utils"

describe('Add product', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })


  it('should be able add products to cart and check the added items in notification badge', () => {
    cy.addProductToCart('shoes-card-1')
    cy.addProductToCart('shoes-card-2')
    cy.addProductToCart('shoes-card-3')

    cy.checkNotificationBadge(3)
  })

  it('should be able add products to cart and check the added items in cart menu', () => {
    cy.addProductToCart('shoes-card-1')
    cy.addProductToCart('shoes-card-2')
    cy.addProductToCart('shoes-card-3')

    cy.openCart()

    // Verifica se o carrinho tem 3 produtos
    cy.checkCartProductsCount(3)
  })

  it('should be able add products to cart and check the total price', () => {
    // Adicionar produtos ao carrinho
    cy.addProductToCart('shoes-card-1')
    cy.addProductToCart('shoes-card-2')
    cy.addProductToCart('shoes-card-3')
  
    // Abrir o carrinho
    cy.openCart()
  
    // Extrair e calcular a soma dos preços dos itens
    let totalPriceCount = 0;
    
    //Verifica se o preço total está correto
    cy.get('[data-testid="shoes-card-cart"]').each(($card) => {
      // Obter o preço usando textContent
      cy.wrap($card).find('[data-testid="price"]').invoke('text').then(priceText => {
         const priceFormatted = formatPrice(priceText)
         expect(priceFormatted).to.be.a('number')
        
        // Obter o valor do input usando invoke('val')
        cy.wrap($card).find('[data-testid="input-amount"]').invoke('val').then(quantityText => {
          const quantityNumber = formatTextToInt(quantityText.toString());
          expect(quantityNumber).to.be.a('number')
          
          // Adicionar ao total
          totalPriceCount += priceFormatted * quantityNumber;
        });
      });
    }).then(() => {
      // Verificar o total após processar todos os cartões
      cy.get('[data-testid="total-price"]')
        .invoke('text')
        .then(totalPriceText => {
          const totalPriceNumber = formatPrice(totalPriceText);
          expect(totalPriceCount).to.equal(totalPriceNumber);
        });
    });
  });

  it('should be able to add more products to cart on cart menu and check the amount on cart menu', () => {
    // Adicionar produto ao carrinho
    cy.addProductToCart('shoes-card-1')

    // Abrir o carrinho
    cy.openCart()
  
    // Adicionar mais produtos no menu do carrinho
    cy.get('[data-testid="shoes-counter"]').get('[data-testid="add-product"]').click()
    cy.get('[data-testid="shoes-counter"]').get('[data-testid="add-product"]').click()

    cy.get('[data-testid="shoes-counter"]').get('[data-testid="input-amount"]').should('have.value', '3')
  })

  it('should be able to add more products to cart on cart menu and check the total price', () => {
    // Adicionar produto ao carrinho
    cy.addProductToCart('shoes-card-1')

    // Abrir o carrinho
    cy.openCart()

    cy.get('[data-testid="shoes-counter"]').get('[data-testid="add-product"]').click()
    cy.get('[data-testid="shoes-counter"]').get('[data-testid="add-product"]').click()

    cy.get('[data-testid="shoes-counter"]').get('[data-testid="input-amount"]').should('have.value', '3')

    // Verifica se o preço calculado(quantidade de items x preço) é igual
    // preço total exibido no carrinho
    cy.calculateCartTotal().then(totalPriceCalculated => {
      cy.get('[data-testid="total-price"]')
        .invoke('text')
        .then(totalPriceText => {
          // totalPrice => preço total exibido no carrinho
          // totalPriceCalculated => preço total calculado
          const totalPrice = formatPrice(totalPriceText);
          expect(totalPrice).to.be.a('number')
          expect(totalPriceCalculated).to.equal(totalPrice);
        });
    });
  })

  it('should be able to add more products after close and open the cart menu and check total price', () => {
    // Adicionar produto ao carrinho
    cy.addProductToCart('shoes-card-1')

    // Abrir o carrinho
    cy.openCart()

    // Adicionar mais produtos no menu do carrinho
    cy.get('[data-testid="shoes-counter"]').get('[data-testid="add-product"]').click()

    // Verificar se o valor do input é 2
    cy.get('[data-testid="shoes-counter"]').get('[data-testid="input-amount"]').should('have.value', '2')

    // Fechar o carrinho
    cy.get('[data-testid="cart-menu"]').should('be.visible').get('[data-testid="close-cart-button"]').click()

    // Adicionar mais produtos no menu do carrinho
    cy.addProductToCart('shoes-card-2')
    cy.addProductToCart('shoes-card-1')


    // Verificar quantidade de itens na badge
    cy.checkNotificationBadge(4)

    // Abrir o carrinho
    cy.openCart()

    // Verificar a quantidade de itens no carrinho
    cy.checkCartProductsCount(4)

    // Verifica se o preço calculado(quantidade de items x preço) é igual
    // preço total exibido no carrinho
    cy.calculateCartTotal().then(totalPriceCalculated => {
      cy.get('[data-testid="total-price"]')
        .invoke('text')
        .then(totalPriceText => {
          // totalPrice => preço total exibido no carrinho
          // totalPriceCalculated => preço total calculado
          const totalPrice = formatPrice(totalPriceText);
          expect(totalPrice).to.be.a('number')
          expect(totalPriceCalculated).to.equal(totalPrice);
        });
    });


  })
})