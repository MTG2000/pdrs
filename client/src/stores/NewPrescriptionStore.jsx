import { observable, action, decorate, autorun, runInAction, toJS } from "mobx";

class NewPrescriptionStore {
  patientId = "";
  patientName = "";
  showPatientNameInput = false;
  note = "";
  medicins = [];
  classifications = [];
  selectedClassification = -1;
  loading = true;
  constructor() {}

  SetPatientId(v) {
    this.patientId = v;
    this.FetchPatientName();
  }

  SetPatientName(v) {
    this.patientName = v;
  }

  async FetchPatientName() {
    const res = await fetch(`/api/users/patients?id=${this.patientId}`);
    const data = await res.json();
    runInAction(() => {
      if (data.Name) {
        this.patientName = data.Name;
        this.showPatientNameInput = false;
      } else {
        this.showPatientNameInput = true;
      }
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
    const data = await response.json();
    console.log("Response: ", data);
  }
}

decorate(NewPrescriptionStore, {
  loading: observable,
  selectedClassification: observable,
  patientId: observable,
  showPatientNameInput: observable,
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
