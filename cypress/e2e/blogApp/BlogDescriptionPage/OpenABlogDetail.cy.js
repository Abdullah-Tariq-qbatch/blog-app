describe("Open Blog detail Page", function () {
  beforeEach(() => {
    cy.login();
    cy.goToBlog();
  });

  it("Click on link to blog detail", () => {
    cy.get(":nth-child(1) > .bg-gray-50 > .mt-2 > a > .mb-2").click();
  });
});
