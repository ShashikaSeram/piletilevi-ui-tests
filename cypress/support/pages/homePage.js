/// <reference types="Cypress" />

export class HomePage {
  static visitHome() {
    cy.visit('https://www.piletilevi.ee/eng');
  }
  static verifyHomePageIsDisplayed() {
    cy.get('img[alt="logo"]').should('be.visible')
  }

  static searchForEvent(eventName) {
    cy.get('[name="search"]').click({ force: true }).type(eventName);
  }

  static clickEventByName(eventName) {
    cy.get('[class="event_short_title"]').contains(eventName).click();
  }
}