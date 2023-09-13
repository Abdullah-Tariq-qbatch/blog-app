describe("Logout", function () {
  it("should logout a user successfully", () => {
    const email = "faiq@gmail.com";
    const password = "1234Faiq";

    cy.login(email, password);
    cy.get(".top-1\\/2").should("be.visible").click();
    cy.get(":nth-child(6) > .flex > p").should("be.visible").click();
    cy.contains("Logout successful");
  });
});
