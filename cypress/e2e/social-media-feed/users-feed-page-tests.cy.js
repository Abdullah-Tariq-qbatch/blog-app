describe("Pagination", function () {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
    cy.get('[href="/social-media"]').click();
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get('[href="/social-media/users-feed"]').click();
  });

  it("Test case 01: go to page number 4", () => {
    cy.get(":nth-child(5) > .flex").click();
    cy.get(".mt-3 > :nth-child(1)").invoke("text").should("equal", String(4));
  });

  it("Test case 02: go to last page", () => {
    cy.wait(2000);
    cy.get(":nth-child(7) > .md\\:flex").click();
    cy.wait(2000);
    cy.get(".mx-2").children().should("have.length", 4);
  });
});

describe("Buttons", function () {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
    cy.get('[href="/social-media"]').click();
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get('[href="/social-media/users-feed"]').click();
  });

  it("Test case 01: view user posts", () => {
    cy.wait(2000);
    cy.get(
      ":nth-child(1) > .bg-white-400 > .flex-col > .mt-4 > :nth-child(2)",
    ).click();
    cy.get(":nth-child(1) > .profile-page > .h-\\[500px\\] > .h-full").should(
      "be.visible",
    );
  });

  it("Test case 02: delete user ", () => {
    cy.get(
      ":nth-child(1) > .bg-white-400 > .flex-col > .mt-4 > :nth-child(1)",
    ).click();
    cy.get(".ml-20 > .mb-auto").click();
    cy.wait(1000);
  });
});

describe("Search Bar", function () {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
    cy.get('[href="/social-media"]').click();
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get('[href="/social-media/users-feed"]').click();
  });

  it("Test case 01: search with name Terry should return total of 1 page", () => {
    cy.get("#default-search").type("Terry");
    cy.get(".mt-3 > :nth-child(1)").invoke("text").should("equal", String(1));
  });

  it("Test case 02: search with name Terry should return total of 2 users", () => {
    cy.get("#default-search").type("Terry");
    cy.get(".mx-2").children().should("have.length", 2);
  });

  it("Test case 03: search with name and then remove the name", () => {
    cy.get("#default-search").type("Terry");
    cy.get(":nth-child(1) > .bg-white-400 > .flex-col > .my-2")
      .invoke("text")
      .should("equal", "Terry Smitham Medhurst");
    cy.get("#default-search").clear();
    cy.get(".mx-2").children().should("have.length", 12);
  });

  it("Test case 04: search with name SomeData should return total of 0 page", () => {
    cy.get("#default-search").type("SomeData");
    cy.get(".mt-3 > :nth-child(1)").invoke("text").should("equal", String(0));
  });

  it("Test case 05: search with name SomeData should return total of 0 users", () => {
    cy.get("#default-search").type("SomeData");
    cy.get(".mx-2").children().should("have.length", 1);
  });

  it("Test case 06: search with name Ter and change the page ", () => {
    cy.get("#default-search").type("Ter");
    cy.get(".mx-2").children().should("have.length", 1);
    cy.wait(2000);
    cy.get(".inline-flex > :nth-child(3) > .flex").click();
    cy.get(".mx-2").children().should("have.length", 2);
  });
});
