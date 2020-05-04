import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Bar } from "react-chartjs-2";
import LoadingPage from "../../Shared/LoadingPage";
import date from "date-and-time";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Grid, Button } from "@material-ui/core";

const initialData = {
  labels: [],
  datasets: [
    {
      label: "Prescriptions Per Classification",
      backgroundColor: "rgba(255,99,132,0.5)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [],
    },
  ],
};

const PrescriptionsPerClassification = ({ store }) => {
  const [startDate, setStartDate] = React.useState(
    date.addMonths(new Date(), -6)
  );
  const [endDate, setEndDate] = React.useState(new Date());

  const [data, setData] = React.useState(
    JSON.parse(JSON.stringify(initialData))
  );

  const getData = () => {
    store.getPrescriptionsPerClassification(startDate, endDate);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let temp = JSON.parse(JSON.stringify(initialData));

    for (const e of store.prescriptionsPerClassification) {
      temp.labels.push(e.Name);
      temp.datasets[0].data.push(e.Count);
    }
    setData(temp);
  }, [store.prescriptionsPerClassification]);

  if (store.prescriptionsPerClassification.length === 0)
    return <LoadingPage message="Loading Report" />;

  return (
    <div>
      <h2>Prescriptions Per Classification</h2>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="center" alignItems="center">
          <KeyboardDatePicker
            disableToolbar
            className="mx-4"
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            label="From"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            className="mx-4"
            format="MM/dd/yyyy"
            margin="normal"
            label="To"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <Button variant="contained" color="primary" onClick={getData}>
            Go
          </Button>
        </Grid>
      </MuiPickersUtilsProvider>
      <Bar
        data={data}
        width={100}
        height={200}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default observer(PrescriptionsPerClassification);
