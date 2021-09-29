import React from "react";
import PropTypes from "prop-types";

import axios from "axios";
import Carousel from "react-slick";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";

//icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {
  container,
  title,
  primaryColor,
  grayColor,
  warningColor,
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
      {/* <Typography>{JSON.stringify(deptList)}</Typography> */}
      {deptList.map((dept, idx) => (
        <Accordion
          key={idx}
          expanded={expanded === idx}
          onChange={handleChange(idx)}
          style={{ marginBottom: 10 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: primaryColor[0] }} />}
            aria-controls="panel1-content"
            style={{
              backgroundColor: expanded === idx ? infoColor[4] : "unset",
            }}
            id={idx}
          >
            <Box display="flex" flexDirection="row">
              <img
                src={dept.imgUrlXs}
                style={{ width: 145, height: 140, objectFit: "cover" }}
              />
              <div style={{ marginLeft: 10, marginRight: 10 }}>
                <Typography variant="subtitle2" className={classes.title}>
                  {dept.name}
                </Typography>
                <Typography variant="caption">
                  {renderCategoryNames(dept)}
                </Typography>
              </div>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" flexDirection="row" flexWrap="wrap">
              {dept.categories.map((c, cat_idx) => (
                <Box
                  key={cat_idx}
                  display="flex"
                  flexDirection="column"
                  id={cat_idx}
                  style={{
                    padding: 20,
                    flex: 1,
                    borderLeft: "solid 1px rgba(112,112,112,.38)",
                    borderTop:
                      cat_idx === 0 ||
                      cat_idx === 1 ||
                      cat_idx === 2 ||
                      cat_idx === 3
                        ? "solid 1px rgba(112,112,112,.38)"
                        : "unset",
                    borderRight:
                      dept.categories.length - 1 === cat_idx ||
                      (cat_idx + 1) % 4 === 0
                        ? "solid 1px rgba(112,112,112,.38)"
                        : "unset",
                    borderBottom: "solid 1px rgba(112,112,112,.38)",
                  }}
                >
                  <img
                    src={c.imgUrlXs}
                    style={{ width: 120, height: 60, objectFit: "cover" }}
                  />
                  <Typography
                    variant="body2"
                    style={{ marginTop: 10, marginBottom: 10 }}
                  >
                    {c.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
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
