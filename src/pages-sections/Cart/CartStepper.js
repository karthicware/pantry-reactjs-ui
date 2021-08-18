import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Link from "next/link";

//core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import StepConnector from "@material-ui/core/StepConnector";
import { StepIconProps } from "@material-ui/core/StepIcon";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from '@material-ui/core/Hidden';

//icons
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

//custom components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Info from "components/Typography/Info.js";
import { roseColor, warningColor, successColor } from "assets/jss/material-kit-pro-react.js";

const styles = makeStyles({
  origProdsLabel: { paddingRight: 2, marginRight: 2 },
  verticalDividerSmall: {
    display: "inline-block",
    borderRight: "2px solid #DDD",
    height: 10,
    marginLeft: 2,
    marginRight: 5,
    verticalAlign: "middle"
  }
});

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      // backgroundImage:
      //   'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      backgroundColor: warningColor[0],
    },
  },
  completed: {
    '& $line': {
      // backgroundImage:
      //   'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      backgroundColor: warningColor[0],
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 30,
    height: 30,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    // backgroundImage:
    //   'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    backgroundColor: warningColor[7],
    boxShadow: '0 2px 5px 0 rgba(0,0,0,.25)',
  },
  completed: {
    // backgroundImage:
    //   'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    backgroundColor: warningColor[7],
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <ShoppingBasketIcon style={{fontSize: 16}} />,
    2: <LocalShippingIcon style={{fontSize: 16}} />,
    //3: <AccountBalanceIcon style={{fontSize: 16}} />,
    3: <p style={{margin: 0, fontSize: 16}}>&#8377;</p>
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

function getSteps() {
  return ["Cart", "Delivery Details", "Payment"];
}

function CartStepper(props) {
  const classes = styles();
  const { activeStep } = props;
  const steps = getSteps();
  const protectionLogo = (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        justifyContent: "center",
      }}
    >
      <VerifiedUser style={{ fontSize: "3rem", color: successColor[6] }} />
      <div>
        <Typography variant="body2">100% Purchase Protection</Typography>
        <div>
          <Info className={classes.origProdsLabel}>
            <small>Original Products</small>
          </Info>
          <div className={classes.verticalDividerSmall}></div>
          <Info>
            <small>Secure Payments</small>
          </Info>
        </div>
      </div>
    </div>
  );
  return (
    <GridContainer
      style={{
        borderBottom: "1px solid #DDD",
        boxShadow: "0 2px 3px 0px rgba(0, 0, 0, 0.14)",
        backgroundColor: "#FFF",
        width: "100%",
        margin: 0
      }}
    >
      <GridItem md={3} sm={3}><Button className={classes.title} style={{marginRight: 60}}>
          <Link href="/">
            <a>
              <img style={{width: "80px"}} src="https://sarees-images-bucket.s3.ap-south-1.amazonaws.com/logo.PNG" />
            </a>
          </Link>
        </Button></GridItem>
      <GridItem md={6} sm={6}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
          style={{padding: 10}}
        >
          {steps.map(label => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                <Typography variant="body2">{label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </GridItem>
      <Hidden only={["sm", "xs"]}>
        <GridItem md={3}>{protectionLogo}</GridItem>
      </Hidden>
    </GridContainer>
  );
}

CartStepper.propTypes = {
  activeStep: PropTypes.number.isRequired
};

export default CartStepper;
