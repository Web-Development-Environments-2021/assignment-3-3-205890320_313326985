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
    path: '/player/:id',
    component: () => import("./pages/PlayerPage")
  },
  {
    path: '/team/:id',
    component: () => import("./pages/TeamPage")
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
    path: "/UnionAgent/leagueManage",
    name: "leagueManage",
    component: () => import("./pages/UnionAgentPages/LeagueManagePage")
  },
  {
    path: "/addMatch",
    name: "addMatch",
    component: () => import("./pages/UnionAgentPages/AddMatchesPage")
  },
  {
    path: "/addEventsLog",
    name: "addEventsLog",
    component: () => import("./pages/UnionAgentPages/AddEventsLogPage")
  },
  {
    path: "/updateMatchResults",
    name: "updateMatchResults",
    component: () => import("./pages/UnionAgentPages/UpdateMatchResultsPage")
  },
  {
    path: "/updateMatchReferee",
    name: "updateMatchReferee",
    component: () => import("./pages/UnionAgentPages/UpdateMatchRefereePage")
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
