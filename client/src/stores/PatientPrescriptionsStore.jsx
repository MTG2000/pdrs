import { observable, action, decorate, runInAction, autorun } from "mobx";

class PatientPrescriptionsStore {
  //Observables
  patientId = "";
  patientName = "";
  classifications = [];
  prescriptions = [];
  selectedClassification = 0;
  loading = true;
  loadingPrescriptions = false;

  //Class Props
  constructor() {
    this.abortController = new AbortController();
    this.signal = this.abortController.signal;
  }

  SetPatientId(v) {
    this.patientId = v;
    this.FetchPatientName();
    this.FetchPrescriptions();
  }

  async FetchPatientName() {
    const res = await fetch(`/api/users/patients?id=${this.patientId}`);
    const data = await res.json();
    runInAction(() => {
      this.patientName = data.Name || "";
    });
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
    if (this.loadingPrescriptions) this.abortController.abort();
    this.loadingPrescriptions = true;
    let fetchUrl = "api/patients/prescriptions?";
    fetchUrl = fetchUrl.concat(`patientId=${this.patientId}`);
    if (this.selectedClassification)
      fetchUrl = fetchUrl.concat(
        `&classification=${this.selectedClassification}`
      );
    const res = await fetch(fetchUrl, { signal: this.signal });
    const data = await res.json();
    runInAction(() => {
      this.prescriptions = data.prescriptions;
      this.loadingPrescriptions = false;
    });
  }

  SelectClassification(id) {
    this.selectedClassification = id;
    this.FetchPrescriptions();
  }
}

decorate(PatientPrescriptionsStore, {
  loading: observable,
  loadingPrescriptions: observable,
  selectedClassification: observable,
  prescriptions: observable,
  patientId: observable,
  patientName: observable,
  classifications: observable,
  SetPatientId: action,
  FetchClassifications: action,
  SelectClassification: action,
  FetchPrescriptions: action,
  FetchPatientName: action
});

export default PatientPrescriptionsStore;
// const todoStoreInstance = new PatientPrescriptionsStore();
// export default todoStoreInstance;