describe("Invalid Access Token", function () {
  it("should refresh a user's access token successfully", () => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");

    // interceptors
    cy.intercept("GET", "https://api.escuelajs.co/api/v1/auth/profile").as(
      "getUserData",
    );
    cy.intercept(
      "POST",
      "https://api.escuelajs.co/api/v1/auth/refresh-token",
    ).as("refreshAccessToken");

    // first request will be valid as we have a valid access token
    cy.loginWithoutSession(email, password);
    cy.wait("@getUserData").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    // second reqest will be invalid as we are setting an invalid access token
    cy.setLocalStorageItem("access_token", "INVALID_ACCESS_TOKEN");

    cy.reload();
    cy.wait("@getUserData").then((interception) => {
      expect(interception.response.statusCode).to.equal(401);
    });
    cy.wait("@refreshAccessToken").then((interception) => {
      expect(interception.response.statusCode).to.equal(201);
    });
    cy.wait("@getUserData").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    cy.contains("One App 2.0");
  });
});
