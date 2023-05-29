/// <reference types="cypress" />

describe("Working with APIs", () => {
  beforeEach("Login to the App", () => {
    cy.intercept({ method: "GET", path: "tags" }, { fixture: "tags.json" });

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

  it.only("Intercepting and modifying the request and response", () => {
    cy.intercept("POST", "https://api.realworld.io/api/articles/", (req) => {
      req.reply((res) => {
        expect(res.body.article.description).to.equal("Test Description");
        res.body.article.description = "Test Description Modified";
      });
    }).as("postArticles");
    // cy.intercept("POST", "https://api.realworld.io/api/articles/", (req) => {
    //   req.body.article.description = "Test Description Modified";
    // }).as("postArticles");

    cy.contains("New Article").click();
    cy.get('[formcontrolname="title"]').type("Test title BK");
    cy.get('[formcontrolname="description"]').type("Test Description");
    cy.get('[formcontrolname="body"]').type("Test body");
    cy.contains("Publish Article").click();

    cy.wait("@postArticles").then((xhr: any) => {
      console.log(xhr);
      expect(xhr.response.statusCode).to.equal(200);
      expect(xhr.response.body.article.description).to.equal(
        "Test Description Modified"
      );

      expect(xhr.request.body.article.body).to.equal("Test body");
    });
  });

  // Stubbed response from using tags.json
  it("Verify popular tags are displayed", () => {
    cy.get(".tag-list")
      .should("contain", "cypress")
      .and("contain", "automation")
      .and("contain", "testing");
  });

  it("Verify global feed likes count", () => {
    cy.intercept("GET", "https://api.realworld.io/api/articles/feed*", {
      articles: [],
      articlesCount: 0,
    });
    cy.intercept("GET", "https://api.realworld.io/api/articles*", {
      fixture: "articles.json",
    });

    cy.contains("Global Feed").click();
    cy.get("app-favorite-button").then((heartList) => {
      expect(heartList[0]).to.contain(1);
      expect(heartList[1]).to.contain(5);
    });

    cy.fixture("articles.json").then((obj) => {
      const articleLink = obj.articles[1].slug;
      obj.articles[1].favoritesCount = 6;
      cy.intercept(
        "POST",
        `https://api.realworld.io/api/articles/${articleLink}/favorite`,
        obj
      );
    });

    cy.get("app-favorite-button").eq(1).click().should("contain", "6");
    cy.get("app-favorite-button").eq(1).should("contain", "6");
  });
});
