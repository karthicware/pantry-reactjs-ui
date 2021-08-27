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

// @material-ui/icons
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";

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

import SectionLeftSideFilter from "pages-sections/EcommercePage/SectionLeftSideFilter.js";
import SignupOrSigninModal from "pages-sections/Login/SignupOrSignin.js";

const useStyles = makeStyles((theme) => ({
  ...featuresStyle,
  ...productsStyle,
  ...imagesStyles,
  container: {
    ...container,
    backgroundColor: "#FFF",
    minHeight: "calc(100vh)",
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(1),
      width: "unset",
      padding: 0,
    },
  },
  containerWrapper: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      //margin: "100px 0",
    },
  },
  originalPrice: {
    paddingLeft: 0,
    paddingRight: 0,
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
    marginTop: 50,
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
}) {
  console.log(`productList=${JSON.stringify(productList)}`);
  const classes = useStyles();
  const context = React.useContext(AppContext);
  const [products, setProducts] = React.useState([]);
  //console.log(`products=${JSON.stringify(products)}`);
  const [toggleLoginModalValue, setToggleLoginModalValue] = React.useState(
    false
  );
  const [blocking, setBlocking] = React.useState(false);
  const [hideOnScroll, setHideOnScroll] = React.useState(false);

  React.useEffect(() => {
    setProducts(productList);
    //return function cleanup() {};
  }, [productList]);

  const getCartQty = async (skuCode) => {
    return await axios.get(`/api/v1/cart/${skuCode}`);
  };

  const handleVariantChange = (prodId, skuCode) => {
    getCartQty(skuCode).then((resp) => {
      console.log(`resp=${JSON.stringify(resp)}`);
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

  const handleAddItemToCart = (prodId, skuCode) => {
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
  };

  const handleUpdateItemToCart = (prodId, skuCode, qty) => {
    setBlocking(true);
    axios
      .put(`api/v1/cart/${skuCode}?qty=${qty}`)
      .then((resp) => {
        setBlocking(false);
        context.refreshCartCount();
        if (resp.data.result >= 0) {
          const updatedProducts = products.map((p) => {
            if (p.prodId === prodId) {
              const updatedProd = { ...p };
              updatedProd.variants.forEach((v) => {
                if (v.skuCode === skuCode) {
                  if (resp.data.result <= 0) {
                    v.existInCart = false;
                    v.cartQty = 0;
                  } else {
                    v.existInCart = true;
                    v.cartQty = resp.data.result;
                  }
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
  };

  useScrollPosition(({ prevPos, currPos }) => {
    // console.log(currPos.x);
    // console.log(currPos.y);
    if (currPos.y < 0) {
      setHideOnScroll(true);
    } else if (currPos.y > 0) {
      setHideOnScroll(false);
    }
  });

  const breadcrumbs = (
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
  );

  const showingResultsTitle = (
    <Typography
      color="textPrimary"
      style={{ textAlign: "left", marginTop: 10, marginBottom: 10 }}
    >
      Showing {products.length} items
    </Typography>
  );

  const onLoginSuccessHandler = () => {
    setToggleLoginModalValue(false);
  };

  return (
    <>
      <Hidden smUp>
        <div style={{ marginTop: 80, marginBottom: 10, paddingLeft: 8 }}>
          {showingResultsTitle}
        </div>
      </Hidden>
      {breadcrumbs}
      <div className={classes.container}>
        <Backdrop open={blocking} />
        {toggleLoginModalValue && (
          <SignupOrSigninModal
            onCloseModal={() => setToggleLoginModalValue(false)}
            onLoginSuccess={onLoginSuccessHandler}
          />
        )}
        {/* Feature 1 START */}
        <div className={classes.containerWrapper}>
          <SectionLeftSideFilter
            hideOnScroll={hideOnScroll}
            categories={categories}
            deptDetail={deptDetail}
            catgDetail={catgDetail}
            subCatgDetail={subCatgDetail}
          />
          <main style={{ flexGrow: 1 }}>
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
                    src={
                      "https://sarees-images-bucket.s3.ap-south-1.amazonaws.com/find_cheapest_prices.jpg"
                    }
                    alt="Card-img-cap"
                  />
                </GridItem>
              </Hidden>
              <GridItem>
                <Hidden mdDown>{showingResultsTitle}</Hidden>
              </GridItem>
              <Grid container spacing={0}>
                {products.map((p, idx) => (
                  <Grid
                    container
                    item
                    key={p.prodId}
                    xs={6}
                    sm={6}
                    md={3}
                    style={{
                      borderLeft: idx === 0 ? "none" : "1px solid #EEE",
                      borderTop:
                        idx === 0 || idx === 1 || idx === 2 || idx === 3
                          ? "1px solid #EEE"
                          : "none",
                      borderRight:
                        products.length - 1 === idx
                          ? `${
                              products.length % 4 === 0
                                ? "none"
                                : "1px solid #EEE"
                            }`
                          : "none",
                      borderBottom: "1px solid #EEE",
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
                              as={`/p/${p.deptSeoUrl}/${p.prodSeoUrl}/${p.prodId}`}
                              href="/p/[deptNameSlug]/[prodNameSlug]/[pidSlug]"
                            >
                              <a>
                                <LazyLoad once height={382}>
                                  <img
                                    src={
                                      p.variants[p.activeVariantIdx].defaultImg
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
                                      p.variants[p.activeVariantIdx]
                                        .packagingDesc}
                                  </Typography>
                                </Muted>
                              ) : (
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={p.variants[p.activeVariantIdx].skuCode}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      p.prodId,
                                      e.target.value
                                    )
                                  }
                                  style={{ color: "#6c757d" }}
                                >
                                  {p.variants.map((v) => (
                                    <MenuItem key={v.skuCode} value={v.skuCode}>
                                      <Typography variant="caption">{`${v.unitDesc} of ${v.packagingDesc} - ₹ ${v.sellingPrice}`}</Typography>
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
                      style={{ margin: 8 }}
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
                            <Grid item>
                              <FormLabel
                                classes={{
                                  root: classes.originalPrice,
                                }}
                              >
                                {`₹ ${
                                  p.variants[p.activeVariantIdx].unitPrice
                                }`}
                              </FormLabel>
                            </Grid>
                            <Grid item>
                              <Typography
                                variant="subtitle1"
                                gutterBottom
                                className={classes.sellingPrice}
                              >
                                {`₹ ${
                                  p.variants[p.activeVariantIdx].sellingPrice
                                }`}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item md={6} sm={12} xs={12}>
                          {p.variants[p.activeVariantIdx].existInCart ? (
                            <div className={classes.cartQtyBtnWrapper}>
                              <CustomButton
                                justIcon
                                round
                                color="warning"
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
                                color="warning"
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
                                <RemoveRoundedIcon
                                  style={{ color: "#FFFFFF" }}
                                />
                              </CustomButton>
                            </div>
                          ) : (
                            <CustomOutlineButton
                              size="small"
                              className={classes.addToCartBtn}
                              onClick={() =>
                                handleAddItemToCart(
                                  p.prodId,
                                  p.variants[p.activeVariantIdx].skuCode
                                )
                              }
                            >
                              Add To Cart
                            </CustomOutlineButton>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </GridContainer>
          </main>
        </div>
      </div>
    </>
  );
}

SectionProductListing.propTypes = {
  categories: PropTypes.array.isRequired,
  deptDetail: PropTypes.object.isRequired,
  catgDetail: PropTypes.object,
  subCatgDetail: PropTypes.object,
  productList: PropTypes.array.isRequired,
};
