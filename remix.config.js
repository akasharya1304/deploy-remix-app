import { flatRoutes } from "remix-flat-routes"
/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/*.css"],
  routes: async defineRoutes => {
    return flatRoutes('routes', defineRoutes)
  }, 
  dev: {
    port: 3008,
  },
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
};
