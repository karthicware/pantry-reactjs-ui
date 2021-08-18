import React from "react";
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
// @material-ui/core components
import { withStyles, makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui icons
import Lock from "@material-ui/icons/Lock";
import Security from "@material-ui/icons/Security";
import Payment from "@material-ui/icons/Payment";

import featuresStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/featuresStyle.js";
import { Typography } from "@material-ui/core";

const styles = {
  ...featuresStyle,
  features1: {
    ...featuresStyle.features1,
    padding: 0
  },
  infoArea: {
    paddingTop: 0
  }
};

function SectionTrustUs({ classes, ...rest }) {
  return (
    <div className="cd-section" {...rest} style={{marginBottom: 40}}>
      <div className={classes.container}>
        {/* Feature 1 START */}
        <div className={classes.features1}>
          <GridContainer>
            <GridItem xs={6} sm={3} md={3}>
              <InfoArea
                vertical
                icon={Security}
                title="COD Available"
                description={<Typography variant="body1">In Selected Areas</Typography>}
                iconColor="warning"
                className={classes.infoArea}
              />
            </GridItem>
            <GridItem xs={6} sm={3} md={3}>
              <InfoArea
                vertical
                icon={Security}
                title="Quality Assured"
                description={<Typography variant="body1">100% Original</Typography>}
                iconColor="warning"
                className={classes.infoArea}
              />
            </GridItem>
            <GridItem xs={6} sm={3} md={3}>
              <InfoArea
                vertical
                icon={Payment}
                title="Free Delivery"
                description={<Typography variant="body1">Free delivery above Rs.999</Typography>}
                iconColor="warning"
                className={classes.infoArea}
              />
            </GridItem>
            <GridItem xs={6} sm={3} md={3}>
              <InfoArea
                vertical
                icon={Lock}
                title="Safe & Secure Payment"
                description={<Typography variant="body1">Through SSL Gateway</Typography>}
                iconColor="warning"
                className={classes.infoArea}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

SectionTrustUs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SectionTrustUs);
