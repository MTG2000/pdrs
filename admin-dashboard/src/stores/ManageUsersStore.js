import { observable, action, decorate, runInAction, toJS, autorun } from "mobx";
import { NotificationManager } from "react-notifications";

class ManageUsersStore {
  allUsers = [];
  users = [];

  async FetchAllUsers() {
    try {
      const res = await fetch("/api/users");
      const { data } = await res.json();
      runInAction(() => {
        this.allUsers = data;
        this.users = this.allUsers;
      });
    } catch (error) {}
  }

  SearchUsers(value) {
    console.log(value);
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

  async ToggleActive(id) {
    try {
      const res = await fetch("/api/users/toggle-active-state", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });
      await res.json();
      this.users = this.users.map(u => {
        if (u.Id === id) u.IsActive = !u.IsActive;
        return u;
      });
    } catch (error) {}
  }
}

decorate(ManageUsersStore, {
  users: observable,
  allUsers: observable,
  FetchAllUsers: action,
  SearchUsers: action
});

export default new ManageUsersStore();
// const todoStoreInstance = new NewPrescription();
// export default todoStoreInstance;
