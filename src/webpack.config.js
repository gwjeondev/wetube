const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// path : 파일 경로를 다루고 변경하는 모듈 폴더나 파일의 경로를 문자열로 만들어줌.
// __dirname : 현재 프로젝트의 디렉터리

// resolve 인자의 우측부터 좌측으로 경로를 찾을때까지 붙임. 찾는 경로란 루트 디렉토리(/)를 의미
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  plugins: [new MiniCssExtractPlugin({ filename: "styles.css" })],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins () {
                return [autoprefixer({ browers: "cover 99.5%" })];
              }
            }
          },
          "sass-loader"
        ]
      }
    ]
  }
};

module.exports = config;
