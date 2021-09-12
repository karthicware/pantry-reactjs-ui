import React from "react";
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// react component for creating beautiful carousel
import Carousel from "react-slick";

// @material-ui/core components
import { withStyles, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from '@material-ui/core/Grid';

// @material-ui/icons
import Share from "@material-ui/icons/Share";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

// core components
import Header from "components/Header/Header.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import headersStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/headersStyle.js";
import { STATIC_IMG_BASE_URL } from "utils/constants.js";

const bg12 = `${STATIC_IMG_BASE_URL}/assets/img/bg12.jpg`;
const office2 = `${STATIC_IMG_BASE_URL}/assets/img/examples/office2.jpg`;
const dg1 = `${STATIC_IMG_BASE_URL}/assets/img/dashboard/carousel/1.png`;
const dg2 = `${STATIC_IMG_BASE_URL}/assets/img/dashboard/carousel/2.jpg`;
const dg3 = `${STATIC_IMG_BASE_URL}/assets/img/dashboard/carousel/3.jpg`;
const dg4 = `${STATIC_IMG_BASE_URL}/assets/img/dashboard/carousel/1.png`;

const customStyles = theme => ({
  grid: {
    //padding: 20
    // paddingLeft: theme.spacing(12),
    // paddingRight: theme.spacing(12),
    //paddingTop: theme.spacing(4)
  }
});
const useHeaderStyles = makeStyles(headersStyle);
const useCustomStyles = makeStyles(customStyles);

export default function SectionHeaderCarousel({ ...rest }) {
  const classes = useHeaderStyles();
  const customClasses = useCustomStyles();
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
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
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 5000,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 5000,
        }
      }
    ]
  };
  const data = [
    { img: dg1, url: "" },
    { img: dg2, url: "" },
    { img: dg3, url: "" },
    { img: dg4, url: "" }
  ];
  return (
    // we've set the className to cd-section so we can make smooth scroll to it
    //style={{paddingTop: 100, paddingLeft: 140, paddingRight: 140}}
    <div className="cd-section" {...rest}>
      {/* HEADER 3 START */}
      <Carousel {...settings}>
        {data.map((d, i) => (
          <div key={i}>
            {/* <div
                    style={{
                      height: 500,
                      padding: 0,
                      backgroundImage: `url("${d.img}")`
                    }}
                  ></div> */}
            <img src={d.img} style={{ height: 450, width: '100%' }} />
          </div>
        ))}
      </Carousel>
      {/* HEADER 3 END */}
    </div>
  );
}
