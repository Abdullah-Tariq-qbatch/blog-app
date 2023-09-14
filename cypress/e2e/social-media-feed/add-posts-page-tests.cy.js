const image = "/Users/mac/Downloads/web-image.jpg";

describe("Add New Post", function () {
  beforeEach(() => {
    cy.loginAndGoToSocialMedia();
    cy.visit("/");
    cy.get('[href="/social-media"]').click();
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get(`[href="/social-media/add-post"]`).click();
  });

  it("Test case 01: should not add new post while giving only image", () => {
    cy.get("#file").selectFile(image);
    cy.get(".mt-3 > .mx-auto").click();
    cy.wait(2000);
  });

  it("Test case 02: should not add new post while giving image and title", () => {
    cy.get("#file").selectFile(image);
    cy.get("#title").type(`Some title`);
    cy.get(".mt-3 > .mx-auto").click();
    cy.wait(2000);
  });

  it("Test case 03: should not add new post while giving post and title", () => {
    cy.get("#title").type(`Some title`);
    cy.get("#post").type(`some post`);
    cy.get(".mt-3 > .mx-auto").click();
    cy.wait(2000);
  });

  it("Test case 04: should not add new post while giving post and image", () => {
    cy.get("#post").type(`some post`);
    cy.get("#file").selectFile(image);
    cy.get(".mt-3 > .mx-auto").click();
    cy.wait(2000);
  });

  it("Test case 05:  should not add new post while giving only post", () => {
    cy.get("#post").type(`some post`);
    cy.get(".mt-3 > .mx-auto").click();
    cy.wait(2000);
  });

  it("Test case 06: should not add new post while giving only title", () => {
    cy.get("#title").type(`Some title{enter}`);
    cy.get(".mt-3 > .mx-auto").click();
    cy.wait(2000);
  });

  it("Test case 07: should not add new post while giving only post", () => {
    cy.get("#post").type(`some post`);
    cy.get(".mt-3 > .mx-auto").click();
    cy.wait(2000);
  });

  it("Test case 08: should not add new post while giving only post", () => {
    cy.get("#post").type(`some post`);
    cy.get(".mt-3 > .mx-auto").click();
    cy.wait(2000);
  });

  it("Test case 09: should add new post while giving post, title and image", () => {
    const title = "some random title";
    const post = "some post";
    cy.get("#title").type(title);
    cy.get("#post").type(post);
    cy.get("#file").selectFile(image);
    cy.get(".mt-3 > .mx-auto").click();

    cy.get(
      ":nth-child(4) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > .mt-12 > .text-blueGray-600",
    ).should("be.visible");

    cy.get(
      ":nth-child(4) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > .mt-12 > .text-blueGray-600",
    )
      .invoke("text")
      .should("equal", title);

    cy.get(
      `:nth-child(4) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > .border-blueGray-200 > .flex-wrap > .lg\\:w-9\\/12 > .text-blueGray-700`,
    )
      .invoke("text")
      .should("equal", post);

    cy.get(
      ":nth-child(4) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > :nth-child(1) > .order-2 > .flex > .mr-4 > .text-blueGray-600",
    )
      .invoke("text")
      .should("equal", String(0));

    cy.wait(2000);
  });
});
