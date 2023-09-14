describe("Logout", function () {
  it("should logout a user successfully", () => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");

    cy.loginWithoutSession(email, password);
    cy.get(".top-1\\/2").should("be.visible").click();
    cy.get(":nth-child(6) > .flex > p").should("be.visible").click();
    cy.contains("Logout successful");
  });
});
