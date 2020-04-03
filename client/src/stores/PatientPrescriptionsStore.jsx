import { observable, action, decorate, runInAction } from "mobx";
import { NotificationManager } from "react-notifications";

class PatientPrescriptionsStore {
  //Observables
  patientId = "";
  patientName = "";
  classifications = [];
  allPrescriptions = [];
  prescriptions = [];
  chronicMedicins = [];
  selectedClassification = 0;
  loading = true;
  loadingPrescriptions = false;
  //Class Props
  abortController;
  signal;

  SetPatientId(v) {
    this.patientId = v;
    this.FetchPatientName();
    this.FetchPrescriptions();
  }

  async FetchPatientName() {
    try {
      const res = await fetch(`/api/users/patients?id=${this.patientId}`);
      const { data } = await res.json();
      runInAction(() => {
        this.patientName = data.Name;
      });
    } catch (error) {
      this.patientName = "";
    }
  }

  FilterPrescriptions() {
    console.log(this.selectedClassification);
    if (!this.selectedClassification)
      this.prescriptions = this.allPrescriptions;
    else
      this.prescriptions = this.allPrescriptions.filter(
        p => p.Classification_Id === this.selectedClassification
      );
  }

  async FetchClassifications() {
    try {
      const res = await fetch("/api/medicins/classifications");
      const { data } = await res.json();
      runInAction(() => {
        this.classifications = data;
        this.loading = false;
      });
    } catch (error) {}
  }

  async FetchPrescriptions() {
    if (this.loadingPrescriptions) {
      this.abortController.abort();
    }

    try {
      this.loadingPrescriptions = true;
      let fetchUrl = "/api/patients/prescriptions?";
      fetchUrl = fetchUrl.concat(`patientId=${this.patientId}`);

      //These will be used to abort the request if different parameters are specified
      this.abortController = new AbortController();
      this.signal = this.abortController.signal;
      const res = await fetch(fetchUrl, { signal: this.signal });
      const { data } = await res.json();
      console.log(data);
      runInAction(() => {
        this.allPrescriptions = data.prescriptions;
        this.chronicMedicins = data.chronicMedicins;
        this.loadingPrescriptions = false;
      });
      this.FilterPrescriptions();
    } catch (error) {
      if (error.name == "AbortError") return; //when we abort request the error gets thrown from where we called fetch() so we catch it and do nothing
      console.log(error);
      //Request cancelled so that a new one can be sent
      NotificationManager.error("Couldn't Get Prescriptions");
      this.loadingPrescriptions = false;
    }
  }

  async SelectClassification(id) {
    if (id === this.selectedClassification) this.selectedClassification = 0;
    else this.selectedClassification = id;
    if (this.patientId && this.allPrescriptions.length === 0)
      await this.FetchPrescriptions();
    else this.FilterPrescriptions();
  }
}

decorate(PatientPrescriptionsStore, {
  loading: observable,
  loadingPrescriptions: observable,
  selectedClassification: observable,
  prescriptions: observable,
  chronicMedicins: observable,
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
