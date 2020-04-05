import { observable, action, decorate, runInAction } from "mobx";

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
      if (!res.ok) throw Error();
      const { data } = await res.json();
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
      if (!res.ok) throw Error();
      const { data } = await res.json();
      runInAction(() => {
        this.newAccountRequests = data;
        this.loadingNewAccountRequests = false;
      });
    } catch (error) {
      this.loadingNewAccountRequests = false;
    }
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
