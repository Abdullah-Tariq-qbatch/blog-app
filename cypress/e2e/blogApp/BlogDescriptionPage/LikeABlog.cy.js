describe("Like a Blog", function () {
  beforeEach(() => {
    cy.login();
    cy.goToBlog();
    cy.goToBlogDetailPage();
  });

  it("Liking a Blog", () => {
    cy.wait(2000);
    cy.get(".w-2\\/3 > :nth-child(1) > .anticon").click();
  });

  it("Disiking a Blog", () => {
    cy.wait(2000);
    cy.get(".w-2\\/3 > :nth-child(1) > .anticon").click();
    cy.wait(2000);
    cy.get(".w-2\\/3 > :nth-child(1) > .anticon").click();
  });
});
