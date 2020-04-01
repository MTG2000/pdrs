import { observable, action, decorate, runInAction, toJS, autorun } from "mobx";
import { NotificationManager } from "react-notifications";

class AppState {
  //Global
  username = "";
  role = "";

  constructor() {
    this.username = localStorage.getItem("username");
    this.role = localStorage.getItem("user-role");
  }

  ChangeWidth(toggled) {
    const sidebarWidth = toggled ? 240 : 64;
    const appContainer = document.getElementById("app-container");
    const pageWidth = Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
    appContainer.style.width = `${pageWidth - sidebarWidth}px`;
  }

  Logout() {
    this.username = null;
    this.role = null;
    localStorage.removeItem("username");
    localStorage.removeItem("user-role");
    window.location = "/";
  }

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

decorate(AppState, {
  username: observable,
  role: observable,
  newMessages: observable,
  loadingNewMessages: observable,
  newAccountRequests: observable,
  loadingNewAccountRequests: observable,
  FetchNewAccountRequests: action,
  Logout: action,
  ChangeWidth: action
});

export default new AppState();
// const todoStoreInstance = new NewPrescription();
// export default todoStoreInstance;
