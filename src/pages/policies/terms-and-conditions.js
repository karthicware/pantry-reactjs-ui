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
              <small>Terms & Conditions</small>
            </Breadcrumbs>
            <GridContainer>
              <GridItem md={3}>
                <SectionMenu active="TERMS_CONDITIONS" />
              </GridItem>

              <GridItem md={9}>
                <Typography variant="h5">Terms & Conditions</Typography><br />
                <p>
                  By subscribing to or using the services of nammanuts.com you agree that you have read, understood and are bound by the Terms, regardless of how you subscribe to or use the services. If you do not want to be bound by the Terms, you must not subscribe to or use our services. nammanuts.com and its authorised agents reserves the right to add, delete, alter or modify these terms and conditions at any time. Therefore the Users are advised to read these terms and conditions very carefully as your use of service is subject to your acceptance of and compliance with these terms and conditions.These terms and various other policies are binding as per the provisions of the Information Technology (Intermediaries guidelines) Rules, 2011 formulated under the Information Technology Act of 2000 and modified or amended from time to time.
                </p>
                <p>
                  Please read this Agreement carefully before accessing or using
                  the Website. By accessing or using any part of the web site,
                  you agree to become bound by the terms and conditions of this
                  agreement. If you do not agree to all the terms and conditions
                  of this agreement, then you may not access the Website or use
                  any services.
                </p>
                <p>
                  <b>Definition</b> "Agreement" means the terms and conditions as detailed herein including all schedules, appendices, annexures, Privacy Policy, Disclaimer and will include the references to this Agreement as amended, novated, supplemented, varied or replaced from time to time.
                </p>
                <p>
                "You"/ "User" shall mean the end user accessing the Website and application, its contents and using the services offered through the Website and application.
                </p>
                <p>
                "Customer"/"Buyer" shall mean the person or any legal entity who access the Website and application and places an order for and or purchases any products /services against the invitation of offer for sale of products / services on the Website and application.
                </p>
                <p>
                  "Acceptance" shall mean your affirmative action in clicking on "check box"™ and on the "continue button as provided on the registration page or clicking on
                                </p>
                <p>"Product" shall mean the Products offered for sale on the website and application from time to time</p>
                <p>"Delivery" shall mean the physical delivery of goods under your order placed with us</p>
                <p>"Price" means the price communicated at the time of order and confirmed by us</p>
                <p>"Payment Facility" shall mean applicable mode of payments made available to User from time to time.</p>
                <p>"Content" means all text, graphics, user interfaces, visual interfaces, photographs, trademarks, logos, sounds, music, artwork and computer code collectively By impliedly or expressly accepting this User Agreement, Policies and Terms, You also accept and agree to be bound by Rules, Policies and Terms of Reliance as provided from time to time in its Website and application and corresponding hyperlinks.</p>
                <p>
                  <b>USER'S LIABILITY:</b>
                </p>
                <p>
                <b>Eligibility:</b> Only persons eligible to enter into contracts with legal binding under Indian Contract Act, 1872 can use the Services. tredyfoods.com reserves the right to terminate your membership and refuse to provide you with access to the Services if it is brought to the notice or if it is discovered that you are under the age of 18 years.
                </p>
                <p>User agrees that neither Company nor its group companies, directors, officers or employee shall be liable for any direct or/and indirect or/and incidental or/and special or/and consequential or/and exemplary damages, resulting from the use or/and the inability to use the service or/and for cost of procurement of substitute goods or/and services or resulting from any goods or/and data or/and information or/and services purchased or/and obtained or/and messages received or/and transactions entered into through or/and from the service or/and resulting from unauthorized access to or/and alteration of user’s transmissions or/and data or/and arising from any other matter relating to the service, including but not limited to, damages for loss of profits or/and use or/and data or other intangible, even if Company has been advised of the possibility of such damages.</p>
                <p>User further agrees that Company shall not be liable for any damages arising from interruption, suspension or termination of service, including but not limited to direct or/and indirect or/and incidental or/and special consequential or/and exemplary damages, whether such interruption or/and suspension or/and termination was justified or not, negligent or intentional, inadvertent or advertent.</p>
                <p>User agrees that Company shall not be responsible or liable to user, or anyone, for the statements or conduct of any third party of the service. In sum, in no event shall Company’s total liability to the User for all damages or/and losses or/and causes of action exceed the amount paid by the User to Company, if any, that is related to the cause of action.</p>
                <p><b>DISCLAIMER OF CONSEQUENTIAL DAMAGES:</b></p>
                <p>In no event shall Company or any parties, organizations or entities associated with the corporate brand name us or otherwise, mentioned at this Website be liable for any damages whatsoever (including, without limitations, incidental and consequential damages, lost profits, or damage to computer hardware or loss of data information or business interruption) resulting from the use or inability to use the Website and the Website material, whether based on warranty, contract, tort, or any other legal theory, and whether or not, such organization or entities were advised of the possibility of such damages.</p>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
        <FooterPage id="footer" />
      </div>
    </div>
  );
}
