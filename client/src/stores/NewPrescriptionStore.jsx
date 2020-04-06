import { observable, action, decorate, runInAction, toJS } from "mobx";
import { NotificationManager } from "react-notifications";

class NewPrescriptionStore {
  patientId = "";
  patientName = "";
  showPatientNameInput = false;
  note = "";
  medicins = [];
  classifications = [];
  selectedClassification = -1;
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
      const res = await fetch(`/api/users/patient?id=${this.patientId}`);
      const { data } = await res.json();
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
      const res = await fetch("/api/medicins/classifications");
      const { data } = await res.json();
      runInAction(() => {
        this.classifications = data;
        this.loading = false;
      });
    } catch (error) {}
  }

  SelectClassification(id) {
    this.selectedClassification = id;
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
        classificationId: this.selectedClassification
      };
      const response = await fetch("/api/patients/new-prescription", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(prescription)
      });
      if (!response.ok) throw Error();

      await response.json();
      NotificationManager.success("Prescription Created Successfully");
      this.submitingPrescription = false;
      setTimeout(() => {
        runInAction(() => {
          this.redirect = true;
        });
      }, 3000);
    } catch (error) {
      NotificationManager.error("Prescription couldn't be created");
      this.submitingPrescription = false;
    }
  }
}

decorate(NewPrescriptionStore, {
  redirect: observable,
  loading: observable,
  selectedClassification: observable,
  patientId: observable,
  showPatientNameInput: observable,
  submitingPrescription: observable,
  patientName: observable,
  note: observable,
  medicins: observable,
  classifications: observable,
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
  SetPatientName: action
});

export default NewPrescriptionStore;
// const todoStoreInstance = new NewPrescription();
// export default todoStoreInstance;
