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
import Box from "@material-ui/core/Box";

// @material-ui/icons
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Favorite from "@material-ui/icons/Favorite";
import DescriptionIcon from "@material-ui/icons/DescriptionOutlined";
import SecurityIcon from "@material-ui/icons/Security";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import ListAltOutlined from "@material-ui/icons/ListAltOutlined";
import LocalShippingOutlined from "@material-ui/icons/LocalShippingOutlined";

//custom styles
import {
  primaryColor,
  roseColor,
  whiteColor,
  container,
  successColor,
  infoColor,
  grayColor,
} from "assets/jss/material-kit-pro-react.js";
import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";

//custom components
import HeaderLinks from "components/Header/HeaderLinks.js";
import AppHeader from "components/AppHeader/AppHeader.js";

//pages section
import FooterPage from "pages-sections/FooterPage/FooterPage.js";
import MoreInfoComponent from "pages-sections/EcommercePage/MoreInfo.js";
//import YouMayAlsoLike from "pages-sections/EcommercePage/YouMayAlsoLike.js";
import SignupOrSigninModal from "pages-sections/Login/SignupOrSignin.js";

//others
import Indicator from "utils/Indicator.js";
import { AppContext } from "AppContext.js";
import { ACCESS_CODE_SAREE } from "utils/constants.js";
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
    color: primaryColor[0],
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
    backgroundColor: successColor[0],
    color: "#FFF",
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

