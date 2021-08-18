import React from "react";
// nodejs library that concatenates classes
import PropTypes from "prop-types";
import classNames from "classnames";
import axios from "axios";
import moment from 'moment';

// core components
import { makeStyles } from "@material-ui/core/styles";
import { FormLabel, Typography } from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import MuiButton from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Hidden from '@material-ui/core/Hidden';

//custom components
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
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter";

// @material-ui/icons
import Add from "@material-ui/icons/Add";
import DeleteForever from "@material-ui/icons/DeleteForever";
import Edit from "@material-ui/icons/Edit";

import { cardTitle, warningColor } from "assets/jss/material-kit-pro-react.js";

import SectionAddressForm from "pages-sections/MyAccount/Addresses/SectionAddressForm";
import AddressText from "pages-sections/Cart/AddressText";
import ChangeAddressDrawer from "pages-sections/cart/ChangeAddressDrawer";

const useStyles = makeStyles(theme => ({
    cardTitle,
    address: {
        "& p": {
            textTransform: "capitalize"
        }
    },
    addressText: {
        textTransform: "capitalize"
    },
    changeAddressBtn: {
        color: warningColor[0],
        borderColor: warningColor[0],
        "&:hover": {
            backgroundColor: warningColor[4],
            borderColor: warningColor[0],
        }
    },
    cashOnDeliveryInfo: {
        border: '2px dashed #EEE',
        [theme.breakpoints.down("md")]: {
            marginTop: theme.spacing(2),
            padding: theme.spacing(2),
        },
        [theme.breakpoints.up("md")]: {
            margin: theme.spacing(0),
            padding: theme.spacing(3),
        },
    }
}));

export default function SectionDeliveryAddress(props) {
    const classes = useStyles();
    const [selectedAddress, setSelectedAddress] = React.useState(null);

    const [toggleAddAddress, setToggleAddAddress] = React.useState(false);
    const [toggleChangeAddress, setToggleChangeAddress] = React.useState(false);

    const loadDefaultAddress = () => {
        axios
            .get(`/api/v1/customer/default-shipping-address`)
            .then(resp => {
                if (resp.data.result) {
                    setSelectedAddress(resp.data.result.address);
                    props.onSelectAddress(resp.data.result.address.id);
                } else {
                    console.log('no address found');
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const loadAddressById = (addressId) => {
        axios
            .get(`/api/v1/customer/shipping-address/${addressId}`)
            .then(resp => {
                if (resp.data.result) {
                    setSelectedAddress(resp.data.result.address);
                    props.onSelectAddress(resp.data.result.address.id);
                } else {
                    console.log('no address found');
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    React.useEffect(() => {
        loadDefaultAddress();
    }, []);

    const handleOnChoseNewAddress = (addressId) => {
        loadAddressById(addressId);
        setToggleChangeAddress(false);
    };

    const addNewAddressBtn = (
        <Button onClick={() => setToggleAddAddress(true)}>
            Add New Address
        </Button>
    );

    const noAddressFound = (
        <Card plain style={{ marginTop: 2 }}>
            <CardBody>
                <GridContainer>
                    <GridItem md={12} style={{ textAlign: 'center' }}>
                        <Typography variant="subtitle1">Saved address not found. Please add your new address.</Typography>
                        {addNewAddressBtn}
                        {toggleAddAddress &&
                            <SectionAddressForm
                                onSuccessAddAddress={() => loadDefaultAddress()}
                                onCloseModal={() => setToggleAddAddress(false)}
                                isDrawerOpen={true}
                            />}
                    </GridItem>
                </GridContainer>
            </CardBody>
        </Card>
    );

    if (selectedAddress === null)
        return noAddressFound;

    return (
        <Card plain style={{ marginTop: 2 }}>
            <CardBody>
                <GridContainer>
                    <GridItem md={6} className={classes.address}>
                        <AddressText data={selectedAddress} />
                        <br />
                        <Hidden mdDown>
                            <MuiButton variant="outlined" color="primary" onClick={() => setToggleChangeAddress(true)}
                                classes={{ outlinedPrimary: classes.changeAddressBtn }} size="small">Change Address</MuiButton>
                        </Hidden>
                        <Hidden mdUp>
                            <MuiButton variant="outlined" fullWidth color="primary" onClick={() => setToggleChangeAddress(true)}
                                classes={{ outlinedPrimary: classes.changeAddressBtn }} size="small">Change Address</MuiButton>
                        </Hidden>
                    </GridItem>
                    <GridItem md={6}>
                        <div className={classes.cashOnDeliveryInfo}>
                            <Typography variant="subtitle1" color="primary">Estimated delivery</Typography>
                            <Typography variant="caption">
                                <b>{moment().format('dddd, MMMM Do YYYY')}</b><br /> to <br /><b>{moment().add(3, 'days').format('dddd, MMMM Do YYYY')}</b>
                            </Typography>
                        </div>
                    </GridItem>
                </GridContainer>
                {toggleChangeAddress && (
                    <ChangeAddressDrawer
                        onSelectAddress={handleOnChoseNewAddress}
                        onCloseModal={() => setToggleChangeAddress(false)}
                    />
                )}
            </CardBody>
        </Card>
    );

}

SectionDeliveryAddress.propTypes = {
    onSelectAddress: PropTypes.func.isRequired,
    selectedAddressId: PropTypes.number,
};
