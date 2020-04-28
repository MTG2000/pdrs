import React from "react";
import { Bar } from "react-chartjs-2";
import { useEffect } from "react";
import { observer } from "mobx-react";

const data = {
  labels: [],
  datasets: [
    {
      label: "Prescriptions Dispensed in the last 6 months",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [],
    },
  ],
};

const SystemUsage = ({ store }) => {
  useEffect(() => {
    (async () => {
      await store.getPrescriptionsUsage();
      for (const date of Object.keys(store.prescriptionsUsage)) {
        data.labels.push(date);
        data.datasets[0].data.push(store.prescriptionsUsage[date]);
      }
    })();
  }, [store]);

  return (
    <div>
      <h2>System Usage</h2>
      <Bar
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
