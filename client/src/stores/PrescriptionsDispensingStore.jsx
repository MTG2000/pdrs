import { observable, action, decorate, runInAction } from "mobx";
import { NotificationManager } from "react-notifications";
import axios from "axios";

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
      const res = await axios.get(`/api/users/patients?id=${this.patientId}`);
      const { data } = res.data;
      runInAction(() => {
        this.patientName = data.Name;
      });
    } catch (error) {
      this.patientName = "";
    }
  }

  async Dispense(prescriptionId, medicins = []) {
    try {
      await axios.post("/api/patients/dispense", { prescriptionId, medicins });
      NotificationManager.success("Prescription Dispensed Successfully");
      this.FetchPrescriptions();
    } catch (error) {
      NotificationManager.error(
        error.response.data.message,
        error.response.data.title
      );
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
      const res = await axios.get(fetchUrl);

      const { data } = res.data;
      console.log(res.data);

      runInAction(() => {
        this.prescriptions = data.prescriptions;
        this.loadingPrescriptions = false;
      });
    } catch (error) {
      console.log(error);
      console.log(error.response);

      //Request cancelled so that a new one can be sent
      NotificationManager.error(
        error.response.data.message,
        error.response.data.title
      );

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
