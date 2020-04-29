import React from "react";
import { Line } from "react-chartjs-2";
import { useEffect } from "react";
import { observer } from "mobx-react";
import LoadingPage from "../../Shared/LoadingPage";

const data = {
  labels: [],
  datasets: [
    {
      label: "Prescriptions Dispensed in the last 6 months",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "#4caf50",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 2.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [],
    },
  ],
};

const SystemUsage = ({ store }) => {
  useEffect(() => {
    (async () => {
      await store.getPrescriptionsUsage();
      data.labels = [];
      data.datasets[0].data = [];
      for (const date of Object.keys(store.prescriptionsUsage)) {
        data.labels.push(date);
        data.datasets[0].data.push(store.prescriptionsUsage[date]);
      }
    })();
  }, [store]);

  if (store.prescriptionsUsage.length === 0)
    return <LoadingPage message="Loading Report" />;

  return (
    <div>
      <h2>System Usage</h2>
      <Line
        data={data}
        width={100}
        height={450}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default observer(SystemUsage);
