describe("Login", function () {
  it("successfully login a user using facebook authentication", () => {
    cy.visit("/login");
    cy.contains("Continue with Facebook").should("be.visible").click();
    cy.contains("One App 2.0").should("be.visible");
  });
});
