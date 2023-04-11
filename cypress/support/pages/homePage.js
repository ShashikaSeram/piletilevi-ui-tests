/// <reference types="Cypress" />

export class HomePage {
  static visitHome() {
    cy.visit(Cypress.env('piletilevi_url'));
  }
  
  //Verify we are in the home page
  static verifyHomePageIsDisplayed() {
    cy.get('img[alt="logo"]').should('be.visible')
  }

  //Search the name of event
  //using a force click because when site is loaded the page is jittering and can't focus on the elements
  //probably a scrolling issue, needs more investigation
  static searchForEvent(eventName) {
    cy.get('[name="search"]').click({ force: true }).type(eventName);
  }

  //Validate the event is present and click
  static clickEventByName(eventName) {
    cy.get('[class="event_short_title"]').contains(eventName).click();
  }
}