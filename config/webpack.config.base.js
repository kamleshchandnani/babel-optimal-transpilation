const path = require("path");
const paths = require("./paths");

module.exports = {
  context: paths.appSrc,
  entry: {
    vendor: [
      "react",
      "react-dom",
      "prop-types",
      "react-router-dom"
      // "redux",
      // "react-redux",
      // "redux-saga",
      // "dexie"
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [paths.appSrc, "node_modules"],
    alias: {
      Components: path.resolve(paths.appSrc, "components/"),
      Constants: path.resolve(paths.appSrc, "constants/"),
      Modules: path.resolve(paths.appSrc, "modules/"),
      Pages: path.resolve(paths.appSrc, "pages/"),
      DataCenter: path.resolve(paths.appSrc, "data-center/"),
      Reducers: path.resolve(paths.appSrc, "reducers/"),
      Store: path.resolve(paths.appSrc, "store/"),
      Stylesheets: path.resolve(paths.appSrc, "stylesheets/"),
      Utils: path.resolve(paths.appSrc, "utils/"),
      Lib: path.resolve(paths.appSrc, "lib/"),
      Root: path.resolve(paths.appRoot)
    }
  }
};
