import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Fab,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@material-ui/core";
import Add from "@material-ui/icons/Add";

const NewMedicine = ({ store }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = isSubmit => {
    setOpen(false);
    if (isSubmit === true) {
      store.NewMedicine(name);
    }
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        className="fab-btn"
        variant="extended"
        onClick={handleClickOpen}
      >
        <Add /> New Medicine
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Medicine</DialogTitle>
        <DialogContent>
          <div className="row justify-content-between mx-0 px-2">
            <TextField
              label="Medicine Name"
              type="text"
              className="col-12  mb-3"
              color="primary"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClose(true)} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewMedicine;
