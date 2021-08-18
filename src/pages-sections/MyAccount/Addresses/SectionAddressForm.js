import React from 'react';
import PropTypes from "prop-types";
import clsx from 'clsx';
import axios from "axios";
import MaskedInput from 'react-text-mask';

//core components
import { makeStyles } from "@material-ui/core/styles";
import { FormLabel } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MuiButton from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// custom components
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
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";

// @material-ui/icons
import AddLocationRoundedIcon from "@material-ui/icons/AddLocationRounded";
import EditLocationRoundedIcon from "@material-ui/icons/EditLocationRounded";
import IconCheck from "@material-ui/icons/Check";
import IconClose from "@material-ui/icons/Close";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Check from "@material-ui/icons/Check";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

import { handleError } from "utils/util.js";
import customCheckboxRadioSwitchStyle from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.js";

const useStyles = makeStyles({
  ...customCheckboxRadioSwitchStyle,
  bottomControls: {
    position: 'sticky',
    zIndex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    marginTop: 120,
    textAlign: "center",
    //height: 70,
    display: 'flex',
    width: '100%'
  }
});

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      guide={false}
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default function SectionAddressForm(props) {
  const classes = useStyles();
  const [isDrawerOpen, setDrawerOpen] = React.useState(true);
  const [addressTypeList, setAddressTypeList] = React.useState([]);

  const [name, setName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [addressType, setAddressType] = React.useState("");
  const [makeAsDefaultAddress, setMakeAsDefaultAddress] = React.useState(false);

  const [nameErrMsg, setNameErrMsg] = React.useState(null);
  const [mobileErrMsg, setMobileErrMsg] = React.useState(null);
  const [addressErrMsg, setAddressErrMsg] = React.useState(null);
  const [cityErrMsg, setCityErrMsg] = React.useState(null);
  const [stateErrMsg, setStateErrMsg] = React.useState(null);
  const [pincodeErrMsg, setPincodeErrMsg] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`/api/v1/kv/get-all-by-type?groupId=ADDRESS_TYPE`)
      .then(resp => {
        if (resp.data) {
          setAddressTypeList(resp.data);
          if (!props.edit)
            setAddressType(resp.data[0].id);
        }
      })
      .catch(error => {
        console.log(error);
      });
    return function cleanup() { };
  }, []);

  React.useEffect(() => {
    if (props.edit) {
      axios
        .get(`/api/v1/customer/shipping-address/${props.addressId}`)
        .then(resp => {
          const address = resp.data.result.address;
          setName(address.name);
          setMobile(address.mobile);
          setAddress(address.address);
          setCity(address.city);
          setState(address.state);
          setPincode(address.pincode);
          setAddressType(address.addressType);
          setMakeAsDefaultAddress(address.makeAsDefaultAddress);
        })
        .catch(error => {
          handleError(error);
        });
    }
  }, [props.edit, props.addressId]);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerOpen(open);
    props.onCloseModal();
  };

  const clear = () => {
    //clear error messages
    setNameErrMsg(null);
    setMobileErrMsg(null);
    setAddressErrMsg(null);
    setCityErrMsg(null);
    setStateErrMsg(null);
    setPincodeErrMsg(null);

    //clear form params
    setName("");
    setMobile("");
    setAddress("");
    setCity("");
    setState("");
    setPincode("");
    setAddressType("");
    setMakeAsDefaultAddress(false);
  };

  const validateName = val => {
    if (!val || val.length < 3) {
      setNameErrMsg("Invalid Name");
      return false;
    }
    setNameErrMsg(null);
    return true;
  };
  const validateMobile = val => {
    if (!val || val.length < 10) {
      setMobileErrMsg("Invalid Mobile");
      return false;
    }
    setMobileErrMsg(null);
    return true;
  };
  const validateAddress = val => {
    if (!val || val.length < 3) {
      setAddressErrMsg("Required");
      return false;
    }
    setAddressErrMsg(null);
    return true;
  };
  const validateCity = val => {
    if (!val || val.length < 3) {
      setCityErrMsg("Invalid City");
      return false;
    }
    setCityErrMsg(null);
    return true;
  };
  const validateState = val => {
    if (!val || val.length < 3) {
      setStateErrMsg("Invalid State");
      return false;
    }
    setStateErrMsg(null);
    return true;
  };
  const validatePincode = val => {
    if (!val || val.length < 6 || isNaN(val)) {
      setPincodeErrMsg("Invalid Pincode");
      return false;
    }
    setPincodeErrMsg(null);
    return true;
  };

  const submit = () => {
    let isValid = true;
    if (!validateName(name)) isValid = false;
    if (!validateMobile(mobile)) isValid = false;
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
          address,
          city,
          state,
          pincode,
          addressType,
          defaultAddress: makeAsDefaultAddress
        })
        .then(resp => {
          props.onSuccessUpdateAddress(resp.data.result);
          clear();
        })
        .catch(error => {
          handleError(error);
        });
    } else {
      axios
        .post(`/api/v1/customer/shipping-address`, {
          name,
          mobile,
          address,
          city,
          state,
          pincode,
          addressType,
          defaultAddress: makeAsDefaultAddress
        })
        .then(resp => {
          props.onSuccessAddAddress(resp.data.result);
          clear();
        })
        .catch(error => {
          handleError(error);
        });
    }
  };

  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <GridContainer style={{ width: 400, margin: 0 }}>
          <GridItem>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
              {props.edit ? <Typography variant="h6">
                <EditLocationRoundedIcon style={{ marginBottom: -5, marginRight: 5 }} />
                Edit Address
              </Typography>
                :
                <Typography variant="h6">
                  <AddLocationRoundedIcon style={{ marginBottom: -5, marginRight: 5 }} />
              Add New Address
            </Typography>}

              <IconButton aria-label="delete" onClick={() => {
                clear();
                props.onCloseModal();
              }}>
                <CloseRoundedIcon />
              </IconButton>
            </div>
          </GridItem>
          <GridItem md={12}>
            <CustomInput
              labelText="Name *"
              formControlProps={{
                fullWidth: true
              }}
              autoFocus
              inputProps={{
                value: name,
                onChange: e => {
                  setName(e.target.value);
                  validateName(e.target.value);
                },
                error: nameErrMsg ? true : false,
              }}
              helperText="test"
              error={nameErrMsg ? true : false}
            />
            {nameErrMsg && <Danger>{nameErrMsg}</Danger>}
          </GridItem>

          <GridItem md={12}>
            <CustomInput
              labelText="Mobile *"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: mobile,
                onChange: e => {
                  setMobile(e.target.value);
                  validateMobile(e.target.value);
                },
                error: mobileErrMsg ? true : false,
                minLength: 10,
                maxLength: 10,
              }}
              helperText="test"
              error={mobileErrMsg ? true : false}
              startAdornment={<InputAdornment position="start">+91 - </InputAdornment>}
              inputComponent={TextMaskCustom}
            />
            {mobileErrMsg && <Danger>{mobileErrMsg}</Danger>}
          </GridItem>

          <GridItem md={12}>
            <CustomInput
              labelText="Address (Flat, House No., Building, Street, Area) *"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: address,
                onChange: e => {
                  setAddress(e.target.value);
                  validateAddress(e.target.value);
                },
                error: addressErrMsg ? true : false
              }}
              helperText="test"
              error={addressErrMsg ? true : false}
            />
            {addressErrMsg && <Danger>{addressErrMsg}</Danger>}
          </GridItem>

          <GridItem md={12}>
            <CustomInput
              labelText="Town/City *"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: city,
                onChange: e => {
                  setCity(e.target.value);
                  validateCity(e.target.value);
                },
                error: cityErrMsg ? true : false
              }}
              helperText="test"
              error={cityErrMsg ? true : false}
            />
            {cityErrMsg && <Danger>{cityErrMsg}</Danger>}
          </GridItem>

          <GridItem md={12}>
            <CustomInput
              labelText="State *"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: state,
                onChange: e => {
                  setState(e.target.value);
                  validateState(e.target.value);
                },
                error: stateErrMsg ? true : false
              }}
              helperText="test"
              error={stateErrMsg ? true : false}
            />
            {stateErrMsg && <Danger>{stateErrMsg}</Danger>}
          </GridItem>

          <GridItem md={12}>
            <CustomInput
              labelText="Pincode *"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: pincode,
                onChange: e => {
                  setPincode(e.target.value);
                  validatePincode(e.target.value);
                },
                error: pincodeErrMsg ? true : false,
                minLength: 6,
                maxLength: 6
              }}
              helperText="test"
              error={pincodeErrMsg ? true : false}
            />
            {pincodeErrMsg && <Danger>{pincodeErrMsg}</Danger>}
          </GridItem>

          <GridItem md={12}>
            <Typography variant="body1" style={{ paddingTop: 20, paddingBottom: 20 }}>Address Type</Typography>
            <div
              className={
                classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal
              }
            >
              {addressTypeList.map(type => (
                <FormControlLabel
                  key={type.id}
                  control={
                    <Radio
                      checked={addressType === type.id}
                      onChange={() => setAddressType(type.id)}
                      value={type.id}
                      name="addressType"
                      aria-label={type.id}
                      icon={<FiberManualRecord className={classes.radioUnchecked} />}
                      checkedIcon={
                        <FiberManualRecord className={classes.radioChecked} />
                      }
                      classes={{
                        checked: classes.radio,
                        root: classes.radioRoot
                      }}
                    />
                  }
                  classes={{
                    label: classes.label
                  }}
                  label={type.text}
                />
              ))}
            </div>
          </GridItem>

          <GridItem md={12} style={{ marginTop: 20 }}>
            <div
              className={
                classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal
              }
            >
              <FormControlLabel
                control={
                  <Checkbox
                    onClick={(e) => setMakeAsDefaultAddress(e.target.checked)}
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{
                      checked: classes.checked,
                      root: classes.checkRoot
                    }}
                    checked={makeAsDefaultAddress}
                  />
                }
                classes={{ label: classes.label }}
                label="Make as default address"
              />
            </div>
          </GridItem>

        </GridContainer>
        <div className={classes.bottomControls}>
          <Button block onClick={() => submit()} color="warning">
            <IconCheck />
            Save
          </Button>
          {props.clear ? (
            <Button block onClick={() => clear()} >
              <IconClose />
              Clear
            </Button>
          ) : (
              <Button
                block
                onClick={() => {
                  clear();
                  props.onCloseModal();
                }}
              >
                <IconClose />
              Cancel
              </Button>
            )}
        </div>
      </SwipeableDrawer>
    </div>
  );
}

SectionAddressForm.propTypes = {
  edit: PropTypes.bool,
  addressId: PropTypes.number,
  onSuccessAddAddress: PropTypes.func,
  onSuccessUpdateAddress: PropTypes.func,
  cancel: PropTypes.func,
  clear: PropTypes.bool,
};