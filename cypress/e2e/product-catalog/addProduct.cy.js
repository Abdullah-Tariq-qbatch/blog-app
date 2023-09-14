/* eslint-disable no-undef */
describe("Add Prodcut", () => {
  beforeEach(() => {
    cy.login();
    cy.visitCatalog();
    cy.visit("/catalog/add");
    //title
    cy.get(".w-auto > :nth-child(2) > :nth-child(1) > div > .w-full").type(
      "New Product",
    );
    //brand
    cy.get(".w-auto > :nth-child(2) > :nth-child(2) > div > .w-full").type(
      "New Brand",
    );
    //description
    cy.get(".mt-2").type(
      "this is the new Product being add for testing by cypress",
    );
    //image
    cy.get(".flex > .mr-2").selectFile("cypress/fixtures/img.jpg");

    //category
    cy.get(":nth-child(5) > :nth-child(2) > .flex > .appearance-none").select(
      "laptops",
    );
  });

  // Valid Add Products Field
  it("Add Product Success Scenario", () => {
    let Sizes = [
      { name: "128GB", price: 999, stock: 5 },
      { name: "256GB", price: 1999, stock: 0 },
    ];
    let Colors = [
      { hex: "Black", size: "128GB" },
      { hex: "Blue", size: "128GB" },
    ];

    //sizes
    for (let i = 0; i < Sizes.length; i++) {
      cy.get(
        `:nth-child(6) > :nth-child(${i + 2}) > :nth-child(1) > .w-full`,
      ).type(`${Sizes[i]?.name}`);
      cy.get(
        `:nth-child(6) > :nth-child(${i + 2}) > :nth-child(2) > .w-full`,
      ).type(Sizes[i]?.stock);
      cy.get(
        `:nth-child(6) > :nth-child(${i + 2}) > :nth-child(3) > .w-full`,
      ).type(Sizes[i]?.price);
      if (i !== Sizes.length - 1) {
        cy.get('[label="Add Size"]').click();
      }
    }

    //colors
    for (let i = 0; i < Colors.length; i++) {
      cy.get(
        `:nth-child(7) > :nth-child(${i + 2}) > :nth-child(1) > .w-full`,
      ).type(Colors[i]?.hex);
      cy.get(
        `:nth-child(7) > :nth-child(${i + 2}) > :nth-child(2) > .mb-2`,
      ).select(Colors[i]?.size);

      if (i !== Colors.length - 1) {
        cy.get('[label="Add Color"]').click();
      }
    }

    cy.get(".mt-8").click();
    cy.wait(1000);
    cy.get("#\\31").click();
    cy.get(":nth-child(1) > .border-2 > .h-\\[50px\\] > .w-\\[90\\%\\]").should(
      "have.text",
      "New Product",
    );
  });

  // Same Size Name
  it("Check Validation for same Size Names", () => {
    let Sizes = [
      { name: "128GB", price: 999, stock: 5 },
      { name: "128GB", price: 1999, stock: 0 },
    ];
    for (let i = 0; i < Sizes.length; i++) {
      cy.get(
        `:nth-child(6) > :nth-child(${i + 2}) > :nth-child(1) > .w-full`,
      ).type(`${Sizes[i]?.name}`);
      cy.get(
        `:nth-child(6) > :nth-child(${i + 2}) > :nth-child(2) > .w-full`,
      ).type(Sizes[i]?.stock);
      cy.get(
        `:nth-child(6) > :nth-child(${i + 2}) > :nth-child(3) > .w-full`,
      ).type(Sizes[i]?.price);
      if (i !== Sizes.length - 1) {
        cy.get('[label="Add Size"]').click();
      }
    }

    cy.get(":nth-child(6) > .text-red-500").should(
      "have.text",
      "Names must be unique",
    );
  });

  // Empty Size Field
  it("Check Empty Size Field", () => {
    cy.get(".mt-8").click();
    cy.get(":nth-child(6) > .grid > :nth-child(1) > .text-red-500").should(
      "have.text",
      "Name is Required",
    );
    cy.get(":nth-child(6) > .grid > :nth-child(2) > .text-red-500").should(
      "have.text",
      "Stock is Required",
    );
    cy.get(":nth-child(3) > .text-red-500").should(
      "have.text",
      "Price is Required",
    );
  });

  // Empty Color Field
  it("Check Empty Size Field", () => {
    cy.get(".mt-8").click();
    cy.get(":nth-child(7) > .grid > :nth-child(1) > .text-red-500").should(
      "have.text",
      "Color is Required",
    );
    cy.get(".animate-pulse.flex > .text-red-500").should(
      "have.text",
      "Please select a size",
    );
  });

  // Same color of a Size Validation
  it("Check Validation for same Color of a Size", () => {
    let Sizes = [
      { name: "128GB", price: 999, stock: 5 },
      { name: "256GB", price: 1999, stock: 0 },
    ];
    let Colors = [
      { hex: "Black", size: "128GB" },
      { hex: "Black", size: "128GB" },
    ];
    for (let i = 0; i < Sizes.length; i++) {
      cy.get(
        `:nth-child(6) > :nth-child(${i + 2}) > :nth-child(1) > .w-full`,
      ).type(`${Sizes[i]?.name}`);
      cy.get(
        `:nth-child(6) > :nth-child(${i + 2}) > :nth-child(2) > .w-full`,
      ).type(Sizes[i]?.stock);
      cy.get(
        `:nth-child(6) > :nth-child(${i + 2}) > :nth-child(3) > .w-full`,
      ).type(Sizes[i]?.price);
      if (i !== Sizes.length - 1) {
        cy.get('[label="Add Size"]').click();
      }
    }
    for (let i = 0; i < Colors.length; i++) {
      cy.get(
        `:nth-child(7) > :nth-child(${i + 2}) > :nth-child(1) > .w-full`,
      ).type(Colors[i]?.hex);
      cy.get(
        `:nth-child(7) > :nth-child(${i + 2}) > :nth-child(2) > .mb-2`,
      ).select(Colors[i]?.size);

      if (i !== Colors.length - 1) {
        cy.get('[label="Add Color"]').click();
      }
    }

    cy.get(".text-red-500").should("have.text", "Color must be unique by Size");
  });
});

