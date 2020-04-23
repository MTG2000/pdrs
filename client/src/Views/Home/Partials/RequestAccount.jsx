import React from "react";
import { useState } from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Telegram";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";

const RequestAccount = ({ store }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [recaptcha, setRecaptcha] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    store.SendRequest(name, type, phone, email, recaptcha);
  };

  return (
    <div className="" style={{ padding: "120px" }}>
      <Typography variant="h4" color="primary" align="center">
        Get An Account to Start Using P.D.R System
      </Typography>
      <form
        className="row py-5 justify-content-between mx-auto"
        style={{ maxWidth: 300 }}
        onSubmit={onSubmit}
      >
        <TextField
          label="Your Name"
          type="text"
          required
          className="col-12 col-md-55 mb-3"
          color="primary"
          variant="outlined"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          label="Your Specialty"
          placeholder="Dentist,Surgeon,Pharmacian,....."
          type="text"
          required
          className="col-12 col-md-55 mb-3"
          color="primary"
          variant="outlined"
          value={type}
          onChange={e => setType(e.target.value)}
        />
        <TextField
          label="Your Phone"
          placeholder="0983773292"
          type="text"
          required
          className="col-12 col-md-55 mb-3"
          color="primary"
          variant="outlined"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <TextField
          label="Your Email"
          placeholder="user@gmail.com"
          type="email"
          required
          className="col-12 col-md-55 mb-3"
          color="primary"
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <GoogleReCaptcha onVerify={token => setRecaptcha(token)} />

        <div className="col-12 py-4 row justify-content-center">
          <Button type="submit" variant="contained" color="primary">
            Send Request <SendIcon className="ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestAccount;
