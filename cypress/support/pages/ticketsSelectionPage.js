var heading = '[class="cart-heading-wrapper"]';

export class TicketsSelectionPage {

  //Verify we are in Tickets selection page
  static verifyPage() {
    cy.get(heading).contains('Tickets selection').should('be.visible');
  }

  static verifySectorColorOnMouseOver(color) {
    //verify the colors changes when mouse hover over the sectors in the hall plan
    cy.get('[id="section67336"]').trigger('mouseover').invoke('attr', 'fill')
      .then((fillValue) => {
        expect(fillValue).to.equal(color);
      })
  }

  //select a sector on the hall plan
  static selectSector(sectorName) {
    cy.get('[role="cell"]').contains(sectorName).click();
  }

  //Verify the correct sector is selected
  static verifySelectedSector(sectorName) {
    cy.get('[class="sector-description"]').contains(sectorName);
  }

  static addTicket() {
    cy.get('[name="plus"]').click()
  }

  static verifyTicketPrices() {
    var priceOfTicket;
    var priceOfTwo;
    //Get the text content of the price element and extract the numerical value
    cy.get('[class="sum-total"]').invoke('text').then((text) => {
      priceOfTicket = parseFloat(text.match(/\d+\.\d+/)[0]);
    });

    //add the second ticket
    this.addTicket();

    //validate if the total price is calculated correctly
    cy.get('[class="sum-total"]').invoke('text').then((text) => {
      priceOfTwo = parseFloat(text.match(/\d+\.\d+/)[0]);
      expect(priceOfTwo).to.equal(2 * priceOfTicket);
      //Wrap priceOfTwo to create a chainable object that can be passed to other Cypress commands
      cy.wrap(priceOfTwo).as('priceOfTwo');
    });
  }

  static clickFindTicketsButton() {
    cy.get('[class="ng-tns-c27-7"]').click()
  }

  //check if there are seat numbers assigned in the Seats offered section
  static verifySeatsOfferedHaveSeatNumbers() {
    cy.get('.ticket-data-content').eq(2)
      .should(($element) => {
        const value = parseInt($element.text());
        expect(value).to.be.a('number');
      });
  }

  static pickASeat(seat) {
    cy.get('text[fill="#ffffff"]').contains(seat).click({ force: true })
  }

  static clickConfirmAllButton() {
    cy.get('button').contains('Confirm all').click()
  }

  static enterEmail(email) {
    cy.get('[type="email"]').type(email)
  }

  static clickProceedToCheckoutButton() {
    cy.get('button').contains('Proceed to checkout').click()
  }

  static verifySeatNumber(seat, row) {
    let positionElement = '[class="ticket-data-content"]'
    cy.get(positionElement).eq(2)
      .should(($element) => {
        const value = parseInt($element.text());
        expect(value).to.equal(seat);
      });
  }

  static clickAddAllToCart() {
    cy.get('button').contains('Add all to cart').click()
  }

}