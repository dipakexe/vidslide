const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "static/dist/"),
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // For Babel/JSX file support
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // For CSS file support
      },
    ],
  },
};
