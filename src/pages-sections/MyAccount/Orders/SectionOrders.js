import React from "react";
// nodejs library that concatenates classes
import PropTypes from "prop-types";
import classNames from "classnames";
import axios from "axios";
import moment from 'moment';

// core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { FormLabel, Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

// @material-ui/icons
import Add from "@material-ui/icons/Add";
import DeleteForever from "@material-ui/icons/DeleteForever";
import ExpandMoreIcon from "@material-ui/icons/ExpandMoreOutlined";

// custom components
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
import NavPills from "components/NavPills/NavPills.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter";

import { grayColor } from "assets/jss/material-kit-pro-react.js";
import { warningColor } from "assets/jss/material-kit-pro-react.js";
//import { imgContainer } from "assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";
import ChooseCancelReason from "pages-sections/MyAccount/Orders/ChooseCancelReason";
import TrackItem from "pages-sections/MyAccount/Orders/TrackItem";

const useStyles = makeStyles(theme => ({
  productImg: {
    width: 100
  },
  cardHeader: {
    marginTop: 0,
    backgroundColor: '#EEE',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    "& .MuiTypography-root": {
      color: '#555!important'
    }
  }
}));

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#FFF',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '2px solid #dadde9',
  },
}))(Tooltip);

export default function SectionOrders(props) {
  const classes = useStyles();
  const [orders, setOrders] = React.useState([]);
  const [cancellOrderNo, setCancellOrderNo] = React.useState(null);
  const [cancellOrderItemId, setCancellOrderItemId] = React.useState(null);
  const [toggleCancelItem, setToggleCancelItem] = React.useState(false);
  const [trackOrderItemId, setTrackOrderItemId] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`/api/v1/my/order/`)
      .then(resp => {
        setOrders(resp.data.result);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleCancelItem = (orderNo, orderItemId) => {
    setCancellOrderNo(orderNo);
    setCancellOrderItemId(orderItemId);
    setToggleCancelItem(true);
  };

  const handleCloseOrderCancelModal = () => {
    setToggleCancelItem(false);
    setCancellOrderNo(null);
    setCancellOrderItemId(null);
  };

  const handleSuccessOrderCancelModal = orderItemApi => {
    const items = orders[cancellOrderNo].map(item => {
      if (item.orderItemId === cancellOrderItemId) return orderItemApi;
      else return item;
    });
    console.log(JSON.stringify(items));
    orders[cancellOrderNo] = items;
    setToggleCancelItem(false);
    setCancellOrderNo(null);
    setCancellOrderItemId(null);
    props.successAlert("Item cancelled successfully");
  };

  return (
    <>
      {toggleCancelItem && (
        <ChooseCancelReason
          orderNo={cancellOrderNo}
          orderItemId={cancellOrderItemId}
          closeModal={() => handleCloseOrderCancelModal()}
          successCancellation={orderItemApi =>
            handleSuccessOrderCancelModal(orderItemApi)
          }
        />
      )}

      <Grid container style={{ paddingLeft: 20, paddingRight: 20 }}>
        {orders.map(order => (
          <Grid item md={12} sm={12} xs={12} key={order.orderNo}>
            <Card>
              <CardHeader plain className={classes.cardHeader}>
                <Grid container>
                  <Grid item md sm xs>
                    <Grid container spacing={8}>
                      <Grid item>
                        <Typography variant="subtitle2">
                          ORDER PLACED
                        </Typography>
                        <Typography variant="caption">
                          {moment(order.orderPlacedOn).format('Do MMMM YYYY')}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2">
                          TOTAL
                        </Typography>
                        <Typography variant="caption">
                          &#8377; {order.orderTotal}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2">
                          SHIP TO
                        </Typography>
                        <HtmlTooltip placement="bottom" arrow transitionComponent={Zoom}
                          title={
                            <React.Fragment>
                              <Typography variant="caption"><b>{order.deliveryAddress.name}</b></Typography><br />
                              <Typography variant="caption">{order.deliveryAddress.address},</Typography><br />
                              <Typography variant="caption">{order.deliveryAddress.city} - {order.deliveryAddress.pincode},</Typography><br />
                              <Typography variant="caption">{order.deliveryAddress.state}</Typography>
                            </React.Fragment>
                          } >
                          <Typography variant="caption">
                            {order.deliveryAddress.name} <span><ExpandMoreIcon style={{ fontSize: 18, verticalAlign: 'middle' }} /></span>
                          </Typography>
                        </HtmlTooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">
                      ORDER # {order.orderNo}
                    </Typography>
                  </Grid>
                </Grid>
              </CardHeader>
              <CardBody style={{ paddingLeft: 15, paddingRight: 15 }}>
                {order.items.map((item, i) => (
                  <Grid container key={i} spacing={4}
                    style={{ borderBottom: order.items.length > 1 && i !== order.items.length - 1 ? '1px solid #EEE' : 'none' }}>
                    <Grid item>
                      <div className={classes.imgContainer}>
                        <img
                          src={item.defaultImg}
                          alt="..."
                          className={classes.productImg}
                        />
                      </div>
                    </Grid>
                    <Grid item md>
                      <Grid container>
                        <Grid item md sm xs>
                          <Typography variant="body2" style={{ paddingBottom: 5 }}>{item.prodName}</Typography>
                          <Typography variant="body2" style={{ paddingTop: 5, paddingBottom: 5 }}>Qty: {item.qty}</Typography>
                          <Typography variant="body2" style={{ paddingTop: 5 }}><b>&#8377;{item.sellingPrice}</b></Typography>
                          {item.cancelled && (
                            <Danger>Cancelled ({item.cancelledOn})</Danger>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    {trackOrderItemId === item.orderItemId && (
                      <Grid item md sm xs>
                        <TrackItem
                          orderNo={order.orderNo}
                          orderItemId={item.orderItemId}
                        />
                      </Grid>
                    )}
                    <Grid item md={12}>
                      {item.allowCancel ? (
                        <Button
                          size="sm"
                          onClick={() =>
                            handleCancelItem(order.orderNo, item.orderItemId)
                          }
                        >
                          Cancel Item
                        </Button>
                      ) :
                        (<Muted><Typography variant="caption">Return window closed on {item.returnWindowClosedOn}</Typography></Muted>)
                      }
                      {/* {item.allowTrack && (
                            <Button
                              size="sm"
                              style={{ marginLeft: 20 }}
                              onClick={() =>
                                setTrackOrderItemId(item.orderItemId)
                              }
                            >
                              Track Item
                            </Button>
                          )} */}
                    </Grid>
                  </Grid>
                ))}
              </CardBody>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

SectionOrders.propTypes = {
  successAlert: PropTypes.func.isRequired,
  errorAlert: PropTypes.func.isRequired
};