describe("Empty Fields of Form", () => {
  beforeEach(() => {
    cy.login();
    cy.visitCatalog();
    cy.visit("/catalog/add");
  });

  // for Title Field
  it("Empty Title Field", () => {
    cy.get(".mt-8").click();
    cy.wait(1000);
    cy.get(
      ".w-auto > :nth-child(2) > :nth-child(1) > .animate-pulse > .text-red-500",
    ).should("have.text", "Title is Required");
  });
  it("Invalid Title Field", () => {
    cy.get(".w-auto > :nth-child(2) > :nth-child(1) > div > .w-full").type(
      "1234",
    );
    cy.get(".mt-8").click();
    cy.wait(1000);
    cy.get(
      ".w-auto > :nth-child(2) > :nth-child(1) > .animate-pulse > .text-red-500",
    ).should(
      "have.text",
      "Title can be alphanumeric with at least one alphabet",
    );
  });

  // // for Brand Field
  it("Empty Brand Field", () => {
    cy.get(".mt-8").click();
    cy.wait(1000);
    cy.get(
      ":nth-child(2) > :nth-child(2) > .animate-pulse > .text-red-500",
    ).should("have.text", "Brand is Required");
  });
  it("Invalid Brand Field", () => {
    cy.get(".w-auto > :nth-child(2) > :nth-child(2) > div > .w-full").type(
      "1234",
    );
    cy.get(".mt-8").click();
    cy.wait(1000);
    cy.get(
      ":nth-child(2) > :nth-child(2) > .animate-pulse > .text-red-500",
    ).should(
      "have.text",
      "Brand can be alphanumeric with at least one alphabet",
    );
  });

  // for Description Field
  it("Empty Description Field", () => {
    cy.get(".mt-8").click();
    cy.wait(1000);
    cy.get(".my-2 > .text-red-500").should(
      "have.text",
      "Description is Required",
    );
  });
  it("Invalid Description Field", () => {
    cy.get(".mt-2").type("1234");
    cy.get(".mt-8").click();
    cy.wait(1000);
    cy.get(".my-2 > .text-red-500").should(
      "have.text",
      "Description can be alphanumeric with at least one alphabet",
    );
  });

  // for Image
  it("Empty Thumbnail", () => {
    cy.get(".mt-8").click();
    cy.wait(1000);
    cy.get(
      ":nth-child(4) > :nth-child(1) > .animate-pulse > .text-red-500",
    ).should("have.text", "Image is Required");
  });

  // for Category
  it("Empty Category", () => {
    cy.get(".mt-8").click();
    cy.wait(1000);
    cy.get(
      ":nth-child(4) > :nth-child(2) > .animate-pulse > .text-red-500",
    ).should("have.text", "Category is Required");
  });
});
