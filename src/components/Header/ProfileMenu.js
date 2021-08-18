import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import Link from 'next/link';

import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

import {
  warningColor,
} from "assets/jss/material-kit-pro-react.js";
import { AppContext } from "AppContext.js";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  mobileText: {
    fontSize: 14,
    fontWeight: 400,
    padding: 10,
  },
  menuItem: {
    paddingLeft: 20,
    fontSize: 14,
    fontWeight: 400,
    padding: 10,
  },
}));

export default function MenuListComposition({ mobile }) {
  const classes = useStyles();
  const context = React.useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      {/* <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div>
          <PersonPinIcon style={{ color: '#FFF' }} />
          <p
            style={{
              marginBottom: 0,
              fontSize: 12,
              textTransform: "capitalize",
              color: "rgb(85, 85, 85)",
              color: '#FFF'
            }}
          >
            Profile
            </p>
        </div>
      </Button> */}
      <div
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingRight: 10,
          cursor: 'pointer'
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
          }}
        >
          Profile
        </p>
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-end"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem classes={{ root: classes.mobileText }}>
                    <b style={{ textTransform: "capitalize" }}>Hi, +91-{mobile}</b>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </MenuItem>
                  <Divider />
                  <MenuItem
                    classes={{ root: classes.menuItem }}
                  >
                    <Link href="/my/profile"><a>Orders</a></Link>
                  </MenuItem>
                  {/* <MenuItem
                    onClick={() => Router.push("/my/profile")}
                    classes={{ root: classes.menuItem }}
                  >
                    Viewed Products
                    </MenuItem> */}
                  <MenuItem
                    classes={{ root: classes.menuItem }}
                  >
                    <Link href="/my/profile"><a>Saved Addresses</a></Link>
                    </MenuItem>
                  <Divider />
                  {/* <MenuItem
                    onClick={() => Router.push("/my/profile")}
                    classes={{ root: classes.menuItem }}
                  >
                    Contact Us
                    </MenuItem> */}
                  <MenuItem
                    onClick={() => context.logout()}
                    classes={{ root: classes.menuItem }}
                  >
                    Logout
                    </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

MenuListComposition.propTypes = {
  mobile: PropTypes.string
};
