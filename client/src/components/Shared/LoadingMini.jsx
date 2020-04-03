import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useTheme } from "@material-ui/core";

const LoadingMini = props => {
  const theme = useTheme();

  return (
    <div className="align-self-center">
      <PulseLoader
        //  css={override}
        size={5}
        color={theme.palette.primary.main}
        loading={true}
        {...props}
      />
    </div>
  );
};

export default LoadingMini;
