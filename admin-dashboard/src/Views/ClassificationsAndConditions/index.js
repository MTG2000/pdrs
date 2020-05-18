import React, { useContext, useState } from "react";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Box, Paper } from "@material-ui/core";
import ManageClassifications from "./partials/ManageClassifications";
import ManageConditions from "./partials/ManageConditions";
import { mainContext } from "../../stores/Context";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}
const ClassificationsAndConditions = () => {
  const [value, setValue] = React.useState("classifications");

  const { ManageClassificationsStore } = useContext(mainContext);
  const [store] = useState(ManageClassificationsStore);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container className="py-5">
      <Paper square>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab
            value="classifications"
            label="Classifications"
            {...a11yProps("classifications")}
          />
          <Tab
            value="conditions"
            label="Conditions"
            {...a11yProps("conditions")}
          />
        </Tabs>
      </Paper>
      <TabPanel value={value} index="classifications">
        <ManageClassifications store={store} />
      </TabPanel>
      <TabPanel value={value} index="conditions">
        <ManageConditions />
      </TabPanel>
    </Container>
  );
};

export default ClassificationsAndConditions;
