import { observable, action, decorate, runInAction, toJS, autorun } from "mobx";
import { NotificationManager } from "react-notifications";

class ManageMedicinsStore {
  allMedicins = [];
  medicins = [];

  async FetchMedicins() {
    try {
      const res = await fetch("/api/medicins");
      if (!res.ok) throw Error("Forbidden");
      const { data } = await res.json();
      runInAction(() => {
        this.allMedicins = data;
        this.medicins = data;
      });
    } catch (error) {}
  }

  SearchMedicins(v) {
    this.medicins = this.allMedicins.filter(
      m => m.Name.toLowerCase().indexOf(v.toLowerCase()) !== -1
    );
  }

  async NewMedicine(name) {
    try {
      const res = await fetch("/api/medicins/new", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name
        })
      });

      if (!res.ok) throw Error();
      await res.json();
      NotificationManager.success("Medicine Added Successfully");
      this.FetchMedicins();
    } catch (error) {
      NotificationManager.error("Couldn't Add Medicine");
    }
  }
}

decorate(ManageMedicinsStore, {
  medicins: observable,
  FetchMedicins: action
});

export default new ManageMedicinsStore();
// const todoStoreInstance = new NewPrescription();
// export default todoStoreInstance;
