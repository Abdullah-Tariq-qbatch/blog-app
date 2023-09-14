describe("Sign Up", function () {
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("should sign in a user successfully", () => {
    const name = "Cypress Test";
    const email = "test@cypress.com";
    const password = "1234Cypress";

    cy.get('[name="name"]').should("be.visible").type(`${name}`);
    cy.get('[name="email"]').should("be.visible").type(`${email}`);
    cy.get('[name="password"]').should("be.visible").type(`${password}`);
    cy.get('[name="confirmPassword"]').should("be.visible").type(`${password}`);
    cy.get('[type="submit"]').should("be.visible").click();
    cy.contains("Login");
  });

  it("should give an invalid name error", () => {
    const name = "$";

    cy.get('[name="name"]').should("be.visible").type(`${name}`).blur();
    cy.contains(
      `First Name" with value "$" fails to match the alphabets only pattern`,
    );
  });

  it("should give an invalid email error", () => {
    const email = "INVALID_EMAIL";

    cy.get('[name="email"]').should("be.visible").type(`${email}`).blur();
    cy.contains(`"Email" must be a valid email`);
  });

  it("should give an invalid password error", () => {
    const name = "Cypress Test";
    const email = "test@cypress.com";
    const password = "INVALID_PASSWORD";

    cy.get('[name="name"]').should("be.visible").type(`${name}`);
    cy.get('[name="email"]').should("be.visible").type(`${email}`);
    cy.get('[name="password"]').should("be.visible").type(`${password}`);
    cy.get('[name="confirmPassword"]')
      .should("be.visible")
      .type(`${password}{enter}`);
    cy.get('[type="submit"]').should("be.visible").click();
    cy.on("window:alert", (alert) => {
      expect(alert).to.contains(
        "Your password fails to pass the following rule(s):\n\n- Must have at least one lowercase letter\n- Must have at least 2 digits\n- Should not contain symbols ",
      );
    });
  });

  it("should give a passwords do not match error", () => {
    const password = "PASSWORD_1";
    const confirmPassword = "PASSWORD_2";

    cy.get('[name="password"]').should("be.visible").type(`${password}`).blur();
    cy.get('[name="confirmPassword"]')
      .should("be.visible")
      .type(`${confirmPassword}`)
      .blur();
    cy.contains(`Passwords do not match`);
  });

  it("should not allow an empty form to submit", () => {
    cy.get('[type="submit"]').should("be.visible").click();
    cy.contains(`"First Name" is not allowed to be empty`);
    cy.contains(`"Email" is not allowed to be empty`);
    cy.contains(`"Password" is not allowed to be empty`);
  });

  it("should show passwords when the show password checkbox is checked", () => {
    const password = "PASSWORD_1";
    const confirmPassword = "PASSWORD_1";

    cy.get('[name="password"]').should("be.visible").type(`${password}`);
    cy.get('[name="confirmPassword"]')
      .should("be.visible")
      .type(`${confirmPassword}`);
    cy.get('[id="togglePassword"]').should("be.visible").click();
    cy.get('[name="password"]').should("have.attr", "type", "text");
    cy.get('[name="confirmPassword"]').should("have.attr", "type", "text");
  });
});
