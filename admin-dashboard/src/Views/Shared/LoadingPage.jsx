import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useTheme } from "@material-ui/core";

const LoadingPage = props => {
  const theme = useTheme();
  return (
    <div
      className="row justify-content-center align-content-center py-5"
      style={{ minHeight: props.fullPage ? "88vh" : undefined }}
    >
      <ScaleLoader
        //  css={override}
        //        size={5}
        height={55}
        width={8}
        margin={3}
        color={theme.palette.primary.main}
        loading={true}
        {...props}
      />
      <h2 className="text-primary col-12 text-center py-2">
        {props.message || "Loading"}
      </h2>
    </div>
  );
};

export default LoadingPage;
