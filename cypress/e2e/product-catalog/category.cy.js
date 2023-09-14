/* eslint-disable no-undef */

const { startCase } = require("lodash");

const validCategory = "laptops";
const invalidCategory = "hello";
const toggleClick = true;
const toggleURL = true;

describe("Product Category Click", function () {
  beforeEach(() => {
    cy.login("faiq@gmail.com");
    cy.visitCatalog();
    cy.visit("/catalog");
  });

  if (toggleClick) {
    it("Category select", () => {
      cy.get(".appearance-none").select(`${validCategory}`);
      cy.wait(1000);
      cy.get(".container > .mb-4").should(
        "have.text",
        startCase(validCategory),
      );
      cy.get(".grid")
        .find(".border-2 > :nth-child(2) > .text-xs")
        .each(($element) => {
          cy.wrap($element).should("have.text", validCategory);
        });
    });

    it("Page No Click after Category Select", () => {
      cy.get(".appearance-none").select(`${validCategory}`);
      cy.get(".inline-flex > :nth-child(2) > .flex").click();
      cy.wait(1000);
      cy.url().should(
        "contain",
        `/catalog/?pageNo=1&category=${validCategory}`,
      );
    });

    it("First Page Button Click after Category Select", () => {
      cy.get(".appearance-none").select(`${validCategory}`);
      cy.wait(1000);
      cy.get(".inline-flex > :nth-child(1) > .hidden").click();
      cy.wait(1000);
      cy.url().should("contain", `/catalog/?category=${validCategory}`);
    });

    it("Last Page Button Click after Category Select", () => {
      cy.get(".appearance-none").select(`${validCategory}`);
      cy.wait(1000);
      cy.get(":nth-child(3) > .md\\:flex").click();
      cy.wait(1000);
      cy.url().should("contain", `/catalog/?category=${validCategory}`);
    });
  }
});

describe("Product Category by URL", function () {
  beforeEach(() => {
    cy.login("faiq@gmail.com");
    cy.visitCatalog();
  });

  // category valid
  if (toggleURL) {
    it("Valid Category", () => {
      cy.visit(`/catalog?category=${validCategory}`);
      cy.wait(1000);
      cy.get(".grid")
        .find(".border-2 > :nth-child(2) > .text-xs")
        .each(($element) => {
          cy.wrap($element).should("have.text", validCategory);
        });
    });

    it("Valid Category and Valid Page No", () => {
      cy.visit(`/catalog?pageNo=1&category=${validCategory}`);
      cy.wait(1000);

      cy.url().should("contain", `/catalog?pageNo=1&category=${validCategory}`);
    });

    it("Valid Category and Invalid Page no", () => {
      cy.visit(`/catalog?pageNo=-1&category=${validCategory}`);
      cy.wait(1000);
      cy.get(".text-2xl").should("have.text", "Data not Found");
    });

    // category Invalid
    it("Invalid Category", () => {
      cy.visit(`/catalog?category=${invalidCategory}`);
      cy.wait(1000);
      cy.get(".text-2xl").should("have.text", "Data not Found");
    });

    it("Invalid category and Page no positive", () => {
      cy.visit(`/catalog?pageNo=1&&category=${invalidCategory}`);
      cy.wait(1000);
      cy.get(".text-2xl").should("have.text", "Data not Found");
    });

    it("invalid category and Page No Negative", () => {
      cy.visit(`/catalog?category=${invalidCategory}&pageNo=-1`);
      cy.wait(1000);
      cy.get(".text-2xl").should("have.text", "Data not Found");
    });
  }
});
