describe("Filter section", function () {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
    cy.get('[href="/tv-shows"]').click();
  });

  it("Filter tv-shows (Based-upon Country)", () => {
    cy.get(".mr-4 > :nth-child(3)").select("US");
  });

  it("Filter tv-shows (Based-upon Network)", () => {
    cy.get(".mr-4 > :nth-child(2)").select("HBO");
  });

  it("Sort the tv-shows", () => {
    cy.wait(1000);
    cy.get("#checked-checkbox").click();
  });

  it("Filter tv-shows (Based-upon Network and Country)", () => {
    cy.get(".mr-4 > :nth-child(2)").select("Netflix");
    cy.get(".mr-4 > :nth-child(3)").select("US");
  });

  it("Filter tv-shows and then sort it (Based-upon Network and Country)", () => {
    cy.get(".mr-4 > :nth-child(2)").select("The CW");
    cy.get(".mr-4 > :nth-child(3)").select("US");
    cy.get("#checked-checkbox").click();
  });
});
