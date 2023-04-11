let concertDate = '[class="concert_details_date concert_details_spec"]'
let buyButton = '[class="buy_button_text"]';

export class EventPage {

  // Validate the date of the ticket
  static validateConcertDate(date) {
    cy.get(concertDate).contains(date);
  }

  // Click the 1st buy button
  static clickBuyButton() {
    cy.get(buyButton).first().click();
  }
}