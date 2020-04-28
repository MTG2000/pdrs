import React, { useContext, useState } from "react";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Box, Typography, Paper } from "@material-ui/core";
import SystemUsage from "./Partials/SystemUsage";
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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
            {...a11yProps("one")}
          />
          <Tab value="two" label="Item Two" {...a11yProps("two")} />
          <Tab value="three" label="Item Three" {...a11yProps("three")} />
        </Tabs>
      </Paper>
      <TabPanel value={value} index="system-usage">
        <SystemUsage store={store} />
      </TabPanel>
      <TabPanel value={value} index="two">
        Item Two
      </TabPanel>
      <TabPanel value={value} index="three">
        Item Three
      </TabPanel>
    </Container>
  );
};

export default Statistics;
