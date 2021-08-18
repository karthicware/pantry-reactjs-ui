import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";

//core components
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepButton from "@material-ui/core/StepButton";
import Check from "@material-ui/icons/Check";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

//custom components
import { warningColor, successColor } from "assets/jss/material-kit-pro-react.js";

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)"
  },
  active: {
    "& $line": {
      borderColor: successColor[0],
    }
  },
  completed: {
    "& $line": {
      borderColor: successColor[0],
    }
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1
  }
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center"
  },
  active: {
    color: successColor[0],
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor"
  },
  completed: {
    color: successColor[0],
    zIndex: 1,
    fontSize: 18
  }
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function getSteps() {
  return ["Order Placed", "Packed", "Shipped", "Delivered"];
}

export default function TrackItem({ orderNo, orderItemId }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const [trackData, setTrackData] = React.useState([]);
  const steps = getSteps();

  React.useEffect(() => {
    axios
      .get(`/api/v1/my/order/${orderNo}/track/${orderItemId}`)
      .then(resp => {
        const data = resp.data.result;
        setTrackData([
          data.placedOn,
          data.packedOn,
          data.shippedOn,
          data.arrival
        ]);
        switch (data.status) {
          case "I":
            setActiveStep(1);
            break;
          case "P":
            setActiveStep(2);
            break;
          case "S":
            setActiveStep(3);
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((label, i) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>
              <StepButton
                optional={
                  <Typography variant="caption">{trackData[i]}</Typography>
                }
              >
                <Typography variant="caption">{label}</Typography>
              </StepButton>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

TrackItem.propTypes = {
  orderNo: PropTypes.string.isRequired,
  orderItemId: PropTypes.number.isRequired
};
