import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    route("logout", "routes/logout.tsx"),
  ]),
  route("dashboard", "routes/dashboard.tsx", [
    index("routes/dashboard/index.tsx"),
    route("stories/new", "routes/dashboard/new-story.tsx"),
    route("stories/:id", "routes/dashboard/story.tsx", [
      route("node/:node", "routes/dashboard/node.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
