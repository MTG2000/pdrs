import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";
import { TextField, Grid, Button } from "@material-ui/core";

const ManageClassifications = ({ store }) => {
  const [files, setFiles] = useState([]);
  const [name, setname] = useState("");

  const onSubmit = () => {
    var formData = new FormData();

    formData.append("name", name);
    formData.append("image", files[0]);
    console.log(formData);

    store.NewClassification(formData);
  };

  return (
    <Grid container justify="center">
      <div style={{ width: "100%", maxWidth: 400 }}>
        <TextField
          id="search-meds"
          label="Classification Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          variant="outlined"
          color="primary"
          className=" mx-auto mb-3 col-12 "
        />
        <FilePond
          name="image"
          files={files}
          allowMultiple={true}
          maxFiles={1}
          labelIdle="Choose A Classification SVG Image Browse"
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
        <div className="row justify-content-center py-4">
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Add Classification
          </Button>
        </div>
      </div>
    </Grid>
  );
};

export default ManageClassifications;
