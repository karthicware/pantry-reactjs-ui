import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

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
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// @material-ui/icons
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
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
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import Backdrop from "components/Backdrop/CustomBackdrop";
import { container, successColor } from "assets/jss/material-kit-pro-react.js";
import { AppContext } from "AppContext.js";

//styles
import featuresStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/featuresStyle.js";
import productsStyle from "assets/jss/material-kit-pro-react/views/ecommerceSections/productsStyle.js";
import imagesStyles from "assets/jss/material-kit-pro-react/imagesStyles.js";
import { primaryColor } from "assets/jss/material-kit-pro-react.js";

import SectionLeftSideFilter from "pages-sections/EcommercePage/SectionLeftSideFilter.js";
import SignupOrSigninModal from "pages-sections/Login/SignupOrSignin.js";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  ...featuresStyle,
  ...productsStyle,
  ...imagesStyles,
  content: {
    flexGrow: 1,
    //padding: theme.spacing(3),
    paddingLeft: 240,
    marginTop: 60,
    borderLeft: "1px solid #dfdfdf",
    borderRight: "1px solid #dfdfdf",
    borderTop: "1px solid #dfdfdf",
    minHeight: "calc(100vh)",
  },
  container: {
    ...container,
    backgroundColor: "#FFF",
    minHeight: "calc(100vh)",
    paddingLeft: 0,
    paddingRight: 0,
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(1),
      width: "unset",
      padding: 0,
    },
  },
  containerWrapper: {
    /*  [theme.breakpoints.up("sm")]: {
      display: "flex",
    }, */
  },
  originalPriceInSelectBox: {
    textDecoration: "line-through",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  originalPrice: {
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 10,
    marginBottom: 10,
    textAlign: "left",
    fontSize: 14,
    color: "#777",
    textDecoration: "line-through",
    marginRight: theme.spacing(1),
  },
  sellingPrice: {
    textTransform: "capitalize",
    lineHeight: "initial",
    fontWeight: 600,
    marginBottom: 0,
  },
  cartQtyText: {
    fontSize: 14,
    color: "#777",
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
    height: 45,
    "-webkit-box-orient": "vertical",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  variantDesc: {
    fontSize: 13,
    color: "#777",
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
  softRiseShadowStyle: ({ inactive }) => ({
    textAlign: "center",
    padding: 10,
    transition: "0.3s",
    ...(!inactive && {
      "&:hover": {
        transform: "translateY(-5px)",
      },
    }),
  }),
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

export default function SectionProductListing({
  deptDetail,
  categories,
  catgDetail,
  subCatgDetail,
  productList,
  bannerUrl,
}) {
  const classes = useStyles();
  const [products, setProducts] = React.useState([]);
  const [toggleLoginModalValue, setToggleLoginModalValue] = React.useState(
    false
  );
  const [sortBy, setSortBy] = React.useState(null);
  const [openVariantSelectBox, setOpenVariantSelectBox] = React.useState(null);
  const [blocking, setBlocking] = React.useState(false);
  //const [hideOnScroll, setHideOnScroll] = React.useState(false);

  //authentication
  const context = React.useContext(AppContext);
  //const isAuthenticated = context.isAuthenticated;

  //snackbar
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [severity, setSeverity] = React.useState(null);
  const [message, setMessage] = React.useState(null);

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
          alert(JSON.stringify("error=" + error));
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
          alert(JSON.stringify("error=" + error));
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
          alert(JSON.stringify("error=" + error));
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

  const showSnackbar = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleHideSnackbar = (event) => {
    setOpenSnackbar(false);
  };

  const addProductToWishlist = (prodId) => {
    if (!context.isAuthenticated) {
      setToggleLoginModalValue(true);
      return false;
    }
    axios
      .post(`api/v1/wishlist/${prodId}`)
      .then((resp) => {
        const this_products = [...products];
        this_products
          .filter((p) => p.prodId === prodId)
          .forEach((p) => (p.wishlisted = true));
        setProducts(this_products);
        showSnackbar("Added to wishlist!", "success");
      })
      .catch((error) => {
        //handleError(error);
      });
  };

  const removeProductFromWishlist = (prodId) => {
    axios
      .delete(`api/v1/wishlist/${prodId}`)
      .then((resp) => {
        const this_products = [...products];
        this_products
          .filter((p) => p.prodId === prodId)
          .forEach((p) => (p.wishlisted = false));
        setProducts(this_products);
        showSnackbar("Removed from wishlist!", "warning");
      })
      .catch((error) => {
        console.log(error);
      });
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

  /* const handleAddItemToCart = (prodId, skuCode) => {
    if (!context.isAuthenticated) {
      setToggleLoginModalValue(true);
      return false;
    }
    setBlocking(true);
    axios
      .post(`api/v1/cart/${skuCode}`)
      .then((resp) => {
        setBlocking(false);
        context.refreshCartCount();
        if (resp.data.result) {
          const updatedProducts = products.map((p) => {
            if (p.prodId === prodId) {
              const updatedProd = { ...p };
              updatedProd.variants.forEach((v) => {
                if (v.skuCode === skuCode) {
                  v.existInCart = true;
                  v.cartQty = resp.data.result;
                }
              });
              return { ...updatedProd, existInCart: true };
            } else return { ...p };
          });
          setProducts(updatedProducts);
        }
      })
      .catch((error) => {
        setBlocking(false);
        console.log(error);
      });
  }; */

  const handleUpdateItemToCart = (prodId, skuCode, qty) => {
    if (!context.isAuthenticated) {
      setToggleLoginModalValue(true);
      return false;
    }
    setBlocking(true);
    axios
      .put(`api/v1/cart/${skuCode}?qty=${qty}`)
      .then((resp) => {
        setBlocking(false);
        context.refreshCartCount();
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

  /* useScrollPosition(({ prevPos, currPos }) => {
    // console.log(currPos.x);
    // console.log(currPos.y);
    if (currPos.y < 0) {
      setHideOnScroll(true);
    } else if (currPos.y > 0) {
      setHideOnScroll(false);
    }
  }); */

  /* const breadcrumbs = (
    <>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        style={{ paddingTop: 10, paddingBottom: 10 }}
        classes={{
          root: classes.breadcrumbRoot,
          separator: classes.breadcrumbSeparator,
        }}
      >
        <Typography variant="caption">Home</Typography>
        <Typography variant="caption">{deptDetail.deptDesc}</Typography>
        {catgDetail && (
          <Typography variant="caption">{catgDetail.catgDesc}</Typography>
        )}
        {subCatgDetail && (
          <Typography variant="caption">{subCatgDetail.subCatgDesc}</Typography>
        )}
      </Breadcrumbs>
    </>
  ); */

  const showingResultsTitle = (
    <Typography
      color="textPrimary"
      variant="caption"
      style={{ textAlign: "left", marginTop: 10, marginBottom: 10 }}
    >
      Showing {products.length} items
    </Typography>
  );

  const onLoginSuccessHandler = () => {
    setToggleLoginModalValue(false);
  };

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
          <CustomOutlineButton
            size="small"
            className={classes.addToCartBtn}
            onClick={() =>
              handleUpdateItemToCart(
                p.prodId,
                p.variants[p.activeVariantIdx].skuCode,
                1
              )
            }
          >
            Add To Cart
          </CustomOutlineButton>
        );
      }
    }
  };

  return (
    <div className={classes.container}>
      {/* {breadcrumbs} */}
      <Hidden smUp>
        <div style={{ marginTop: 80, marginBottom: 10, paddingLeft: 8 }}>
          {showingResultsTitle}
        </div>
      </Hidden>
      <Backdrop open={blocking} />
      {toggleLoginModalValue && (
        <SignupOrSigninModal
          onCloseModal={() => setToggleLoginModalValue(false)}
          onLoginSuccess={onLoginSuccessHandler}
        />
      )}
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
      <SectionLeftSideFilter
        //hideOnScroll={hideOnScroll}
        categories={categories}
        deptDetail={deptDetail}
        catgDetail={catgDetail}
        subCatgDetail={subCatgDetail}
      />
      <main className={classes.content}>
        <GridContainer style={{ marginLeft: 0, marginRight: 0 }}>
          <Hidden mdDown>
            <GridItem
              style={{
                paddingLeft: 0,
                paddingRight: 0,
                textAlign: "center",
              }}
            >
              <img
                style={{ padding: 5, width: "100%" }}
                src={bannerUrl}
                alt="Card-img-cap"
              />
            </GridItem>
          </Hidden>
          <GridItem style={{ backgroundColor: "#fafafa", margin: 5 }}>
            {renderSortBy()}
          </GridItem>
          <Grid container spacing={0}>
            {products.map((p, idx) => (
              <Grid
                container
                item
                key={idx}
                xs={6}
                sm={6}
                md={3}
                style={{
                  padding: 10,
                  borderLeft:
                    idx === 0 ? "none" : "solid 1px rgba(112,112,112,.38)",
                  borderTop:
                    idx === 0 || idx === 1 || idx === 2 || idx === 3
                      ? "solid 1px rgba(112,112,112,.38)"
                      : "none",
                  borderRight:
                    products.length - 1 === idx
                      ? `${
                          products.length % 4 === 0
                            ? "none"
                            : "solid 1px rgba(112,112,112,.38)"
                        }`
                      : "none",
                  borderBottom: "solid 1px rgba(112,112,112,.38)",
                }}
              >
                <Grid item container spacing={0} style={{ padding: 5 }}>
                  <Grid item md={12} xs={12} sm={12}>
                    <Card plain style={{ marginTop: 0, marginBottom: 0 }}>
                      <Chip
                        label={
                          p.variants[p.activeVariantIdx].discPerc + "% OFF"
                        }
                        classes={{
                          root: classes.offerTagRoot,
                          label: classes.offerTag,
                        }}
                      />
                      <div className={classes.softRiseShadowStyle}>
                        <Link
                          as={`/p/${deptDetail.deptSeoUrl}/${p.prodSeoUrl}/${p.prodId}`}
                          href={"/p/[deptNameSlug]/[prodNameSlug]/[pidSlug]"}
                        >
                          <a>
                            <LazyLoad once height={382}>
                              <img
                                src={
                                  p.variants[p.activeVariantIdx].defaultImgLg
                                }
                                alt="Card-img-cap"
                                style={{
                                  width: "100%",
                                  height: 150,
                                  cursor: "pointer",
                                }}
                              />
                            </LazyLoad>
                          </a>
                        </Link>
                      </div>
                      <CardBody
                        plain
                        style={{
                          paddingTop: 10,
                          paddingLeft: 0,
                          paddinRight: 0,
                          paddingBottom: 0,
                          textAlign: "left",
                        }}
                      >
                        <Typography
                          variant="body1"
                          className={classes.prodName}
                        >
                          {p.prodName}
                        </Typography>
                        <div
                          style={{
                            marginTop: p.variants.length === 1 ? 13 : 10,
                          }}
                        >
                          {p.variants.length === 1 ? (
                            <Muted>
                              <Typography variant="caption">
                                {p.variants[p.activeVariantIdx].unitDesc +
                                  " of " +
                                  p.variants[p.activeVariantIdx].packagingDesc}
                              </Typography>
                            </Muted>
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
                                      className={
                                        classes.originalPriceInSelectBox
                                      }
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
                        </div>
                      </CardBody>
                    </Card>
                  </Grid>
                </Grid>

                <Grid
                  item
                  container
                  alignItems="flex-end"
                  style={{ marginTop: 8, marginBottom: 0, marginLeft: 5 }}
                >
                  <Grid
                    item
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={0}
                  >
                    <Grid item md={6} sm={12} xs={12}>
                      <Grid container alignItems="center">
                        <Box display="flex" flexDirection="column">
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            className={classes.sellingPrice}
                          >
                            {`₹ ${p.variants[p.activeVariantIdx].sellingPrice}`}
                          </Typography>
                          <FormLabel
                            classes={{
                              root: classes.originalPrice,
                            }}
                          >
                            {`₹ ${p.variants[p.activeVariantIdx].unitPrice}`}
                          </FormLabel>
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      md={6}
                      sm={12}
                      xs={12}
                      style={{ textAlign: "right" }}
                    >
                      {renderAddToCartControls(p)}
                    </Grid>
                    <Grid
                      item
                      md={12}
                      style={{
                        paddingTop: 10,
                        textAlign: "left",
                      }}
                    >
                      <Box display="flex" justifyContent="space-between">
                        {p.wishlisted ? (
                          <IconButton
                            style={{ padding: 0 }}
                            aria-label="Wishlisted"
                            onClick={() => removeProductFromWishlist(p.prodId)}
                          >
                            <FavoriteIcon
                              fontSize="small"
                              style={{ color: grey[700] }}
                            />
                          </IconButton>
                        ) : (
                          <IconButton
                            style={{ padding: 0 }}
                            aria-label="Add to my Wishlist"
                            onClick={() => addProductToWishlist(p.prodId)}
                          >
                            <FavoriteBorderOutlinedIcon fontSize="small" />
                          </IconButton>
                        )}
                        <div>
                          {p.variants[p.activeVariantIdx].onlyFewItemsLeft ? (
                            <Typography
                              variant="caption"
                              style={{
                                color: red[500],
                                fontWeight: 700,
                              }}
                            >
                              Only Few Left!
                            </Typography>
                          ) : (
                            <Typography>&nbsp;</Typography>
                          )}
                        </div>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </GridContainer>
      </main>
    </div>
  );
}

SectionProductListing.propTypes = {
  categories: PropTypes.array.isRequired,
  deptDetail: PropTypes.object.isRequired,
  catgDetail: PropTypes.object,
  subCatgDetail: PropTypes.object,
  productList: PropTypes.array.isRequired,
  bannerUrl: PropTypes.string,
};
