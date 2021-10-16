import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

import {
  successColor,
} from "assets/jss/material-kit-pro-react.js";

const useStyles = makeStyles((theme) => ({
  offerTagRoot: {
    height: "18px",
    fontSize: 12,
    fontWeight: 600,
    padding: 10,
    border: `1px solid ${successColor[0]}`,
    backgroundColor: "#FFF",
    borderRadius: 4,
  },
  offerTag: {
    paddingLeft: 0,
    paddingRight: 0,
    color: successColor[0],
  },
}));

export default function OfferTag({ discPerc }) {
  const classes = useStyles();

  return (
    <Chip
      label={discPerc + " % OFF"}
      classes={{
        root: classes.offerTagRoot,
        label: classes.offerTag,
      }}
    />
  );
}

OfferTag.propTypes = {
  discPerc: PropTypes.string.isRequired,
};
