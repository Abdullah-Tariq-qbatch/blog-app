describe("search a blog", function () {
  beforeEach(() => {
    cy.login();
    cy.goToBlog();
  });

  it("Count children on first page", () => {
    cy.get(".grid").children().should("have.length", 8);
  });

  it("Count children on last page", () => {
    cy.wait(1000);
    cy.get(":nth-child(7) > .md\\:flex").click();
    cy.wait(1000);
    cy.get(".grid").children().should("have.length.at.least", 1);
  });

  it("Page number through button", () => {
    cy.wait(1000);
    cy.get(".inline-flex > :nth-child(4) > .flex").click();
    cy.wait(1000);
  });

  it("Page number through URL", () => {
    cy.wait(1000);
    cy.visit("/blog?page=3");
    cy.wait(1000);
  });

  it("Wrong Positive page Number", () => {
    cy.wait(1000);
    cy.visit("/blog?page=90");
    cy.wait(1000);
    cy.get(".mt-10 > .text-gray-700").should("include.text", "Sorry");
  });

  it("Wrong Positive page Number", () => {
    cy.wait(1000);
    cy.visit("/blog?page=-90");
    cy.wait(1000);

    cy.get(".mt-10 > .text-gray-700").should("include.text", "Sorry");
  });
});
