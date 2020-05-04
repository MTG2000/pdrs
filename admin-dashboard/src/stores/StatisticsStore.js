import { observable, action, decorate, runInAction } from "mobx";
import { NotificationManager } from "react-notifications";
import date from "date-and-time";

import axios from "axios";

class StatisticsStore {
  prescriptionsUsage = [];
  medicinsUsage = [];
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

  async getPrescriptionsPerClassification(from, to) {
    try {
      const res = await axios.get(
        "/api/admin/prescriptions-per-classification-count",
        {
          params: {
            to: date.format(to, "YYYY-MM-DD"),
            from: date.format(from, "YYYY-MM-DD"),
          },
        }
      );
      const { data } = res.data;

      runInAction(() => {
        this.prescriptionsPerClassification = data;
      });
    } catch (error) {
      this.loadingNewMessages = false;
    }
  }

  async getMedicinsUsage(from, to) {
    try {
      const res = await axios.get("/api/admin/medicins-usage", {
        params: {
          to: date.format(to, "YYYY-MM-DD"),
          from: date.format(from, "YYYY-MM-DD"),
        },
      });
      const { data } = res.data;

      runInAction(() => {
        this.medicinsUsage = data;
      });
    } catch (error) {
      this.loadingNewMessages = false;
    }
  }
}

decorate(StatisticsStore, {
  prescriptionsUsage: observable,
  medicinsUsage: observable,
  prescriptionsPerClassification: observable,
  getPrescriptionsUsage: action,
  getPrescriptionsPerClassification: action,
  getMedicinsUsage: action,
});

export default new StatisticsStore();
