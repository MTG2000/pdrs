import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useTheme } from "@material-ui/core";

const LoadingMini = props => {
  const theme = useTheme();

  return (
    <div className="align-self-center">
      <PulseLoader
        //  css={override}
        {...props}
        size={5}
        color={theme.palette.primary.main}
        loading={true}
      />
    </div>
  );
};

export default LoadingMini;
