import React from "react";
// nodejs library that concatenates classes
import PropTypes from "prop-types";
import classNames from "classnames";
import axios from "axios";
// core components
import { makeStyles } from "@material-ui/core/styles";
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
import { FormLabel } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import IconCheck from "@material-ui/icons/Check";
import IconClose from "@material-ui/icons/Close";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";

import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.js";
import { handleError } from "utils/util.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(modalStyle);

export default function SectionEditProfile(props) {
  const classes = useStyles();

  const [fullName, setFullName] = React.useState(props.fullName);
  const [mobile, setMobile] = React.useState(props.mobile);

  const [fullNameErrMsg, setFullNameErrMsg] = React.useState(null);
  const [mobileErrMsg, setMobileErrMsg] = React.useState(null);

  const [isModalOpen, setModalOpen] = React.useState(true);

  const validateFullName = val => {
    if (!val || val.length < 3) {
      setFullNameErrMsg("Invalid Full Name");
      return false;
    }
    setFullNameErrMsg(null);
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

  const closeModal = () => {
    setModalOpen(false);
    props.onCloseModal();
  };

  const submit = () => {
    let isValid = true;
    if (!validateFullName(fullName)) isValid = false;
    if (!validateMobile(mobile)) isValid = false;
    if (!isValid) return false;
    axios
      .put(`/api/v1/customer/?fullName=${fullName}&mobile=${mobile}`)
      .then(resp => {
        props.onSuccessUpdateProfile(resp.data.result);
        closeModal();
      })
      .catch(error => {
        handleError(error);
      });
  };

  React.useEffect(() => {
    axios
      .get(`/api/v1/customer/`)
      .then(resp => {
        setFullName(resp.data.fullName);
        setMobile(resp.data.mobile);
      })
      .catch(error => {
        handleError(error);
      });
  }, []);

  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: classes.modal
      }}
      open={isModalOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => closeModal()}
      aria-labelledby="classic-modal-slide-title"
      aria-describedby="classic-modal-slide-description"
    >
      <DialogTitle
        id="classic-modal-slide-title"
        disableTypography
        className={classes.modalHeader}
      >
        <Button
          simple
          className={classes.modalCloseButton}
          key="close"
          aria-label="Close"
          onClick={() => closeModal()}
        >
          {" "}
          <Close className={classes.modalClose} />
        </Button>
        <h4 className={classes.modalTitle}>Edit Profile</h4>
      </DialogTitle>
      <DialogContent
        id="classic-modal-slide-description"
        className={classes.modalBody}
      >
        <GridContainer>
          <GridItem md={12}>
            <CustomInput
              labelText="Full Name *"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: fullName,
                onChange: e => {
                  setFullName(e.target.value);
                  validateFullName(e.target.value);
                },
                error: fullNameErrMsg ? true : false
              }}
              helperText="test"
              error={fullNameErrMsg ? true : false}
            />
            {fullNameErrMsg && <Danger>{fullNameErrMsg}</Danger>}
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
                error: fullNameErrMsg ? true : false
              }}
              helperText="test"
              error={mobileErrMsg ? true : false}
            />
            {mobileErrMsg && <Danger>{mobileErrMsg}</Danger>}
          </GridItem>
        </GridContainer>
      </DialogContent>
      <DialogActions className={classes.modalFooter}>
        <div style={{ flexGrow: 1, textAlign: "center" }}>
          <Button
            size="sm"
            variant="outlined"
            onClick={() => submit()}
            style={{ margin: 15 }}
          >
            <IconCheck /> Submit
          </Button>
          <Button onClick={() => closeModal()} size="sm" variant="outlined">
            <IconClose /> Close
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

SectionEditProfile.propTypes = {
  fullName: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onSuccessUpdateProfile: PropTypes.func.isRequired
};
