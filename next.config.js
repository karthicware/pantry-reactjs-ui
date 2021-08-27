const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const webpack = require("webpack");
const path = require("path");
const axios = require("axios");

// module.exports = withPlugins([[withSass], [withImages]], {
//   webpack(config, options) {
//     config.resolve.modules.push(path.resolve("./"));
//     return config;
//   }
// });

// env: {} is must to enable to use these variables inside pages.
module.exports = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  trailingSlash: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    const routes = {
      "/": { page: "/" }, // Index page
    };

    if (process.env.NODE_ENV === "production") {
      const axiosInstance = axios.create({
        baseURL: process.env.API_BASE_URL,
        responseType: "json",
      });

      /* const res = await axiosInstance.get(`/api/v1/department/`);
      const deptList = res.data.result;
      deptList.forEach((deptApi) => {
        const deptId = deptApi.deptId.toString();
        const deptName = deptApi.deptName;
        routes[`/${deptName}/cid/${deptId}`] = {
          page: "/[deptNameSlug]/cid/[deptIdSlug]",
          query: {
            deptNameSlug: deptName,
            deptIdSlug: deptId,
          },
        };
      }); */
    }
    return routes;
  },
};
