describe("Visit modules", function () {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
    cy.get('[href="/tv-shows"]').click();
    cy.viewport("macbook-16");
  });

  it("Add tv-show", () => {
    cy.get("[href='/tv-shows/add-tv-show']").click();
    cy.get("#name").type("Testing show");
    cy.get("#permalink").type("Testing Link");
    cy.get("#start_date").type("2013-08-08");
    cy.get("[name='image_thumbnail_path']").selectFile("img.jpg");
    cy.get("[name='country']").select("India");
    cy.get("[name='network']").select("HBO");
    cy.get("[type='submit']").click();
  });

  it("Delete tv-shows", () => {
    cy.get(
      ":nth-child(2) > .max-w-sm > .mx-auto > .mb-4 > button.inline-flex",
    ).click();
    cy.get(".bg-white > .flex > .text-white").click();
  });
});