export default function ProductSpecPage({ deptList, productDetailsSlug }) {
  const classes = useStyles();
  const context = React.useContext(AppContext);
  //const router = useRouter();

  const [prodId, setProdId] = React.useState(null);
  const [prodDetails, setProdDetails] = React.useState(null);
  const [activeVariantIdx, setActiveVariantIdx] = React.useState(0);
  /* const [pincode, setPincode] = React.useState(null);
  const [pincodeErrMsg, setPincodeErrMsg] = React.useState(null);
  const [deliveryCharge, setDeliveryCharge] = React.useState(-1); */
  const [toggleLoginModalValue, setToggleLoginModalValue] = React.useState(
    false
  );
  const [
    flagForLoadingCartDataInitially,
    setFlagForLoadingCartDataInitially,
  ] = React.useState(1);
  const [blocking, setBlocking] = React.useState(false);

  React.useEffect(() => {
    const prodDetails = { ...productDetailsSlug };
    //console.log(`prodDetails=${JSON.stringify(prodDetails)}`);

    //config images for carousel
    prodDetails.variants.forEach((v) => {
      const images = v.images.map((img) => {
        return {
          original: img.imgUri,
          thumbnail: img.thumbUri,
        };
      });
      v.images = images;
    });
    setProdId(prodDetails.prodId);
    setProdDetails(prodDetails);
    return function cleanup() {};
  }, []);

  React.useEffect(() => {
    if (prodDetails !== null && flagForLoadingCartDataInitially === 1) {
      loadCartDataForSelectedVariant();
      setFlagForLoadingCartDataInitially(-1);
      return function cleanup() {};
    }
  }, [prodDetails]);

  React.useEffect(() => {
    //console.log(`activeVariantIdx = ${JSON.stringify(activeVariantIdx)}`);
    if (prodDetails !== null) loadCartDataForSelectedVariant();
    //return function cleanup() {};
  }, [activeVariantIdx]);

  const onClickVariant = (idx) => {
    setActiveVariantIdx(idx);
  };

  const loadCartDataForSelectedVariant = () => {
    //console.log(`prodDetails=${JSON.stringify(prodDetails)}`);
    const skuCode = prodDetails.variants[activeVariantIdx].skuCode;
    axios
      .get(`/api/v1/cart/${skuCode}`)
      .then((resp) => {
        if (resp.data.error) {
          alert(resp.data.error.messages[0]);
        } else {
          const cart = resp.data.result.cart;
          /* const thisProdDetails = { ...prodDetails };
          thisProdDetails.variants[activeVariantIdx].existInCart = cart.qty > 0;
          thisProdDetails.variants[activeVariantIdx].cartQty = cart.qty;
          setProdDetails(thisProdDetails); */
          const variants = prodDetails.variants.map((v) => {
            const variant = { ...v };
            if (variant.skuCode === skuCode) {
              variant.existInCart = cart.qty > 0;
              variant.cartQty = cart.qty;
            }
            console.log(`variant=${JSON.stringify(variant)}`);
            return variant;
          });
          console.log(`variants=${JSON.stringify(variants)}`);
          setProdDetails({ ...prodDetails, variants });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateItemToCart = (qty) => {
    if (!context.isAuthenticated) {
      setToggleLoginModalValue(true);
      return false;
    }
    setBlocking(true);
    const activeVariant = prodDetails.variants[activeVariantIdx];
    axios
      .put(`api/v1/cart/${activeVariant.skuCode}?qty=${qty}`)
      .then((resp) => {
        setBlocking(false);
        context.refreshCartCount();
        if (resp.data.error) {
          alert(resp.data.error.messages[0]);
        } else {
          const cartQty = resp.data.result;
          activeVariant.existInCart = cartQty > 0;
          activeVariant.cartQty = cartQty;
        }
      })
      .catch((error) => {
        setBlocking(false);
        console.log(error);
      });
  };

  const addProductToWishlist = () => {
    axios
      .post(`api/v1/wishlist/${prodId}`)
      .then((resp) => {
        setProdDetails({ ...prodDetails, wishlisted: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeProductFromWishlist = () => {
    axios
      .delete(`api/v1/wishlist/${prodId}`)
      .then((resp) => {
        if (!resp.data.error)
          setProdDetails({ ...prodDetails, wishlisted: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLoginSuccessHandler = () => {
    setToggleLoginModalValue(false);
  };

  const renderDeliveryDetails = () => {
    return (
      <>
        <h5 className={classes.titleText}>Delivery Options</h5>
        <GridContainer
          spacing={3}
          style={{
            marginTop: 10,
            marginLeft: 0,
            padding: 10,
            backgroundColor: grayColor[2],
          }}
        >
          <GridItem md={12} style={{ paddingLeft: 0 }}>
            <Box display="flex">
              <LocalShippingOutlined
                style={{ color: primaryColor[5], fontSize: 28 }}
              />

              <Box style={{ marginLeft: 10, marginRight: 10 }}>
                <Typography variant="subtitle2">Free Delivery</Typography>
                <Typography variant="caption">
                  For all oders over Rs.499
                </Typography>
              </Box>
            </Box>
          </GridItem>
          <GridItem md={12} style={{ paddingLeft: 0 }}>
            <Box display="flex">
              <RepeatOneIcon style={{ color: primaryColor[5], fontSize: 28 }} />
              <Box style={{ marginLeft: 10, marginRight: 10 }}>
                <Typography variant="subtitle2">One Day Delivery</Typography>
                <Typography variant="caption">
                  Order today and get it on next day
                </Typography>
              </Box>
            </Box>
          </GridItem>
          <GridItem md={12} style={{ paddingLeft: 0 }}>
            <Box display="flex">
              <KeyboardReturnIcon
                style={{ color: primaryColor[5], fontSize: 28 }}
              />
              <Box style={{ marginLeft: 10, marginRight: 10 }}>
                <Typography variant="subtitle2">24 Hours Return</Typography>
                <Typography variant="caption">
                  If goods have problems
                </Typography>
              </Box>
            </Box>
          </GridItem>
          <GridItem md={12} style={{ paddingLeft: 0 }}>
            <Box display="flex">
              <SecurityIcon style={{ color: primaryColor[5], fontSize: 28 }} />
              <Box style={{ marginLeft: 10, marginRight: 10 }}>
                <Typography variant="subtitle2">Secure Payment</Typography>
                <Typography variant="caption">100% secure payment</Typography>
              </Box>
            </Box>
          </GridItem>
        </GridContainer>
      </>
    );
  };

  const renderProductDetails = () => {
    return (
      <GridContainer>
        <GridItem style={{ marginTop: 30 }}>
          <h5 className={classes.titleText}>
            Product Details <DescriptionIcon className={classes.titleIcon} />
          </h5>
          <Typography variant="body2" className={classes.prodDescText}>
            {prodDetails.prodDesc}
          </Typography>
        </GridItem>
      </GridContainer>
    );
  };

  const renderSareeSpec = () => {
    if (ACCESS_CODE_SAREE === prodDetails.accessCode) {
      const sareeSpec = prodDetails.variants[activeVariantIdx].sareeSpecApi;
      return (
        <GridContainer>
          <GridItem style={{ marginTop: 20 }}>
            <h5 className={classes.titleText}>
              Specifications <ListAltOutlined className={classes.titleIcon} />
            </h5>
          </GridItem>
          <GridItem>
            <GridContainer spacing={3} style={{ marginLeft: 0 }}>
              <GridItem md={6}>
                <Typography variant="caption">Tradition</Typography>
                <Typography variant="body1">
                  {sareeSpec.traditionDesc ? sareeSpec.traditionDesc : "-"}
                </Typography>
                <div className={classes.dashedLine}></div>
              </GridItem>
              <GridItem md={6}>
                <Typography variant="caption">Pattern Type</Typography>
                <Typography variant="body1">
                  {sareeSpec.patternDesc ? sareeSpec.patternDesc : "-"}
                </Typography>
                <div className={classes.dashedLine}></div>
              </GridItem>
              <GridItem md={6}>
                <Typography variant="caption">Saree Material</Typography>
                <Typography variant="body1">
                  {sareeSpec.sareeMaterialDesc
                    ? sareeSpec.sareeMaterialDesc
                    : "-"}
                </Typography>
                <div className={classes.dashedLine}></div>
              </GridItem>
              <GridItem md={6}>
                <Typography variant="caption">Border</Typography>
                <Typography variant="body1">
                  {sareeSpec.borderDesc ? sareeSpec.borderDesc : "-"}
                </Typography>
                <div className={classes.dashedLine}></div>
              </GridItem>
              <GridItem md={6}>
                <Typography variant="caption">Ornamentation</Typography>
                <Typography variant="body1">
                  {sareeSpec.ornamentation ? sareeSpec.ornamentation : "-"}
                </Typography>
                <div className={classes.dashedLine}></div>
              </GridItem>
              <GridItem md={6}>
                <Typography variant="caption">Occasion</Typography>
                <Typography variant="body1">
                  {sareeSpec.occasionDesc ? sareeSpec.occasionDesc : "-"}
                </Typography>
                <div className={classes.dashedLine}></div>
              </GridItem>
              <GridItem md={6}>
                <Typography variant="caption">Weave By</Typography>
                <Typography variant="body1">
                  {sareeSpec.weaveBy ? sareeSpec.weaveBy : "-"}
                </Typography>
                <div className={classes.dashedLine}></div>
              </GridItem>
              <GridItem md={6}>
                <Typography variant="caption">Fabric Care</Typography>
                <Typography variant="body1">
                  {sareeSpec.fabricCare ? sareeSpec.fabricCare : "-"}
                </Typography>
                <div className={classes.dashedLine}></div>
              </GridItem>
              <GridItem md={6}>
                <Typography variant="caption">Saree Length</Typography>
                <Typography variant="body1">
                  {sareeSpec.sareeLength ? sareeSpec.sareeLength : "-"}
                </Typography>
                <div className={classes.dashedLine}></div>
              </GridItem>
              <GridItem md={6}>
                <Typography variant="caption">Saree Weight</Typography>
                <Typography variant="body1">
                  {sareeSpec.sareeWeight ? sareeSpec.sareeWeight : "-"}
                </Typography>
                <div className={classes.dashedLine}></div>
              </GridItem>
              <GridItem md={6}>
                <Typography variant="caption">Blouse Piece</Typography>
                <Typography variant="body1">
                  {sareeSpec.blousePiece ? sareeSpec.blousePiece : "-"}
                </Typography>
                <div className={classes.dashedLine}></div>
              </GridItem>
              <GridItem md={6}>
                <Typography variant="caption">Blouse Material</Typography>
                <Typography variant="body1">
                  {sareeSpec.blouseMaterial ? sareeSpec.blouseMaterial : "-"}
                </Typography>
                <div className={classes.dashedLine}></div>
              </GridItem>
              <GridItem md={6}>
                <Typography variant="caption">Blouse Length</Typography>
                <Typography variant="body1">
                  {sareeSpec.blouseLength ? sareeSpec.blouseLength : "-"}
                </Typography>
                <div className={classes.dashedLine}></div>
              </GridItem>
              {/* <GridItem>
                  <FormLabel className={classes.viewMoreLabel}>
                    <ExpandMore /> &nbsp; View more
                  </FormLabel>
                </GridItem>
                <GridItem>
                  <div className={classes.solidLine}></div>
                </GridItem> */}
            </GridContainer>
          </GridItem>

          <GridItem style={{ marginTop: 20 }}>
            <h5 className={classes.titleText}>Items Included in the Package</h5>
          </GridItem>
          <GridItem style={{ marginTop: 20 }}>
            <GridContainer spacing={3} style={{ marginLeft: 0 }}>
              <GridItem>
                <Typography variant="body2">
                  {sareeSpec.itemsIncludedInThePackage}
                </Typography>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      );
    }
  };

  if (prodDetails === null) return <Indicator />;
  return (
    <AppHeader deptList={deptList}>
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
                    <ImageGallery
                      showFullscreenButton={false}
                      showPlayButton={false}
                      thumbnailPosition="left"
                      lazyLoad={true}
                      items={prodDetails.variants[activeVariantIdx].images}
                    />
                  </GridItem>
                  <GridItem>
                    {/* <MoreInfoComponent info={prodDetails.otherDetails} /> */}
                    {renderProductDetails()}
                    {renderSareeSpec()}
                  </GridItem>
                </GridContainer>
              </div>
            </Grid>

            <Grid item md sm>
              <GridItem>
                <Chip
                  label={
                    prodDetails.variants[activeVariantIdx].discPerc + " % OFF"
                  }
                  classes={{
                    root: classes.offerTagRoot,
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
                    ₹{prodDetails.variants[activeVariantIdx].unitPrice}
                  </span>
                </Typography>
                <Typography
                  variant="h6"
                  style={{ marginTop: 10, textTransform: "capitalize" }}
                >
                  <span>Selling Price: </span>
                  <span style={{ fontSize: 24, fontWeight: 500 }}>
                    ₹{prodDetails.variants[activeVariantIdx].sellingPrice}
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
                        prodDetails.variants[activeVariantIdx].skuCode ===
                        v.skuCode
                          ? "#FFF"
                          : grayColor[0],
                      backgroundColor:
                        prodDetails.variants[activeVariantIdx].skuCode ===
                        v.skuCode
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
                  display: "flex",
                  marginRight: 20,
                }}
              >
                {prodDetails.variants[activeVariantIdx].existInCart ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Button
                      justIcon
                      round
                      color="primary"
                      onClick={() =>
                        handleUpdateItemToCart(
                          prodDetails.variants[activeVariantIdx].cartQty - 1
                        )
                      }
                    >
                      <RemoveRoundedIcon style={{ color: "#FFFFFF" }} />
                    </Button>
                    <FormLabel
                      classes={{
                        root: classes.cartQtyText,
                      }}
                    >
                      {prodDetails.variants[activeVariantIdx].cartQty}
                    </FormLabel>
                    <Button
                      justIcon
                      round
                      color="primary"
                      onClick={() =>
                        handleUpdateItemToCart(
                          prodDetails.variants[activeVariantIdx].cartQty + 1
                        )
                      }
                    >
                      <AddRoundedIcon style={{ color: "#FFFFFF" }} />
                    </Button>
                  </div>
                ) : (
                  <Button
                    round
                    color="primary"
                    style={{ marginRight: 20 }}
                    onClick={() => handleUpdateItemToCart(1)}
                  >
                    <ShoppingCart /> &nbsp; Add to Cart
                  </Button>
                )}
                <Button
                  round
                  color="white"
                  onClick={() => {
                    if (prodDetails.wishlisted) removeProductFromWishlist();
                    else addProductToWishlist();
                  }}
                >
                  <Favorite
                    style={{
                      color: prodDetails.wishlisted ? primaryColor[0] : "none",
                    }}
                  />{" "}
                  &nbsp;
                  {prodDetails.wishlisted ? "Wishlisted" : "Add to wishlist"}
                </Button>
              </GridItem>
              <GridItem style={{ marginTop: 20 }}>
                {renderDeliveryDetails()}
              </GridItem>
              <GridItem style={{ marginTop: 30 }}>
                <h5 className={classes.titleText}>Why Pantry?</h5>
                <Typography variant="subtitle2" style={{ color: infoColor[0] }}>
                  Easy returns and refunds
                </Typography>
                <Typography variant="caption">
                  Return products at doorstep and get refund in seconds.
                </Typography>
                <Typography
                  variant="subtitle2"
                  style={{ color: infoColor[0], marginTop: 15 }}
                >
                  Lowest price guaranteed
                </Typography>
                <Typography variant="caption">
                  Get products at lowest price with superior quality
                </Typography>
              </GridItem>
            </Grid>
          </Grid>
        </div>
      </div>
      {/*  <div
        className={classes.container}
        style={{ backgroundColor: "#EEE", marginTop: 60 }}
      >
        <YouMayAlsoLike
          categoryId={prodDetails.categoryId}
          subCategoryId={prodDetails.subCategoryId}
        />
      </div> */}
      <FooterPage />
    </AppHeader>
  );
}

ProductSpecPage.propTypes = {
  deptList: PropTypes.array.isRequired,
  productDetailsSlug: PropTypes.object.isRequired,
};

//This function gets called at build time
export async function getStaticPaths() {
  //console.log(`all products... getStaticPaths()`);
  let paths = [];
  const res1 = await axios.get(
    `${process.env.API_BASE_URL}/api/v1/department/`
  );
  const deptList = res1.data.result;
  //console.log(`deptList = ${JSON.stringify(deptList)}`);

  deptList.map(async (deptApi) => {
    const res2 = await axios.get(
      `${process.env.API_BASE_URL}/api/v1/product/list-products?deptId=${deptApi.deptId}`
    );
    const productList = res2.data.result.productList;
    productList.forEach((p) => {
      paths.push({
        params: {
          deptNameSlug: p.deptSeoUrl,
          prodNameSlug: p.prodSeoUrl,
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

  const res1 = await axiosInstance.get("/api/v1/department/");
  const deptList = res1.data.result;

  const res2 = await axiosInstance.get(`/api/v1/product/${pidSlug}`);
  const productDetails = res2.data.result.productApi;

  return {
    props: {
      deptList,
      productDetailsSlug: productDetails,
    },
  };
}
