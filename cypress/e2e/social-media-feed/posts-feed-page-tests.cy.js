describe("Post Comment Tests", function () {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
    cy.get('[href="/social-media"]').click();
  });

  it("Test case 01:  should add new user comment", () => {
    const comment = "Some random comment";
    cy.get(
      `:nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > .border-blueGray-200 > .flex-wrap > .lg\\:w-9\\/12 > .grid > .col-span-12 > .flex-col > .col-span-6 > .focus\\:shadow-outline`,
    ).type(`${comment}{enter}`);
    cy.get(`.lg\\:w-9\\/12 > .block > :nth-child(1)`).should("be.visible");
    cy.get(".block > :nth-child(1) > .space-y-2 > .flex-col > .text-sm")
      .invoke("text")
      .should("equal", comment);
    cy.wait(2000);
  });

  it("Test case 02:  should not add new user comment", () => {
    cy.get(
      `:nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > .border-blueGray-200 > .flex-wrap > .lg\\:w-9\\/12 > .grid > .col-span-12 > .flex-col > .lg\\:mx-1 > .my-auto`,
    ).click();
    cy.get(
      ":nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > .border-blueGray-200 > .flex-wrap > .lg\\:w-9\\/12",
    )
      .children()
      .should("have.length", 3);
    cy.wait(2000);
  });

  it("Test case 03:  hide comments after uploading", () => {
    const comment = "Some random comment";
    cy.get(
      `:nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > .border-blueGray-200 > .flex-wrap > .lg\\:w-9\\/12 > .grid > .col-span-12 > .flex-col > .col-span-6 > .focus\\:shadow-outline`,
    ).type(`${comment}{enter}`);
    cy.get(
      ":nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > .border-blueGray-200 > .flex-wrap > .lg\\:w-9\\/12 > .grid > .col-span-12 > .flex-col > .lg\\:mx-2 > .my-auto",
    ).click();
    cy.get(
      ":nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > .border-blueGray-200 > .flex-wrap > .lg\\:w-9\\/12",
    )
      .children()
      .should("have.length", 3);
    cy.wait(2000);
  });

  it("Test case 04:  should view the comments when clicked on View comments", () => {
    cy.get(
      `:nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > .border-blueGray-200 > .flex-wrap > .lg\\:w-9\\/12 > .grid > .col-span-12 > .flex-col > .lg\\:mx-2 > .my-auto`,
    ).click();
    cy.get(`.lg\\:w-9\\/12 > .block > :nth-child(1)`).should("be.visible");
    cy.wait(2000);
  });

  it("Test case 05:  should view the comments when clicked on View comments and then hide it on next click", () => {
    cy.get(
      `:nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > .border-blueGray-200 > .flex-wrap > .lg\\:w-9\\/12 > .grid > .col-span-12 > .flex-col > .lg\\:mx-2 > .my-auto`,
    ).click();

    cy.get(
      `:nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > .border-blueGray-200 > .flex-wrap > .lg\\:w-9\\/12 > .grid > .col-span-12 > .flex-col > .lg\\:mx-2 > .my-auto`,
    ).click();

    cy.get(
      ":nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > .border-blueGray-200 > .flex-wrap > .lg\\:w-9\\/12",
    )
      .children()
      .should("have.length", 3);
    cy.wait(2000);
  });
});

describe("Post Icons Tests", function () {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
    cy.get('[href="/social-media"]').click();
  });

  it("Test case 01:  should delete the post when clicked on delete button", () => {
    cy.get(
      `:nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > :nth-child(1) > .order-3 > .flex > .mr-4.p-3`,
    ).click();
    cy.get(`.ml-20 > .mb-auto`).click();
    cy.wait(2000);
  });

  it("Test case 02:  should like the post when clicked on like button", () => {
    cy.get(
      `:nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > :nth-child(1) > .order-3 > .flex > .lg\\:mr-4`,
    ).click();
    cy.wait(2000);
  });

  it("Test case 03:  should like the post when clicked on like button and on next click should undo the like", () => {
    cy.get(
      `:nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > :nth-child(1) > .order-3 > .flex > .lg\\:mr-4`,
    ).click();
    cy.get(
      `:nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > :nth-child(1) > .order-3 > .flex > .lg\\:mr-4`,
    ).click();
    cy.wait(2000);
  });

  it("Test case 04:  should not delete the post when clicked on cancel button", () => {
    cy.get(
      `:nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > :nth-child(1) > .order-3 > .flex > .mr-4.p-3`,
    ).click();
    cy.get(".ml-4 > .mb-auto").click();
    cy.wait(2000);
  });
});
