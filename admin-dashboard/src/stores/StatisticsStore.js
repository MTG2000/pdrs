import { observable, action, decorate, runInAction } from "mobx";
import { NotificationManager } from "react-notifications";

import axios from "axios";

class StatisticsStore {
  prescriptionsUsage = [];

  async getPrescriptionsUsage() {
    try {
      const res = await axios.get("/api/admin/prescriptions-usage");
      const { data } = res.data;
      runInAction(() => {
        this.prescriptionsUsage = data;
      });
    } catch (error) {
      this.loadingNewMessages = false;
    }
  }
}

decorate(StatisticsStore, {
  prescriptionsUsage: observable,
  getPrescriptionsUsage: action,
});

export default new StatisticsStore();
