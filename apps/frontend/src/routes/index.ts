export const routes = [
    {
      path: "/",
      name: "Home",
      privateRoute: false,
      onlyPublic: false,
    },
    {
      path: "/checkout",
      name: "Checkout",
      privateRoute: false,
      onlyPublic: false,
    },

    {
      path: "/login",
      name: "Login",
      privateRoute: false,
      onlyPublic: true,
    },

    {
      path: "/signup",
      name: "Sign Up",
      privateRoute: false,
      onlyPublic: true,
    },

    {
      path: "/profile",
      name: "Profile",
      privateRoute: true,
      onlyPublic: false,
    },
  ];