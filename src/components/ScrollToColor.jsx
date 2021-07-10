import React from "react";
import { useScrollTrigger } from "@material-ui/core";

const ScrollHandler = props => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: props.window ? window() : undefined
  });


  return React.cloneElement(props.children, {
    style: {
      backgroundColor: trigger ? "rgb(51,51,51,0.6)" : "rgb(51,51,51,0.2)",
      transition: trigger ? "0.3s" : "0.5s",
      boxShadow: "none",
      padding: "1px 0px",
    }
  });
};

const ScrollToColor01 = props => {
  return <ScrollHandler {...props}>{props.children}</ScrollHandler>;
};

export default ScrollToColor01;
