import React from "react";
import PropTypes from "prop-types";

import axios from "axios";
import Carousel from "react-slick";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";

// icons
import LocalShippingIcon from "@material-ui/icons/LocalShippingOutlined";

import {
  container,
  title,
  primaryColor,
  grayColor,
} from "assets/jss/material-kit-pro-react.js";
import { STATIC_IMG_BASE_URL } from "utils/constants.js";

const styles = (theme) => ({
  container: {
    padding: theme.spacing(1),
    backgroundColor: "#FFF",
  },
  title: {
    ...title,
    textAlign: "center",
    marginTop: 0,
    marginBottom: 0,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
});

const useStyles = makeStyles(styles);

function LandingPage() {
  const classes = useStyles();

  const renderHeaderCarousel = () => {
    const settings = {
      dots: false,
      infinite: true,
      pauseOnDotsHover: true,
      pauseOnFocus: true,
      //adaptiveHeight: true,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
            autoplay: true,
            autoplaySpeed: 5000,
            cssEase: "linear",
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 1500,
          },
        },
      ],
    };
    const data = [
      {
        img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/carousel/1.jpg`,
        url: "",
      },
      {
        img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/carousel/2.jpg`,
        url: "",
      },
      {
        img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/carousel/3.jpg`,
        url: "",
      },
      {
        img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/carousel/4.jpg`,
        url: "",
      },
    ];
    return (
      <Carousel {...settings}>
        {data.map((d, i) => (
          <div key={i}>
            <img src={d.img} style={{ width: "100%", objectFit: "contain" }} />
          </div>
        ))}
      </Carousel>
    );
  };

  const renderShopByCategory = () => {
    const data = [
      {
        img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/shop_by-category/1.jpg`,
        url: "",
      },
      {
        img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/shop_by-category/2.jpg`,
        url: "",
      },
      {
        img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/shop_by-category/3.jpg`,
        url: "",
      },
      {
        img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/shop_by-category/4.jpg`,
        url: "",
      },
      {
        img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/shop_by-category/5.jpg`,
        url: "",
      },
      {
        img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/shop_by-category/6.jpg`,
        url: "",
      },
      {
        img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/shop_by-category/7.jpg`,
        url: "",
      },
      {
        img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/shop_by-category/8.jpg`,
        url: "",
      },
      {
        img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/shop_by-category/9.jpg`,
        url: "",
      },
    ];

    return (
      <div style={{ backgroundColor: "#FFF" }}>
        <Box>
          <Typography variant="h6" className={classes.title}>
            Shop by Category
          </Typography>
          {data.map((d, i) => (
            <img key={i} src={d.img} style={{ width: "100%" }} />
          ))}
        </Box>
      </div>
    );
  };

  const renderBlock1 = () => {
    return (
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        style={{ marginBottom: 20, marginLeft: 5 }}
      >
        <LocalShippingIcon style={{ fontSize: 28, color: primaryColor[5] }} />
        <div style={{ marginLeft: 12, marginRight: 12 }}>
          <Typography variant="subtitle2" style={{ fontWeight: 800 }}>
            Order today, get your deliver next day
          </Typography>
          <Typography variant="caption">Free delivery above Rs.200</Typography>
        </div>
      </Box>
    );
  };

  return (
    <div>
      <div className={classes.container}>
        {renderBlock1()}
        {renderHeaderCarousel()}
        {renderShopByCategory()}
        {/* <SectionOffers id="offers" /> */}
      </div>
    </div>
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
  const res = await axiosInstance.get("/api/v1/department/");
  const deptList = res.data.result;
  return { props: { deptList } };
}

export default LandingPage;
