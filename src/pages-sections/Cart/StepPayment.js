import React from "react";
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import Router from "next/router";
import axios from "axios";

// core components
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Header from "components/Header/Header.js";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";

//icons
import PersonIcon from "@material-ui/icons/Person";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FaceIcon from "@material-ui/icons/Face";

//custom components
import HeaderLinks from "components/Header/HeaderLinks.js";
import Card from "components/Card/Card";
import Button from "components/CustomButtons/Button.js";
import Backdrop from "components/Backdrop/CustomBackdrop";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

//app components
import SectionOrders from "pages-sections/MyAccount/Orders/SectionOrders.js";
import { primaryColor } from "assets/jss/material-kit-pro-react.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    minHeight: 200,
    //border: '1px solid #EEE',
  },
  tabs: {
    //border: `1px solid ${theme.palette.divider}`,
    "& .MuiButtonBase-root:not(.Mui-selected)": {
      border: "1px solid #E1E1E1 !important",
      backgroundColor: "#EEE",
    },
    "& .MuiButtonBase-root:not(.Mui-selected) .MuiTab-wrapper": {
      fontSize: 12,
    },
  },
  tabPanel: {
    // paddingLeft: 40,
    // paddingRight: 40,
    paddingTop: theme.spacing(2),
    // paddingBottom: 20,
    // width: '100%',
    border: "1px solid #EEE",
    textAlign: "center",
  },
  tabsIndicator: {
    backgroundColor: primaryColor[0],
  },
  mainSubContainer: {
    paddingBottom: 40,
    width: "100%",
    "& .MuiTab-wrapper": {
      textTransform: "capitalize",
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className={classes.tabPanel}
      {...other}
    >
      {value === index && <div>{children}</div>}
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
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function StepPayment(props) {
  const classes = useStyles();
  const { deliveryAddressId } = props;
  const [value, setValue] = React.useState(0);
  const [mobile, setMobile] = React.useState(null);
  const [blocking, setBlocking] = React.useState(false);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const payNow = (modeOfPay) => {
    setBlocking(true);
    axios
      .post(`/api/v1/my/order/place-order/${deliveryAddressId}/${modeOfPay}`)
      .then((response) => {
        setBlocking(false);
        const orderNo = response.data.result.orderNo;
        if (modeOfPay === "COD") {
          //reload page to view order confirmation page
          Router.push(`/order-confirmation?orderNo=${orderNo}`);
          return;
        }
        const resp = response.data.result.rzpayCheckoutApi;
        const options = {
          key: "rzp_test_GqInKHfnL4S2mt", // Enter the Key ID generated from the Dashboard
          amount: resp.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Pantry",
          description: "Pantry Test Transaction",
          image:
            "https://sarees-images-bucket.s3.ap-south-1.amazonaws.com/p1.jpg",
          order_id: resp.rzpOrderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: function (response) {
            handlePaymentResponse(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature,
              orderNo
            );
          },
          prefill: {
            name: resp.customerName,
            email: resp.customerEmail,
            contact: resp.customerMobile,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: primaryColor[0],
          },
        };
        const rzp1 = new window.Razorpay(options);
        //var rzp1 = new Razorpay(options);
        rzp1.open();
      })
      .catch((error) => {
        setBlocking(false);
        console.log(`error=${JSON.stringify(error)}`);
        //handleError(error);
        //loadCartData();
      });
  };

  const handlePaymentResponse = (rzpOrderId, paymentId, signature, orderNo) => {
    setBlocking(true);
    axios
      .post(`/api/v1/payment/handle-payment-response`, {
        paymentId,
        orderId: rzpOrderId,
        signature,
      })
      .then((resp) => {
        setBlocking(false);
        //reload page to view order confirmation page
        Router.push(`/order-confirmation?orderNo=${orderNo}`);
      })
      .catch((error) => {
        setBlocking(false);
        console.log(error);
      });
  };

  return (
    <>
      <Backdrop open={blocking} />
      <div className={classes.mainSubContainer}>
        <div className={classes.root}>
          <Tabs
            orientation="vertical"
            variant="fullWidth"
            value={value}
            onChange={handleTabChange}
            aria-label="Vertical tabs example"
            classes={{ indicator: classes.tabsIndicator }}
          >
            <Tab
              style={{ border: "1px solid #EEE" }}
              label="Cash on Delivery"
              {...a11yProps(0)}
            />
            <Tab
              style={{ border: "1px solid #EEE" }}
              label="Credit/ Debit Card, NetBanking, Wallets, UPI & Other Bankings"
              {...a11yProps(1)}
            />
          </Tabs>
          <TabPanel value={value} index={0}>
            <GridContainer>
              <GridItem>
                <Typography variant="subtitle2">Cash on Delivery</Typography>
                <Typography variant="caption">
                  For safe, contactless, and hassle free delivery, pay using
                  card/wallet/netbanking
                </Typography>
              </GridItem>
              <GridItem>
                <Button
                  color="primary"
                  style={{ marginTop: 40 }}
                  onClick={() => payNow("COD")}
                >
                  <Typography variant="button" size="sm">
                    Place Order
                  </Typography>
                </Button>
              </GridItem>
              <GridItem>
                <Typography variant="caption">
                  Pay when your order is delivered
                </Typography>
              </GridItem>
            </GridContainer>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <GridContainer>
              <GridItem>
                <Typography variant="subtitle2">
                  Credit/ Debit Card, NetBanking, Wallets, UPI & Other Bankings
                </Typography>
              </GridItem>
              <GridItem>
                <Button
                  color="primary"
                  style={{ marginTop: 40 }}
                  onClick={() => payNow("RZP")}
                >
                  <Typography variant="button" size="small">
                    Pay Now
                  </Typography>
                </Button>
              </GridItem>
              <GridItem>
                <Typography variant="caption">
                  You will be redirected to payment gateway site to authorize
                  payment
                </Typography>
              </GridItem>
            </GridContainer>
          </TabPanel>
        </div>
      </div>
    </>
  );
}

StepPayment.propTypes = {
  deliveryAddressId: PropTypes.number.isRequired,
};
