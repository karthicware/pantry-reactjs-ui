import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { FormLabel, Typography } from "@material-ui/core";
import MuiButton from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

//icons
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import CheckIcon from "@material-ui/icons/Check";

//custom components
import Muted from "components/Typography/Muted.js";
import {
  cardTitle,
  warningColor,
  dangerColor,
} from "assets/jss/material-kit-pro-react.js";
import { handleError } from "utils/util.js";

const styles = {
  addressText: {
    textTransform: "capitalize",
  },
  changeAddressBtn: {
    color: warningColor[0],
    borderColor: warningColor[0],
    "&:hover": {
      backgroundColor: warningColor[4],
      borderColor: warningColor[0],
    },
  },
  checkIcon: {},
};
const useStyles = makeStyles(styles);
function AddressText(props) {
  const { data, enableEdit, enableDelete, handleEditClick } = props;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [deleteAddressId, setDeleteAddressId] = React.useState(null);

  const handleDeleteClick = (addressId) => (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
    setDeleteAddressId(addressId);
  };

  const handleNoClick = () => {
    setAnchorEl(null);
    setOpen(false);
    setDeleteAddressId(null);
  };

  const handleYesClick = () => {
    axios
      .delete(`/api/v1/customer/shipping-address/${deleteAddressId}`)
      .then((resp) => {
        props.onSuccessDeleteAddress(deleteAddressId);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleClickAway = () => {
    handleNoClick();
  };

  const DeleteConfirmationPopper = () => {
    return (
      <Popper
        placement="bottom"
        open={open}
        anchorEl={anchorEl}
        disablePortal={false}
        modifiers={{
          flip: {
            enabled: true,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: "scrollParent",
          },
          arrow: {
            enabled: false,
            element: null,
          },
        }}
      >
        <Paper style={{ padding: 20 }}>
          <Typography variant="h6">Delete Confirmation</Typography>
          <Typography variant="body2" style={{ padding: 10 }}>
            Are you sure want to delete ?
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <MuiButton
              variant="outlined"
              style={{ marginRight: 10 }}
              onClick={handleYesClick}
            >
              Yes
            </MuiButton>
            <MuiButton variant="outlined" onClick={handleNoClick}>
              No
            </MuiButton>
          </div>
        </Paper>
      </Popper>
    );
  };

  const ShippingAddressCheckbox = ({ addressId, isDefaultAddress }) => {
    const handleChange = addressId => {
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
          onChange={e => handleChange(addressId)}
        />{" "}
        Make this your default shiping address
      </Typography>
    );
  };

  return (
    <div className={classes.addressText}>
      <CheckIcon
        class="checkIcon"
        style={{
          position: "absolute",
          top: 2,
          left: 2,
          width: 16,
          fontSize: 16,
          color: warningColor[0],
          display: "none",
        }}
      />
      <div
        style={{
          marginBottom: 5,
          alignItems: "flex-end",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingTop: 6,
            paddingBottom: 6,
          }}
        >
          <Typography variant="subtitle2">{data.name}</Typography>
          <Chip
            label={data.addressTypeDesc}
            size="small"
            variant="outlined"
            style={{ fontSize: 10, marginLeft: 20 }}
          />
        </div>
        {enableEdit && (
          <MuiButton
            id="btn_edit"
            color="primary"
            style={{ color: warningColor[0] }}
            onClick={() => handleEditClick(data.id)}
          >
            <EditRoundedIcon style={{ fontSize: 14, color: warningColor[0] }} />{" "}
            Edit
          </MuiButton>
        )}
      </div>
      <Typography variant="body2">{data.houseNo}</Typography>
      <Typography variant="body2">{data.address}</Typography>
      <Typography variant="body2">
        {data.city + ", " + data.state + " - " + data.pincode}
      </Typography>
      <Typography variant="body2">+91-{data.mobile}</Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          {data.defaultAddress && (
            <Typography variant="caption" color="primary">
              Default Address
            </Typography>
          )}
        </div>
        {enableDelete && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <div>
              <MuiButton
                style={{ color: "#999" }}
                onClick={handleDeleteClick(data.id)}
              >
                <DeleteForeverRoundedIcon style={{ fontSize: 14 }} /> Delete
              </MuiButton>
              <DeleteConfirmationPopper />
            </div>
          </ClickAwayListener>
        )}
      </div>
    </div>
  );
}

AddressText.propTypes = {
  data: PropTypes.object.isRequired,
  enableEdit: PropTypes.bool,
  enableDelete: PropTypes.bool,
  handleEditClick: PropTypes.func,
  onSuccessDeleteAddress: PropTypes.func,
};

export default AddressText;
