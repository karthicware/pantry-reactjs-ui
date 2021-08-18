import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import axios from "axios";

// core components
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
import HeaderLinks from "components/Header/HeaderLinks.js";

// @material-ui/core components
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import { FormLabel } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

// @material-ui/icons
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Favorite from "@material-ui/icons/Favorite";
import DescriptionOutlined from "@material-ui/icons/DescriptionOutlined";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import CheckIcon from "@material-ui/icons/Check";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListAltOutlined from "@material-ui/icons/ListAltOutlined";
import LocalShippingOutlined from "@material-ui/icons/LocalShippingOutlined";

// sections for this page
import FooterPage from "pages-sections/FooterPage/FooterPage.js";
import SectionMenu from "pages-sections/FooterPage/Sections/SectionMenu.js";

import { roseColor } from "assets/jss/material-kit-pro-react.js";
import { AppContext } from "AppContext.js";

const styles = {
  bgWhite: {
    background: "#FFF"
  }
};

const useStyles = makeStyles(styles);

export default function TermsAndConditionsPage() {
  const classes = useStyles();

  return (
    <div>
      <Header
        color="dark"
        brand="Nammanuts"
        links={<HeaderLinks dropdownHoverColor="info" />}
      />

      <div className={classNames(classes.main, classes.bgWhite)}>
        <GridContainer>
          <GridItem
            md={10}
            style={{ margin: "0 auto", paddingTop: 20, paddingBottom: 20 }}
          >
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Link color="inherit" href="/">
                <small>Home</small>
              </Link>
              <small>Shipping & Delivery</small>
            </Breadcrumbs>
            <GridContainer>
              <GridItem md={3}>
                <SectionMenu active="SHIPPING_DELIVERY" />
              </GridItem>

              <GridItem md={9}>
                <Typography variant="h5">Shipping & Delivery</Typography><br />
                <p>
                We use several logistic partners for our shipments. We ship only domestic for now, shipping inside tamilnadu is free and
                cost of the shipping to other state is flat Rs.99 which will be shown in the cart during checkout. Normal shipping estimate for all domestic shipments are between 2 to 7 business days, 
                delays might occur in some unavoidable situation which we are definitely trying to mitigate.
                </p>
                <p>Delivery in Chennai and Bangalore – 2 days</p>
                <p>Delivery within TamilNadu: 3 days</p>
                <p>All Over India delivery 5 – 7 days excluding week ends</p>
                <p>Delivery time period mentioned are excluding Sundays and public holidays.</p>
                <br />
                <p><b>Are you curious to know what packing materials we use?</b></p>
                <p>We use recommended and healthy packaging materials to pack the products in order to ensure that you get it in the best consumable condition.</p>
                <p>All materials used are as per the guidelines of the food regulatory authorities of Tamil Nadu.</p>
                <br/>
                <p><b>Want if you receive product broken or later than 7 days ?</b></p>
                <p>We strive to deliver products at their best conditions at your hand. But just to make you confident we say this, if you receive the product in a broken stage or after 7 days shipment time we offer you either refund or we will send the products again on your choice. So no panic and no need to worry just order the product and relax yourself we take the ownership of delivering the product at your hands in their best condition and quality.</p>
                <br/>
                <p><b>Shipment</b></p>
                <p>
                  <li>Once the product is shipped you can able to track the package in nammanuts.com itself. Go to Profile -> Orders menu
                   where you can find your all orders with current status. There use 'Track' button on the order you want to track the status.
                   </li>
                   <li>In case of remote places courier people might call you to come and collect the package so expect this.</li>
                   <li>If the product is out of the packing when you receive please send us a picture and do not consume it. We will send you another package.</li>
                   <li>Because of varied climate conditions and the way it is handled during shipping there is a chance that product may become bad when you are receiving. In such case please do not consume the product and send us a communication we will refund you for the product and send you another package. There is very less chances of this happening but still we would like to keep you educated.</li>
                   </p>

              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
        <FooterPage id="footer" />
      </div>
    </div>
  );
}
