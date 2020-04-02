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
import PersonAdd from "@material-ui/icons/PersonAdd";
import PasswordGenerator from "generate-password";

const NewUser = ({ store }) => {
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = React.useState(false);
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [pharmacyName, setPharmacyName] = useState("");
  const [pharmacyAddress, setPharmacyAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = isSubmit => {
    setOpen(false);
    if (isSubmit) {
      store.RegisterUser(
        username,
        contact,
        password,
        userType,
        doctorName,
        pharmacyName,
        pharmacyAddress
      );
    }
  };

  const generatePassword = () => {
    setPassword(
      PasswordGenerator.generate({
        length: 8,
        uppercase: false
      })
    );
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        className="fab-btn"
        onClick={handleClickOpen}
      >
        <PersonAdd />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Register New User</DialogTitle>
        <DialogContent>
          <div className="row justify-content-between mx-0 px-2">
            <TextField
              label="Username"
              type="text"
              className="col-12 col-md-5 mb-3"
              color="primary"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              label="Contact Info"
              placeholder="0968443292"
              type="text"
              className="col-12 col-md-5 mb-3"
              value={contact}
              onChange={e => setContact(e.target.value)}
            />
            <div className="col-12 mb-3 px-0 row mx-0 ">
              <TextField
                label="Password"
                type="text"
                className="col-12 col-md-8"
                value={password}
                InputProps={{
                  readOnly: true
                }}
                color="primary"
              />
              <Button
                variant="contained"
                color="primary"
                className="mx-3  align-self-center"
                onClick={generatePassword}
              >
                Generate
              </Button>
            </div>
            <FormControl component="fieldset" className="my-3 col-12">
              <FormLabel component="legend">User Type</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={userType}
                onChange={e => setUserType(e.target.value)}
                className="row mx-0 flex-row"
              >
                <FormControlLabel
                  value="Admin"
                  control={<Radio color="primary" />}
                  label="Admin"
                />
                <FormControlLabel
                  value="Doctor"
                  control={<Radio color="primary" />}
                  label="Doctor"
                />
                <FormControlLabel
                  value="Pharmacy"
                  control={<Radio color="primary" />}
                  label="Pharmacy"
                />
              </RadioGroup>
            </FormControl>
            {userType === "Doctor" && (
              <TextField
                label="Doctor Name"
                type="text"
                className="col-12 mb-3"
                value={doctorName}
                onChange={e => setDoctorName(e.target.value)}
              />
            )}
            {userType === "Pharmacy" && (
              <>
                <TextField
                  label="Pharmacy Name"
                  type="text"
                  className="col-12 mb-3"
                  value={pharmacyName}
                  onChange={e => setPharmacyName(e.target.value)}
                />
                <TextField
                  label="Pharmacy Address"
                  type="text"
                  className="col-12 mb-3"
                  value={pharmacyAddress}
                  onChange={e => setPharmacyAddress(e.target.value)}
                />
              </>
            )}
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

export default NewUser;
