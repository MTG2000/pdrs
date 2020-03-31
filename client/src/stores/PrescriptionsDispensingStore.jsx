import { observable, action, decorate, runInAction } from "mobx";
import { NotificationManager } from "react-notifications";

class PrescriptionsDispensingStore {
  //Observables
  patientId = "";
  patientName = "";
  prescriptions = [];
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

  async Dispense(prescriptionId, medicins = []) {
    try {
      const response = await fetch("/api/patients/dispense", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prescriptionId, medicins })
      });
      await response.json();
      NotificationManager.success("Prescription Dispensed Successfully");
      this.FetchPrescriptions();
    } catch (error) {
      NotificationManager.error("Couldn't Dispense Prescription");
    }
  }

  async FetchPrescriptions() {
    try {
      if (this.loadingPrescriptions) this.abortController.abort();
    } catch (error) {}

    try {
      this.loadingPrescriptions = true;
      let fetchUrl = "/api/patients/prescriptions-to-dispense?";
      fetchUrl = fetchUrl.concat(`patientId=${this.patientId}`);

      //These will be used to abort the request if different parameters are specified
      this.abortController = new AbortController();
      this.signal = this.abortController.signal;
      const res = await fetch(fetchUrl, { signal: this.signal });
      const { data } = await res.json();
      runInAction(() => {
        this.prescriptions = data.prescriptions;
        this.loadingPrescriptions = false;
      });
    } catch (error) {
      console.log(error);
      //Request cancelled so that a new one can be sent
      NotificationManager.error("Couldn't Get Prescriptions");
      this.loadingPrescriptions = false;
    }
  }

  SelectClassification(id) {
    this.selectedClassification = id;
    if (this.patientId) this.FetchPrescriptions();
  }
}

decorate(PrescriptionsDispensingStore, {
  loading: observable,
  loadingPrescriptions: observable,
  prescriptions: observable,
  patientId: observable,
  patientName: observable,
  SetPatientId: action,
  FetchPrescriptions: action,
  FetchPatientName: action
});

export default PrescriptionsDispensingStore;
// const todoStoreInstance = new PrescriptionsDispensingStore();
// export default todoStoreInstance;
