import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import OtpInput from "react-otp-input";
import BlockUi from "react-block-ui";
import axios from "axios";

//core components
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";

//Icons
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";

//custom components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomButton from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Danger from "components/Typography/Danger.js";
import { infoColor } from "assets/jss/material-kit-pro-react.js";

import { AppContext } from "AppContext.js";
import { handleError } from "utils/util.js";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" style={{ textTransform: "capitalize" }}>
        {children}
      </Typography>

      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={"\u2000"}
      guide={false}
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
  const context = React.useContext(AppContext);
  const [open, setOpen] = React.useState(true);
  const [mobile, setMobile] = React.useState("");
  const [otp, setOtp] = React.useState(null);
  const [formFlag, setFormFlag] = React.useState(1); //1=Register form, 2=OTP form
  const [token, setToken] = React.useState(null);
  const [otpInterval, setOtpInterval] = React.useState(59);
  const [blocking, setBlocking] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState(null);

  const handleClose = () => {
    setOpen(false);
    props.onCloseModal();
  };

  const onSubmitMobileNumber = async () => {
    setBlocking(true);
    setErrMsg(null);
    axios
      .post("/auth/loginOrSignup", {
        mobile,
      })
      .then((resp) => {
        if (resp.data.error) {
          setErrMsg(resp.data.error.messages[0]);
        } else {
          //show verify OTP page
          setFormFlag(2);
          setToken(resp.data.result.accessToken);
          setInterval(function () {
            if (otpInterval > 0) setOtpInterval(otpInterval - 1);
          }, 1000);
        }
      })
      .catch((err) => {
        if (err.response) setErrMsg(handleError(err));
      })
      .then(() => {
        setBlocking(false);
      });
  };

  const onSubmitOTP = async () => {
    setBlocking(true);
    if (!otp || otp.length < 4 || isNaN(otp)) {
      setErrMsg("Invalid OTP");
      setBlocking(false);
      return false;
    }
    axios
      .get(`/auth/submit-otp?otp=${otp}&t=${token}`)
      .then((resp) => {
        setBlocking(false);
        const result = resp.data.result;
        if (resp.data.error) {
          setErrMsg(resp.data.error.messages[0]);
        } else {
          context.login(result.accessToken, result.mobile, false);
          setOpen(false);
          props.onLoginSuccess();
        }
      })
      .catch((err) => {
        setBlocking(false);
        if (err.response) setErrMsg(handleError(err));
      });
  };

  const resendOTP = () => {
    setBlocking(true);
    axios
      .get(`/auth/resend-otp?t=${token}`)
      .then((resp) => {
        setBlocking(false);
        if (resp.data.error) {
          setErrMsg(resp.data.error.messages[0]);
        } else {
          setToken(resp.data.result.accessToken);
          setOtpInterval(59);
          setErrMsg(null);
          setOtp(null);
        }
      })
      .catch((err) => {
        setBlocking(false);
        if (err.response) setErrMsg(handleError(err));
      });
  };

  const onClickBackButton = () => {
    setErrMsg(null);
    setFormFlag(1);
    setMobile("");
    setOtp(null);
  };

  const registerForm = (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Login / Sign up
        <FormHelperText id="outlined-weight-helper-text">
          Enter your phone number to login or sign up
        </FormHelperText>
      </DialogTitle>
      <DialogContent dividers>
        <BlockUi tag="div" blocking={blocking}>
          <GridContainer style={{ textAlign: "center" }}>
            {errMsg && (
              <GridItem>
                <Alert severity="error">{errMsg}</Alert>
              </GridItem>
            )}
            <GridItem>
              <Typography gutterBottom style={{ marginTop: 40 }}>
                Enter Your Mobile Number
              </Typography>
              <FormControl variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-mobile"
                  autoFocus
                  onChange={(e) => setMobile(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">+91 - </InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "Mobile Number",
                  }}
                  inputComponent={TextMaskCustom}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <CustomButton
                onClick={onSubmitMobileNumber}
                disabled={mobile.length != 10}
                style={{ margin: 40, textTransform: "capitalize" }}
                color={mobile.length == 10 ? "primary" : "gray"}
              >
                Verify OTP
              </CustomButton>
            </GridItem>
            <GridItem>
              <FormHelperText id="outlined-weight-helper-text">
                By Signing In, I agree to{" "}
                <a style={{ color: infoColor[0] }}>Terms and Conditions.</a>
              </FormHelperText>
            </GridItem>
          </GridContainer>
        </BlockUi>
      </DialogContent>
    </Dialog>
  );

  const otpForm = (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Verify OTP
        <FormHelperText id="outlined-weight-helper-text">
          Enter the 4 digit OTP send to your mobile number
        </FormHelperText>
      </DialogTitle>
      <DialogContent dividers>
        <BlockUi tag="div" blocking={blocking}>
          <GridContainer style={{ textAlign: "center" }}>
            {errMsg && (
              <GridItem>
                <Alert severity="error">{errMsg}</Alert>
              </GridItem>
            )}
            <GridItem
              xs={12}
              sm={12}
              md={12}
              style={{ marginTop: 30, justifyContent: "center" }}
            >
              <Typography gutterBottom style={{ marginBottom: 40 }}>
                Enter OTP
              </Typography>
              <OtpInput
                onChange={(otp) => {
                  setOtp(otp);
                  setErrMsg(null);
                }}
                numInputs={4}
                separator={<span> - </span>}
                value={otp}
                shouldAutoFocus
                //isInputNum
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  margin: "0 1rem",
                  fontSize: "2rem",
                  borderRadius: 4,
                  border: "1px solid rgba(0,0,0,0.3)",
                }}
                containerStyle={{
                  justifyContent: "center",
                }}
              />
            </GridItem>
            <GridItem>
              <Typography variant="caption">
                {otpInterval >= 0 ? (
                  otpInterval + "s"
                ) : (
                  <Typography
                    variant="subtitle2"
                    style={{ cursor: "pointer" }}
                    onClick={() => resendOTP()}
                    color="primary"
                  >
                    Resend OTP
                  </Typography>
                )}
              </Typography>
            </GridItem>
            <GridItem>
              <CustomButton
                onClick={onSubmitOTP}
                disabled={!otp || otp.length != 4}
                style={{ margin: 40, textTransform: "capitalize" }}
                color="primary"
              >
                Verify
              </CustomButton>
            </GridItem>
            <GridItem style={{ textAlign: "left" }}>
              <CustomButton
                color="transparent"
                size="sm"
                onClick={onClickBackButton}
              >
                <ArrowBackIosRoundedIcon
                  style={{ color: "rgba(0, 0, 0, 0.54)" }}
                />{" "}
                Back
              </CustomButton>
            </GridItem>
          </GridContainer>
        </BlockUi>
      </DialogContent>
    </Dialog>
  );

  return <div>{formFlag === 1 ? registerForm : otpForm}</div>;
}
