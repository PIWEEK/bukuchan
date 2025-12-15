import {
  type RouteConfig,
  index,
  route,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    route("logout", "routes/logout.tsx"),
  ]),
  route("dashboard", "routes/dashboard.tsx", [
    index("routes/dashboard/index.tsx"),
  ]),
] satisfies RouteConfig;
