import React from "react";
import PropTypes from "prop-types";

import axios from "axios";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import AppHeader from "components/AppHeader/AppHeader.js";

// sections of this Page
import ProductListingBody from "pages-sections/EcommercePage/ProductListingBody.js";
import FooterPage from "pages-sections/FooterPage/FooterPage.js";

export default function ProductListingPage({
  deptList,
  productList,
  categories,
  deptDetail,
  catgDetail,
}) {
  return (
    <AppHeader deptList={deptList}>
      <ProductListingBody
        deptDetail={deptDetail}
        catgDetail={catgDetail}
        productList={productList}
        categories={categories}
      />
      <FooterPage id="footer" />
    </AppHeader>
  );
}

ProductListingPage.propTypes = {
  deptList: PropTypes.array.isRequired,
  productList: PropTypes.array.isRequired,
  categories: PropTypes.array,
  deptDetail: PropTypes.object.isRequired,
  catgDetail: PropTypes.object.isRequired,
};

//This function gets called at build time
export async function getStaticPaths() {
  //console.log(`all products... getStaticPaths()`);
  let paths = [];
  const res = await axios.get(
    `${process.env.API_BASE_URL}/api/v1/department/all`
  );
  const deptList = res.data;
  //console.log(`deptList = ${JSON.stringify(deptList)}`);

  deptList.map((deptApi) => {
    deptApi.categories.map((catgApi) => {
      paths.push({
        params: {
          deptNameSlug: deptApi.nameUrl,
          deptIdSlug: deptApi.deptId.toString(),
          catgNameSlug: catgApi.nameUrl,
          catgIdSlug: catgApi.catgId.toString(),
        },
      });
    });
  });
  //console.log(`paths = ${JSON.stringify(paths)}`);

  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  //console.log("product listing... getStaticProps()");
  //console.log(`params = ${JSON.stringify(params)}`);
  let productList = [];
  let categories = [];
  const deptId = params.deptIdSlug;
  const catgId = params.catgIdSlug;
  const deptDetail = { deptId, deptDesc: null, nameUrl: null };
  const catgDetail = { catgId, catgDesc: null, nameUrl: null };

  const axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL,
    responseType: "json",
  });
  const res1 = await axiosInstance.get("/api/v1/department/all");
  const deptList = res1.data;
  deptList.forEach((deptApi) => {
    if (deptApi.deptId.toString() === deptId) {
      deptDetail.deptDesc = deptApi.name;
      deptDetail.nameUrl = deptApi.nameUrl;
      categories = deptApi.categories;
      categories.forEach((catgApi) => {
        if (catgApi.catgId.toString() === catgId) {
          catgDetail.catgDesc = catgApi.name;
          catgDetail.nameUrl = catgApi.nameUrl;
        }
      });
    }
  });
  const res2 = await axiosInstance.get(
    `/api/v1/product/list-products?deptId=${parseInt(deptId)}&cid=${catgId}`
  );
  productList = res2.data.result.productList;
  return {
    props: {
      deptList,
      productList,
      categories,
      deptDetail,
      catgDetail,
    },
  };
}