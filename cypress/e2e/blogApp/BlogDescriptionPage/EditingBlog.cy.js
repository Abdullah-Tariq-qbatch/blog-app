describe("Editing a Blog", function () {
  beforeEach(() => {
    cy.login();
    cy.goToBlog();
    cy.goToBlogDetailPage();
  });

  it("Editing a Blog", () => {
    const newTitle = "Test Title";
    cy.get("a > .anticon").click();
    cy.get("#dropzone-file").selectFile("cypress/fixtures/images/test.jpg", {
      action: "drag-drop",
      force: true,
    });
    cy.get("#title").clear().type(newTitle);
    cy.get(".bg-primary-700").click();
    cy.wait(5000);
    cy.get(".ml-auto").click();
    cy.get(".py-10").should("have.text", newTitle);
  });
});
