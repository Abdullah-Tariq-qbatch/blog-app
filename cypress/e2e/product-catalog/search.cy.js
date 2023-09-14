/* eslint-disable no-undef */

// search Items Exist
const searchSelector = "[id='search']";
const validSearch = "phone";
const inValidSearch = "hello";

describe("Product Search Input", () => {
  beforeEach(() => {
    cy.login("faiq@gmail.com");
    cy.visitCatalog();
  });

  // Valid search
  it("Valid Search", () => {
    cy.get(`${searchSelector}`).type(`${validSearch}`);
    cy.wait(1000);
    cy.get(".grid").children().should("have.length", 4);
  });

  it("Page No Click after Search", () => {
    cy.get(`${searchSelector}`).type(`${validSearch}`);
    cy.wait(1000);
    cy.get(".inline-flex > :nth-child(2) > .flex").click();
    cy.wait(1000);
    cy.get(".grid").children().should("have.length", 4);
  });

  it("First Page Button Click after Search", () => {
    cy.get(`${searchSelector}`).type(`${validSearch}`);
    cy.wait(1000);
    cy.get(".inline-flex > :nth-child(1) > .hidden").click();
    cy.wait(1000);
    cy.url().should("contain", `/catalog/?search=${validSearch}`);
  });

  it("Last Page Button Click after Search", () => {
    cy.get(`${searchSelector}`).type(`${validSearch}`);
    cy.wait(1000);
    cy.get(":nth-child(3) > .md\\:flex").click();
    cy.wait(1000);
    cy.url().should("contain", `/catalog/?search=${validSearch}`);
  });

  // invalid search
  it("Invalid Search", () => {
    cy.get(`${searchSelector}`).type(`${inValidSearch}`);
    cy.wait(1000);
    cy.get(".text-2xl").should("have.text", "Data not Found");
  });

  it("First Page Button Click after Invalid Search", () => {
    cy.get(`${searchSelector}`).type(`${inValidSearch}`);
    cy.wait(1000);
    cy.get(".inline-flex > :nth-child(1) > .hidden").click();
    cy.wait(1000);
    cy.url().should("contain", `/catalog/?search=${inValidSearch}`);
  });

  it("Last Page Button Click after Invalid Search", () => {
    cy.get(`${searchSelector}`).type(`${inValidSearch}`);
    cy.wait(1000);
    cy.get(":nth-child(2) > .md\\:flex").click();
    cy.wait(1000);
    cy.url().should("contain", `/catalog/?search=${inValidSearch}`);
  });
});

describe("Product Search by URL", function () {
  beforeEach(() => {
    cy.login("faiq@gmail.com");
    cy.visitCatalog();
  });

  // search exist test cases
  it("Valid Search", () => {
    cy.visit(`/catalog/?search=${validSearch}`);
    cy.wait(1000);
    cy.get(".grid").children().should("have.length", 4);
  });

  it("Valid Search and Valid Page No", () => {
    cy.visit(`/catalog/?search=${validSearch}&pageNo=1`);
    cy.wait(1000);
    cy.get(".grid").children().should("have.length", 4);
  });

  it("Valid Search and Invalid Page No", () => {
    cy.visit(`/catalog/?search=${validSearch}&pageNo=10`);
    cy.wait(1000);
    cy.get(".text-2xl").should("have.text", "Data not Found");
  });

  // search dose not exist test cases
  it("Invalid Search", () => {
    cy.visit(`/catalog/?search=${inValidSearch}`);
    cy.wait(1000);
    cy.get(".text-2xl").should("have.text", "Data not Found");
  });

  it("Invalid Search and Page No Positive", () => {
    cy.visit(`/catalog/?search=${inValidSearch}&pageNo=1`);
    cy.wait(1000);
    cy.get(".text-2xl").should("have.text", "Data not Found");
  });

  it("Invalid Search and Page No Negative", () => {
    cy.visit(`/catalog/?search=${inValidSearch}&pageNo=-1`);
    cy.wait(1000);
    cy.get(".text-2xl").should("have.text", "Data not Found");
  });
});
