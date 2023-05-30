describe("Test logout", () => {
  beforeEach("login to the app", () => {
    cy.loginToApp();
  });

  it("Verify user can logout successfully", () => {
    cy.contains("Settings").click();
    cy.contains("Or click here to logout").click();
    cy.get(".navbar-nav").should("contain", "Sign up");
  });
});
