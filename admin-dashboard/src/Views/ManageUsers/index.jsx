import React, { useContext, useState } from "react";
import { mainContext } from "../../stores/Context";
import { observer } from "mobx-react";
import UsersList from "./Partials/UsersList";

const ManageUsers = () => {
  const { ManageUsersStore } = useContext(mainContext);
  const [store] = useState(ManageUsersStore);

  return (
    <div>
      <UsersList store={store} />
    </div>
  );
};

export default observer(ManageUsers);
