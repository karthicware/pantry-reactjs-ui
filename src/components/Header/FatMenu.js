import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

const styles = {
  menuContainer: {
    "&:hover": {
      display: "flex"
    },
    padding: 20,
    position: "absolute",
    top: "60%",
    zIndex: 99,
    backgroundColor: "rgba(255,255,255,.95)",
    display: "none",
    width: "100%",
    "& .MuiGrid-item": {
      borderRight: "1px solid #EEE"
    },
    "& .MuiGrid-item div": {
      display: "flex",
      flexDirection: "column"
    },
    "& .MuiGrid-item div a": {
      padding: 5
    }
  }
};
const useStyles = makeStyles(styles);
export default function FatMenu() {
  const classes = useStyles();
  return (
    <GridContainer className={classes.menuContainer + " homeMenu"}>
      <GridItem md={4} sm={2}>
        <div>
          <a>All Sarees</a>
          <a>Newly Added Sarees</a>
        </div>
      </GridItem>
      <GridItem md={4} sm={2}>
      <div>
          <a>All Sarees</a>
          <a>Newly Added Sarees</a>
        </div>
      </GridItem>
      <GridItem md={4} sm={2}>
      <div>
          <a>All Sarees</a>
          <a>Newly Added Sarees</a>
        </div>
      </GridItem>
    </GridContainer>
  );
}
