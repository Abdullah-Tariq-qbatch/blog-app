describe("Test Header", function () {
  beforeEach(() => {
    cy.login();
    cy.goToBlog();
  });

  it("Light Mode", () => {
    cy.get(".lg\\:hidden > .flex").should("be.visible").click();
    cy.get(".w-full > .cursor-pointer").click();
    cy.get(".lg\\:hidden > .flex").should("be.visible").click();
    cy.wait(2000);
  });

  it("Dark Mode", () => {
    cy.get(".lg\\:hidden > .flex").should("be.visible").click();
    cy.get(".w-full > .cursor-pointer").click();
    cy.wait(2000);
    cy.get(".w-full > .cursor-pointer").click();
    cy.get(".lg\\:hidden > .flex").should("be.visible").click();
    cy.wait(2000);
  });

  it("Write a Blog Link", () => {
    cy.get(".lg\\:hidden > .flex").should("be.visible").click();
    cy.get('[href="/blog/create-blog"]').click();
    cy.wait(2000);
    cy.url().should("contain", "/blog/create-blog");
  });

  it("Home Link", () => {
    cy.visit("/blog/create-blog");
    cy.wait(1000);
    cy.get(".lg\\:hidden > .flex").should("be.visible").click();
    cy.get(".text-sm > .text-gray-700").click();
    cy.url().should("contain", "/blog");
  });
});
