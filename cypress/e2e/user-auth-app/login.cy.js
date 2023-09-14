describe("Login", function () {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should login a user successfully on valid credentials", () => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");

    // interceptors
    cy.intercept("POST", "https://api.escuelajs.co/api/v1/auth/login").as(
      "loginUser",
    );

    cy.visit("/login");
    cy.get('[name="email"]').should("be.visible").type(`${email}`);
    cy.get('[name="password"]').should("be.visible").type(`${password}`);
    cy.get('[type="submit"]').should("be.visible").click();
    cy.wait("@loginUser").then((interception) => {
      expect(interception.response.statusCode).to.equal(201);
    });
    cy.contains("Login successful!");
    cy.contains("One App 2.0");
  });

  it("should give an error when a user trys to login with invalid credentials", () => {
    const email = "INVALID_EMAIL@WEBSITE.COM";
    const password = "INVALID_PASSWORD";

    // interceptors
    cy.intercept("POST", "https://api.escuelajs.co/api/v1/auth/login").as(
      "loginUser",
    );

    cy.visit("/login");
    cy.get('[name="email"]').should("be.visible").type(`${email}`);
    cy.get('[name="password"]').should("be.visible").type(`${password}`);
    cy.get('[type="submit"]').should("be.visible").click();
    cy.wait("@loginUser").then((interception) => {
      expect(interception.response.statusCode).to.equal(401);
    });
    cy.contains("Login failed!");
  });

  it("should give an invalid email error", () => {
    const email = "INVALID_EMAIL";

    cy.get('[name="email"]').should("be.visible").type(`${email}`).blur();
    cy.contains(`"Email" must be a valid email`);
  });

  it("should give an invalid password error", () => {
    const password = "INVALID";

    cy.get('[name="password"]').should("be.visible").type(`${password}`).blur();
    cy.contains(`"Password" length must be at least 8 characters long`);
  });

  it("should not allow an empty form to submit", () => {
    cy.get('[type="submit"]').should("be.visible").click();
    cy.contains(`"Email" is not allowed to be empty`);
    cy.contains(`"Password" is not allowed to be empty`);
  });

  it("should show password when the show password checkbox is checked", () => {
    const password = "PASSWORD_1";

    cy.get('[name="password"]').should("be.visible").type(`${password}`);
    cy.get('[id="togglePassword"]').should("be.visible").click();
    cy.get('[name="password"]').should("have.attr", "type", "text");
  });
});
