import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import AccountRequestCard from "./AccountRequestCard";

const NewAccountRequests = ({ store }) => {
  useEffect(() => {
    store.FetchNewAccountRequests();
  }, [store]);

  if (store.loadingNewAccountRequests)
    return <h2 className="text-center py-5">Loading Account Requests...</h2>;

  if (store.newAccountRequests.length === 0)
    return <h2 className="text-center py-5">No New Requests...</h2>;

  console.log(toJS(store.newAccountRequests));

  return (
    <div className="row py-5 mx-0">
      <h2>You have New Account Requests</h2>
      {store.newAccountRequests.map(r => (
        <AccountRequestCard
          key={r.Id}
          requset={r}
          onRead={() => store.MarkAccountRequestRead(r.Id)}
        />
      ))}
    </div>
  );
};

export default observer(NewAccountRequests);
