/// <reference types="cypress" />

describe("Working with APIs", () => {
  beforeEach("Login to the App", () => {
    cy.intercept("GET", "https://api.realworld.io/api/tags", {
      fixture: "tags.json",
    });

    cy.loginToApp();
  });

  it("Should login", () => {
    cy.intercept("POST", "https://api.realworld.io/api/articles/").as(
      "postArticles"
    );

    cy.contains("New Article").click();
    cy.get('[formcontrolname="title"]').type("Test title BK");
    cy.get('[formcontrolname="description"]').type("Test Description");
    cy.get('[formcontrolname="body"]').type("Test body");
    cy.contains("Publish Article").click();

    cy.wait("@postArticles").then((xhr: any) => {
      console.log(xhr);
      expect(xhr.response.statusCode).to.equal(200);
      expect(xhr.response.body.article.description).to.equal(
        "Test Description"
      );

      expect(xhr.request.body.article.body).to.equal("Test body");
    });
  });

  // Stubbed response from using tags.json
  it.only("Verify popular tags are displayed", () => {
    cy.get(".tag-list")
      .should("contain", "cypress")
      .and("contain", "automation")
      .and("contain", "testing");
  });
});
