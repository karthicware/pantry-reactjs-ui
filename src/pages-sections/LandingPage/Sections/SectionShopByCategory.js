import React from "react";

//other components
import LazyLoad from "react-lazyload";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

// @material-ui/icons
import FormatQuote from "@material-ui/icons/FormatQuote";
import Star from "@material-ui/icons/Star";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import { title } from "assets/jss/material-kit-pro-react.js";
import { STATIC_IMG_BASE_URL } from "utils/constants.js";
import { Typography } from "@material-ui/core";

const styles = {
  container: {
    marginLeft: "5%",
    marginRight: "5%",
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#FFF",
  },
  title: {
    ...title,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    textAlign: "center",
  },
};

const useStyles = makeStyles(styles);

export default function SectionShopByCategory() {
  const classes = useStyles();
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
      <Box className={classes.container}>
        <Typography variant="h6" className={classes.title}>
          Shop by Category
        </Typography>
        {data.map((d, i) => (
          <img key={i} src={d.img} />
        ))}
      </Box>
    </div>
  );
}
