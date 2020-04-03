import { observable, action, decorate, runInAction, toJS, autorun } from "mobx";
import { NotificationManager } from "react-notifications";

class ManageUsersStore {
  allUsers = [];
  users = [];

  async FetchAllUsers() {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw Error("Forbidden");
      const { data } = await res.json();
      runInAction(() => {
        console.log(data);
        this.allUsers = data;
        this.users = this.allUsers;
      });
    } catch (error) {}
  }

  SearchUsers(value) {
    this.users = this.allUsers.filter(u => {
      if (u.Username.toLowerCase().indexOf(value.toLowerCase()) !== -1)
        return true;
      if (u.DoctorName) {
        return u.DoctorName.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      }
      if (u.PharmacyName) {
        return u.PharmacyName.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      }
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
      // console.log({
      //   username,
      //   contact,
      //   password,
      //   type,
      //   doctorName,
      //   pharmacyName,
      //   pharmacyAddress
      // });
      // // return;
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          contact,
          password,
          type,
          doctorName,
          pharmacyName,
          address: pharmacyAddress
        })
      });

      if (!res.ok) throw Error();
      await res.json();
      NotificationManager.success("User Registered Successfully");
      runInAction(() => {});
    } catch (error) {
      NotificationManager.error("User Registereation Failed");
    }
  }

  async ToggleActive(id) {
    try {
      this.users = this.users.map(u => {
        if (u.Id === id) u.loadingToggleActive = true;
        return u;
      });
      this.loadingToggleActive = true;
      const res = await fetch("/api/users/toggle-active-state", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });
      await res.json();
      runInAction(() => {
        this.users = this.users.map(u => {
          if (u.Id === id) u.loadingToggleActive = false;
          return u;
        });
        this.users = this.users.map(u => {
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
  RegisterUser: action
});

export default new ManageUsersStore();
// const todoStoreInstance = new NewPrescription();
// export default todoStoreInstance;
