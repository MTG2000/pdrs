import React, { useEffect, useRef } from "react";

const ActionBtn = props => {
  const elem = useRef(null);

  useEffect(() => {
    toggleShowLoading(props.loading);
  }, [props.loading]);

  const toggleShowLoading = (show = false) => {
    if (!elem.current) return;
    if (show) {
      elem.current.disabled = true;
      elem.current.querySelector(".loading").style.display = "block";
      elem.current.querySelector(".content").style.display = "none";
    } else {
      elem.current.disabled = false;
      elem.current.querySelector(".loading").style.display = "none";
      elem.current.querySelector(".content").style.display = "block";
    }
  };

  let ElementWithClassName = React.cloneElement(props.children, {
    ref: elem
  });

  return <>{ElementWithClassName}</>;
};

export default ActionBtn;
