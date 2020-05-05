import React, { useEffect, useCallback } from "react";
import { observer } from "mobx-react";
import { Bar } from "react-chartjs-2";
import LoadingPage from "../../Shared/LoadingPage";
import DatePicker from "react-date-picker";
import date from "date-and-time";
import { Grid, Button } from "@material-ui/core";

const initialData = {
  labels: [],
  datasets: [
    {
      label: "Most Used Medicins",
      backgroundColor: "rgba(203, 58, 183, 0.62)",
      borderColor: "rgba(203, 58, 183, 0.92)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(203, 58, 183, 0.42)",
      hoverBorderColor: "rgba(203, 58, 183, 0.72)",
      data: [],
    },
  ],
};

const MedicinsUsage = ({ store }) => {
  const [startDate, setStartDate] = React.useState(
    date.addMonths(new Date(), -6)
  );
  const [endDate, setEndDate] = React.useState(new Date());

  const [data, setData] = React.useState(
    JSON.parse(JSON.stringify(initialData))
  );

  const getData = useCallback(() => {
    store.getMedicinsUsage(startDate, endDate);
  }, [store, startDate, endDate]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    let temp = JSON.parse(JSON.stringify(initialData));

    for (const e of store.medicinsUsage) {
      temp.labels.push(e.Name);
      temp.datasets[0].data.push(e.Count);
    }
    setData(temp);
  }, [store.medicinsUsage]);

  if (store.medicinsUsage.length === 0)
    return <LoadingPage message="Loading Report" />;

  return (
    <div>
      <h2>Medicins Usage</h2>
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

export default observer(MedicinsUsage);
