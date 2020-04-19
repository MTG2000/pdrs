import { observable, action, decorate, runInAction } from "mobx";
import { NotificationManager } from "react-notifications";
import axios from "axios";

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
      const res = await axios.post("/api/users/login", { username, password });
      const { data } = res.data;

      runInAction(() => {
        let redirectUrl = "/";
        this.role = data.role;
        localStorage.clear();
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("username", data.username);
        localStorage.setItem("user-role", this.role);

        if (data.DoctorName) {
          this.doctorName = data.DoctorName;
          localStorage.setItem("doctorName", this.doctorName);
          NotificationManager.success("Welcome Back Doctor " + this.doctorName);
        } else if (data.PharmacyName) {
          this.pharmacyName = data.PharmacyName;
          localStorage.setItem("pharmacyName", this.pharmacyName);
          NotificationManager.success("Welcome Back ");
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
      NotificationManager.error(
        error.response.data.message,
        error.response.data.title
      );
    }
  }

  async SendRequest(name, type, phone, email) {
    try {
      await axios.post("/api/users/request-account", {
        name,
        type,
        phone,
        email
      });

      NotificationManager.success(" Your Request was sent successfuly");
    } catch (error) {
      NotificationManager.error(
        error.response.data.message,
        error.response.data.title
      );
    }
  }

  async Logout() {
    try {
      await axios.get("/api/users/logout");
    } catch (error) {
    } finally {
      localStorage.clear();
      window.location = "/login";
    }
  }

  async FetchMessagesCategories() {
    try {
      const res = await axios.get("/api/users/messages-categories");
      const { data } = res.data;

      runInAction(() => {
        this.messagesCategories = data;
      });
    } catch (error) {}
  }

  async SendMessage(category, content) {
    try {
      await axios.post("/api/users/send-message", {
        category,
        content
      });
      NotificationManager.success(" Your Message was sent successfuly");
    } catch (error) {
      NotificationManager.error(
        error.response.data.message,
        error.response.data.title
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
