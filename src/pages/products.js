import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

// sections of this Page
import sectionsPageStyle from "assets/jss/material-kit-pro-react/views/sectionsPageStyle.js";
import ProductListingBody from "pages-sections/EcommercePage/ProductListingBody";
import FooterPage from "pages-sections/FooterPage/FooterPage.js";

const useStyles = makeStyles(sectionsPageStyle);

export default function SectionsPage() {
  const classes = useStyles();
  return (
    <div>
      <Header 
        color="warning"
        brand="Material Kit PRO React"
        links={<HeaderLinks dropdownHoverColor="rose" />}
        fixed
        appBarStyle={{
          boxShadow: "none",
          borderRadius: 0
        }}
      />
      <div className={classes.main}>
        <ProductListingBody />
        <FooterPage id="footer" />
      </div>
    </div>
  );
}
