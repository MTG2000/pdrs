describe("App ", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Mounted Successfully", () => {
    cy.contains("Welcome");
  });

  it("Send Account Request", async () => {
    cy.server();
    cy.route("POST", "api/users/request-account", {});

    cy.get("[data-cy=name-input]").type("My Name");
    cy.get("[data-cy=email-input]").type("mtg@gmail.com");
    cy.get("[data-cy=specialty-input]").type("My specialty");
    cy.get("[data-cy=phone-input]").type("My phone");
    //   .should("have.value", "My phone");

    cy.get("[type=submit]").click();
  });
});
