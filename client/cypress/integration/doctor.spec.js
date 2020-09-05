describe("Doctor App ", () => {
  before(() => {
    //Clear the storage then store the login reponse of a doctor
    cy.clearLocalStorageCache();
    cy.login("doctor");
    cy.saveLocalStorageCache();
  });

  beforeEach(() => {
    cy.restoreLocalStorageCache();
    cy.visit("/");
    //setup the default apis
    cy.server();
    cy.route(
      "GET",
      "api/medicins/classifications",
      "fixture:classifications.json"
    );
    cy.route("GET", "api/users/patient**", "fixture:patient-name.json");
    cy.route("GET", "api/medicins/conditions**", "fixture:conditions.json");
    cy.route(
      "GET",
      "api/patients/prescriptions**",
      "fixture:patient-prescription.json"
    );
  });

  it("View All Patient's Prescriptions & Filter Tooth", async () => {
    cy.get('[href="/patients-prescriptions"]').click();
    cy.get("#patient-id").type("123{enter}");
    cy.get("[data-test-id='prescription-card'").should("have.length", 5);

    cy.get('[data-test-it="classification-icon"][name="Tooth"]').click();
    cy.get("[data-test-id='prescription-card']").should("have.length", 3);
  });

  it.only("Add New Prescription", async () => {
    cy.get('[href="/new-prescription"]').click();
    cy.get("#patient-id").type("123123{enter}");
    cy.get('[data-test-it="classification-icon"][name="Heart"]').click();
    cy.get("#condition-input").type("a");
    cy.contains("Aorta disease").click();
    cy.get("#prescription-note-input").type("This is A note");
    // cy.get("btn[type=submit]").click();
  });
});
