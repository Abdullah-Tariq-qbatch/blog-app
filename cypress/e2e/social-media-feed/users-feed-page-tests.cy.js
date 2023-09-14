describe("Social Media Feed Tests", function () {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
    cy.get('[href="/social-media"]').click();
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get('[href="/social-media/users-feed"]').click();
  });

  it("Test case 01: view user posts", () => {
    cy.wait(500);
    cy.get(
      ":nth-child(13) > .bg-white-400 > .flex-col > .mt-4 > :nth-child(2)",
    ).click();
  });

  it("Test case 02: search with name and then remove the name", () => {
    cy.get("#default-search").type("Terry");
    cy.get("#default-search").clear();
  });

  it("Test case 03: go to page number 4", () => {
    cy.get(":nth-child(5) > .flex").click();
  });

  it("Test case 04: search with name Terry", () => {
    cy.get("#default-search").type("Terry");
  });
});
