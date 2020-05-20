import React, { useState } from "react";
import { FilePond } from "react-filepond";
import { TextField, Button } from "@material-ui/core";

const ManageClassifications = ({ store }) => {
  const [files, setFiles] = useState([]);
  const [name, setname] = useState("");

  const onSubmit = () => {
    var formData = new FormData();

    formData.append("name", name);
    formData.append("image", files[0]);
    store.NewClassification(formData);
  };

  return (
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
  );
};

export default ManageClassifications;
