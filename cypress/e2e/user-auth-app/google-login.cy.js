describe("Login", function () {
  it("successfully login a user using google authentication", () => {
    cy.visit("/login");
    cy.contains("Continue with Google").should("be.visible").click();
    cy.contains("One App 2.0").should("be.visible");
  });
});
