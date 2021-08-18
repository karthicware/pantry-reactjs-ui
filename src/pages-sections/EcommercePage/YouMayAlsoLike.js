import React from 'react';
import PropTypes from "prop-types";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";

//core components
import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Typography from '@material-ui/core/Typography';

//custome core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function YouMayAlsoLike({ categoryId, subCategoryId }) {
    const classes = useStyles();
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        const fetchData = () => {
            axios
                .get(`/api/v1/product/youMayAlsoLike?categoryId=${categoryId}&subCategoryId=${subCategoryId}`)
                .then(resp => {
                    const result = resp.data.result;
                    setProducts(result.variants);
                })
                .catch(error => {
                    console.log(error);
                });
        };
        fetchData();
        return function cleanup() { };
    }, []);

    if (products.length <= 0) return null;

    return (
        <GridContainer>
            <GridItem>
                <Typography variant="h6" style={{ fontWeight: 500, textTransform: 'capitalize' }}>You may also like</Typography>
            </GridItem>
            {
                products.map((p, idx) => (
                    <GridItem md={3} key={idx}>
                        <Card style={{ width: "100%" }}>
                            <img
                                style={{ height: "180px", width: "100%", display: "block" }}
                                className={classes.imgCardTop}
                                src={p.defaultImg}
                                alt="Card-img-cap"
                            />
                            <CardBody>
                                <Typography variant="body1">
                                    Home made idli podi
                                </Typography>
                                <Typography variant="body2" style={{ marginTop: 20 }}>
                                    &#8377;100 - &#8377;200
                                </Typography>
                            </CardBody>
                            <CardFooter>
                                <Link href={`/product/productSpec?prodId=${p.prodId}`}>
                                    <a style={{width: '100%'}}>
                                        <Button block color="warning" size="sm">
                                            View
                                        </Button>
                                    </a>
                                </Link>
                            </CardFooter>
                        </Card>
                    </GridItem>))

            }
        </GridContainer>
    );
}

YouMayAlsoLike.propTypes = {
    categoryId: PropTypes.number.isRequired,
    subCategoryId: PropTypes.number.isRequired,
};

