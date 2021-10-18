import React from "react";
// nodejs library that concatenates classes
import PropTypes from "prop-types";
import classNames from "classnames";
import axios from "axios";
import Router from "next/router";

// core components
import { makeStyles } from "@material-ui/core/styles";
import { FormLabel, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";

//custom components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

// @material-ui/icons
import Add from "@material-ui/icons/Add";
import DeleteForever from "@material-ui/icons/DeleteForever";
import Edit from "@material-ui/icons/Edit";
import BorderColorOutlinedIcon from "@material-ui/icons/BorderColorOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";

import {
  title,
  whiteColor,
  mainRaised,
  cardTitle
} from "assets/jss/material-kit-pro-react.js";
import SectionAddressForm from "pages-sections/MyAccount/Addresses/SectionAddressForm";

const styles = {
  iconControls: {
    cursor: "pointer",
    fontSize: 20
  },
  addressContainer: {
    "& p": {
      textTransform: "capitalize"
    }
  },
  defaultAddressCheckbox: {
    paddingLeft: 0,
    cursor: "default"
  },
  defaultAddressText: {
    color: "green",
    fontWeight: 500
  },
  addressCheckbox: {
    paddingLeft: 0
  }
};

const useStyles = makeStyles(styles);

export default function AddressText({
  name,
  houseNo,
  address,
  city,
  state,
  pincode,
  mobile
}) {
  return (
    <>
      <Typography variant="subtitle2">{name}</Typography>
      <Typography variant="body2">{houseNo}</Typography>
      <Typography variant="body2">{address}</Typography>
      <Typography variant="body2">
        {city + ", " + state + " - " + pincode}
      </Typography>
      <Typography variant="body2">+91-{mobile}</Typography>
    </>
  );
}

AddressText.propTypes = {
  name: PropTypes.string.isRequired,
  houseNo: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  pincode: PropTypes.number.isRequired,
  mobile: PropTypes.string.isRequired
};
