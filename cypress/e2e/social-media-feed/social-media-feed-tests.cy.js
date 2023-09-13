describe("Social Media Feed Tests", function () {
  beforeEach(() => {
    cy.login();
    cy.get('[href="/social-media"]').click();
  });

  //Post feed page

  it("Test case 01 (Post Feed Page):  should add new user comment", () => {
    const comment = "Some random comment";
    cy.get(
      `:nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > .border-blueGray-200 > .flex-wrap > .lg\\:w-9\\/12 > .grid > .col-span-12 > .flex-col > .col-span-6 > .focus\\:shadow-outline`,
    ).type(`${comment}{enter}`);
  });

  it("Test case 02 (Post Feed Page):  should not add new user comment", () => {
    cy.get(
      `:nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > .border-blueGray-200 > .flex-wrap > .lg\\:w-9\\/12 > .grid > .col-span-12 > .flex-col > .lg\\:mx-1 > .my-auto`,
    ).click();
  });

  it("Test case 03 (Post Feed Page):  hide comments after uploading", () => {
    const comment = "Some random comment";
    cy.get(
      `:nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > .border-blueGray-200 > .flex-wrap > .lg\\:w-9\\/12 > .grid > .col-span-12 > .flex-col > .col-span-6 > .focus\\:shadow-outline`,
    ).type(`${comment}{enter}`);
    cy.get(
      ":nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > .border-blueGray-200 > .flex-wrap > .lg\\:w-9\\/12 > .grid > .col-span-12 > .flex-col > .lg\\:mx-2 > .my-auto",
    ).click();
  });

  it("Test case 04 (Post Feed Page):  should view the comments when clicked on View comments", () => {
    cy.get(
      `:nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > .border-blueGray-200 > .flex-wrap > .lg\\:w-9\\/12 > .grid > .col-span-12 > .flex-col > .lg\\:mx-2 > .my-auto`,
    ).click();
  });

  it("Test case 05 (Post Feed Page):  should view the comments when clicked on View comments and then hide it on next click", () => {
    cy.get(
      `:nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > .border-blueGray-200 > .flex-wrap > .lg\\:w-9\\/12 > .grid > .col-span-12 > .flex-col > .lg\\:mx-2 > .my-auto`,
    ).click();
    cy.get(
      `:nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > .border-blueGray-200 > .flex-wrap > .lg\\:w-9\\/12 > .grid > .col-span-12 > .flex-col > .lg\\:mx-2 > .my-auto`,
    ).click();
  });

  it("Test case 06 (Post Feed Page):  should like the post when clicked on like button", () => {
    cy.get(
      `:nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > :nth-child(1) > .order-3 > .flex > .lg\\:mr-4`,
    ).click();
  });

  it("Test case 07 (Post Feed Page):  should delete the post when clicked on delete button", () => {
    cy.get(
      `:nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6 > :nth-child(1) > .order-3 > .flex > .mr-4.p-3`,
    ).click();
    cy.get(`.ml-20 > .mb-auto`).click();
  });

  //Add Post Page

  it("Test case 08 (Add Post Page):  should not add new post while giving only image", () => {
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get(`[href="/social-media/add-post"]`).click();

    cy.get("#file").selectFile("img-2.jpg");
    cy.get(".mt-3 > .mx-auto").click();
  });

  it("Test case 09 (Add Post Page):  should not add new post while giving image and title", () => {
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get(`[href="/social-media/add-post"]`).click();

    cy.get("#file").selectFile("img-2.jpg");
    cy.get("#title").type(`Some title`);
    cy.get(".mt-3 > .mx-auto").click();
  });

  it("Test case 10 (Add Post Page):  should not add new post while giving post and title", () => {
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get(`[href="/social-media/add-post"]`).click();

    cy.get("#title").type(`Some title`);
    cy.get("#post").type(`some post`);
    cy.get(".mt-3 > .mx-auto").click();
  });

  it("Test case 11 (Add Post Page):  should not add new post while giving post and image", () => {
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get(`[href="/social-media/add-post"]`).click();

    cy.get("#post").type(`some post`);
    cy.get("#file").selectFile("img-2.jpg");
    cy.get(".mt-3 > .mx-auto").click();
  });

  it("Test case 12 (Add Post Page):  should add new post while giving post, title and image", () => {
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get(`[href="/social-media/add-post"]`).click();

    cy.get("#title").type(`Some title{enter}`);
    cy.get("#post").type(`some post`);

    cy.get("#file").selectFile("img-2.jpg");
    cy.get(".mt-3 > .mx-auto").click();
  });

  it("Test case 13 (Add Post Page): should not add new post while giving only title", () => {
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get(`[href="/social-media/add-post"]`).click();

    cy.get("#title").type(`Some title{enter}`);
    cy.get(".mt-3 > .mx-auto").click();
  });

  it("Test case 14 (Add Post Page):  should not add new post while giving only post", () => {
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get(`[href="/social-media/add-post"]`).click();

    cy.get("#post").type(`some post`);
    cy.get(".mt-3 > .mx-auto").click();
  });

  //users feed page

  it("Test case 15 (Users Feed Page): view user posts", () => {
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get('[href="/social-media/users-feed"]').click();
    cy.get(
      ":nth-child(13) > .bg-white-400 > .flex-col > .mt-4 > :nth-child(2)",
    ).click();
  });

  it("Test case 16 (Users Feed Page): search with name and then remove the name", () => {
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get('[href="/social-media/users-feed"]').click();
    cy.get("#default-search").type("Terry");
    cy.get("#default-search").clear();
  });

  it("Test case 17 (Users Feed Page): go to page number 4", () => {
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get('[href="/social-media/users-feed"]').click();
    cy.get(":nth-child(5) > .flex").click();
  });

  it("Test case 18 (Users Feed Page): search with name Terry", () => {
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get('[href="/social-media/users-feed"]').click();
    cy.get("#default-search").type("Terry");
  });
});
