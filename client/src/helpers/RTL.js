import React from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export default function RTL(props) {
  if (localStorage.getItem("lang") !== "ar") return props.children;

  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}
