describe("Sharing a Blog", function () {
  beforeEach(() => {
    cy.login();
    cy.goToBlog();
    cy.goToBlogDetailPage();
  });

  it("Copy Link", () => {
    cy.get(".w-2\\/3 > :nth-child(3) > div > .anticon").click();
    cy.get(":nth-child(7) > .flex").click();
    cy.wait(1000);
    cy.get(".ml-auto").click();
  });
});
