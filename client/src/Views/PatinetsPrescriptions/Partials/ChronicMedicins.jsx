import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const ChronicMedicins = ({ medicins }) => {
  return (
    <div className="py-4 mt-5 mx-auto" style={{ maxWidth: 500 }}>
      <ExpansionPanel defaultExpanded={true}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="font-weight-bold text-primary">
            Chronic Medicins
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="px-2">
            {medicins.map((m, i) => (
              <Typography key={i}>{m}</Typography>
            ))}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default ChronicMedicins;
