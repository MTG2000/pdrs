import { observable, action, decorate, runInAction } from "mobx";
import { NotificationManager } from "react-notifications";
import axios from "axios";

class ManageClassificationStore {
  selectedClassificationIndex = null;
  classifications = [];
  clsConditions = {};

  SelectClassification(index) {
    this.selectedClassificationIndex = index;
    this.FetchConditions();
  }

  async FetchClassifications() {
    try {
      const res = await axios.get("/api/medicins/classifications");
      const { data } = res.data;
      runInAction(() => {
        this.classifications = data;
      });
    } catch (error) {}
  }

  async AddCondition(name) {
    if (name.trim().length < 3) return;

    try {
      await axios.post("/api/medicins/new-condition", {
        name,
        classification: this.classifications[this.selectedClassificationIndex]
          .Id,
      });

      NotificationManager.success("Condition Added Successfully");
      runInAction(() => {
        this.clsConditions[this.selectedClassificationIndex].unshift({
          Name: name,
        });
      });
      return true;
    } catch (error) {
      NotificationManager.error(
        error.response.data.message,
        error.response.data.title
      );
    }
  }

  async FetchConditions() {
    try {
      if (this.clsConditions[this.selectedClassificationIndex]) return;

      const res = await axios.get("/api/medicins/conditions", {
        params: {
          classification: this.classifications[this.selectedClassificationIndex]
            .Id,
        },
      });
      const { data } = res.data;
      runInAction(() => {
        this.clsConditions[this.selectedClassificationIndex] = data;
      });
    } catch (error) {}
  }

  async NewClassification(data) {
    try {
      await axios.post("/api/medicins/new-classification", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      NotificationManager.success("Classification Added Successfully");
    } catch (error) {
      NotificationManager.error(
        error.response.data.message,
        error.response.data.title
      );
    }
  }
}

decorate(ManageClassificationStore, {
  classifications: observable,
  clsConditions: observable,
  selectedClassificationIndex: observable,
  SelectClassification: action,
});

export default new ManageClassificationStore();
