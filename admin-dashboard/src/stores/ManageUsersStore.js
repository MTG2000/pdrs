import { observable, action, decorate, runInAction, toJS, autorun } from "mobx";
import { NotificationManager } from "react-notifications";

class ManageUsersStore {
  allUsers = [];

  async FetchAllUsers() {
    try {
      const res = await fetch("/api/users");
      const { data } = await res.json();
      runInAction(() => {
        this.allUsers = data;
      });
    } catch (error) {}
  }
}

decorate(ManageUsersStore, {
  allUsers: observable,
  FetchAllUsers: action
});

export default new ManageUsersStore();
// const todoStoreInstance = new NewPrescription();
// export default todoStoreInstance;
