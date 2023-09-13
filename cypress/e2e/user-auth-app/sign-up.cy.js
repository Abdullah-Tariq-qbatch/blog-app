describe("Sign Up", function () {
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("should sign in a user successfully", () => {
    const name = "Faiq Shahzad";
    const email = "faiq@gmail.com";
    const password = "1234Faiq";

    cy.get('[name="name"]').should("be.visible").type(`${name}`);
    cy.get('[name="email"]').should("be.visible").type(`${email}`);
    cy.get('[name="password"]').should("be.visible").type(`${password}`);
    cy.get('[name="confirmPassword"]')
      .should("be.visible")
      .type(`${password}{enter}`);
    cy.get('[type="submit"]').should("be.visible").click();
    cy.contains("Login");
  });

  it("should give an invalid name error", () => {
    const name = "Faiq $";

    cy.get('[name="name"]').should("be.visible").type(`${name}`).blur();
    cy.contains(
      `First Name" with value "Faiq $" fails to match the alphabets only pattern`,
    );
  });

  it("should give an invalid email error", () => {
    const email = "faiq";

    cy.get('[name="email"]').should("be.visible").type(`${email}`).blur();
    cy.contains(`"Email" must be a valid email`);
  });

  it("should give an invalid password error", () => {
    const name = "Faiq Shahzad";
    const email = "faiq@gmail.com";
    const password = "1234Faiq$";

    cy.get('[name="name"]').should("be.visible").type(`${name}`);
    cy.get('[name="email"]').should("be.visible").type(`${email}`);
    cy.get('[name="password"]').should("be.visible").type(`${password}`);
    cy.get('[name="confirmPassword"]')
      .should("be.visible")
      .type(`${password}{enter}`);
    cy.get('[type="submit"]').should("be.visible").click();
    cy.on("window:alert", (alert) => {
      expect(alert).to.contains(
        `Your password fails to pass the following rule(s):\n\n- Should not contain symbols `,
      );
    });
  });

  it("should give a passwords do not match error", () => {
    const password = "1234Faiq";
    const confirmPassword = "1234";

    cy.get('[name="password"]').should("be.visible").type(`${password}`).blur();
    cy.get('[name="confirmPassword"]')
      .should("be.visible")
      .type(`${confirmPassword}`)
      .blur();
    cy.contains(`Passwords do not match`);
  });
});
