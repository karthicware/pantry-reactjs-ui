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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Add from "@material-ui/icons/Add";
import DeleteForever from "@material-ui/icons/DeleteForever";
import Edit from "@material-ui/icons/Edit";

import { grayColor } from "assets/jss/material-kit-pro-react.js";
import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.js";
import customSelectStyle from "assets/jss/material-kit-pro-react/customSelectStyle.js";
import { handleError } from "utils/util.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const selectStyle = {
  ...customSelectStyle,
  labelRoot: {
    color: grayColor[12] + " !important",
    fontWeight: "400",
    fontSize: "14px"
  },
  select: {
    ...customSelectStyle.select,
    textTransform: "none",
    fontSize: 14
  }
};

const useStylesModal = makeStyles(modalStyle);
const useStylesSelect = makeStyles(selectStyle);

export default function ChooseCancelReason({
  orderNo,
  orderItemId,
  closeModal,
  successCancellation
}) {
  const classesModal = useStylesModal();
  const classesSelect = useStylesSelect();
  const [reasonCategories, setReasonCategories] = React.useState([]);
  const [cancelReasonCategory, setCancelReasonCategory] = React.useState("");
  const [cancelUserComment, setCancelUserComment] = React.useState("");
  const [showComment, setShowComment] = React.useState(false);
  const [isModalOpen, setModalOpen] = React.useState(true);

  const submit = () => {
    axios
      .put(`/api/v1/my/order/${orderNo}/cancel`, {
        orderItemId: orderItemId,
        cancelReasonCategory: cancelReasonCategory.substring(
          0,
          cancelReasonCategory.indexOf("~")
        ),
        cancelUserComment
      })
      .then(resp => {
        successCancellation(resp.data.result);
      })
      .catch(error => {
        handleError(error);
      });
  };

  React.useEffect(() => {
    axios
      .get("/api/v1/kv/get-all-by-type?groupId=CANCEL_REASON_CATG")
      .then(resp => {
        setReasonCategories(resp.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false);
    closeModal();
  };

  const handleCategoryChange = e => {
    setCancelReasonCategory(e.target.value);
    const label = e.target.value.substring(
      e.target.value.indexOf("~") + 1,
      e.target.value.length
    );
    if (label === "Others") setShowComment(true);
    else setShowComment(false);
  };

  return (
    <Dialog
      classes={{
        root: classesModal.modalRoot,
        paper: classesModal.modal
      }}
      open={isModalOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => handleCloseModal()}
      aria-labelledby="classic-modal-slide-title"
      aria-describedby="classic-modal-slide-description"
    >
      <DialogTitle
        id="classic-modal-slide-title"
        disableTypography
        className={classesModal.modalHeader}
      >
        <Button
          simple
          className={classesModal.modalCloseButton}
          key="close"
          aria-label="Close"
          onClick={() => handleCloseModal()}
        >
          {" "}
          <Close className={classesModal.modalClose} />
        </Button>
        <Typography variant="body1">Request for cancellation</Typography>
      </DialogTitle>
      <DialogContent
        id="classic-modal-slide-description"
        className={classesModal.modalBody}
      >
        <GridContainer>
          <GridItem md={12}>
            <FormControl fullWidth className={classesSelect.selectFormControl}>
              <InputLabel
                htmlFor="simple-select"
                className={classesSelect.labelRoot}
              >
                Reason for cancellation (optional)
              </InputLabel>
              <Select
                MenuProps={{
                  className: classesSelect.selectMenu
                }}
                classes={{
                  select: classesSelect.select
                }}
                value={cancelReasonCategory}
                onChange={handleCategoryChange}
                inputProps={{
                  name: "simpleSelect",
                  id: "simple-select"
                }}
              >
                <MenuItem
                  disabled
                  classes={{
                    root: classesSelect.selectMenuItem
                  }}
                >
                  Select reason
                </MenuItem>
                {reasonCategories.map(e => (
                  <MenuItem
                    key={e.value}
                    classes={{
                      root: classesSelect.selectMenuItem
                    }}
                    value={e.id + "~" + e.text}
                  >
                    {e.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          {showComment && (
            <GridItem md={12}>
              <CustomInput
                labelText="Enter your cancellation reason (optional)"
                id="float"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: cancelUserComment,
                  onChange: e => setCancelUserComment(e.target.value)
                }}
                helperText="test"
              />
            </GridItem>
          )}
          <GridItem md={12} style={{ textAlign: "center" }}>
            <Button
              color="danger"
              size="sm"
              onClick={() => submit()}
              style={{ marginRight: 20 }}
            >
              Confirm Cancel
            </Button>
            <Button size="sm" onClick={() => handleCloseModal()}>
              Close
            </Button>
          </GridItem>
        </GridContainer>
      </DialogContent>
    </Dialog>
  );
}

ChooseCancelReason.propTypes = {
  orderNo: PropTypes.string.isRequired,
  orderItemId: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
  successCancellation: PropTypes.func.isRequired
};
