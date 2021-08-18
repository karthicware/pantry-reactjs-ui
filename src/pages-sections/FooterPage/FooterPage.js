import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import Link from "next/link";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

// @material-ui/icons
import Mail from "@material-ui/icons/Mail";
import LocationIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Favorite from "@material-ui/icons/Favorite";

// custom components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Footer from "components/Footer/Footer.js";

//import styles from "assets/jss/material-kit-pro-react/views/componentsSections/footerStyle.js";

const styles = {};

const useStyles = makeStyles(styles);

export default function FooterPage() {
  const classes = useStyles();
  return (
        <Footer
          theme="dark"
          content={
            <div>
              <div
                className={classNames(classes.pullCenter, classes.copyRight)}
              >
                Copyright &copy; {1900 + new Date().getYear()}{" "}
                <a
                  href="https://www.creative-tim.com?ref=mkpr-footer-components"
                  target="_blank"
                  className="text-rose"
                >
                  Nammanuts
                </a>{" "}
                All Rights Reserved.
              </div>
            </div>
          }
        >
          <div className={classes.footer}>
            <GridContainer>
              <GridItem xs={12} sm={3} md={3}>
                  <h5>Nammanuts</h5>
                <Typography variant="body2">
                At NammaNuts.com, customer satisfaction is our top priority. 
                If you experience a problem with our products, 
                customer service, shipping, or even if you just plain don't like what you bought, please let us know.
                <br/>
                <br/>
                <b>We'll do whatever it takes to make it right. It’s a family tradition.</b>
                </Typography>
              </GridItem>
              <GridItem xs={12} sm={2} md={2}>
                <h5>Quick Links</h5>
                <ul className={classes.linksVertical}>
                  <li>
                    <Link href="/products?cid=5"><a><Typography variant="body2">Nuts</Typography></a></Link>
                  </li>
                  <li>
                    <Link href="/products?cid=7"><a><Typography variant="body2">Spices</Typography></a></Link>
                  </li>
                  <li>
                    <Link href="/products?cid=6"><a><Typography variant="body2">Dry Fruits</Typography></a></Link>
                  </li>
                  <li>
                    <Link href="/products?cid=136"><a><Typography variant="body2">Food Products</Typography></a></Link>
                  </li>
                </ul>
              </GridItem>
              <GridItem xs={12} sm={2} md={2}>
                <h5>Support</h5>
                <ul className={classes.linksVertical}>
                  <li>
                    <Link href="/policies/returns-and-refunds"><a><Typography variant="body2">Returns & Refunds</Typography></a></Link>
                  </li>
                  <li>
                    <Link href="/policies/shipping-and-delivery"><a><Typography variant="body2">Shipping & Delivery</Typography></a></Link>
                  </li>
                </ul>
              </GridItem>
              <GridItem xs={12} sm={2} md={2}>
                <h5>User Policies</h5>
                <ul className={classes.linksVertical}>
                  <li>
                    <Link href="/policies/terms-and-conditions"><a><Typography variant="body2">Terms & conditions</Typography></a></Link>
                  </li>
                  <li>
                    <Link href="/policies/privacy-policy"><a><Typography variant="body2">Privacy Policy</Typography></a></Link>
                  </li>
                </ul>
              </GridItem>
              <GridItem xs={12} sm={3} md={3}>
                <h5>Contact Us</h5>
                    <div style={{display: "flex"}}>
                    <p><PhoneIcon /></p>&nbsp;&nbsp;<Typography variant="body2"> +91 98765 54321</Typography>
                    </div>

                    <div style={{display: "flex"}}>
                    <p><Mail /></p>&nbsp;&nbsp;<Typography variant="body2"> help@nammanuts.com</Typography>
                    </div>

                    <div style={{display: "flex"}}>
                    <p><LocationIcon /></p>&nbsp;&nbsp;
                      <Typography variant="body2">Nammanuts, TamilNadu</Typography>
                    </div>
              </GridItem>
            </GridContainer>
          </div>
        </Footer>
  );
}
