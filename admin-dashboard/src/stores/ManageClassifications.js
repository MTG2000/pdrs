import { observable, action, decorate, runInAction } from "mobx";
import { NotificationManager } from "react-notifications";
import axios from "axios";

class ManageClassificationStore {
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

decorate(ManageClassificationStore, {});

export default new ManageClassificationStore();
