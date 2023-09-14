describe("search a blog", function () {
  const correctSearchTerm = "dave";
  const correctSearchLetter = "d";
  const wrongSearchTerm = "adadasdasdas";

  beforeEach(() => {
    cy.login();
    cy.goToBlog();
  });

  it("Search Yielding correct result on Correct Query", () => {
    cy.get("#default-search").type(correctSearchTerm);
    cy.wait(4000);
    cy.get(".grid").within(() => {
      cy.get(".bg-gray-50 > .mt-2 > a > .mb-2").each(($el) => {
        cy.wrap($el)
          .invoke("text")
          .then((resultText) => {
            expect(resultText.toLowerCase()).to.include(
              correctSearchTerm.toLowerCase(),
            );
          });
      });
    });
  });

  it("Search Yielding No result on Wrong Query", () => {
    cy.get("#default-search").type(wrongSearchTerm);
    cy.wait(4000);
    cy.get(".mt-10 > .text-gray-700").should("include.text", "Sorry");
  });

  it("Search Yielding result via Search Input Field", () => {
    cy.get("#default-search").type(correctSearchTerm);
    cy.wait(4000);
  });

  it("Search Not Yielding result via Search Input Field", () => {
    cy.get("#default-search").type(wrongSearchTerm);
    cy.wait(4000);
  });

  it("Search Yielding result via URL Search Params", () => {
    cy.visit(`/blog?search=${correctSearchTerm}`);
    cy.wait(4000);
  });

  it("Search Not Yielding result via URL Search Params", () => {
    cy.visit(`/blog?search=${wrongSearchTerm}`);
    cy.wait(4000);
  });

  it("Clicking First Page Button when result yield only 1 page", () => {
    cy.get("#default-search").type(correctSearchTerm);
    cy.url().then((initialUrl) => {
      cy.get(".inline-flex > :nth-child(1) > .hidden").click();
      cy.url().should("equal", initialUrl);
    });
    cy.wait(4000);
  });

  it("Clicking Last Page Button when result yield only 1 page", () => {
    cy.get("#default-search").type(correctSearchTerm);
    cy.wait(1000);
    cy.url().then((initialUrl) => {
      cy.get(":nth-child(3) > .md\\:flex").click();
      cy.log(initialUrl);
      cy.url().should("equal", initialUrl);
    });
    cy.wait(4000);
  });

  it("Clicking Page 1 Button when result yield only 1 page", () => {
    cy.get("#default-search").type(correctSearchTerm);
    cy.wait(1000);
    cy.url().then((initialUrl) => {
      cy.get(".inline-flex > :nth-child(2) > .flex").click();
      cy.log(initialUrl);
      cy.url().should("contain", "search=dave");
    });
    cy.wait(4000);
  });

  it("Clicking First Page Button when result yield more than 1 page", () => {
    cy.get("#default-search").type(correctSearchLetter);
    cy.wait(4000);
    cy.get(".inline-flex > :nth-child(1) > .hidden").click();
    cy.url().should("contain", "search=d");
  });

  it("Clicking Last Page Button when result yield more than 1 page", () => {
    cy.get("#default-search").type(correctSearchLetter);
    cy.wait(4000);
    cy.get(":nth-child(7) > .md\\:flex").click();
    cy.url().should("contain", "search=d");
  });

  it("Clicking Page Number Button when result yield more than 1 page", () => {
    cy.get("#default-search").type(correctSearchLetter);
    cy.wait(4000);
    cy.get(".inline-flex > :nth-child(4) > .flex").click();
    cy.url().should("contain", "search=d");
  });

  it("Clicking First Page Button when result yield 0 page", () => {
    cy.get("#default-search").type(wrongSearchTerm);
    cy.url().then((initialUrl) => {
      cy.get(".inline-flex > :nth-child(1) > .hidden").click();
      cy.url().should("equal", initialUrl);
    });
    cy.wait(4000);
  });

  it("Clicking Last Page Button when result yield 0 page", () => {
    cy.get("#default-search").type(wrongSearchTerm);
    cy.url().then((initialUrl) => {
      cy.get(":nth-child(2) > .md\\:flex").click();
      cy.url().should("equal", initialUrl);
    });
    cy.wait(4000);
  });

  it("Search Yielding result via URL Search Params with wrong Page Number", () => {
    cy.visit(`/blog?search=${correctSearchTerm}&page=-12`);
    cy.wait(4000);
    cy.get(".mt-10 > .text-gray-700").should("include.text", "Sorry");
  });
});
