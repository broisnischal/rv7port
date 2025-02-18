import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

const routes = await flatRoutes({ rootDirectory: "routes/blog/" });
// Adding my folder back in to flatRoutes
const newRoutes = routes.map((route) => {
    return {
        id: route.id,
        file: route.file,
        path: "blog/" + route.path,
        index: undefined,
        caseSensitive: undefined,
    };
});

export default [index("routes/index.tsx"), route("blog", "routes/_blog.tsx"), ...newRoutes] satisfies RouteConfig;
