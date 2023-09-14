// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("login", () => {
  const email = "john@mail.com";
  const password = "changeme";
  cy.session([email, password], () => {
    cy.visit("/login");
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(`${password}{enter}`);
    cy.get('[href="/blog"]').click();
  }, {
    validate() {
      cy.visit("/");
    },
    cacheAcrossSpecs: true,
  });
});

Cypress.Commands.add("goToBlog", () => {
  cy.visit("/");
  cy.get('[href="/blog"]').click();
});

Cypress.Commands.add("goToBlogDetailPage", () => {
  cy.get(':nth-child(1) > .bg-gray-50 > .mt-2 > a > .mb-2').click();
});
