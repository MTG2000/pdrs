import { observable, action, decorate, runInAction, toJS, autorun } from "mobx";
import { NotificationManager } from "react-notifications";

class AppStore {
  username = "";
  role = "";

  constructor() {
    this.username = localStorage.getItem("username");
    this.role = localStorage.getItem("user-role");
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
      console.log(data);
      setTimeout(() => {
        window.location = "/";
      }, 30000);
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

decorate(AppStore, {
  username: observable,
  role: observable,
  Login: action,
  Logout: action
});

export default new AppStore();
// const todoStoreInstance = new NewPrescription();
// export default todoStoreInstance;
