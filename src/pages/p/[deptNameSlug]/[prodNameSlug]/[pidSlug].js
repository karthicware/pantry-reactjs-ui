import React from "react";
import PropTypes from "prop-types";

// nodejs library that concatenates classes
import classNames from "classnames";
import { useRouter } from "next/router";
import axios from "axios";

// react component used to create nice image meadia player
import ImageGallery from "react-image-gallery";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Info from "components/Typography/Info.js";
import Muted from "components/Typography/Muted.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Success from "components/Typography/Success.js";
import Danger from "components/Typography/Danger.js";
import CustomOutlineButton from "components/CustomButtons/CustomOutlineButton.js";
import Backdrop from "components/Backdrop/CustomBackdrop";

// @material-ui/core components
import Chip from "@material-ui/core/Chip";
import { Alert, AlertTitle } from "@material-ui/lab";
import MuiButton from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { FormLabel } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Grid from "@material-ui/core/Grid";

// @material-ui/icons
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Favorite from "@material-ui/icons/Favorite";
import DescriptionOutlined from "@material-ui/icons/DescriptionOutlined";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import CheckIcon from "@material-ui/icons/Check";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListAltOutlined from "@material-ui/icons/ListAltOutlined";
import LocalShippingOutlined from "@material-ui/icons/LocalShippingOutlined";

//custom styles
import {
  roseColor,
  whiteColor,
  container,
  successColor,
} from "assets/jss/material-kit-pro-react.js";
import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";
import { primaryColor, grayColor } from "assets/jss/material-kit-pro-react";

//custom components
import HeaderLinks from "components/Header/HeaderLinks.js";
import AppHeader from "components/AppHeader/AppHeader.js";

//pages section
import FooterPage from "pages-sections/FooterPage/FooterPage.js";
import MoreInfoComponent from "pages-sections/EcommercePage/MoreInfo.js";
import YouMayAlsoLike from "pages-sections/EcommercePage/YouMayAlsoLike.js";
import SignupOrSigninModal from "pages-sections/Login/SignupOrSignin.js";

//others
import Indicator from "utils/Indicator.js";
import { AppContext } from "AppContext.js";
import { handleError } from "utils/util";

const useStyles = makeStyles((theme) => ({
  ...productStyle,
  root: {
    width: "100%",
    backgroundColor: "#FFF",
    marginTop: 120,
  },
  container: {
    ...container,
    backgroundColor: whiteColor,
  },
  mainSubContainer: {
    width: "80%",
    margin: "auto",
    paddingBottom: 40,
  },
  offerPrice: {
    ...productStyle.label,
    paddingRight: 10,
    fontSize: "1.5625rem",
    fontWeight: 300,
    color: "#3c4858",
  },
  productMrp: {
    textDecoration: "line-through",
  },
  dashedLine: {
    borderBottom: "1px dashed #DDD",
  },
  specTitle: {
    fontSize: "12px !important",
    opacity: "0.8",
  },
  specDesc: {
    fontSize: "1rem",
  },
  viewMoreLabel: {
    cursor: "pointer",
    color: roseColor[0],
    display: "flex",
    alignItems: "center",
    fontSize: 14,
  },
  titleText: {
    fontWeight: 500,
  },
  prodName: {
    marginTop: 0,
    marginBottom: 0,
    paddingBottom: 10,
    borderBottom: "1px dashed #DDD",
    textTransform: "capitalize",
  },
  prodDescText: {
    marginLeft: 10,
  },
  titleIcon: {
    verticalAlign: "top",
    fontSize: "1.2rem",
  },
  offerTagRoot: {
    width: 80,
    height: "18px",
    fontSize: 12,
    fontWeight: 600,
    padding: 10,
    backgroundColor: successColor[0],
    color: "#FFF",
  },
  offerTag: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  productContainer: {
    "& .image-gallery-slide img": {
      borderRadius: "3px",
      maxWidth: "400px",
      height: "auto",
    },
    "& .image-gallery-swipe": {
      margin: "30px 0px",
      overflow: "hidden",
      width: "100%",
      height: "auto",
      textAlign: "center",
    },
    "& .image-gallery-icon": {
      display: "none",
    },
    // "& .image-gallery-thumbnail": {
    //   width: 'unset'
    // },
    "& .image-gallery-thumbnail-image": {
      width: 90,
    },
    "& .image-gallery-thumbnails": {
      justifyContent: "center",
      display: "inline-flex",
      flexDirection: "column",
    },
  },
  activeSize: {
    color: "#ff9800",
    border: "1px solid #ff9800",
    fontWeight: 600,
  },
  cartQtyText: {
    fontSize: 16,
    color: "#777",
    padding: 15,
  },
}));

