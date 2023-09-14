describe("Navigation Bar Tests", function () {
  beforeEach(() => {
    cy.loginAndGoToSocialMedia();
    cy.visit("/");
    cy.get('[href="/social-media"]').click();
  });

  it("Test case 01:  should navigate to Posts Feed Page", () => {
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.wait(2000);
    cy.get('.text-sm > [href="/social-media/posts-feed"]').click();
    cy.wait(2000);
    cy.get(
      ":nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6",
    ).should("be.visible");
  });

  it("Test case 02:  should navigate to Add New Posts Page", () => {
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get(`[href="/social-media/add-post"]`).click();
    cy.get(".mb-10 > .items-center").should("be.visible");
    cy.wait(2000);
  });

  it("Test case 03:  should navigate to Users Feed Page", () => {
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get('[href="/social-media/users-feed"]').click();
    cy.get(".mx-2").should("be.visible");
    cy.wait(2000);
  });

  it("Test case 04: should navigate to My Posts Page", () => {
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get('[href="/social-media/my-posts"]').click();
    cy.get(
      ":nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6",
    ).should("be.visible");
    cy.wait(2000);
  });

  it("Test case 05: should switch the theme", () => {
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get(".w-full > .cursor-pointer").click();
    cy.wait(2000);
  });

  it("Test case 06: should switch back the theme", () => {
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get(".w-full > .cursor-pointer").click();
    cy.get(".w-full > .cursor-pointer").click();
    cy.wait(2000);
  });

  it("Test case 07: should navigate to Home Page", () => {
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get(".w-10").click();
    cy.get(
      ":nth-child(1) > .profile-page > .bg-blueGray-200 > .container > .-mt-64 > .px-6",
    ).should("be.visible");
    cy.wait(2000);
  });

  it("Test case 08: should close the navigation after navigating to Home Page through logo", () => {
    cy.get(`.lg\\:hidden > .flex`).click();
    cy.get(".w-10").click();
    cy.wait(1000);
    cy.get(".lg\\:hidden > .flex").click();
    cy.wait(2000);
  });
});
