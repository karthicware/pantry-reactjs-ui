import React from "react";

//other components
import LazyLoad from "react-lazyload";

// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import FormatQuote from "@material-ui/icons/FormatQuote";
import Star from "@material-ui/icons/Star";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardAvatar from "components/Card/CardAvatar.js";
import Muted from "components/Typography/Muted.js";
import Warning from "components/Typography/Warning.js";

import testimonialsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/testimonialsStyle.js";
import { STATIC_IMG_BASE_URL } from "utils/constants.js";

const dg2 = STATIC_IMG_BASE_URL + "/assets/img/landingpage/client_love_us.jpg";
const cardProfile1Square =
  STATIC_IMG_BASE_URL + "/assets/img/landingpage/cardProfile1Square.jpg";
const cardProfile2Square =
  STATIC_IMG_BASE_URL + "/assets/img/landingpage/cardProfile2Square.jpg";

const useStyles = makeStyles(testimonialsStyle);

export default function SectionTestimonials({ ...rest }) {
  const classes = useStyles();
  return (
    <div className="cd-section" {...rest}>
      {/* Testimonials 1 START */}
      <div
        className={classes.testimonials + " " + classes.sectionImage}
        style={{ backgroundImage: `url(${dg2})` }}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              xs={12}
              sm={6}
              md={6}
              className={
                classes.mlAuto + " " + classes.mrAuto + " " + classes.textCenter
              }
            >
              <h2 className={classes.title}>Our Clients Love Us</h2>
              <h5 className={classes.description}>
                You need more information? Check what other persons are saying
                about our product. They are very happy with their purchase.
              </h5>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={4} md={4}>
              <Card testimonial className={classes.card1}>
                <div className={classes.icon}>
                  <FormatQuote />
                </div>
                <CardBody>
                  <h5 className={classes.cardDescription}>
                    Your products, all the kits that I have downloaded from your
                    site and worked with are sooo cool! I love the color
                    mixtures, cards... everything. Keep up the great work!
                  </h5>
                </CardBody>
                <CardFooter testimonial>
                  <h4 className={classes.cardTitle}>Alec Thompson</h4>
                  <h6 className={classes.cardCategory}>@ALECTHOMPSON</h6>
                  <CardAvatar testimonial testimonialFooter>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <LazyLoad once>
                        <img src={cardProfile1Square} alt="..." />
                      </LazyLoad>
                    </a>
                  </CardAvatar>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <Card testimonial className={classes.card1}>
                <div className={classes.icon}>
                  <FormatQuote />
                </div>
                <CardBody>
                  <h5 className={classes.cardDescription}>
                    {'"'}Don{"'"}t be scared of the truth because we need to
                    restart the human foundation in truth. That{"'"}s why I love
                    you like Kanye loves Kanye I love Rick Owens’ bed design but
                    the back is not so attractive{'"'}
                  </h5>
                </CardBody>
                <CardFooter testimonial>
                  <h4 className={classes.cardTitle}>Gina Andrew</h4>
                  <h6 className={classes.cardCategory}>@GINAANDREW</h6>
                  <CardAvatar testimonial testimonialFooter>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      {/* <img src={cardProfile3Square} alt="..." /> */}
                    </a>
                  </CardAvatar>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <Card testimonial className={classes.card1}>
                <div className={classes.icon}>
                  <FormatQuote />
                </div>
                <CardBody>
                  <h5 className={classes.cardDescription}>
                    {'"'}Your products, all the kits that I have downloaded from
                    your site and worked with are sooo cool! I love the color
                    mixtures, cards... everything. Keep up the great work!{'"'}
                  </h5>
                </CardBody>
                <CardFooter testimonial>
                  <h4 className={classes.cardTitle}>George West</h4>
                  <h6 className={classes.cardCategory}>@GEORGEWEST</h6>
                  <CardAvatar testimonial testimonialFooter>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <LazyLoad once>
                        <img src={cardProfile2Square} alt="..." />
                      </LazyLoad>
                    </a>
                  </CardAvatar>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      {/* Testimonials 1 END */}
    </div>
  );
}
