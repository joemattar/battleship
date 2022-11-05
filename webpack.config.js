const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "inline-source-map",
  entry: "./src/index.js",
  mode: "development",
  // Module loaders
  module: {
    rules: [
      // Style Loader & CSS loader - modules must be installed first
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // Images Loader
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      // Font loaders
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        // Babel Loader
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    // Cleans output - Deletes unused
    // if used without HTML plugin --> move index.html file outside ""dist"" folder
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Battleship",
    }),
  ],
};
