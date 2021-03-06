import React from "react";
import { useEffect } from "react";
import { observer } from "mobx-react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper
} from "@material-ui/core";

const MedicinsList = ({ store }) => {
  useEffect(() => {
    store.FetchMedicins();
  }, [store]);

  return (
    <TableContainer
      component={Paper}
      style={{ maxWidth: 500 }}
      className="mx-auto mt-4"
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Medicine Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {store.medicins.map((m, i) => (
            <TableRow key={m.Id}>
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell>{m.Name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default observer(MedicinsList);
