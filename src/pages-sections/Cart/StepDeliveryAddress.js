import React from "react";
// nodejs library that concatenates classes
import PropTypes from "prop-types";

// core components
import { makeStyles } from "@material-ui/core/styles";

//custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import CustomerAddresses from "pages-sections/Address/CustomerAddresses";

export default function StepDeliveryAddress({ onSelectAddress }) {
  return (
    <Card plain style={{ marginTop: 2 }}>
      <CardBody>
        <CustomerAddresses
          deliveryPage
          onSelectAddress={(addressDetail) => onSelectAddress(addressDetail)}
        />
      </CardBody>
    </Card>
  );
}

StepDeliveryAddress.propTypes = {
  onSelectAddress: PropTypes.func.isRequired,
};
