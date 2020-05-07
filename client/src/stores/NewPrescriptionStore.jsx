import { observable, action, decorate, runInAction, toJS } from "mobx";
import { NotificationManager } from "react-notifications";
import axios from "axios";

class NewPrescriptionStore {
  patientId = "";
  patientName = "";
  showPatientNameInput = false;
  note = "";
  medicins = [];
  classifications = [];
  conditions = [];

  selectedClassification = -1;
  selectedCondition = -1;
  submitingPrescription = false;
  loading = true;
  redirect = false;

  SetPatientId(v) {
    this.patientId = v;
    this.FetchPatientName();
  }

  SetPatientName(v) {
    this.patientName = v;
  }

  async FetchPatientName() {
    try {
      if (this.patientId.length < 6) return;

      const res = await axios.get(`/api/users/patient?id=${this.patientId}`);
      const { data } = res.data;
      runInAction(() => {
        if (data.Name) {
          this.patientName = data.Name;
          this.showPatientNameInput = false;
        } else {
          this.showPatientNameInput = true;
        }
      });
    } catch (error) {
      this.showPatientNameInput = true;
      this.patientName = "";
    }
  }

  async FetchClassifications() {
    try {
      const res = await axios.get("/api/medicins/classifications");
      const { data } = res.data;
      runInAction(() => {
        this.classifications = data;
        this.loading = false;
      });
    } catch (error) {}
  }

  async FetchConditions() {
    try {
      const res = await axios.get("/api/medicins/conditions", {
        params: {
          classification: this.selectedClassification,
        },
      });
      const { data } = res.data;
      runInAction(() => {
        this.conditions = data;
        this.loading = false;
      });
    } catch (error) {}
  }

  SelectClassification(id) {
    this.selectedClassification = id;
    this.FetchConditions();
  }

  SelectCondition(c) {
    this.selectedCondition = c;
  }

  AddMedicine(medicine) {
    this.medicins.push(medicine);
  }

  RemoveMedicin(index) {
    this.medicins = this.medicins.filter((m, i) => i !== index);
  }

  ToggleChronic(index) {
    this.medicins[index].isChronic = !this.medicins[index].isChronic;
  }

  ToggleBold(index) {
    this.medicins[index].isBold = !this.medicins[index].isBold;
  }

  SetNote(value) {
    this.note = value;
  }

  async SubmitPrescription() {
    try {
      if (this.submitingPrescription) return;

      this.submitingPrescription = true;
      const prescription = {
        patientId: this.patientId,
        patientName: this.patientName,
        note: this.note,
        medicins: toJS(this.medicins),
        classificationId: this.selectedClassification,
        conditionId: this.selectedCondition.Id,
      };

      await axios.post("/api/patients/new-prescription", { ...prescription });

      NotificationManager.success("Prescription Created Successfully");
      this.submitingPrescription = false;
      setTimeout(() => {
        runInAction(() => {
          this.redirect = true;
        });
      }, 3000);
    } catch (error) {
      NotificationManager.error(
        error.response.data.message,
        error.response.data.title
      );

      this.submitingPrescription = false;
    }
  }
}

decorate(NewPrescriptionStore, {
  redirect: observable,
  loading: observable,
  selectedClassification: observable,
  selectedCondition: observable,
  patientId: observable,
  showPatientNameInput: observable,
  submitingPrescription: observable,
  patientName: observable,
  note: observable,
  medicins: observable,
  classifications: observable,
  conditions: observable,
  AddMedicine: action,
  SetPatientId: action,
  FetchClassifications: action,
  RemoveMedicin: action,
  ToggleBold: action,
  ToggleChronic: action,
  SelectClassification: action,
  SetNote: action,
  SubmitPrescription: action,
  FetchPatientName: action,
  SetPatientName: action,
});

export default NewPrescriptionStore;
// const todoStoreInstance = new NewPrescription();
// export default todoStoreInstance;
