import React from "react";
import Router from "next/router";
import Link from "next/link";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import Info from "components/Typography/Info.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  name: {
    margin: 0,
    color: "#000000"
  },
  activeMenu: {
    fontWeight: "bold"
  }
};

const useStyles = makeStyles(styles);

const menus = [
  {
    id: "TERMS_CONDITIONS",
    name: "Terms & Conditions",
    url: "/policies/terms-and-conditions"
  },
  { id: "PRIVACY_POLICY", name: "Privacy Policy", url: "/policies/privacy-policy" },
  {
    id: "RETURNS_REFUNDS",
    name: "Returns & Refunds",
    url: "/policies/returns-and-refunds"
  },
  {
    id: "SHIPPING_DELIVERY",
    name: "Shipping & Delivery",
    url: "/policies/shipping-and-delivery"
  }
];

export default function SectionMenu({ active }) {
  const classes = useStyles();
  return (
    <Card>
      <CardBody>
        <MenuList>
          {menus.map(menu => (
            <MenuItem selected={active === menu.id} key={menu.id}>
              <Link href={menu.url}>
                <p
                  className={classNames(
                    classes.name,
                    active === menu.id && classes.activeMenu
                  )}
                >
                  {menu.name}
                </p>
              </Link>
            </MenuItem>
          ))}
        </MenuList>
      </CardBody>
    </Card>
  );
}

SectionMenu.propTypes = {
  active: PropTypes.string.isRequired
};
