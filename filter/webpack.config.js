const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const config = {
  entry: "./src/index.tsx",
  output: {
    publicPath: "/",
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@interfaces": path.resolve(__dirname, "src/shared/interfaces"),
      "@constants": path.resolve(__dirname, "src/shared/constants"),
      "@helpers": path.resolve(__dirname, "src/shared/Libs/helpers"),
    },
  },
  devServer: {
    compress: true,
    port: 3000,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
};

module.exports = (env, argv) => {
  const isDevelop =
    argv.mode === "production" ? false : "eval-cheap-module-source-map";
  config.devtool = isDevelop;
  return config;
};
