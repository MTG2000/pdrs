import { observable, action, decorate, autorun, runInAction, toJS } from "mobx";

class PatientPrescriptionsStore {
  patinetId = "";
  patientName = "";

  classifications = [];
  prescriptions = [];
  selectedClassification = 0;
  loading = true;
  loadingPrescriptions = false;
  constructor() {}

  SetPatientId(v) {
    this.patinetId = v;
  }

  async FetchClassifications() {
    const res = await fetch("/api/medicins/classifications");
    const data = await res.json();
    runInAction(() => {
      this.classifications = data;
      this.loading = false;
    });
  }

  async FetchPrescriptions() {
    this.loadingPrescriptions = true;
    let fetchUrl = "api/patients/prescriptions?";
    fetchUrl = fetchUrl.concat(`patientId=${this.patinetId}`);
    if (this.selectedClassification)
      fetchUrl = fetchUrl.concat(
        `&classification=${this.selectedClassification}`
      );

    const res = await fetch(fetchUrl);
    const data = await res.json();
    runInAction(() => {
      this.prescriptions = data.prescriptions;
      if (this.prescriptions[0])
        this.patientName = this.prescriptions[0].Patient_Name;
      this.loadingPrescriptions = false;
    });
  }

  SelectClassification(id) {
    this.selectedClassification = id;
  }
}

decorate(PatientPrescriptionsStore, {
  loading: observable,
  loadingPrescriptions: observable,
  selectedClassification: observable,
  prescriptions: observable,
  patinetId: observable,
  patientName: observable,
  classifications: observable,
  SetPatientId: action,
  FetchClassifications: action,
  SelectClassification: action,
  FetchPrescriptions: action
});

export default PatientPrescriptionsStore;
// const todoStoreInstance = new PatientPrescriptionsStore();
// export default todoStoreInstance;
