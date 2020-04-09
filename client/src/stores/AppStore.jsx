import { observable, action, decorate, runInAction } from "mobx";
import { NotificationManager } from "react-notifications";

class AppStore {
  username = "";
  role = "";

  messagesCategories = [];

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
        this.role = data.role;

        let redirectUrl = "/";
        //Clear the storage
        localStorage.removeItem("pharmacyName");
        localStorage.removeItem("doctorName");

        localStorage.setItem("username", data.username);
        localStorage.setItem("user-role", this.role);

        if (data.DoctorName) {
          this.doctorName = data.DoctorName;
          localStorage.setItem("doctorName", this.doctorName);
          NotificationManager.success("Welcome Back Doctor " + this.doctorName);
        } else if (data.PharmacyName) {
          this.pharmacyName = data.PharmacyName;
          localStorage.setItem("pharmacyName", this.pharmacyName);
          NotificationManager.success("Welcome Back  ");
        } else if (data.IsAdmin) {
          redirectUrl = "/admin";
          NotificationManager.success("Welcome Back Admin ");
        }
        setTimeout(() => {
          runInAction(() => {
            this.username = data.username;
            window.location = redirectUrl;
          });
        }, 3000);
      });
    } catch (error) {
      NotificationManager.error("Couldn't Login with the provided credentials");
    }
  }

  async SendRequest(name, type, phone, email) {
    try {
      const res = await fetch("/api/users/request-account", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, type, phone, email })
      });
      const data = await res.json();
      console.log(data);
      NotificationManager.success(" Your Request was sent successfuly");
    } catch (error) {
      NotificationManager.error("Couldn't Login with the provided credentials");
    }
  }

  async Logout() {
    try {
      const res = await fetch("/api/users/logout");
      if (!res.ok) throw Error("couldn't logout");

      this.username = null;
      this.role = null;
      localStorage.removeItem("pharmacyName");
      localStorage.removeItem("doctorName");
      localStorage.removeItem("username");
      localStorage.removeItem("user-role");
    } catch (error) {}
  }

  async FetchMessagesCategories() {
    try {
      const res = await fetch("/api/users/messages-categories");
      const { data } = await res.json();
      runInAction(() => {
        this.messagesCategories = data;
      });
    } catch (error) {}
  }

  async SendMessage(category, content) {
    try {
      const res = await fetch("/api/users/send-message", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ category, content })
      });
      if (!res.ok) throw Error("");
      NotificationManager.success(" Your Message was sent successfuly");
    } catch (error) {
      NotificationManager.error(
        "Something wrong happened while sending message"
      );
    }
  }
}

decorate(AppStore, {
  username: observable,
  role: observable,
  messagesCategories: observable,
  doctorName: observable,
  pharmacyName: observable,
  Login: action,
  Logout: action,
  FetchMessagesCategories: action
});

export default new AppStore();
// const todoStoreInstance = new NewPrescription();
// export default todoStoreInstance;
