import React from 'react';
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from "classnames";

// core components
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Header from "components/Header/Header.js";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

//icons
import PersonIcon from '@material-ui/icons/Person';
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FaceIcon from "@material-ui/icons/Face";

//custom components
import HeaderLinks from "components/Header/HeaderLinks.js";

//app components
//import SectionViewProfile from "pages-sections/MyAccount/Profile/SectionViewProfile.js";
import SectionAddresses from "pages-sections/MyAccount/Addresses/SectionAddresses.js";
import SectionOrders from "pages-sections/MyAccount/Orders/SectionOrders.js";
import Card from 'components/Card/Card';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    minHeight: 500,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  mainSubContainer: {
    width: 1220,
    margin: 'auto',
    paddingBottom: 40,
    "& .MuiTab-wrapper": {
      textTransform: 'capitalize',
    }
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: '100%' }}
      {...other}
    >
      {value === index && (
        <div >
          {children}
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);
  const [mobile, setMobile] = React.useState(null);

  React.useEffect(() => {
    if (process.browser)
      setMobile(localStorage.getItem('mobile'));
    if (mobile)
      return function cleanup() { };
  }, [process]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Header
        color="warning"
        brand="Nammanuts"
        links={<HeaderLinks dropdownHoverColor="info" />}
        appBarStyle={{
          marginBottom: 0,
          boxShadow: "0 4px 12px 0 rgba(0,0,0,.05)"
        }}
      />

      <div className={classes.mainSubContainer}>
        <div>
          <Typography variant="h6" style={{ paddingTop: 20, paddingBottom: 20}}>
            Welcome! <span style={{ color: '#999' }}>+91-{mobile}</span></Typography>
        </div>
        <div className={classes.root}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab icon={<ShoppingBasketIcon />} label="Saved Addresses" {...a11yProps(0)} />
            <Tab icon={<LocationOnIcon />} label="My Orders" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <SectionAddresses />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SectionOrders />
          </TabPanel>
        </div>
      </div>
    </>
  );
}
