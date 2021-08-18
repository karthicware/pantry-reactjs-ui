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
import SectionMenu from "pages-sections/FooterPage/Sections/SectionMenu.js";
import FooterPage from "pages-sections/FooterPage/FooterPage.js";

import { roseColor } from "assets/jss/material-kit-pro-react.js";

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
              <small>Returns & Refunds</small>
            </Breadcrumbs>
            <GridContainer>
              <GridItem md={3}>
                <SectionMenu active="RETURNS_REFUNDS" />
              </GridItem>

              <GridItem md={9}>
                <Typography variant="h5">Returns & Refunds</Typography><br />
                <p><b>Returns Policy</b></p>
                <p>
                We take great care in ensuring the quality of every order dispatched from our end. We care for you and that is why, right from sorting, grading, processing, roasting and packaging, everything is done with great care and attention, following stringent quality checks.
                </p>
                <p>
                If you are not 100% satisfied with your purchase or receive any damaged or spoilt goods, please report the same to us. We will replace your products with immediate effect.
                </p>
                <p>
                You can call us on +91-9876543210 or drop a mail to care@nammanuts.com
                </p>
                <p>
                We will require your order ID, images of the damaged product, and the batch number. Please ensure that the return items are in their original packaging. Returns will only be done within 48 hours of receiving the order
                </p>
                <p>
                  Without limiting any of those representations or warranties,
                  Sacred Weaves has the right (though not the obligation) to, in
                  Sacred Weaves's sole discretion (i) refuse or remove any
                  content that, in Sacred Weaves's reasonable opinion, violates
                  any Sacred Weaves policy or is in any way harmful or
                  objectionable, or (ii) terminate or deny access to and use of
                  the Website to any individual or entity for any reason, in
                  Sacred Weaves's sole discretion. Sacred Weaves will have no
                  obligation to provide a refund of any amounts previously paid.
                </p>
                <p>
                  <b>Need a specific carrier?</b>
                </p>
                <p>If you need to ship via a specific carrier, call us and we will try to help. There may be an extra charge to use a specific carrier.</p>
                <br/>
                  <Typography variant="h6">Cancellation Policy</Typography>
                <br/>
                <p>Your order can be cancelled before it dispatched. Your order cannot be cancel after it is dispatched.</p>
                <p>
                  <b>How can I cancel my order?</b>
                </p>
                <p>
                If ever you decide to change your mind, simply log on to your account and cancel your order the same day. In any other case, please drop a mail care@nammanuts.com we’ll assist you right away! Please note: Orders which are pending for shipping can be cancelled. The refund will be processed with in 7 working days
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
