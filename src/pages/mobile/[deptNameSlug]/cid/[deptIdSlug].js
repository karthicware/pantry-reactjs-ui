import React from "react";
import PropTypes from "prop-types";

import axios from "axios";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components

// sections of this Page
import ProductListingBody from "pages-sections/Mobile/ProductListingBody.js";

export default function ProductListingPage({
  deptDetail,
  catgId,
  categories,
  productList,
  fromLink,
}) {
  return (
    <ProductListingBody
      deptDetail={deptDetail}
      catgId={catgId}
      categories={categories}
      productList={productList}
      fromLink={fromLink}
    />
  );
}

ProductListingPage.propTypes = {
  deptDetail: PropTypes.object,
  catgId: PropTypes.string,
  categories: PropTypes.array,
  productList: PropTypes.array.isRequired,
  fromLink: PropTypes.string.isRequired,
};

//This function gets called at build time
export async function getStaticPaths() {
  //console.log(`all products... getStaticPaths()`);
  let paths = [];
  const res = await axios.get(`${process.env.API_BASE_URL}/api/v1/department/`);
  const deptList = res.data.result;
  //console.log(`deptList = ${JSON.stringify(deptList)}`);

  deptList.map((deptApi) => {
    paths.push({
      params: {
        deptNameSlug: deptApi.deptSeoUrl,
        deptIdSlug: deptApi.deptId.toString(),
      },
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
  const deptDetail = { deptId, deptDesc: null };

  const axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL,
    responseType: "json",
  });
  const res1 = await axiosInstance.get("/api/v1/department/");
  const deptList = res1.data.result;
  deptList.forEach((deptApi) => {
    if (deptApi.deptId.toString() === deptId) {
      //console.log(JSON.stringify(deptApi));
      deptDetail.deptDesc = deptApi.name;
      deptDetail.deptSeoUrl = deptApi.deptSeoUrl;
      categories = deptApi.categories;
    }
  });
  const catgId = categories[0].catgId.toString();
  const res2 = await axiosInstance.get(
    `/api/v1/product/list-products?deptId=${parseInt(deptId)}&cid=${catgId}`
  );
  productList = res2.data.result.productList;
  const fromLink = "D"; //department
  //console.log(`categories= ${JSON.stringify(categories)}`);
  return {
    props: {
      deptDetail,
      catgId,
      categories,
      productList,
      fromLink,
    },
  };
}
