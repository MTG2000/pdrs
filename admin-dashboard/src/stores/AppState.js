import { observable, action, decorate, runInAction, toJS, autorun } from "mobx";
import { NotificationManager } from "react-notifications";

class AppState {
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

  async Login(username, password) {
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
      const { data } = await res.json();
      NotificationManager.success("Welcome Back");
      runInAction(() => {
        this.username = data.username;
        this.role = data.role;
        localStorage.setItem("username", this.username);
        localStorage.setItem("user-role", this.role);
      });
    } catch (error) {
      NotificationManager.error("Couldn't Login with the provided credentials");
    }
  }

  Logout() {
    this.username = null;
    this.role = null;
    localStorage.removeItem("username");
    localStorage.removeItem("user-role");
  }
}

decorate(AppState, {
  username: observable,
  role: observable,
  Login: action,
  Logout: action,
  ChangeWidth: action
});

export default new AppState();
// const todoStoreInstance = new NewPrescription();
// export default todoStoreInstance;
