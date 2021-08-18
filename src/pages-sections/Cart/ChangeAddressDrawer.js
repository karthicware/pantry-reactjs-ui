import React from "react";
// nodejs library that concatenates classes
import PropTypes from "prop-types";
import classNames from "classnames";
import axios from "axios";

// core components
import { makeStyles } from "@material-ui/core/styles";
import { FormLabel, Typography } from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import MuiButton from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';

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
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import Check from "@material-ui/icons/Check";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";

import { cardTitle, warningColor } from "assets/jss/material-kit-pro-react.js";

import SectionAddressForm from "pages-sections/MyAccount/Addresses/SectionAddressForm";
import AddressText from "pages-sections/Cart/AddressText";

const styles = {
    cardTitle,
    addressText: {
        textTransform: "capitalize"
    },
    addressTextWrapper: {
        backgroundColor: warningColor[4],
        border: '1px solid #EEE',
        padding: 20,
        marginBottom: 20,
        cursor: 'pointer',
        "&:hover .checkIcon": {
            display: 'block !important',
            position: 'absolute',
        },
        position: 'relative',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
};

const useStyles = makeStyles(styles);

export default function ChangeAddressDrawer(props) {
    const {onCloseModal, onSelectAddress} = props;
    const classes = useStyles();
    const [isDrawerOpen, setDrawerOpen] = React.useState(true);
    const [addressList, setAddressList] = React.useState([]);
    const [editAddressId, setEditAddressId] = React.useState(null);
    const [toggleAddAddress, setToggleAddAddress] = React.useState(false);
    const [toggleEditAddress, setToggleEditAddress] = React.useState(false);

    const loadAllAddress = () => {
        axios
            .get('/api/v1/customer/shipping-address')
            .then(resp => {
                if (resp.data.result) {
                    setAddressList(resp.data.result);
                } else {
                    console.log('no address found');
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    React.useEffect(() => {
        loadAllAddress();
        return function cleanup() { };
    }, []);

    // const loadAddressById = (addressId) => {
    //     axios
    //         .get(`/api/v1/customer/shipping-address/${addressId}`)
    //         .then(resp => {
    //             if (resp.data.result) {
    //                 onSelectAddress(resp.data.result.address.id);
    //             } else {
    //                 console.log('no address found');
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // };

    const handleEditClick = (addressId) => {
        setEditAddressId(addressId);
        setToggleEditAddress(true);
    };

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
        onCloseModal();
    };

    const ListAddress = () => {
        return (
            <>
                {addressList.map(a =>
                    // <GridItem key={a.id} className={classes.addressTextWrapper} onClick={() => props.onSelectAddress(a.id)}>
                    <GridItem key={a.id} className={classes.addressTextWrapper} onClick={(event) => {
                        // console.log(`event.target=${JSON.stringify(event.target)}`);
                        // console.log(`event.currentTarget=${JSON.stringify(event.currentTarget)}`);
                        if(event.target && ( (event.target.parentElement && event.target.parentElement.id === 'btn_edit') 
                            || event.target.id === 'btn_edit')) return;
                        props.onSelectAddress(a.id);
                    }}>
                        <AddressText 
                            data={a} 
                            enableEdit
                            handleEditClick={handleEditClick} />
                    </GridItem>
                )}
            </>
        );
    };

    return (
        <div>
            <SwipeableDrawer
                anchor="right"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <GridContainer style={{ width: 400, margin: 0 }}>
                    <GridItem>
                        <div className={classes.header}>
                            <Typography variant="h6">
                                <LocationOnRoundedIcon style={{ marginBottom: -5, marginRight: 5 }} />
                                Change Address</Typography>
                            <IconButton aria-label="delete" onClick={() => {
                                onCloseModal();
                            }}>
                                <CloseRoundedIcon />
                            </IconButton>
                        </div>
                    </GridItem>
                    <GridItem style={{ textAlign: 'right', paddingTop: 10, paddingBottom: 10 }}>
                        <MuiButton color="primary" style={{ color: warningColor[0] }} onClick={() => setToggleAddAddress(true)}>
                            <AddRoundedIcon /> Add New Address
                        </MuiButton>
                    </GridItem>
                    <ListAddress />
                </GridContainer>
                {toggleAddAddress &&
                    <SectionAddressForm
                        onCloseModal={() => setToggleAddAddress(false)}
                        onSuccessAddAddress={addressApi => {
                            loadAllAddress();
                            setToggleEditAddress(false);
                        }}
                    />}
                {toggleEditAddress &&
                    <SectionAddressForm
                        onCloseModal={() => setToggleEditAddress(false)}
                        onSuccessUpdateAddress={addressApi => {
                            loadAllAddress();
                            setToggleEditAddress(false);
                        }}
                        edit
                        addressId={editAddressId}
                    />}
            </SwipeableDrawer>
        </div>
    );

}

ChangeAddressDrawer.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    onSelectAddress: PropTypes.func.isRequired,
};
