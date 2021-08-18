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

export default function PrivacyPolicyPage() {
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
              <small>Privacy Policy</small>
            </Breadcrumbs>
            <GridContainer>
              <GridItem md={3}>
                <SectionMenu active="PRIVACY_POLICY" />
              </GridItem>

              <GridItem md={9}>
                <Typography variant="h5">Privacy Policy</Typography><br />
                <p>
                This privacy policy sets out how “NammaNuts.com” uses and protects any information that you give NammaNuts.com when you use this website.
                </p>
                <p>
                “NammaNuts.com” is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.
                </p>
                <p>
                “NammaNuts.com” may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.</p>
                <p>Apart from this, we do not collect any other information about visitors. The information we collect, if any, is not shared with other organizations for commercial purposes.</p>
                <p>
                  <b>Security</b></p>
                <p>
                We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
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
