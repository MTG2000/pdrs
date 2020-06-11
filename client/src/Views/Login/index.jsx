import React, { useState, useContext } from "react";
import {
  TextField,
  useTheme,
  makeStyles,
  Typography,
  Button,
  Tooltip,
} from "@material-ui/core";
import { mainContext } from "../../stores/Context";
import { useTranslation } from "react-i18next";
const useStyle = makeStyles({
  input: (theme) => ({
    borderColor: `${theme.palette.primary.main} !important`,
    borderWidth: 2,
  }),
});

const LoginPage = () => {
  const theme = useTheme();
  const classes = useStyle({ ...theme });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { AppStore } = useContext(mainContext);
  const [store] = useState(AppStore);

  const { t } = useTranslation("common");

  const handleSubmit = (e) => {
    e.preventDefault();
    store.Login(username, password);
  };

  if (store.username) {
    window.location = "/";
  }
  return (
    <div
      className="row justify-content-center flex-column align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Tooltip
        title={
          <h6>
            Accounts For Testing: <br /> (Doctor) "ahmad" , "123123"
            <br /> (Pharmacian) "samer" , "123123"
            <br /> (Admin) "mtg" , "mtgmtgmtg"
          </h6>
        }
      >
        <div className="floating-message">?</div>
      </Tooltip>
      <Typography
        variant="h3"
        color="primary"
        className="mb-5 col-12 text-center"
      >
        {t("who are you")}
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="row justify-content-center"
        style={{ maxWidth: 280 }}
      >
        <TextField
          id="username"
          label={t("username")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          required
          color="primary"
          className={`${classes.input} mx-auto mb-3 col-12 `}
          InputProps={{
            classes: {
              notchedOutline: classes.input,
            },
          }}
        />
        <TextField
          id="password"
          label={t("password")}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          required
          color="primary"
          className={`${classes.input} mx-auto mb-3 col-12 `}
          InputProps={{
            classes: {
              notchedOutline: classes.input,
            },
          }}
        />
        <div className="row col-12 justify-content-center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            {t("login")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
