const dashboardItems = [
  {
    id: 1,
    title: "Edit profile",
    redirectUrl: "/update",
    role: ["ADMIN", "CONSUMER", "DELIVERER"],
    url: "/20943830.jpg",
  },
  {
    id: 2,
    title: "Products",
    redirectUrl: "/productList",
    role: ["ADMIN", "CONSUMER"],
    url: "/products.jpg",
  },
  {
    id: 2,
    title: "Deliverers",
    redirectUrl: "/verifiedUsers",
    role: ["ADMIN"],
    url: "/pastOrders.jpg",
  },
  // {
  //   id: 3,
  //   title: "Previous orders",
  //   redirectUrl: "/register",
  //   role: ["DELIVERER"],
  //   url: "/pastOrders.jpg",
  // },
  {
    id: 4,
    title: "Cart",
    redirectUrl: "/cart",
    role: ["CONSUMER"],
    url: "/cart1.jpg",
  },
  {
    id: 5,
    title: "Pending orders",
    redirectUrl: "/verifyorderlist",
    role: ["DELIVERER"],
    url: "/5227.jpg",
  },
  {
    id: 6,
    title: "Current order",
    redirectUrl: "/myorder",
    role: ["DELIVERER"],
    url: "/current.jpg",
  },
  {
    id: 7,
    title: "Verify deliverer",
    redirectUrl: "/users",
    role: ["ADMIN"],
    url: "/verify.jpg",
  },
  {
    id: 7,
    title: "All orders",
    redirectUrl: "/pastorders",
    role: ["ADMIN"],
    url: "/allOrders.jpg",
  },

  {
    id: 10,
    title: "Login",
    redirectUrl: "/login",
    role: ["UNAUTH"],
  },
  {
    id: 11,
    title: "Register",
    redirectUrl: "/register",
    role: ["UNAUTH"],
  },
  {
    id: 12,
    title: "Order history",
    redirectUrl: "/pastorders",
    role: ["CONSUMER", "DELIVERER"],
    url: "/pastOrders.jpg",
  },
  {
    id: 13,
    title: "Current orders",
    redirectUrl: "/currentorders",
    role: ["CONSUMER"],
    url: "/current.jpg",
  },
];

export default dashboardItems;
