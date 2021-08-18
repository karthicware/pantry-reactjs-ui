import React from "react";
// nodejs library that concatenates classes
import PropTypes from "prop-types";
import classNames from "classnames";
import axios from "axios";
// core components
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
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
import { FormLabel } from "@material-ui/core";

// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Lock from "@material-ui/icons/Lock";

import { cardTitle } from "assets/jss/material-kit-pro-react.js";
import SectionEditProfile from "pages-sections/MyAccount/Profile/SectionEditProfile";

const styles = {
  cardTitle,
  formLabel: {
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "0.9rem"
  }
};

const useStyles = makeStyles(styles);

export default function SectionViewProfile(props) {
  const classes = useStyles();
  const [fullName, setFullName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [mobile, setMobile] = React.useState(null);
  const [toggleEditProfile, setToggleEditProfile] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(`/api/v1/customer/`)
      .then(resp => {
        setFullName(resp.data.fullName);
        setEmail(resp.data.email);
        setMobile(resp.data.mobile);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSuccessUpdateProfile = profileData => {
    setFullName(profileData.fullName);
    setMobile(profileData.mobile);
    props.successAlert("Profile updated successfully");
  };

  return (
    <Card plain style={{ marginTop: 2 }}>
      <CardBody>
        {toggleEditProfile && (
          <SectionEditProfile
            fullName={fullName}
            email={email}
            mobile={mobile}
            onSuccessUpdateProfile={profileData =>
              handleSuccessUpdateProfile(profileData)
            }
            onCloseModal={() => setToggleEditProfile(false)}
          />
        )}

        <h4 className={classes.cardTitle}>Profile Details</h4>
        <hr />
        <GridContainer>
          <GridItem md={3} style={{ padding: 15 }}>
            Full Name
          </GridItem>
          <GridItem md={9} style={{ padding: 15 }}>
            <Muted>{fullName}</Muted>
          </GridItem>

          <GridItem md={3} style={{ padding: 15 }}>
            Email
          </GridItem>
          <GridItem md={9} style={{ padding: 15 }}>
            <Muted>{email}</Muted>
          </GridItem>

          <GridItem md={3} style={{ padding: 15 }}>
            Mobile
          </GridItem>
          <GridItem md={9} style={{ padding: 15 }}>
            <Muted>{mobile}</Muted>
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter>
          <Button
            size="sm"
            variant="outlined"
            onClick={() => setToggleEditProfile(true)}
            style={{ margin: 15 }}
          >
            <Edit /> Edit Profile
          </Button>
      </CardFooter>
    </Card>
  );
}

SectionViewProfile.propTypes = {
  successAlert: PropTypes.func.isRequired,
  errorAlert: PropTypes.func.isRequired
};
