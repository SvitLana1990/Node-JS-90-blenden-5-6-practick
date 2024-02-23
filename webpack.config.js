const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [new MiniCssExtractPlugin({ filename: "css/styles.css" })],
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "js/app.js",
  },

  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Translates CSS into CommonJS
          MiniCssExtractPlugin.loader,
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
};
