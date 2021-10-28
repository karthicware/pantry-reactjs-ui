import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Router from "next/router";

//other components
import LazyLoad from "react-lazyload";
import axios from "axios";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { FormLabel, Hidden } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import { red, grey } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// @material-ui/icons
import AddIcon from "@material-ui/icons/AddRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import DoneIcon from "@material-ui/icons/Done";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";

// core components
import CustomButton from "components/CustomButtons/Button.js";
import CustomOutlineButton from "components/CustomButtons/CustomOutlineButton.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Muted from "components/Typography/Muted.js";

import Chip from "@material-ui/core/Chip";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";

import Backdrop from "components/Backdrop/CustomBackdrop";
import { successColor, grayColor } from "assets/jss/material-kit-pro-react.js";

//styles
import featuresStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/featuresStyle.js";
import productsStyle from "assets/jss/material-kit-pro-react/views/ecommerceSections/productsStyle.js";
import imagesStyles from "assets/jss/material-kit-pro-react/imagesStyles.js";
import { primaryColor } from "assets/jss/material-kit-pro-react.js";
import { callParent } from "utils/util.js";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  ...featuresStyle,
  ...productsStyle,
  ...imagesStyles,
  root: {
    flexGrow: 1,
    width: "100%",
  },
  appBar: {
    backgroundColor: "#fff",
  },
  container: {
    marginTop: 50,
    backgroundColor: "#FFF",
    width: "unset",
    padding: 0,
  },
  content: {
    backgroundColor: "#FFF",
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
  },
  tabIndicator: {
    backgroundColor: primaryColor[0],
  },
  originalPriceInSelectBox: {
    textDecoration: "line-through",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  originalPrice: {
    textAlign: "left",
    color: grayColor[7],
    textDecoration: "line-through",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    fontFamily: "Roboto Slab, Times New Roman, serif !important",
  },
  sellingPrice: {
    textTransform: "capitalize",
    fontWeight: 600,
    marginBottom: 0,
  },
  cartQtyText: {
    fontSize: 14,
    color: grayColor[7],
    paddingLeft: 15,
    paddingRight: 15,
  },
  addToCartBtn: {
    [theme.breakpoints.up("sm")]: {
      borderRadius: 68,
      width: 90,
    },
    [theme.breakpoints.down("md")]: {
      borderRadius: 0,
      width: "100%",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  cartQtyBtnWrapper: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    [theme.breakpoints.up("sm")]: {
      justifyContent: "flex-end",
    },
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  prodName: {
    color: grayColor[7],
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  priceBox: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  variantDesc: {
    fontSize: 13,
    color: grayColor[7],
    fontWeight: 400,
    marginTop: 10,
    marginBottom: 5,
  },
  backdrop: {
    zIndex: 99,
    color: "#fff",
  },
  filterLabel: {
    ...productsStyle.label,
    fontWeight: 300,
  },
  offerTagRoot: {
    width: 70,
    height: "22px",
    fontSize: 12,
    fontWeight: 600,
    color: "#FFF",
    border: `1px solid ${successColor[0]}`,
    backgroundColor: "#FFF",
    borderRadius: 4,
  },
  offerTag: {
    paddingLeft: 0,
    paddingRight: 0,
    color: successColor[0],
  },
  softRiseShadowStyle: {
    textAlign: "center",
    padding: 10,
  },
  breadcrumbRoot: {
    marginLeft: 5,
  },
  breadcrumbSeparator: {
    marginLeft: 0,
    marginRight: 0,
  },
  itemCard: {
    marginTop: theme.spacing(0),
    padding: 10,
    marginBottom: theme.spacing(0),
    borderRadius: 0,
  },
}));

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

export default function SectionProductListing({
  deptDetail,
  catgId,
  categories,
  productList,
  bannerUrl,
  fromLink,
}) {
  const classes = useStyles();
  const [products, setProducts] = React.useState([]);
  const [sortBy, setSortBy] = React.useState(null);
  const [openVariantSelectBox, setOpenVariantSelectBox] = React.useState(null);
  const [blocking, setBlocking] = React.useState(false);

  //snackbar
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [severity, setSeverity] = React.useState(null);
  const [message, setMessage] = React.useState(null);

  const selectedTabIdx = categories.findIndex(
    (c) => parseInt(c.catgId) === parseInt(catgId)
  );

  React.useEffect(() => {
    setProducts([...productList]);
  }, [productList]);

  React.useEffect(() => {
    const fetchMyProducts = () => {
      axios
        .get(`/api/v1/cart/my-wished-and-cart-products`)
        .then((response) => {
          if (response.data.result) {
            const this_products = [...products];
            const wishedProducts = response.data.result.wishedProducts;
            const skuCodesInCart = response.data.result.skuCodesInCart;

            //set wished products
            if (wishedProducts && wishedProducts.length > 0) {
              wishedProducts.forEach((prodId) => {
                this_products
                  .filter((p) => p.prodId === prodId)
                  .forEach((p) => (p.wishlisted = true));
              });
            }

            //set cart item and its qty
            if (skuCodesInCart) {
              this_products.forEach((product) => {
                product.variants.forEach((variant, idx) => {
                  if (skuCodesInCart[variant.skuCode]) {
                    variant.existInCart = true;
                    variant.cartQty = skuCodesInCart[variant.skuCode];
                    product.activeVariantIdx = idx;
                  } else {
                    variant.existInCart = false;
                  }
                });
              });
            } //if
          }
        })
        .catch((error) => {
          //alert(JSON.stringify("error=" + error));
        });
    };
    if (products.length > 0) fetchMyProducts();
    return function cleanup() {};
  }, []);

  React.useEffect(() => {
    const fetchOutOfStockProducts = () => {
      axios
        .get(`/api/v1/product/out-of-stocks`)
        .then((response) => {
          const skuCodes = response.data.result;
          const this_products = [...products];
          this_products.forEach((p) => {
            p.variants.forEach((v) => {
              skuCodes.forEach((skuCode) => {
                if (v.skuCode === skuCode) {
                  v["stockAvailable"] = false;
                }
              });
            });
          });
          //console.log(`this_products=${JSON.stringify(this_products)}`);
          setActiveVariantIdxToAll(this_products);
          //setProducts(this_products);
        })
        .catch((error) => {
          //alert(JSON.stringify("error=" + error));
        });
    };
    if (products.length > 0) fetchOutOfStockProducts();
    return function cleanup() {};
  }, []);

  React.useEffect(() => {
    const fetchFewerItemsLeftProducts = () => {
      axios
        .get(`/api/v1/product/fewer-items-left/`)
        .then((response) => {
          const skuCodes = response.data.result;
          const this_products = [...products];
          skuCodes.forEach((skuCode) => {
            this_products.forEach((product) => {
              product.variants.forEach((variant) => {
                if (variant.skuCode === skuCode) {
                  variant["onlyFewItemsLeft"] = true;
                }
              });
            });
          });
          setProducts(this_products);
        })
        .catch((error) => {
          //alert(JSON.stringify("error=" + error));
        });
    };
    if (products.length > 0) fetchFewerItemsLeftProducts();
    return function cleanup() {};
  }, []);

  const setActiveVariantIdxToAll = (this_products) => {
    this_products.forEach((p) => {
      if (p.variants.length > 1 && !p.variants[0].stockAvailable) {
        const variantIdx = p.variants.findIndex((v) => v.stockAvailable);
        p.activeVariantIdx = variantIdx === -1 ? 0 : variantIdx;
      }
    });
    setProducts(this_products);
  };

  const handleTabChange = (event, newValue) => {
    if (fromLink === "D" || fromLink === "C") {
      const selectedCatg = categories[newValue];
      Router.push(
        `/mobile/${deptDetail.deptSeoUrl}/${selectedCatg.catgSeoUrl}/cid/${deptDetail.deptId}/${selectedCatg.catgId}`
      );
    } else if (fromLink === "S") {
      const selectedCatg = categories[newValue].subCatg;
      Router.push(
        `/mobile/${deptDetail.deptSeoUrl}/${selectedCatg.catgSeoUrl}/cid/${deptDetail.deptId}/${selectedCatg.catgId}`
      );
    }
  };

  const showSnackbar = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleHideSnackbar = (event) => {
    setOpenSnackbar(false);
  };

  const getCartQty = async (skuCode) => {
    return await axios.get(`/api/v1/cart/${skuCode}`);
  };

  const handleVariantChange = (prodId, skuCode) => {
    getCartQty(skuCode).then((resp) => {
      //console.log(`resp=${JSON.stringify(resp)}`);
      const cartQty = resp.data.result.cart.qty;
      //go to product
      let updatedProducts = products.map((p, idx) => {
        if (p.prodId === prodId) {
          let activeVariantIdx = 0;
          const variants = p.variants.map((v, vIdx) => {
            console.log(`variant loop`);
            if (v.skuCode === skuCode) {
              activeVariantIdx = vIdx;
              return { ...v, existInCart: cartQty > 0, cartQty };
            } else return { ...v };
          });
          return { ...p, activeVariantIdx, variants };
        }
        return { ...p };
      });
      setProducts(updatedProducts);
    });
  };

  const handleUpdateItemToCart = (prodId, skuCode, qty) => {
    setBlocking(true);
    axios
      .put(`api/v1/cart/${skuCode}?qty=${qty}`)
      .then((resp) => {
        setBlocking(false);
        //refresh cart count
        if (!resp.data.error) {
          const this_products = [...products];
          const variant = this_products
            .find((p) => p.prodId === prodId)
            .variants.find((v) => v.skuCode === skuCode);
          variant.existInCart = resp.data.result > 0 ? true : false;
          variant.cartQty = resp.data.result;
          console.log(`this_products=${JSON.stringify(this_products)}`);
          setProducts(this_products);
        }
      })
      .catch((error) => {
        setBlocking(false);
        console.log(error);
      });
  };

  const showingResultsTitle = (
    <Typography
      variant="caption"
      style={{
        textAlign: "left",
        marginTop: 10,
        marginBottom: 10,
        color: grayColor[7],
      }}
    >
      Showing {products.length} items
    </Typography>
  );

  const onClickSortBy = (sortBy) => {
    if (sortBy === "LOW_TO_HIGH") {
      setProducts([
        ...products.sort(
          (a, b) => a.variants[0].sellingPrice - b.variants[0].sellingPrice
        ),
      ]);
    } else if (sortBy === "HIGH_TO_LOW") {
      setProducts([
        ...products.sort(
          (a, b) => b.variants[0].sellingPrice - a.variants[0].sellingPrice
        ),
      ]);
    } else if (sortBy === "DISCOUNT") {
      setProducts([
        ...products.sort(
          (a, b) => b.variants[0].discPerc - a.variants[0].discPerc
        ),
      ]);
    }
    setSortBy(sortBy);
  };

  const renderSortBy = () => {
    return (
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Hidden mdDown>{showingResultsTitle}</Hidden>
        <div>
          <Typography
            variant="caption"
            style={{ marginLeft: 5, marginRight: 5 }}
          >
            Sort By:
          </Typography>
          <Chip
            label={<Typography variant="caption">Low to High</Typography>}
            clickable
            color="primary"
            onClick={() => onClickSortBy("LOW_TO_HIGH")}
            icon={sortBy === "LOW_TO_HIGH" ? <DoneIcon /> : null}
            variant="outlined"
            size="small"
            style={{ marginLeft: 5, marginRight: 5 }}
          />
          <Chip
            label={<Typography variant="caption">High to Low</Typography>}
            clickable
            color="primary"
            onClick={() => onClickSortBy("HIGH_TO_LOW")}
            icon={sortBy === "HIGH_TO_LOW" ? <DoneIcon /> : null}
            variant="outlined"
            size="small"
            style={{ marginLeft: 5, marginRight: 5 }}
          />
          <Chip
            label={<Typography variant="caption">Discount</Typography>}
            clickable
            color="primary"
            onClick={() => onClickSortBy("DISCOUNT")}
            icon={sortBy === "DISCOUNT" ? <DoneIcon /> : null}
            variant="outlined"
            size="small"
            style={{ marginLeft: 5, marginRight: 5 }}
          />
        </div>
      </Box>
    );
  };

  const renderAddToCartControls = (p) => {
    //console.log(`p=${JSON.stringify(p)}`);
    if (!p.variants[p.activeVariantIdx].stockAvailable) {
      return (
        <Typography
          variant="caption"
          style={{
            color: red[500],
            fontWeight: 700,
          }}
        >
          No stock available
        </Typography>
      );
    } else {
      if (p.variants[p.activeVariantIdx].existInCart) {
        return (
          <div className={classes.cartQtyBtnWrapper}>
            <CustomButton
              justIcon
              round
              color="primary"
              size="sm"
              style={{ marginTop: 0, marginBottom: 0 }}
              onClick={() =>
                handleUpdateItemToCart(
                  p.prodId,
                  p.variants[p.activeVariantIdx].skuCode,
                  p.variants[p.activeVariantIdx].cartQty + 1
                )
              }
            >
              <AddRoundedIcon style={{ color: "#FFFFFF" }} />
            </CustomButton>
            <FormLabel
              classes={{
                root: classes.cartQtyText,
              }}
            >
              {p.variants[p.activeVariantIdx].cartQty}
            </FormLabel>
            <CustomButton
              justIcon
              round
              color="primary"
              size="sm"
              style={{ marginTop: 0, marginBottom: 0 }}
              onClick={() =>
                handleUpdateItemToCart(
                  p.prodId,
                  p.variants[p.activeVariantIdx].skuCode,
                  p.variants[p.activeVariantIdx].cartQty - 1
                )
              }
            >
              <RemoveRoundedIcon style={{ color: "#FFFFFF" }} />
            </CustomButton>
          </div>
        );
      } else {
        return (
          <CustomButton
            color="primary"
            size="sm"
            style={{
              paddingLeft: 18,
              paddingRight: 10,
              paddingTop: 4,
              paddingBottom: 4,
            }}
            onClick={() =>
              handleUpdateItemToCart(
                p.prodId,
                p.variants[p.activeVariantIdx].skuCode,
                1
              )
            }
          >
            <Typography
              variant="button"
              style={{ lineHeight: 1, color: "#FFF" }}
            >
              ADD
            </Typography>{" "}
            {"  "} <AddIcon style={{ marginLeft: 8 }} />
          </CustomButton>
        );
      }
    }
  };

  return (
    <div className={classes.container}>
      <AppBar position="fixed" color="white">
        <Tabs
          value={selectedTabIdx}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          classes={{ indicator: classes.tabIndicator }}
        >
          {categories.map((c, idx) => (
            <Tab
              key={idx}
              label={
                <Typography
                  variant="subtitle2"
                  style={{
                    textTransform: "capitalize",
                    fontWeight: 600,
                  }}
                >
                  {c.name}
                </Typography>
              }
              {...a11yProps(idx)}
            />
          ))}
        </Tabs>
      </AppBar>
      <Backdrop open={blocking} />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleHideSnackbar}
      >
        <Alert onClose={handleHideSnackbar} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <main className={classes.content}>
        <div style={{ marginBottom: 10, paddingLeft: 8 }}>
          {showingResultsTitle}
        </div>
        {products.map((p, idx) => (
          <Card key={idx} style={{ marginTop: 8, marginBottom: 8 }}>
            <CardBody style={{ padding: 0 }}>
              <Grid container>
                <Grid
                  item
                  xs={4}
                  sm={4}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <Box
                    onClick={() => {
                      callParent({
                        screenName: "ProductSpec",
                        pageUrl: `http://pantry.com.s3-website.ap-south-1.amazonaws.com/mobile/p/${deptDetail.deptSeoUrl}/${p.prodSeoUrl}/${p.prodId}`,
                        title: "",
                      });
                    }}
                  >
                    <LazyLoad once height={100}>
                      <img
                        src={p.variants[p.activeVariantIdx].defaultImgLg}
                        alt="Card-img-cap"
                        style={{
                          width: "100%",
                          cursor: "pointer",
                        }}
                      />
                    </LazyLoad>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={8}
                  sm={8}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 10,
                  }}
                >
                  <Box>
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <Typography variant="h6" className={classes.sellingPrice}>
                        {`₹ ${p.variants[p.activeVariantIdx].sellingPrice}`}
                      </Typography>
                      <Typography
                        variant="body1"
                        classes={{
                          root: classes.originalPrice,
                        }}
                      >
                        {`₹ ${p.variants[p.activeVariantIdx].unitPrice}`}
                      </Typography>
                      <Chip
                        label={
                          p.variants[p.activeVariantIdx].discPerc + "% OFF"
                        }
                        classes={{
                          root: classes.offerTagRoot,
                          label: classes.offerTag,
                        }}
                      />
                    </Box>
                    <Typography variant="body1" className={classes.prodName}>
                      {p.prodName}
                    </Typography>
                  </Box>
                  <Box>
                    <Grid container direction="row" alignItems="center">
                      <Grid item sm={6} xs={6}>
                        {p.variants.length === 1 ? (
                          <Typography
                            variant="body1"
                            style={{ color: grayColor[7] }}
                          >
                            {p.variants[p.activeVariantIdx].unitDesc}
                          </Typography>
                        ) : (
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={p.variants[p.activeVariantIdx].skuCode}
                            onChange={(e) =>
                              handleVariantChange(p.prodId, e.target.value)
                            }
                            onOpen={() => setOpenVariantSelectBox(p.prodId)}
                            onClose={() => setOpenVariantSelectBox(null)}
                            style={{ color: "#6c757d" }}
                          >
                            {p.variants.map((v) => (
                              <MenuItem
                                key={v.skuCode}
                                value={v.skuCode}
                                disabled={!v.stockAvailable}
                              >
                                <Typography variant="caption">
                                  {`${v.unitDesc} of ${v.packagingDesc}`} -{" "}
                                  <b>₹ ${v.sellingPrice}</b>
                                  <span
                                    className={classes.originalPriceInSelectBox}
                                  >
                                    {v.unitPrice}
                                  </span>
                                  {openVariantSelectBox === p.prodId &&
                                    !v.stockAvailable && (
                                      <Typography
                                        variant="caption"
                                        style={{ color: red[500] }}
                                      >
                                        {" "}
                                        No stock
                                      </Typography>
                                    )}
                                </Typography>
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      </Grid>
                      <Grid item sm={6} xs={6} style={{ textAlign: "right" }}>
                        {renderAddToCartControls(p)}
                      </Grid>
                      {p.variants[p.activeVariantIdx].onlyFewItemsLeft && (
                        <Grid
                          item
                          sm={12}
                          xs={12}
                          style={{ textAlign: "right" }}
                        >
                          <Typography
                            variant="caption"
                            style={{
                              color: red[500],
                              fontWeight: 700,
                              marginRight: 5,
                            }}
                          >
                            Only Few Left!
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </CardBody>
          </Card>
        ))}
      </main>
    </div>
  );
}

SectionProductListing.propTypes = {
  deptDetail: PropTypes.object.isRequired,
  catgId: PropTypes.string,
  categories: PropTypes.array,
  productList: PropTypes.array.isRequired,
  fromLink: PropTypes.string.isRequired,
};
