import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import Link from "next/link";

// material core
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import grey from "@material-ui/core/colors/grey";

// icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMoreSharp";
import ExpandLessIcon from "@material-ui/icons/ExpandLessSharp";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles((theme) => ({
  paper: {
    border: "0px solid",
    //padding: theme.spacing(1),
    backgroundColor: "#ececed",
    borderRadius: 0,
    boxShadow: "none",
  },
}));

function MyMenuItem({ text, categories, deptUrl, deptId }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const anchorRef = React.useRef(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = (event) => {
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
    <div style={{ marginLeft: 20, marginRight: 20 }}>
      <div
        id={`div_${text}`}
        ref={anchorRef}
        aria-controls={open ? `menu-list-grow-${text}` : undefined}
        aria-haspopup="true"
        onClick={() => Router.push(`/${deptUrl}/cid/${deptId}`)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Typography
          variant="body2"
          onClick={handleClick}
          style={{ color: grey[800], fontWeight: open ? 500 : "normal" }}
        >
          {text}
        </Typography>
        {open ? (
          <ExpandLessIcon style={{ color: grey[500] }} />
        ) : (
          <ExpandMoreIcon style={{ color: grey[500] }} />
        )}
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        style={{ zIndex: 99999 }}
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
              transformOrigin: placement === "center top",
            }}
          >
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  /* autoFocusItem={open} */
                  id={`menu-list-grow-${text}`}
                  onKeyDown={handleListKeyDown}
                >
                  {categories.map((catgApi, i) => (
                    <MenuItem
                      key={i}
                      style={{
                        marginBottom: categories.length - 1 === i ? 0 : 10,
                      }}
                    >
                      <Link
                        as={`/${deptUrl}/${catgApi.nameUrl}/cid/${deptId}/${catgApi.catgId}`}
                        href={
                          "/[deptNameSlug]/[catgNameSlug]/cid/[deptIdSlug]/[catgIdSlug]"
                        }
                      >
                        <a style={{ color: "#000" }}>{catgApi.name}</a>
                      </Link>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

MyMenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  deptUrl: PropTypes.string.isRequired,
  deptId: PropTypes.string.isRequired,
};

export default function AppFatMenu({ deptList }) {
  return (
    <div>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <LocationOnIcon
          style={{ color: grey[500], fontSize: 28, marginRight: 5 }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="caption"
            style={{ marginRight: 20, color: grey[500] }}
          >
            Deliver to
          </Typography>
          <Typography
            variant="caption"
            style={{ marginRight: 20, color: grey[800], fontWeight: 500 }}
          >
            626117
          </Typography>
        </div>
        {deptList.map((deptApi, i) => (
          <MyMenuItem
            key={i}
            text={deptApi.name}
            categories={deptApi.categories}
            deptUrl={deptApi.nameUrl}
            deptId={deptApi.deptId.toString()}
          ></MyMenuItem>
        ))}
      </Box>
    </div>
  );
}

AppFatMenu.propTypes = {
  deptList: PropTypes.array.isRequired,
};
