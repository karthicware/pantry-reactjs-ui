import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

//core components
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import grey from "@material-ui/core/colors/grey";

import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

// icons
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import PhoneIcon from "@material-ui/icons/PhoneOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import MessageIcon from "@material-ui/icons/MessageOutlined";

//custom components
import Button from "components/CustomButtons/Button.js";
import ScrollTop from "components/AppHeader/ScrollTop.js";
//import ProfileMenu from "components/AppHeader/ProfileMenu";
import ProfileMenu from "components/AppHeader/ProfileMenu";
import AppFatMenu from "components/AppHeader/AppFatMenu";

//sections
import SignupOrSigninModal from "pages-sections/Login/SignupOrSignin.js";
import { AppContext } from "AppContext.js";

import {
  container,
  primaryColor,
  successColor,
} from "assets/jss/material-kit-pro-react.js";

const useStyles = makeStyles((theme) => ({
  container: {
    ...container,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: "100%",
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(10),
      marginRight: theme.spacing(10),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  fabColor: {
    backgroundColor: successColor[0],
    color: "#FFF",
  },
  loginSignupBtn: {
    textTransform: "capitalize",
    fontWeight: 800,
  },
  speedDial: {
    position: "fixed",
    "&.MuiSpeedDial-directionUp": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
}));

const actions = [
  { icon: <MessageIcon />, name: "Whatsapp message" },
  { icon: <PhoneIcon />, name: "Help +91-9876543210" },
];

export default function AppHeader(props) {
  const { deptList } = props;
  const classes = useStyles();

  //state definition
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [toggleLoginModalValue, setToggleLoginModalValue] = React.useState(
    false
  );
  const [open, setOpen] = React.useState(false);

  const context = React.useContext(AppContext);
  const isAuthenticated = context.isAuthenticated;
  const mobile = context.mobile;

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  React.useEffect(() => {
    console.log(`context.triggerLoginModal`);
    if (context.isOpenLoginModal) {
      console.log(`triggering context.isOpenLoginModal`);
      setToggleLoginModalValue(true);
      context.resetTriggerLoginModal();
    }
  }, [context.isOpenLoginModal]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const onLoginSuccessHandler = () => {
    setToggleLoginModalValue(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {toggleLoginModalValue && (
        <SignupOrSigninModal
          onCloseModal={() => setToggleLoginModalValue(false)}
          onLoginSuccess={onLoginSuccessHandler}
        />
      )}
      <AppBar style={{ backgroundColor: primaryColor[0] }}>
        <Toolbar className={classes.container}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Pantry
          </Typography>
          {/* <div className={classes.grow} /> */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.sectionDesktop}>
            <Link href="/wishlist">
              <IconButton
                aria-label="show 4 new mails"
                color="inherit"
                component="a"
              >
                <Badge color="secondary">
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>
            </Link>
            <Link href="/cart">
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                component="a"
              >
                <AppContext.Consumer>
                  {(context) => (
                    <Badge badgeContent={context.cartItems} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                  )}
                </AppContext.Consumer>
              </IconButton>
            </Link>
            {isAuthenticated ? (
              <ProfileMenu mobile={mobile} />
            ) : (
              <Button
                color="transparent"
                className={classes.loginSignupBtn}
                onClick={() => setToggleLoginModalValue(true)}
                size="sm"
                endIcon={<AccountCircle />}
              >
                Login / Sign Up
              </Button>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
        <Toolbar
          style={{
            backgroundColor: "#ececed",
            minHeight: 40,
            display: "grid",
            zIndex: -1,
          }}
        >
          <AppFatMenu deptList={deptList} />
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container>
        <Box my={2}>{props.children}</Box>
      </Container>
      {/* <ScrollTop {...props}>
        <Fab
          color="inherit"
          size="small"
          aria-label="scroll back to top"
          classes={{ colorInherit: classes.fabColor }}
        >
          <PhoneIcon />
        </Fab>
      </ScrollTop> */}
      <SpeedDial
        ariaLabel="SpeedDial example"
        className={classes.speedDial}
        icon={<PhoneIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </React.Fragment>
  );
}

AppHeader.propTypes = {
  deptList: PropTypes.array.isRequired,
};
