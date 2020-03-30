import { observable, action, decorate, autorun, runInAction, toJS } from "mobx";

class NewPrescription {
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

  SubmitPrescription() {
    const prescription = {
      patientId: this.patientId,
      note: this.note,
      medicins: toJS(this.medicins),
      classificationId: this.selectedClassification
    };
    console.log(prescription);
  }
}

decorate(NewPrescription, {
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

export default NewPrescription;
// const todoStoreInstance = new NewPrescription();
// export default todoStoreInstance;
