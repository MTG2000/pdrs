import { observable, action, decorate, runInAction } from "mobx";
import { NotificationManager } from "react-notifications";
import axios from "axios";

class ManageMedicinsStore {
  allMedicins = [];
  medicins = [];

  async FetchMedicins() {
    try {
      const res = await axios.get("/api/medicins");
      const { data } = res.data;
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
      await axios.post("/api/medicins/new", {
        name
      });

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
