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
import MuiButton from "@material-ui/core/Button";

//custom components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

// @material-ui/icons
import Add from "@material-ui/icons/Add";
import DeleteForever from "@material-ui/icons/DeleteForever";
import Edit from "@material-ui/icons/Edit";
import BorderColorOutlinedIcon from "@material-ui/icons/BorderColorOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";

import { successColor, grayColor } from "assets/jss/material-kit-pro-react.js";
import SectionAddressForm from "pages-sections/MyAccount/Addresses/SectionAddressForm";
import AddressText from "pages-sections/Address/AddressText.js";

const styles = {
  iconControls: {
    cursor: "pointer",
    fontSize: 20,
  },
  addressContainer: {
    "& p": {
      textTransform: "capitalize",
    },
  },
  defaultAddressCheckbox: {
    paddingLeft: 0,
    cursor: "default",
  },
  defaultAddressText: {
    color: `${successColor[0]} !important`,
    fontWeight: 500,
  },
  addressCheckbox: {
    paddingLeft: 0,
  },
};

const useStyles = makeStyles(styles);

export default function CustomerAddresses({ deliveryPage, onSelectAddress }) {
  const classes = useStyles();
  const [addresses, setAddresses] = React.useState([]);
  const [editAddressId, setEditAddressId] = React.useState(null);
  const [toggleEditAddress, setToggleEditAddress] = React.useState(false);
  const [toggleAddAddress, setToggleAddAddress] = React.useState(false);

  React.useEffect(() => {
    loadAllAddress();
  }, []);

  const loadAllAddress = () => {
    axios
      .get(`/api/v1/customer/shipping-address`)
      .then((resp) => {
        if (resp.data.result) setAddresses(resp.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickEditAddress = (addressId) => {
    setEditAddressId(addressId);
    setToggleEditAddress(true);
  };

  const onClickRemoveAddress = (addressId) => {
    axios
      .delete(`/api/v1/customer/shipping-address/${addressId}`)
      .then((resp) => {
        loadAllAddress();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const markDefaultAddress = (addressId) => {
    axios
      .patch(
        `/api/v1/customer/shipping-address/mark-default?addressId=${addressId}`
      )
      .then((resp) => {
        loadAllAddress();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ShippingAddressCheckbox = ({ addressId, isDefaultAddress }) => {
    const handleChange = (addressId) => {
      markDefaultAddress(addressId);
    };
    if (isDefaultAddress)
      return (
        <Typography variant="caption" className={classes.defaultAddressText}>
          <Checkbox
            checked={true}
            color="default"
            size="small"
            className={classes.defaultAddressCheckbox}
          />{" "}
          This is your current default shiping address
        </Typography>
      );
    return (
      <Typography variant="caption">
        <Checkbox
          checked={false}
          color="default"
          size="small"
          className={classes.addressCheckbox}
          onChange={(e) => handleChange(addressId)}
        />{" "}
        Make this your default shiping address
      </Typography>
    );
  };

  const renderDeliverToThisAddress = (addressDetail) => {
    return (
      <MuiButton
        size="sm"
        variant="outlined"
        onClick={() => onSelectAddress(addressDetail)}
        style={{ marginTop: 15, color: grayColor[7] }}
      >
        Deliver to this address
      </MuiButton>
    );
  };

  return (
    <div>
      {(toggleAddAddress || toggleEditAddress) && (
        <SectionAddressForm
          edit={toggleEditAddress}
          addressId={editAddressId}
          onSuccess={loadAllAddress}
          onClose={() => {
            setToggleAddAddress(false);
            setToggleEditAddress(false);
          }}
        />
      )}
      {/* <Paper elevation={1} variant="outlined" style={{ marginTop: 20, padding: 20 }}> */}
      <Card>
        <CardBody>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Alert severity="warning" icon={false}>
              <Typography variant="caption">
                Add an address for delivery in your address book and make
                checkout faster
              </Typography>
            </Alert>
            <Link
              component="button"
              variant="subtitle2"
              onClick={() => setToggleAddAddress(true)}
              style={{ display: "flex", alignItems: "center" }}
            >
              <AddOutlinedIcon style={{ fontSize: 20 }} /> Add New Address
            </Link>
          </div>
          <GridContainer spacing={5} style={{ marginTop: 20 }}>
            {addresses.map((a, i) => (
              <GridItem md={6} key={i} className={classes.addressContainer}>
                <AddressText
                  name={a.name}
                  houseNo={a.houseNo}
                  address={a.address}
                  city={a.city}
                  state={a.state}
                  pincode={a.pincode}
                  mobile={a.mobile}
                />
                <div style={{ marginTop: 15 }}>
                  <span style={{ marginRight: 15 }}>
                    <BorderColorOutlinedIcon
                      className={classes.iconControls}
                      onClick={() => onClickEditAddress(a.id)}
                    />
                  </span>
                  <span>
                    <DeleteForever
                      className={classes.iconControls}
                      onClick={() => onClickRemoveAddress(a.id)}
                    />
                  </span>
                </div>
                {deliveryPage ? (
                  renderDeliverToThisAddress(a)
                ) : (
                  <ShippingAddressCheckbox
                    addressId={a.id}
                    isDefaultAddress={a.defaultAddress}
                  />
                )}
              </GridItem>
            ))}
          </GridContainer>
        </CardBody>
      </Card>
    </div>
  );
}

CustomerAddresses.propTypes = {
  deliveryPage: PropTypes.bool,
};
