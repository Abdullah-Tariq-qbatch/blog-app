// describe("Visit modules", function () {
//   beforeEach(() => {
//     cy.login();
//     cy.get('[href="/tv-shows"]').click();
//   });

// it("Add tv-show", () => {
//   cy.get("[href='/tv-shows/add-tv-show']").click();
//   cy.get("#name").type("Testing show");
//   cy.get("#permalink").type("Testing Link");
//   cy.get("#start_date").type("2013-08-08");
//   cy.get("[name='image_thumbnail_path']").selectFile("img.jpg");
//   cy.get("[name='country']").select("India");
//   cy.get("[name='network']").select("HBO");
//   cy.get("[type='submit']").click();
// });

// it("Delete tv-shows", () => {
//   cy.get(
//     ":nth-child(2) > .max-w-sm > .mx-auto > .mb-4 > button.inline-flex",
//   ).click();
//   cy.get(".bg-white > .flex > .text-white").click();
// });

// });

// describe("Filter section", function () {
//   beforeEach(() => {
//     cy.login();
//     cy.get('[href="/tv-shows"]').click();
//   });

// it("Filter tv-shows (Based-upon Country)", () => {
//   cy.get(".mr-4 > :nth-child(3)").select("US");
// });

// it("Filter tv-shows (Based-upon Network)", () => {
//   cy.get(".mr-4 > :nth-child(2)").select("HBO");
// });

// it("Filter tv-shows (Based-upon Network and Country)", () => {
//   cy.get(".mr-4 > :nth-child(2)").select("Netflix");
//   cy.get(".mr-4 > :nth-child(3)").select("US");
// });

// });

describe("Search tv-shows", function () {
  beforeEach(() => {
    cy.login();
    cy.get('[href="/tv-shows"]').click();
  });
  // it("Search correct tv-show", () => {
  //   cy.get("[type='search']").type("The Flash");
  // });

  // it("Search invalid tv-show", () => {
  //   cy.get("[type='search']").type("asds");
  // });

  // it("Search tv-show and move to last page", () => {
  //   cy.get("[type='search']").type("F");
  //   cy.wait(3000);
  //   cy.contains("Last").click();
  // });

  // it("Search tv-show and move to second page", () => {
  //   cy.get("[type='search']").type("F");
  //   cy.wait(3000);
  //   cy.get(".isolate > :nth-child(4)").click();
  // });
});
