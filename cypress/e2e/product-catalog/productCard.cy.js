/* eslint-disable no-undef */
describe("Delete Button", () => {
  let temp;
  beforeEach(() => {
    cy.login();
    cy.visitCatalog();
    cy.wait(1000);
    cy.get(":nth-child(1) > .border-2 > .h-\\[50px\\] > .w-\\[90\\%\\]")
      .invoke("text")
      .then((name) => {
        temp = name;
      });
    cy.get(
      ":nth-child(1) > .border-2 > .items-end > button.inline-flex",
    ).click();
  });

  it("Cancel Button Clicked", () => {
    cy.get(".ml-2").click();
    cy.get(":nth-child(1) > .border-2 > .h-\\[50px\\] > .w-\\[90\\%\\]").should(
      "have.text",
      `${temp}`,
    );
  });

  it("Delete Button Clicked", () => {
    cy.get(".bg-white > .flex > .text-white").click();
    cy.get(".Toastify__toast-body").click();
    cy.get(":nth-child(1) > .border-2 > .h-\\[50px\\] > .w-\\[90\\%\\]").should(
      "not.have.text",
      `${temp}`,
    );
  });
});

describe("Edit Product", () => {
  beforeEach(() => {
    cy.login();
    cy.visitCatalog();
    cy.wait(1000);
  });

  it("Edit a Product", () => {
    cy.get(":nth-child(1) > .border-2 > .items-end > a.inline-flex").click();
    cy.get(".w-auto > :nth-child(3) > :nth-child(1) > div > .w-full").type(
      "{backspace}{backspace}15",
    );
    cy.get(":nth-child(3) > :nth-child(2) > div > .w-full").type(
      "{backspace}o",
    );
    cy.get(".mt-2").type(" is newly launched");
    cy.get(".flex > .mr-2").selectFile("cypress/fixtures/img.jpg");
    cy.get(".appearance-none").select("laptops");
    cy.get(".mb-2.grid > :nth-child(1) > .w-full").type(
      "{backspace}{backspace}{backspace}999",
    );
    cy.get(".mb-2.grid > :nth-child(2) > .w-full").type(
      "{backspace}{backspace}0",
    );

    cy.get(".mt-8").click();
    cy.wait(1000);
    cy.get(".Toastify__toast-body").click();
    cy.get(".text-red-600").should("have.text", "Out of Stock");
  });

  it("Edit URL", () => {
    cy.visit("/catalog/edit");
    cy.wait(1000);
    cy.url().should("include", "/catalog");
  });
});
