/// <reference types="Cypress" />
import { HomePage } from '../support/pages/homePage';
import { EventPage } from '../support/pages/eventPage';
import { TicketsSelectionPage } from '../support/pages/ticketsSelectionPage';
import { ShoppingCartPage } from '../support/pages/shoppingCartPage';

describe('Select tickets for an event without a hall plan', () => {

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
        HomePage.visitHome();
    });

    it('Add a ticket to the shopping cart for a single event', () => {
        HomePage.verifyHomePageIsDisplayed();

        HomePage.searchForEvent('NOËP - Staadionikontsert');

        HomePage.clickEventByName('NOËP')

        EventPage.validateConcertDate('19/08/2023');

        EventPage.clickBuyButton();

        TicketsSelectionPage.verifyPage();

        TicketsSelectionPage.verifySectorColorOnMouseOver('#75bb01');

        TicketsSelectionPage.selectSector('Gate 2, sector A4');

        TicketsSelectionPage.verifySelectedSector('Gate 2, sector A4');
        
        TicketsSelectionPage.addTicket();

        TicketsSelectionPage.verifyTicketPrices();

        TicketsSelectionPage.clickFindTicketsButton();

        TicketsSelectionPage.verifySeatsOfferedHaveSeatNumbers();

        TicketsSelectionPage.clickConfirmAllButton();

        TicketsSelectionPage.enterEmail('shashikaseram@gmail.com');

        TicketsSelectionPage.clickProceedToCheckoutButton();

        ShoppingCartPage.verifyShoppingCartPage();

        ShoppingCartPage.verifyAddedItemsTotal();
    });
});
