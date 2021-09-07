import React from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import axios from "axios";

// nodejs library that concatenates classes
import PropTypes from "prop-types";
import classNames from "classnames";
// plugin that creates slider
import Slider from "nouislider";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import Tooltip from "@material-ui/core/Tooltip";
import { FormLabel } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

// @material-ui icons
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

// core components
import Muted from "components/Typography/Muted.js";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import Clearfix from "components/Clearfix/Clearfix.js";

import productsStyle from "assets/jss/material-kit-pro-react/views/ecommerceSections/productsStyle.js";
import { roseColor, title } from "assets/jss/material-kit-pro-react.js";

import { AppContext } from "AppContext.js";
import FooterPage from "pages-sections/FooterPage/FooterPage.js";

const styles = {
  ...productsStyle,
  title,
  priceContainer: {
    ...productsStyle.priceContainer,
    alignItems: "baseline"
  },
  offerPrice: {
    ...productsStyle.label,
    marginRight: 5,
    fontSize: 16,
    fontWeight: 500
  },
  originalPrice: {
    marginRight: 15,
    fontSize: 12,
    color: "#777",
    textDecoration: "line-through",
    display: "grid",
    alignItems: "end"
  },
  offerPerc: {
    color: roseColor[0],
    fontSize: 12,
    display: "grid",
    alignItems: "end"
  },
  prodImage: {
    borderRadius: "0px !important"
  },
  filterLabel: {
    ...productsStyle.label,
    fontWeight: 300
  },
  bgWhite: {
    backgroundColor: "#FFF"
  }
};

const useStyles = makeStyles(styles);

export default function WhishlistPage() {
  const classes = useStyles();
  const context = React.useContext(AppContext);
  const [productList, setProductList] = React.useState([]);

  React.useEffect(() => {
    const fetchData = () => {
      axios
        .get(`/api/v1/customer/wishlist`)
        .then(resp => {
          setProductList(resp.data.result);
        })
        .catch(error => {
          console.log(error);
        });
    };
    fetchData();
    return function cleanup() {};
  }, []);

  const moveToBag = prodCode => {
    /* axios
      .post(`api/v1/wishlist/${prodCode}/move-to-cart`)
      .then(resp => {
        setProductList(productList.filter(p => p.prodCode !== prodCode));
        context.refreshCartCount();
      })
      .catch(error => {
        console.log(error);
      }); */
  };

  const emptyCart = (
    <>
      <Header
        color="white"
        brand="Nammanuts"
        links={<HeaderLinks dropdownHoverColor="info" />}
        appBarStyle={{
          marginBottom: 0,
          boxShadow: "0 4px 12px 0 rgba(0,0,0,.05)"
        }}
      />
      <div className={classNames(classes.main, classes.bgWhite)}>
        <GridContainer spacing={10} style={{ width: "100%" }}>
          <GridItem style={{ padding: 200, textAlign: "center" }}>
            <h2 className={classes.title}>Your Wishlist</h2>
            <div style={{ marginBottom: 40 }}>
              <Muted>Your Wishlist is currently empty</Muted>
            </div>
            <Button
              color="rose"
              className={classes.navButton}
              onClick={() => Router.push("/")}
            >
              Continue Shopping <ArrowRightAltIcon />
            </Button>
          </GridItem>
        </GridContainer>
        <FooterPage />
      </div>
    </>
  );

  if (productList.length <= 0) return emptyCart;

  return (
    <div>
      <Header
        color="white"
        brand="Nammanuts"
        links={<HeaderLinks dropdownHoverColor="info" />}
        appBarStyle={{
          marginBottom: 0,
          boxShadow: "0 4px 12px 0 rgba(0,0,0,.05)"
        }}
      />

      <div className={classNames(classes.main, classes.bgWhite)}>
        <GridContainer
          style={{ paddingTop: 20, marginRight: 20, marginLeft: 20 }}
        >
          <GridItem style={{ paddingLeft: 30, paddingBottom: 30 }}>
            <h4 className={classes.cardTitle} style={{ textAlign: "left" }}>
              My Wishlist ({productList.length} items)
            </h4>
          </GridItem>
          {productList.map(ele => (
            <GridItem
              md={3}
              sm={4}
              key={ele.prodCode}
              className={classes.productBox}
            >
              <Card plain product>
                <CardHeader image>
                  <Link target="_blank" href={`/product/${ele.prodCode}`}>
                    <img
                      src={ele.defaultImg}
                      alt=".."
                      className={classes.prodImage}
                    />
                  </Link>
                </CardHeader>
                <CardBody
                  plain
                  style={{
                    marginLeft: 15,
                    marginRight: 15,
                    paddingBottom: 5
                  }}
                >
                  <FormLabel
                    classes={{
                      root: classes.filterLabel
                    }}
                  >
                    {ele.prodName}
                  </FormLabel>
                </CardBody>
                <CardFooter
                  plain
                  className={classes.justifyContentBetween}
                  style={{ marginLeft: 15, marginRight: 15 }}
                >
                  <GridContainer>
                    <GridItem>
                      <div className={classes.priceContainer}>
                        <FormLabel
                          classes={{
                            root: classes.offerPrice
                          }}
                        >
                          Rs. {ele.sellingPrice}
                        </FormLabel>
                        <FormLabel
                          classes={{
                            root: classes.originalPrice
                          }}
                        >
                          Rs. {ele.unitPrice}
                        </FormLabel>
                        <FormLabel
                          classes={{
                            root: classes.offerPerc
                          }}
                        >
                          ({ele.discPerc}% OFF)
                        </FormLabel>
                      </div>
                    </GridItem>
                    <GridItem>
                      <Button
                        round
                        block
                        color="rose"
                        onClick={() => moveToBag(ele.prodCode)}
                      >
                        Move To Bag
                      </Button>
                    </GridItem>
                  </GridContainer>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    </div>
  );
}
