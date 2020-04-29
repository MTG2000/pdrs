import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Bar } from "react-chartjs-2";
import LoadingPage from "../../Shared/LoadingPage";

const data = {
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
  useEffect(() => {
    (async () => {
      await store.getPrescriptionsPerClassification();
      data.labels = [];
      data.datasets[0].data = [];
      for (const e of store.prescriptionsPerClassification) {
        data.labels.push(e.Name);
        data.datasets[0].data.push(e.Count);
      }
    })();
  }, [store]);

  if (store.prescriptionsPerClassification.length === 0)
    return <LoadingPage message="Loading Report" />;

  return (
    <div>
      <h2>Prescriptions Per Classification</h2>
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

export default observer(PrescriptionsPerClassification);
