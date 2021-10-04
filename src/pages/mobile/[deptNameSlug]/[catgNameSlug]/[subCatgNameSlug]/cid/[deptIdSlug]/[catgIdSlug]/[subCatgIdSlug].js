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
  subCatgDetail,
  bannerUrl,
}) {
  //console.log(`subCatgDetail=${JSON.stringify(subCatgDetail)}`);
  return (
    <AppHeader deptList={deptList}>
      <ProductListingBody
        deptDetail={deptDetail}
        catgDetail={catgDetail}
        subCatgDetail={subCatgDetail}
        productList={productList}
        categories={categories}
        bannerUrl={bannerUrl}
      />
      {/* <FooterPage id="footer" /> */}
    </AppHeader>
  );
}

ProductListingPage.propTypes = {
  deptList: PropTypes.array.isRequired,
  productList: PropTypes.array.isRequired,
  categories: PropTypes.array,
  deptDetail: PropTypes.object.isRequired,
  catgDetail: PropTypes.object.isRequired,
  subCatgDetail: PropTypes.object.isRequired,
  bannerUrl: PropTypes.string,
};

//This function gets called at build time
export async function getStaticPaths() {
  //console.log(`all products... getStaticPaths()`);
  let paths = [];
  const res = await axios.get(`${process.env.API_BASE_URL}/api/v1/department/`);
  const deptList = res.data.result;
  //console.log(`deptList = ${JSON.stringify(deptList)}`);

  deptList.map((deptApi) => {
    deptApi.categories.map((catgApi) => {
      catgApi.subCategoryApis.map((subCatgApi) => {
        paths.push({
          params: {
            deptNameSlug: deptApi.deptSeoUrl,
            catgNameSlug: catgApi.catgSeoUrl,
            subCatgNameSlug: subCatgApi.subCatgSeoUrl,
            deptIdSlug: deptApi.deptId.toString(),
            catgIdSlug: catgApi.catgId.toString(),
            subCatgIdSlug: subCatgApi.subCatgId.toString(),
          },
        });
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
  let bannerUrl = "";
  const deptId = params.deptIdSlug;
  const catgId = params.catgIdSlug;
  const subCatgId = params.subCatgIdSlug;
  const deptDetail = { deptId, deptDesc: null, deptSeoUrl: null };
  const catgDetail = { catgId, catgDesc: null, catgSeoUrl: null };
  const subCatgDetail = { subCatgId, subCatgDesc: null, subCatgSeoUrl: null };

  const axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL,
    responseType: "json",
  });
  const res1 = await axiosInstance.get("/api/v1/department/");
  const deptList = res1.data.result;
  deptList.forEach((deptApi) => {
    if (deptApi.deptId.toString() === deptId) {
      deptDetail.deptDesc = deptApi.name;
      deptDetail.deptSeoUrl = deptApi.deptSeoUrl;
      categories = deptApi.categories;
      deptApi.categories.forEach((catgApi) => {
        if (catgApi.catgId.toString() === catgId) {
          catgDetail.catgDesc = catgApi.name;
          catgDetail.catgSeoUrl = catgApi.catgSeoUrl;
          catgApi.subCategoryApis.forEach((subCatgApi) => {
            if (subCatgApi.subCatgId.toString() === subCatgId) {
              subCatgDetail.subCatgDesc = subCatgApi.name;
              subCatgDetail.subCatgSeoUrl = subCatgApi.subCatgSeoUrl;
              bannerUrl = catgApi.imgUrlLg;
            }
          });
        }
      });
    }
  });
  const res2 = await axiosInstance.get(
    `/api/v1/product/list-products?deptId=${parseInt(
      deptId
    )}&cid=${catgId}&scid=${subCatgId}`
  );
  productList = res2.data.result.productList;
  return {
    props: {
      deptList,
      productList,
      categories,
      deptDetail,
      catgDetail,
      subCatgDetail,
      bannerUrl,
    },
  };
}
