describe("Commenting on Blog", function () {
  beforeEach(() => {
    cy.login();
    cy.goToBlog();
    cy.goToBlogDetailPage();
  });

  it("Writing a Comment", () => {
    cy.get("#comment").type("Nice Article");
    cy.get(".mb-4 > .justify-between > .inline-flex").click();
    cy.wait(1000);
    cy.get(".ml-auto").click();
  });

  it("Deleting a Comment", () => {
    cy.get("#dropdownComment3Button").click();
    cy.wait(1000);
    cy.get(".ml-auto").click();
  });
});
