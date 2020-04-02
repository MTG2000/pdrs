import React, { useEffect } from "react";
import { observer } from "mobx-react";
import UserCard from "./UserCard";

const UsersList = ({ store }) => {
  useEffect(() => {
    store.FetchAllUsers();
  }, [store]);

  return (
    <div style={{ maxWidth: 600 }} className="mx-auto py-5">
      {store.users.map(u => (
        <UserCard
          key={u.Id}
          user={u}
          onToggleActive={() => store.ToggleActive(u.Id)}
        />
      ))}
    </div>
  );
};

export default observer(UsersList);
