import React from "react";
import PropTypes from "prop-types";

import axios from "axios";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import AppHeader from "components/AppHeader/AppHeader.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

// sections of this Page
import SectionHeaderCarousel from "pages-sections/LandingPage/Sections/SectionHeaderCarousel.js";
import SectionTestimonials from "pages-sections/LandingPage/Sections/SectionTestimonials.js";

//import SectionContacts from "./Sections/SectionContacts.js";
import SectionProductCarousel from "pages-sections/LandingPage/Sections/SectionProductCarousel.js";
import SectionPromotionalOffer from "pages-sections/LandingPage/Sections/SectionPromotionalOffer.js";
import SectionShopByPrice from "pages-sections/LandingPage/Sections/SectionShopByPrice.js";
import SectionTrustUs from "pages-sections/LandingPage/Sections/SectionTrustUs.js";
import SectionShopByOccasion from "pages-sections/LandingPage/Sections/SectionShopByOccasion";
import FooterPage from "pages-sections/FooterPage/FooterPage.js";

import sectionsPageStyle from "assets/jss/material-kit-pro-react/views/sectionsPageStyle.js";
import { container, whiteColor } from "assets/jss/material-kit-pro-react.js";
import { STATIC_IMG_BASE_URL } from "utils/constants.js";

const styles = {
  ...sectionsPageStyle,
  container: {
    ...container,
    //backgroundColor: whiteColor,
  },
  main: {
    ...sectionsPageStyle.main,
    //width: '1170px',
    //margin: 'auto',
  },
};

const useStyles = makeStyles(styles);

const nutsData = [
  {
    img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/nuts and seeds/almond.webp`,
    prodName: "American almond first grade",
    priceRange: "₹100 - ₹300",
  },
  {
    img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/nuts and seeds/cashew.webp`,
    prodName: "Cashew",
    priceRange: "₹100 - ₹300",
  },
  {
    img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/nuts and seeds/walnut.webp`,
    prodName: "Walnut",
    priceRange: "₹100 - ₹300",
  },
  {
    img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/nuts and seeds/pista.webp`,
    prodName: "Pista",
    priceRange: "₹100 - ₹300",
  },
  {
    img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/nuts and seeds/walnut2.webp`,
    prodName: "Walnut",
    priceRange: "₹100 - ₹300",
  },
];

const dryFruitData = [
  {
    img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/dryfruits/dates.webp`,
    prodName: "Dates",
    priceRange: "₹100 - ₹300",
  },
  {
    img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/dryfruits/cranberries.webp`,
    prodName: "Cranberries",
    priceRange: "₹100 - ₹300",
  },
  {
    img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/dryfruits/apricot.webp`,
    prodName: "Apricot",
    priceRange: "₹100 - ₹300",
  },
  {
    img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/dryfruits/figs.webp`,
    prodName: "Figs",
    priceRange: "₹100 - ₹300",
  },
  {
    img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/dryfruits/kismish.webp`,
    prodName: "Kismish",
    priceRange: "₹100 - ₹300",
  },
  {
    img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/dryfruits/kiwi.webp`,
    prodName: "Kiwi",
    priceRange: "₹100 - ₹300",
  },
  {
    img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/dryfruits/mango.webp`,
    prodName: "Mango",
    priceRange: "₹100 - ₹300",
  },
  {
    img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/dryfruits/raisins.webp`,
    prodName: "Raisins",
    priceRange: "₹100 - ₹300",
  },
];

function Content() {
  const classes = useStyles();
  return (
    <div>
      {/* <Header
        color="warning"
        brand="Nammanuts"
        links={<HeaderLinks dropdownHoverColor="info" />}
        appBarStyle={{
          boxShadow: "none",
          borderRadius: 0,
        }}
      /> */}
      <div className={classes.main}>
        <SectionHeaderCarousel id="headerCarousel" />
        <SectionTrustUs id="trustUs" />
        <SectionPromotionalOffer id="shopByOffer" />
        <SectionProductCarousel
          id="nuts"
          title="Nuts & Seeds"
          productData={nutsData}
        />
        <SectionProductCarousel
          id="dry_fruits"
          title="Dry Fruit"
          productData={dryFruitData}
        />
        {/* <SectionShopByPrice id="shopByPrice" />
        <SectionShopByOccasion id="shopByOccasion" />
        <SectionTestimonials id="testimonials" />
        <SectionContacts id="contacts" /> */}
        <FooterPage id="footer" />
      </div>
    </div>
  );
}

function LandingPage({ deptList }) {
  return (
    <AppHeader deptList={deptList}>
      <Content />
    </AppHeader>
  );
}

LandingPage.propTypes = {
  deptList: PropTypes.array.isRequired,
};

export async function getStaticProps() {
  //console.log("Landingpage... getStaticProps()");
  //console.log(`params = ${JSON.stringify(params)}`);
  const axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL,
    responseType: "json",
  });
  //console.log(`process.env.API_BASE_URL = ${process.env.API_BASE_URL}`);
  const res = await axiosInstance.get("/api/v1/department/all");
  const deptList = res.data;
  return { props: { deptList } };
}

export default LandingPage;
