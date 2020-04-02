import React, { useContext, useState } from "react";
import { mainContext } from "../../stores/Context";
import { observer } from "mobx-react";
import UsersList from "./Partials/UsersList";
import SearchInput from "./Partials/SearchInput";

const ManageUsers = () => {
  const { ManageUsersStore } = useContext(mainContext);
  const [store] = useState(ManageUsersStore);

  return (
    <div className="py-5">
      <SearchInput store={store} />
      <UsersList store={store} />
    </div>
  );
};

export default observer(ManageUsers);
