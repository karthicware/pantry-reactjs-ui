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

import SectionAddressForm from "pages-sections/MyAccount/Addresses/SectionAddressForm.js";
import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(modalStyle);

export default function SectionAddressDialog(props) {
  const classes = useStyles();
  const [isModalOpen, setModalOpen] = React.useState(true);

  const closeModal = () => {
    setModalOpen(false);
    props.onCloseModal();
  };

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
        <h4 className={classes.modalTitle}>
          {props.edit ? "Edit Address" : "Add Address"}
        </h4>
      </DialogTitle>
      <DialogContent
        id="classic-modal-slide-description"
        className={classes.modalBody}
      >
        <SectionAddressForm
          edit={props.edit}
          addressId={props.addressId}
          onSuccessAddAddress={addressApi => {
            props.onSuccessAddAddress(addressApi);
            closeModal();
          }}
          onSuccessUpdateAddress={addressApi => {
            closeModal();
            props.onSuccessUpdateAddress(addressApi);
          }}
          cancel={closeModal}
        />
      </DialogContent>
    </Dialog>
  );
}

SectionAddressDialog.propTypes = {
  edit: PropTypes.bool,
  addressId: PropTypes.string,
  onCloseModal: PropTypes.func.isRequired,
  onSuccessAddAddress: PropTypes.func,
  onSuccessUpdateAddress: PropTypes.func
};
