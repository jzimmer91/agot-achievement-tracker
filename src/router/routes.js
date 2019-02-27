import Home from "@/views/Home";
import Tournament from "@/views/Tournament";

const routes = [
  // dynamic segments start with a colon
  { path: "/", name: "home", component: Home },
  { path: "/tournament/:id", name: "tournament", component: Tournament }
];

export default routes;
