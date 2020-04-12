import { observable, action, decorate, runInAction } from "mobx";
import { NotificationManager } from "react-notifications";

import axios from "axios";

class DashboardStore {
  //Dashboard
  newMessages = [];
  loadingNewMessages = true;
  newAccountRequests = [];
  loadingNewAccountRequests = true;
  loadingDashboard = true;

  async FetchNewMessages() {
    try {
      this.loadingNewMessages = true;
      const res = await axios.get("/api/admin/new-messages");
      const { data } = res.data;
      runInAction(() => {
        this.newMessages = data;
        this.loadingNewMessages = false;
      });
    } catch (error) {
      this.loadingNewMessages = false;
    }
  }

  async MarkMessageRead(id) {
    try {
      await axios.post("/api/admin/read-message", { id });
      this.FetchNewMessages();
    } catch (error) {}
  }

  async FetchNewAccountRequests() {
    try {
      this.loadingNewAccountRequests = true;
      const res = await axios.get("/api/admin/new-account-requests");
      const { data } = res.data;
      runInAction(() => {
        this.newAccountRequests = data;
        this.loadingNewAccountRequests = false;
      });
    } catch (error) {
      NotificationManager.error(
        error.response.data.message,
        error.response.data.title
      );
      this.loadingNewAccountRequests = false;
    }
  }

  async MarkAccountRequestRead(id) {
    try {
      await axios.post("/api/admin/read-account-request", { id });
      this.FetchNewAccountRequests();
    } catch (error) {
      NotificationManager.error(
        error.response.data.message,
        error.response.data.title
      );
    }
  }
}

decorate(DashboardStore, {
  newMessages: observable,
  loadingNewMessages: observable,
  newAccountRequests: observable,
  loadingNewAccountRequests: observable,
  FetchNewAccountRequests: action
});

export default new DashboardStore();
// const todoStoreInstance = new NewPrescription();
// export default todoStoreInstance;
