import React, { useContext, useState } from "react";
import { mainContext } from "../../stores/Context";
import MedicinsList from "./Partials/MedicinsList";
import { Container } from "@material-ui/core";
import SearchInput from "./Partials/SearchInput";
import NewMedicine from "./Partials/NewMedicine";

const ManageMedicins = () => {
  const { ManageMedicinsStore } = useContext(mainContext);
  const [store] = useState(ManageMedicinsStore);
  return (
    <Container className="py-5">
      <SearchInput store={store} />
      <MedicinsList store={store} />
      <NewMedicine store={store} />
    </Container>
  );
};

export default ManageMedicins;
