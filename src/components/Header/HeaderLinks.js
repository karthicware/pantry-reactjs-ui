import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import Link from "next/link";
import Router from "next/router";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";

// @material-ui/icons
import PersonPinIcon from "@material-ui/icons/PersonPin";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasketOutlined";
import Favorite from "@material-ui/icons/FavoriteBorder";
import Lock from "@material-ui/icons/LockOutlined";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";

// custom components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import Muted from "components/Typography/Muted.js";
import { warningColor } from "assets/jss/material-kit-pro-react.js";
import headerLinksStyle from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";
//import LoginModal from "pages-sections/Login/LoginModal.js";
import SignupOrSigninModal from "pages-sections/Login/SignupOrSignin.js";
import FatMenu from "components/Header/FatMenu";
import ProfileMenu from "components/Header/ProfileMenu";
import { AppContext } from "AppContext.js";

const useStyles = makeStyles(headerLinksStyle);
const MENU = {
  ORDERS: "Orders",
  CONTACT_US: "Contact Us",
  PROFILE: "My Profile",
  SAVED_ADDRESSES: "Saved Addresses",
  LOGOUT: "Logout",
  VIEWED_PRODUCTS: "Viewed Products",
};

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
];

const options = top100Films.map((option) => {
  const firstLetter = option.title[0].toUpperCase();
  return {
    firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
    ...option,
  };
});

export default function HeaderLinks(props) {
  const context = React.useContext(AppContext);
  const isAuthenticated = context.isAuthenticated;
  const mobile = context.mobile;
  const classes = useStyles();
  const [toggleLoginModalValue, setToggleLoginModalValue] = React.useState(
    false
  );

  React.useEffect(() => {
    console.log(`context.triggerLoginModal`);
    if (context.isOpenLoginModal) {
      console.log(`triggering context.isOpenLoginModal`);
      setToggleLoginModalValue(true);
      context.resetTriggerLoginModal();
    }
  }, [context.isOpenLoginModal]);

  const rightSideMenu = (
    <>
      <ListItem className={classes.listItem} style={{ marginRight: 20 }}>
        <Link href="/wishlist">
          <a>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Favorite style={{ color: warningColor[0] }} />
              <p
                style={{
                  marginBottom: 0,
                  fontSize: 12,
                  textTransform: "capitalize",
                  fontWeight: 800,
                  color: "#FFF",
                }}
              >
                Favourites
              </p>
            </div>
          </a>
        </Link>
      </ListItem>
      {isAuthenticated ? (
        <ListItem className={classes.listItem} style={{ paddingRight: 10 }}>
          <ProfileMenu mobile={mobile} />
        </ListItem>
      ) : (
        <ListItem
          className={classes.listItem}
          onClick={() => setToggleLoginModalValue(true)}
          style={{ marginRight: 20, cursor: "pointer" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <PersonPinIcon style={{ color: warningColor[0] }} />
            <p
              style={{
                marginBottom: 0,
                fontSize: 12,
                textTransform: "capitalize",
                fontWeight: 800,
                color: "#FFF",
                width: "85px",
              }}
            >
              Login / Sign Up
            </p>
          </div>
          {/* <Button
          color="transparent"
          className={classes.navButton}
          style={{ textTransform: 'capitalize', fontWeight: 800 }}
          size="sm"
          endIcon={<ExpandMoreRoundedIcon className={classes.icons} />}
          onClick={() => setToggleLoginModalValue(true) }
        >
          My Account <br />Login / Sign Up
        </Button> */}
        </ListItem>
      )}
      <ListItem
        className={classes.listItem}
        style={{ borderLeft: "1px solid #EEE", paddingLeft: 20 }}
      >
        <Link href="/cart">
          <a>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <AppContext.Consumer>
                  {(context) => (
                    <Badge
                      badgeContent={context.cartItems}
                      color="primary"
                      classes={{ colorPrimary: classes.badgeRaised }}
                    >
                      <ShoppingBasketIcon style={{ color: warningColor[0] }} />
                    </Badge>
                  )}
                </AppContext.Consumer>
                <p
                  style={{
                    marginBottom: 0,
                    fontSize: 12,
                    textTransform: "capitalize",
                    fontWeight: 800,
                    color: "#FFF",
                  }}
                >
                  Cart
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 20,
                }}
              >
                <AppContext.Consumer>
                  {(context) => (
                    <span
                      style={{
                        marginBottom: 0,
                        fontSize: 16,
                        fontWeight: 800,
                        color: warningColor[0],
                        width: 50,
                      }}
                    >
                      &#8377; {context.cartAmount}
                    </span>
                  )}
                </AppContext.Consumer>
              </div>
            </div>
          </a>
        </Link>
      </ListItem>
    </>
  );
  const onClickMenu = (menu) => {
    switch (menu) {
      case MENU.LOGOUT: {
        context.logout();
        Router.push("/");
        break;
      }
      case MENU.PROFILE: {
        Router.push("/my/profile");
        break;
      }
    }
  };
  const onLoginSuccessHandler = () => {
    setToggleLoginModalValue(false);
  };
  return (
    <>
      {toggleLoginModalValue && (
        <SignupOrSigninModal
          onCloseModal={() => setToggleLoginModalValue(false)}
          onLoginSuccess={onLoginSuccessHandler}
        />
      )}
      <div>
        <p className={classes.homeMenuLink}>Shop Online</p>
        <FatMenu />
      </div>
      <Autocomplete
        id="grouped-demo"
        options={options.sort(
          (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
        )}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.title}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="With categories" />
        )}
      />

      <List className={classes.list} style={{ width: "100%", marginLeft: 40 }}>
        <ListItem
          className={classes.listItem}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="/">
              <a
                style={{
                  color: "#FFF",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <HomeRoundedIcon />
              </a>
            </Link>
          </div>
          {/* {!props.register && !props.signin && wishlist} */}
        </ListItem>
        {rightSideMenu}
      </List>
    </>
  );
}

HeaderLinks.defaultProps = {
  hoverColor: "primary",
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
  ]),
  register: PropTypes.bool,
  signin: PropTypes.bool,
};
