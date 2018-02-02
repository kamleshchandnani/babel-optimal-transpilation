const path = require("path");
const fs = require("fs");

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.

// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders

// We will export `nodePaths` as an array of absolute paths.
// It will then be used by Webpack configs.
// Jest doesn’t need this because it already handles `NODE_PATH` out of the box.

// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.
// https://github.com/facebookincubator/create-react-app/issues/1023#issuecomment-265344421

const nodePaths = (process.env.NODE_PATH || "")
  .split(process.platform === "win32" ? ";" : ":")
  .filter(Boolean)
  .filter(folder => !path.isAbsolute(folder))
  .map(resolveApp);

// config after eject: we"re in ./config/
module.exports = {
  appRoot: resolveApp(""),
  "appBuild-env": resolveApp("public/env"),
  "appBuild-env-1": resolveApp("public/env/build1"),
  "appBuild-env-2": resolveApp("public/env/build2"),
  "appBuild-env-3": resolveApp("public/env/build3"),
  "appBuild-env-4": resolveApp("public/env/build4"),
  "appBuild-env-5": resolveApp("public/env/build5"),
  "appBuild-cust": resolveApp("public/cust"),
  "appBuild-cust-1": resolveApp("public/cust/build1"),
  "appBuild-cust-2": resolveApp("public/cust/build2"),
  "appBuild-cust-3": resolveApp("public/cust/build3"),
  "appBuild-cust-4": resolveApp("public/cust/build4"),
  "appBuild-cust-5": resolveApp("public/cust/build5"),
  appBuild2: resolveApp("public/env/build2"),
  appBuild3: resolveApp("public/env/build3"),
  appBuild4: resolveApp("public/env/build4"),
  appBuild5: resolveApp("public/env/build5"),
  appPublic: resolveApp("public"),
  appHtml: resolveApp("public/index.html"),
  appIndexJs1: resolveApp("src/step-1/index.jsx"),
  appIndexJs2: resolveApp("src/step-2/index.jsx"),
  appIndexJs3: resolveApp("src/step-3/index.jsx"),
  appIndexJs4: resolveApp("src/step-4/index.jsx"),
  appIndexJs5: resolveApp("src/step-5/index.jsx"),
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp("src"),
  yarnLockFile: resolveApp("yarn.lock"),
  appNodeModules: resolveApp("node_modules"),
  environMent: process.env.NODE_ENV,
  nodePaths
};
