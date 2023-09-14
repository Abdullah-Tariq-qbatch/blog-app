describe("Search tv-shows Tests", function () {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
    cy.get('[href="/tv-shows"]').click();
  });
  it("Search correct tv-show", () => {
    cy.get("[type='search']").type("The Flash");
    cy.wait(3000);
  });

  it("Search invalid tv-show", () => {
    cy.get("[type='search']").type("asds");
    cy.wait(3000);
    cy.contains("Take me home").should("exist");
  });

  it("Search tv-show and move to last page", () => {
    cy.get("[type='search']").type("F");
    cy.wait(3000);
    cy.contains("Last").click();
    cy.get(
      "[class='flex max-w-sm flex-col rounded-lg border border-gray-200 bg-white shadow dark:border-gray-950 dark:bg-gray-950']",
    ).should("have.length.gt", 1);
  });

  it("Search tv-show and Sort it", () => {
    cy.get("[type='search']").type("vi");
    cy.wait(3000);
    cy.get(
      "[class='flex max-w-sm flex-col rounded-lg border border-gray-200 bg-white shadow dark:border-gray-950 dark:bg-gray-950']",
    ).should("have.length.gt", 1);
    cy.get("#checked-checkbox").click();
  });

  it("Search tv-show and move to second page", () => {
    cy.get("[type='search']").type("F");
    cy.wait(3000);
    cy.get(".isolate > :nth-child(4)").click();
  });

  it("Search tv-show and Filter it", () => {
    cy.get("[type='search']").type("F");
    cy.wait(3000);
    cy.get(".mr-4 > :nth-child(2)").select("Netflix");
    cy.get(".mr-4 > :nth-child(3)").select("US");
  });
});
