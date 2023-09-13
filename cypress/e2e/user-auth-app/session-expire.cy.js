describe("Session Expire", function () {
  it("should logout a user when session expires", () => {
    const email = "faiq@gmail.com";
    const password = "1234Faiq";

    // interceptors
    cy.intercept("GET", "https://api.escuelajs.co/api/v1/auth/profile").as(
      "getUserData",
    );
    cy.intercept(
      "POST",
      "https://api.escuelajs.co/api/v1/auth/refresh-token",
    ).as("refreshAccessToken");

    // first request should be successful
    cy.login(email, password);
    cy.wait("@getUserData").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    // after we set invalid access and refresh tokens the user should be logged out
    cy.setLocalStorageItem("access_token", "INVALID_ACCESS_TOKEN");
    cy.setLocalStorageItem("refresh_token", "INVALID_REFRESH_TOKEN");

    cy.reload();
    cy.wait("@getUserData").then((interception) => {
      expect(interception.response.statusCode).to.equal(401);
    });
    cy.wait("@refreshAccessToken").then((interception) => {
      expect(interception.response.statusCode).to.equal(401);
    });

    cy.contains("Logout successful");
    cy.contains("Your session has expired please login again!");
  });
});
