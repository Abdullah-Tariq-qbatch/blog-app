describe("Pagination Tests", function () {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
    cy.get('[href="/tv-shows"]').click();
  });

  it("should navigate to the next page", () => {
    cy.get(
      '[class="relative inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 bg-blue-50 text-blue-custom hover:bg-blue-100 hover:text-blue-custom dark:border-gray-700 dark:bg-blue-900 dark:hover:bg-blue-950 dark:hover:text-blue-700 "]',
    ).then(($currentPage) => {
      const currentPageNumber = parseInt($currentPage.text());

      // Click the "Next Page" button
      cy.get(".isolate > :nth-child(4)").click();

      // Verify that the current page number has increased by 1
      cy.get(
        '[class="relative inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 bg-blue-50 text-blue-custom hover:bg-blue-100 hover:text-blue-custom dark:border-gray-700 dark:bg-blue-900 dark:hover:bg-blue-950 dark:hover:text-blue-700 "]',
      ).should("have.text", (currentPageNumber + 1).toString());

      // Verify that the content on the new page has loaded
      cy.get('[class="mx-2 flex items-center justify-center pt-8"]').should(
        "be.visible",
      );
    });
  });

  it("should navigate to the previous page", () => {
    cy.visit("/tv-shows?page=2");
    // Get the current page number (if displayed)
    cy.get(
      '[class="relative inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 bg-blue-50 text-blue-custom hover:bg-blue-100 hover:text-blue-custom dark:border-gray-700 dark:bg-blue-900 dark:hover:bg-blue-950 dark:hover:text-blue-700 "]',
    ).then(($currentPage) => {
      const currentPageNumber = parseInt($currentPage.text());

      // Click the "Previous Page" button
      cy.get(".rounded-l-md").click();
      cy.get(".isolate > :nth-child(3)").click();

      // Verify that the current page number has decreased by 1
      cy.get(
        '[class="relative inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 bg-blue-50 text-blue-custom hover:bg-blue-100 hover:text-blue-custom dark:border-gray-700 dark:bg-blue-900 dark:hover:bg-blue-950 dark:hover:text-blue-700 "]',
      ).should("have.text", (currentPageNumber - 1).toString());

      // Verify that the content on the new page has loaded
      cy.get('[class="mx-2 flex items-center justify-center pt-8"]').should(
        "be.visible",
      );
    });
  });

  it("should navigate to a specific page", () => {
    // Click on a specific page number (e.g., page 4)
    cy.get(
      '[class="relative inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300 "]',
    )
      .contains("4")
      .click();

    // Verify that the current page number is now 4
    cy.get(
      '[class="relative inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 bg-blue-50 text-blue-custom hover:bg-blue-100 hover:text-blue-custom dark:border-gray-700 dark:bg-blue-900 dark:hover:bg-blue-950 dark:hover:text-blue-700 "]',
    ).should("have.text", "4");

    // Verify that the content on page 4 has loaded
    cy.get('[class="mx-2 flex items-center justify-center pt-8"]').should(
      "be.visible",
    );
  });
});
