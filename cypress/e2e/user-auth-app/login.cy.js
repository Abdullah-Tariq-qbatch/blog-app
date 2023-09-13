describe("Login", function () {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should login a user successfully", () => {
    const email = "faiq@gmail.com";
    const password = "1234Faiq";
    cy.visit("/login");
    cy.get('[name="email"]').should("be.visible").type(`${email}`);
    cy.get('[name="password"]').should("be.visible").type(`${password}`);
    cy.get('[type="submit"]').should("be.visible").click();
    cy.contains("One App 2.0");
  });

  it("should give an invalid email error", () => {
    const email = "faiq";

    cy.get('[name="email"]').should("be.visible").type(`${email}`).blur();
    cy.contains(`"Email" must be a valid email`);
  });

  it("should give an invalid password error", () => {
    const password = "1234";

    cy.get('[name="password"]').should("be.visible").type(`${password}`).blur();
    cy.contains(`"Password" length must be at least 8 characters long`);
  });
});
