describe("Profile", function () {
  beforeEach(() => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");

    cy.login(email, password);
  });

  it("should display the logged in user's name on the profile page", () => {
    cy.visit("/profile");

    cy.intercept("GET", "https://api.escuelajs.co/api/v1/auth/profile").as(
      "fetchUserData",
    );

    cy.wait("@fetchUserData").then((interception) => {
      cy.contains(interception.response.body.name);
    });
  });
});
