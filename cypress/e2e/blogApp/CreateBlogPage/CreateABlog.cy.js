describe("Create A Blog", function () {
  beforeEach(() => {
    cy.login();
    cy.goToBlog();
    cy.get(".lg\\:hidden > .flex").should("be.visible").click();
    cy.get('[href="/blog/create-blog"]').click();
  });
  const TestTitle = "Test Title";
  const TestBody = "Test Body";
  const wrongfieldValue = "*////12312312132";

  it("Creating a Blog", () => {
    cy.get("#dropzone-file").selectFile("cypress/fixtures/images/test.jpg", {
      action: "drag-drop",
      force: true,
    });
    cy.get("#title").type(TestTitle);
    cy.get("#body").type(TestBody);
    cy.get(".bg-primary-700").click();
    cy.wait(7000);
    cy.get(":nth-child(1) > .bg-gray-50 > .mt-2 > a > .mb-2").should(
      "have.text",
      TestTitle,
    );
  });

  it("Creating a Blog without cover photo", () => {
    cy.get("#title").type(TestTitle);
    cy.get("#body").type(TestBody);
    cy.get(".bg-primary-700").click();
    cy.get(".mb-3").should("have.css", "color", "rgb(244, 106, 106)");
  });

  it("Creating a Blog without title", () => {
    cy.get("#dropzone-file").selectFile("cypress/fixtures/images/test.jpg", {
      action: "drag-drop",
      force: true,
    });
    cy.get("#body").type(TestBody);
    cy.get(".bg-primary-700").click();
    cy.get(":nth-child(1) > .mb-2").should(
      "have.css",
      "color",
      "rgb(244, 106, 106)",
    );
  });

  it("Creating a Blog without body", () => {
    cy.get("#dropzone-file").selectFile("cypress/fixtures/images/test.jpg", {
      action: "drag-drop",
      force: true,
    });
    cy.get("#title").type(TestTitle);
    cy.get(".bg-primary-700").click();
    cy.get(":nth-child(2) > .mb-2").should(
      "have.css",
      "color",
      "rgb(244, 106, 106)",
    );
  });

  it("Creating a Blog with faulty title", () => {
    cy.get("#dropzone-file").selectFile("cypress/fixtures/images/test.jpg", {
      action: "drag-drop",
      force: true,
    });
    cy.get("#title").type(wrongfieldValue);
    cy.get("#body").type(TestBody);
    cy.get(".bg-primary-700").click();
    cy.get(":nth-child(1) > .mb-2").should(
      "have.css",
      "color",
      "rgb(244, 106, 106)",
    );
  });

  it("Creating a Blog with faulty body", () => {
    cy.get("#dropzone-file").selectFile("cypress/fixtures/images/test.jpg", {
      action: "drag-drop",
      force: true,
    });
    cy.get("#title").type(TestTitle);
    cy.get("#body").type(wrongfieldValue);
    cy.get(".bg-primary-700").click();
    cy.get(":nth-child(2) > .mb-2").should(
      "have.css",
      "color",
      "rgb(244, 106, 106)",
    );
  });
});
