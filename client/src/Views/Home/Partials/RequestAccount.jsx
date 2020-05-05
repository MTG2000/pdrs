import React from "react";
import { useState } from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Telegram";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useTranslation } from "react-i18next";

const RequestAccount = ({ store }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [recaptcha, setRecaptcha] = useState("");

  const { t } = useTranslation(["home", "common"]);

  const onSubmit = (e) => {
    e.preventDefault();
    store.SendRequest(name, type, phone, email, recaptcha);
  };

  return (
    <div className="" style={{ padding: "120px" }}>
      <Typography variant="h4" color="primary" align="center">
        {t("get an account")}
      </Typography>
      <form
        className="row py-5 justify-content-between mx-auto"
        style={{ maxWidth: 300 }}
        onSubmit={onSubmit}
      >
        <TextField
          label={t("common:your name")}
          type="text"
          required
          className="col-12  mb-3"
          color="primary"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label={t("common:your specialty")}
          placeholder="Dentist,Surgeon,Pharmacian,....."
          type="text"
          required
          className="col-12  mb-3"
          color="primary"
          variant="outlined"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <TextField
          label={t("common:your phone")}
          placeholder="0983773292"
          type="text"
          required
          className="col-12  mb-3"
          color="primary"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label={t("common:your email")}
          placeholder="user@gmail.com"
          type="email"
          required
          className="col-12  mb-3"
          color="primary"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <GoogleReCaptcha onVerify={(token) => setRecaptcha(token)} />

        <div className="col-12 py-4 row mx-0 justify-content-center">
          <Button type="submit" variant="contained" color="primary">
            {t("common:send request")} <SendIcon className=" " />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestAccount;
