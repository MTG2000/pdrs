import { observable, action, decorate, runInAction, toJS, autorun } from "mobx";
import { NotificationManager } from "react-notifications";

class AppStore {
  username = "";
  role = "";

  constructor() {
    this.username = localStorage.getItem("username");
    this.role = localStorage.getItem("user-role");
    this.doctorName = localStorage.getItem("doctorName") || undefined;
    this.pharmacyName = localStorage.getItem("pharmacyName") || undefined;
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

      runInAction(() => {
        this.username = data.username;
        this.role = data.role;

        let redirectUrl = "/";
        //Clear the storage
        localStorage.setItem("username", this.username);
        localStorage.setItem("user-role", this.role);
        localStorage.removeItem("pharmacyName");
        localStorage.removeItem("doctorName");

        if (data.DoctorName) {
          this.doctorName = data.DoctorName;
          localStorage.setItem("doctorName", this.doctorName);
          NotificationManager.success("Welcome Back Doctor " + this.doctorName);
        } else if (data.PharmacyName) {
          this.pharmacyName = data.PharmacyName;
          localStorage.setItem("pharmacyName", this.pharmacyName);
          NotificationManager.success("Welcome Back  ");
        } else {
          NotificationManager.success("Welcome Back Admin ");
          redirectUrl = "/admin";
        }
        setTimeout(() => {
          window.location = redirectUrl;
        }, 3000);
      });
    } catch (error) {
      NotificationManager.error("Couldn't Login with the provided credentials");
    }
  }

  Logout() {
    this.username = null;
    this.role = null;
    localStorage.removeItem("pharmacyName");
    localStorage.removeItem("doctorName");
    localStorage.removeItem("username");
    localStorage.removeItem("user-role");
  }
}

decorate(AppStore, {
  username: observable,
  role: observable,
  doctorName: observable,
  pharmacyName: observable,
  Login: action,
  Logout: action
});

export default new AppStore();
// const todoStoreInstance = new NewPrescription();
// export default todoStoreInstance;
