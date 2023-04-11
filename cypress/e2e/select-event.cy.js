/// <reference types="Cypress" />

before(() => {
  const COOKIE_NAME = "CookieConsent";
  const COOKIE_VALUE = "ACCEPTED";
  Cypress.on("window:before:load", window => {
    window.document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}`;
  });
  // There was an error from the application which caused test failure '(uncaught exception)TypeError: window.galleriesInfo.push is not a function'
  // following line avoid the failure of tests
  Cypress.on('uncaught:exception', () => false);
})

beforeEach(() => {  
  cy.visit('https://www.piletilevi.ee/eng');
});


describe('Select tickets for an event without a hall plan', () => {

  it('Add a ticket to the shopping cart for a single event', () => {

    // Verify we are in the home page
    cy.get('img[alt="logo"]').should('be.visible')

    // Search the name of event
    // using a force click because when site is loaded the page is jittering and can't focus on the elements
    //probably a scrolling issue, needs more investigation
    cy.get('[name="search"]').as('search').click({ force: true })
    cy.get('@search').type('NOËP - Staadionikontsert')

    // Validate the event is present and click
    cy.get('[class="event_short_title"]').contains('NOËP').click()

    // Validate the date of the ticket 
    cy.get('[class="concert_details_date concert_details_spec"]').contains('19/08/2023')

    // Click the 1st buy button
    cy.get('[class="buy_button_text"]').first().click()

    // Verify we are in Tickets selection page
    cy.get('[class="cart-heading-wrapper"]').contains('Tickets selection')

    // verify the colors changes when mouse hover over the sectors in the hall plan
    cy.get('[id="section67336"]').trigger('mouseover').invoke('attr', 'fill')
      .then((fillValue) => {
        expect(fillValue).to.equal('#75bb01');
      })

    // select a sector
    cy.get('[role="cell"]').contains('Gate 2, sector A4').click()

    // Verify the correct sector is selected
    cy.get('[class="sector-description"]').contains('Gate 2, sector A4')

    // click on plus button to add tickets
    cy.get('[name="plus"]').click()

    var priceOfTicket;
    var priceOfTwo;
    // Get the text content of the price element and extract the numerical value
    cy.get('[class="sum-total"]').invoke('text').then((text) => {
      priceOfTicket = parseFloat(text.match(/\d+\.\d+/)[0]);
    });

    // add the second ticket
    cy.get('[name="plus"]').click()

    // validate if the total price is calculated correctly
    cy.get('[class="sum-total"]').invoke('text').then((text) => {
      priceOfTwo = parseFloat(text.match(/\d+\.\d+/)[0]);
      expect(priceOfTwo).to.equal(2 * priceOfTicket);
    // Wrap priceOfTwo to create a chainable object that can be passed to other Cypress commands
      cy.wrap(priceOfTwo).as('priceOfTwo');
    });

    // Click find tickets button
    cy.get('[class="ng-tns-c27-7"]').click()

    // check if there are seat number assigned in the Seats offered section
    cy.get('.ticket-data-content').eq(2)
      .should(($element) => {
        const value = parseInt($element.text());
        expect(value).to.be.a('number');
      });

    // Click confirm all
    cy.get('[class="ng-tns-c27-10"]').click()

    // enter email 
    cy.get('[type="email"]').type('shashikaseram@gmail.com')

    // Click Proceed to checkout button
    cy.get('button').contains('Proceed to checkout').click()

    // Verify we are in the shopping cart page
    cy.get('[class="cart-heading-wrapper ng-star-inserted"]').contains('Shopping cart').should('be.visible')

    // Verify the added items Total is displayed
    cy.get('@priceOfTwo').then((priceOfTwo) => {
      cy.get('[class="summary-row"]').contains(priceOfTwo);
    });
  })



});
