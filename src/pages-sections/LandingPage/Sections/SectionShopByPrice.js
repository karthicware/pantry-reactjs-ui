import React from "react";

//other components
import LazyLoad from "react-lazyload";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Weekend from "@material-ui/icons/Weekend";
import Home from "@material-ui/icons/Home";
import Business from "@material-ui/icons/Business";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import NavPills from "components/NavPills/NavPills.js";
import Success from "components/Typography/Success.js";
import Danger from "components/Typography/Danger.js";

import typographyStyle from "assets/jss/material-kit-pro-react/views/componentsSections/typographyStyle.js";
import projectsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/projectsStyle.js";
import { STATIC_IMG_BASE_URL } from "utils/constants.js";

const shopByPrice1 = `${STATIC_IMG_BASE_URL}/assets/img/landingpage/shop_by_price1.png`;
const shopByPrice2 = `${STATIC_IMG_BASE_URL}/assets/img/landingpage/shop_by_price2.png`;
const shopByPrice3 = `${STATIC_IMG_BASE_URL}/assets/img/landingpage/shop_by_price3.png`;
const shopByPrice4 = `${STATIC_IMG_BASE_URL}/assets/img/landingpage/shop_by_price4.png`;
const shopByPrice5 = `${STATIC_IMG_BASE_URL}/assets/img/landingpage/shop_by_price5.png`;
const shopByPrice6 = `${STATIC_IMG_BASE_URL}/assets/img/landingpage/shop_by_price6.png`;

const customStyle = theme => ({
  ...typographyStyle,
  title: {
    ...projectsStyle.title,
    textAlign: "center"
  },
  container: {
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10)
  }
});

const data = [
  shopByPrice1,
  shopByPrice2,
  shopByPrice3,
  shopByPrice4,
  shopByPrice5,
  shopByPrice6
];

const useStyles = makeStyles(customStyle);

export default function SectionShopByPrice({ ...rest }) {
  const classes = useStyles();
  return (
    <div className="cd-section" {...rest}>
      <div className={classes.container}>
        <h2 className={classes.title}>Shop by price</h2>
        <GridContainer>
          {data.map((img, i) => (
            <GridItem xs={12} sm={4} className={classes.marginLeft} key={i}>
              <LazyLoad once>
                <img
                  src={img}
                  alt="..."
                  className={
                    classes.imgRaised +
                    " " +
                    classes.imgRoundedCircle +
                    " " +
                    classes.imgFluid
                  }
                />
              </LazyLoad>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    </div>
  );
}
