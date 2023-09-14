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
  cy.session(
    [email, password],
    () => {
      cy.visit("/login");

      cy.get('[name="email"]').type(`${email}`);
      cy.get('[name="password"]').type(`${password}{enter}`);
      cy.get('[href="/tv-shows"]').click();
    },
    {
      validate: () => {

        cy.visit("/");
      },
      cacheAcrossSpecs: true,
    },
  );
});


Cypress.Commands.add("goToBlog", () => {
  cy.visit("/");
  cy.get('[href="/blog"]').click();
});

Cypress.Commands.add("goToBlogDetailPage", () => {
  cy.get(":nth-child(1) > .bg-gray-50 > .mt-2 > a > .mb-2").click();
});

Cypress.Commands.add("loginWithoutSession", (email, password) => {
  cy.visit("/login");

  cy.get('[name="email"]').should("be.visible").type(`${email}`);
  cy.get('[name="password"]').should("be.visible").type(`${password}`);
  cy.get('[type="submit"]').should("be.visible").click();

  cy.contains("One App 2.0");
});

Cypress.Commands.add("setLocalStorageItem", (key, value) => {
  cy.window().then((win) => {
    win.localStorage.setItem(key, value);
  });
});

Cypress.Commands.add("loginByGoogleApi", () => {
  cy.log("Logging in to Google");
  cy.request({
    method: "POST",
    url: "https://www.googleapis.com/oauth2/v4/token",
    body: {
      grant_type: "refresh_token",
      client_id: Cypress.env("googleClientId"),
      client_secret: Cypress.env("googleClientSecret"),
      refresh_token: Cypress.env("googleRefreshToken"),
    },
  }).then(({ body }) => {
    const { access_token, id_token } = body;

    cy.request({
      method: "GET",
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
      headers: { Authorization: `Bearer ${access_token}` },
    }).then(({ body }) => {
      cy.log(body);
      const userItem = {
        token: id_token,
        user: {
          googleId: body.sub,
          email: body.email,
          givenName: body.given_name,
          familyName: body.family_name,
          imageUrl: body.picture,
        },
      };

      window.localStorage.setItem("googleCypress", JSON.stringify(userItem));
      cy.visit("/");
    });
  });
});

