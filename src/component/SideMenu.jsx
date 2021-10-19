import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles({
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
    width: "19rem",
    height: "100%",
    backgroundColor: "#253053",
  },
});

const SideMenu = () => {
  const classes = useStyles();

  return <div className={classes.sideMenu}></div>;
};

export default SideMenu;
