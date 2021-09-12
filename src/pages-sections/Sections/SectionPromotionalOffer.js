/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";

//other components
import LazyLoad from "react-lazyload";

// @material-ui/core components
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Build from "@material-ui/icons/Build";
import Subject from "@material-ui/icons/Subject";
import FormatPaint from "@material-ui/icons/FormatPaint";
import Code from "@material-ui/icons/Code";
import Dashboard from "@material-ui/icons/Dashboard";
import Timeline from "@material-ui/icons/Timeline";
import Group from "@material-ui/icons/Group";
// core components
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

import projectsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/projectsStyle.js";
import { STATIC_IMG_BASE_URL } from "utils/constants.js";

//const fabric1 = `${STATIC_IMG_BASE_URL}/assets/png/2.gif`;
const fabric2 = `${STATIC_IMG_BASE_URL}/assets/img/landingpage/shop_by_offer/2.jpg`;
const fabric3 = `${STATIC_IMG_BASE_URL}/assets/img/landingpage/shop_by_offer/3.jpg`;
const fabric4 = `${STATIC_IMG_BASE_URL}/assets/img/landingpage/shop_by_offer/4.jpg`;

const styles = (theme) => ({
    ...projectsStyle,
    projects: {
        padding: "0 0"
    },
    title: {
        ...projectsStyle.title,
        textAlign: 'center'
    },
    cardTitle: {
        ...projectsStyle.cardTitle,
        textTransform: 'capitalize'
    },
    container: {
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        backgroundColor: '#FFF',
    }
});

const data = [
    { img: fabric2 },
    { img: fabric3 },
    { img: fabric4 },
];

function SectionPromotionalOffer({ classes, ...rest }) {
    return (
        <div className="cd-section" {...rest}>
            {/* Project 2 START */}
            <div className={classes.container}>
            <h2 className={classes.title}>
                Promotional Offer
      </h2>
                <GridContainer>
                    {data.map((d, i) => {
                        return (
                            <GridItem xs={12} sm={4} md={4} key={i}>
                                <Card plain className={classes.card2}>
                                    <a
                                        href="#!"
                                        target="_blank"
                                    >
                                        <CardHeader image plain>
                                            <LazyLoad once>
                                                <img
                                                    src={d.img}
                                                    alt="..."
                                                    style={{ height: '100%' }}
                                                />
                                            </LazyLoad>
                                        </CardHeader>
                                    </a>
                                    <CardBody plain>
                                        <a
                                            href="#!"
                                            target="_blank"
                                        >
                                        </a>
                                    </CardBody>
                                </Card>
                            </GridItem>
                        );
                    })}
                </GridContainer>
            </div>
            {/* Project 2 END */}
        </div>
    );
}

SectionPromotionalOffer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SectionPromotionalOffer);