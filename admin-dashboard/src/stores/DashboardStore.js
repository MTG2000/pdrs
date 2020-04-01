import { observable, action, decorate, runInAction, toJS, autorun } from "mobx";
import { NotificationManager } from "react-notifications";

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
      const res = await fetch("/api/admin/new-messages");
      const { data } = await res.json();
      runInAction(() => {
        this.newMessages = data;
        this.loadingNewMessages = false;
        // if(this.)
      });
    } catch (error) {}
  }

  async MarkMessageRead(id) {
    try {
      const res = await fetch("/api/admin/read-message", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });
      await res.json();
      this.FetchNewMessages();
    } catch (error) {}
  }

  async FetchNewAccountRequests() {
    try {
      this.loadingNewAccountRequests = true;
      const res = await fetch("/api/admin/new-account-requests");
      const { data } = await res.json();
      runInAction(() => {
        console.log(data);
        this.newAccountRequests = data;
        this.loadingNewAccountRequests = false;
        // if(this.)
      });
    } catch (error) {}
  }

  async MarkAccountRequestRead(id) {
    try {
      const res = await fetch("/api/admin/read-account-request", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });
      await res.json();
      this.FetchNewAccountRequests();
    } catch (error) {}
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
