import React, { useContext, useState } from "react";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Box, Paper } from "@material-ui/core";
import SystemUsage from "./Partials/SystemUsage";
import { mainContext } from "../../stores/Context";
import PrescriptionsPerClassification from "./Partials/PrescriptionsPerClassification";

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

const Statistics = () => {
  const [value, setValue] = React.useState("system-usage");
  const { StatisticsStore } = useContext(mainContext);
  const [store] = useState(StatisticsStore);

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
            value="system-usage"
            label="System Usage"
            wrapped
            {...a11yProps("system-usage")}
          />
          <Tab
            value="prescription/classification"
            label="Prescriptions/Classification"
            {...a11yProps("prescription/classification")}
          />
        </Tabs>
      </Paper>
      <TabPanel value={value} index="system-usage">
        <SystemUsage store={store} />
      </TabPanel>
      <TabPanel value={value} index="prescription/classification">
        <PrescriptionsPerClassification store={store} />
      </TabPanel>
    </Container>
  );
};

export default Statistics;
