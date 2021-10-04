import React from "react";
import PropTypes from "prop-types";

// nodejs library that concatenates classes
import axios from "axios";
import ReactImageMagnify from "react-image-magnify";

// react component used to create nice image meadia player
import ImageGallery from "react-image-gallery";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Muted from "components/Typography/Muted.js";
import Button from "components/CustomButtons/Button.js";
import Success from "components/Typography/Success.js";
import Danger from "components/Typography/Danger.js";
import CustomOutlineButton from "components/CustomButtons/CustomOutlineButton.js";
import Backdrop from "components/Backdrop/CustomBackdrop";

// @material-ui/core components
import Chip from "@material-ui/core/Chip";
import MuiButton from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { FormLabel } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { red, grey } from "@material-ui/core/colors";

// @material-ui/icons
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  ...productStyle,
  root: {
    width: "100%",
    backgroundColor: "#FFF",
    marginTop: 20,
  },
  container: {
    marginRight: 20,
    marginLeft: 20,
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

function ProductSpecPage({ deptList, productDetailsSlug }) {
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

  //snackbar
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [severity, setSeverity] = React.useState(null);
  const [message, setMessage] = React.useState(null);

  React.useEffect(() => {
    const prodDetails = { ...productDetailsSlug };

    //config images for carousel
    prodDetails.variants.forEach((v) => {
      const images = v.imagesLg.map((img) => {
        return {
          original: img,
          thumbnail: img,
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
      //verifyOutOfStock(prodDetails.variants[activeVariantIdx].skuCode);
      setAvailableVariantAsDefault();
      return function cleanup() {};
    }
  }, [prodDetails]);

  React.useEffect(() => {
    //console.log(`activeVariantIdx = ${JSON.stringify(activeVariantIdx)}`);
    if (prodDetails !== null) {
      loadCartDataForSelectedVariant();
      verifyOutOfStock(prodDetails.variants[activeVariantIdx].skuCode);
    }
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
          const variants = prodDetails.variants.map((v) => {
            const variant = { ...v };
            if (variant.skuCode === skuCode) {
              variant.existInCart = cart.qty > 0;
              variant.cartQty = cart.qty;
            }
            //console.log(`variant=${JSON.stringify(variant)}`);
            return variant;
          });
          //console.log(`variants=${JSON.stringify(variants)}`);
          setProdDetails({ ...prodDetails, variants });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setAvailableVariantAsDefault = () => {
    axios
      .get(`/api/v1/product/list-available-sku/${prodId}`)
      .then((response) => {
        const skuCodes = response.data.result;
        if (skuCodes.length > 0) {
          const variantIdx = prodDetails.variants.findIndex(
            (v) => v.skuCode === skuCodes[0]
          );
          if (variantIdx !== -1) {
            setActiveVariantIdx(variantIdx);
          }
        } else {
          const this_prodDetails = { ...prodDetails };
          this_prodDetails.variants.forEach((v) => (v.stockAvailable = false));
          setProdDetails(this_prodDetails);
        }
      })
      .catch((error) => {
        alert(JSON.stringify("error=" + error));
      });
  };

  const verifyOutOfStock = (skuCode) => {
    axios
      .get(`/api/v1/product/out-of-stock-by-sku/${skuCode}`)
      .then((response) => {
        const bool = response.data.result;
        const this_prodDetails = { ...prodDetails };
        const variant = this_prodDetails.variants.find(
          (v) => v.skuCode === skuCode
        );
        variant["stockAvailable"] = bool;
        setProdDetails({ ...this_prodDetails });
      })
      .catch((error) => {
        alert(JSON.stringify("error=" + error));
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
          showSnackbar(resp.data.error.messages[0], "warning");
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
    if (!context.isAuthenticated) {
      setToggleLoginModalValue(true);
      return false;
    }
    axios
      .post(`api/v1/wishlist/${prodId}`)
      .then((resp) => {
        if (resp.data.error) {
          showSnackbar(resp.data.error.messages[0], "warning");
        } else {
          setProdDetails({ ...prodDetails, wishlisted: true });
          showSnackbar("Added to wishlist!", "success");
        }
      })
      .catch((error) => {
        //handleError(error);
      });
  };

  const removeProductFromWishlist = () => {
    axios
      .delete(`api/v1/wishlist/${prodId}`)
      .then((resp) => {
        if (resp.data.error) {
          showSnackbar(resp.data.error.messages[0], "warning");
        } else {
          setProdDetails({ ...prodDetails, wishlisted: false });
          showSnackbar("Removed from wishlist!", "warning");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLoginSuccessHandler = () => {
    setToggleLoginModalValue(false);
  };

  const showSnackbar = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleHideSnackbar = (event) => {
    setOpenSnackbar(false);
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
          <GridItem md={6} style={{ paddingLeft: 0 }}>
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
          <GridItem md={6} style={{ paddingLeft: 0 }}>
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
          <GridItem md={6} style={{ paddingLeft: 0 }}>
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
          <GridItem md={6} style={{ paddingLeft: 0 }}>
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

  const renderAddToCartControls = () => {
    if (prodDetails.variants[activeVariantIdx].stockAvailable === false) {
      return (
        <Typography
          variant="body1"
          style={{
            color: red[500],
            fontWeight: 700,
            marginRight: 20,
          }}
        >
          No stock available
        </Typography>
      );
    } else {
      if (prodDetails.variants[activeVariantIdx].existInCart) {
        return (
          <div
            style={{ display: "flex", alignItems: "center", marginRight: 20 }}
          >
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
        );
      } else {
        return (
          <Button
            round
            color="primary"
            style={{ marginRight: 20, textTransform: "inherit" }}
            onClick={() => handleUpdateItemToCart(1)}
          >
            <ShoppingCart /> &nbsp; Add to Cart
          </Button>
        );
      }
    }
  };

  const renderSareeSpec = () => {
    if (ACCESS_CODE_SAREE === prodDetails.accessCode) {
      const sareeSpec = prodDetails.variants[activeVariantIdx].sareeSpecApi;
      if (!sareeSpec) return null;
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

  const renderImagesForFashionDept = () => {
    return (
      <GridContainer direction="row">
        {prodDetails.variants[activeVariantIdx].images.map((img, i) => (
          <GridItem
            md={6}
            key={i}
            style={{
              paddingLeft: 5,
              paddingRight: 5,
              paddingBottom: 5,
              paddingTop: 5,
            }}
          >
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: img.original,
                  srcSet: img.original,
                  sizes:
                    "(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px",
                },
                largeImage: {
                  src: img.original,
                  width: 1200,
                  height: 1800,
                },
                lensStyle: { backgroundColor: "rgba(0,0,0,.6)" },
                enlargedImagePosition: "over",
              }}
            />
          </GridItem>
        ))}
      </GridContainer>
    );
  };

  const renderImagesForOtherDept = () => {
    return (
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
      </GridContainer>
    );
  };

  const renderImages = () => {
    if (ACCESS_CODE_SAREE === prodDetails.accessCode) {
      return renderImagesForFashionDept();
    } else {
      return renderImagesForOtherDept();
    }
  };

  if (prodDetails === null) return <Indicator />;
  return (
    <AppHeader deptList={deptList}>
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
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        style={{ paddingTop: 10, paddingBottom: 10 }}
        classes={{ separator: classes.breadcrumbSeparator }}
      >
        <Typography variant="caption">Home</Typography>
        <Typography variant="caption">{prodDetails.categoryDesc}</Typography>
        {prodDetails.subCategoryDesc && (
          <Typography variant="caption">
            {prodDetails.subCategoryDesc}
          </Typography>
        )}
      </Breadcrumbs>

      <div className={classes.root}>
        {toggleLoginModalValue && (
          <SignupOrSigninModal
            onCloseModal={() => setToggleLoginModalValue(false)}
            onLoginSuccess={onLoginSuccessHandler}
          />
        )}
        <div className={classes.container}>
          <Grid container direction="row" spacing={2}>
            <Grid item md={7} sm>
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

              <div className={classes.productContainer}>{renderImages()}</div>
            </Grid>

            <Grid item md={5} sm>
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
                          ? grey[700]
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
                  alignItems: "center",
                  marginRight: 20,
                }}
              >
                {renderAddToCartControls()}
                <Button
                  round
                  color="white"
                  onClick={() => {
                    if (prodDetails.wishlisted) removeProductFromWishlist();
                    else addProductToWishlist();
                  }}
                  style={{ textTransform: "inherit" }}
                >
                  {prodDetails.wishlisted ? (
                    <Favorite
                      style={{
                        color: primaryColor[0],
                      }}
                    />
                  ) : (
                    <FavoriteBorderOutlinedIcon
                      style={{
                        color: "none",
                      }}
                    />
                  )}{" "}
                  &nbsp;
                  {prodDetails.wishlisted ? "Wishlisted" : "Add to Wishlist"}
                </Button>
              </GridItem>
              <GridItem style={{ marginTop: 20 }}>
                {renderDeliveryDetails()}
              </GridItem>
              <GridItem>{renderProductDetails()}</GridItem>
              <GridItem>{renderSareeSpec()}</GridItem>
              <GridItem style={{ marginTop: 30, marginBottom: 20 }}>
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

  for (let i = 0; i < deptList.length; i++) {
    const deptApi = deptList[i];
    const res2 = await axios.get(
      `${process.env.API_BASE_URL}/api/v1/product/list-products?deptId=${deptApi.deptId}`
    );
    const productList = res2.data.result.productList;
    productList.forEach((p) => {
      paths.push({
        params: {
          deptNameSlug: deptApi.deptSeoUrl,
          prodNameSlug: p.prodSeoUrl,
          pidSlug: p.prodId.toString(),
        },
      }); //paths.push
    }); //productList.forEach
  }
  //console.log(`paths = ${JSON.stringify(paths)}`);
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
export default ProductSpecPage;
