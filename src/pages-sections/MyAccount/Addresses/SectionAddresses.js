import React from "react";
// nodejs library that concatenates classes
import PropTypes from "prop-types";
import classNames from "classnames";
import axios from "axios";

// core components
import { makeStyles } from "@material-ui/core/styles";
import { FormLabel, Typography } from "@material-ui/core";

//custom components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Info from "components/Typography/Info.js";
import Muted from "components/Typography/Muted.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Success from "components/Typography/Success.js";
import Danger from "components/Typography/Danger.js";
import NavPills from "components/NavPills/NavPills.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter";

// @material-ui/icons
import Add from "@material-ui/icons/Add";
import DeleteForever from "@material-ui/icons/DeleteForever";
import Edit from "@material-ui/icons/Edit";

import { cardTitle } from "assets/jss/material-kit-pro-react.js";
import SectionAddressDialog from "pages-sections/MyAccount/Addresses/SectionAddressDialog";
import SectionAddressForm from "pages-sections/MyAccount/Addresses/SectionAddressForm";
import AddressText from "pages-sections/Cart/AddressText";

const styles = {
  cardTitle,
};

const useStyles = makeStyles(styles);

export default function SectionAddresses(props) {
  const classes = useStyles();
  const [addresses, setAddresses] = React.useState([]);
  const [editAddressId, setEditAddressId] = React.useState(null);
  const [toggleEditAddress, setToggleEditAddress] = React.useState(false);
  const [toggleAddAddress, setToggleAddAddress] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(`/api/v1/customer/shipping-address`)
      .then(resp => {
        if (resp.data.result) setAddresses(resp.data.result);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSuccessAddAddress = addressApi => {
    setAddresses([...addresses, addressApi]);
    props.successAlert("Address added successfully");
  };

  const handleSuccessUpdateAddress = addressApi => {
    const list = addresses.map(a => {
      if (a.id === addressApi.id) return { ...addressApi };
      else return a;
    });
    setAddresses(list);
    setEditAddressId(null);
    setToggleEditAddress(false);
    //props.successAlert("Address updated successfully");
  };

  const handleSuccessDeleteAddress = addressId => {
    const list = addresses.filter(a => a.id !== addressId);
    setAddresses(list);
  };

  const AddressList = () => {
    if (addresses.length === 0)
      return (<div style={{ margin: 150, textAlign: 'center' }}>
        <Typography variant="body1">
          You do not saved any address. Please add your new address
        </Typography>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => setToggleAddAddress(true)}
        >
          <Add /> Add New Address
          </Button>
      </div>);
    return (

      <GridContainer style={{marginTop: 30}}>
        {addresses.map((a, i) => (

          <GridItem md={4} key={a.id}>
            <Card style={{ marginTop: 2 }}>
              <CardBody>
                <AddressText
                  data={a}
                  enableEdit
                  enableDelete
                  handleEditClick={addressId => {
                    setEditAddressId(addressId);
                    setToggleEditAddress(true);
                  }}
                  onSuccessDeleteAddress={(addressId) => handleSuccessDeleteAddress(addressId)}
                />
              </CardBody>
            </Card>
          </GridItem>

        ))}
      </GridContainer>

    );
  };

  return (
    <div style={{ padding: 30 }}>
      <Typography variant="h5" style={{ textAlign: 'center' }}>Saved Addresses</Typography>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="caption">Save all your addresses for a faster checkout experience.</Typography>
      </div>
      <br />

      <AddressList />

      {toggleEditAddress && (
        <SectionAddressForm
          addressId={editAddressId}
          edit
          onSuccessUpdateAddress={handleSuccessUpdateAddress}
          onCloseModal={() => setToggleEditAddress(false)}
        />
      )}

      {toggleAddAddress && (
        <SectionAddressForm
          onSuccessAddAddress={addressApi =>
            handleSuccessAddAddress(addressApi)
          }
          onCloseModal={() => setToggleAddAddress(false)}
        />
      )}
    </div>);


}

SectionAddresses.propTypes = {
  successAlert: PropTypes.func.isRequired,
  errorAlert: PropTypes.func.isRequired
};
