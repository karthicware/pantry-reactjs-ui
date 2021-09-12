import React from "react";

//other components
import LazyLoad from "react-lazyload";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

// @material-ui/icons
import FormatQuote from "@material-ui/icons/FormatQuote";
import Star from "@material-ui/icons/Star";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import { title } from "assets/jss/material-kit-pro-react.js";
import { STATIC_IMG_BASE_URL } from "utils/constants.js";

const styles = {
  container: {
    backgroundColor: "#FFF",
    padding: 20,
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

export default function SectionOffers() {
  const classes = useStyles();
  const data = [
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/1.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/2.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/3.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/4.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/5.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/6.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/7.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/8.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/9.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/10.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/11.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/12.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/13.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/14.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/16.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/17.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/18.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/19.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/20.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/21.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/22.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/23.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/27.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/28.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/29.jpg`,
      url: "",
    },
    {
      img: `${STATIC_IMG_BASE_URL}/assets/img/dashboard/offers/30.jpg`,
      url: "",
    },
  ];

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        {data.map((d, i) => (
          <Grid key={i} item md={6} sm={6}>
            <img src={d.img} style={{ width: "100%" }} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
