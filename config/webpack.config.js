// core files
const webpack = require("webpack");
const paths = require("./paths");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");

// Webpack plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

const nodeEnv = process.env.NODE_ENV || "development";
const step = process.env.STEP;
const port = process.env.PORT;
const preset = "cust";
process.noDeprecation = true;
const commonConfig = {
  entry: {
    bundle: [
      // the entry point of our app
      paths[`appIndexJs${step}`]
    ]
  },
  context: baseConfig.context,
  // Entries have to resolve to files! They rely on Node
  // convention by default so if a directory contains *index.js*,
  // it resolves to that.
  module: {
    rules: [
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.(gif|png|jpg|jpeg\ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: "file-loader"
      },
      {
        test: /\.json$/,
        use: "json-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            query: {
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  },
  resolve: baseConfig.resolve,
  plugins: [
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(nodeEnv)
      }
    })
  ]
};

const developmentConfig = merge([
  {
    devtool: "source-map",
    output: {
      path: paths.appPublic,
      pathinfo: true,
      filename: "[name].js",
      publicPath: "/"
    },
    // module: {
    //   rules: [
    //     // eslint check
    //     {
    //       enforce: "pre",
    //       // test: /reducer.js/,
    //       test: /\.(js|jsx)$/,
    //       include: paths.appSrc,
    //       exclude: /node_modules/,
    //       loader: "eslint-loader"
    //     }
    //   ]
    // },
    devServer: {
      contentBase: `${paths.appSrc}/step-${step}`,
      disableHostCheck: true,
      // Enable history API fallback so HTML5 History API based
      // routing works. Good for complex setups.
      historyApiFallback: true,

      // Display only errors to reduce the amount of output.
      stats: "errors-only",
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: "0.0.0.0",
      port,
      overlay: {
        errors: true,
        warnings: true
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.appHtml,
        production: false,
        inject: true
      })
    ]
  }
]);

const productionConfig = merge([
  {
    devtool: "cheap-module-source-map",
    output: {
      path: paths[`appBuild-${preset}`],
      // path: paths.appBuild,
      filename: `[name]-${step}.js`,
      publicPath: "/"
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.appHtml,
        inject: true,
        minify: {
          removeComments: false,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      })
      // new WebpackCleanupPlugin({
      //   exclude: [
      //     "index.html",
      //     "favicon.ico",
      //     "manifest.json",
      //     "js/dexie.min.js",
      //     "sw-helpers/service-worker-helper.js",
      //     "sw-helpers/service-worker-custom.js",
      //     "fonts/*",
      //     "css/",
      //     "img/**/*.{png,jpg,gif,svg}"
      //   ]
      // })
    ]
  }
]);

module.exports = (env) => {
  // set --env.production in the CLI
  const webpackEnv = env || process.env.NODE_ENV;
  if (webpackEnv === "production") {
    return merge(commonConfig, productionConfig);
  }
  return merge(developmentConfig, commonConfig);
};
