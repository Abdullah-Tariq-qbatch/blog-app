describe("search a blog", function () {
  beforeEach(() => {
    cy.login();
    cy.goToBlog();
  });

  it("Apply Likeness Filter", () => {
    cy.wait(1000);
    let initialLikes;
    cy.get(
      ":nth-child(1) > .bg-gray-50 > .mt-5 > .justify-between > :nth-child(1) > .pl-1",
    )
      .invoke("text")
      .then((likes) => {
        initialLikes = likes;
      });

    cy.get("#filter").select("Likeness");
    cy.wait(1000);
    cy.get(
      ":nth-child(1) > .bg-gray-50 > .mt-5 > .justify-between > :nth-child(1) > .pl-1",
    )
      .invoke("text")
      .then((likes) => {
        expect(parseInt(likes)).to.be.greaterThan(parseInt(initialLikes));
      });
  });

  it("Apply Popularity Filter", () => {
    let initialLikes;
    let initialComments;

    cy.wait(2000);

    cy.get(
      ":nth-child(1) > .bg-gray-50 > .mt-5 > .justify-between > :nth-child(1) > .pl-1",
    )
      .invoke("text")
      .then((likes) => (initialLikes = parseInt(likes)));

    cy.get(
      ":nth-child(1) > .bg-gray-50 > .mt-5 > .justify-between > :nth-child(2) > .pl-1",
    )
      .invoke("text")
      .then((comments) => (initialComments = parseInt(comments)));

    cy.get("#filter").select("Popularity");
    cy.wait(1000);

    let finalLikes;

    cy.get(
      ":nth-child(1) > .bg-gray-50 > .mt-5 > .justify-between > :nth-child(1) > .pl-1",
    )
      .invoke("text")
      .then((likes) => (finalLikes = parseInt(likes, 10)));

    cy.get(
      ":nth-child(1) > .bg-gray-50 > .mt-5 > .justify-between > :nth-child(2) > .pl-1",
    )
      .invoke("text")
      .then((comments) =>
        expect(finalLikes + parseInt(comments)).to.be.greaterThan(
          initialLikes + initialComments,
        ),
      );
  });

  it("Apply Likeness Filter By URL", () => {
    cy.wait(1000);
    let initialLikes;
    cy.get(
      ":nth-child(1) > .bg-gray-50 > .mt-5 > .justify-between > :nth-child(1) > .pl-1",
    )
      .invoke("text")
      .then((likes) => {
        initialLikes = likes;
      });
    cy.visit("/blog/?filter=Likeness");
    cy.wait(1000);
    cy.get(
      ":nth-child(1) > .bg-gray-50 > .mt-5 > .justify-between > :nth-child(1) > .pl-1",
    )
      .invoke("text")
      .then((likes) => {
        expect(parseInt(likes)).to.be.greaterThan(parseInt(initialLikes));
      });
  });

  it("Apply Popularity Filter By URL", () => {
    let initialLikes;
    let initialComments;

    cy.wait(2000);

    cy.get(
      ":nth-child(1) > .bg-gray-50 > .mt-5 > .justify-between > :nth-child(1) > .pl-1",
    )
      .invoke("text")
      .then((likes) => (initialLikes = parseInt(likes)));

    cy.get(
      ":nth-child(1) > .bg-gray-50 > .mt-5 > .justify-between > :nth-child(2) > .pl-1",
    )
      .invoke("text")
      .then((comments) => (initialComments = parseInt(comments)));

    cy.visit("/blog/?filter=Popularity");
    cy.wait(1500);

    let finalLikes;

    cy.get(
      ":nth-child(1) > .bg-gray-50 > .mt-5 > .justify-between > :nth-child(1) > .pl-1",
    )
      .invoke("text")
      .then((likes) => (finalLikes = parseInt(likes, 10)));

    cy.get(
      ":nth-child(1) > .bg-gray-50 > .mt-5 > .justify-between > :nth-child(2) > .pl-1",
    )
      .invoke("text")
      .then((comments) =>
        expect(finalLikes + parseInt(comments)).to.be.greaterThan(
          initialLikes + initialComments,
        ),
      );
  });

  it("Correct Pagination With Likeness Filter", () => {
    cy.visit("/blog/?page=2");
    let initialLikes;
    cy.wait(2000);

    cy.get(
      ":nth-child(1) > .bg-gray-50 > .mt-5 > .justify-between > :nth-child(1) > .pl-1",
    )
      .invoke("text")
      .then((likes) => (initialLikes = parseInt(likes)));
    cy.wait(100);
    cy.visit("/blog/?filter=Likeness&page=2");
    cy.wait(1000);
    cy.get(
      ":nth-child(1) > .bg-gray-50 > .mt-5 > .justify-between > :nth-child(1) > .pl-1",
    )
      .invoke("text")
      .then((likes) => {
        expect(parseInt(likes)).to.be.greaterThan(parseInt(initialLikes));
      });
  });

  it("Correct Pagination With Popularity Filter", () => {
    let initialLikes;
    let initialComments;
    cy.visit("/blog/?page=2");
    cy.wait(2000);

    cy.get(
      ":nth-child(1) > .bg-gray-50 > .mt-5 > .justify-between > :nth-child(1) > .pl-1",
    )
      .invoke("text")
      .then((likes) => (initialLikes = parseInt(likes)));

    cy.get(
      ":nth-child(1) > .bg-gray-50 > .mt-5 > .justify-between > :nth-child(2) > .pl-1",
    )
      .invoke("text")
      .then((comments) => (initialComments = parseInt(comments)));
    cy.wait(200);
    cy.visit("/blog/?filter=Popularity&page=2");
    cy.wait(1500);

    let finalLikes;

    cy.get(
      ":nth-child(1) > .bg-gray-50 > .mt-5 > .justify-between > :nth-child(1) > .pl-1",
    )
      .invoke("text")
      .then((likes) => (finalLikes = parseInt(likes, 10)));

    cy.get(
      ":nth-child(1) > .bg-gray-50 > .mt-5 > .justify-between > :nth-child(2) > .pl-1",
    )
      .invoke("text")
      .then((comments) =>
        expect(finalLikes + parseInt(comments)).to.be.greaterThan(
          initialLikes + initialComments,
        ),
      );
  });

  it("Wrong Pagination With Likeness Filter", () => {
    cy.visit("/blog/?filter=Likeness&page=-34");
    cy.wait(1000);
    cy.get(".mt-10 > .text-gray-700").should("include.text", "Sorry");
  });

  it("Wrong Pagination With Popularity Filter", () => {
    cy.visit("/blog/?filter=Popularity&page=-34");
    cy.wait(1000);
    cy.get(".mt-10 > .text-gray-700").should("include.text", "Sorry");
  });

  it("Wrong Filter", () => {
    cy.visit("/blog/?filter=asdasdsa");
    cy.wait(1000);
    cy.get(".mt-10 > .text-gray-700").should("include.text", "Sorry");
  });
});
