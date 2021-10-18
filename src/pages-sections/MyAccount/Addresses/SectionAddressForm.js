import React from "react";
// nodejs library that concatenates classes
import PropTypes from "prop-types";
import classNames from "classnames";
import axios from "axios";

// core components
import { makeStyles } from "@material-ui/core/styles";
import MuiButton from "@material-ui/core/Button";
import { FormLabel, Typography } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Alert from "@material-ui/lab/Alert";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

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
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import IconCheck from "@material-ui/icons/Check";
import IconClose from "@material-ui/icons/Close";

// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";

import { handleError } from "utils/util.js";

export default function SectionAddressForm(props) {
  const [name, setName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [houseNo, setHouseNo] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [pincode, setPincode] = React.useState("");

  const [nameErrMsg, setNameErrMsg] = React.useState(null);
  const [mobileErrMsg, setMobileErrMsg] = React.useState(null);
  const [houseNoErrMsg, setHouseNoErrMsg] = React.useState(null);
  const [addressErrMsg, setAddressErrMsg] = React.useState(null);
  const [cityErrMsg, setCityErrMsg] = React.useState(null);
  const [stateErrMsg, setStateErrMsg] = React.useState(null);
  const [pincodeErrMsg, setPincodeErrMsg] = React.useState(null);

  const [errMsg, setErrMsg] = React.useState(null);

  const clear = () => {
    //clear error messages
    setNameErrMsg(null);
    setMobileErrMsg(null);
    setHouseNoErrMsg(null);
    setAddressErrMsg(null);
    setCityErrMsg(null);
    setStateErrMsg(null);
    setPincodeErrMsg(null);

    //clear form params
    setName("");
    setMobile("");
    setHouseNoErrMsg("");
    setAddress("");
    setCity("");
    setState("");
    setPincode("");

    //clear common err msg
    setErrMsg(null);
  };

  const validateName = (val) => {
    if (!val) {
      setNameErrMsg("Please Enter Name");
      return false;
    }
    setNameErrMsg(null);
    return true;
  };
  const validateMobile = (val) => {
    if (!val) {
      setMobileErrMsg("Please Enter Mobile");
      return false;
    }
    if (val.length < 10) {
      setMobileErrMsg("Please Enter Valid Mobile No");
      return false;
    }
    setMobileErrMsg(null);
    return true;
  };
  const validateHouseNo = (val) => {
    if (!val) {
      setHouseNoErrMsg("Please Enter Flat/House No./ Building");
      return false;
    }
    setHouseNoErrMsg(null);
    return true;
  };
  const validateAddress = (val) => {
    if (!val) {
      setAddressErrMsg("Please Enter Address");
      return false;
    }
    if (val.length < 7) {
      setAddressErrMsg(
        "Address details insufficient to attempt delivery. Please add more details."
      );
      return false;
    }
    setAddressErrMsg(null);
    return true;
  };
  const validateCity = (val) => {
    if (!val) {
      setCityErrMsg("Please Enter City");
      return false;
    }
    if (val.length < 3) {
      setCityErrMsg("Invalid City");
      return false;
    }
    setCityErrMsg(null);
    return true;
  };
  const validateState = (val) => {
    if (!val) {
      setStateErrMsg("Please Enter State");
      return false;
    }
    if (val.length < 3) {
      setStateErrMsg("Invalid State");
      return false;
    }
    setStateErrMsg(null);
    return true;
  };
  const validatePincode = (val) => {
    if (!val) {
      setPincodeErrMsg("Please Enter Pincode");
      return false;
    }
    if (val.length < 6) {
      setPincodeErrMsg("Invalid Pincode");
      return false;
    }
    setPincodeErrMsg(null);
    return true;
  };

  const submit = () => {
    let isValid = true;
    setErrMsg(null);
    if (!validateName(name)) isValid = false;
    if (!validateMobile(mobile)) isValid = false;
    if (!validateHouseNo(houseNo)) isValid = false;
    if (!validateAddress(address)) isValid = false;
    if (!validateCity(city)) isValid = false;
    if (!validateState(state)) isValid = false;
    if (!validatePincode(pincode)) isValid = false;
    if (!isValid) return false;
    if (props.edit) {
      axios
        .put(`/api/v1/customer/shipping-address/${props.addressId}`, {
          name,
          mobile,
          houseNo,
          address,
          city,
          state,
          pincode,
        })
        .then((resp) => {
          props.onSuccess();
          props.onClose();
        })
        .catch((error) => {
          setErrMsg(handleError(error));
        });
    } else {
      axios
        .post(`/api/v1/customer/shipping-address`, {
          name,
          mobile,
          houseNo,
          address,
          city,
          state,
          pincode,
        })
        .then((resp) => {
          props.onSuccess();
          props.onClose();
        })
        .catch((error) => {
          setErrMsg(handleError(error));
        });
    }
  };

  React.useEffect(() => {
    if (props.edit) {
      axios
        .get(`/api/v1/customer/shipping-address/${props.addressId}`)
        .then((resp) => {
          setName(resp.data.result.name);
          setMobile(resp.data.result.mobile);
          setHouseNo(resp.data.result.houseNo);
          setAddress(resp.data.result.address);
          setCity(resp.data.result.city);
          setState(resp.data.result.state);
          setPincode(resp.data.result.pincode);
        })
        .catch((error) => {
          handleError(error);
        });
    }
  }, [props.edit, props.addressId]);

  return (
    <SwipeableDrawer anchor="right" open={true} onClose={() => props.onClose()}>
      <GridContainer style={{ width: 400, margin: 20 }}>
        {errMsg && (
          <GridItem md={12} style={{ marginTop: 10, marginBottom: 30 }}>
            <Alert severity="error">{errMsg}</Alert>
          </GridItem>
        )}
        <GridItem md={12}>
          <Typography variant="h6" style={{ marginBottom: 30 }}>
            {props.edit ? "Edit Address" : "Add Address"}
          </Typography>
        </GridItem>
        <GridItem md={12}>
          <CustomInput
            labelText="Name *"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: name,
              onChange: (e) => {
                setName(e.target.value);
                validateName(e.target.value);
              },
              error: nameErrMsg ? true : false,
            }}
            helperText="test"
            error={nameErrMsg ? true : false}
          />
          {nameErrMsg && (
            <Danger>
              <Typography variant="caption">{nameErrMsg}</Typography>
            </Danger>
          )}
        </GridItem>

        <GridItem md={12}>
          <CustomInput
            labelText="House No./ Flat / Building *"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: houseNo,
              onChange: (e) => {
                setHouseNo(e.target.value);
                validateHouseNo(e.target.value);
              },
              error: houseNoErrMsg ? true : false,
            }}
            helperText="test"
            error={houseNoErrMsg ? true : false}
          />
          {houseNoErrMsg && (
            <Danger>
              <Typography variant="caption">{houseNoErrMsg}</Typography>
            </Danger>
          )}
        </GridItem>

        <GridItem md={12}>
          <CustomInput
            labelText="Address (Street, Area, Colony) *"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: address,
              onChange: (e) => {
                setAddress(e.target.value);
                validateAddress(e.target.value);
              },
              error: addressErrMsg ? true : false,
            }}
            helperText="test"
            error={addressErrMsg ? true : false}
          />
          {addressErrMsg && (
            <Danger>
              <Typography variant="caption">{addressErrMsg}</Typography>
            </Danger>
          )}
        </GridItem>

        <GridItem md={12}>
          <CustomInput
            labelText="Pincode *"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: pincode,
              onChange: (e) => {
                setPincode(e.target.value);
                validatePincode(e.target.value);
              },
              type: "number",
              error: pincodeErrMsg ? true : false,
            }}
            helperText="test"
            error={pincodeErrMsg ? true : false}
          />
          {pincodeErrMsg && (
            <Danger>
              <Typography variant="caption">{pincodeErrMsg}</Typography>
            </Danger>
          )}
        </GridItem>

        <GridItem md={12}>
          <CustomInput
            labelText="Town/City *"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: city,
              onChange: (e) => {
                setCity(e.target.value);
                validateCity(e.target.value);
              },
              error: cityErrMsg ? true : false,
            }}
            helperText="test"
            error={cityErrMsg ? true : false}
          />
          {cityErrMsg && (
            <Danger>
              <Typography variant="caption">{cityErrMsg}</Typography>
            </Danger>
          )}
        </GridItem>

        <GridItem md={12}>
          <CustomInput
            labelText="State *"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: state,
              onChange: (e) => {
                setState(e.target.value);
                validateState(e.target.value);
              },
              error: stateErrMsg ? true : false,
            }}
            helperText="test"
            error={stateErrMsg ? true : false}
          />
          {stateErrMsg && (
            <Danger>
              <Typography variant="caption">{stateErrMsg}</Typography>
            </Danger>
          )}
        </GridItem>

        <GridItem md={12}>
          <CustomInput
            labelText="Mobile *"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: mobile,
              onChange: (e) => {
                setMobile(e.target.value);
                validateMobile(e.target.value);
              },
              type: "number",
              error: mobileErrMsg ? true : false,
            }}
            helperText="test"
            error={mobileErrMsg ? true : false}
          />
          {mobileErrMsg && (
            <Danger>
              <Typography variant="caption">{mobileErrMsg}</Typography>
            </Danger>
          )}
        </GridItem>

        <GridItem md>
          <div style={{ flexGrow: 1, textAlign: "center" }}>
            <Button
              size="sm"
              onClick={() => submit()}
              style={{ margin: 15 }}
              color="primary"
            >
              <IconCheck />{" "}
              <Typography variant="button" size="sm" style={{ color: "#FFF" }}>
                Save
              </Typography>
            </Button>

            <Button
              onClick={() => {
                //clear();
                props.onClose();
              }}
              size="sm"
            >
              <IconClose />
              <Typography variant="button" size="sm" style={{ color: "#FFF" }}>
                Cancel
              </Typography>
            </Button>
          </div>
        </GridItem>
      </GridContainer>
    </SwipeableDrawer>
  );
}

SectionAddressForm.propTypes = {
  edit: PropTypes.bool,
  addressId: PropTypes.number,
  onSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  // onSuccessAddAddress: PropTypes.func,
  // onSuccessUpdateAddress: PropTypes.func,
  // cancel: PropTypes.func
};
