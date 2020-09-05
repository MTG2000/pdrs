describe("App ", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should Login as Doctor", async () => {
    cy.server();
    cy.route("POST", "api/users/login", "fixture:login-doctor.json");

    cy.get("a[href='/login']").click();

    cy.get("#username").type("ahmad");
    cy.get("#password").type("123");
    cy.get("[type=submit]").click();
    cy.get('[href="/new-prescription"]').should("exist");
    cy.location().should((loc) => expect(loc.pathname).to.eq("/"));
  });

  it("Should Login as Pharmacian", async () => {
    cy.server();
    cy.route("POST", "api/users/login", "fixture:login-pharmacy.json");

    cy.get("a[href='/login']").click();

    cy.get("#username").type("samer");
    cy.get("#password").type("123");
    cy.get("[type=submit]").click();

    cy.get('[href="/dispense-prescription"]').should("exist");
    cy.location().should((loc) => expect(loc.pathname).to.eq("/"));
  });
});
