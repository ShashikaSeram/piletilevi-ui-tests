export class ShoppingCartPage {

  //Verify we are in the shopping cart page
  static verifyShoppingCartPage() {
    cy.get('[class="cart-heading-wrapper ng-star-inserted"]').contains('Shopping cart').should('be.visible')
  }

  static verifyAddedItemsTotal() {
    // Verify the added items Total is displayed
    cy.get('@priceOfTwo').then((priceOfTwo) => {
      cy.get('[class="summary-row"]').contains(priceOfTwo);
    });
  }

}