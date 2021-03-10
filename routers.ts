export default [
  {
    path: "/",
    component: "../layouts/index",
    routes: [
      { path: "/", component: "../pages/index" },
      { path: "/oneDrive/list", component: "../pages/oneDrive/index" },
      { path: "/oneDrive/list/:path", component: "../pages/oneDrive/index" }
    ]
  }
];
