import React from "react";

//other components
import LazyLoad from "react-lazyload";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Weekend from "@material-ui/icons/Weekend";
import Home from "@material-ui/icons/Home";
import Business from "@material-ui/icons/Business";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import NavPills from "components/NavPills/NavPills.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardAvatar from "components/Card/CardAvatar.js";
import Info from "components/Typography/Info.js";
import Danger from "components/Typography/Danger.js";
import Success from "components/Typography/Success.js";
import Warning from "components/Typography/Warning.js";
import Rose from "components/Typography/Rose.js";

import sectionCards from "assets/jss/material-kit-pro-react/views/componentsSections/sectionCards.js";
import projectsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/projectsStyle.js";
import { STATIC_IMG_BASE_URL } from "utils/constants.js";

const customStyle = theme => ({
  ...sectionCards,
  title: {
    ...projectsStyle.title,
    textAlign: "center"
  },
  container: {
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10)
  }
});

const data = [
  {
    name: "occasionDaily",
    img: `${STATIC_IMG_BASE_URL}/assets/img/landingpage/occasion_daily.jpg`
  },
  {
    name: "occasionFestive",
    img: `${STATIC_IMG_BASE_URL}/assets/img/landingpage/occasion_festive.jpg`
  },
  {
    name: "occasionParty",
    img: `${STATIC_IMG_BASE_URL}/assets/img/landingpage/occasion_party.jpg`
  }
];

const useStyles = makeStyles(customStyle);

export default function SectionShopByOccasion({ ...rest }) {
  const classes = useStyles();
  return (
    <div className="cd-section" {...rest}>
      <div className={classes.container}>
        <h2 className={classes.title}>Shop by occasion</h2>
        <GridContainer>
          {data.map((d, i) => (
            <GridItem xs={12} sm={12} md={4} lg={4} key={i}>
              <Card blog plain>
                <CardHeader image plain>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <LazyLoad once>
                      <img src={d.img} alt="..." />
                    </LazyLoad>
                  </a>
                  <div
                    className={classes.coloredShadow}
                    style={{
                      backgroundImage: `url(${d.img})`,
                      opacity: "1"
                    }}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.title}>{d.name}</h4>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    </div>
  );
}
