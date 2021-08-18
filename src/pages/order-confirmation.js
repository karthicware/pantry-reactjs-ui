import React from "react";
// nodejs library that concatenates classes
import PropTypes from "prop-types";
import classNames from "classnames";
import { useRouter } from "next/router";

// react components for routing our app without refresh
import Link from "next/link";
import Router from "next/router";
import axios from "axios";
import moment from "moment";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import FormLabel from "@material-ui/core/FormLabel";
import Divider from "@material-ui/core/Divider";
import MuiButton from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Chip from "@material-ui/core/Chip";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

// @material-ui/icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import CheckIcon from "@material-ui/icons/Check";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Muted from "components/Typography/Muted.js";
import Backdrop from "components/Backdrop/CustomBackdrop";

import {
  roseColor,
  grayColor,
  warningColor,
  dangerColor,
  successColor,
  title,
  container,
} from "assets/jss/material-kit-pro-react.js";
import shoppingCartStyle from "assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";

//app components
import CartStepper from "pages-sections/Cart/CartStepper.js";
import StepDeliveryAddress from "pages-sections/Cart/StepDeliveryAddress.js";
import StepPayment from "pages-sections/Cart/StepPayment.js";
import FooterPage from "pages-sections/FooterPage/FooterPage.js";

import { addCommas, handleError } from "utils/util.js";

