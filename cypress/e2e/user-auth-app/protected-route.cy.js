describe("Protected route", function () {
  it("should redirect user to login page if user is unauthorized", () => {
    cy.visit("/");
    cy.contains("Please login to continue");
  });

  it("should not allow user to visit sign up page after login", () => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");
    cy.loginWithoutSession(email, password);
    cy.visit("/signup");
    cy.contains("One App 2.0");
  });

  it("should not allow user to visit login page after login", () => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");
    cy.loginWithoutSession(email, password);
    cy.visit("/login");
    cy.contains("One App 2.0");
  });

  it("should redirect an unauthorized user to the requested page after login", () => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");

    cy.visit("/profile");
    cy.contains("Please login to continue");
    cy.loginWithoutSession(email, password);
    cy.contains("Profile");
  });
});
