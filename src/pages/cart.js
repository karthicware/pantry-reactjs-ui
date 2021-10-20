import React from "react";
// nodejs library that concatenates classes
import PropTypes from "prop-types";
import classNames from "classnames";

// react components for routing our app without refresh
import Link from "next/link";
import Router from "next/router";
import axios from "axios";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MuiLink from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import MuiButton from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import { Alert, AlertTitle } from "@material-ui/lab";

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
import CardBody from "components/Card/CardBody.js";
import Muted from "components/Typography/Muted.js";
import Backdrop from "components/Backdrop/CustomBackdrop";
import AppHeader from "components/AppHeader/AppHeader.js";

import {
  roseColor,
  grayColor,
  primaryColor,
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
import AddressText from "pages-sections/Address/AddressText.js";

import { addCommas, handleError } from "utils/util.js";

const useStyles = makeStyles((theme) => ({
  ...shoppingCartStyle,
  main: {
    backgroundColor: "#FFF",
  },
  container: {
    ...container,
    marginTop: 20,
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
  prodName: {
    textTransform: "capitalize",
  },
  addMoreWishList: {
    fontSize: "14px",
    color: "rgba(0, 0, 0, 0.87)",
  },
  originalPrice: {
    textDecoration: "line-through",
    marginRight: 10,
  },
  priceColumn: {
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
  },
  mrpLabel: {
    fontSize: ".8rem",
  },
  addMoreWishListContainer: {
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
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
  heading: {
    display: "flex",
  },
  inactivatedAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: 10,
    backgroundColor: "#FFF",
    border: "1px solid #bdbdbd",
    color: "#bdbdbd",
    fontSize: 16,
  },
  activeAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: 10,
    backgroundColor: "#FFF",
    border: `1px solid ${successColor[0]}`,
    color: successColor[0],
  },
  completedAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: 10,
    backgroundColor: successColor[0],
  },
  offerTagRoot: {
    width: 60,
    height: "18px",
    fontSize: 12,
    fontWeight: 600,
    position: "absolute",
    zIndex: 99,
    backgroundColor: successColor[0],
    color: "#FFF",
  },
  offerTag: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

function ShoppingCartPage({ deptList }) {
  const classes = useStyles();
  const [blocking, setBlocking] = React.useState(false);
  const [expanded, setExpanded] = React.useState("panel1");

  const [outOfStockItems, setOutOfStockItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [noOfItems, setNoOfItems] = React.useState(0);
  const [bagTotal, setBagTotal] = React.useState(0);
  const [bagDiscount, setBagDiscount] = React.useState(0);
  const [subTotal, setSubTotal] = React.useState(0);
  const [deliveryCharges, setDeliveryCharges] = React.useState(0);
  const [finalAmount, setFinalAmount] = React.useState(0);

  const [deliveryAddress, setDeliveryAddress] = React.useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    if (panel === "panel3" && !deliveryAddress) return false;
    setExpanded(isExpanded ? panel : expanded === panel ? panel : false);
  };

  const loadCartData = () => {
    setBlocking(true);
    axios
      .get(`/api/v1/cart/`)
      .then((resp) => {
        setBlocking(false);
        const result = resp.data.result;
        const error = resp.data.error;
        setCartItems(result.cartItems);
        setNoOfItems(result.noOfItems);
        setBagTotal(result.bagTotal);
        setBagDiscount(result.bagDiscount);
        setSubTotal(result.subTotal);
        setDeliveryCharges(result.deliveryCharges);
        setFinalAmount(result.finalAmount);
        if (error) {
          if (error.attributes["OUT_OF_STOCK"]) {
            setOutOfStockItems(error.attributes["OUT_OF_STOCK"]);
          }
        } else {
          setOutOfStockItems([]);
        }
      })
      .catch((error) => {
        setBlocking(false);
        console.log(error);
      });
  };

  React.useEffect(() => {
    const fetchData = () => {
      loadCartData();
    };
    fetchData();
    return function cleanup() {};
  }, []);

  const removeAllUnAvailableItemsFromCart = () => {
    setBlocking(true);
    axios
      .delete("/api/v1/cart/all-unavailable")
      .then((resp) => {
        loadCartData();
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        setBlocking(false);
      });
  };

  const moveToWishlist = (prodCode) => {
    /*  setBlocking(true);
    axios
      .delete(`/api/v1/wishlist/${prodCode}/move-to-cart`)
      .then((resp) => {
        setBlocking(false);
        loadCartData();
      })
      .catch((error) => {
        setBlocking(false);
        console.log(error);
      }); */
  };

  const handleUpdateItemToCart = (skuCode, qty) => {
    setBlocking(true);
    axios
      .put(`api/v1/cart/${skuCode}?qty=${qty}`)
      .then((resp) => {
        setBlocking(false);
        loadCartData();
      })
      .catch((error) => {
        setBlocking(false);
        console.log(error);
      });
  };

  const renderImportantMessages = () => {
    return (
      <Alert severity="warning">
        <AlertTitle>Important messages for items in your Cart:</AlertTitle>
        <Typography variant="body2" style={{ marginBottom: 10 }}>
          Some item(s) in your cart are out of stock. Please remove them to
          proceed.
        </Typography>
        {outOfStockItems.map((ele) => (
          <li key={ele.skuCode}>
            <Link
              href={`/p/[deptNameSlug]/[prodNameSlug]/[pidSlug]`}
              as={`/p/${ele.deptSeoUrl}/${ele.prodSeoUrl}/${ele.prodId}`}
            >
              <a>
                <MuiLink>{ele.prodName}</MuiLink>
              </a>
            </Link>
          </li>
        ))}
        <MuiButton
          color="secondary"
          size="small"
          style={{ marginTop: 20 }}
          variant="outlined"
          onClick={() => removeAllUnAvailableItemsFromCart()}
        >
          REMOVE ITEM(S)
        </MuiButton>
      </Alert>
    );
  };

  const renderCartItems = () => {
    return (
      <Card plain style={{ margin: 0 }}>
        <CardBody style={{ padding: 0 }}>
          {cartItems.map((rowData, i) => (
            <Fade in={true} key={i} timeout={1000}>
              <Paper elevation={0}>
                <GridContainer className={classes.rowContainer} spacing={0}>
                  <GridItem md={3}>
                    <Chip
                      label={rowData.discPerc + "% OFF"}
                      classes={{
                        root: classes.offerTagRoot,
                        label: classes.offerTag,
                      }}
                    />
                    <div
                      className={classes.imgContainer}
                      style={{ margin: "auto" }}
                    >
                      <img
                        src={rowData.defaultImgXs}
                        alt="..."
                        className={classes.img}
                      />
                    </div>
                  </GridItem>

                  <GridItem md={9}>
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                      fontWeight="fontWeightLight"
                    >
                      <div>
                        <Typography
                          variant="subtitle1"
                          className={classes.prodName}
                        >
                          {rowData.prodName}
                        </Typography>
                        <Typography variant="subtitle1">
                          {rowData.unitDesc}
                        </Typography>
                      </div>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          justIcon
                          round
                          size="sm"
                          style={{
                            border: `1px solid ${primaryColor[0]}`,
                            backgroundColor: "#FFF",
                          }}
                          onClick={() =>
                            handleUpdateItemToCart(
                              rowData.skuCode,
                              rowData.qty + 1
                            )
                          }
                        >
                          <AddRoundedIcon style={{ color: primaryColor[0] }} />
                        </Button>
                        <Typography variant="body1" style={{ padding: 15 }}>
                          {rowData.qty}
                        </Typography>
                        <Button
                          justIcon
                          round
                          size="sm"
                          style={{
                            border: `1px solid ${primaryColor[0]}`,
                            backgroundColor: "#FFF",
                          }}
                          onClick={() =>
                            handleUpdateItemToCart(
                              rowData.skuCode,
                              rowData.qty - 1
                            )
                          }
                        >
                          <RemoveRoundedIcon
                            style={{ color: primaryColor[0] }}
                          />
                        </Button>
                        <Typography
                          variant="subtitle1"
                          style={{ marginLeft: 20, marginRight: 20 }}
                        >
                          x
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          style={{ marginRight: 15 }}
                        >
                          {rowData.sellingPrice}
                        </Typography>
                        <FormLabel
                          classes={{
                            root: classes.originalPrice,
                          }}
                        >
                          {`₹ ${rowData.unitPrice}`}
                        </FormLabel>
                      </div>

                      <div>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          style={{
                            fontWeight: 600,
                            marginTop: 10,
                            marginBottom: 10,
                          }}
                        >
                          &#8377; {rowData.subTotal}
                        </Typography>
                      </div>
                    </Box>
                  </GridItem>
                </GridContainer>
              </Paper>
            </Fade>
          ))}
          <div
            className={classNames(
              classes.rowContainer,
              classes.subtotalContainer
            )}
          >
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ textTransform: "capitalize" }}
            >
              Subtotal ({noOfItems} items): &nbsp;&nbsp;&nbsp;&#8377;{" "}
              <span style={{ fontWeight: 600 }}>{addCommas(subTotal)}</span>
            </Typography>
          </div>
        </CardBody>
      </Card>
    );
  };

  const renderBillDetails = () => {
    return (
      <Card style={{ marginTop: 0 }}>
        <CardBody>
          <GridContainer>
            <GridItem>
              <Typography
                variant="h6"
                style={{
                  paddingTop: 5,
                  paddingBottom: 25,
                  textTransform: "capitalize",
                }}
              >
                Bill Details
              </Typography>
              <GridContainer className={classes.priceDetailsContainer}>
                {/* Bag total */}
                <GridItem md={7}>
                  <Typography variant="body2">MRP Total</Typography>
                </GridItem>
                <GridItem md={5} style={{ textAlign: "right" }}>
                  <Typography variant="body2">
                    &#8377; {addCommas(bagTotal)}
                  </Typography>
                </GridItem>

                {/* Bag Discount */}
                {bagDiscount > 0 && (
                  <>
                    <GridItem md={7}>
                      <Typography variant="body2">MRP Discount (-)</Typography>
                    </GridItem>
                    <GridItem md={5} style={{ textAlign: "right" }}>
                      <Typography variant="body2">
                        &#8377; {addCommas(bagDiscount)}
                      </Typography>
                    </GridItem>
                  </>
                )}

                {/* Order total */}
                <GridItem md={7}>
                  <Typography variant="body2">Order Total</Typography>
                </GridItem>
                <GridItem
                  md={5}
                  style={{
                    textAlign: "right",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">&#8377;&nbsp;</Typography>
                  <Typography variant="body2" className={classes.originalPrice}>
                    {bagTotal}
                  </Typography>
                  <Typography variant="body2">
                    &#8377; {addCommas(subTotal)}
                  </Typography>
                  {/* <p>Rs.{addCommas(subTotal)}</p> */}
                </GridItem>

                {/* Shipping Charges */}
                <GridItem md={7}>
                  <Typography variant="body2">Shipping Charges (+)</Typography>
                </GridItem>
                <GridItem md={5} style={{ textAlign: "right" }}>
                  {deliveryCharges === 0 ? (
                    <Typography
                      variant="body2"
                      style={{ color: successColor[0] }}
                    >
                      FREE
                    </Typography>
                  ) : (
                    <Typography variant="body2">
                      &#8377; {deliveryCharges}
                    </Typography>
                  )}
                </GridItem>

                {/* Total */}
                <GridItem md={12}>
                  <div
                    style={{
                      borderTop: "1px solid #DDD",
                      marginTop: 10,
                      paddingTop: 10,
                    }}
                  >
                    <GridContainer>
                      <GridItem md={7}>
                        <Typography variant="subtitle2">
                          Final Amount
                        </Typography>
                      </GridItem>
                      <GridItem md={5} style={{ textAlign: "right" }}>
                        <Typography variant="subtitle2">
                          &#8377;{" "}
                          <span style={{ fontWeight: 600 }}>{finalAmount}</span>
                        </Typography>
                      </GridItem>
                    </GridContainer>
                  </div>
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem style={{ textAlign: "center", marginTop: "2rem" }}>
              {expanded === "panel1" && (
                <Button
                  block
                  color={outOfStockItems.length > 0 ? "default" : "primary"}
                  disabled={outOfStockItems.length > 0}
                  onClick={() => setExpanded("panel2")}
                >
                  <Typography
                    variant="button"
                    style={{
                      textTransform: "capitalize",
                      color: "#FFF",
                    }}
                  >
                    Proceed to shipping
                  </Typography>
                </Button>
              )}
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    );
  };

  const renderAddressDetails = () => {
    const a = deliveryAddress;
    return (
      <Card>
        <CardBody>
          <GridContainer>
            <GridItem>
              <Typography
                variant="h6"
                style={{
                  paddingTop: 5,
                  paddingBottom: 25,
                  textTransform: "capitalize",
                }}
              >
                Delivery Details
              </Typography>
              <GridContainer>
                <GridItem>
                  <AddressText
                    name={a.name}
                    houseNo={a.houseNo}
                    address={a.address}
                    city={a.city}
                    state={a.state}
                    pincode={a.pincode}
                    mobile={a.mobile}
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    );
  };

  const emptyCart = (
    <AppHeader deptList={deptList}>
      <div className={classNames(classes.main)}>
        <GridContainer spacing={10} style={{ width: "100%" }}>
          <GridItem style={{ padding: 200, textAlign: "center" }}>
            <Typography variant="h4">Your Cart</Typography>
            <div style={{ marginBottom: 40 }}>
              <Typography variant="body2">
                Your cart is currently empty
              </Typography>
            </div>
            <Button
              color="primary"
              className={classes.navButton}
              onClick={() => Router.push("/")}
            >
              Continue Shopping <ArrowRightAltIcon />
            </Button>
          </GridItem>
        </GridContainer>
        <FooterPage />
      </div>
    </AppHeader>
  );

  if (cartItems.length <= 0 && !deliveryAddress) {
    if (blocking) return null;
    else return emptyCart;
  }

  return (
    <div>
      <Backdrop open={blocking} />
      <div className={classNames(classes.main, classes.sectionGray)}>
        <CartStepper activeStep={deliveryAddress ? 2 : 0} />
        <div className={classes.container}>
          <GridContainer>
            <GridItem md={8}>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar className={classes.completedAvatar}>
                      <CheckIcon />
                    </Avatar>
                    <Typography variant="h6">Order Summary</Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    {outOfStockItems.length > 0 && (
                      <Grid item md={12}>
                        {renderImportantMessages()}
                      </Grid>
                    )}
                    <Grid item md={12}>
                      {renderCartItems()}
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                disabled={outOfStockItems.length > 0}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      className={
                        deliveryAddress
                          ? classes.completedAvatar
                          : expanded === "panel2"
                          ? classes.activeAvatar
                          : classes.inactivatedAvatar
                      }
                    >
                      {deliveryAddress ? <CheckIcon /> : 2}
                    </Avatar>
                    <Typography variant="h6">Delivery Address</Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  {/* load when accordion selected also delivery address should be picked */}
                  {expanded === "panel2" && (
                    <StepDeliveryAddress
                      onSelectAddress={(addressDetail) => {
                        setDeliveryAddress(addressDetail);
                        setExpanded("panel3");
                      }}
                    />
                  )}
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel3" && deliveryAddress}
                disabled={outOfStockItems.length > 0}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      className={
                        expanded === "panel3"
                          ? classes.activeAvatar
                          : classes.inactivatedAvatar
                      }
                    >
                      3
                    </Avatar>
                    <Typography variant="h6">Payment</Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  {deliveryAddress && (
                    <StepPayment deliveryAddressId={deliveryAddress.id} />
                  )}
                </AccordionDetails>
              </Accordion>
              <Card plain>
                <Typography className={classes.continueShopping}>
                  <Link href="/">
                    <MuiButton
                      color="primary"
                      style={{
                        textTransform: "capitalize",
                        fontSize: 16,
                        fontWeight: 600,
                      }}
                    >
                      Continue Shopping
                    </MuiButton>
                  </Link>
                </Typography>
              </Card>
            </GridItem>
            <GridItem md={4}>
              {renderBillDetails()}
              {deliveryAddress && renderAddressDetails()}
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

ShoppingCartPage.propTypes = {
  deptList: PropTypes.array.isRequired,
};

export async function getStaticProps() {
  const axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL,
    responseType: "json",
  });

  const res = await axiosInstance.get("/api/v1/department/");
  const deptList = res.data.result;

  return {
    props: {
      deptList,
    },
  };
}

export default ShoppingCartPage;
