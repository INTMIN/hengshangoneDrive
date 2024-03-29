// ref: https://umijs.org/config/
import { defineConfig } from 'umi';
import routers from "./routers";

export default defineConfig({
  base: "/dist/",
  dva: {
    immer: true
  },
  dynamicImport: {
    loading: "@/loading"
  },
  title: "min react hooks",
  hash: true,
  ignoreMomentLocale: true,
  // lessLoader: { javascriptEnabled: true },
  cssLoader: {},
  runtimePublicPath: true,
  publicPath: "https://intmin.github.io/hengshangoneDrive/dist/",
  alias: {
    src: require("path").resolve(__dirname, "./src")
  },
  routes: routers,

  targets: {
    ie: 11
  }
});
