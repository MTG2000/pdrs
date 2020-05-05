import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Bar } from "react-chartjs-2";
import LoadingPage from "../../Shared/LoadingPage";
import DatePicker from "react-date-picker";
import date from "date-and-time";
import { Grid, Button } from "@material-ui/core";
import { useCallback } from "react";

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

  const getData = useCallback(() => {
    store.getPrescriptionsPerClassification(startDate, endDate);
  }, [store, startDate, endDate]);

  useEffect(() => {
    getData();
  }, [getData]);

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
      <Grid container justify="center" alignItems="center">
        from:{" "}
        <DatePicker
          className="mx-3"
          value={startDate}
          onChange={(date) => setStartDate(date)}
        />
        to:{" "}
        <DatePicker
          className="mx-3"
          value={endDate}
          onChange={(date) => setEndDate(date)}
        />
        <Button variant="contained" color="primary" onClick={getData}>
          Go
        </Button>
      </Grid>
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
