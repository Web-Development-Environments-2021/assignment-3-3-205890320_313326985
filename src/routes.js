import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/leagueManage",
    name: "leagueManage",
    component: () => import("./pages/LeagueManagePage")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage")
  },
  {
    path: "/seasonMatches",
    name: "seasonMatches",
    component: () => import("./pages/SeasonMatchesPage")
  },
  {
    path: "/favoriteMatches",
    name: "favoriteMatches",
    component: () => import("./pages/FavoriteMatchesPage")
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
