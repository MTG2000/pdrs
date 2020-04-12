import { observable, action, decorate } from "mobx";
import { NotificationManager } from "react-notifications";

import axios from "axios";

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

  async Logout() {
    try {
      await axios.get("/api/users/logout");
      localStorage.clear();
      window.location = "/";
    } catch (error) {
      NotificationManager.error(
        error.response.data.message,
        error.response.data.title
      );
    }
  }
}

decorate(AppState, {
  username: observable,
  role: observable,
  Logout: action,
  ChangeWidth: action
});

export default new AppState();
// const todoStoreInstance = new NewPrescription();
// export default todoStoreInstance;
