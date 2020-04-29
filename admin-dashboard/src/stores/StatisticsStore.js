import { observable, action, decorate, runInAction } from "mobx";
import { NotificationManager } from "react-notifications";

import axios from "axios";

class StatisticsStore {
  prescriptionsUsage = [];
  prescriptionsPerClassification = [];

  async getPrescriptionsUsage() {
    try {
      if (this.prescriptionsUsage.length > 0) return;

      const res = await axios.get("/api/admin/prescriptions-usage");
      const { data } = res.data;
      runInAction(() => {
        this.prescriptionsUsage = data;
      });
    } catch (error) {
      this.loadingNewMessages = false;
    }
  }

  async getPrescriptionsPerClassification() {
    try {
      if (this.prescriptionsPerClassification.length > 0) return;

      const res = await axios.get(
        "/api/admin/prescriptions-per-classification-count"
      );
      const { data } = res.data;
      console.log(data);

      runInAction(() => {
        this.prescriptionsPerClassification = data;
      });
    } catch (error) {
      this.loadingNewMessages = false;
    }
  }
}

decorate(StatisticsStore, {
  prescriptionsUsage: observable,
  prescriptionsPerClassification: observable,
  getPrescriptionsUsage: action,
  getPrescriptionsPerClassification: action,
});

export default new StatisticsStore();
