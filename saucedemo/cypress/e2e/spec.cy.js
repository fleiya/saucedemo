const STANDARD_USER = 'standard_user'
const LOCKED_OUT_USER = 'locked_out_user'
const PROBLEM_USER = 'problem_user'
const USER_PASSWORD = 'secret_sauce'



describe('CHECK STANDARD USER', () => { 
  beforeEach(() => {
    cy.visit('/');
    cy.login(STANDARD_USER, USER_PASSWORD);
  });

it('Tasks for STANDARD_USER' , () => {
  cy
   .get('[data-test="add-to-cart-sauce-labs-backpack"]')
   .click()
   .get('[id="shopping_cart_container"]')
   .click()
   .get('[class="inventory_item_name"]').should('have.text','Sauce Labs Backpack')
   .get('[id="react-burger-menu-btn"]')
   .click()
   .get('[id="logout_sidebar_link"]')
   .click()
   .get('.login_logo').should('exist')
  });
})  



describe('CHECK LOCKED OUT USER', () => { 
  beforeEach(() => {
    cy.visit('/');
    cy.login(LOCKED_OUT_USER, USER_PASSWORD);
  });

it('CHECK LOCKED OUT USER' , () => {
 cy
   .get('h3[data-test="error"]').should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
   .intercept('POST', 'https://submit.backtrace.io/UNIVERSE/TOKEN/json', (req) => {
    req.reply({
      status: 503,
      body: 'Service Unavailable',
      });
    });
  });
})


describe('CHECK PROBLEM USER', () => { 
  beforeEach(() => {
    cy.visit('/');
    cy.login(PROBLEM_USER, USER_PASSWORD);
  });

it('Log In PROBLEM USER' , () => {
 cy
   .get('[id="react-burger-menu-btn"]')
   .click()
   .get('[id="logout_sidebar_link"]')
   .click()
  });
})