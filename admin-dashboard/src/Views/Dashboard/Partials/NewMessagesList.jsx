import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import NewMessageCard from "./NewMessageCard";

const NewMessagesList = ({ store }) => {
  useEffect(() => {
    store.FetchNewMessages();
  }, [store]);

  if (store.loadingNewMessages)
    return <h2 className="text-center py-5">Loading...</h2>;

  if (store.newMessages.length === 0)
    return <h2 className="text-center py-5">No New Messages...</h2>;

  return (
    <div className="row py-5 mx-0">
      <h2>You Have Some New Messages</h2>
      {store.newMessages.map(m => (
        <NewMessageCard
          key={m.Id}
          message={m}
          onRead={() => store.MarkMessageRead(m.Id)}
        />
      ))}
    </div>
  );
};

export default observer(NewMessagesList);
