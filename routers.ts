export default [
  {
    path: "/",
    component: "../layouts/index",
    routes: [
      { path: "/", component: "../pages/index" },
      { path: "/manage", component: "../pages/oneDrive/ManagePage" },
      { path: "/admin", component: "../pages/oneDrive/LoginPage" },
      { path: "/oneDrive/list", component: "../pages/oneDrive/index" },
      { path: "/oneDrive/list/:path", component: "../pages/oneDrive/index" }
    ]
  }
];
