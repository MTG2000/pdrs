import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import Add from "@material-ui/icons/Add";
import { FilePond } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";

const NewClassification = ({ store }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [files, setFiles] = useState([]);

  const onSubmit = () => {
    var formData = new FormData();
    formData.append("name", name);
    formData.append("image", files[0]);
    store.NewClassification(formData);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (isSubmit) => {
    setOpen(false);
    if (isSubmit === true) {
      onSubmit();
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
        <Add /> New Classification
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          style: { width: "100%", maxWidth: 400 },
        }}
      >
        <DialogTitle id="form-dialog-title">New Classification</DialogTitle>
        <DialogContent>
          <div className="row justify-content-between mx-0 px-2">
            <TextField
              label="Classification Name"
              type="text"
              className="col-12  mb-3"
              color="primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <FilePond
            name="image"
            files={files}
            allowMultiple={true}
            maxFiles={1}
            labelIdle="'Drag & Drop An SVG Image or <span class='filepond--label-action'> Browse </span> "
            onprocessfilestart={() => {}}
            server={{
              // Disable possibility to upload file
              process: null,
            }}
            instantUpload={false}
            onupdatefiles={(fileItems) => {
              // Set currently active file objects to this.state
              setFiles(fileItems.map((fileItem) => fileItem.file));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClose(true)} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewClassification;
