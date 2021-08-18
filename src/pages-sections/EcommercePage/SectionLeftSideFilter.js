/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import Router from "next/router";
// nodejs library that concatenates classes
import PropTypes from "prop-types";
import classNames from "classnames";
// plugin that creates slider
import Slider from "nouislider";

// @material-ui/core components
import Fade from "@material-ui/core/Fade";
import withStyles from "@material-ui/core/styles/withStyles";
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from "@material-ui/core/Typography";
import Chip from '@material-ui/core/Chip';

// @material-ui icons
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
// core components
import Accordion from "components/Accordion/Accordion.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from 'components/CustomButtons/Button.js';

import axios from "axios";
import Scrollbar from 'smooth-scrollbar-react';

import { warningColor, infoColor } from "assets/jss/material-kit-pro-react.js";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    // [theme.breakpoints.up('lg')]: {
    //   width: drawerWidth,
    //   flexShrink: 0,
    // },
    // [theme.breakpoints.up('md')]: {
    //   width: drawerWidth,
    //   flexShrink: 0,
    // },
  },
  drawerContainer: {
    overflow: 'auto',
  },
  drawerPaper: {
    width: drawerWidth,
    top: 'unset',
    left: 'unset'
  },
  drawerPaperFixed: {
    width: drawerWidth,
    top: 'unset',
    left: 'unset',
    position: 'fixed',
  },
  drawerPaperRelative: {
    width: drawerWidth,
    top: 'unset',
    left: 'unset',
    position: 'relative',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  expandMoreIconRoot: {
    minWidth: 35,
  },
  gridListRoot: {
    width: 'unset !important',
    height: 'unset !important',
    paddingRight: '20px !important',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
}));

function SectionLeftSideFilter({deptDetail, categories, hideOnScroll}) {
  const classes = useStyles();

  /* React.useEffect(() => {
    console.log(`queryString=${queryString}`);
    const fetchData = () => {
      let searchParams = new URLSearchParams(window.location.search);
      axios
        .get(`/api/v1/product/list-menu`)
        .then(resp => {
          setMenuData(resp.data);
          Object.entries(resp.data).forEach((entry) => {
            const [key, value] = entry;
            if (key.substring(0, key.indexOf('_')) == searchParams.get('cid')) {
              handleMenuClick(key);
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    };
    if (queryString)
      fetchData();
    return function cleanup() { };
  }, [queryString]); */

  /* const handleMenuClick = (menuId) => {
    if (selectedMenuId === menuId)
      setSelectedMenuId(null);
    else {
      setSelectedMenuId(menuId);
      console.log(menuId.substring(0, menuId.indexOf('_')));
      console.log(menuId.substring(menuId.indexOf('_') + 1, menuId.length));
      //props.loadProducts(menuId.substring(0, menuId.indexOf('_')), menuId.substring(menuId.indexOf('_') + 1, menuId.length));
    }
  }; */

  /* const handleSubMenuClick = (categoryId, categoryDesc, subCategoryId, subCategoryDesc) => {
    //props.loadProducts(categoryId, categoryDesc, subCategoryId, subCategoryDesc);
  }; */

  /* const smallScreenDrawerContent = (
    <div style={{
      borderBottom: '10px solid #EEE', padding: 8, display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    }}>
      <GridList className={classes.gridList} cols={2.5}>
        {Object.entries(menuData).map((entry) => {
          const [key, value] = entry;
          return (
            <GridListTile key={key} classes={{ root: classes.gridListRoot }}>
              <Button size="sm" color="warning" round>{key.substring(key.indexOf('_') + 1, key.length)}</Button>
            </GridListTile>
          )
        })}
      </GridList>
    </div>); */

  const bigScreenDrawerContent = (
    <div className={classes.drawerContainer}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItem button onClick={() => handleMenuClick(-1)}>
          <ListItemIcon classes={{
            root: classes.expandMoreIconRoot
          }}></ListItemIcon>
          <ListItemText primary="New Launches" />
        </ListItem>
        <Divider />
        {categories && categories.map((catgApi, i) => {
          return (
            <React.Fragment key={i}>
              <ListItem button>
                <ListItemIcon classes={{
                  root: classes.expandMoreIconRoot
                }}>
                  {deptDetail.catgId === catgApi.catgId ? <RemoveRoundedIcon style={{ color: warningColor[0] }} /> : <AddRoundedIcon style={{ color: warningColor[0] }} />}
                </ListItemIcon>
                <ListItemText primary={catgApi.name} />
              </ListItem>
              <Divider />
              {catgApi.subCategories && catgApi.subCategories.length > 0 &&
                <Collapse in={deptDetail.catgId === catgApi.catgId} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {catgApi.subCategories && catgApi.subCategories.map((subCatgApi, i) => {
                      return (
                        <React.Fragment key={i}>
                          <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText primary={subCatgApi.name} />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </React.Fragment>);
                    })}
                  </List>
                </Collapse>
              }
            </React.Fragment>
          )
        })}
      </List>
    </div>);

  return (
    <>
      <Hidden mdDown>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: hideOnScroll ? classes.drawerPaperRelative: classes.drawerPaperFixed,
          }}
        >
          <Scrollbar alwaysShowTracks={true}>
            {bigScreenDrawerContent}
          </Scrollbar>
        </Drawer>
      </Hidden>

      {/* <Hidden smUp>
        {smallScreenDrawerContent}
      </Hidden> */}

    </>

  );
}

SectionLeftSideFilter.propTypes = {
  categories: PropTypes.array.isRequired,
  deptDetail: PropTypes.object,
  hideOnScroll: PropTypes.bool.isRequired,
};

export default SectionLeftSideFilter;
