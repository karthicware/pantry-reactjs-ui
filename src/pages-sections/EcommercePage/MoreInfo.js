import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  tabHeading: {
    textTransform: 'capitalize',
  }
}));

export default function MoreInfoComponent({ info }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  let infoList = info ? info.split('\n') : [];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label={<Typography variant="body2" className={classes.tabHeading}>
          More Information{" "}
        </Typography>} {...a11yProps(0)} />
        <Tab label={<Typography variant="body2" className={classes.tabHeading}>Our Promise</Typography>} {...a11yProps(1)} />
        <Tab label={<Typography variant="body2" className={classes.tabHeading}>Returns</Typography>} {...a11yProps(2)} />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {infoList ?
            infoList.map((item, i) => (<li key={i}><Typography variant="caption">{item}</Typography></li>))
            : <Typography variant="caption">Store in a cool dry place for up to 6 months. It is ok to refrigerate.</Typography>
          }</TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Typography variant="caption">We assure the authenticity and quality of our products</Typography>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Typography variant="caption">Easy 7 days return and exchange. Return Policies may vary based on products and promotions. For full details on our Returns Policies, please click here․</Typography>
        </TabPanel>
      </SwipeableViews>
    </Paper>
  );
}