import React from "react";
import PropTypes from "prop-types";

import axios from "axios";
import Carousel from "react-slick";
import LazyLoad from "react-lazyload";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Grow from "@material-ui/core/Grow";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Zoom from "@material-ui/core/Zoom";

//icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import {
  container,
  title,
  primaryColor,
  grayColor,
  warningColor,
  successColor,
  infoColor,
} from "assets/jss/material-kit-pro-react.js";
import { STATIC_IMG_BASE_URL } from "utils/constants.js";

const styles = (theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  title: {
    ...title,
    marginTop: 0,
    marginBottom: 0,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
});

const useStyles = makeStyles(styles);

function AllCategories({ deptList }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderCategoryNames = (dept) => {
    let names = "";
    dept.categories.forEach((c) => {
      if (names !== "") names = names + ", " + c.name;
      else names = c.name;
    });
    return names;
  };

  return (
    <div className={classes.root}>
      {deptList.map((dept, idx) => (
        <Fade in={true} key={idx} timeout={1000}>
          <Paper elevation={0}>
            <Accordion
              expanded={expanded === idx}
              onChange={handleChange(idx)}
              style={{ marginBottom: 10 }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon style={{ color: primaryColor[0] }} />
                }
                aria-controls="panel1-content"
                style={{
                  backgroundColor: expanded === idx ? warningColor[4] : "unset",
                }}
                id={idx}
              >
                <Box display="flex" flexDirection="row">
                  <img
                    src={dept.imgUrlXs}
                    style={{ width: 145, height: 140, objectFit: "cover" }}
                  />
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    style={{ marginLeft: 10, marginRight: 10 }}
                  >
                    {dept.maxOfferPerc && (
                      <Typography
                        variant="caption"
                        style={{ color: successColor[0] }}
                      >
                        Upto {dept.maxOfferPerc} % OFF
                      </Typography>
                    )}
                    <Typography variant="subtitle2" className={classes.title}>
                      {dept.name}
                    </Typography>
                    <Typography variant="caption">
                      {renderCategoryNames(dept)}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails style={{ backgroundColor: warningColor[4] }}>
                <List style={{ backgroundColor: "#FFF", width: "100%" }}>
                  {dept.categories.map((c, cat_idx) => (
                    <React.Fragment key={cat_idx}>
                      <ListItem button>
                        <LazyLoad>
                          <img
                            src={c.imgUrlXs}
                            style={{
                              width: 64,
                              height: 64,
                              objectFit: "cover",
                            }}
                          />
                        </LazyLoad>
                        <ListItemText
                          primary={
                            <Typography variant="caption">{c.name}</Typography>
                          }
                          style={{ marginLeft: 10, marginRight: 10 }}
                        />
                        <ListItemIcon style={{ justifyContent: "flex-end" }}>
                          <ChevronRightIcon />
                        </ListItemIcon>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Fade>
      ))}
    </div>
  );
}

AllCategories.propTypes = {
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

export default AllCategories;
