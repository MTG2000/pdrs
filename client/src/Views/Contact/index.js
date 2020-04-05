import React, { useContext, useState } from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { mainContext } from "../../stores/Context";
import { useEffect } from "react";
import { observer } from "mobx-react";
import SendIcon from "@material-ui/icons/Telegram";

const Contact = () => {
  const { AppStore } = useContext(mainContext);
  const [store] = useState(AppStore);
  const [category, setCategory] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    store.FetchMessagesCategories();
  }, [store]);

  const onSubmit = e => {
    e.preventDefault();
    store.SendMessage(category, msg);
  };

  return (
    <Container className="py-5">
      <Typography variant="h4" color="primary" align="center">
        We are here to help
      </Typography>
      <Typography variant="h6" align="center">
        Need A new medicine added, new classification, improvment proposal,
        found a bug in the system, or even just wanting to chat we will read
        your message and do our best to help
      </Typography>

      <form
        className="mx-auto mt-5"
        style={{ maxWidth: 300 }}
        onSubmit={onSubmit}
      >
        <FormControl className="w-100" variant="outlined" required>
          <InputLabel id="msg-category">Message Category</InputLabel>
          <Select
            labelId="msg-category"
            required
            value={category}
            onChange={e => setCategory(e.target.value)}
            label="Message Category"
          >
            {store.messagesCategories.length === 0 && (
              <MenuItem value={""}>Loading Categories</MenuItem>
            )}
            {store.messagesCategories.map(c => (
              <MenuItem key={c.Id} value={c.Id}>
                {c.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Your Message"
          type="text"
          required
          multiline
          rows="7"
          className="col-12 col-md-55 my-3"
          color="primary"
          variant="outlined"
          value={msg}
          onChange={e => setMsg(e.target.value)}
        />
        <div className="col-12 py-4 row mx-0 justify-content-center">
          <Button type="submit" variant="contained" color="primary">
            Send Message <SendIcon className="ml-2" />
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default observer(Contact);
