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
import SectionBody from "pages-sections/EcommercePage/SectionBody.js";
import FooterPage from "pages-sections/FooterPage/FooterPage.js";

export default function ProductListingPage({
  deptList,
  deptId,
  deptDesc,
  cid,
  categoryDesc,
  scid,
  subCategoryDesc,
  productList,
}) {
  return (
    <AppHeader deptList={deptList}>
      <SectionBody
        deptId={deptId}
        cid={cid}
        scid={scid}
        productList={productList}
      />
      <FooterPage id="footer" />
    </AppHeader>
  );
}

ProductListingPage.propTypes = {
  deptList: PropTypes.array.isRequired,
  deptId: PropTypes.number.isRequired,
  cid: PropTypes.number.isRequired,
  scid: PropTypes.number.isRequired,
  productList: PropTypes.array.isRequired,
};

//This function gets called at build time
export async function getStaticPaths() {
  //console.log(`all products... getStaticPaths()`);
  let paths = [];
  const res = await axios.get(
    `${process.env.API_BASE_URL}/api/v1/department/all`
  );
  const deptList = res.data;
  console.log(`deptList = ${JSON.stringify(deptList)}`);

  deptList.map((deptApi) => {
    deptApi.categories.map((categoryApi) => {
      if (categoryApi.subCategories.length > 0) {
        categoryApi.subCategories.map((subCategoryApi) => {
          paths.push({
            params: {
              departmentSlug: deptApi.nameUrl,
              categorySlug: categoryApi.nameUrl,
              subCategorySlug: subCategoryApi.nameUrl,
            },
          });
        });
      }
    });
  });
  console.log(`paths = ${JSON.stringify(paths)}`);

  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  //console.log("product listing... getStaticProps()");
  //console.log(`params = ${JSON.stringify(params)}`);
  let productList = [];
  const deptId = params.deptIdSlug;
  let deptDesc = null;
  const catgId = params.cidSlug;
  let catgDesc = null;
  const subCatgId = params.scidSlug;
  let subCatgDesc = null;
  const axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL,
    responseType: "json",
  });
  const res1 = await axiosInstance.get("/api/v1/department/all");
  const deptList = res1.data;
  deptList.forEach((deptApi) => {
    if (deptApi.deptId.toString() === deptId) {
      deptDesc = deptApi.name;
      deptApi.categories.forEach((categoryApi) => {
        if (categoryApi.catgId === catgId) {
          catgDesc = categoryApi.name;
          categoryApi.subCategories.map((subCategoryApi) => {
            if (subCategoryApi.subCatgId === subCatgId)
              subCatgDesc = subCategoryApi.name;
          });
        }
      });
    }
  });
  const res2 = await axiosInstance.get(
    `/api/v1/product/list-products?deptId=${deptId}&cid=${catgId}&scid=${subCatgId}`
  );
  productList = res2.data.result.productList;
  return {
    props: {
      deptList,
      deptId,
      deptDesc,
      catgId,
      catgDesc,
      subCatgId,
      subCatgDesc,
      productList,
    },
  };
}