const useStyles = makeStyles((theme) => ({
  ...shoppingCartStyle,
  main: {
    ...shoppingCartStyle.main,
    backgroundColor: "#FFF",
  },
  container: {
    ...container,
    marginTop: 20,
    minHeight: "calc(100vh - 200px)",
  },
  title,
  cardTitle: {
    ...shoppingCartStyle.cardTitle,
    fontSize: "14px",
  },
  sectionGray: {
    background: "#F1F3F6",
  },
  verticalDivider: {
    display: "inline-block",
    width: 1,
    backgroundColor: "#ddd",
    height: 16,
    verticalAlign: "middle",
    marginLeft: 20,
    marginRight: 20,
  },
  prodNameContainer: {
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  prodName: {
    textTransform: "capitalize",
    fontSize: "16px",
  },
  originalPrice: {
    marginRight: 15,
    textDecoration: "line-through",
    color: "#999 !important",
  },
  offerPerc: {
    color: roseColor[4],
    fontSize: ".8rem",
  },
  priceColumn: {
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
  },
  sellingPriceLabel: {
    fontSize: "1.2rem",
    color: "rgba(0, 0, 0, 0.87)",
  },
  mrpLabel: {
    fontSize: ".8rem",
  },
  prodDetailContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  rowContainer: {
    borderTop: "1px solid #DDD",
    marginLeft: 0,
    paddingTop: 10,
    paddingBottom: 10,
  },
  subtotalContainer: {
    textAlign: "right",
    paddingTop: 20,
    marginBottom: 20,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  continueShopping: {
    color: roseColor[0],
    textAlign: "center",
    fontWeight: "bold",
  },
  priceDetailsContainer: {
    "& .MuiGrid-item": {
      marginTop: 5,
      marginBottom: 5,
    },
  },
}));

function OrderConfirmation() {
  const classes = useStyles();
  const router = useRouter();
  const [blocking, setBlocking] = React.useState(false);
  const [orderDetails, setOrderDetails] = React.useState(null);
  const [mobile, setMobile] = React.useState(null);
  const [estDeliveryDt, setEstDeliveryDt] = React.useState(null);

  React.useEffect(() => {
    if (process.browser) setMobile(localStorage.getItem("mobile"));
    if (mobile) return function cleanup() {};
  }, [process]);

  React.useEffect(() => {
    const fetchData = () => {
      const orderNo = router.query.orderNo;
      //calc estimated delivery date
      const estFromDt = moment();
      const estToDt = moment().add(3, "days");
      setEstDeliveryDt(
        estFromDt.format("dddd, MMMM Do YYYY") +
          " - " +
          estToDt.format("dddd, MMMM Do YYYY")
      );
      setBlocking(true);
      axios
        .get(`/api/v1/my/order/${orderNo}`)
        .then((resp) => {
          setBlocking(false);
          setOrderDetails(resp.data.result);
        })
        .catch((error) => {
          setBlocking(false);
          console.log(error);
        });
    };
    if (router.query.orderNo) fetchData();
    return function cleanup() {};
  }, [router]);

  if (orderDetails === null) return <Backdrop open={blocking} />;

  return (
    <div>
      <div className={classNames(classes.main)}>
        <Backdrop open={blocking} />
        <CartStepper activeStep={2} />
        <div className={classes.container}>
          <Grid container spacing={2}>
            <Grid item md xs sm style={{ textAlign: "right" }}>
              <Typography variant="h6">Order Confirmation</Typography>
              <Typography variant="subtitle2">
                Order #{orderDetails.orderNo}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" style={{ color: warningColor[0] }}>
                Hello +91-{mobile},
              </Typography>
              <Typography variant="body2">
                Thanks you for shopping with us. Your order details are
                indicated below. If you would like to view the status of your
                order or make any changes to it, please visit{" "}
                <Link href="">
                  <a>Your Orders</a>
                </Link>{" "}
                on Pantry.com
              </Typography>
            </Grid>
            <Grid item md={12}>
              <Card style={{ backgroundColor: "#EEE" }}>
                <CardBody>
                  <Grid container spacing={4}>
                    <Grid item md>
                      <Muted>Your estimated delivery date is:</Muted>
                      <Typography
                        variant="body2"
                        style={{ marginBottom: 10, width: 200 }}
                      >
                        {estDeliveryDt}
                      </Typography>
                      <Muted>Your shipping speed:</Muted>
                      <Typography variant="body2">Standard shipping</Typography>
                    </Grid>
                    <Grid item md>
                      <Muted>Your order will be sent to:</Muted>
                      <Typography variant="body2">
                        {orderDetails.deliveryAddress.name}
                      </Typography>
                      <Typography variant="body2">
                        {orderDetails.deliveryAddress.address}
                      </Typography>
                      <Typography variant="body2">
                        {orderDetails.deliveryAddress.city}
                      </Typography>
                      <Typography variant="body2">
                        {orderDetails.deliveryAddress.state} -{" "}
                        {orderDetails.deliveryAddress.pincode}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardBody>
              </Card>
            </Grid>

            <Grid item md={12}>
              <Grid container spacing={10} justify="space-between">
                <Grid item md={7}>
                  <Grid container style={{ marginBottom: 15 }}>
                    <Grid item>
                      <Typography
                        variant="h6"
                        style={{ color: warningColor[0] }}
                      >
                        Order Details
                      </Typography>
                    </Grid>
                    <Hidden mdDown>
                      <Grid item md style={{ textAlign: "right" }}>
                        <Typography variant="h6">Expected Delivery</Typography>
                      </Grid>
                    </Hidden>
                  </Grid>

                  <Grid container>
                    {orderDetails.items.map((rowData) => (
                      <Grid
                        item
                        md={12}
                        sm={12}
                        xs={12}
                        key={rowData.skuCode}
                        style={{
                          paddingTop: 20,
                          paddingBottom: 20,
                          borderTop: "1px solid #EEE",
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item>
                            <div className={classes.imgContainer}>
                              <img
                                src={rowData.defaultImg}
                                alt="..."
                                className={classes.img}
                              />
                            </div>
                          </Grid>
                          <Grid item>
                            <Grid
                              container
                              justify="space-between"
                              direction="column"
                              style={{ height: "100%" }}
                            >
                              <Grid item>
                                <Typography variant="subtitle1">
                                  {rowData.prodName}
                                </Typography>
                                <Typography variant="caption">
                                  {rowData.unitDesc} of {rowData.packagingDesc}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography variant="subtitle1">
                                  Price: <b> &#8377; {rowData.sellingPrice}</b>
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            md
                            sm={12}
                            xs={12}
                            style={{ textAlign: "right" }}
                          >
                            <Hidden smUp>
                              <Typography variant="body2">
                                <b>Estimated Delivery: </b>
                              </Typography>
                            </Hidden>
                            <Typography variant="body2">
                              {moment().add(3, "days").format("Do, MMM")}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Grid item md={4} xs={12} sm={12}>
                  <Card style={{ marginTop: 0, marginBottom: 0 }}>
                    <CardBody>
                      <Typography variant="h6" style={{ paddingBottom: 20 }}>
                        Summary
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item md={7} xs={7} sm={7}>
                          <Typography variant="body2">Order Total</Typography>
                        </Grid>
                        <Grid
                          item
                          md={5}
                          xs={5}
                          sm={5}
                          style={{ textAlign: "right" }}
                        >
                          <Typography variant="body2">
                            &#8377; {addCommas(orderDetails.bagTotal)}
                          </Typography>
                        </Grid>
                        <Grid item md={7} xs={7} sm={7}>
                          <Typography variant="body2">
                            Shipping Charges
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          md={5}
                          xs={5}
                          sm={5}
                          style={{ textAlign: "right" }}
                        >
                          <Typography variant="body2">
                            &#8377; {orderDetails.shippingCharge}
                          </Typography>
                        </Grid>
                        <Grid item md={12} xs={12} sm={12}>
                          <hr />
                        </Grid>
                        <Grid item xs={7} sm={7}>
                          <Typography variant="subtitle2">
                            Amount Paid
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          md
                          xs={5}
                          sm={5}
                          style={{ textAlign: "right" }}
                        >
                          <Typography variant="subtitle2">
                            &#8377;{" "}
                            <span style={{ fontWeight: 600 }}>
                              {addCommas(orderDetails.orderTotal)}
                            </span>
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardBody>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