//const useStyles = makeStyles(styles);

export default function ProductSpecPage({ deptList, productDetails }) {
  const classes = useStyles();
  const context = React.useContext(AppContext);
  const router = useRouter();

  const [prodId, setProdId] = React.useState(null);
  const [prodDetails, setProdDetails] = React.useState(null);
  const [activeVariant, setActiveVariant] = React.useState(null);
  const [pincode, setPincode] = React.useState(null);
  const [pincodeErrMsg, setPincodeErrMsg] = React.useState(null);
  const [deliveryCharge, setDeliveryCharge] = React.useState(-1);
  const [toggleLoginModalValue, setToggleLoginModalValue] = React.useState(
    false
  );
  const [blocking, setBlocking] = React.useState(false);

  React.useEffect(() => {
    setProdId(productDetails.prodId);
    setProdDetails(productDetails);
    //config carousel
    productDetails.variants.forEach((v) => {
      const images = v.images.map((img) => {
        return {
          original: img.imgUri,
          thumbnail: img.thumbUri,
        };
      });
      v.images = images;
    });
    setActiveVariant({
      ...productDetails.variants[0],
    });
    return function cleanup() {};
  }, [productDetails]);

  const onClickVariant = (idx) => {
    setActiveVariant({
      ...productDetails.variants[idx],
    });
  };

  /* React.useEffect(() => {
    const fetchData = () => {
      axios
        .get(`/api/v1/product/${router.query.prodId}`)
        .then((resp) => {
          const result = resp.data.result;
          setProdDetails(result.productApi);
          setProdId(router.query.prodId);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (router.query.prodId) fetchData();
    return function cleanup() {};
  }, [router]); */

  /* React.useEffect(() => {
    const fetchData = () => {
      setActiveVariantIdx(prodDetails.activeVariantIdx);
    };
    if (prodDetails !== null) fetchData();
    return function cleanup() {};
  }, [prodDetails]); */

  //load active variant details
  /* React.useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          `/api/v1/product/variant/${prodDetails.variants[activeVariantIdx].skuCode}`
        )
        .then((resp) => {
          const result = resp.data.result;
          console.log(`result=${JSON.stringify(result)}`);
          setActiveVariant({
            ...prodDetails.variants[activeVariantIdx],
            existInCart: result.variantApi.existInCart,
            cartQty: result.variantApi.cartQty,
            images: result.variantApi.images.map((img) => {
              return {
                original: img.imgUri,
                thumbnail: img.thumbUri,
              };
            }),
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (activeVariantIdx !== null) fetchData();
    return function cleanup() {};
  }, [activeVariantIdx]); */

  /* const checkPincode = () => {
    setPincodeErrMsg(null);
    setDeliveryCharge(-1);
    axios
      .get(`api/v1/shipment/verify-pincode/${pincode}`)
      .then((resp) => {
        if (resp.data.error) {
          setPincodeErrMsg(resp.data.error.messages[0]);
        } else {
          setDeliveryCharge(resp.data.result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }; */

  const handleAddItemToCart = () => {
    if (!context.isAuthenticated) {
      setToggleLoginModalValue(true);
      return false;
    }
    setBlocking(true);
    axios
      .post(`api/v1/cart/${activeVariant.skuCode}`)
      .then((resp) => {
        setBlocking(false);
        context.refreshCartCount();
        setActiveVariant({
          ...activeVariant,
          existInCart: resp.data.result > 0,
          cartQty: resp.data.result,
        });
      })
      .catch((error) => {
        setBlocking(false);
        console.log(error);
      });
  };

  const handleUpdateItemToCart = (qty) => {
    setBlocking(true);
    axios
      .put(`api/v1/cart/${activeVariant.skuCode}?qty=${qty}`)
      .then((resp) => {
        setBlocking(false);
        context.refreshCartCount();
        setActiveVariant({
          ...activeVariant,
          existInCart: resp.data.result > 0,
          cartQty: resp.data.result,
        });
      })
      .catch((error) => {
        setBlocking(false);
        console.log(error);
      });
  };

  const addItemToWishlist = () => {
    axios
      .post(`api/v1/customer/wishlist/${prodId}`)
      .then((resp) => {
        //setWishlisted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLoginSuccessHandler = () => {
    setToggleLoginModalValue(false);
  };

  const productDetailsText = (text) => {
    return (
      <GridItem md={12} style={{ paddingLeft: 0 }}>
        <Muted>
          <Typography variant="caption">{text}</Typography>
        </Muted>
      </GridItem>
    );
  };

  if (!prodDetails || !activeVariant) return <Indicator />;
  return (
    <AppHeader deptList={deptList}>
      {/* <Header
        color="warning"
        brand="Nammanuts"
        links={<HeaderLinks dropdownHoverColor="info" />}
        appBarStyle={{
          boxShadow: "none",
          borderRadius: 0,
        }}
      /> */}
      <Backdrop open={blocking} />

      <div className={classes.root}>
        {toggleLoginModalValue && (
          <SignupOrSigninModal
            onCloseModal={() => setToggleLoginModalValue(false)}
            onLoginSuccess={onLoginSuccessHandler}
          />
        )}
        <div className={classes.container}>
          <Grid container direction="row" spacing={10}>
            <Grid item md sm>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
                style={{ paddingTop: 10, paddingBottom: 10 }}
                classes={{ separator: classes.breadcrumbSeparator }}
              >
                <Typography variant="caption">Home</Typography>
                <Typography variant="caption">
                  {prodDetails.categoryDesc}
                </Typography>
                {prodDetails.subCategoryDesc && (
                  <Typography variant="caption">
                    {prodDetails.subCategoryDesc}
                  </Typography>
                )}
              </Breadcrumbs>

              <div className={classes.productContainer}>
                <GridContainer spacing={5}>
                  <GridItem>
                    {activeVariant && (
                      <ImageGallery
                        showFullscreenButton={false}
                        showPlayButton={false}
                        thumbnailPosition="left"
                        lazyLoad={true}
                        items={activeVariant.images}
                      />
                    )}
                  </GridItem>
                  <GridItem>
                    <MoreInfoComponent info={prodDetails.otherDetails} />
                  </GridItem>
                </GridContainer>
              </div>
            </Grid>

            <Grid item md sm>
              <GridItem>
                <Chip
                  label={activeVariant.discPerc + " % OFF"}
                  classes={{
                    root: classes.offerTagRoot,
                    label: classes.offerTag,
                  }}
                />
                <Typography variant="h5" className={classes.prodName}>
                  {prodDetails.prodName}
                </Typography>
              </GridItem>
              <GridItem>
                <Typography
                  variant="body1"
                  style={{ marginTop: 20, marginBottom: 10 }}
                >
                  <span style={{ color: "#999" }}>Product MRP: </span>
                  <span className={classes.productMrp}>
                    ₹{activeVariant.unitPrice}
                  </span>
                </Typography>
                <Typography
                  variant="h6"
                  style={{ marginTop: 10, textTransform: "capitalize" }}
                >
                  <span>Selling Price: </span>
                  <span style={{ fontSize: 24, fontWeight: 500 }}>
                    ₹{activeVariant.sellingPrice}
                  </span>
                </Typography>
                <Muted>
                  <Typography variant="caption">
                    (Inclusive of all taxes)
                  </Typography>
                </Muted>
              </GridItem>
              <GridItem style={{ paddingTop: 20 }}>
                <Typography variant="body1" style={{ marginBottom: 10 }}>
                  Available size
                </Typography>
                {prodDetails.variants.map((v, i) => (
                  <MuiButton
                    variant="outlined"
                    key={i}
                    style={{
                      marginRight: 20,
                      textTransform: "lowercase",
                      color:
                        activeVariant.skuCode === v.skuCode
                          ? "#FFF"
                          : grayColor[0],
                      backgroundColor:
                        activeVariant.skuCode === v.skuCode
                          ? primaryColor[0]
                          : "#FFF",
                    }}
                    onClick={() => onClickVariant(i)}
                    classes={{
                      outlinedSecondary: classes.activeSize,
                    }}
                  >
                    {v.unitDesc}
                  </MuiButton>
                ))}
              </GridItem>
              <GridItem
                style={{
                  paddingTop: 30,
                  paddingBottom: 30,
                  borderBottom: "1px dashed #DDD",
                }}
              >
                {activeVariant && activeVariant.existInCart ? (
                  <div
                    style={{ display: "flex", alignItems: "center", flex: 1 }}
                  >
                    <Button
                      justIcon
                      round
                      color="primary"
                      onClick={() =>
                        handleUpdateItemToCart(activeVariant.cartQty + 1)
                      }
                    >
                      <AddRoundedIcon style={{ color: "#FFFFFF" }} />
                    </Button>
                    <FormLabel
                      classes={{
                        root: classes.cartQtyText,
                      }}
                    >
                      {activeVariant.cartQty}
                    </FormLabel>
                    <Button
                      justIcon
                      round
                      color="primary"
                      onClick={() =>
                        handleUpdateItemToCart(activeVariant.cartQty - 1)
                      }
                    >
                      <RemoveRoundedIcon style={{ color: "#FFFFFF" }} />
                    </Button>
                    <Button
                      round
                      color="white"
                      onClick={() => addItemToWishlist()}
                      style={{ marginLeft: 30 }}
                    >
                      <Favorite
                        style={{
                          color: prodDetails.wishlisted
                            ? "inherit"
                            : primaryColor[0],
                        }}
                      />{" "}
                      &nbsp;
                      {prodDetails.wishlisted
                        ? "Wishlisted"
                        : "Add to wishlist"}
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button
                      round
                      color="primary"
                      style={{ marginRight: 20 }}
                      onClick={() => handleAddItemToCart()}
                    >
                      <ShoppingCart /> &nbsp; Add to Cart
                    </Button>
                    <Button
                      round
                      color="white"
                      onClick={() => addItemToWishlist()}
                    >
                      <Favorite
                        style={{
                          color: prodDetails.wishlisted ? roseColor[0] : "none",
                        }}
                      />{" "}
                      &nbsp;
                      {prodDetails.wishlisted
                        ? "Wishlisted"
                        : "Add to wishlist"}
                    </Button>
                  </>
                )}
              </GridItem>
              <GridItem style={{ marginTop: 20 }}>
                <h5 className={classes.titleText}>
                  Delivery Options{" "}
                  <LocalShippingOutlined className={classes.titleIcon} />
                </h5>
                <GridContainer spacing={3} style={{ marginLeft: 0 }}>
                  <GridItem md={12} style={{ paddingLeft: 0 }}>
                    <Alert severity="info">
                      <Typography variant="caption">
                        Currently we deliver only pincode Rajapalayam -{" "}
                        <b>626117</b>
                      </Typography>
                      <br />
                      <Typography variant="caption">
                        Buy min 499.Rs for free delivery
                      </Typography>
                      <br />{" "}
                      <Typography variant="caption">
                        Cash on delivery is available
                      </Typography>
                      <br />{" "}
                      <Typography variant="caption">
                        Order today and get it on next day
                      </Typography>
                    </Alert>
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem style={{ marginTop: 30 }}>
                <h5 className={classes.titleText}>
                  Product Details{" "}
                  <DescriptionOutlined className={classes.titleIcon} />
                </h5>
                {prodDetails.countryOfOrigin &&
                  productDetailsText(
                    `Place of origin: ${prodDetails.countryOfOrigin}`
                  )}
                {productDetailsText(
                  `Package type: ${activeVariant.packagingDesc}`
                )}
                {productDetailsText(`SKU: ${activeVariant.skuCode}`)}
              </GridItem>
            </Grid>
          </Grid>
        </div>
      </div>
      <div
        className={classes.container}
        style={{ backgroundColor: "#EEE", marginTop: 60 }}
      >
        <YouMayAlsoLike
          categoryId={prodDetails.categoryId}
          subCategoryId={prodDetails.subCategoryId}
        />
      </div>
      <FooterPage />
    </AppHeader>
  );
}

ProductSpecPage.propTypes = {
  deptList: PropTypes.array.isRequired,
  productDetails: PropTypes.object.isRequired,
};

//This function gets called at build time
export async function getStaticPaths() {
  //console.log(`all products... getStaticPaths()`);
  let paths = [];
  const res1 = await axios.get(
    `${process.env.API_BASE_URL}/api/v1/department/all`
  );
  const deptList = res1.data;
  //console.log(`deptList = ${JSON.stringify(deptList)}`);

  deptList.map(async (deptApi) => {
    const res2 = await axios.get(
      `${process.env.API_BASE_URL}/api/v1/product/list-products?deptId=${deptApi.deptId}`
    );
    const productList = res2.data.result.productList;
    productList.forEach((p) => {
      paths.push({
        params: {
          deptNameSlug: p.deptNameUrl,
          prodNameSlug: p.prodNameUrl,
          pidSlug: p.prodId,
        },
      }); //paths.push
    }); //productList.forEach
  }); //deptList.map

  //console.log(`paths = ${JSON.stringify(paths)}`);

  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  //console.log("pid ... getStaticProps()");
  const { pidSlug } = params;

  const axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL,
    responseType: "json",
  });

  const res1 = await axiosInstance.get("/api/v1/department/all");
  const deptList = res1.data;

  const res2 = await axiosInstance.get(`/api/v1/product/${pidSlug}`);
  const productDetails = res2.data.result.productApi;
  return {
    props: {
      deptList,
      productDetails,
    },
  };
}
