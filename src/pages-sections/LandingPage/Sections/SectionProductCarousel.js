import React from "react";
import PropTypes from "prop-types";

//other components
import LazyLoad from "react-lazyload";
import Slider from "react-slick";

// @material-ui/core components
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import MuiButton from '@material-ui/core/Button';

// @material-ui/icons
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Subject from "@material-ui/icons/Subject";
import FormatPaint from "@material-ui/icons/FormatPaint";
import Code from "@material-ui/icons/Code";
import Dashboard from "@material-ui/icons/Dashboard";
import Timeline from "@material-ui/icons/Timeline";
import Group from "@material-ui/icons/Group";

// material components
import Typography from "@material-ui/core/Typography";
import Chip from '@material-ui/core/Chip';
import Fade from "@material-ui/core/Fade";

// core components
import OutlineButton from 'components/CustomButtons/CustomOutlineButton.js';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import Muted from "components/Typography/Muted.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Badge from "components/Badge/Badge.js";

import { successColor, warningColor, container } from "assets/jss/material-kit-pro-react.js";
import projectsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/projectsStyle.js";

const useStyles = makeStyles(theme => ({
  ...projectsStyle,
  root: {
    width: '100%',
    backgroundColor: '#FFF',
  },
  projects: {
    padding: "0 0"
  },
  title: {
    ...projectsStyle.title,
    borderBottom: `2px solid ${warningColor[0]}`,
    width: 'fit-content',
    marginTop: 0,
    marginBottom: '-1px',
  },
  container: {
    ...container,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginBottom: 20,
    marginTop: 20,
    //backgroundColor: '#FFF',
  },
  card2: {
    ...projectsStyle.card2,
    marginTop: 15,
    marginBottom: 15,
    //padding: 10,
  },
  offerTagRoot: {
    width: 90, 
    backgroundColor: successColor[0],
    height: '18px', fontSize: 12, fontWeight: 600, position: 'absolute',
    zIndex: 99
  },
  offerTag: {
    paddingLeft: 0,
    paddingRight: 0
  },
  softRiseShadowStyle: ({ inactive }) => ({
    transition: '0.3s',
    ...(!inactive && {
      '&:hover': {
        transform: 'translateY(-5px)',
      },
    }),
  }),
}));

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        display: "block", background: "transparent",
        right: 15, top: -30, left: 'auto', position: 'absolute'
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        display: "block", background: "transparent",
        right: 40, top: -30, left: 'auto', position: 'absolute'
      }}
      onClick={onClick}
    />
  );
}

function SectionProductCarousel({ title, productData, ...rest }) {
  const classes = useStyles();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    autoPlay: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };
  return (
    <div className={classes.root} {...rest}>
      <div className={classes.container}>
        {/* Project 2 START */}
        <div style={{ borderBottom: '1px solid #d9d9d9' }}>
          <h4 className={classes.title}>{title}</h4>
        </div>
        <Slider {...settings}>
          {productData.map((p, i) => {
            return (
              <div key={i}>
                <div style={{marginLeft: 5, marginRight: 5}}>
                <Card className={classes.card2} >
                  <div style={{padding: 10}}>
                  <Chip
                    label="10% - 30% OFF"
                    color="primary"
                    classes={{
                      root: classes.offerTagRoot,
                      label: classes.offerTag
                    }}
                  />
                  <div className={classes.softRiseShadowStyle}>
                    <LazyLoad once height={382}>
                      <img
                        src={p.img}
                        alt="Card-img-cap"
                        style={{ height: 150, width: '100%' }}
                      />
                    </LazyLoad>
                  </div>
                  </div>
                  <CardBody plain style={{backgroundColor: '#EEE'}}>
                    <Typography variant="body1">{p.prodName}</Typography>
                    <Typography variant="subtitle1" gutterBottom style={{ textTransform: 'capitalize', marginTop: 20 }}>
                      {p.priceRange}
                    </Typography>
                    {/* <Button size="sm" fullWidth color="warning">
                      Quick View
                    </Button> */}
                    {/* <MuiButton fullWidth variant="outlined" style={{color: warningColor[0], border: `1px solid ${warningColor[0]}`}}>Quick View</MuiButton> */}
                    <Button block color="warning">Quick View</Button>
                    {/* <OutlineButton size="small">
                            1Kg Pouch - Rs 100 
                          </OutlineButton> */}
                  </CardBody>
                </Card>
              </div>
              </div>
            );
          })}
        </Slider>
        {/* Project 2 END */}
      </div>
    </div>
  );
}

SectionProductCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  productData: PropTypes.array.isRequired,
};

export default SectionProductCarousel;
