let concertDate = '[class="concert_details_date concert_details_spec"]'
let buyButton = '[class="buy_button_text"]';

export class EventPage {
  
  static validateConcertDate(date) {
    cy.get(concertDate).contains(date);
  }

  static clickBuyButton() {
    cy.get(buyButton).first().click();
  }
}