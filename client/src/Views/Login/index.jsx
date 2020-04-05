import React, { useState, useContext } from "react";
import {
  TextField,
  useTheme,
  makeStyles,
  Typography,
  Button
} from "@material-ui/core";
import { mainContext } from "../../stores/Context";
const useStyle = makeStyles({
  input: theme => ({
    borderColor: `${theme.palette.primary.main} !important`,
    borderWidth: 2
  })
});

const LoginPage = () => {
  const theme = useTheme();
  const classes = useStyle({ ...theme });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { AppStore } = useContext(mainContext);

  const [store] = useState(AppStore);

  const handleSubmit = e => {
    e.preventDefault();
    store.Login(username, password);
  };

  if (store.username) window.location = "/";

  return (
    <div
      className="row justify-content-center flex-column align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Typography
        variant="h3"
        color="primary"
        className="mb-5 col-12 text-center"
      >
        Who are you again ??
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="row justify-content-center"
        style={{ maxWidth: 280 }}
      >
        <TextField
          id="username"
          label="User Name"
          value={username}
          onChange={e => setUsername(e.target.value)}
          variant="outlined"
          color="primary"
          className={`${classes.input} mx-auto mb-3 col-12 `}
          InputProps={{
            classes: {
              notchedOutline: classes.input
            }
          }}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          variant="outlined"
          color="primary"
          className={`${classes.input} mx-auto mb-3 col-12 `}
          InputProps={{
            classes: {
              notchedOutline: classes.input
            }
          }}
        />
        <div className="row col-12 justify-content-center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
