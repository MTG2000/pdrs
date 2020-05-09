import { observable, action, decorate, runInAction } from "mobx";
import { NotificationManager } from "react-notifications";
import axios from "axios";

class ManageUsersStore {
  allUsers = [];
  users = [];

  async FetchAllUsers() {
    try {
      const res = await axios.get("/api/users");
      const { data } = res.data;
      runInAction(() => {
        this.allUsers = data;
        console.log(data);

        this.users = this.allUsers;
      });
    } catch (error) {}
  }

  SearchUsers(value) {
    this.users = this.allUsers.filter((u) => {
      if (u.Username.toLowerCase().indexOf(value.toLowerCase()) !== -1)
        return true;
      if (u.DoctorName) {
        return u.DoctorName.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      }
      if (u.PharmacyName) {
        return u.PharmacyName.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      }
      return false;
    });
  }

  async RegisterUser(
    username,
    contact,
    password,
    type,
    doctorName,
    pharmacyName,
    pharmacyAddress
  ) {
    try {
      await axios.post("/api/users/register", {
        username,
        contact,
        password,
        type,
        doctorName,
        pharmacyName,
        address: pharmacyAddress,
      });

      NotificationManager.success("User Registered Successfully");
      this.FetchAllUsers();
      runInAction(() => {});
    } catch (error) {
      NotificationManager.error(
        error.response.data.message,
        error.response.data.title
      );
    }
  }

  async ToggleActive(id) {
    try {
      this.users = this.users.map((u) => {
        if (u.Id === id) u.loadingToggleActive = true;
        return u;
      });
      this.loadingToggleActive = true;
      await axios.post("/api/users/toggle-active-state", {
        id,
      });
      runInAction(() => {
        this.users = this.users.map((u) => {
          if (u.Id === id) u.loadingToggleActive = false;
          return u;
        });
        this.users = this.users.map((u) => {
          if (u.Id === id) u.IsActive = !u.IsActive;
          return u;
        });
      });
    } catch (error) {}
  }
}

decorate(ManageUsersStore, {
  users: observable,
  allUsers: observable,
  FetchAllUsers: action,
  SearchUsers: action,
  RegisterUser: action,
});

export default new ManageUsersStore();
// const todoStoreInstance = new NewPrescription();
// export default todoStoreInstance;
